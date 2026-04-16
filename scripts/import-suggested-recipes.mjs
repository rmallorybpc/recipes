#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

const SUGGESTED_RECIPES = [
  {
    title: "Turkey and avocado wrap",
    meal: "lunch",
    style: "handheld",
    protein: "turkey",
    cuisine: "american",
    time_minutes: 10,
    servings: 2,
    source_url: "",
    keywords: "quick, no-cook, meal-prep, kid-friendly",
    summary: "A simple turkey and avocado wrap with crisp lettuce, tomato, and a smear of mayo or hummus. Ready in under 10 minutes.",
    ingredients: [
      "2 large flour tortillas",
      "6 oz sliced turkey breast",
      "1 avocado, sliced",
      "1 cup romaine lettuce, shredded",
      "1 tomato, sliced",
      "2 tablespoons mayo or hummus",
      "salt and pepper to taste"
    ],
    instructions: [
      "Lay tortillas flat and spread mayo or hummus across each one.",
      "Layer turkey, avocado, lettuce, and tomato evenly.",
      "Season with salt and pepper.",
      "Roll tightly and slice in half diagonally.",
      "Serve immediately or wrap in foil for meal prep."
    ],
    notes: [
      "Swap turkey for grilled chicken or canned tuna",
      "Add sliced red onion and mustard for extra flavor",
      "Keeps refrigerated for up to 4 hours if wrapped tightly"
    ]
  },
  {
    title: "Greek salad with chicken",
    meal: "lunch",
    style: "bowls",
    protein: "chicken",
    cuisine: "greek",
    time_minutes: 20,
    servings: 4,
    source_url: "",
    keywords: "fresh, mediterranean, healthy, summer",
    summary: "Chopped romaine with cucumber, tomato, red onion, olives, and feta topped with grilled or rotisserie chicken and Greek dressing.",
    ingredients: [
      "2 chicken breasts, grilled and sliced",
      "1 head romaine lettuce, chopped",
      "1 cucumber, diced",
      "2 tomatoes, diced",
      "1/2 red onion, thinly sliced",
      "1/2 cup kalamata olives",
      "1/2 cup feta cheese, crumbled",
      "3 tablespoons olive oil",
      "2 tablespoons red wine vinegar",
      "1 teaspoon dried oregano",
      "salt and pepper to taste"
    ],
    instructions: [
      "Season and grill chicken breasts over medium-high heat 6-7 minutes per side. Let rest and slice.",
      "Combine lettuce, cucumber, tomato, red onion, and olives in a large bowl.",
      "Whisk together olive oil, red wine vinegar, oregano, salt, and pepper.",
      "Toss salad with dressing.",
      "Top with sliced chicken and crumbled feta."
    ],
    notes: [
      "Use rotisserie chicken to make this a no-cook lunch",
      "Add pepperoncini for extra tang",
      "Dressing keeps refrigerated for one week"
    ]
  },
  {
    title: "BLT sandwich",
    meal: "lunch",
    style: "handheld",
    protein: "pork",
    cuisine: "american",
    time_minutes: 15,
    servings: 2,
    source_url: "",
    keywords: "classic, quick, kid-friendly, summer",
    summary: "The classic BLT - crispy bacon, fresh tomato, and crisp lettuce on toasted bread with mayo. Best in summer when tomatoes are at peak.",
    ingredients: [
      "8 strips bacon",
      "4 slices bread, toasted",
      "2 tomatoes, sliced thick",
      "4 leaves romaine or iceberg lettuce",
      "3 tablespoons mayonnaise",
      "salt and pepper to taste"
    ],
    instructions: [
      "Cook bacon in a skillet over medium heat until crispy, about 8 minutes. Drain on paper towels.",
      "Toast bread slices.",
      "Spread mayo on all four slices of toast.",
      "Layer lettuce, tomato, and bacon on two slices.",
      "Season tomato with salt and pepper.",
      "Top with remaining toast slices, slice diagonally, and serve."
    ],
    notes: [
      "Add sliced avocado to make a BLAT",
      "Use thick-cut bacon for best results",
      "Heirloom tomatoes from the farmers market make this exceptional in July and August"
    ]
  },
  {
    title: "Tuna salad sandwich",
    meal: "lunch",
    style: "handheld",
    protein: "seafood",
    cuisine: "american",
    time_minutes: 10,
    servings: 2,
    source_url: "",
    keywords: "quick, pantry, no-cook, meal-prep",
    summary: "Classic tuna salad with celery, red onion, and mayo on toasted bread. A pantry staple that comes together in minutes.",
    ingredients: [
      "2 cans tuna in water, drained",
      "3 tablespoons mayonnaise",
      "2 stalks celery, finely diced",
      "2 tablespoons red onion, finely diced",
      "1 tablespoon Dijon mustard",
      "1 tablespoon lemon juice",
      "salt and pepper to taste",
      "4 slices bread, toasted",
      "lettuce leaves for serving"
    ],
    instructions: [
      "Drain tuna well and flake into a bowl.",
      "Add mayo, celery, red onion, mustard, and lemon juice.",
      "Stir to combine and season with salt and pepper.",
      "Serve on toasted bread with lettuce."
    ],
    notes: [
      "Add diced dill pickle or pickle relish for a classic deli flavor",
      "Works great on crackers or in lettuce cups for a lower-carb option",
      "Keeps refrigerated for up to 3 days"
    ]
  },
  {
    title: "Quesadillas",
    meal: "lunch",
    style: "handheld",
    protein: "chicken",
    cuisine: "mexican",
    time_minutes: 15,
    servings: 2,
    source_url: "",
    keywords: "quick, kid-friendly, cheesy, weekday",
    summary: "Crispy flour tortillas filled with melted cheese and shredded chicken. Ready in 15 minutes and endlessly customizable.",
    ingredients: [
      "4 large flour tortillas",
      "2 cups shredded cooked chicken",
      "2 cups shredded Mexican cheese blend",
      "1/2 cup black beans, drained and rinsed",
      "1/4 cup pickled jalapenos (optional)",
      "1 tablespoon butter or oil for cooking",
      "salsa and sour cream for serving"
    ],
    instructions: [
      "Heat a large skillet over medium heat and add a small amount of butter or oil.",
      "Place one tortilla in the skillet. Add a layer of cheese, chicken, and black beans on half the tortilla.",
      "Fold the tortilla over and press down with a spatula.",
      "Cook 2-3 minutes per side until golden and crispy.",
      "Slice into wedges and serve with salsa and sour cream."
    ],
    notes: [
      "Use leftover rotisserie chicken for maximum speed",
      "Add sauteed peppers and onions for fajita-style quesadillas",
      "Swap chicken for black beans and corn for a vegetarian version"
    ]
  },
  {
    title: "Lentil soup",
    meal: "lunch",
    style: "soup-or-stew",
    protein: "none",
    cuisine: "mediterranean",
    time_minutes: 40,
    servings: 6,
    source_url: "",
    keywords: "vegetarian, vegan, healthy, meal-prep, high-protein",
    summary: "Hearty red lentil soup with carrots, celery, cumin, and lemon. A satisfying and inexpensive lunch that improves overnight.",
    ingredients: [
      "1 1/2 cups red lentils, rinsed",
      "1 large onion, diced",
      "3 cloves garlic, minced",
      "2 carrots, diced",
      "2 stalks celery, diced",
      "1 can diced tomatoes (14 oz)",
      "6 cups vegetable broth",
      "2 teaspoons cumin",
      "1 teaspoon turmeric",
      "1/2 teaspoon smoked paprika",
      "juice of 1 lemon",
      "2 tablespoons olive oil",
      "salt and pepper to taste",
      "fresh parsley for garnish"
    ],
    instructions: [
      "Heat olive oil in a large pot over medium heat. Add onion and cook 5 minutes until softened.",
      "Add garlic, carrots, and celery. Cook 3 minutes more.",
      "Stir in cumin, turmeric, and paprika. Cook 1 minute until fragrant.",
      "Add lentils, diced tomatoes, and broth. Bring to a boil.",
      "Reduce heat and simmer 25 minutes until lentils are fully soft.",
      "Use an immersion blender to partially blend for a creamy texture, or leave fully chunky.",
      "Stir in lemon juice and adjust seasoning."
    ],
    notes: [
      "Freezes beautifully for up to 3 months",
      "Add a dollop of Greek yogurt on top when serving",
      "Red lentils break down faster than green - no soaking needed"
    ]
  },
  {
    title: "Caprese salad with prosciutto",
    meal: "lunch",
    style: "bowls",
    protein: "pork",
    cuisine: "italian",
    time_minutes: 10,
    servings: 2,
    source_url: "",
    keywords: "no-cook, fresh, summer, elegant, quick",
    summary: "Fresh mozzarella, ripe tomatoes, and basil drizzled with olive oil and balsamic, topped with thin-sliced prosciutto. Perfect in summer when tomatoes are at peak.",
    ingredients: [
      "3 large ripe tomatoes, sliced",
      "8 oz fresh mozzarella, sliced",
      "1/4 cup fresh basil leaves",
      "4 oz prosciutto, thin sliced",
      "3 tablespoons good olive oil",
      "2 tablespoons balsamic glaze",
      "flaky sea salt and black pepper"
    ],
    instructions: [
      "Arrange alternating slices of tomato and mozzarella on a platter.",
      "Tuck basil leaves between the slices.",
      "Drape prosciutto across the top.",
      "Drizzle generously with olive oil and balsamic glaze.",
      "Finish with flaky salt and cracked black pepper.",
      "Serve immediately."
    ],
    notes: [
      "This is a no-cook recipe - quality of ingredients matters most",
      "Heirloom tomatoes from a Colorado farmers market in July and August are exceptional here",
      "Omit prosciutto for a vegetarian version"
    ]
  },
  {
    title: "Egg salad sandwich",
    meal: "lunch",
    style: "handheld",
    protein: "none",
    cuisine: "american",
    time_minutes: 20,
    servings: 2,
    source_url: "",
    keywords: "quick, pantry, kid-friendly, no-cook",
    summary: "Creamy egg salad with Dijon, celery, and chives on toasted bread. A classic that comes together in 20 minutes including boiling the eggs.",
    ingredients: [
      "6 large eggs",
      "3 tablespoons mayonnaise",
      "1 tablespoon Dijon mustard",
      "2 stalks celery, finely diced",
      "2 tablespoons fresh chives, minced",
      "1 tablespoon lemon juice",
      "salt and pepper to taste",
      "4 slices bread, toasted",
      "lettuce and sliced tomato for serving"
    ],
    instructions: [
      "Place eggs in a pot, cover with cold water, and bring to a boil. Remove from heat, cover, and let sit 10 minutes.",
      "Transfer eggs to an ice bath and peel when cool.",
      "Chop eggs and combine with mayo, mustard, celery, chives, and lemon juice.",
      "Season with salt and pepper.",
      "Serve on toasted bread with lettuce and tomato."
    ],
    notes: [
      "Add a pinch of smoked paprika on top for extra color",
      "Works well in lettuce cups for a lighter version",
      "Keeps refrigerated for up to 3 days"
    ]
  },
  {
    title: "Asian noodle salad",
    meal: "lunch",
    style: "bowls",
    protein: "none",
    cuisine: "asian",
    time_minutes: 20,
    servings: 4,
    source_url: "",
    keywords: "vegetarian, meal-prep, cold, summer, fresh",
    summary: "Cold rice noodles with shredded cabbage, carrots, cucumber, and scallions in a sesame-ginger dressing. Great for meal prep.",
    ingredients: [
      "8 oz rice noodles",
      "2 cups shredded purple cabbage",
      "2 carrots, julienned or grated",
      "1 cucumber, thinly sliced",
      "4 scallions, sliced",
      "1/4 cup fresh cilantro",
      "1/4 cup roasted peanuts, roughly chopped",
      "3 tablespoons soy sauce",
      "2 tablespoons sesame oil",
      "1 tablespoon rice vinegar",
      "1 tablespoon honey",
      "1 teaspoon fresh ginger, grated",
      "1 clove garlic, minced",
      "juice of 1 lime"
    ],
    instructions: [
      "Cook rice noodles according to package directions. Drain and rinse with cold water.",
      "Whisk together soy sauce, sesame oil, rice vinegar, honey, ginger, garlic, and lime juice.",
      "Toss noodles with cabbage, carrots, cucumber, and scallions.",
      "Pour dressing over and toss well to combine.",
      "Top with cilantro and peanuts.",
      "Serve at room temperature or chilled."
    ],
    notes: [
      "Add grilled chicken or shrimp to make it a complete protein meal",
      "Keeps refrigerated for up to 3 days",
      "Swap peanuts for edamame for a nut-free version"
    ]
  },
  {
    title: "Black bean tacos",
    meal: "lunch",
    style: "handheld",
    protein: "none",
    cuisine: "mexican",
    time_minutes: 20,
    servings: 4,
    source_url: "",
    keywords: "vegetarian, vegan, quick, budget, kid-friendly",
    summary: "Crispy black bean tacos with shredded cabbage slaw, avocado, and a squeeze of lime. A fast and filling meatless lunch.",
    ingredients: [
      "2 cans black beans, drained and rinsed",
      "1 teaspoon cumin",
      "1 teaspoon chili powder",
      "1/2 teaspoon garlic powder",
      "salt to taste",
      "8 small corn or flour tortillas",
      "2 cups shredded cabbage",
      "1 avocado, sliced",
      "1/2 cup salsa",
      "juice of 1 lime",
      "fresh cilantro for garnish"
    ],
    instructions: [
      "Heat black beans in a skillet over medium heat. Season with cumin, chili powder, garlic powder, and salt. Mash roughly with a fork until about half the beans are broken down.",
      "Warm tortillas in a dry skillet or directly over a gas burner.",
      "Toss shredded cabbage with lime juice and a pinch of salt.",
      "Fill each tortilla with beans, cabbage slaw, avocado, and salsa.",
      "Top with cilantro and serve with extra lime wedges."
    ],
    notes: [
      "Add a drizzle of hot sauce or chipotle mayo for heat",
      "These work great as a quick weeknight dinner too",
      "Swap black beans for pinto beans if preferred"
    ]
  },
  {
    title: "Shrimp tacos with mango slaw",
    meal: "dinner",
    style: "handheld",
    protein: "shrimp",
    cuisine: "mexican",
    time_minutes: 25,
    servings: 4,
    source_url: "",
    keywords: "fresh, summer, coastal, quick",
    summary: "Chili-lime shrimp in warm tortillas topped with a bright mango and cabbage slaw. A fast and vibrant dinner that feels like summer.",
    ingredients: [
      "1 lb large shrimp, peeled and deveined",
      "1 teaspoon chili powder",
      "1/2 teaspoon cumin",
      "1/2 teaspoon garlic powder",
      "juice of 1 lime",
      "1 tablespoon olive oil",
      "8 small corn or flour tortillas",
      "2 cups shredded cabbage",
      "1 mango, diced",
      "1/4 red onion, thinly sliced",
      "1/4 cup fresh cilantro",
      "2 tablespoons lime juice",
      "1 tablespoon honey",
      "salt to taste",
      "avocado and sour cream for serving"
    ],
    instructions: [
      "Toss shrimp with chili powder, cumin, garlic powder, lime juice, and olive oil.",
      "Make the slaw by combining cabbage, mango, red onion, cilantro, lime juice, and honey. Season with salt.",
      "Heat a skillet over high heat. Cook shrimp 2 minutes per side until pink and slightly charred.",
      "Warm tortillas in a dry skillet.",
      "Fill tortillas with shrimp and top with mango slaw.",
      "Serve with avocado and sour cream."
    ],
    notes: [
      "Substitute peaches for mango in late summer when Colorado peaches are at peak",
      "The slaw can be made 2 hours ahead and refrigerated",
      "For extra heat add diced jalapeno to the slaw"
    ]
  },
  {
    title: "Garlic butter shrimp with pasta",
    meal: "dinner",
    style: "rice-or-pasta",
    protein: "shrimp",
    cuisine: "italian",
    time_minutes: 25,
    servings: 4,
    source_url: "",
    keywords: "quick, weeknight, elegant, date-night",
    summary: "Juicy shrimp sauteed in garlic butter with white wine and lemon tossed through linguine. Ready in 25 minutes.",
    ingredients: [
      "1 lb large shrimp, peeled and deveined",
      "12 oz linguine",
      "4 tablespoons butter",
      "4 cloves garlic, minced",
      "1/2 cup dry white wine",
      "juice of 1 lemon",
      "1/4 teaspoon red pepper flakes",
      "1/4 cup fresh parsley, chopped",
      "1/4 cup Parmesan cheese, grated",
      "salt and pepper to taste",
      "olive oil for cooking"
    ],
    instructions: [
      "Cook linguine according to package directions. Reserve 1/2 cup pasta water before draining.",
      "Heat olive oil in a large skillet over medium-high heat. Season shrimp with salt and pepper.",
      "Cook shrimp 2 minutes per side until pink. Remove and set aside.",
      "In the same skillet, melt butter over medium heat. Add garlic and red pepper flakes, cook 1 minute.",
      "Add white wine and simmer 2 minutes. Add lemon juice.",
      "Toss in drained pasta and reserved pasta water. Add shrimp back.",
      "Finish with parsley and Parmesan."
    ],
    notes: [
      "Use chicken broth instead of white wine if preferred",
      "Add cherry tomatoes or baby spinach for extra vegetables",
      "Works great with fettuccine or spaghetti"
    ]
  },
  {
    title: "Baked salmon with asparagus",
    meal: "dinner",
    style: "seafood",
    protein: "salmon",
    cuisine: "american",
    time_minutes: 30,
    servings: 4,
    source_url: "",
    keywords: "healthy, spring, one-pan, quick, fresh",
    summary: "Sheet pan salmon and asparagus roasted together with lemon, garlic, and herbs. One pan, minimal cleanup, ready in 30 minutes.",
    ingredients: [
      "4 salmon fillets (6 oz each)",
      "1 lb asparagus, trimmed",
      "3 tablespoons olive oil",
      "4 cloves garlic, minced",
      "juice of 1 lemon",
      "zest of 1 lemon",
      "1 teaspoon dried thyme or dill",
      "salt and pepper to taste",
      "lemon slices for serving"
    ],
    instructions: [
      "Preheat oven to 400°F. Line a baking sheet with parchment paper.",
      "Arrange asparagus on the baking sheet and toss with 2 tablespoons olive oil, salt, and pepper.",
      "Nestle salmon fillets among the asparagus.",
      "Mix remaining olive oil with garlic, lemon juice, lemon zest, and thyme. Spoon over salmon.",
      "Season salmon with salt and pepper.",
      "Roast 15-18 minutes until salmon flakes easily with a fork.",
      "Serve with lemon slices."
    ],
    notes: [
      "Asparagus is at peak in Colorado in May and June",
      "Swap thyme for fresh dill for a more classic flavor pairing",
      "Works with any thick-cut fish fillet"
    ]
  },
  {
    title: "Fish tacos with cabbage slaw",
    meal: "dinner",
    style: "handheld",
    protein: "fish",
    cuisine: "mexican",
    time_minutes: 25,
    servings: 4,
    source_url: "",
    keywords: "fresh, quick, coastal, summer",
    summary: "Crispy pan-fried white fish in corn tortillas with tangy cabbage slaw and a chipotle crema.",
    ingredients: [
      "1 lb white fish fillets (cod, tilapia, or mahi-mahi)",
      "1 teaspoon cumin",
      "1 teaspoon chili powder",
      "1/2 teaspoon garlic powder",
      "salt and pepper",
      "2 tablespoons olive oil",
      "8 corn tortillas",
      "2 cups shredded green cabbage",
      "1/4 cup sour cream",
      "2 tablespoons mayonnaise",
      "juice of 2 limes",
      "1 chipotle pepper in adobo, minced",
      "1 teaspoon adobo sauce",
      "fresh cilantro and avocado for serving"
    ],
    instructions: [
      "Season fish with cumin, chili powder, garlic powder, salt, and pepper.",
      "Heat olive oil in a skillet over medium-high heat. Cook fish 3-4 minutes per side until opaque and lightly browned. Break into chunks.",
      "Make chipotle crema by mixing sour cream, mayo, lime juice, chipotle pepper, and adobo sauce.",
      "Toss cabbage with a squeeze of lime juice and a pinch of salt.",
      "Warm tortillas in a dry skillet.",
      "Fill tortillas with fish, cabbage slaw, and chipotle crema.",
      "Top with cilantro and avocado."
    ],
    notes: [
      "Frozen cod or tilapia works perfectly here",
      "The chipotle crema can be made 3 days ahead",
      "For a crunchier fish dust with seasoned flour before cooking"
    ]
  },
  {
    title: "Shrimp fried rice",
    meal: "dinner",
    style: "rice-or-pasta",
    protein: "shrimp",
    cuisine: "asian",
    time_minutes: 20,
    servings: 4,
    source_url: "",
    keywords: "quick, weeknight, pantry, leftover-rice",
    summary: "Classic shrimp fried rice with egg, peas, carrots, and soy sauce. Best made with day-old refrigerated rice.",
    ingredients: [
      "1 lb medium shrimp, peeled and deveined",
      "3 cups cooked rice, preferably day-old",
      "3 eggs, beaten",
      "1 cup frozen peas and carrots",
      "4 cloves garlic, minced",
      "3 tablespoons soy sauce",
      "1 tablespoon oyster sauce",
      "1 teaspoon sesame oil",
      "3 scallions, sliced",
      "2 tablespoons vegetable oil",
      "salt and pepper to taste"
    ],
    instructions: [
      "Heat 1 tablespoon oil in a wok over high heat. Season shrimp with salt and pepper and cook 2 minutes per side until pink. Remove.",
      "Add remaining oil. Add garlic and cook 30 seconds.",
      "Add peas and carrots, stir fry 2 minutes.",
      "Push vegetables to the side. Add beaten eggs and scramble until just set.",
      "Add cold rice, breaking up any clumps. Stir fry 2-3 minutes.",
      "Add shrimp back. Season with soy sauce, oyster sauce, and sesame oil.",
      "Toss everything together and finish with scallions."
    ],
    notes: [
      "Day-old rice is key - freshly cooked rice is too wet",
      "Substitute chicken or tofu for shrimp",
      "Add pineapple chunks for a Hawaiian-style variation"
    ]
  },
  {
    title: "Mediterranean baked cod",
    meal: "dinner",
    style: "seafood",
    protein: "fish",
    cuisine: "mediterranean",
    time_minutes: 30,
    servings: 4,
    source_url: "",
    keywords: "healthy, fresh, quick, one-pan, mediterranean",
    summary: "Cod fillets baked over cherry tomatoes, olives, capers, and white wine with lemon and herbs.",
    ingredients: [
      "4 cod fillets (6 oz each)",
      "2 cups cherry tomatoes, halved",
      "1/2 cup kalamata olives, pitted",
      "2 tablespoons capers",
      "4 cloves garlic, minced",
      "1/4 cup dry white wine",
      "3 tablespoons olive oil",
      "juice of 1 lemon",
      "1 teaspoon dried oregano",
      "fresh parsley for garnish",
      "salt and pepper to taste"
    ],
    instructions: [
      "Preheat oven to 400°F.",
      "Combine cherry tomatoes, olives, capers, garlic, white wine, and 2 tablespoons olive oil in a baking dish. Season with oregano, salt, and pepper.",
      "Roast the tomato mixture for 10 minutes.",
      "Season cod fillets with salt and pepper and nestle into the tomato mixture.",
      "Drizzle remaining olive oil and lemon juice over fish.",
      "Bake 15 minutes until fish is opaque and flakes easily.",
      "Garnish with fresh parsley and serve with crusty bread."
    ],
    notes: [
      "Halibut or sea bass work equally well here",
      "Serve over white rice or with crusty bread to soak up the sauce",
      "The tomato-olive base can be made a day ahead"
    ]
  },
  {
    title: "Clam chowder",
    meal: "dinner",
    style: "soup-or-stew",
    protein: "seafood",
    cuisine: "american",
    time_minutes: 45,
    servings: 6,
    source_url: "",
    keywords: "comfort, winter, creamy, hearty",
    summary: "Rich and creamy New England-style clam chowder with tender potatoes, smoky bacon, and briny clams.",
    ingredients: [
      "4 strips bacon, chopped",
      "1 large onion, diced",
      "3 stalks celery, diced",
      "3 cloves garlic, minced",
      "3 medium potatoes, peeled and diced",
      "3 cans chopped clams (6.5 oz each), juice reserved",
      "2 cups chicken or clam broth",
      "1 1/2 cups heavy cream",
      "2 tablespoons butter",
      "2 tablespoons flour",
      "1 teaspoon dried thyme",
      "salt and white pepper to taste",
      "fresh chives for garnish",
      "oyster crackers for serving"
    ],
    instructions: [
      "Cook bacon in a large pot until crispy. Remove and leave 1 tablespoon fat.",
      "Add onion and celery. Cook 5 minutes. Add garlic and cook 1 minute.",
      "Stir in butter and flour. Cook 2 minutes.",
      "Add potatoes, reserved clam juice, and broth. Simmer 15-20 minutes until potatoes are tender.",
      "Stir in clams, heavy cream, and thyme. Simmer 5 minutes. Do not boil after adding cream.",
      "Season with salt and white pepper.",
      "Serve topped with bacon, chives, and oyster crackers."
    ],
    notes: [
      "For a thicker chowder mash some potatoes against the pot",
      "Use fresh clams when in season for superior flavor",
      "Keeps refrigerated for 3 days - reheat gently"
    ]
  },
  {
    title: "Teriyaki salmon bowls",
    meal: "dinner",
    style: "bowls",
    protein: "salmon",
    cuisine: "japanese",
    time_minutes: 25,
    servings: 4,
    source_url: "",
    keywords: "healthy, fresh, quick, meal-prep, asian",
    summary: "Glazed teriyaki salmon over steamed rice with cucumber, edamame, avocado, and a drizzle of sriracha mayo.",
    ingredients: [
      "4 salmon fillets (6 oz each)",
      "3 tablespoons soy sauce",
      "2 tablespoons honey",
      "1 tablespoon rice vinegar",
      "1 teaspoon sesame oil",
      "1 teaspoon fresh ginger, grated",
      "2 cloves garlic, minced",
      "2 cups rice, cooked",
      "1 cucumber, sliced",
      "1 cup edamame, shelled and cooked",
      "1 avocado, sliced",
      "2 scallions, sliced",
      "sesame seeds for garnish",
      "sriracha mayo for drizzling"
    ],
    instructions: [
      "Whisk together soy sauce, honey, rice vinegar, sesame oil, ginger, and garlic to make teriyaki sauce.",
      "Coat salmon fillets in half the sauce and let marinate 10 minutes.",
      "Heat a skillet over medium-high heat with oil. Cook salmon 4-5 minutes per side, basting with remaining sauce in the last minute.",
      "Build bowls with rice as the base, then cucumber, edamame, and avocado.",
      "Top with salmon, scallions, and sesame seeds.",
      "Drizzle with sriracha mayo."
    ],
    notes: [
      "Make sriracha mayo by mixing 2 tablespoons mayo with 1-2 teaspoons sriracha",
      "Use store-bought teriyaki sauce for a faster weeknight version",
      "Great as meal prep - keep components separate and assemble when eating"
    ]
  },
  {
    title: "Vegetable curry",
    meal: "dinner",
    style: "bowls",
    protein: "none",
    cuisine: "indian",
    time_minutes: 40,
    servings: 4,
    source_url: "",
    keywords: "vegetarian, vegan, healthy, meal-prep, warming",
    summary: "A warming coconut milk vegetable curry with chickpeas, sweet potato, spinach, and aromatic spices served over basmati rice.",
    ingredients: [
      "1 can chickpeas, drained and rinsed",
      "1 large sweet potato, diced",
      "2 cups baby spinach",
      "1 can coconut milk (14 oz)",
      "1 can diced tomatoes (14 oz)",
      "1 large onion, diced",
      "4 cloves garlic, minced",
      "1 tablespoon fresh ginger, grated",
      "2 tablespoons curry powder",
      "1 teaspoon cumin",
      "1 teaspoon turmeric",
      "1/2 teaspoon cayenne pepper",
      "2 tablespoons vegetable oil",
      "salt to taste",
      "basmati rice and naan for serving",
      "fresh cilantro for garnish"
    ],
    instructions: [
      "Heat oil in a large pot over medium heat. Add onion and cook 5 minutes.",
      "Add garlic and ginger. Cook 1 minute more.",
      "Stir in curry powder, cumin, turmeric, and cayenne. Cook 1 minute until fragrant.",
      "Add diced tomatoes, coconut milk, sweet potato, and chickpeas.",
      "Simmer 20-25 minutes until sweet potato is tender.",
      "Stir in spinach and cook 2 minutes until wilted.",
      "Season with salt and serve over rice with naan."
    ],
    notes: [
      "Add a squeeze of lemon juice at the end to brighten the flavors",
      "Swap sweet potato for butternut squash in fall",
      "Freezes beautifully for up to 3 months"
    ]
  },
  {
    title: "Black bean enchiladas",
    meal: "dinner",
    style: "baked-casserole",
    protein: "none",
    cuisine: "mexican",
    time_minutes: 45,
    servings: 6,
    source_url: "",
    keywords: "vegetarian, comfort, make-ahead, crowd-pleaser",
    summary: "Corn tortillas filled with seasoned black beans, roasted corn, and cheese smothered in red enchilada sauce and baked until bubbly.",
    ingredients: [
      "2 cans black beans, drained and rinsed",
      "1 1/2 cups frozen corn, thawed",
      "1 can red enchilada sauce (28 oz)",
      "2 cups shredded Mexican cheese blend",
      "1 small onion, diced",
      "3 cloves garlic, minced",
      "1 teaspoon cumin",
      "1 teaspoon chili powder",
      "10 small corn tortillas",
      "2 tablespoons olive oil",
      "salt and pepper to taste",
      "sour cream, avocado, and cilantro for serving"
    ],
    instructions: [
      "Preheat oven to 375°F.",
      "Heat oil in a skillet. Cook onion 5 minutes. Add garlic, cumin, and chili powder. Cook 1 minute.",
      "Add black beans and corn. Season and cook 3 minutes.",
      "Spread 1/2 cup enchilada sauce on the bottom of a 9x13 baking dish.",
      "Fill each tortilla with the bean mixture and a sprinkle of cheese. Roll and place seam-side down.",
      "Pour remaining sauce over enchiladas and top with remaining cheese.",
      "Cover with foil and bake 20 minutes. Uncover and bake 10 more minutes."
    ],
    notes: [
      "Assemble the night before and refrigerate - bake straight from the fridge adding 10 minutes",
      "Add sauteed bell peppers or zucchini to the filling",
      "Hatch green chile in the sauce makes this exceptional in late summer"
    ]
  },
  {
    title: "Mushroom risotto",
    meal: "dinner",
    style: "rice-or-pasta",
    protein: "none",
    cuisine: "italian",
    time_minutes: 45,
    servings: 4,
    source_url: "",
    keywords: "vegetarian, comfort, elegant, date-night, weekend",
    summary: "Creamy Arborio rice slowly cooked with sauteed mushrooms, white wine, Parmesan, and fresh thyme.",
    ingredients: [
      "1 1/2 cups Arborio rice",
      "1 lb mixed mushrooms (cremini, shiitake, or portobello), sliced",
      "1 large onion, finely diced",
      "4 cloves garlic, minced",
      "1/2 cup dry white wine",
      "5 cups vegetable or chicken broth, warmed",
      "1/2 cup Parmesan cheese, grated",
      "3 tablespoons butter",
      "2 tablespoons olive oil",
      "2 teaspoons fresh thyme",
      "salt and pepper to taste",
      "fresh parsley for garnish"
    ],
    instructions: [
      "Heat broth in a separate saucepan and keep warm over low heat.",
      "Heat olive oil in a large skillet. Cook mushrooms without stirring 5 minutes until browned. Season and set aside.",
      "In the same pan, melt 1 tablespoon butter and cook onion 5 minutes. Add garlic and thyme.",
      "Add Arborio rice and toast 2 minutes, stirring.",
      "Add white wine and stir until absorbed.",
      "Add warm broth one ladle at a time, stirring continuously and waiting for each addition to absorb before adding the next. Continue 20-25 minutes.",
      "Stir in remaining butter, Parmesan, and mushrooms. Season and serve."
    ],
    notes: [
      "Do not rush the broth additions - patience is the secret to creamy risotto",
      "Add truffle oil at the end for a luxurious finish",
      "Works great as a base for leftover rotisserie chicken added at the end"
    ]
  },
  {
    title: "Eggplant parmesan",
    meal: "dinner",
    style: "baked-casserole",
    protein: "none",
    cuisine: "italian",
    time_minutes: 60,
    servings: 6,
    source_url: "",
    keywords: "vegetarian, comfort, weekend, crowd-pleaser, make-ahead",
    summary: "Sliced eggplant breaded and baked then layered with marinara and mozzarella and baked until bubbly.",
    ingredients: [
      "2 large eggplants, sliced into 1/2-inch rounds",
      "2 eggs, beaten",
      "1 1/2 cups Italian seasoned breadcrumbs",
      "1/2 cup Parmesan cheese, grated",
      "3 cups marinara sauce",
      "2 cups shredded mozzarella cheese",
      "1/2 cup fresh basil leaves",
      "2 tablespoons olive oil",
      "salt and pepper to taste"
    ],
    instructions: [
      "Preheat oven to 400°F. Salt eggplant slices and let sit 15 minutes. Pat dry.",
      "Mix breadcrumbs with Parmesan. Dip each eggplant slice in egg then breadcrumb mixture.",
      "Arrange on oiled baking sheets. Brush with olive oil and bake 20 minutes flipping halfway until golden.",
      "Reduce oven to 375°F.",
      "Spread 1 cup marinara in a 9x13 baking dish. Add a layer of eggplant. Top with sauce, mozzarella, and basil. Repeat layers.",
      "Finish with remaining sauce and mozzarella.",
      "Cover with foil and bake 25 minutes. Uncover and bake 15 more minutes until bubbly."
    ],
    notes: [
      "Eggplant is available locally in Colorado from July through September",
      "The assembled dish can be refrigerated overnight before baking",
      "Serve with crusty bread and a green salad"
    ]
  },
  {
    title: "Veggie stir fry with tofu",
    meal: "dinner",
    style: "vegetarian",
    protein: "tofu",
    cuisine: "asian",
    time_minutes: 25,
    servings: 4,
    source_url: "",
    keywords: "vegetarian, vegan, quick, healthy, weeknight",
    summary: "Crispy baked tofu and colorful vegetables in a savory ginger-garlic sauce served over rice.",
    ingredients: [
      "14 oz extra-firm tofu, pressed and cubed",
      "2 cups broccoli florets",
      "1 red bell pepper, sliced",
      "1 cup snap peas",
      "2 carrots, sliced thin",
      "4 cloves garlic, minced",
      "1 tablespoon fresh ginger, grated",
      "3 tablespoons soy sauce",
      "1 tablespoon hoisin sauce",
      "1 tablespoon sesame oil",
      "1 teaspoon cornstarch",
      "2 tablespoons vegetable oil",
      "cooked rice for serving",
      "sesame seeds for garnish"
    ],
    instructions: [
      "Preheat oven to 400°F. Toss tofu with 1 tablespoon soy sauce and spread on a lined baking sheet. Bake 25 minutes until crispy.",
      "Mix remaining soy sauce, hoisin, sesame oil, and cornstarch in a small bowl.",
      "Heat vegetable oil in a wok over high heat. Add carrots and broccoli, stir fry 3 minutes.",
      "Add bell pepper and snap peas. Stir fry 2 minutes more.",
      "Add garlic and ginger. Cook 30 seconds.",
      "Pour sauce over vegetables and toss. Add crispy tofu.",
      "Serve over rice with sesame seeds."
    ],
    notes: [
      "Press tofu for at least 30 minutes for maximum crispiness",
      "Any firm vegetable works here - use what is in season",
      "Add a drizzle of chili oil for heat"
    ]
  },
  {
    title: "Caprese pasta",
    meal: "dinner",
    style: "rice-or-pasta",
    protein: "none",
    cuisine: "italian",
    time_minutes: 20,
    servings: 4,
    source_url: "",
    keywords: "vegetarian, quick, summer, fresh, no-cook-sauce",
    summary: "Hot pasta tossed with fresh mozzarella, cherry tomatoes, torn basil, and good olive oil. The heat melts the cheese into a light creamy sauce.",
    ingredients: [
      "12 oz pasta (penne or rigatoni)",
      "2 cups cherry tomatoes, halved",
      "8 oz fresh mozzarella, torn into pieces",
      "1/2 cup fresh basil, roughly torn",
      "3 tablespoons good olive oil",
      "2 cloves garlic, minced",
      "1/4 teaspoon red pepper flakes",
      "salt and pepper to taste",
      "balsamic glaze for drizzling"
    ],
    instructions: [
      "Cook pasta according to package directions. Reserve 1/2 cup pasta water before draining.",
      "While pasta cooks, combine cherry tomatoes, mozzarella, basil, olive oil, garlic, and red pepper flakes in a large bowl.",
      "Drain pasta and immediately add to the bowl. Toss vigorously.",
      "Add a splash of pasta water if needed to loosen the sauce.",
      "Season with salt and pepper.",
      "Drizzle with balsamic glaze and serve immediately."
    ],
    notes: [
      "Quality ingredients matter most here",
      "Cherry tomatoes from a Colorado farmers market in July and August are exceptional",
      "Serve immediately - this does not hold well as leftovers"
    ]
  },
  {
    title: "Shakshuka",
    meal: "dinner",
    style: "vegetarian",
    protein: "none",
    cuisine: "middle-eastern",
    time_minutes: 30,
    servings: 4,
    source_url: "",
    keywords: "vegetarian, quick, one-pan, healthy, egg-based",
    summary: "Eggs poached in a spiced tomato and pepper sauce. A Middle Eastern classic that works for breakfast, brunch, or dinner.",
    ingredients: [
      "6 large eggs",
      "1 can crushed tomatoes (28 oz)",
      "1 large onion, diced",
      "1 red bell pepper, diced",
      "4 cloves garlic, minced",
      "1 jalapeno, seeded and minced",
      "2 teaspoons cumin",
      "1 teaspoon smoked paprika",
      "1/2 teaspoon cayenne pepper",
      "2 tablespoons olive oil",
      "salt and pepper to taste",
      "fresh parsley or cilantro for garnish",
      "feta cheese for topping (optional)",
      "crusty bread for serving"
    ],
    instructions: [
      "Heat olive oil in a large skillet over medium heat. Cook onion and bell pepper 7 minutes until soft.",
      "Add garlic and jalapeno. Cook 1 minute.",
      "Stir in cumin, paprika, and cayenne. Cook 1 minute until fragrant.",
      "Pour in crushed tomatoes. Season with salt and pepper. Simmer 10 minutes.",
      "Create 6 wells in the sauce with a spoon. Crack one egg into each well.",
      "Cover and cook on low heat 8-10 minutes until whites are set but yolks are still jammy.",
      "Top with parsley, feta if using, and serve with crusty bread."
    ],
    notes: [
      "This dish is also excellent for brunch",
      "Add crumbled chorizo for a non-vegetarian version",
      "Adjust spice level with more or less cayenne and jalapeno"
    ]
  },
  {
    title: "Butternut squash soup",
    meal: "dinner",
    style: "soup-or-stew",
    protein: "none",
    cuisine: "american",
    time_minutes: 45,
    servings: 6,
    source_url: "",
    keywords: "vegetarian, vegan, fall, meal-prep, comfort",
    summary: "Silky roasted butternut squash soup with apple, ginger, and a swirl of cream. A Colorado fall staple when winter squash is at peak.",
    ingredients: [
      "1 large butternut squash (about 3 lbs), peeled and cubed",
      "1 apple, peeled and diced",
      "1 large onion, diced",
      "3 cloves garlic, minced",
      "1 tablespoon fresh ginger, grated",
      "4 cups vegetable broth",
      "1/2 cup heavy cream or coconut milk",
      "2 tablespoons olive oil",
      "1/2 teaspoon nutmeg",
      "salt and pepper to taste",
      "pumpkin seeds and cream for garnish"
    ],
    instructions: [
      "Preheat oven to 400°F. Toss squash with 1 tablespoon olive oil, salt, and pepper. Roast 25-30 minutes until tender and slightly caramelized.",
      "Heat remaining oil in a large pot. Cook onion 5 minutes. Add garlic, ginger, and apple. Cook 3 minutes.",
      "Add roasted squash, broth, and nutmeg. Simmer 10 minutes.",
      "Use an immersion blender to puree until completely smooth.",
      "Stir in cream and adjust seasoning.",
      "Serve with a swirl of cream and pumpkin seeds."
    ],
    notes: [
      "Butternut squash is at peak in Colorado from September through November",
      "Roasting instead of boiling adds significant depth of flavor",
      "Freeze without the cream - add cream after reheating"
    ]
  },
  {
    title: "Spanakopita",
    meal: "dinner",
    style: "baked-casserole",
    protein: "none",
    cuisine: "greek",
    time_minutes: 60,
    servings: 8,
    source_url: "",
    keywords: "vegetarian, greek, weekend, impressive, make-ahead",
    summary: "Flaky phyllo pastry filled with spinach, feta, ricotta, and dill. A Greek classic that is surprisingly achievable at home.",
    ingredients: [
      "1 lb frozen phyllo dough, thawed overnight",
      "2 lbs fresh spinach (or 20 oz frozen, thawed and squeezed dry)",
      "1 cup feta cheese, crumbled",
      "1 cup ricotta cheese",
      "3 eggs, beaten",
      "1 large onion, finely diced",
      "4 cloves garlic, minced",
      "1/4 cup fresh dill, chopped",
      "1/4 cup fresh parsley, chopped",
      "1/2 cup butter, melted",
      "salt and pepper to taste",
      "nutmeg, a pinch"
    ],
    instructions: [
      "Preheat oven to 375°F. If using fresh spinach, saute until wilted then squeeze out excess water.",
      "Cook onion in olive oil 5 minutes. Add garlic, cook 1 minute. Let cool.",
      "Combine spinach, onion mixture, feta, ricotta, eggs, dill, parsley, and nutmeg. Season.",
      "Brush a 9x13 baking dish with butter. Layer 8-10 sheets of phyllo, brushing each with butter.",
      "Spread spinach filling evenly over phyllo.",
      "Layer remaining phyllo sheets on top, brushing each with butter.",
      "Score the top into squares. Bake 45-50 minutes until deep golden brown."
    ],
    notes: [
      "Phyllo dries out fast - keep unused sheets covered with a damp towel",
      "Assembles perfectly a day ahead",
      "Cut into triangles for appetizer portions"
    ]
  },
  {
    title: "Roasted vegetable grain bowls",
    meal: "dinner",
    style: "bowls",
    protein: "none",
    cuisine: "mediterranean",
    time_minutes: 45,
    servings: 4,
    source_url: "",
    keywords: "vegetarian, vegan, meal-prep, healthy, flexible",
    summary: "Roasted seasonal vegetables over farro or quinoa with hummus, pickled red onion, and a lemon-herb dressing.",
    ingredients: [
      "2 cups farro or quinoa",
      "2 zucchini, sliced",
      "1 red bell pepper, diced",
      "1 eggplant, cubed",
      "1 red onion, sliced into wedges",
      "3 tablespoons olive oil",
      "1 teaspoon cumin",
      "1 teaspoon smoked paprika",
      "salt and pepper to taste",
      "1 cup hummus",
      "1/2 cup cherry tomatoes, halved",
      "1/4 cup fresh parsley",
      "juice of 1 lemon",
      "2 tablespoons olive oil for dressing",
      "feta cheese for topping (optional)"
    ],
    instructions: [
      "Cook farro or quinoa according to package directions.",
      "Preheat oven to 425°F. Toss zucchini, bell pepper, eggplant, and red onion with olive oil, cumin, paprika, salt, and pepper.",
      "Spread on two baking sheets in a single layer. Roast 25-30 minutes until tender and caramelized.",
      "Make dressing by whisking lemon juice, olive oil, salt, and pepper.",
      "Build bowls with grains as the base, roasted vegetables, a scoop of hummus, and cherry tomatoes.",
      "Drizzle with dressing and top with parsley and feta."
    ],
    notes: [
      "This bowl changes beautifully with the season",
      "Farro has a nuttier chew than quinoa and holds up better in meal prep",
      "The roasted vegetables keep refrigerated for 5 days"
    ]
  },
  {
    title: "Chicken pad thai",
    meal: "dinner",
    style: "rice-or-pasta",
    protein: "chicken",
    cuisine: "thai",
    time_minutes: 30,
    servings: 4,
    source_url: "",
    keywords: "asian, thai, weeknight, noodles, quick",
    summary: "Rice noodles stir-fried with chicken, egg, bean sprouts, and a tangy tamarind-based sauce topped with peanuts and lime.",
    ingredients: [
      "8 oz flat rice noodles",
      "2 chicken breasts, sliced thin",
      "3 eggs, beaten",
      "2 cups bean sprouts",
      "4 scallions, sliced",
      "1/2 cup roasted peanuts, roughly chopped",
      "3 cloves garlic, minced",
      "3 tablespoons tamarind paste",
      "3 tablespoons fish sauce",
      "2 tablespoons sugar",
      "1 tablespoon oyster sauce",
      "2 tablespoons vegetable oil",
      "lime wedges and cilantro for serving"
    ],
    instructions: [
      "Soak rice noodles in warm water 20 minutes until pliable. Drain.",
      "Mix tamarind paste, fish sauce, sugar, and oyster sauce for the pad thai sauce.",
      "Heat oil in a wok over high heat. Cook chicken until done, about 4 minutes. Remove.",
      "Add garlic to the wok, cook 30 seconds. Add noodles and sauce, toss to coat.",
      "Push noodles to the side and scramble eggs in the pan. Fold into noodles.",
      "Add chicken back along with bean sprouts.",
      "Serve topped with peanuts, scallions, and a squeeze of lime."
    ],
    notes: [
      "Tamarind paste is available at King Soopers in the Asian foods aisle",
      "Substitute shrimp or tofu for chicken",
      "Keep the heat high throughout - this is a fast-cook dish"
    ]
  },
  {
    title: "Korean beef bulgogi bowls",
    meal: "dinner",
    style: "bowls",
    protein: "beef",
    cuisine: "korean",
    time_minutes: 30,
    servings: 4,
    source_url: "",
    keywords: "korean, asian, beef, weeknight, flavorful",
    summary: "Thinly sliced beef marinated in soy, pear, sesame, and garlic, quickly cooked and served over rice with kimchi and cucumber.",
    ingredients: [
      "1.5 lbs beef sirloin or ribeye, thinly sliced",
      "1/4 cup soy sauce",
      "2 tablespoons sesame oil",
      "2 tablespoons brown sugar",
      "1 Asian pear, grated",
      "4 cloves garlic, minced",
      "1 tablespoon fresh ginger, grated",
      "3 scallions, sliced",
      "1 tablespoon vegetable oil",
      "2 cups cooked rice",
      "cucumber slices, kimchi, and sesame seeds for serving"
    ],
    instructions: [
      "Combine soy sauce, sesame oil, brown sugar, grated pear, garlic, and ginger. Add beef and marinate at least 15 minutes.",
      "Heat vegetable oil in a skillet or wok over high heat.",
      "Cook beef in a single layer in batches, 1-2 minutes per side until caramelized. Do not overcrowd.",
      "Serve over rice with cucumber, kimchi, scallions, and sesame seeds."
    ],
    notes: [
      "Partially freezing the beef for 20 minutes makes it much easier to slice thin",
      "Grated pear is traditional and tenderizes the meat",
      "Serve with a fried egg on top for a more substantial bowl"
    ]
  },
  {
    title: "Thai green curry",
    meal: "dinner",
    style: "bowls",
    protein: "chicken",
    cuisine: "thai",
    time_minutes: 35,
    servings: 4,
    source_url: "",
    keywords: "thai, asian, coconut, quick, weeknight",
    summary: "Tender chicken and vegetables in a fragrant coconut milk green curry sauce. Serve over jasmine rice with fresh Thai basil.",
    ingredients: [
      "1.5 lbs chicken thighs, cut into chunks",
      "2 cans coconut milk (14 oz each)",
      "3 tablespoons green curry paste",
      "1 zucchini, sliced",
      "1 cup snap peas",
      "1 red bell pepper, sliced",
      "4 cloves garlic, minced",
      "1 tablespoon fresh ginger, grated",
      "2 tablespoons fish sauce",
      "1 tablespoon brown sugar",
      "juice of 1 lime",
      "1 cup Thai basil leaves",
      "2 tablespoons vegetable oil",
      "jasmine rice for serving"
    ],
    instructions: [
      "Heat oil in a large wok over medium-high heat. Add green curry paste and cook 1 minute until fragrant.",
      "Add garlic and ginger. Cook 30 seconds.",
      "Add chicken and cook 4 minutes until browned on the outside.",
      "Pour in coconut milk. Add fish sauce and sugar. Simmer 10 minutes.",
      "Add zucchini, snap peas, and bell pepper. Cook 5 more minutes.",
      "Stir in lime juice and Thai basil.",
      "Serve over jasmine rice."
    ],
    notes: [
      "Mae Ploy or Maesri green curry paste are both excellent",
      "Add bamboo shoots or baby corn for extra texture",
      "Use one can light and one can full-fat coconut milk for a balance"
    ]
  },
  {
    title: "Miso soup with tofu and vegetables",
    meal: "dinner",
    style: "soup-or-stew",
    protein: "tofu",
    cuisine: "japanese",
    time_minutes: 20,
    servings: 4,
    source_url: "",
    keywords: "japanese, vegetarian, quick, light, healthy",
    summary: "A warming miso soup with silken tofu, wakame seaweed, mushrooms, and scallions. Light enough as a starter, satisfying as a simple dinner with rice.",
    ingredients: [
      "4 cups dashi broth (or water with 1 teaspoon dashi powder)",
      "3 tablespoons white miso paste",
      "8 oz silken tofu, cubed",
      "1 cup shiitake mushrooms, sliced",
      "2 tablespoons dried wakame seaweed, soaked in water",
      "3 scallions, thinly sliced",
      "1 tablespoon soy sauce",
      "steamed rice for serving"
    ],
    instructions: [
      "Bring dashi broth to a simmer in a medium pot. Do not boil.",
      "Add mushrooms and simmer 5 minutes.",
      "Whisk miso paste with a ladleful of warm broth until smooth. Stir back into the pot. Do not boil after adding miso.",
      "Add tofu cubes and drained wakame.",
      "Heat through 2-3 minutes.",
      "Serve immediately topped with scallions."
    ],
    notes: [
      "White miso is milder and sweeter - red miso has a stronger flavor",
      "Add a soft-boiled egg on top for extra protein",
      "Dashi powder and wakame are available in most grocery stores"
    ]
  },
  {
    title: "Vietnamese pho",
    meal: "dinner",
    style: "soup-or-stew",
    protein: "beef",
    cuisine: "vietnamese",
    time_minutes: 45,
    servings: 4,
    source_url: "",
    keywords: "asian, vietnamese, warming, noodles, weekend",
    summary: "A simplified home version of Vietnamese beef pho with fragrant star anise broth, rice noodles, thin sliced beef, and fresh herbs.",
    ingredients: [
      "8 cups beef broth",
      "1 lb beef sirloin, very thinly sliced",
      "8 oz rice noodles",
      "1 onion, halved and charred under the broiler",
      "3-inch piece fresh ginger, halved and charred",
      "3 star anise",
      "2 cinnamon sticks",
      "4 cloves",
      "1 tablespoon fish sauce",
      "1 teaspoon sugar",
      "salt to taste",
      "bean sprouts, Thai basil, lime wedges, jalapeno, hoisin, and sriracha for serving"
    ],
    instructions: [
      "Char the onion and ginger halves under the broiler until blackened, about 5 minutes per side.",
      "In a large pot combine beef broth, charred onion and ginger, star anise, cinnamon, and cloves. Simmer 30 minutes.",
      "Strain the broth through a fine mesh sieve. Season with fish sauce, sugar, and salt.",
      "Cook rice noodles according to package directions. Drain.",
      "Divide noodles among bowls. Arrange raw sliced beef on top.",
      "Ladle very hot broth over the beef - the heat will cook the thin slices.",
      "Serve with bean sprouts, basil, lime, jalapeno, hoisin, and sriracha on the side."
    ],
    notes: [
      "Thinly sliced beef is the key - partially freeze the meat first",
      "The charred aromatics give pho its distinctive smoky-sweet depth",
      "A slow cooker can simmer the broth 4-6 hours for even deeper flavor"
    ]
  },
  {
    title: "Japanese chicken katsu",
    meal: "dinner",
    style: "meat",
    protein: "chicken",
    cuisine: "japanese",
    time_minutes: 35,
    servings: 4,
    source_url: "",
    keywords: "japanese, asian, crispy, weeknight, kid-friendly",
    summary: "Panko-crusted chicken cutlets fried until golden and served over rice with a tangy tonkatsu sauce and shredded cabbage.",
    ingredients: [
      "4 chicken breasts, pounded to 1/2-inch thickness",
      "1 cup panko breadcrumbs",
      "2 eggs, beaten",
      "1/2 cup flour",
      "salt and pepper",
      "vegetable oil for shallow frying",
      "2 cups steamed rice",
      "2 cups shredded cabbage",
      "4 tablespoons tonkatsu sauce",
      "Japanese mayo for drizzling (optional)"
    ],
    instructions: [
      "Season chicken with salt and pepper. Set up a breading station: flour, beaten egg, panko.",
      "Dredge each cutlet in flour, then egg, then panko. Press panko firmly to adhere.",
      "Heat 1/2 inch of oil in a large skillet over medium-high heat.",
      "Fry chicken 4-5 minutes per side until deep golden and cooked through. Work in batches.",
      "Drain on paper towels and slice into strips.",
      "Serve over rice with shredded cabbage drizzled with tonkatsu sauce and mayo."
    ],
    notes: [
      "Panko breadcrumbs are essential for the crunch",
      "Pound the chicken evenly so it cooks at a uniform rate",
      "Tonkatsu sauce is available at King Soopers in the Asian foods aisle"
    ]
  },
  {
    title: "Fried rice with egg and vegetables",
    meal: "dinner",
    style: "rice-or-pasta",
    protein: "none",
    cuisine: "asian",
    time_minutes: 15,
    servings: 4,
    source_url: "",
    keywords: "vegetarian, quick, pantry, leftover-rice, kid-friendly",
    summary: "Day-old rice stir-fried with eggs, soy sauce, and whatever vegetables are in the fridge. Ready in 15 minutes.",
    ingredients: [
      "3 cups cooked rice, day-old",
      "4 eggs, beaten",
      "1 cup frozen peas",
      "2 carrots, diced small",
      "4 cloves garlic, minced",
      "3 tablespoons soy sauce",
      "1 tablespoon sesame oil",
      "2 tablespoons vegetable oil",
      "3 scallions, sliced",
      "salt and pepper to taste"
    ],
    instructions: [
      "Heat vegetable oil in a wok over high heat.",
      "Add carrots and stir fry 2 minutes. Add garlic, cook 30 seconds. Add peas.",
      "Push vegetables to the side. Add beaten eggs and scramble until just set.",
      "Add cold rice, breaking up any clumps. Stir fry 2-3 minutes until heated through.",
      "Season with soy sauce and sesame oil. Toss everything together.",
      "Finish with scallions and serve immediately."
    ],
    notes: [
      "15 minutes start to finish - perfect for Monday and Wednesday time caps",
      "Day-old refrigerated rice is essential",
      "Works with any protein - add leftover chicken, shrimp, or tofu"
    ]
  },
  {
    title: "Dan dan noodles",
    meal: "dinner",
    style: "rice-or-pasta",
    protein: "pork",
    cuisine: "chinese",
    time_minutes: 30,
    servings: 4,
    source_url: "",
    keywords: "asian, chinese, spicy, noodles, weeknight",
    summary: "Chinese wheat noodles in a spicy sesame and chili sauce with ground pork and scallions. A bold and satisfying bowl.",
    ingredients: [
      "12 oz Chinese wheat noodles or spaghetti",
      "1/2 lb ground pork",
      "4 tablespoons soy sauce",
      "2 tablespoons Chinese sesame paste or tahini",
      "2 tablespoons chili oil",
      "1 tablespoon rice vinegar",
      "1 tablespoon sugar",
      "1/2 cup chicken broth",
      "4 cloves garlic, minced",
      "1 tablespoon fresh ginger, grated",
      "3 scallions, sliced",
      "sesame seeds for garnish"
    ],
    instructions: [
      "Cook noodles according to package directions. Drain and divide among bowls.",
      "Brown ground pork in a skillet over medium-high heat. Add 1 tablespoon soy sauce and set aside.",
      "Whisk together sesame paste, chili oil, rice vinegar, remaining soy sauce, sugar, and broth into a smooth sauce.",
      "Saute garlic and ginger in the same skillet 1 minute.",
      "Pour sauce over noodles and toss to coat.",
      "Top with pork, scallion, sesame seeds, and extra chili oil."
    ],
    notes: [
      "Chili oil and sesame paste are available in most grocery stores",
      "Adjust chili oil quantity for your heat preference",
      "Substitute ground chicken or leave the meat out for a vegetarian version"
    ]
  },
  {
    title: "Chicken tikka masala",
    meal: "dinner",
    style: "bowls",
    protein: "chicken",
    cuisine: "indian",
    time_minutes: 45,
    servings: 4,
    source_url: "",
    keywords: "indian, comfort, creamy, weeknight, crowd-pleaser",
    summary: "Tender marinated chicken in a rich and creamy tomato-based curry sauce with warm spices.",
    ingredients: [
      "2 lbs chicken thighs, cut into chunks",
      "1 cup plain yogurt",
      "2 teaspoons garam masala",
      "1 teaspoon turmeric",
      "1 teaspoon cumin",
      "1 teaspoon paprika",
      "1 large onion, diced",
      "5 cloves garlic, minced",
      "1 tablespoon fresh ginger, grated",
      "1 can crushed tomatoes (28 oz)",
      "1 cup heavy cream",
      "2 tablespoons butter",
      "2 tablespoons vegetable oil",
      "salt to taste",
      "fresh cilantro, basmati rice, and naan for serving"
    ],
    instructions: [
      "Marinate chicken in yogurt, 1 teaspoon garam masala, turmeric, and salt for at least 30 minutes.",
      "Broil or grill chicken until charred in spots. Set aside.",
      "Heat oil and butter in a large skillet. Cook onion 8 minutes until golden.",
      "Add garlic and ginger. Cook 2 minutes. Add remaining spices and cook 1 minute.",
      "Add crushed tomatoes. Simmer 15 minutes until thickened.",
      "Stir in heavy cream and add chicken. Simmer 10 minutes.",
      "Serve over basmati rice with naan and cilantro."
    ],
    notes: [
      "The marinade can be done the night before for deeper flavor",
      "Substitute coconut milk for heavy cream for a dairy-free version",
      "This freezes beautifully - make a double batch"
    ]
  },
  {
    title: "Saag paneer",
    meal: "dinner",
    style: "vegetarian",
    protein: "none",
    cuisine: "indian",
    time_minutes: 40,
    servings: 4,
    source_url: "",
    keywords: "vegetarian, indian, spinach, healthy, warming",
    summary: "Creamy spiced spinach with cubes of paneer cheese. A classic Indian vegetarian dish served with basmati rice and naan.",
    ingredients: [
      "14 oz paneer, cubed",
      "1 lb fresh spinach (or 10 oz frozen, thawed and squeezed dry)",
      "1 large onion, diced",
      "4 cloves garlic, minced",
      "1 tablespoon fresh ginger, grated",
      "1 can diced tomatoes (14 oz)",
      "1/2 cup heavy cream or coconut milk",
      "2 tablespoons butter",
      "1 teaspoon cumin seeds",
      "1 teaspoon garam masala",
      "1 teaspoon coriander",
      "1/2 teaspoon turmeric",
      "1/4 teaspoon cayenne",
      "salt to taste",
      "basmati rice and naan for serving"
    ],
    instructions: [
      "Blanch spinach in boiling water 1 minute. Drain and blend until smooth. Set aside.",
      "Heat butter in a large skillet. Add cumin seeds and let sizzle 30 seconds.",
      "Add onion and cook 8 minutes until golden. Add garlic and ginger.",
      "Stir in garam masala, coriander, turmeric, and cayenne. Cook 1 minute.",
      "Add diced tomatoes and cook 5 minutes.",
      "Stir in blended spinach. Simmer 5 minutes.",
      "Add cream and paneer. Heat through 3-4 minutes. Season and serve."
    ],
    notes: [
      "Paneer is available at King Soopers in the cheese section",
      "Pan-fry the paneer cubes in butter first for a crispier texture",
      "Substitute firm tofu for a vegan version"
    ]
  },
  {
    title: "Butter chicken",
    meal: "dinner",
    style: "meat",
    protein: "chicken",
    cuisine: "indian",
    time_minutes: 45,
    servings: 4,
    source_url: "",
    keywords: "indian, comfort, creamy, mild, kid-friendly, crowd-pleaser",
    summary: "Chicken in a rich buttery tomato cream sauce. A milder and sweeter cousin to tikka masala that even picky eaters love.",
    ingredients: [
      "2 lbs chicken thighs, cut into chunks",
      "4 tablespoons butter, divided",
      "1 large onion, diced",
      "5 cloves garlic, minced",
      "1 tablespoon fresh ginger, grated",
      "1 can tomato puree (14 oz)",
      "1 cup heavy cream",
      "2 teaspoons garam masala",
      "1 teaspoon cumin",
      "1 teaspoon turmeric",
      "1 teaspoon paprika",
      "1 tablespoon sugar",
      "salt to taste",
      "basmati rice, naan, and fresh cilantro for serving"
    ],
    instructions: [
      "Season chicken with salt and garam masala.",
      "Melt 2 tablespoons butter in a large skillet over medium-high heat. Brown chicken on all sides, about 6 minutes. Remove.",
      "Add remaining butter. Cook onion 7 minutes until golden. Add garlic and ginger.",
      "Add remaining spices. Cook 1 minute.",
      "Add tomato puree and simmer 10 minutes.",
      "Stir in cream and add chicken back. Simmer 10-12 minutes.",
      "Stir in sugar and adjust salt. Serve over rice with naan."
    ],
    notes: [
      "Butter chicken is intentionally milder than tikka masala",
      "The sauce can be made 2 days ahead",
      "Makes excellent leftovers - the sauce deepens overnight"
    ]
  },
  {
    title: "Dal tadka",
    meal: "dinner",
    style: "soup-or-stew",
    protein: "none",
    cuisine: "indian",
    time_minutes: 40,
    servings: 4,
    source_url: "",
    keywords: "vegetarian, vegan, indian, healthy, budget, high-protein",
    summary: "Yellow lentils simmered with tomato, ginger, and turmeric finished with a sizzling tempered oil of cumin, garlic, and dried chilies.",
    ingredients: [
      "1 1/2 cups yellow split lentils, rinsed",
      "1 large tomato, diced",
      "1 large onion, diced",
      "4 cloves garlic, minced",
      "1 tablespoon fresh ginger, grated",
      "1 teaspoon turmeric",
      "1 teaspoon cumin",
      "4 cups water or vegetable broth",
      "salt to taste",
      "2 tablespoons ghee or butter for tadka",
      "1 teaspoon cumin seeds for tadka",
      "4 cloves garlic sliced for tadka",
      "2 dried red chilies for tadka",
      "1/2 teaspoon garam masala for tadka",
      "fresh cilantro and lemon juice for serving",
      "basmati rice or naan for serving"
    ],
    instructions: [
      "Combine lentils, tomato, onion, garlic, ginger, turmeric, cumin, and water in a pot. Bring to a boil.",
      "Reduce heat and simmer 25-30 minutes until lentils are completely soft and creamy.",
      "Season with salt.",
      "Make the tadka: heat ghee in a small pan until hot. Add cumin seeds - they should sizzle immediately. Add sliced garlic and dried chilies. Cook 1-2 minutes until golden.",
      "Pour the hot tadka directly over the dal. Stir to incorporate.",
      "Finish with lemon juice and cilantro. Serve over rice."
    ],
    notes: [
      "The sizzling tadka poured over at the end is what elevates this dish",
      "Yellow split lentils cook faster than red or green - no soaking needed",
      "Excellent reheated the next day with a splash of water"
    ]
  },
  {
    title: "Aloo gobi",
    meal: "dinner",
    style: "vegetarian",
    protein: "none",
    cuisine: "indian",
    time_minutes: 35,
    servings: 4,
    source_url: "",
    keywords: "vegetarian, vegan, indian, healthy, budget",
    summary: "Potatoes and cauliflower spiced with cumin, turmeric, and garam masala. A simple and deeply flavorful dry curry.",
    ingredients: [
      "2 large potatoes, peeled and diced",
      "1 head cauliflower, cut into florets",
      "1 large onion, diced",
      "4 cloves garlic, minced",
      "1 tablespoon fresh ginger, grated",
      "1 can diced tomatoes (14 oz)",
      "2 teaspoons cumin seeds",
      "1 teaspoon turmeric",
      "1 teaspoon garam masala",
      "1 teaspoon coriander",
      "1/2 teaspoon cayenne",
      "3 tablespoons vegetable oil",
      "salt to taste",
      "fresh cilantro for garnish",
      "basmati rice or naan for serving"
    ],
    instructions: [
      "Heat oil in a large skillet over medium-high heat. Add cumin seeds and let sizzle 30 seconds.",
      "Add onion and cook 7 minutes until golden. Add garlic and ginger.",
      "Stir in turmeric, coriander, and cayenne. Cook 1 minute.",
      "Add diced tomatoes. Cook 3 minutes.",
      "Add potatoes and cauliflower. Stir to coat in spices.",
      "Add 1/4 cup water, cover, and cook on medium-low heat 15-20 minutes until vegetables are tender.",
      "Uncover, increase heat, and cook 2-3 minutes to dry out excess moisture. Stir in garam masala and top with cilantro."
    ],
    notes: [
      "Cauliflower is available locally in Colorado from late summer through fall",
      "This is a dry curry - it should not be saucy",
      "Serve alongside dal for a complete vegetarian Indian meal"
    ]
  },
  {
    title: "Lamb kofta with tzatziki",
    meal: "dinner",
    style: "meat",
    protein: "lamb",
    cuisine: "middle-eastern",
    time_minutes: 30,
    servings: 4,
    source_url: "",
    keywords: "middle-eastern, grilling, quick, fresh, summer",
    summary: "Spiced ground lamb skewers grilled until charred and juicy, served with creamy tzatziki, warm pita, and a simple chopped salad.",
    ingredients: [
      "1.5 lbs ground lamb",
      "1 small onion, grated",
      "3 cloves garlic, minced",
      "1/4 cup fresh parsley, minced",
      "1 teaspoon cumin",
      "1 teaspoon coriander",
      "1/2 teaspoon cinnamon",
      "1/2 teaspoon smoked paprika",
      "1/4 teaspoon cayenne",
      "salt and pepper",
      "4 pita breads",
      "1 cup plain Greek yogurt",
      "1/2 cucumber, grated and squeezed dry",
      "1 tablespoon lemon juice",
      "1 clove garlic, minced",
      "1 tablespoon fresh dill",
      "cherry tomatoes, cucumber, and red onion for serving"
    ],
    instructions: [
      "Combine lamb with grated onion, garlic, parsley, and all spices. Mix well and season.",
      "Form into oval patties or mold around skewers.",
      "Make tzatziki by combining yogurt, grated cucumber, lemon juice, garlic, and dill. Season with salt.",
      "Grill kofta over high heat 3-4 minutes per side until cooked through and charred.",
      "Warm pita directly on the grill.",
      "Serve kofta with tzatziki, pita, and chopped tomatoes, cucumber, and red onion."
    ],
    notes: [
      "Lamb is traditional but ground beef works perfectly",
      "Soak wooden skewers in water 30 minutes before grilling",
      "Excellent for summer grilling when Colorado tomatoes are at peak"
    ]
  },
  {
    title: "Sheet pan chicken thighs and vegetables",
    meal: "dinner",
    style: "meat",
    protein: "chicken",
    cuisine: "american",
    time_minutes: 35,
    servings: 4,
    source_url: "",
    keywords: "one-pan, weeknight, easy, minimal-cleanup",
    summary: "Bone-in chicken thighs and seasonal vegetables roasted on a single sheet pan with olive oil and herbs. Maximum flavor with minimal cleanup.",
    ingredients: [
      "6 bone-in chicken thighs, skin-on",
      "2 cups broccoli florets",
      "2 cups cherry tomatoes",
      "1 zucchini, sliced",
      "1 red onion, cut into wedges",
      "4 tablespoons olive oil",
      "4 cloves garlic, minced",
      "1 teaspoon dried oregano",
      "1 teaspoon smoked paprika",
      "salt and pepper to taste",
      "lemon wedges for serving"
    ],
    instructions: [
      "Preheat oven to 425°F.",
      "Toss vegetables with 2 tablespoons olive oil, salt, and pepper on a large sheet pan.",
      "Mix remaining olive oil with garlic, oregano, and paprika. Rub over chicken thighs.",
      "Nestle chicken thighs among the vegetables, skin-side up.",
      "Roast 30-35 minutes until chicken skin is crispy and vegetables are caramelized.",
      "Serve with lemon wedges."
    ],
    notes: [
      "Chicken thighs are more forgiving than breasts",
      "Swap vegetables based on season",
      "Add a sprinkle of feta over the vegetables in the last 5 minutes"
    ]
  },
  {
    title: "One-pot chicken and rice",
    meal: "dinner",
    style: "rice-or-pasta",
    protein: "chicken",
    cuisine: "american",
    time_minutes: 35,
    servings: 4,
    source_url: "",
    keywords: "one-pot, comfort, weeknight, kid-friendly, easy",
    summary: "Chicken thighs and rice cooked together in one pot with garlic, onion, and chicken broth. The rice absorbs all the cooking juices for incredible flavor.",
    ingredients: [
      "4 chicken thighs, bone-in skin-on",
      "1 1/2 cups long-grain white rice",
      "2 1/2 cups chicken broth",
      "1 large onion, diced",
      "4 cloves garlic, minced",
      "1 teaspoon smoked paprika",
      "1 teaspoon cumin",
      "1 teaspoon dried thyme",
      "2 tablespoons olive oil",
      "salt and pepper to taste",
      "fresh parsley for garnish"
    ],
    instructions: [
      "Season chicken thighs generously with salt, pepper, and paprika.",
      "Heat oil in a large heavy pot over medium-high heat. Sear chicken skin-side down 5 minutes until golden. Remove.",
      "Cook onion in the same pot 5 minutes. Add garlic, cumin, and thyme. Cook 1 minute.",
      "Add rice and stir to coat. Toast 2 minutes.",
      "Pour in broth and bring to a boil. Nestle chicken skin-side up.",
      "Reduce heat, cover tightly, and cook on low 20 minutes until rice is tender.",
      "Let rest 5 minutes before serving with parsley."
    ],
    notes: [
      "Do not lift the lid during cooking",
      "Works with any bone-in chicken piece",
      "Add frozen peas or spinach in the last 5 minutes"
    ]
  },
  {
    title: "Sausage and peppers",
    meal: "dinner",
    style: "handheld",
    protein: "pork",
    cuisine: "italian",
    time_minutes: 25,
    servings: 4,
    source_url: "",
    keywords: "quick, weeknight, one-pan, italian, comfort",
    summary: "Italian sausages with sauteed bell peppers and onions in a savory tomato sauce. Serve in hoagie rolls or over pasta.",
    ingredients: [
      "4 Italian sausages (sweet or hot)",
      "3 bell peppers (red, yellow, green), sliced",
      "1 large onion, sliced",
      "4 cloves garlic, minced",
      "1 can diced tomatoes (14 oz)",
      "1 teaspoon dried oregano",
      "1/2 teaspoon red pepper flakes",
      "2 tablespoons olive oil",
      "salt and pepper to taste",
      "hoagie rolls or pasta for serving"
    ],
    instructions: [
      "Heat oil in a large skillet over medium-high heat. Brown sausages on all sides, about 8 minutes. Remove and slice.",
      "In the same skillet cook peppers and onion over medium heat 8 minutes until softened.",
      "Add garlic, oregano, and red pepper flakes. Cook 1 minute.",
      "Add diced tomatoes and sliced sausage. Simmer 5 minutes.",
      "Season with salt and pepper.",
      "Serve in hoagie rolls or over pasta."
    ],
    notes: [
      "Bell peppers are at peak in Colorado from July through September",
      "Hot Italian sausage gives much more flavor",
      "Leftovers make an excellent omelette filling the next morning"
    ]
  },
  {
    title: "Caprese stuffed chicken",
    meal: "dinner",
    style: "meat",
    protein: "chicken",
    cuisine: "italian",
    time_minutes: 30,
    servings: 4,
    source_url: "",
    keywords: "quick, elegant, weeknight, summer, fresh",
    summary: "Chicken breasts stuffed with fresh mozzarella and tomato, seared and finished in the oven with basil. Looks impressive, takes 30 minutes.",
    ingredients: [
      "4 chicken breasts",
      "4 oz fresh mozzarella, sliced",
      "2 tomatoes, sliced",
      "1/4 cup fresh basil leaves",
      "3 tablespoons olive oil",
      "2 cloves garlic, minced",
      "balsamic glaze for serving",
      "salt and pepper to taste"
    ],
    instructions: [
      "Preheat oven to 400°F.",
      "Cut a pocket into each chicken breast by slicing horizontally, being careful not to cut all the way through.",
      "Season inside and out with salt and pepper.",
      "Stuff each pocket with mozzarella, tomato, and basil. Secure with toothpicks.",
      "Heat olive oil in an oven-safe skillet over medium-high heat. Sear chicken 3 minutes per side until golden.",
      "Transfer skillet to oven and bake 15-18 minutes until chicken is cooked through.",
      "Drizzle with balsamic glaze and serve."
    ],
    notes: [
      "Tomatoes from a Colorado farmers market in July and August make this exceptional",
      "Pound the chicken slightly if it is very thick",
      "Sun-dried tomatoes work great as a year-round alternative"
    ]
  },
  {
    title: "Black bean soup",
    meal: "dinner",
    style: "soup-or-stew",
    protein: "none",
    cuisine: "latin",
    time_minutes: 30,
    servings: 6,
    source_url: "",
    keywords: "vegetarian, vegan, quick, budget, pantry, healthy",
    summary: "Rich and smoky black bean soup from pantry staples in 30 minutes. Loaded with cumin, smoked paprika, and garlic.",
    ingredients: [
      "3 cans black beans, drained and rinsed (reserve 1 can liquid)",
      "1 large onion, diced",
      "4 cloves garlic, minced",
      "1 red bell pepper, diced",
      "1 jalapeno, seeded and minced",
      "4 cups vegetable or chicken broth",
      "2 teaspoons cumin",
      "1 teaspoon smoked paprika",
      "1/2 teaspoon chili powder",
      "juice of 1 lime",
      "2 tablespoons olive oil",
      "salt and pepper to taste",
      "sour cream, avocado, cilantro, and lime for serving"
    ],
    instructions: [
      "Heat oil in a large pot over medium heat. Cook onion and bell pepper 6 minutes.",
      "Add garlic, jalapeno, cumin, paprika, and chili powder. Cook 1 minute.",
      "Add black beans, reserved bean liquid, and broth. Simmer 15 minutes.",
      "Use an immersion blender to partially blend - leave about half the beans whole.",
      "Stir in lime juice and adjust seasoning.",
      "Serve topped with sour cream, avocado, cilantro, and extra lime."
    ],
    notes: [
      "An entirely pantry-based recipe",
      "Adding smoked chorizo makes this a heartier non-vegetarian version",
      "Freezes perfectly for up to 3 months"
    ]
  },
  {
    title: "Avocado toast with egg",
    meal: "breakfast",
    style: "vegetarian",
    protein: "none",
    cuisine: "american",
    time_minutes: 10,
    servings: 2,
    source_url: "",
    keywords: "quick, healthy, fresh, vegetarian, 10-minutes",
    summary: "Creamy mashed avocado on toasted sourdough topped with a perfectly fried egg and everything bagel seasoning.",
    ingredients: [
      "2 slices sourdough or thick-cut bread, toasted",
      "2 ripe avocados",
      "2 eggs",
      "juice of half a lemon",
      "1/2 teaspoon red pepper flakes",
      "1 tablespoon everything bagel seasoning",
      "1 tablespoon butter for frying eggs",
      "salt and pepper to taste",
      "microgreens or arugula for topping (optional)"
    ],
    instructions: [
      "Toast bread until golden and crispy.",
      "Mash avocado with lemon juice, salt, and red pepper flakes.",
      "Fry eggs in butter over medium heat to your preference.",
      "Spread avocado generously on toast.",
      "Top with fried egg and everything bagel seasoning.",
      "Add microgreens if using."
    ],
    notes: [
      "Everything bagel seasoning is available at King Soopers",
      "Add smoked salmon for a more indulgent version",
      "Ripe avocados are essential - check by pressing gently near the stem"
    ]
  },
  {
    title: "Banana oat pancakes",
    meal: "breakfast",
    style: "baked-casserole",
    protein: "none",
    cuisine: "american",
    time_minutes: 20,
    servings: 4,
    source_url: "",
    keywords: "healthy, kid-friendly, gluten-free-option, quick, weekend",
    summary: "Fluffy pancakes made with mashed banana and oats. Naturally sweetened and more filling than standard pancakes.",
    ingredients: [
      "2 ripe bananas, mashed",
      "1 1/2 cups rolled oats",
      "2 eggs",
      "1/2 cup milk",
      "1 teaspoon vanilla extract",
      "1 teaspoon baking powder",
      "1/2 teaspoon cinnamon",
      "pinch of salt",
      "butter for cooking",
      "maple syrup and fresh fruit for serving"
    ],
    instructions: [
      "Blend oats into a coarse flour, or use rolled oats as-is for a heartier texture.",
      "Mash bananas well in a large bowl.",
      "Add eggs, milk, vanilla, and mix. Stir in oat flour, baking powder, cinnamon, and salt.",
      "Let batter rest 5 minutes.",
      "Heat butter in a skillet over medium heat. Pour 1/4 cup batter per pancake.",
      "Cook until bubbles form on top and edges look set, about 3 minutes. Flip and cook 2 minutes more.",
      "Serve with maple syrup and fresh fruit."
    ],
    notes: [
      "The riper the bananas the sweeter the pancakes",
      "Blueberries mixed into the batter in summer are exceptional",
      "Leftover pancakes freeze well - reheat in the toaster"
    ]
  },
  {
    title: "Breakfast burritos",
    meal: "breakfast",
    style: "handheld",
    protein: "pork",
    cuisine: "mexican",
    time_minutes: 20,
    servings: 4,
    source_url: "",
    keywords: "quick, filling, kid-friendly, meal-prep, weekday",
    summary: "Scrambled eggs with sausage, peppers, and cheese wrapped in a warm flour tortilla. Make-ahead friendly and great for busy mornings.",
    ingredients: [
      "6 large eggs",
      "4 breakfast sausage links or 1/2 lb ground breakfast sausage",
      "1/2 green bell pepper, diced",
      "1/2 onion, diced",
      "1 cup shredded cheddar cheese",
      "4 large flour tortillas",
      "2 tablespoons butter",
      "salt and pepper to taste",
      "salsa and hot sauce for serving"
    ],
    instructions: [
      "Cook sausage in a skillet over medium heat until browned. Remove and set aside.",
      "In the same skillet cook bell pepper and onion in butter 4 minutes until softened.",
      "Beat eggs with salt and pepper. Add to skillet and scramble gently until just set.",
      "Add sausage back and fold together.",
      "Warm tortillas in a dry skillet or microwave.",
      "Fill each tortilla with egg mixture and shredded cheese.",
      "Roll tightly and serve with salsa."
    ],
    notes: [
      "Make a batch of 8 and wrap in foil - refrigerate for up to 3 days and reheat at 350°F for 15 minutes",
      "Add diced roasted potatoes inside for extra heartiness",
      "Swap sausage for black beans for a vegetarian version"
    ]
  },
  {
    title: "Greek yogurt parfait",
    meal: "breakfast",
    style: "bowls",
    protein: "none",
    cuisine: "american",
    time_minutes: 5,
    servings: 2,
    source_url: "",
    keywords: "quick, healthy, no-cook, fresh, summer, 5-minutes",
    summary: "Creamy Greek yogurt layered with granola, fresh berries, and a drizzle of honey. The fastest breakfast in the collection at 5 minutes.",
    ingredients: [
      "2 cups plain Greek yogurt",
      "1 cup granola",
      "1 cup fresh berries (strawberries, blueberries, raspberries)",
      "2 tablespoons honey",
      "1/4 cup sliced almonds (optional)"
    ],
    instructions: [
      "Spoon yogurt into two bowls or glasses.",
      "Layer granola over yogurt.",
      "Top with fresh berries.",
      "Drizzle with honey and sprinkle almonds if using.",
      "Serve immediately - granola softens if it sits too long."
    ],
    notes: [
      "5 minutes start to finish - the fastest meal in the collection",
      "Colorado strawberries in May and June and raspberries in August are exceptional here",
      "Use flavored yogurt for a sweeter version"
    ]
  }
];

