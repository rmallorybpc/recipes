import { Buffer } from 'buffer';

const CLIENT_ID = process.env.KROGER_CLIENT_ID;
const CLIENT_SECRET = process.env.KROGER_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Error: KROGER_CLIENT_ID and KROGER_CLIENT_SECRET must be set');
  process.exit(1);
}

// Authenticate
const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
const tokenResponse = await fetch('https://api.kroger.com/v1/connect/oauth2/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${credentials}`
  },
  body: 'grant_type=client_credentials&scope=product.compact'
});

const tokenData = await tokenResponse.json();
if (!tokenData.access_token) {
  console.error('Authentication failed:', JSON.stringify(tokenData));
  process.exit(1);
}

const token = tokenData.access_token;
console.log('Authentication successful.\n');

// Chain queries
const CHAIN_QUERIES = [
  { chain: 'Harris Teeter', zip: '28202', state: 'NC' },
  { chain: 'Fred Meyer',    zip: '97201', state: 'OR' },
  { chain: 'Smiths',        zip: '84101', state: 'UT' },
  { chain: 'Frys',          zip: '85001', state: 'AZ' },
  { chain: 'Marianos',      zip: '60601', state: 'IL' }
];

for (const query of CHAIN_QUERIES) {
  console.log(`\n===== ${query.chain} (zip: ${query.zip}) =====`);

  const url = `https://api.kroger.com/v1/locations?filter.zipCode.near=${query.zip}&filter.radiusInMiles=15&filter.limit=3`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.log(`  HTTP ${response.status}: ${await response.text()}`);
      continue;
    }

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      console.log('  No stores found within 15 miles');
      continue;
    }

    data.data.forEach((loc, i) => {
      console.log(`  Store ${i + 1}: ${loc.name}`);
      console.log(`  Location ID: ${loc.locationId}`);
      console.log(`  Chain: ${loc.chain}`);
      console.log(`  Address: ${loc.address?.addressLine1}, ${loc.address?.city}, ${loc.address?.state}`);
      console.log('  ---');
    });

  } catch (err) {
    console.log(`  Error: ${err.message}`);
  }

  // Small pause between requests
  await new Promise(r => setTimeout(r, 500));
}

console.log('\nDone. Use the Location IDs above to update CHAIN_LOCATIONS in fetch-weekly-deals.mjs');
