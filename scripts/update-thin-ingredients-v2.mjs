/**
 * scripts/update-thin-ingredients.mjs
 *
 * One-time script to overwrite the ingredients section in all
 * 87 thin recipe markdown files with accurate full ingredient lists.
 *
 * Run from repo root:
 *   node ./scripts/update-thin-ingredients.mjs
 *
 * Then run:
 *   node ./scripts/generate-ingredient-data.mjs
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

// ============================================================
// INGREDIENT DATA FOR ALL 87 THIN RECIPES
// ============================================================

const UPDATES = [

  // ============================================================
  // BREAKFAST
  // ============================================================

  {
    id: 'breakfast-baked-casserole-big-daddy-biscuits',
    path: 'recipes/breakfast/baked-casserole/big-daddy-biscuits.md',
    source_url: 'https://www.allrecipes.com/recipe/7040/jps-big-daddy-biscuits/',
    ingredients: [
      '2 cups all-purpose flour',
      '1 tablespoon baking powder',
      '1 teaspoon salt',
      '1 tablespoon white sugar',
      '1/3 cup butter, cubed and cold',
      '1 cup milk',
    ]
  },

  {
    id: 'breakfast-baked-casserole-flourless-chickpea-peanut-butter-muffins',
    path: 'recipes/breakfast/baked-casserole/flourless-chickpea-peanut-butter-muffins.md',
    source_url: 'https://www.ambitiouskitchen.com/flourless-peanut-butter-chickpea-muffins/',
    ingredients: [
      '1 can chickpeas (15 oz), drained and rinsed',
      '1/2 cup natural peanut butter',
      '1/3 cup honey or maple syrup',
      '2 eggs',
      '1 teaspoon vanilla extract',
      '1/2 teaspoon baking powder',
      '1/4 teaspoon baking soda',
      '1/4 teaspoon salt',
      '1/2 cup chocolate chips (optional)',
    ]
  },

  {
    id: 'breakfast-baked-casserole-suggested-banana-oat-pancakes',
    path: 'recipes/breakfast/baked-casserole/banana-oat-pancakes.md',
    source_url: 'https://www.allrecipes.com/recipe/228285/banana-oat-pancakes/',
    ingredients: [
      '2 ripe bananas, mashed',
      '1 cup rolled oats',
      '2 eggs',
      '1/4 cup milk',
      '1 teaspoon vanilla extract',
      '1 teaspoon baking powder',
      '1/2 teaspoon cinnamon',
      '1/4 teaspoon salt',
      'butter or coconut oil for cooking',
      'maple syrup and fresh fruit for serving',
    ]
  },

  {
    id: 'breakfast-bowls-suggested-greek-yogurt-parfait',
    path: 'recipes/breakfast/bowls/greek-yogurt-parfait.md',
    source_url: 'https://www.allrecipes.com/recipe/228285/greek-yogurt-parfait/',
    ingredients: [
      '2 cups plain Greek yogurt',
      '1 cup granola',
      '1 cup mixed fresh berries (strawberries, blueberries, raspberries)',
      '2 tablespoons honey',
      '1 teaspoon vanilla extract',
      '1/4 cup sliced almonds or walnuts (optional)',
    ]
  },

  {
    id: 'breakfast-handheld-suggested-breakfast-burritos',
    path: 'recipes/breakfast/handheld/breakfast-burritos.md',
    source_url: 'https://www.allrecipes.com/recipe/14942/breakfast-burrito/',
    ingredients: [
      '4 large flour tortillas',
      '6 eggs, beaten',
      '1/2 lb breakfast sausage or bacon, cooked and crumbled',
      '1 cup shredded cheddar cheese',
      '1/2 cup diced bell peppers',
      '1/2 cup diced onion',
      '1/2 cup frozen hash browns or diced potatoes, cooked',
      '2 tablespoons butter',
      'salt and pepper to taste',
      'salsa and sour cream for serving',
    ]
  },

  {
    id: 'breakfast-meat-greek-pitas-with-chicken',
    path: 'recipes/breakfast/meat/greek-pitas-with-chicken.md',
    source_url: 'https://www.allrecipes.com/recipe/23600/greek-chicken-pitas/',
    ingredients: [
      '1 lb boneless skinless chicken breasts, cut into strips',
      '4 pita bread rounds',
      '1 cup plain Greek yogurt',
      '1 cucumber, diced',
      '2 tomatoes, diced',
      '1/2 red onion, thinly sliced',
      '3 cloves garlic, minced',
      '2 tablespoons olive oil',
      '1 tablespoon lemon juice',
      '1 teaspoon dried oregano',
      '1 teaspoon dried thyme',
      '1/2 teaspoon cumin',
      'salt and pepper to taste',
      '1/4 cup feta cheese, crumbled',
    ]
  },

  {
    id: 'breakfast-meat-greek-pitas-with-turkey-meat',
    path: 'recipes/breakfast/meat/greek-pitas-with-turkey-meat.md',
    source_url: 'https://www.foodnetwork.com/recipes/turkey-gyros',
    ingredients: [
      '1 lb ground turkey',
      '4 pita bread rounds',
      '1 cup plain Greek yogurt',
      '1 cucumber, grated and squeezed dry',
      '3 cloves garlic, minced',
      '1 tablespoon lemon juice',
      '1 tablespoon fresh dill, chopped',
      '1/2 red onion, thinly sliced',
      '2 tomatoes, sliced',
      '2 tablespoons olive oil',
      '1 teaspoon dried oregano',
      '1/2 teaspoon cumin',
      '1/2 teaspoon smoked paprika',
      'salt and pepper to taste',
      '1/4 cup feta cheese, crumbled',
    ]
  },

  {
    id: 'breakfast-meat-white-chicken-chili',
    path: 'recipes/breakfast/meat/white-chicken-chili.md',
    source_url: 'https://www.allrecipes.com/recipe/219173/slow-cooker-white-chicken-chili/',
    ingredients: [
      '2 lbs boneless skinless chicken breasts',
      '2 cans white beans (cannellini or Great Northern), drained',
      '2 cans chicken broth (14.5 oz each)',
      '1 large onion, diced',
      '3 cloves garlic, minced',
      '2 cans diced green chiles (4 oz each)',
      '1 cup frozen corn',
      '1 teaspoon cumin',
      '1 teaspoon chili powder',
      '1/2 teaspoon oregano',
      '1/2 teaspoon garlic powder',
      '1/2 cup sour cream',
      '4 oz cream cheese, softened',
      'salt and pepper to taste',
      'shredded Monterey Jack cheese, cilantro, and lime for serving',
    ]
  },

  {
    id: 'breakfast-vegetarian-spicy-pesto-and-cheese-stuffed-zucchini-involtin',
    path: 'recipes/breakfast/vegetarian/spicy-pesto-and-cheese-stuffed-zucchini-involtin.md',
    source_url: 'https://www.epicurious.com/recipes/food/views/zucchini-involtini',
    ingredients: [
      '3 medium zucchini, sliced lengthwise into thin strips',
      '1/2 cup basil pesto',
      '1 cup ricotta cheese',
      '1/2 cup shredded mozzarella cheese',
      '1/4 cup grated Parmesan cheese',
      '2 cloves garlic, minced',
      '1/4 teaspoon red pepper flakes',
      '2 tablespoons olive oil',
      '1 cup marinara sauce',
      'salt and pepper to taste',
      'fresh basil leaves for garnish',
    ]
  },

  {
    id: 'breakfast-vegetarian-suggested-avocado-toast-with-egg',
    path: 'recipes/breakfast/vegetarian/avocado-toast-with-egg.md',
    source_url: 'https://www.allrecipes.com/recipe/241032/avocado-toast/',
    ingredients: [
      '2 slices thick-cut bread, toasted',
      '1 ripe avocado',
      '2 eggs',
      '1 tablespoon lemon juice',
      '1/4 teaspoon red pepper flakes',
      'salt and pepper to taste',
      'everything bagel seasoning (optional)',
      'fresh herbs for garnish',
    ]
  },

  // ============================================================
  // DINNER — BAKED CASSEROLE
  // ============================================================

  {
    id: 'dinner-baked-casserole-homemade-pizza',
    path: 'recipes/dinner/baked-casserole/homemade-pizza.md',
    source_url: 'https://www.seriouseats.com/basic-new-york-style-pizza-dough',
    ingredients: [
      '3 cups all-purpose flour',
      '1 packet instant yeast (2 1/4 tsp)',
      '1 teaspoon sugar',
      '1 teaspoon salt',
      '1 tablespoon olive oil',
      '1 cup warm water',
      '1 cup pizza sauce or marinara',
      '2 cups shredded mozzarella cheese',
      '1/2 cup grated Parmesan cheese',
      'toppings of choice: pepperoni, bell peppers, onion, mushrooms, olives',
    ]
  },

  {
    id: 'dinner-baked-casserole-suggested-black-bean-enchiladas',
    path: 'recipes/dinner/baked-casserole/black-bean-enchiladas.md',
    source_url: 'https://www.allrecipes.com/recipe/214842/black-bean-enchiladas/',
    ingredients: [
      '2 cans black beans (15 oz each), drained and rinsed',
      '10 flour or corn tortillas',
      '2 cans red enchilada sauce (10 oz each)',
      '2 cups shredded Mexican cheese blend',
      '1 large onion, diced',
      '1 can diced green chiles (4 oz)',
      '3 cloves garlic, minced',
      '1 cup frozen corn',
      '1 teaspoon cumin',
      '1 teaspoon chili powder',
      '2 tablespoons olive oil',
      'salt and pepper to taste',
      'sour cream and cilantro for serving',
    ]
  },

  {
    id: 'dinner-baked-casserole-suggested-eggplant-parmesan',
    path: 'recipes/dinner/baked-casserole/eggplant-parmesan.md',
    source_url: 'https://www.allrecipes.com/recipe/13981/eggplant-parmesan-ii/',
    ingredients: [
      '2 large eggplants, sliced 1/4 inch thick',
      '2 cups marinara sauce',
      '2 cups shredded mozzarella cheese',
      '1/2 cup grated Parmesan cheese',
      '2 eggs, beaten',
      '1 cup Italian seasoned breadcrumbs',
      '1/2 cup all-purpose flour',
      '1/4 cup olive oil',
      '1 teaspoon dried basil',
      '1 teaspoon dried oregano',
      'salt and pepper to taste',
      'fresh basil for garnish',
    ]
  },

  {
    id: 'dinner-baked-casserole-suggested-spanakopita',
    path: 'recipes/dinner/baked-casserole/spanakopita.md',
    source_url: 'https://www.allrecipes.com/recipe/25680/spanakopita-greek-spinach-pie/',
    ingredients: [
      '1 lb fresh spinach, chopped',
      '1 lb feta cheese, crumbled',
      '3 eggs, beaten',
      '1 large onion, diced',
      '3 cloves garlic, minced',
      '2 tablespoons fresh dill, chopped',
      '1/4 cup fresh parsley, chopped',
      '1/2 teaspoon nutmeg',
      '1 package phyllo dough (16 oz), thawed',
      '1/2 cup butter, melted',
      'salt and pepper to taste',
    ]
  },

  // ============================================================
  // DINNER — BOWLS
  // ============================================================

  {
    id: 'dinner-bowls-chipotle-bowls',
    path: 'recipes/dinner/bowls/chipotle-bowls.md',
    source_url: 'https://www.themodernproper.com/chipotle-chicken-burrito-bowls',
    ingredients: [
      '2 lbs boneless skinless chicken thighs',
      '2 cups long-grain white rice',
      '2 cans black beans, drained and rinsed',
      '2 cups frozen corn, thawed',
      '1 can diced tomatoes with green chiles',
      '1 large onion, diced',
      '3 cloves garlic, minced',
      '2 chipotle peppers in adobo sauce, minced',
      '1 tablespoon adobo sauce',
      '1 teaspoon cumin',
      '1 teaspoon chili powder',
      '1 teaspoon smoked paprika',
      '2 tablespoons olive oil',
      'juice of 2 limes',
      'salt and pepper to taste',
      'sour cream, salsa, guacamole, shredded cheese, and cilantro for serving',
    ]
  },

  {
    id: 'dinner-bowls-salmon-veggie-bowls',
    path: 'recipes/dinner/bowls/salmon-veggie-bowls.md',
    source_url: 'https://www.halfbakedharvest.com/salmon-bowls/',
    ingredients: [
      '4 salmon fillets (6 oz each)',
      '2 cups rice or quinoa, cooked',
      '2 cups broccoli florets',
      '1 large sweet potato, cubed and roasted',
      '1 avocado, sliced',
      '1 cucumber, sliced',
      '2 tablespoons soy sauce',
      '1 tablespoon sesame oil',
      '1 tablespoon honey',
      '1 tablespoon rice vinegar',
      '1 teaspoon fresh ginger, grated',
      '2 cloves garlic, minced',
      'sesame seeds for garnish',
      '2 tablespoons olive oil',
      'salt and pepper to taste',
    ]
  },

  {
    id: 'dinner-bowls-suggested-chicken-tikka-masala',
    path: 'recipes/dinner/bowls/chicken-tikka-masala.md',
    source_url: 'https://www.allrecipes.com/recipe/228293/curry-stand-chicken-tikka-masala-sauce/',
    ingredients: [
      '2 lbs boneless skinless chicken breasts, cubed',
      '1 can crushed tomatoes (28 oz)',
      '1 cup heavy cream or coconut milk',
      '1 large onion, diced',
      '4 cloves garlic, minced',
      '1 tablespoon fresh ginger, grated',
      '2 tablespoons butter',
      '2 tablespoons garam masala',
      '1 tablespoon cumin',
      '1 tablespoon paprika',
      '1 teaspoon turmeric',
      '1 teaspoon coriander',
      '1/2 teaspoon cayenne pepper',
      'salt to taste',
      'fresh cilantro for garnish',
      'basmati rice for serving',
      'naan bread for serving',
    ]
  },

  {
    id: 'dinner-bowls-suggested-korean-beef-bulgogi-bowls',
    path: 'recipes/dinner/bowls/korean-beef-bulgogi-bowls.md',
    source_url: 'https://www.allrecipes.com/recipe/246686/korean-beef-bowl/',
    ingredients: [
      '1.5 lbs ground beef or thinly sliced sirloin',
      '2 cups jasmine rice, cooked',
      '4 cloves garlic, minced',
      '1 tablespoon fresh ginger, grated',
      '1/4 cup soy sauce',
      '2 tablespoons brown sugar',
      '1 tablespoon sesame oil',
      '1 tablespoon rice wine or mirin',
      '1/2 teaspoon red pepper flakes',
      '3 scallions, sliced',
      '1 tablespoon vegetable oil',
      'sesame seeds for garnish',
      'cucumber slices and shredded carrots for serving',
    ]
  },

  {
    id: 'dinner-bowls-suggested-roasted-vegetable-grain-bowls',
    path: 'recipes/dinner/bowls/roasted-vegetable-grain-bowls.md',
    source_url: 'https://www.allrecipes.com/recipe/263648/roasted-vegetable-and-farro-bowl/',
    ingredients: [
      '2 cups farro, quinoa, or brown rice, cooked',
      '2 cups broccoli florets',
      '1 large sweet potato, cubed',
      '1 red bell pepper, sliced',
      '1 zucchini, sliced',
      '1 cup cherry tomatoes',
      '3 tablespoons olive oil',
      '2 tablespoons tahini',
      '1 tablespoon lemon juice',
      '1 clove garlic, minced',
      '1 teaspoon cumin',
      'salt and pepper to taste',
      'fresh parsley and feta cheese for garnish',
    ]
  },

  {
    id: 'dinner-bowls-suggested-teriyaki-salmon-bowls',
    path: 'recipes/dinner/bowls/teriyaki-salmon-bowls.md',
    source_url: 'https://www.allrecipes.com/recipe/228285/teriyaki-salmon/',
    ingredients: [
      '4 salmon fillets (6 oz each)',
      '2 cups jasmine rice, cooked',
      '1 cup edamame, shelled',
      '1 cucumber, sliced',
      '1 avocado, sliced',
      '2 scallions, sliced',
      '1/4 cup soy sauce',
      '2 tablespoons honey',
      '1 tablespoon sesame oil',
      '1 tablespoon rice vinegar',
      '1 teaspoon fresh ginger, grated',
      '2 cloves garlic, minced',
      'sesame seeds for garnish',
    ]
  },

  {
    id: 'dinner-bowls-suggested-thai-green-curry',
    path: 'recipes/dinner/bowls/thai-green-curry.md',
    source_url: 'https://www.allrecipes.com/recipe/222412/thai-green-curry/',
    ingredients: [
      '1.5 lbs boneless skinless chicken thighs or tofu, cubed',
      '2 cans coconut milk (13.5 oz each)',
      '3 tablespoons green curry paste',
      '2 cups vegetables (zucchini, bell peppers, snap peas)',
      '1 large onion, sliced',
      '3 cloves garlic, minced',
      '1 tablespoon fresh ginger, grated',
      '1 tablespoon fish sauce or soy sauce',
      '1 tablespoon brown sugar',
      '1 tablespoon vegetable oil',
      'juice of 1 lime',
      'fresh basil and cilantro for garnish',
      'jasmine rice for serving',
    ]
  },

  {
    id: 'dinner-bowls-suggested-vegetable-curry',
    path: 'recipes/dinner/bowls/vegetable-curry.md',
    source_url: 'https://www.allrecipes.com/recipe/34423/chickpea-coconut-curry/',
    ingredients: [
      '2 cans chickpeas (15 oz each), drained',
      '1 can coconut milk (13.5 oz)',
      '1 can crushed tomatoes (14 oz)',
      '1 large onion, diced',
      '4 cloves garlic, minced',
      '1 tablespoon fresh ginger, grated',
      '2 cups spinach or kale',
      '1 large sweet potato, cubed',
      '2 tablespoons curry powder',
      '1 teaspoon cumin',
      '1 teaspoon turmeric',
      '1/2 teaspoon cayenne pepper',
      '2 tablespoons vegetable oil',
      'salt to taste',
      'fresh cilantro for garnish',
      'basmati rice or naan for serving',
    ]
  },

  // ============================================================
  // DINNER — HANDHELD
  // ============================================================

  {
    id: 'dinner-handheld-lettuce-wraps',
    path: 'recipes/dinner/handheld/lettuce-wraps.md',
    source_url: 'https://www.damndelicious.net/2014/06/13/chicken-lettuce-wraps/',
    ingredients: [
      '1 lb ground chicken or turkey',
      '1 head butter lettuce, leaves separated',
      '1 cup water chestnuts, drained and diced',
      '3 cloves garlic, minced',
      '1 tablespoon fresh ginger, grated',
      '3 tablespoons hoisin sauce',
      '2 tablespoons soy sauce',
      '1 tablespoon rice wine vinegar',
      '1 tablespoon sesame oil',
      '1 teaspoon sriracha',
      '3 scallions, sliced',
      '2 tablespoons vegetable oil',
      'salt and pepper to taste',
      'shredded carrots and chopped peanuts for garnish',
    ]
  },

  {
    id: 'dinner-handheld-suggested-fish-tacos-with-cabbage-slaw',
    path: 'recipes/dinner/handheld/fish-tacos-with-cabbage-slaw.md',
    source_url: 'https://www.allrecipes.com/recipe/228285/fish-tacos/',
    ingredients: [
      '1.5 lbs white fish fillets (cod, tilapia, or mahi mahi)',
      '8 small corn or flour tortillas',
      '2 cups shredded cabbage',
      '1 mango, diced',
      '1 jalapeno, minced',
      '1/4 cup fresh cilantro, chopped',
      '3 tablespoons lime juice',
      '2 tablespoons mayonnaise',
      '1 tablespoon sour cream',
      '1 teaspoon cumin',
      '1 teaspoon chili powder',
      '1 teaspoon smoked paprika',
      '2 tablespoons olive oil',
      'salt and pepper to taste',
      'avocado slices for serving',
    ]
  },

  {
    id: 'dinner-handheld-suggested-sausage-and-peppers',
    path: 'recipes/dinner/handheld/sausage-and-peppers.md',
    source_url: 'https://www.allrecipes.com/recipe/35306/sausage-and-peppers/',
    ingredients: [
      '1.5 lbs Italian sausage links (sweet or hot)',
      '3 bell peppers (red, yellow, green), sliced',
      '1 large onion, sliced',
      '4 cloves garlic, minced',
      '1 can crushed tomatoes (14 oz)',
      '1 teaspoon dried oregano',
      '1 teaspoon dried basil',
      '1/2 teaspoon red pepper flakes',
      '2 tablespoons olive oil',
      'salt and pepper to taste',
      'hoagie rolls or pasta for serving',
    ]
  },

  {
    id: 'dinner-handheld-suggested-shrimp-tacos-with-mango-slaw',
    path: 'recipes/dinner/handheld/shrimp-tacos-with-mango-slaw.md',
    source_url: 'https://www.allrecipes.com/recipe/234060/shrimp-tacos/',
    ingredients: [
      '1 lb large shrimp, peeled and deveined',
      '8 small corn or flour tortillas',
      '2 cups shredded cabbage',
      '1 mango, diced',
      '1/2 red onion, finely diced',
      '1 jalapeno, minced',
      '1/4 cup fresh cilantro, chopped',
      '3 tablespoons lime juice',
      '2 tablespoons mayonnaise',
      '1 teaspoon cumin',
      '1 teaspoon chili powder',
      '1 teaspoon smoked paprika',
      '2 tablespoons olive oil',
      'salt and pepper to taste',
      'avocado slices for serving',
    ]
  },

  // ============================================================
  // DINNER — MEAT
  // ============================================================

  {
    id: 'dinner-meat-bbq-in-crockpot',
    path: 'recipes/dinner/meat/bbq-in-crockpot.md',
    source_url: 'https://www.cookingclassy.com/slow-cooker-pulled-pork/',
    ingredients: [
      '3-4 lbs pork shoulder or pork butt',
      '1 1/2 cups BBQ sauce',
      '1/2 cup apple cider vinegar',
      '1/2 cup chicken broth',
      '1/4 cup brown sugar',
      '1 tablespoon Worcestershire sauce',
      '1 tablespoon chili powder',
      '1 teaspoon garlic powder',
      '1 teaspoon onion powder',
      '1 teaspoon smoked paprika',
      '1 teaspoon salt',
      '1/2 teaspoon black pepper',
      'hamburger buns and coleslaw for serving',
    ]
  },

  {
    id: 'dinner-meat-beef-and-broccoli',
    path: 'recipes/dinner/meat/beef-and-broccoli.md',
    source_url: 'https://www.recipetineats.com/beef-and-broccoli/',
    ingredients: [
      '1 lb flank steak or sirloin, thinly sliced against the grain',
      '4 cups broccoli florets',
      '3 cloves garlic, minced',
      '1 teaspoon fresh ginger, grated',
      '1/3 cup soy sauce',
      '3 tablespoons oyster sauce',
      '2 tablespoons brown sugar',
      '1 tablespoon sesame oil',
      '1 tablespoon cornstarch',
      '1/4 cup water',
      '2 tablespoons vegetable oil',
      'cooked rice for serving',
      'sesame seeds for garnish',
    ]
  },

  {
    id: 'dinner-meat-braised-short-ribs',
    path: 'recipes/dinner/meat/braised-short-ribs.md',
    source_url: 'https://www.seriouseats.com/braised-short-ribs-recipe',
    ingredients: [
      '3-4 lbs bone-in beef short ribs',
      '1 large onion, diced',
      '3 carrots, diced',
      '3 stalks celery, diced',
      '6 cloves garlic, minced',
      '2 tablespoons tomato paste',
      '2 cups dry red wine',
      '2 cups beef broth',
      '4 sprigs fresh thyme',
      '2 bay leaves',
      '2 tablespoons olive oil',
      'salt and pepper to taste',
      'mashed potatoes or egg noodles for serving',
    ]
  },

  {
    id: 'dinner-meat-camper-chicken-enchiladas',
    path: 'recipes/dinner/meat/camper-chicken-enchiladas.md',
    source_url: 'https://www.tasteofhome.com/recipes/chicken-enchiladas/',
    ingredients: [
      '2 lbs boneless skinless chicken breasts, cooked and shredded',
      '10 flour tortillas',
      '2 cans red enchilada sauce (10 oz each)',
      '2 cups shredded Mexican cheese blend',
      '1 large onion, diced',
      '1 can diced green chiles (4 oz)',
      '3 cloves garlic, minced',
      '1 teaspoon cumin',
      '1 teaspoon chili powder',
      '2 tablespoons olive oil',
      'salt and pepper to taste',
      'sour cream and cilantro for serving',
    ]
  },

  {
    id: 'dinner-meat-cheeseburgers',
    path: 'recipes/dinner/meat/cheeseburgers.md',
    source_url: 'https://www.seriouseats.com/the-best-basic-burger',
    ingredients: [
      '2 lbs ground beef (80/20 blend)',
      '4 hamburger buns, toasted',
      '4 slices cheddar or American cheese',
      '1 large onion, sliced',
      '2 tomatoes, sliced',
      '4 leaves romaine or iceberg lettuce',
      '3 tablespoons mayonnaise',
      '2 tablespoons ketchup',
      '1 tablespoon yellow mustard',
      '1 tablespoon Worcestershire sauce',
      '1 teaspoon garlic powder',
      'salt and pepper to taste',
      'pickles for serving',
    ]
  },

  {
    id: 'dinner-meat-chicken-parm',
    path: 'recipes/dinner/meat/chicken-parm.md',
    source_url: 'https://www.foodnetwork.com/recipes/ree-drummond/chicken-parmesan',
    ingredients: [
      '4 boneless skinless chicken breasts, pounded thin',
      '2 cups marinara sauce',
      '1 1/2 cups shredded mozzarella cheese',
      '1/2 cup grated Parmesan cheese',
      '1 cup Italian seasoned breadcrumbs',
      '2 eggs, beaten',
      '1/2 cup all-purpose flour',
      '2 tablespoons olive oil',
      '1 teaspoon garlic powder',
      '1 teaspoon dried basil',
      '1 teaspoon dried oregano',
      'salt and pepper to taste',
      'fresh basil for garnish',
      'pasta for serving',
    ]
  },

  {
    id: 'dinner-meat-chicken-wings',
    path: 'recipes/dinner/meat/chicken-wings.md',
    source_url: 'https://www.seriouseats.com/the-best-buffalo-wings-recipe',
    ingredients: [
      '3 lbs chicken wings, split at joints tips discarded',
      '1/2 cup hot sauce (Frank\'s RedHot preferred)',
      '4 tablespoons unsalted butter, melted',
      '1 teaspoon garlic powder',
      '1 teaspoon onion powder',
      '1 teaspoon smoked paprika',
      '1 tablespoon baking powder',
      '1 teaspoon salt',
      '1/2 teaspoon black pepper',
      'celery sticks and blue cheese or ranch dressing for serving',
    ]
  },

  {
    id: 'dinner-meat-chili',
    path: 'recipes/dinner/meat/chili.md',
    source_url: 'https://www.allrecipes.com/recipe/26317/award-winning-chili/',
    ingredients: [
      '2 lbs ground beef or ground turkey',
      '1 large onion, diced',
      '3 cloves garlic, minced',
      '1 green bell pepper, diced',
      '2 cans diced tomatoes (14 oz each)',
      '1 can tomato sauce (15 oz)',
      '2 cans kidney beans, drained and rinsed',
      '2 cups beef broth',
      '2 tablespoons chili powder',
      '1 tablespoon cumin',
      '1 teaspoon smoked paprika',
      '1 teaspoon oregano',
      '1/2 teaspoon cayenne pepper',
      '2 tablespoons olive oil',
      'salt and pepper to taste',
      'sour cream, shredded cheese, and scallions for serving',
    ]
  },

  {
    id: 'dinner-meat-deconstructed-steak-sandwiches-with-cheese',
    path: 'recipes/dinner/meat/deconstructed-steak-sandwiches-with-cheese.md',
    source_url: 'https://www.foodnetwork.com/recipes/philly-cheesesteak',
    ingredients: [
      '1.5 lbs ribeye or sirloin steak, thinly sliced',
      '4 hoagie rolls or sub rolls',
      '1 large onion, thinly sliced',
      '2 green bell peppers, thinly sliced',
      '8 slices provolone or white American cheese',
      '3 tablespoons butter',
      '2 tablespoons Worcestershire sauce',
      '1 tablespoon vegetable oil',
      '1 teaspoon garlic powder',
      'salt and pepper to taste',
      'mushrooms, sliced (optional)',
    ]
  },

  {
    id: 'dinner-meat-fried-chicken',
    path: 'recipes/dinner/meat/fried-chicken.md',
    source_url: 'https://www.seriouseats.com/the-food-labs-buttermilk-fried-chicken',
    ingredients: [
      '3-4 lbs chicken pieces (thighs, drumsticks, breasts)',
      '2 cups buttermilk',
      '2 cups all-purpose flour',
      '1 tablespoon garlic powder',
      '1 tablespoon onion powder',
      '1 tablespoon smoked paprika',
      '1 tablespoon salt',
      '1 teaspoon black pepper',
      '1 teaspoon cayenne pepper',
      '1 teaspoon dried oregano',
      'vegetable oil for frying',
    ]
  },

  {
    id: 'dinner-meat-grilled-chicken-with-potato-salad',
    path: 'recipes/dinner/meat/grilled-chicken-with-potato-salad.md',
    source_url: 'https://www.bonappetit.com/recipe/grilled-chicken-and-potato-salad',
    ingredients: [
      '4 boneless skinless chicken breasts',
      '2 lbs Yukon Gold potatoes, cubed',
      '3 tablespoons olive oil',
      '2 tablespoons Dijon mustard',
      '2 tablespoons red wine vinegar',
      '3 stalks celery, diced',
      '1/4 red onion, finely diced',
      '3 tablespoons mayonnaise',
      '2 tablespoons fresh parsley, chopped',
      '1 teaspoon garlic powder',
      '1 teaspoon smoked paprika',
      'salt and pepper to taste',
      'lemon wedges for serving',
    ]
  },

  {
    id: 'dinner-meat-pork-chops',
    path: 'recipes/dinner/meat/pork-chops.md',
    source_url: 'https://www.seriouseats.com/pan-seared-pork-chops-with-herb-pan-sauce',
    ingredients: [
      '4 bone-in pork chops (3/4 to 1 inch thick)',
      '4 cloves garlic, minced',
      '3 sprigs fresh rosemary or thyme',
      '2 tablespoons butter',
      '2 tablespoons olive oil',
      '1/2 cup chicken broth',
      '1 tablespoon Dijon mustard',
      '1 teaspoon smoked paprika',
      '1 teaspoon garlic powder',
      'salt and pepper to taste',
      'lemon wedges for serving',
    ]
  },

  {
    id: 'dinner-meat-round-steak-stroganoff',
    path: 'recipes/dinner/meat/round-steak-stroganoff.md',
    source_url: 'https://www.allrecipes.com/recipe/11718/simple-beef-stroganoff/',
    ingredients: [
      '1.5 lbs round steak, thinly sliced',
      '8 oz cremini mushrooms, sliced',
      '1 large onion, diced',
      '3 cloves garlic, minced',
      '2 cups beef broth',
      '1 cup sour cream',
      '2 tablespoons Worcestershire sauce',
      '2 tablespoons tomato paste',
      '2 tablespoons all-purpose flour',
      '2 tablespoons butter',
      '2 tablespoons olive oil',
      'salt and pepper to taste',
      'egg noodles for serving',
      'fresh parsley for garnish',
    ]
  },

  {
    id: 'dinner-meat-skillet-meatloaf-cheeseburger-meatloaf',
    path: 'recipes/dinner/meat/skillet-meatloaf-cheeseburger-meatloaf.md',
    source_url: 'https://www.foodnetwork.com/recipes/food-network-kitchen/classic-meatloaf',
    ingredients: [
      '2 lbs ground beef (80/20)',
      '1 cup shredded cheddar cheese',
      '1/2 cup breadcrumbs',
      '1/2 cup whole milk',
      '1 large onion, finely diced',
      '3 cloves garlic, minced',
      '2 eggs, beaten',
      '2 tablespoons Worcestershire sauce',
      '1/4 cup ketchup',
      '1 tablespoon yellow mustard',
      '1 teaspoon salt',
      '1/2 teaspoon black pepper',
      '1/2 teaspoon smoked paprika',
      '1/4 cup ketchup mixed with 1 tablespoon brown sugar for glaze',
    ]
  },

  {
    id: 'dinner-meat-steak-kabobs-deconstructed',
    path: 'recipes/dinner/meat/steak-kabobs-deconstructed.md',
    source_url: 'https://www.foodnetwork.com/recipes/bobby-flay/steak-kabobs',
    ingredients: [
      '2 lbs sirloin or ribeye steak, cut into 1.5-inch cubes',
      '2 red bell peppers, cut into chunks',
      '2 green bell peppers, cut into chunks',
      '1 large red onion, cut into chunks',
      '2 cups cherry tomatoes',
      '8 oz mushrooms, whole or halved',
      '3 cloves garlic, minced',
      '3 tablespoons olive oil',
      '2 tablespoons soy sauce',
      '1 tablespoon Worcestershire sauce',
      '1 tablespoon red wine vinegar',
      '1 teaspoon smoked paprika',
      '1 teaspoon dried oregano',
      'salt and pepper to taste',
      'fresh parsley for garnish',
    ]
  },

  {
    id: 'dinner-meat-stew',
    path: 'recipes/dinner/meat/stew.md',
    source_url: 'https://www.seriouseats.com/old-fashioned-beef-stew',
    ingredients: [
      '2 lbs beef chuck, cut into 2-inch cubes',
      '1 large onion, diced',
      '4 carrots, cut into 1-inch pieces',
      '4 stalks celery, cut into 1-inch pieces',
      '3 medium potatoes, cut into 2-inch cubes',
      '4 cloves garlic, minced',
      '2 tablespoons tomato paste',
      '3 cups beef broth',
      '1 cup dry red wine',
      '2 tablespoons Worcestershire sauce',
      '2 sprigs fresh thyme',
      '2 bay leaves',
      '3 tablespoons all-purpose flour',
      '3 tablespoons olive oil',
      'salt and pepper to taste',
      'fresh parsley for garnish',
    ]
  },

  {
    id: 'dinner-meat-suggested-butter-chicken',
    path: 'recipes/dinner/meat/butter-chicken.md',
    source_url: 'https://www.allrecipes.com/recipe/246717/chef-johns-chicken-tikka-masala/',
    ingredients: [
      '2 lbs boneless skinless chicken thighs, cubed',
      '1 can crushed tomatoes (28 oz)',
      '1 cup heavy cream',
      '1 large onion, diced',
      '4 cloves garlic, minced',
      '1 tablespoon fresh ginger, grated',
      '4 tablespoons butter',
      '2 tablespoons garam masala',
      '1 tablespoon cumin',
      '1 tablespoon paprika',
      '1 teaspoon turmeric',
      '1 teaspoon coriander',
      '1/2 teaspoon cayenne pepper',
      'salt to taste',
      'fresh cilantro for garnish',
      'basmati rice and naan for serving',
    ]
  },

  {
    id: 'dinner-meat-suggested-caprese-stuffed-chicken',
    path: 'recipes/dinner/meat/caprese-stuffed-chicken.md',
    source_url: 'https://www.allrecipes.com/recipe/228285/caprese-stuffed-chicken/',
    ingredients: [
      '4 boneless skinless chicken breasts',
      '4 oz fresh mozzarella cheese, sliced',
      '2 medium tomatoes, sliced',
      '1/4 cup fresh basil leaves',
      '2 tablespoons balsamic glaze',
      '2 tablespoons olive oil',
      '1 teaspoon garlic powder',
      '1 teaspoon Italian seasoning',
      'salt and pepper to taste',
      'toothpicks for securing',
    ]
  },

  {
    id: 'dinner-meat-suggested-japanese-chicken-katsu',
    path: 'recipes/dinner/meat/japanese-chicken-katsu.md',
    source_url: 'https://www.allrecipes.com/recipe/72069/chicken-katsu/',
    ingredients: [
      '4 boneless skinless chicken breasts, pounded thin',
      '1 cup panko breadcrumbs',
      '2 eggs, beaten',
      '1/2 cup all-purpose flour',
      'vegetable oil for frying',
      '1/4 cup tonkatsu sauce or Worcestershire sauce',
      '2 tablespoons soy sauce',
      '1 tablespoon ketchup',
      '1 tablespoon mirin',
      'salt and pepper to taste',
      'shredded cabbage and steamed rice for serving',
    ]
  },

  {
    id: 'dinner-meat-suggested-lamb-kofta-with-tzatziki',
    path: 'recipes/dinner/meat/lamb-kofta-with-tzatziki.md',
    source_url: 'https://www.allrecipes.com/recipe/228285/lamb-kofta/',
    ingredients: [
      '1.5 lbs ground lamb',
      '1 large onion, grated',
      '3 cloves garlic, minced',
      '1/4 cup fresh parsley, chopped',
      '1 teaspoon cumin',
      '1 teaspoon coriander',
      '1/2 teaspoon cinnamon',
      '1/2 teaspoon allspice',
      '1/4 teaspoon cayenne pepper',
      'salt and pepper to taste',
      '1 cup plain Greek yogurt',
      '1 cucumber, grated and squeezed dry',
      '2 tablespoons fresh dill',
      '1 tablespoon lemon juice',
      'pita bread and sliced tomatoes for serving',
    ]
  },

  {
    id: 'dinner-meat-suggested-sheet-pan-chicken-thighs-and-vegetables',
    path: 'recipes/dinner/meat/sheet-pan-chicken-thighs-and-vegetables.md',
    source_url: 'https://www.allrecipes.com/recipe/234440/sheet-pan-chicken-thighs-and-veggies/',
    ingredients: [
      '2 lbs bone-in skin-on chicken thighs',
      '2 cups broccoli florets',
      '1 large sweet potato, cubed',
      '1 red bell pepper, sliced',
      '1 zucchini, sliced',
      '1 large onion, cut into wedges',
      '4 cloves garlic, minced',
      '3 tablespoons olive oil',
      '1 teaspoon smoked paprika',
      '1 teaspoon garlic powder',
      '1 teaspoon dried thyme',
      '1 teaspoon Italian seasoning',
      'salt and pepper to taste',
      'lemon wedges for serving',
    ]
  },

  // ============================================================
  // DINNER — RICE OR PASTA
  // ============================================================

  {
    id: 'dinner-rice-or-pasta-homemade-mac-n-cheese',
    path: 'recipes/dinner/rice-or-pasta/homemade-mac-n-cheese.md',
    source_url: 'https://www.seriouseats.com/the-food-labs-ultra-gooey-stovetop-mac-and-cheese',
    ingredients: [
      '1 lb elbow macaroni',
      '3 cups sharp cheddar cheese, shredded',
      '1 cup Gruyere cheese, shredded',
      '3 cups whole milk',
      '3 tablespoons unsalted butter',
      '3 tablespoons all-purpose flour',
      '1 teaspoon Dijon mustard',
      '1/2 teaspoon smoked paprika',
      '1/4 teaspoon cayenne pepper',
      '1/2 teaspoon garlic powder',
      'salt and pepper to taste',
      'breadcrumbs and butter for topping (optional)',
    ]
  },

  {
    id: 'dinner-rice-or-pasta-lasagne',
    path: 'recipes/dinner/rice-or-pasta/lasagne.md',
    source_url: 'https://www.recipetineats.com/the-best-lasagna/',
    ingredients: [
      '12 lasagne noodles',
      '1 lb ground beef',
      '1/2 lb Italian sausage',
      '1 large onion, diced',
      '4 cloves garlic, minced',
      '1 can crushed tomatoes (28 oz)',
      '1 can tomato sauce (15 oz)',
      '2 tablespoons tomato paste',
      '2 cups ricotta cheese',
      '2 eggs, beaten',
      '3 cups shredded mozzarella cheese',
      '1 cup grated Parmesan cheese',
      '2 tablespoons olive oil',
      '1 teaspoon dried basil',
      '1 teaspoon dried oregano',
      'salt and pepper to taste',
      'fresh basil for garnish',
    ]
  },

  {
    id: 'dinner-rice-or-pasta-meatballs-with-zucchini-and-rice',
    path: 'recipes/dinner/rice-or-pasta/meatballs-with-zucchini-and-rice.md',
    source_url: 'https://www.budgetbytes.com/baked-meatballs/',
    ingredients: [
      '1 lb ground beef or mixed beef and pork',
      '2 medium zucchini, diced',
      '1 1/2 cups long-grain white rice',
      '1/2 cup breadcrumbs',
      '1/4 cup grated Parmesan cheese',
      '1 egg, beaten',
      '3 cloves garlic, minced',
      '1 large onion, diced',
      '1 can diced tomatoes (14 oz)',
      '2 cups beef or chicken broth',
      '1 tablespoon Italian seasoning',
      '2 tablespoons olive oil',
      'salt and pepper to taste',
      'fresh parsley for garnish',
    ]
  },

  {
    id: 'dinner-rice-or-pasta-penne-lasagne',
    path: 'recipes/dinner/rice-or-pasta/penne-lasagne.md',
    source_url: 'https://www.foodnetwork.com/recipes/baked-penne-recipe',
    ingredients: [
      '1 lb penne pasta',
      '1 lb ground beef or Italian sausage',
      '1 large onion, diced',
      '4 cloves garlic, minced',
      '1 can crushed tomatoes (28 oz)',
      '1 can tomato sauce (15 oz)',
      '1 cup ricotta cheese',
      '2 cups shredded mozzarella cheese',
      '1/2 cup grated Parmesan cheese',
      '2 tablespoons olive oil',
      '1 teaspoon dried basil',
      '1 teaspoon dried oregano',
      '1/2 teaspoon red pepper flakes',
      'salt and pepper to taste',
      'fresh basil for garnish',
    ]
  },

  {
    id: 'dinner-rice-or-pasta-salmon-and-rice',
    path: 'recipes/dinner/rice-or-pasta/salmon-and-rice.md',
    source_url: 'https://www.halfbakedharvest.com/easy-lemon-butter-salmon-rice/',
    ingredients: [
      '4 salmon fillets (6 oz each)',
      '1 1/2 cups long-grain white rice or basmati rice',
      '3 tablespoons unsalted butter',
      '3 cloves garlic, minced',
      'juice of 1 lemon',
      'zest of 1 lemon',
      '2 tablespoons soy sauce',
      '1 tablespoon honey',
      '1 tablespoon olive oil',
      '2 tablespoons fresh parsley, chopped',
      'salt and pepper to taste',
      'lemon slices for serving',
    ]
  },

  {
    id: 'dinner-rice-or-pasta-suggested-caprese-pasta',
    path: 'recipes/dinner/rice-or-pasta/caprese-pasta.md',
    source_url: 'https://www.allrecipes.com/recipe/229960/caprese-pasta/',
    ingredients: [
      '1 lb pasta (penne or fusilli)',
      '2 cups cherry tomatoes, halved',
      '8 oz fresh mozzarella, cubed',
      '1/2 cup fresh basil leaves, torn',
      '3 cloves garlic, minced',
      '3 tablespoons olive oil',
      '2 tablespoons balsamic vinegar',
      '1/4 cup grated Parmesan cheese',
      '1/4 teaspoon red pepper flakes',
      'salt and pepper to taste',
    ]
  },

  {
    id: 'dinner-rice-or-pasta-suggested-chicken-pad-thai',
    path: 'recipes/dinner/rice-or-pasta/chicken-pad-thai.md',
    source_url: 'https://www.allrecipes.com/recipe/66664/chicken-pad-thai/',
    ingredients: [
      '8 oz flat rice noodles',
      '1 lb boneless skinless chicken breasts, thinly sliced',
      '2 eggs, lightly beaten',
      '1 cup bean sprouts',
      '3 scallions, sliced',
      '1/4 cup roasted peanuts, chopped',
      '3 cloves garlic, minced',
      '3 tablespoons fish sauce',
      '2 tablespoons tamarind paste',
      '2 tablespoons brown sugar',
      '1 tablespoon soy sauce',
      '1 teaspoon sriracha',
      '2 tablespoons vegetable oil',
      'lime wedges and fresh cilantro for serving',
    ]
  },

  {
    id: 'dinner-rice-or-pasta-suggested-dan-dan-noodles',
    path: 'recipes/dinner/rice-or-pasta/dan-dan-noodles.md',
    source_url: 'https://www.allrecipes.com/recipe/228285/dan-dan-noodles/',
    ingredients: [
      '8 oz Chinese noodles or spaghetti',
      '1/2 lb ground pork',
      '2 cups baby spinach or bok choy',
      '3 cloves garlic, minced',
      '1 tablespoon fresh ginger, grated',
      '3 tablespoons soy sauce',
      '2 tablespoons tahini or peanut butter',
      '1 tablespoon chili oil or sesame oil',
      '1 tablespoon rice vinegar',
      '1 tablespoon Sichuan peppercorn oil (optional)',
      '1 teaspoon brown sugar',
      '2 scallions, sliced',
      '2 tablespoons vegetable oil',
      'roasted peanuts for garnish',
    ]
  },

  {
    id: 'dinner-rice-or-pasta-suggested-fried-rice-with-egg-and-vegetables',
    path: 'recipes/dinner/rice-or-pasta/fried-rice-with-egg-and-vegetables.md',
    source_url: 'https://www.allrecipes.com/recipe/16954/fried-rice/',
    ingredients: [
      '3 cups cooked white rice, day-old preferred',
      '3 eggs, beaten',
      '1 cup frozen peas and carrots, thawed',
      '1 cup corn kernels',
      '3 scallions, sliced',
      '3 cloves garlic, minced',
      '1 tablespoon fresh ginger, grated',
      '3 tablespoons soy sauce',
      '1 tablespoon sesame oil',
      '2 tablespoons vegetable oil',
      'salt and pepper to taste',
      'sesame seeds for garnish',
    ]
  },

  {
    id: 'dinner-rice-or-pasta-suggested-garlic-butter-shrimp-with-pasta',
    path: 'recipes/dinner/rice-or-pasta/garlic-butter-shrimp-with-pasta.md',
    source_url: 'https://www.allrecipes.com/recipe/238604/garlic-shrimp-pasta/',
    ingredients: [
      '1 lb linguine or spaghetti',
      '1 lb large shrimp, peeled and deveined',
      '6 cloves garlic, minced',
      '4 tablespoons unsalted butter',
      '2 tablespoons olive oil',
      '1/2 cup dry white wine or chicken broth',
      'juice of 1 lemon',
      'zest of 1 lemon',
      '1/4 teaspoon red pepper flakes',
      '1/4 cup fresh parsley, chopped',
      '1/4 cup grated Parmesan cheese',
      'salt and pepper to taste',
    ]
  },

  {
    id: 'dinner-rice-or-pasta-suggested-one-pot-chicken-and-rice',
    path: 'recipes/dinner/rice-or-pasta/one-pot-chicken-and-rice.md',
    source_url: 'https://www.allrecipes.com/recipe/228285/one-pot-chicken-rice/',
    ingredients: [
      '1.5 lbs bone-in skin-on chicken thighs',
      '1 1/2 cups long-grain white rice',
      '3 cups chicken broth',
      '1 large onion, diced',
      '4 cloves garlic, minced',
      '1 can diced tomatoes (14 oz)',
      '1 teaspoon cumin',
      '1 teaspoon smoked paprika',
      '1 teaspoon turmeric',
      '2 tablespoons olive oil',
      'salt and pepper to taste',
      'fresh cilantro and lemon wedges for serving',
    ]
  },

  {
    id: 'dinner-rice-or-pasta-suggested-shrimp-fried-rice',
    path: 'recipes/dinner/rice-or-pasta/shrimp-fried-rice.md',
    source_url: 'https://www.allrecipes.com/recipe/16954/shrimp-fried-rice/',
    ingredients: [
      '3 cups cooked white rice, day-old preferred',
      '1 lb medium shrimp, peeled and deveined',
      '2 eggs, beaten',
      '1 cup frozen peas',
      '2 carrots, diced',
      '3 scallions, sliced',
      '3 cloves garlic, minced',
      '3 tablespoons soy sauce',
      '1 tablespoon sesame oil',
      '2 tablespoons vegetable oil',
      'salt and pepper to taste',
      'sesame seeds for garnish',
    ]
  },

  {
    id: 'dinner-rice-or-pasta-tortellini-with-pesto-and-shrimp-and-spinach',
    path: 'recipes/dinner/rice-or-pasta/tortellini-with-pesto-and-shrimp-and-spinach.md',
    source_url: 'https://www.allrecipes.com/recipe/pesto-tortellini-shrimp/',
    ingredients: [
      '20 oz refrigerated cheese tortellini',
      '1 lb large shrimp, peeled and deveined',
      '3 cups baby spinach',
      '1/2 cup basil pesto',
      '3 cloves garlic, minced',
      '1/4 cup grated Parmesan cheese',
      '2 tablespoons olive oil',
      'juice of 1 lemon',
      '1/4 teaspoon red pepper flakes',
      'salt and pepper to taste',
      'fresh basil for garnish',
    ]
  },

  {
    id: 'dinner-rice-or-pasta-tortellini-with-sausage-spinach-mushrooms-lemon',
    path: 'recipes/dinner/rice-or-pasta/tortellini-with-sausage-spinach-mushrooms-lemon.md',
    source_url: 'https://www.allrecipes.com/recipe/tortellini-sausage-spinach/',
    ingredients: [
      '20 oz refrigerated cheese tortellini',
      '1 lb Italian sausage, casings removed',
      '8 oz cremini mushrooms, sliced',
      '3 cups baby spinach',
      '3 cloves garlic, minced',
      '1/2 cup heavy cream',
      '1/2 cup chicken broth',
      'juice of 1 lemon',
      'zest of 1 lemon',
      '1/4 cup grated Parmesan cheese',
      '2 tablespoons olive oil',
      '1/4 teaspoon red pepper flakes',
      'salt and pepper to taste',
      'fresh parsley for garnish',
    ]
  },

  {
    id: 'dinner-rice-or-pasta-zucchini-and-squash-lasagne',
    path: 'recipes/dinner/rice-or-pasta/zucchini-and-squash-lasagne.md',
    source_url: 'https://www.bonappetit.com/recipe/summer-squash-lasagna',
    ingredients: [
      '12 lasagne noodles',
      '3 medium zucchini, thinly sliced lengthwise',
      '2 yellow squash, thinly sliced lengthwise',
      '2 cups ricotta cheese',
      '2 eggs, beaten',
      '3 cups shredded mozzarella cheese',
      '1/2 cup grated Parmesan cheese',
      '2 cups marinara sauce',
      '3 cloves garlic, minced',
      '1 large onion, diced',
      '2 tablespoons olive oil',
      '1 teaspoon dried basil',
      '1 teaspoon dried oregano',
      '1/4 teaspoon red pepper flakes',
      'salt and pepper to taste',
      'fresh basil for garnish',
    ]
  },

  // ============================================================
  // DINNER — SEAFOOD
  // ============================================================

  {
    id: 'dinner-seafood-suggested-baked-salmon-with-asparagus',
    path: 'recipes/dinner/seafood/baked-salmon-with-asparagus.md',
    source_url: 'https://www.allrecipes.com/recipe/228285/baked-salmon-with-garlic-and-dijon/',
    ingredients: [
      '4 salmon fillets (6 oz each)',
      '1 lb asparagus, trimmed',
      '3 cloves garlic, minced',
      '2 tablespoons Dijon mustard',
      '2 tablespoons honey',
      '2 tablespoons soy sauce',
      '2 tablespoons olive oil',
      'juice of 1 lemon',
      '1 teaspoon smoked paprika',
      '1 teaspoon dried thyme',
      'salt and pepper to taste',
      'lemon slices for serving',
    ]
  },

  {
    id: 'dinner-seafood-suggested-mediterranean-baked-cod',
    path: 'recipes/dinner/seafood/mediterranean-baked-cod.md',
    source_url: 'https://www.allrecipes.com/recipe/228285/mediterranean-baked-cod/',
    ingredients: [
      '4 cod fillets (6 oz each)',
      '1 cup cherry tomatoes, halved',
      '1/2 cup kalamata olives, pitted',
      '1/4 cup capers',
      '3 cloves garlic, minced',
      '1 large onion, thinly sliced',
      '1/2 cup dry white wine or chicken broth',
      '3 tablespoons olive oil',
      '1 teaspoon dried oregano',
      '1 teaspoon dried thyme',
      '1/4 teaspoon red pepper flakes',
      'salt and pepper to taste',
      'fresh parsley and lemon for serving',
    ]
  },

  // ============================================================
  // DINNER — SOUP OR STEW
  // ============================================================

  {
    id: 'dinner-soup-or-stew-cheddar-broccoli-soup',
    path: 'recipes/dinner/soup-or-stew/cheddar-broccoli-soup.md',
    source_url: 'https://www.allrecipes.com/recipe/24098/broccoli-cheese-soup/',
    ingredients: [
      '4 cups broccoli florets, chopped',
      '2 cups sharp cheddar cheese, shredded',
      '1 large onion, diced',
      '3 cloves garlic, minced',
      '2 carrots, shredded',
      '3 cups chicken or vegetable broth',
      '2 cups whole milk or half-and-half',
      '3 tablespoons unsalted butter',
      '3 tablespoons all-purpose flour',
      '1/2 teaspoon mustard powder',
      '1/4 teaspoon cayenne pepper',
      'salt and pepper to taste',
      'crusty bread for serving',
    ]
  },

  {
    id: 'dinner-soup-or-stew-chicken-tortilla-soup-in-crock-pot',
    path: 'recipes/dinner/soup-or-stew/chicken-tortilla-soup-in-crock-pot.md',
    source_url: 'https://dashofsanity.com/chicken-tortilla-soup-crock-pot/',
    ingredients: [
      '2 lbs boneless skinless chicken breasts',
      '2 cans chicken broth (14.5 oz each)',
      '1 can red enchilada sauce (14 oz)',
      '1 can diced tomatoes with green chiles (10 oz)',
      '1 can black beans, drained and rinsed',
      '1 1/2 cups frozen corn',
      '1 large onion, diced',
      '3 cloves garlic, minced',
      '1 red bell pepper, diced',
      '2 teaspoons cumin',
      '1 teaspoon chili powder',
      '1 teaspoon smoked paprika',
      'salt and pepper to taste',
      'shredded cheddar, sour cream, tortilla strips, and cilantro for serving',
    ]
  },

  {
    id: 'dinner-soup-or-stew-chicken-wild-rice-soup',
    path: 'recipes/dinner/soup-or-stew/chicken-wild-rice-soup.md',
    source_url: 'https://www.tasteofhome.com/recipes/chicken-and-wild-rice-soup/',
    ingredients: [
      '1.5 lbs boneless skinless chicken breasts or thighs',
      '1 cup uncooked wild rice blend',
      '1 large onion, diced',
      '3 carrots, diced',
      '3 stalks celery, diced',
      '4 cloves garlic, minced',
      '6 cups chicken broth',
      '1 cup heavy cream or half-and-half',
      '3 tablespoons unsalted butter',
      '3 tablespoons all-purpose flour',
      '1 teaspoon dried thyme',
      '1 bay leaf',
      'salt and pepper to taste',
      'fresh parsley for garnish',
    ]
  },

  {
    id: 'dinner-soup-or-stew-grilled-cheese-and-tomato-soup',
    path: 'recipes/dinner/soup-or-stew/grilled-cheese-and-tomato-soup.md',
    source_url: 'https://www.seriouseats.com/cream-of-tomato-soup-from-scratch',
    ingredients: [
      '2 cans whole peeled tomatoes (28 oz each)',
      '1 large onion, diced',
      '4 cloves garlic, minced',
      '2 cups chicken or vegetable broth',
      '1/2 cup heavy cream',
      '2 tablespoons unsalted butter',
      '1 tablespoon olive oil',
      '1 teaspoon sugar',
      '1/2 teaspoon dried basil',
      'salt and pepper to taste',
      '8 slices thick-cut bread (sourdough preferred)',
      '8 slices cheddar or Gruyere cheese',
      '4 tablespoons butter, softened',
    ]
  },

  {
    id: 'dinner-soup-or-stew-suggested-black-bean-soup',
    path: 'recipes/dinner/soup-or-stew/black-bean-soup.md',
    source_url: 'https://www.allrecipes.com/recipe/14838/black-bean-soup/',
    ingredients: [
      '3 cans black beans (15 oz each), drained and rinsed',
      '4 cups chicken or vegetable broth',
      '1 large onion, diced',
      '4 cloves garlic, minced',
      '2 stalks celery, diced',
      '2 carrots, diced',
      '1 can diced tomatoes (14 oz)',
      '1 teaspoon cumin',
      '1 teaspoon chili powder',
      '1/2 teaspoon smoked paprika',
      '1/2 teaspoon oregano',
      '2 tablespoons olive oil',
      'salt and pepper to taste',
      'sour cream, cilantro, and lime for serving',
    ]
  },

  {
    id: 'dinner-soup-or-stew-suggested-butternut-squash-soup',
    path: 'recipes/dinner/soup-or-stew/butternut-squash-soup.md',
    source_url: 'https://www.allrecipes.com/recipe/229658/butternut-squash-soup-ii/',
    ingredients: [
      '1 large butternut squash (about 3 lbs), peeled and cubed',
      '1 large onion, diced',
      '3 cloves garlic, minced',
      '4 cups chicken or vegetable broth',
      '1/2 cup heavy cream or coconut milk',
      '2 tablespoons butter',
      '1 tablespoon olive oil',
      '1 teaspoon cumin',
      '1/2 teaspoon nutmeg',
      '1/2 teaspoon cinnamon',
      '1/4 teaspoon cayenne pepper',
      'salt and pepper to taste',
      'toasted pumpkin seeds and cream for garnish',
    ]
  },

  {
    id: 'dinner-soup-or-stew-suggested-clam-chowder',
    path: 'recipes/dinner/soup-or-stew/clam-chowder.md',
    source_url: 'https://www.allrecipes.com/recipe/13109/new-england-clam-chowder-i/',
    ingredients: [
      '3 cans chopped clams (6.5 oz each), juice reserved',
      '4 slices bacon, diced',
      '3 medium potatoes, diced',
      '1 large onion, diced',
      '3 stalks celery, diced',
      '3 cloves garlic, minced',
      '2 cups heavy cream',
      '1 cup whole milk',
      '3 tablespoons butter',
      '3 tablespoons all-purpose flour',
      '1 teaspoon dried thyme',
      '2 bay leaves',
      'salt and pepper to taste',
      'oyster crackers for serving',
    ]
  },

  {
    id: 'dinner-soup-or-stew-suggested-dal-tadka',
    path: 'recipes/dinner/soup-or-stew/dal-tadka.md',
    source_url: 'https://www.allrecipes.com/recipe/228285/dal-tadka/',
    ingredients: [
      '1.5 cups red or yellow lentils, rinsed',
      '4 cups water or vegetable broth',
      '1 large onion, diced',
      '3 tomatoes, diced',
      '4 cloves garlic, minced',
      '1 tablespoon fresh ginger, grated',
      '1 teaspoon cumin seeds',
      '1 teaspoon turmeric',
      '1 teaspoon garam masala',
      '1/2 teaspoon coriander',
      '1/2 teaspoon red chili powder',
      '2 tablespoons ghee or butter',
      '2 tablespoons vegetable oil',
      'salt to taste',
      'fresh cilantro for garnish',
      'basmati rice or naan for serving',
    ]
  },

  {
    id: 'dinner-soup-or-stew-suggested-miso-soup-with-tofu-and-vegetables',
    path: 'recipes/dinner/soup-or-stew/miso-soup-with-tofu-and-vegetables.md',
    source_url: 'https://www.allrecipes.com/recipe/13107/real-miso-soup/',
    ingredients: [
      '4 cups dashi or vegetable broth',
      '3 tablespoons white or red miso paste',
      '8 oz firm tofu, cubed',
      '2 cups baby spinach or bok choy',
      '4 scallions, sliced',
      '1 cup mushrooms, sliced',
      '2 tablespoons dried wakame seaweed (optional)',
      '1 teaspoon sesame oil',
      'soy sauce to taste',
    ]
  },

  {
    id: 'dinner-soup-or-stew-suggested-vietnamese-pho',
    path: 'recipes/dinner/soup-or-stew/vietnamese-pho.md',
    source_url: 'https://www.allrecipes.com/recipe/228720/authentic-pho/',
    ingredients: [
      '8 cups beef broth',
      '1 lb beef sirloin or brisket, thinly sliced',
      '8 oz flat rice noodles',
      '1 large onion, halved',
      '3 inch piece ginger, halved',
      '3 star anise',
      '2 cinnamon sticks',
      '4 cloves',
      '2 tablespoons fish sauce',
      '1 tablespoon sugar',
      'bean sprouts, fresh basil, lime, jalapeño, and hoisin sauce for serving',
      'sriracha for serving',
    ]
  },

  // ============================================================
  // DINNER — VEGETARIAN
  // ============================================================

  {
    id: 'dinner-vegetarian-suggested-aloo-gobi',
    path: 'recipes/dinner/vegetarian/aloo-gobi.md',
    source_url: 'https://www.allrecipes.com/recipe/228285/aloo-gobi/',
    ingredients: [
      '3 medium potatoes, cubed',
      '1 medium head cauliflower, cut into florets',
      '1 large onion, diced',
      '3 tomatoes, diced',
      '4 cloves garlic, minced',
      '1 tablespoon fresh ginger, grated',
      '1 teaspoon cumin seeds',
      '1 teaspoon turmeric',
      '1 teaspoon coriander',
      '1 teaspoon garam masala',
      '1/2 teaspoon chili powder',
      '3 tablespoons vegetable oil',
      'salt to taste',
      'fresh cilantro for garnish',
      'naan or rice for serving',
    ]
  },

  {
    id: 'dinner-vegetarian-suggested-saag-paneer',
    path: 'recipes/dinner/vegetarian/saag-paneer.md',
    source_url: 'https://www.allrecipes.com/recipe/228285/saag-paneer/',
    ingredients: [
      '1 lb fresh spinach or frozen spinach, thawed',
      '8 oz paneer cheese, cubed',
      '1 large onion, diced',
      '3 tomatoes, diced',
      '4 cloves garlic, minced',
      '1 tablespoon fresh ginger, grated',
      '1/2 cup heavy cream or yogurt',
      '2 tablespoons butter or ghee',
      '1 teaspoon cumin seeds',
      '1 teaspoon garam masala',
      '1 teaspoon coriander',
      '1/2 teaspoon turmeric',
      '1/2 teaspoon chili powder',
      'salt to taste',
      'basmati rice or naan for serving',
    ]
  },

  {
    id: 'dinner-vegetarian-suggested-shakshuka',
    path: 'recipes/dinner/vegetarian/shakshuka.md',
    source_url: 'https://www.allrecipes.com/recipe/267468/easy-shakshuka/',
    ingredients: [
      '6 large eggs',
      '1 can crushed tomatoes (28 oz)',
      '1 large onion, diced',
      '1 red bell pepper, diced',
      '4 cloves garlic, minced',
      '1 teaspoon cumin',
      '1 teaspoon smoked paprika',
      '1/2 teaspoon chili powder',
      '1/4 teaspoon cayenne pepper',
      '2 tablespoons olive oil',
      'salt and pepper to taste',
      'fresh parsley or cilantro for garnish',
      '1/4 cup feta cheese, crumbled (optional)',
      'crusty bread or pita for serving',
    ]
  },

  {
    id: 'dinner-vegetarian-suggested-veggie-stir-fry-with-tofu',
    path: 'recipes/dinner/vegetarian/veggie-stir-fry-with-tofu.md',
    source_url: 'https://www.allrecipes.com/recipe/20091/vegetable-stir-fry/',
    ingredients: [
      '14 oz extra-firm tofu, pressed and cubed',
      '2 cups broccoli florets',
      '1 red bell pepper, sliced',
      '1 yellow bell pepper, sliced',
      '1 cup snap peas',
      '2 carrots, thinly sliced',
      '3 cloves garlic, minced',
      '1 tablespoon fresh ginger, grated',
      '3 tablespoons soy sauce',
      '1 tablespoon oyster sauce or hoisin sauce',
      '1 tablespoon sesame oil',
      '1 tablespoon cornstarch',
      '1/4 cup water',
      '2 tablespoons vegetable oil',
      'cooked rice for serving',
      'sesame seeds for garnish',
    ]
  },

  // ============================================================
  // LUNCH
  // ============================================================

  {
    id: 'lunch-bowls-suggested-asian-noodle-salad',
    path: 'recipes/lunch/bowls/asian-noodle-salad.md',
    source_url: 'https://www.allrecipes.com/recipe/237310/cold-asian-noodle-salad/',
    ingredients: [
      '8 oz rice noodles or soba noodles',
      '2 cups shredded purple cabbage',
      '1 cup shredded carrots',
      '1 cucumber, julienned',
      '1 red bell pepper, thinly sliced',
      '3 scallions, sliced',
      '1/4 cup fresh cilantro, chopped',
      '1/4 cup roasted peanuts',
      '3 tablespoons soy sauce',
      '2 tablespoons rice vinegar',
      '1 tablespoon sesame oil',
      '1 tablespoon honey',
      '1 tablespoon fresh ginger, grated',
      '2 cloves garlic, minced',
      '1 teaspoon sriracha',
      'lime wedges for serving',
    ]
  },

  {
    id: 'lunch-bowls-suggested-caprese-salad-with-prosciutto',
    path: 'recipes/lunch/bowls/caprese-salad-with-prosciutto.md',
    source_url: 'https://www.allrecipes.com/recipe/12720/caprese-salad/',
    ingredients: [
      '4 oz prosciutto, thinly sliced',
      '8 oz fresh mozzarella, sliced',
      '3 large ripe tomatoes, sliced',
      '1/2 cup fresh basil leaves',
      '3 tablespoons extra virgin olive oil',
      '2 tablespoons balsamic glaze',
      'flaky sea salt and black pepper to taste',
    ]
  },

  {
    id: 'lunch-bowls-suggested-greek-salad-with-chicken',
    path: 'recipes/lunch/bowls/greek-salad-with-chicken.md',
    source_url: 'https://www.allrecipes.com/recipe/21177/greek-salad/',
    ingredients: [
      '2 grilled chicken breasts, sliced',
      '1 head romaine lettuce, chopped',
      '1 cucumber, diced',
      '2 cups cherry tomatoes, halved',
      '1/2 red onion, thinly sliced',
      '1/2 cup kalamata olives, pitted',
      '4 oz feta cheese, crumbled',
      '3 tablespoons olive oil',
      '2 tablespoons red wine vinegar',
      '1 teaspoon dried oregano',
      'salt and pepper to taste',
      'pita bread for serving',
    ]
  },

  {
    id: 'lunch-handheld-suggested-black-bean-tacos',
    path: 'recipes/lunch/handheld/black-bean-tacos.md',
    source_url: 'https://www.allrecipes.com/recipe/261680/black-bean-tacos/',
    ingredients: [
      '2 cans black beans (15 oz each), drained and rinsed',
      '8 small corn or flour tortillas',
      '1 cup frozen corn, thawed',
      '1 large onion, diced',
      '3 cloves garlic, minced',
      '1 teaspoon cumin',
      '1 teaspoon chili powder',
      '1/2 teaspoon smoked paprika',
      '2 tablespoons olive oil',
      'salt and pepper to taste',
      'shredded cheese, sour cream, salsa, avocado, and cilantro for serving',
    ]
  },

  {
    id: 'lunch-handheld-suggested-blt-sandwich',
    path: 'recipes/lunch/handheld/blt-sandwich.md',
    source_url: 'https://www.allrecipes.com/recipe/218735/classic-blt/',
    ingredients: [
      '8 slices thick-cut bacon',
      '8 slices bread (sourdough or white sandwich bread)',
      '2 large ripe tomatoes, sliced',
      '4 leaves romaine or iceberg lettuce',
      '4 tablespoons mayonnaise',
      '1 tablespoon Dijon mustard (optional)',
      'salt and pepper to taste',
    ]
  },

  {
    id: 'lunch-handheld-suggested-egg-salad-sandwich',
    path: 'recipes/lunch/handheld/egg-salad-sandwich.md',
    source_url: 'https://www.allrecipes.com/recipe/4565/classic-egg-salad/',
    ingredients: [
      '8 hard-boiled eggs, peeled and chopped',
      '3 tablespoons mayonnaise',
      '1 tablespoon Dijon mustard',
      '2 stalks celery, finely diced',
      '2 tablespoons fresh chives or dill, chopped',
      '1 tablespoon lemon juice',
      'salt and pepper to taste',
      '8 slices bread or 4 croissants',
      'lettuce and tomato for serving',
    ]
  },

  {
    id: 'lunch-handheld-suggested-quesadillas',
    path: 'recipes/lunch/handheld/quesadillas.md',
    source_url: 'https://www.allrecipes.com/recipe/223042/easy-chicken-quesadillas/',
    ingredients: [
      '2 cups cooked chicken, shredded',
      '4 large flour tortillas',
      '2 cups shredded Monterey Jack or cheddar cheese',
      '1/2 cup diced bell peppers',
      '1/4 cup diced red onion',
      '1 tablespoon butter or olive oil',
      '1 teaspoon cumin',
      '1/2 teaspoon garlic powder',
      'salt and pepper to taste',
      'sour cream, salsa, and guacamole for serving',
    ]
  },

  {
    id: 'lunch-handheld-suggested-tuna-salad-sandwich',
    path: 'recipes/lunch/handheld/tuna-salad-sandwich.md',
    source_url: 'https://www.allrecipes.com/recipe/23544/tuna-salad/',
    ingredients: [
      '2 cans tuna in water (5 oz each), drained',
      '3 tablespoons mayonnaise',
      '1 tablespoon Dijon mustard',
      '2 stalks celery, finely diced',
      '2 tablespoons red onion, finely diced',
      '1 tablespoon lemon juice',
      '1 tablespoon fresh dill or parsley, chopped',
      'salt and pepper to taste',
      '8 slices bread',
      'lettuce and tomato for serving',
    ]
  },

  {
    id: 'lunch-handheld-suggested-turkey-and-avocado-wrap',
    path: 'recipes/lunch/handheld/turkey-and-avocado-wrap.md',
    source_url: 'https://www.eatingwell.com/recipe/269311/turkey-avocado-wrap/',
    ingredients: [
      '4 large flour tortillas',
      '8 oz deli turkey breast, sliced',
      '2 ripe avocados, sliced',
      '4 oz cream cheese or hummus',
      '2 cups baby spinach or mixed greens',
      '1 large tomato, sliced',
      '1/2 red onion, thinly sliced',
      '4 oz Swiss or provolone cheese, sliced',
      '1 tablespoon lemon juice',
      'salt and pepper to taste',
    ]
  },

  {
    id: 'lunch-soup-or-stew-suggested-lentil-soup',
    path: 'recipes/lunch/soup-or-stew/lentil-soup.md',
    source_url: 'https://www.allrecipes.com/recipe/22028/lentil-soup/',
    ingredients: [
      '2 cups green or brown lentils, rinsed',
      '6 cups chicken or vegetable broth',
      '1 large onion, diced',
      '3 carrots, diced',
      '3 stalks celery, diced',
      '4 cloves garlic, minced',
      '1 can diced tomatoes (14 oz)',
      '2 teaspoons cumin',
      '1 teaspoon turmeric',
      '1 teaspoon smoked paprika',
      '1/2 teaspoon coriander',
      '2 tablespoons olive oil',
      'juice of 1 lemon',
      'salt and pepper to taste',
      'fresh parsley for garnish',
      'crusty bread for serving',
    ]
  },

];

// ============================================================
// UTILITY: Read and update a markdown file's ingredients section
// ============================================================

function updateIngredients(filePath, ingredients, sourceUrl) {
  const fullPath = join(repoRoot, filePath);

  if (!existsSync(fullPath)) {
    console.log(`  SKIP (file not found): ${filePath}`);
    return false;
  }

  let content = readFileSync(fullPath, 'utf8');

  // Update source_url in frontmatter if it is empty or a placeholder
  if (sourceUrl) {
    content = content.replace(
      /^source_url:\s*$/m,
      `source_url: ${sourceUrl}`
    );
    // Also replace placeholder allrecipes URLs that point to recipe/228285
    // (these were placeholder URLs we used when the real URL was unknown)
    content = content.replace(
      /^source_url: https:\/\/www\.allrecipes\.com\/recipe\/228285\/.*$/m,
      `source_url: ${sourceUrl}`
    );
  }

  // Build new ingredients block
  const newIngredientLines = ingredients.map(i => `- ${i}`).join('\n');

  // Replace the ingredients section
  // Matches "## Ingredients\n\n- item\n- item\n..." up to the next ## heading
  const ingredientsSectionRegex = /## Ingredients\n\n[\s\S]*?(?=\n## |\n---|\n$)/;

  const newSection = `## Ingredients\n\n${newIngredientLines}\n`;

  if (ingredientsSectionRegex.test(content)) {
    content = content.replace(ingredientsSectionRegex, newSection);
  } else {
    // Fallback: look for a YAML-style ingredients list
    const yamlIngredientsRegex = /^ingredients:\n((?:  - .*\n)*)/m;
    if (yamlIngredientsRegex.test(content)) {
      const yamlIngredients = ingredients.map(i => `  - ${i}`).join('\n');
      content = content.replace(yamlIngredientsRegex, `ingredients:\n${yamlIngredients}\n`);
    } else {
      // Last resort: append a ## Ingredients section before ## Instructions
      if (content.includes('## Instructions')) {
        const instrIdx = content.indexOf('## Instructions');
        const ingredientBlock = `## Ingredients\n\n${newIngredientLines}\n\n`;
        content = content.slice(0, instrIdx) + ingredientBlock + content.slice(instrIdx);
        console.log(`  (inserted ingredients section)`);
      } else {
        // Append at end
        content = content + `\n## Ingredients\n\n${newIngredientLines}\n`;
        console.log(`  (appended ingredients section)`);
      }
    }
  }

  writeFileSync(fullPath, content, 'utf8');
  return true;
}

// ============================================================
// MAIN
// ============================================================

let updated = 0;
let skipped = 0;
let notFound = 0;

console.log(`Processing ${UPDATES.length} thin recipes...\n`);

for (const recipe of UPDATES) {
  process.stdout.write(`Updating: ${recipe.id}... `);
  const result = updateIngredients(recipe.path, recipe.ingredients, recipe.source_url);
  if (result) {
    console.log('OK');
    updated++;
  } else {
    notFound++;
  }
}

console.log('\n===== Update Complete =====');
console.log(`Updated:   ${updated}`);
console.log(`Not found: ${notFound}`);
console.log(`Skipped:   ${skipped}`);
console.log('\nNext step: node ./scripts/generate-ingredient-data.mjs');