function slugifyTitle(title) {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");
}

function quote(value) {
  return JSON.stringify(value ?? "");
}

function buildRecipeMarkdown(recipe) {
  const title = `Suggested - ${recipe.title}`;
  const lines = [
    "---",
    `title: ${quote(title)}`,
    `meal: ${recipe.meal}`,
    `style: ${recipe.style}`,
    `protein: ${recipe.protein}`,
    `cuisine: ${recipe.cuisine}`,
    `time_minutes: ${recipe.time_minutes}`,
    `servings: ${recipe.servings}`,
    `source_url: ${recipe.source_url || ""}`,
    `keywords: ${quote(recipe.keywords)}`,
    `summary: ${quote(recipe.summary)}`,
    "---",
    "",
    "## Ingredients",
    "",
    ...recipe.ingredients.map((item) => `- ${item}`),
    "",
    "## Instructions",
    "",
    ...recipe.instructions.map((item, idx) => `${idx + 1}. ${item}`)
  ];

  if (Array.isArray(recipe.notes) && recipe.notes.length > 0) {
    lines.push("", "## Notes", "", ...recipe.notes.map((note) => `- ${note}`));
  }

  lines.push("");
  return lines.join("\n");
}

async function ensureKnownRecipesFile(meal, style) {
  const knownPath = path.join(ROOT_DIR, "recipes", meal, style, "known-recipes.md");
  try {
    const content = await fs.readFile(knownPath, "utf8");
    return { knownPath, content };
  } catch (_error) {
    const heading = `# ${meal[0].toUpperCase()}${meal.slice(1)} ${style} Recipes\n\n`;
    return { knownPath, content: heading };
  }
}

function appendKnownRows(existingContent, titles) {
  const existing = new Set(
    existingContent
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.startsWith("- "))
      .map((line) => line.slice(2).trim())
  );

  const additions = [];
  for (const title of titles) {
    if (!existing.has(title)) {
      additions.push(`- ${title}`);
      existing.add(title);
    }
  }

  if (additions.length === 0) {
    return existingContent.endsWith("\n") ? existingContent : `${existingContent}\n`;
  }

  const base = existingContent.trimEnd();
  return `${base}\n\n${additions.join("\n")}\n`;
}

function buildScriptEntry(recipe) {
  return `  { name: ${quote(`Suggested - ${recipe.title}`)}, meal: ${quote(recipe.meal)}, style: ${quote(recipe.style)} },`;
}

async function updateScriptRecipesArray() {
  const scriptPath = path.join(ROOT_DIR, "script.js");
  const source = await fs.readFile(scriptPath, "utf8");

  const start = source.indexOf("const RECIPES = [");
  const endAnchor = "\n];\n\nconst mealFilter";
  const end = source.indexOf(endAnchor);

  if (start === -1 || end === -1) {
    throw new Error("Could not locate RECIPES array in script.js");
  }

  const block = source.slice(start, end);
  let updatedBlock = block;

  for (const recipe of SUGGESTED_RECIPES) {
    const fullTitle = `Suggested - ${recipe.title}`;
    if (updatedBlock.includes(`name: ${quote(fullTitle)}`)) {
      continue;
    }
    const insertionPoint = updatedBlock.lastIndexOf("\n]");
    const entry = buildScriptEntry(recipe);
    updatedBlock = `${updatedBlock.slice(0, insertionPoint)}\n${entry}${updatedBlock.slice(insertionPoint)}`;
  }

  const updatedSource = `${source.slice(0, start)}${updatedBlock}${source.slice(end)}`;
  await fs.writeFile(scriptPath, updatedSource, "utf8");
}

async function main() {
  const knownByGroup = new Map();
  let writtenCount = 0;

  for (const recipe of SUGGESTED_RECIPES) {
    const slug = slugifyTitle(recipe.title);
    const relPath = `recipes/${recipe.meal}/${recipe.style}/${slug}.md`;
    const absPath = path.join(ROOT_DIR, relPath);
    await fs.mkdir(path.dirname(absPath), { recursive: true });
    await fs.writeFile(absPath, buildRecipeMarkdown(recipe), "utf8");
    writtenCount += 1;
    console.log(`Created: ${relPath}`);

    const key = `${recipe.meal}/${recipe.style}`;
    if (!knownByGroup.has(key)) {
      knownByGroup.set(key, []);
    }
    knownByGroup.get(key).push(`Suggested - ${recipe.title}`);
  }

  for (const [key, titles] of knownByGroup.entries()) {
    const [meal, style] = key.split("/");
    const { knownPath, content } = await ensureKnownRecipesFile(meal, style);
    const updated = appendKnownRows(content, titles);
    await fs.mkdir(path.dirname(knownPath), { recursive: true });
    await fs.writeFile(knownPath, updated, "utf8");
  }

  await updateScriptRecipesArray();

  console.log("===== Import Complete =====");
  console.log(`${writtenCount} recipes written to markdown files`);
  console.log("known-recipes.md updated");
  console.log("script.js RECIPES array updated");
  console.log("Run node ./scripts/generate-ingredient-data.mjs to regenerate ingredient data");
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
