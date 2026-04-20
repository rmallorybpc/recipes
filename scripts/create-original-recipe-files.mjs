/**
 * scripts/create-original-recipe-files.mjs
 *
 * One-time script to create markdown files for the original 47 recipes
 * that exist in script.js but have no corresponding markdown files.
 *
 * Run once from repo root:
 *   node ./scripts/create-original-recipe-files.mjs
 *
 * Then run:
 *   node ./scripts/generate-ingredient-data.mjs
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

const RECIPES = [

  // ============================================================
  // BREAKFAST
  // ============================================================

  {
    title: "Big daddy biscuits",
    meal: "breakfast",
    style: "baked-casserole",
    protein: "none",
    cuisine: "american",
    time_minutes: 20,
    servings: 8,
    source_url: "https://www.allrecipes.com/recipe/7040/jps-big-daddy-biscuits/",
    keywords: "quick, kid-friendly, comfort, weekend",
    summary: "Large fluffy buttermilk biscuits that rise tall and bake golden. A Southern comfort classic.",
    ingredients: [
      "2 cups all-purpose flour",
      "1 tablespoon baking powder",
      "1 teaspoon salt",
      "1 tablespoon white sugar",
      "1/3 cup butter, cubed and cold",
      "1 cup milk"
    ],
    instructions: [
      "Preheat oven to 425°F.",
      "Mix flour, baking powder, salt, and sugar in a large bowl.",
      "Cut in cold butter until mixture resembles coarse crumbs.",
      "Stir in milk just until dough comes together — do not overmix.",
      "Turn dough onto a floured surface and pat to 3/4-inch thickness.",
      "Cut with a biscuit cutter and place on an ungreased baking sheet.",
      "Bake 13-15 minutes until golden brown on top."
    ],
    notes: [
      "Cold butter is essential for flaky layers",
      "Do not twist the biscuit cutter — press straight down and lift",
      "Biscuits touching each other in the pan rise taller"
    ]
  },

  {
    title: "Flourless chickpea peanut butter muffins",
    meal: "breakfast",
    style: "baked-casserole",
    protein: "none",
    cuisine: "american",
    time_minutes: 25,
    servings: 12,
    source_url: "https://www.ambitiouskitchen.com/flourless-peanut-butter-chickpea-muffins/",
    keywords: "gluten-free, healthy, kid-friendly, high-protein",
    summary: "Moist flourless muffins made with blended chickpeas and peanut butter. High protein and naturally gluten-free.",
    ingredients: [
      "1 can chickpeas (15 oz), drained and rinsed",
      "1/2 cup natural peanut butter",
      "1/3 cup honey or maple syrup",
      "2 eggs",
      "1 teaspoon vanilla extract",
      "1/2 teaspoon baking powder",
      "1/4 teaspoon baking soda",
      "1/4 teaspoon salt",
      "1/2 cup chocolate chips (optional)"
    ],
    instructions: [
      "Preheat oven to 350°F. Line a 12-cup muffin tin with liners.",
      "Add chickpeas, peanut butter, honey, eggs, and vanilla to a food processor. Blend until completely smooth.",
      "Add baking powder, baking soda, and salt. Pulse to combine.",
      "Fold in chocolate chips if using.",
      "Divide batter evenly among muffin cups.",
      "Bake 20-22 minutes until a toothpick comes out clean.",
      "Cool in pan 5 minutes before removing."
    ],
    notes: [
      "Blend the chickpeas very thoroughly — no lumps",
      "Natural peanut butter with no added sugar works best",
      "Store refrigerated for up to 5 days"
    ]
  },

  {
    title: "Greek pitas with chicken",
    meal: "breakfast",
    style: "meat",
    protein: "chicken",
    cuisine: "greek",
    time_minutes: 25,
    servings: 4,
    source_url: "https://www.allrecipes.com/recipe/23600/greek-chicken-pitas/",
    keywords: "fresh, mediterranean, quick, healthy",
    summary: "Marinated grilled chicken strips in warm pita with tzatziki, tomato, and red onion.",
    ingredients: [
      "1 lb boneless skinless chicken breasts, cut into strips",
      "4 pita bread rounds",
      "1 cup plain Greek yogurt",
      "1 cucumber, diced",
      "2 tomatoes, diced",
      "1/2 red onion, thinly sliced",
      "3 cloves garlic, minced",
      "2 tablespoons olive oil",
      "1 tablespoon lemon juice",
      "1 teaspoon dried oregano",
      "1 teaspoon dried thyme",
      "1/2 teaspoon cumin",
      "salt and pepper to taste",
      "1/4 cup feta cheese, crumbled"
    ],
    instructions: [
      "Marinate chicken strips in olive oil, lemon juice, garlic, oregano, thyme, cumin, salt, and pepper for 15 minutes.",
      "Cook chicken in a skillet over medium-high heat 6-8 minutes until cooked through.",
      "Make tzatziki by combining Greek yogurt, cucumber, garlic, and a squeeze of lemon juice.",
      "Warm pitas in a dry skillet or oven.",
      "Fill each pita with chicken, tzatziki, tomato, red onion, and feta."
    ],
    notes: [
      "Use rotisserie chicken for a faster version",
      "Tzatziki improves after sitting for 30 minutes",
      "Add kalamata olives for extra Mediterranean flavor"
    ]
  },

  {
    title: "Greek pitas with turkey meat",
    meal: "breakfast",
    style: "meat",
    protein: "turkey",
    cuisine: "greek",
    time_minutes: 25,
    servings: 4,
    source_url: "https://www.foodnetwork.com/recipes/turkey-gyros",
    keywords: "fresh, mediterranean, quick, healthy, lighter",
    summary: "Seasoned ground turkey in warm pita with tzatziki, tomato, and red onion. A lighter take on the classic gyro.",
    ingredients: [
      "1 lb ground turkey",
      "4 pita bread rounds",
      "1 cup plain Greek yogurt",
      "1 cucumber, grated and squeezed dry",
      "3 cloves garlic, minced",
      "1 tablespoon lemon juice",
      "1 tablespoon fresh dill, chopped",
      "1/2 red onion, thinly sliced",
      "2 tomatoes, sliced",
      "2 tablespoons olive oil",
      "1 teaspoon dried oregano",
      "1/2 teaspoon cumin",
      "1/2 teaspoon smoked paprika",
      "salt and pepper to taste",
      "1/4 cup feta cheese, crumbled"
    ],
    instructions: [
      "Cook ground turkey in a skillet over medium-high heat with olive oil, oregano, cumin, paprika, salt, and pepper until cooked through.",
      "Make tzatziki by combining Greek yogurt, grated cucumber, garlic, lemon juice, and dill.",
      "Warm pitas in a dry skillet.",
      "Fill each pita with turkey, tzatziki, tomato, red onion, and feta."
    ],
    notes: [
      "Squeeze all moisture from the grated cucumber for thick tzatziki",
      "Ground turkey can be dry — do not overcook",
      "Add hot sauce for heat"
    ]
  },

  {
    title: "White chicken chili",
    meal: "breakfast",
    style: "meat",
    protein: "chicken",
    cuisine: "american",
    time_minutes: 40,
    servings: 6,
    source_url: "https://www.allrecipes.com/recipe/219173/slow-cooker-white-chicken-chili/",
    keywords: "comfort, warming, hearty, meal-prep",
    summary: "Creamy white chicken chili with white beans, green chiles, and Monterey Jack cheese. A lighter alternative to traditional chili.",
    ingredients: [
      "2 lbs boneless skinless chicken breasts",
      "2 cans white beans (cannellini or Great Northern), drained",
      "2 cans chicken broth (14.5 oz each)",
      "1 large onion, diced",
      "3 cloves garlic, minced",
      "2 cans diced green chiles (4 oz each)",
      "1 cup frozen corn",
      "1 teaspoon cumin",
      "1 teaspoon chili powder",
      "1/2 teaspoon oregano",
      "1/2 teaspoon garlic powder",
      "1/2 cup sour cream",
      "4 oz cream cheese, softened",
      "salt and pepper to taste",
      "shredded Monterey Jack cheese, cilantro, and lime for serving"
    ],
    instructions: [
      "Add chicken, broth, onion, garlic, green chiles, corn, and spices to a pot. Bring to a boil.",
      "Reduce heat and simmer 20 minutes until chicken is cooked through.",
      "Remove chicken and shred with two forks. Return to pot.",
      "Add white beans, sour cream, and cream cheese. Stir until cream cheese melts.",
      "Simmer 10 more minutes. Season with salt and pepper.",
      "Serve topped with cheese, cilantro, and a squeeze of lime."
    ],
    notes: [
      "This works perfectly in a slow cooker on low for 6-8 hours",
      "Add a diced jalapeño for heat",
      "Freezes well without the dairy — add sour cream and cream cheese after reheating"
    ]
  },

  {
    title: "Spicy pesto and cheese stuffed zucchini involtin",
    meal: "breakfast",
    style: "vegetarian",
    protein: "none",
    cuisine: "italian",
    time_minutes: 35,
    servings: 4,
    source_url: "https://www.epicurious.com/recipes/food/views/zucchini-involtini",
    keywords: "vegetarian, italian, summer, elegant, fresh",
    summary: "Thin zucchini strips rolled around spicy pesto and cheese filling, baked in marinara until tender.",
    ingredients: [
      "3 medium zucchini, sliced lengthwise into thin strips",
      "1/2 cup basil pesto",
      "1 cup ricotta cheese",
      "1/2 cup shredded mozzarella cheese",
      "1/4 cup grated Parmesan cheese",
      "2 cloves garlic, minced",
      "1/4 teaspoon red pepper flakes",
      "2 tablespoons olive oil",
      "1 cup marinara sauce",
      "salt and pepper to taste",
      "fresh basil leaves for garnish"
    ],
    instructions: [
      "Preheat oven to 375°F.",
      "Brush zucchini strips with olive oil, season with salt, and grill or pan-sear 2 minutes per side until pliable.",
      "Mix ricotta, half the mozzarella, Parmesan, garlic, red pepper flakes, and pesto.",
      "Spread a spoonful of filling on each zucchini strip and roll up.",
      "Pour marinara into a baking dish. Arrange rolls seam-side down.",
      "Top with remaining mozzarella.",
      "Bake 20 minutes until bubbly. Garnish with fresh basil."
    ],
    notes: [
      "Zucchini is at peak in Colorado July through September",
      "Use a mandoline for even thin slices",
      "Add sun-dried tomatoes to the filling for extra flavor"
    ]
  },

  // ============================================================
  // DINNER — BAKED CASSEROLE
  // ============================================================

  {
    title: "Homemade pizza",
    meal: "dinner",
    style: "baked-casserole",
    protein: "none",
    cuisine: "italian",
    time_minutes: 45,
    servings: 4,
    source_url: "https://www.seriouseats.com/basic-new-york-style-pizza-dough",
    keywords: "family, kid-friendly, weekend, comfort, customizable",
    summary: "Homemade pizza with a crispy yeasted crust, tomato sauce, and melted mozzarella. Fully customizable with your favorite toppings.",
    ingredients: [
      "3 cups all-purpose flour",
      "1 packet instant yeast (2 1/4 tsp)",
      "1 teaspoon sugar",
      "1 teaspoon salt",
      "1 tablespoon olive oil",
      "1 cup warm water",
      "1 cup pizza sauce or marinara",
      "2 cups shredded mozzarella cheese",
      "1/2 cup grated Parmesan cheese",
      "toppings of choice: pepperoni, bell peppers, onion, mushrooms, olives"
    ],
    instructions: [
      "Mix flour, yeast, sugar, and salt. Add olive oil and warm water. Knead 8 minutes until smooth.",
      "Cover and let rise 1 hour until doubled.",
      "Preheat oven to 475°F with a pizza stone or baking sheet inside.",
      "Stretch dough into a 12-inch round on a floured surface.",
      "Spread sauce, leaving a 1-inch border. Top with cheese and toppings.",
      "Bake 10-12 minutes until crust is golden and cheese is bubbling."
    ],
    notes: [
      "Cold-ferment the dough in the fridge overnight for better flavor",
      "The hotter the oven the better the crust",
      "Stretch dough by hand — rolling pin deflates the bubbles"
    ]
  },

  // ============================================================
  // DINNER — BOWLS
  // ============================================================

  {
    title: "Chipotle bowls",
    meal: "dinner",
    style: "bowls",
    protein: "chicken",
    cuisine: "mexican",
    time_minutes: 35,
    servings: 4,
    source_url: "https://www.themodernproper.com/chipotle-chicken-burrito-bowls",
    keywords: "fresh, customizable, meal-prep, kid-friendly",
    summary: "Rice bowls loaded with chipotle-seasoned chicken, black beans, corn, salsa, and all the fixings.",
    ingredients: [
      "2 lbs boneless skinless chicken thighs",
      "2 cups long-grain white rice",
      "2 cans black beans, drained and rinsed",
      "2 cups frozen corn, thawed",
      "1 can diced tomatoes with green chiles",
      "1 large onion, diced",
      "3 cloves garlic, minced",
      "2 chipotle peppers in adobo sauce, minced",
      "1 tablespoon adobo sauce",
      "1 teaspoon cumin",
      "1 teaspoon chili powder",
      "1 teaspoon smoked paprika",
      "2 tablespoons olive oil",
      "juice of 2 limes",
      "salt and pepper to taste",
      "sour cream, salsa, guacamole, shredded cheese, and cilantro for serving"
    ],
    instructions: [
      "Season chicken with chipotle, adobo sauce, cumin, chili powder, paprika, salt, and pepper.",
      "Cook chicken in olive oil over medium-high heat 6-7 minutes per side. Rest and slice.",
      "Cook rice according to package directions. Stir in lime juice and cilantro.",
      "Warm black beans with cumin and salt.",
      "Build bowls with rice, chicken, beans, corn, tomatoes, and desired toppings."
    ],
    notes: [
      "Marinate chicken overnight for deeper flavor",
      "This is excellent for meal prep — components keep separately for 4 days",
      "Add pickled jalapeños for extra heat"
    ]
  },

  {
    title: "Salmon veggie bowls",
    meal: "dinner",
    style: "bowls",
    protein: "salmon",
    cuisine: "american",
    time_minutes: 35,
    servings: 4,
    source_url: "https://www.halfbakedharvest.com/salmon-bowls/",
    keywords: "healthy, fresh, meal-prep, quick",
    summary: "Roasted salmon over rice or quinoa with roasted sweet potato, broccoli, avocado, and sesame dressing.",
    ingredients: [
      "4 salmon fillets (6 oz each)",
      "2 cups rice or quinoa, cooked",
      "2 cups broccoli florets",
      "1 large sweet potato, cubed and roasted",
      "1 avocado, sliced",
      "1 cucumber, sliced",
      "2 tablespoons soy sauce",
      "1 tablespoon sesame oil",
      "1 tablespoon honey",
      "1 tablespoon rice vinegar",
      "1 teaspoon fresh ginger, grated",
      "2 cloves garlic, minced",
      "sesame seeds for garnish",
      "2 tablespoons olive oil",
      "salt and pepper to taste"
    ],
    instructions: [
      "Preheat oven to 400°F. Toss sweet potato with olive oil, salt, and pepper. Roast 25 minutes.",
      "Add broccoli to the pan in the last 15 minutes of roasting.",
      "Whisk soy sauce, sesame oil, honey, rice vinegar, ginger, and garlic for the dressing.",
      "Season salmon with salt and pepper. Cook in a skillet 4-5 minutes per side.",
      "Build bowls with grain base, salmon, vegetables, and avocado.",
      "Drizzle with dressing and garnish with sesame seeds."
    ],
    notes: [
      "This is great for meal prep — keep components separate",
      "Swap salmon for teriyaki tofu for a vegetarian version",
      "Add edamame for extra protein"
    ]
  },

  // ============================================================
  // DINNER — HANDHELD
  // ============================================================

  {
    title: "Lettuce wraps",
    meal: "dinner",
    style: "handheld",
    protein: "chicken",
    cuisine: "asian",
    time_minutes: 25,
    servings: 4,
    source_url: "https://www.damndelicious.net/2014/06/13/chicken-lettuce-wraps/",
    keywords: "quick, healthy, asian, light, fresh",
    summary: "Savory ground chicken with water chestnuts and hoisin sauce served in crisp lettuce cups.",
    ingredients: [
      "1 lb ground chicken or turkey",
      "1 head butter lettuce, leaves separated",
      "1 cup water chestnuts, drained and diced",
      "3 cloves garlic, minced",
      "1 tablespoon fresh ginger, grated",
      "3 tablespoons hoisin sauce",
      "2 tablespoons soy sauce",
      "1 tablespoon rice wine vinegar",
      "1 tablespoon sesame oil",
      "1 teaspoon sriracha",
      "3 scallions, sliced",
      "2 tablespoons vegetable oil",
      "salt and pepper to taste",
      "shredded carrots and chopped peanuts for garnish"
    ],
    instructions: [
      "Heat oil in a large skillet over medium-high heat. Cook ground chicken until browned, breaking up as it cooks.",
      "Add garlic and ginger. Cook 1 minute.",
      "Stir in hoisin, soy sauce, rice vinegar, sesame oil, and sriracha.",
      "Add water chestnuts. Cook 2 minutes more.",
      "Spoon filling into lettuce leaves.",
      "Top with scallions, shredded carrots, and peanuts."
    ],
    notes: [
      "Butter lettuce holds its shape best for wrapping",
      "Serve filling and lettuce separately so guests can assemble their own",
      "Leftover filling is great over rice the next day"
    ]
  },

  // ============================================================
  // DINNER — MEAT
  // ============================================================

  {
    title: "BBQ in crockpot",
    meal: "dinner",
    style: "meat",
    protein: "pork",
    cuisine: "american",
    time_minutes: 30,
    servings: 8,
    source_url: "https://www.cookingclassy.com/slow-cooker-pulled-pork/",
    keywords: "slow-cooker, comfort, crowd-pleaser, meal-prep, weekend",
    summary: "Fall-apart tender pulled pork slow-cooked in BBQ sauce. Serve on buns with coleslaw.",
    ingredients: [
      "3-4 lbs pork shoulder or pork butt",
      "1 1/2 cups BBQ sauce",
      "1/2 cup apple cider vinegar",
      "1/2 cup chicken broth",
      "1/4 cup brown sugar",
      "1 tablespoon Worcestershire sauce",
      "1 tablespoon chili powder",
      "1 teaspoon garlic powder",
      "1 teaspoon onion powder",
      "1 teaspoon smoked paprika",
      "1 teaspoon salt",
      "1/2 teaspoon black pepper",
      "hamburger buns and coleslaw for serving"
    ],
    instructions: [
      "Mix all spices and rub over pork shoulder.",
      "Place pork in slow cooker. Pour in BBQ sauce, vinegar, and broth.",
      "Cook on low 8-10 hours or high 4-5 hours until fork-tender.",
      "Remove pork and shred with two forks.",
      "Return shredded pork to the slow cooker and stir into the juices.",
      "Serve on buns with coleslaw."
    ],
    notes: [
      "The longer it cooks the more tender it gets",
      "Excellent for meal prep — keeps refrigerated for 5 days",
      "Also great on nachos, baked potatoes, or pizza"
    ]
  },

  {
    title: "Beef and broccoli",
    meal: "dinner",
    style: "meat",
    protein: "beef",
    cuisine: "asian",
    time_minutes: 25,
    servings: 4,
    source_url: "https://www.recipetineats.com/beef-and-broccoli/",
    keywords: "asian, quick, weeknight, takeout-style",
    summary: "Tender sliced beef and crisp broccoli in a savory ginger-garlic sauce. Better than takeout in 25 minutes.",
    ingredients: [
      "1 lb flank steak or sirloin, thinly sliced against the grain",
      "4 cups broccoli florets",
      "3 cloves garlic, minced",
      "1 teaspoon fresh ginger, grated",
      "1/3 cup soy sauce",
      "3 tablespoons oyster sauce",
      "2 tablespoons brown sugar",
      "1 tablespoon sesame oil",
      "1 tablespoon cornstarch",
      "1/4 cup water",
      "2 tablespoons vegetable oil",
      "cooked rice for serving",
      "sesame seeds for garnish"
    ],
    instructions: [
      "Toss sliced beef with 1 tablespoon soy sauce and 1 teaspoon cornstarch. Set aside.",
      "Whisk remaining soy sauce, oyster sauce, brown sugar, sesame oil, cornstarch, and water for the sauce.",
      "Heat oil in a wok over high heat. Cook beef in a single layer 2 minutes until browned. Remove.",
      "Stir fry broccoli 3 minutes. Add garlic and ginger, cook 30 seconds.",
      "Pour sauce over broccoli. Add beef back. Toss everything together until sauce thickens.",
      "Serve over rice with sesame seeds."
    ],
    notes: [
      "Partially freeze the beef for 20 minutes to slice it very thin",
      "High heat is essential — do not crowd the pan",
      "Blanch broccoli first for a brighter green color"
    ]
  },

  {
    title: "Braised short ribs",
    meal: "dinner",
    style: "meat",
    protein: "beef",
    cuisine: "american",
    time_minutes: 60,
    servings: 4,
    source_url: "https://www.seriouseats.com/braised-short-ribs-recipe",
    keywords: "weekend, comfort, elegant, slow-cook, date-night",
    summary: "Bone-in beef short ribs braised in red wine and beef broth until fall-off-the-bone tender. A weekend showstopper.",
    ingredients: [
      "3-4 lbs bone-in beef short ribs",
      "1 large onion, diced",
      "3 carrots, diced",
      "3 stalks celery, diced",
      "6 cloves garlic, minced",
      "2 tablespoons tomato paste",
      "2 cups dry red wine",
      "2 cups beef broth",
      "4 sprigs fresh thyme",
      "2 bay leaves",
      "2 tablespoons olive oil",
      "salt and pepper to taste",
      "mashed potatoes or egg noodles for serving"
    ],
    instructions: [
      "Season short ribs generously with salt and pepper.",
      "Sear in olive oil over high heat 3-4 minutes per side until deeply browned. Remove.",
      "Cook onion, carrots, and celery in the same pan 5 minutes. Add garlic and tomato paste.",
      "Pour in red wine and scrape up browned bits. Simmer 5 minutes.",
      "Add broth, thyme, and bay leaves. Return short ribs.",
      "Cover and braise at 325°F for 2.5-3 hours until meat is falling off the bone.",
      "Skim fat from the braising liquid and reduce to a sauce."
    ],
    notes: [
      "The sear is the most important step — do not skip it",
      "This is even better the next day after refrigerating overnight",
      "Use a Dutch oven for the best results"
    ]
  },

  {
    title: "Camper chicken enchiladas",
    meal: "dinner",
    style: "meat",
    protein: "chicken",
    cuisine: "mexican",
    time_minutes: 45,
    servings: 6,
    source_url: "https://www.tasteofhome.com/recipes/chicken-enchiladas/",
    keywords: "comfort, family, crowd-pleaser, make-ahead",
    summary: "Shredded chicken enchiladas smothered in red enchilada sauce and melted cheese. A family dinner staple.",
    ingredients: [
      "2 lbs boneless skinless chicken breasts, cooked and shredded",
      "10 flour tortillas",
      "2 cans red enchilada sauce (10 oz each)",
      "2 cups shredded Mexican cheese blend",
      "1 large onion, diced",
      "1 can diced green chiles (4 oz)",
      "3 cloves garlic, minced",
      "1 teaspoon cumin",
      "1 teaspoon chili powder",
      "2 tablespoons olive oil",
      "salt and pepper to taste",
      "sour cream and cilantro for serving"
    ],
    instructions: [
      "Preheat oven to 375°F.",
      "Cook onion and garlic in olive oil 5 minutes. Add green chiles, cumin, and chili powder.",
      "Mix with shredded chicken. Season with salt and pepper.",
      "Spread 1/2 cup enchilada sauce in a 9x13 baking dish.",
      "Fill each tortilla with chicken mixture and a sprinkle of cheese. Roll and place seam-side down.",
      "Pour remaining sauce over enchiladas and top with remaining cheese.",
      "Cover and bake 20 minutes. Uncover and bake 10 more minutes.",
      "Serve with sour cream and cilantro."
    ],
    notes: [
      "Use rotisserie chicken for maximum ease",
      "Assemble the night before and refrigerate — bake day-of",
      "Add black beans to the filling for extra substance"
    ]
  },

  {
    title: "Cheeseburgers",
    meal: "dinner",
    style: "meat",
    protein: "beef",
    cuisine: "american",
    time_minutes: 20,
    servings: 4,
    source_url: "https://www.seriouseats.com/the-best-basic-burger",
    keywords: "quick, kid-friendly, grilling, summer, comfort",
    summary: "Classic juicy cheeseburgers with beef patties cooked to your liking on the grill or skillet.",
    ingredients: [
      "2 lbs ground beef (80/20 blend)",
      "4 hamburger buns, toasted",
      "4 slices cheddar or American cheese",
      "1 large onion, sliced",
      "2 tomatoes, sliced",
      "4 leaves romaine or iceberg lettuce",
      "3 tablespoons mayonnaise",
      "2 tablespoons ketchup",
      "1 tablespoon yellow mustard",
      "1 tablespoon Worcestershire sauce",
      "1 teaspoon garlic powder",
      "salt and pepper to taste",
      "pickles for serving"
    ],
    instructions: [
      "Divide beef into 4 equal portions. Form into patties slightly wider than the buns — they shrink when cooked.",
      "Season both sides generously with salt and pepper.",
      "Cook over high heat 3-4 minutes per side for medium. Add cheese in the last minute.",
      "Toast buns on the grill or in a skillet.",
      "Assemble with desired toppings and condiments."
    ],
    notes: [
      "Do not press down on the patties while cooking — you lose all the juices",
      "80/20 ground beef is essential for juicy burgers",
      "Make a small indent in the center of each patty to prevent puffing"
    ]
  },

  {
    title: "Chicken parm",
    meal: "dinner",
    style: "meat",
    protein: "chicken",
    cuisine: "italian",
    time_minutes: 40,
    servings: 4,
    source_url: "https://www.foodnetwork.com/recipes/ree-drummond/chicken-parmesan",
    keywords: "comfort, italian, family, kid-friendly, classic",
    summary: "Breaded chicken cutlets topped with marinara and melted mozzarella. A timeless Italian-American comfort classic.",
    ingredients: [
      "4 boneless skinless chicken breasts, pounded thin",
      "2 cups marinara sauce",
      "1 1/2 cups shredded mozzarella cheese",
      "1/2 cup grated Parmesan cheese",
      "1 cup Italian seasoned breadcrumbs",
      "2 eggs, beaten",
      "1/2 cup all-purpose flour",
      "2 tablespoons olive oil",
      "1 teaspoon garlic powder",
      "1 teaspoon dried basil",
      "1 teaspoon dried oregano",
      "salt and pepper to taste",
      "fresh basil for garnish",
      "pasta for serving"
    ],
    instructions: [
      "Preheat oven to 400°F.",
      "Season chicken with salt, pepper, garlic powder, and oregano.",
      "Dredge in flour, then egg, then breadcrumbs.",
      "Cook in olive oil over medium-high heat 3 minutes per side until golden.",
      "Place in a baking dish. Top with marinara sauce and cheeses.",
      "Bake 15-20 minutes until cheese is bubbly and chicken is cooked through.",
      "Garnish with fresh basil. Serve over pasta."
    ],
    notes: [
      "Pounding the chicken to even thickness is key for consistent cooking",
      "Use fresh mozzarella for superior melt",
      "Leftovers make an excellent sandwich the next day"
    ]
  },

  {
    title: "Chicken wings",
    meal: "dinner",
    style: "meat",
    protein: "chicken",
    cuisine: "american",
    time_minutes: 50,
    servings: 4,
    source_url: "https://www.seriouseats.com/the-best-buffalo-wings-recipe",
    keywords: "game-day, crowd-pleaser, crispy, comfort, party",
    summary: "Crispy oven-baked chicken wings tossed in classic Buffalo hot sauce. Game day essential.",
    ingredients: [
      "3 lbs chicken wings, split at joints tips discarded",
      "1/2 cup hot sauce (Frank's RedHot preferred)",
      "4 tablespoons unsalted butter, melted",
      "1 teaspoon garlic powder",
      "1 teaspoon onion powder",
      "1 teaspoon smoked paprika",
      "1 tablespoon baking powder",
      "1 teaspoon salt",
      "1/2 teaspoon black pepper",
      "celery sticks and blue cheese or ranch dressing for serving"
    ],
    instructions: [
      "Preheat oven to 425°F. Line a baking sheet with a wire rack.",
      "Pat wings completely dry with paper towels.",
      "Toss with baking powder, salt, pepper, garlic powder, onion powder, and paprika.",
      "Spread on rack and bake 45-50 minutes, flipping halfway, until very crispy.",
      "Toss hot wings in butter and hot sauce mixture.",
      "Serve immediately with celery and blue cheese or ranch."
    ],
    notes: [
      "Baking powder is the secret to crispy oven wings — do not skip it",
      "Pat wings very dry before seasoning for maximum crispiness",
      "For extra crispy skin refrigerate seasoned wings uncovered overnight before baking"
    ]
  },

  {
    title: "Chili",
    meal: "dinner",
    style: "meat",
    protein: "beef",
    cuisine: "american",
    time_minutes: 45,
    servings: 6,
    source_url: "https://www.allrecipes.com/recipe/26317/award-winning-chili/",
    keywords: "comfort, warming, meal-prep, crowd-pleaser, winter",
    summary: "Hearty beef chili with kidney beans, tomatoes, and a deep spice blend. Gets better the next day.",
    ingredients: [
      "2 lbs ground beef or ground turkey",
      "1 large onion, diced",
      "3 cloves garlic, minced",
      "1 green bell pepper, diced",
      "2 cans diced tomatoes (14 oz each)",
      "1 can tomato sauce (15 oz)",
      "2 cans kidney beans, drained and rinsed",
      "2 cups beef broth",
      "2 tablespoons chili powder",
      "1 tablespoon cumin",
      "1 teaspoon smoked paprika",
      "1 teaspoon oregano",
      "1/2 teaspoon cayenne pepper",
      "2 tablespoons olive oil",
      "salt and pepper to taste",
      "sour cream, shredded cheese, and scallions for serving"
    ],
    instructions: [
      "Brown ground beef in a large pot over medium-high heat. Drain excess fat.",
      "Add onion and bell pepper. Cook 5 minutes. Add garlic and cook 1 minute.",
      "Stir in all spices. Cook 1 minute until fragrant.",
      "Add tomatoes, tomato sauce, broth, and beans.",
      "Simmer uncovered 30 minutes stirring occasionally until thickened.",
      "Season with salt and pepper.",
      "Serve with sour cream, cheese, and scallions."
    ],
    notes: [
      "Chili improves significantly overnight — make it a day ahead",
      "Add a square of dark chocolate for depth",
      "Freezes perfectly for up to 3 months"
    ]
  },

  {
    title: "Deconstructed steak sandwiches with cheese",
    meal: "dinner",
    style: "meat",
    protein: "beef",
    cuisine: "american",
    time_minutes: 25,
    servings: 4,
    source_url: "https://www.foodnetwork.com/recipes/philly-cheesesteak",
    keywords: "quick, comfort, hearty, weeknight",
    summary: "Philly cheesesteak-inspired sliced steak with sautéed peppers, onions, and melted provolone served deconstructed over rolls.",
    ingredients: [
      "1.5 lbs ribeye or sirloin steak, thinly sliced",
      "4 hoagie rolls or sub rolls",
      "1 large onion, thinly sliced",
      "2 green bell peppers, thinly sliced",
      "8 slices provolone or white American cheese",
      "3 tablespoons butter",
      "2 tablespoons Worcestershire sauce",
      "1 tablespoon vegetable oil",
      "1 teaspoon garlic powder",
      "salt and pepper to taste",
      "mushrooms, sliced (optional)"
    ],
    instructions: [
      "Cook onions and peppers in butter over medium heat 10 minutes until caramelized.",
      "Season steak slices with garlic powder, salt, and pepper.",
      "Cook steak in oil over high heat 2 minutes until browned. Add Worcestershire sauce.",
      "Combine steak and vegetables. Top with cheese slices and cover until melted.",
      "Toast rolls in butter.",
      "Serve steak and cheese mixture over or alongside toasted rolls."
    ],
    notes: [
      "Slice steak as thin as possible — partially freeze for easier slicing",
      "White American cheese melts best for authentic Philly flavor",
      "Add hot cherry peppers for a classic Philadelphia touch"
    ]
  },

  {
    title: "Fried chicken",
    meal: "dinner",
    style: "meat",
    protein: "chicken",
    cuisine: "american",
    time_minutes: 50,
    servings: 4,
    source_url: "https://www.seriouseats.com/the-food-labs-buttermilk-fried-chicken",
    keywords: "comfort, weekend, crispy, southern, family",
    summary: "Crispy buttermilk-marinated fried chicken with a deeply seasoned crust. A Southern comfort food classic.",
    ingredients: [
      "3-4 lbs chicken pieces (thighs, drumsticks, breasts)",
      "2 cups buttermilk",
      "2 cups all-purpose flour",
      "1 tablespoon garlic powder",
      "1 tablespoon onion powder",
      "1 tablespoon smoked paprika",
      "1 tablespoon salt",
      "1 teaspoon black pepper",
      "1 teaspoon cayenne pepper",
      "1 teaspoon dried oregano",
      "vegetable oil for frying",
      "hot sauce for the buttermilk marinade (optional)"
    ],
    instructions: [
      "Marinate chicken in buttermilk with hot sauce for at least 4 hours or overnight.",
      "Mix flour with all dry spices.",
      "Remove chicken from buttermilk and dredge in seasoned flour. Press firmly to adhere.",
      "Heat oil to 325°F in a large cast iron skillet or Dutch oven.",
      "Fry chicken in batches 12-15 minutes per side until golden and cooked through.",
      "Drain on a wire rack. Do not place on paper towels — it steams the crust."
    ],
    notes: [
      "Overnight buttermilk marinade produces the most tender and flavorful chicken",
      "Maintain oil temperature — too hot burns the crust before chicken is cooked",
      "Let chicken rest 10 minutes before serving"
    ]
  },

  {
    title: "Grilled chicken with potato salad",
    meal: "dinner",
    style: "meat",
    protein: "chicken",
    cuisine: "american",
    time_minutes: 40,
    servings: 4,
    source_url: "https://www.bonappetit.com/recipe/grilled-chicken-and-potato-salad",
    keywords: "summer, grilling, fresh, picnic, family",
    summary: "Herb-marinated grilled chicken served with a tangy Dijon potato salad. Perfect for summer cookouts.",
    ingredients: [
      "4 boneless skinless chicken breasts",
      "2 lbs Yukon Gold potatoes, cubed",
      "3 tablespoons olive oil",
      "2 tablespoons Dijon mustard",
      "2 tablespoons red wine vinegar",
      "3 stalks celery, diced",
      "1/4 red onion, finely diced",
      "3 tablespoons mayonnaise",
      "2 tablespoons fresh parsley, chopped",
      "1 teaspoon garlic powder",
      "1 teaspoon smoked paprika",
      "salt and pepper to taste",
      "lemon wedges for serving"
    ],
    instructions: [
      "Boil potato cubes until just tender, about 12 minutes. Drain and cool.",
      "Marinate chicken in 2 tablespoons olive oil, garlic powder, paprika, salt, and pepper.",
      "Grill chicken over medium-high heat 6-7 minutes per side until cooked through.",
      "Whisk mustard, vinegar, remaining olive oil, and mayo for dressing.",
      "Toss potatoes with dressing, celery, red onion, and parsley.",
      "Season potato salad with salt and pepper.",
      "Serve chicken alongside potato salad with lemon wedges."
    ],
    notes: [
      "Do not overcook the potatoes — they should hold their shape",
      "The potato salad improves after sitting for 30 minutes",
      "Colorado new potatoes in summer are exceptional here"
    ]
  },

  {
    title: "Pork chops",
    meal: "dinner",
    style: "meat",
    protein: "pork",
    cuisine: "american",
    time_minutes: 25,
    servings: 4,
    source_url: "https://www.seriouseats.com/pan-seared-pork-chops-with-herb-pan-sauce",
    keywords: "quick, weeknight, comfort, easy",
    summary: "Pan-seared bone-in pork chops with a garlic herb pan sauce. Ready in 25 minutes.",
    ingredients: [
      "4 bone-in pork chops (3/4 to 1 inch thick)",
      "4 cloves garlic, minced",
      "3 sprigs fresh rosemary or thyme",
      "2 tablespoons butter",
      "2 tablespoons olive oil",
      "1/2 cup chicken broth",
      "1 tablespoon Dijon mustard",
      "1 teaspoon smoked paprika",
      "1 teaspoon garlic powder",
      "salt and pepper to taste",
      "lemon wedges for serving",
      "mashed potatoes or roasted vegetables for serving"
    ],
    instructions: [
      "Pat pork chops dry and season generously with salt, pepper, garlic powder, and paprika.",
      "Heat oil in a cast iron skillet over high heat until smoking.",
      "Sear chops 3-4 minutes per side without moving.",
      "Add butter, garlic, and herbs. Baste chops continuously 1 minute.",
      "Remove chops and rest 5 minutes.",
      "Deglaze pan with broth and whisk in mustard for the sauce.",
      "Serve chops with pan sauce and lemon wedges."
    ],
    notes: [
      "Pat dry thoroughly for a good sear",
      "Do not move the chops while searing — let them develop a crust",
      "Bone-in chops have more flavor than boneless"
    ]
  },

  {
    title: "Round steak stroganoff",
    meal: "dinner",
    style: "meat",
    protein: "beef",
    cuisine: "american",
    time_minutes: 40,
    servings: 4,
    source_url: "https://www.allrecipes.com/recipe/11718/simple-beef-stroganoff/",
    keywords: "comfort, weeknight, creamy, hearty",
    summary: "Tender round steak in a creamy mushroom and sour cream sauce served over egg noodles.",
    ingredients: [
      "1.5 lbs round steak, thinly sliced",
      "8 oz cremini mushrooms, sliced",
      "1 large onion, diced",
      "3 cloves garlic, minced",
      "2 cups beef broth",
      "1 cup sour cream",
      "2 tablespoons Worcestershire sauce",
      "2 tablespoons tomato paste",
      "2 tablespoons all-purpose flour",
      "2 tablespoons butter",
      "2 tablespoons olive oil",
      "salt and pepper to taste",
      "egg noodles for serving",
      "fresh parsley for garnish"
    ],
    instructions: [
      "Season steak slices with salt and pepper. Toss with flour.",
      "Brown steak in oil over high heat. Remove and set aside.",
      "Cook onion and mushrooms in butter 8 minutes until golden.",
      "Add garlic, tomato paste, and Worcestershire. Cook 1 minute.",
      "Add broth and scrape up browned bits. Return steak.",
      "Simmer 15 minutes until tender.",
      "Remove from heat and stir in sour cream.",
      "Serve over egg noodles with parsley."
    ],
    notes: [
      "Do not boil after adding sour cream — it will curdle",
      "Round steak is tougher than ribeye and benefits from longer simmering",
      "Ground beef can substitute for a faster version"
    ]
  },

  {
    title: "Skillet meatloaf / cheeseburger meatloaf",
    meal: "dinner",
    style: "meat",
    protein: "beef",
    cuisine: "american",
    time_minutes: 50,
    servings: 6,
    source_url: "https://www.foodnetwork.com/recipes/food-network-kitchen/classic-meatloaf",
    keywords: "comfort, family, kid-friendly, classic, weekend",
    summary: "A classic cheeseburger-inspired meatloaf with melted cheddar inside and a ketchup glaze on top.",
    ingredients: [
      "2 lbs ground beef (80/20)",
      "1 cup shredded cheddar cheese",
      "1/2 cup breadcrumbs",
      "1/2 cup whole milk",
      "1 large onion, finely diced",
      "3 cloves garlic, minced",
      "2 eggs, beaten",
      "2 tablespoons Worcestershire sauce",
      "1/4 cup ketchup",
      "1 tablespoon yellow mustard",
      "1 teaspoon salt",
      "1/2 teaspoon black pepper",
      "1/2 teaspoon smoked paprika",
      "1/4 cup ketchup mixed with 1 tablespoon brown sugar for glaze"
    ],
    instructions: [
      "Preheat oven to 350°F.",
      "Soak breadcrumbs in milk 5 minutes.",
      "Mix ground beef with soaked breadcrumbs, onion, garlic, eggs, Worcestershire, ketchup, mustard, cheese, and spices.",
      "Form into a loaf in a 9x5 loaf pan or free-form in a skillet.",
      "Spread ketchup-brown sugar glaze over the top.",
      "Bake 55-60 minutes until internal temperature reaches 160°F.",
      "Rest 10 minutes before slicing."
    ],
    notes: [
      "Do not overmix — it makes meatloaf dense",
      "The milk-soaked breadcrumbs keep it moist",
      "Leftovers make exceptional sandwiches"
    ]
  },

  {
    title: "Steak kabobs deconstructed",
    meal: "dinner",
    style: "meat",
    protein: "beef",
    cuisine: "american",
    time_minutes: 30,
    servings: 4,
    source_url: "https://www.foodnetwork.com/recipes/bobby-flay/steak-kabobs",
    keywords: "summer, grilling, fresh, quick, colorful",
    summary: "Marinated sirloin with grilled peppers, onions, mushrooms, and cherry tomatoes served deconstructed.",
    ingredients: [
      "2 lbs sirloin or ribeye steak, cut into 1.5-inch cubes",
      "2 red bell peppers, cut into chunks",
      "2 green bell peppers, cut into chunks",
      "1 large red onion, cut into chunks",
      "2 cups cherry tomatoes",
      "8 oz mushrooms, whole or halved",
      "3 cloves garlic, minced",
      "3 tablespoons olive oil",
      "2 tablespoons soy sauce",
      "1 tablespoon Worcestershire sauce",
      "1 tablespoon red wine vinegar",
      "1 teaspoon smoked paprika",
      "1 teaspoon dried oregano",
      "salt and pepper to taste",
      "fresh parsley for garnish"
    ],
    instructions: [
      "Whisk olive oil, soy sauce, Worcestershire, vinegar, garlic, paprika, oregano, salt, and pepper for marinade.",
      "Toss steak cubes in marinade and let sit 30 minutes.",
      "Grill steak over high heat 2-3 minutes per side for medium-rare.",
      "Grill peppers, onion, and mushrooms alongside until charred.",
      "Grill cherry tomatoes just until blistered.",
      "Arrange everything on a platter and garnish with parsley."
    ],
    notes: [
      "Colorado bell peppers are at peak July through September",
      "Do not marinate longer than 2 hours — the acid will begin to break down the texture",
      "Works equally well as assembled skewers on the grill"
    ]
  },

  {
    title: "Stew",
    meal: "dinner",
    style: "meat",
    protein: "beef",
    cuisine: "american",
    time_minutes: 60,
    servings: 6,
    source_url: "https://www.seriouseats.com/old-fashioned-beef-stew",
    keywords: "comfort, winter, hearty, slow-cook, meal-prep",
    summary: "Old-fashioned beef stew with tender chunks of chuck, carrots, potatoes, and celery in a rich broth.",
    ingredients: [
      "2 lbs beef chuck, cut into 2-inch cubes",
      "1 large onion, diced",
      "4 carrots, cut into 1-inch pieces",
      "4 stalks celery, cut into 1-inch pieces",
      "3 medium potatoes, cut into 2-inch cubes",
      "4 cloves garlic, minced",
      "2 tablespoons tomato paste",
      "3 cups beef broth",
      "1 cup dry red wine",
      "2 tablespoons Worcestershire sauce",
      "2 sprigs fresh thyme",
      "2 bay leaves",
      "3 tablespoons all-purpose flour",
      "3 tablespoons olive oil",
      "salt and pepper to taste",
      "fresh parsley for garnish"
    ],
    instructions: [
      "Toss beef cubes with flour, salt, and pepper.",
      "Brown beef in oil in batches over high heat. Remove and set aside.",
      "Cook onion 5 minutes. Add garlic and tomato paste. Cook 1 minute.",
      "Deglaze with red wine, scraping up browned bits.",
      "Add broth, Worcestershire, thyme, and bay leaves. Return beef.",
      "Simmer covered 1.5 hours. Add carrots, celery, and potatoes.",
      "Simmer 30 more minutes until vegetables and beef are tender.",
      "Remove bay leaves and thyme. Serve with parsley."
    ],
    notes: [
      "Brown the beef in batches — crowding steams instead of sears",
      "This improves significantly the next day",
      "Add frozen peas in the last 5 minutes for color"
    ]
  },

  {
    title: "Tacos",
    meal: "dinner",
    style: "meat",
    protein: "beef",
    cuisine: "mexican",
    time_minutes: 20,
    servings: 4,
    source_url: "https://www.isabeleats.com/easy-ground-beef-tacos/",
    keywords: "quick, kid-friendly, weeknight, family, 20-minutes",
    summary: "Juicy seasoned ground beef tacos with homemade taco seasoning in corn or flour tortillas.",
    ingredients: [
      "1.5 lbs ground beef (85% lean)",
      "8 small corn or flour tortillas",
      "1 large onion, diced",
      "3 cloves garlic, minced",
      "2 tablespoons tomato paste",
      "1/4 cup water",
      "1 tablespoon chili powder",
      "1 teaspoon ground cumin",
      "1 teaspoon smoked paprika",
      "1/2 teaspoon garlic powder",
      "1/2 teaspoon onion powder",
      "1/2 teaspoon dried oregano",
      "1 tablespoon olive oil",
      "salt to taste",
      "juice of 1 lime",
      "shredded cheese, shredded lettuce, diced tomato, sour cream, and salsa for serving"
    ],
    instructions: [
      "Heat oil in a skillet over medium-high heat. Cook onion 4 minutes until softened.",
      "Add garlic and cook 1 minute.",
      "Add ground beef and cook, breaking up, until browned. Drain excess fat.",
      "Add all spices, tomato paste, and water. Stir and simmer 3 minutes until sauce thickens.",
      "Squeeze lime juice over the meat.",
      "Warm tortillas in a dry skillet.",
      "Fill with meat and desired toppings."
    ],
    notes: [
      "The lime juice at the end brightens everything",
      "Make a double batch of the seasoning to keep on hand",
      "Leftover taco meat is great in burritos or on nachos the next day"
    ]
  },

  // ============================================================
  // DINNER — RICE OR PASTA
  // ============================================================

  {
    title: "Hamburger stroganoff",
    meal: "dinner",
    style: "rice-or-pasta",
    protein: "beef",
    cuisine: "american",
    time_minutes: 30,
    servings: 4,
    source_url: "https://www.tasteofhome.com/recipes/hamburger-stroganoff/",
    keywords: "quick, weeknight, comfort, budget, easy",
    summary: "Ground beef stroganoff with mushrooms and sour cream over egg noodles. A weeknight comfort food classic.",
    ingredients: [
      "1 lb ground beef",
      "8 oz egg noodles",
      "8 oz cremini mushrooms, sliced",
      "1 large onion, diced",
      "3 cloves garlic, minced",
      "2 cups beef broth",
      "1 cup sour cream",
      "1 can cream of mushroom soup (10.5 oz)",
      "2 tablespoons Worcestershire sauce",
      "2 tablespoons butter",
      "1 tablespoon all-purpose flour",
      "salt and pepper to taste",
      "fresh parsley for garnish"
    ],
    instructions: [
      "Cook egg noodles according to package directions. Drain.",
      "Brown ground beef in a large skillet. Drain fat. Remove and set aside.",
      "Cook onion and mushrooms in butter 7 minutes until golden.",
      "Add garlic and flour. Cook 1 minute.",
      "Add broth, cream of mushroom soup, and Worcestershire. Stir until smooth.",
      "Return beef. Simmer 10 minutes.",
      "Remove from heat and stir in sour cream.",
      "Serve over egg noodles with parsley."
    ],
    notes: [
      "Do not boil after adding sour cream",
      "Ground turkey works equally well",
      "Add a teaspoon of Dijon mustard for extra depth"
    ]
  },

  {
    title: "Homemade mac n cheese",
    meal: "dinner",
    style: "rice-or-pasta",
    protein: "none",
    cuisine: "american",
    time_minutes: 30,
    servings: 6,
    source_url: "https://www.seriouseats.com/the-food-labs-ultra-gooey-stovetop-mac-and-cheese",
    keywords: "comfort, kid-friendly, vegetarian, family, classic",
    summary: "Ultra-creamy stovetop mac and cheese with sharp cheddar and Gruyere. Far superior to the box.",
    ingredients: [
      "1 lb elbow macaroni",
      "3 cups sharp cheddar cheese, shredded",
      "1 cup Gruyere cheese, shredded",
      "3 cups whole milk",
      "3 tablespoons unsalted butter",
      "3 tablespoons all-purpose flour",
      "1 teaspoon Dijon mustard",
      "1/2 teaspoon smoked paprika",
      "1/4 teaspoon cayenne pepper",
      "1/2 teaspoon garlic powder",
      "salt and pepper to taste",
      "breadcrumbs and butter for topping (optional)"
    ],
    instructions: [
      "Cook macaroni according to package directions. Drain.",
      "Melt butter in a large saucepan over medium heat. Whisk in flour and cook 2 minutes.",
      "Gradually whisk in milk. Cook 5 minutes until thickened.",
      "Remove from heat. Stir in mustard, paprika, cayenne, and garlic powder.",
      "Add cheese in two batches, stirring until smooth.",
      "Fold in cooked macaroni. Season with salt and pepper.",
      "For baked version: top with buttered breadcrumbs and broil until golden."
    ],
    notes: [
      "Shred cheese yourself — pre-shredded has anti-caking agents that affect melting",
      "Do not boil the sauce after adding cheese or it will become grainy",
      "Add diced jalapeños or hot sauce for an adult version"
    ]
  },

  {
    title: "Lasagne",
    meal: "dinner",
    style: "rice-or-pasta",
    protein: "beef",
    cuisine: "italian",
    time_minutes: 60,
    servings: 8,
    source_url: "https://www.recipetineats.com/the-best-lasagna/",
    keywords: "comfort, weekend, make-ahead, crowd-pleaser, family",
    summary: "Classic layered lasagna with meat sauce, ricotta, and mozzarella. A crowd-pleasing weekend project.",
    ingredients: [
      "12 lasagne noodles",
      "1 lb ground beef",
      "1/2 lb Italian sausage",
      "1 large onion, diced",
      "4 cloves garlic, minced",
      "1 can crushed tomatoes (28 oz)",
      "1 can tomato sauce (15 oz)",
      "2 tablespoons tomato paste",
      "2 cups ricotta cheese",
      "2 eggs, beaten",
      "3 cups shredded mozzarella cheese",
      "1 cup grated Parmesan cheese",
      "2 tablespoons olive oil",
      "1 teaspoon dried basil",
      "1 teaspoon dried oregano",
      "salt and pepper to taste",
      "fresh basil for garnish"
    ],
    instructions: [
      "Cook noodles al dente. Drain and lay flat.",
      "Brown beef and sausage. Drain fat. Add onion and garlic. Cook 5 minutes.",
      "Add crushed tomatoes, tomato sauce, paste, basil, and oregano. Simmer 20 minutes.",
      "Mix ricotta with eggs, half the Parmesan, salt, and pepper.",
      "Preheat oven to 375°F. Layer: sauce, noodles, ricotta, mozzarella. Repeat 3 times.",
      "Top with remaining mozzarella and Parmesan.",
      "Cover with foil and bake 30 minutes. Uncover and bake 15 more minutes.",
      "Rest 15 minutes before cutting."
    ],
    notes: [
      "Rest time is essential — it firms up for clean slices",
      "Assemble the night before for deeper flavor",
      "Freezes excellently — slice and wrap individual portions"
    ]
  },

  {
    title: "Meatballs with zucchini and rice",
    meal: "dinner",
    style: "rice-or-pasta",
    protein: "beef",
    cuisine: "italian",
    time_minutes: 40,
    servings: 4,
    source_url: "https://www.budgetbytes.com/baked-meatballs/",
    keywords: "family, summer, comfort, kid-friendly",
    summary: "Baked Italian meatballs with diced zucchini served over rice with a simple tomato sauce.",
    ingredients: [
      "1 lb ground beef or mixed beef and pork",
      "2 medium zucchini, diced",
      "1 1/2 cups long-grain white rice",
      "1/2 cup breadcrumbs",
      "1/4 cup grated Parmesan cheese",
      "1 egg, beaten",
      "3 cloves garlic, minced",
      "1 large onion, diced",
      "1 can diced tomatoes (14 oz)",
      "2 cups beef or chicken broth",
      "1 tablespoon Italian seasoning",
      "2 tablespoons olive oil",
      "salt and pepper to taste",
      "fresh parsley for garnish"
    ],
    instructions: [
      "Preheat oven to 400°F. Mix ground meat with breadcrumbs, Parmesan, egg, garlic, Italian seasoning, salt, and pepper.",
      "Roll into 1.5-inch meatballs and bake 18-20 minutes.",
      "Cook rice according to package directions.",
      "Sauté onion in olive oil 5 minutes. Add zucchini and cook 4 minutes.",
      "Add diced tomatoes and broth. Simmer 10 minutes.",
      "Add meatballs to the sauce.",
      "Serve over rice with parsley."
    ],
    notes: [
      "Zucchini is at peak in Colorado July through August",
      "Do not overmix meatballs — it makes them tough",
      "Freeze meatballs after baking for quick future meals"
    ]
  },

  {
    title: "Penne lasagne",
    meal: "dinner",
    style: "rice-or-pasta",
    protein: "beef",
    cuisine: "italian",
    time_minutes: 50,
    servings: 6,
    source_url: "https://www.foodnetwork.com/recipes/baked-penne-recipe",
    keywords: "comfort, make-ahead, family, crowd-pleaser, weeknight",
    summary: "Baked penne with meat sauce, ricotta, and mozzarella — all the flavors of lasagna without the layering.",
    ingredients: [
      "1 lb penne pasta",
      "1 lb ground beef or Italian sausage",
      "1 large onion, diced",
      "4 cloves garlic, minced",
      "1 can crushed tomatoes (28 oz)",
      "1 can tomato sauce (15 oz)",
      "1 cup ricotta cheese",
      "2 cups shredded mozzarella cheese",
      "1/2 cup grated Parmesan cheese",
      "2 tablespoons olive oil",
      "1 teaspoon dried basil",
      "1 teaspoon dried oregano",
      "1/2 teaspoon red pepper flakes",
      "salt and pepper to taste",
      "fresh basil for garnish"
    ],
    instructions: [
      "Cook penne al dente. Drain.",
      "Brown meat in olive oil. Add onion and garlic. Cook 5 minutes.",
      "Add crushed tomatoes, tomato sauce, basil, oregano, red pepper flakes, salt, and pepper. Simmer 15 minutes.",
      "Preheat oven to 375°F.",
      "Toss cooked penne with meat sauce. Stir in ricotta.",
      "Transfer to a 9x13 baking dish. Top with mozzarella and Parmesan.",
      "Bake uncovered 25-30 minutes until bubbly and golden.",
      "Garnish with fresh basil."
    ],
    notes: [
      "Slightly undercook the pasta — it continues cooking in the oven",
      "Assemble up to 24 hours ahead and refrigerate before baking",
      "Add a layer of spinach for extra vegetables"
    ]
  },

  {
    title: "Salmon and rice",
    meal: "dinner",
    style: "rice-or-pasta",
    protein: "salmon",
    cuisine: "american",
    time_minutes: 25,
    servings: 4,
    source_url: "https://www.halfbakedharvest.com/easy-lemon-butter-salmon-rice/",
    keywords: "quick, healthy, weeknight, simple, fresh",
    summary: "Pan-seared lemon butter salmon served over fluffy rice. A simple and satisfying weeknight dinner.",
    ingredients: [
      "4 salmon fillets (6 oz each)",
      "1 1/2 cups long-grain white rice or basmati rice",
      "3 tablespoons unsalted butter",
      "3 cloves garlic, minced",
      "juice of 1 lemon",
      "zest of 1 lemon",
      "2 tablespoons soy sauce",
      "1 tablespoon honey",
      "1 tablespoon olive oil",
      "2 tablespoons fresh parsley, chopped",
      "salt and pepper to taste",
      "lemon slices for serving"
    ],
    instructions: [
      "Cook rice according to package directions.",
      "Season salmon with salt and pepper.",
      "Heat oil in a skillet over medium-high heat. Cook salmon 4-5 minutes per side until cooked through.",
      "Remove salmon. In the same skillet melt butter, add garlic, lemon juice, zest, soy sauce, and honey.",
      "Simmer 2 minutes until slightly thickened.",
      "Serve salmon over rice, drizzled with lemon butter sauce and parsley."
    ],
    notes: [
      "Pat salmon dry for a better sear",
      "Do not move the salmon while cooking the first side",
      "Add capers to the sauce for a Mediterranean twist"
    ]
  },

  {
    title: "Spaghetti",
    meal: "dinner",
    style: "rice-or-pasta",
    protein: "beef",
    cuisine: "italian",
    time_minutes: 40,
    servings: 6,
    source_url: "https://www.recipetineats.com/spaghetti-bolognese/",
    keywords: "family, kid-friendly, comfort, classic, weeknight",
    summary: "Classic spaghetti bolognese with a rich slow-simmered meat sauce. A family dinner staple.",
    ingredients: [
      "1 lb spaghetti",
      "1 lb ground beef",
      "1/2 lb ground pork (optional)",
      "1 large onion, finely diced",
      "3 carrots, finely diced",
      "3 stalks celery, finely diced",
      "4 cloves garlic, minced",
      "1 can crushed tomatoes (28 oz)",
      "1/2 cup dry red wine",
      "1/2 cup whole milk",
      "2 tablespoons tomato paste",
      "2 tablespoons olive oil",
      "1 teaspoon dried basil",
      "1 teaspoon dried oregano",
      "salt and pepper to taste",
      "grated Parmesan cheese for serving"
    ],
    instructions: [
      "Cook onion, carrot, and celery in olive oil 8 minutes until soft.",
      "Add garlic and cook 1 minute. Add ground beef and pork. Brown thoroughly.",
      "Add tomato paste. Cook 2 minutes.",
      "Pour in wine. Simmer 5 minutes.",
      "Add crushed tomatoes, basil, oregano, salt, and pepper.",
      "Simmer 30 minutes. Stir in milk and simmer 10 more minutes.",
      "Cook spaghetti al dente. Reserve 1 cup pasta water.",
      "Toss pasta with sauce, adding pasta water as needed.",
      "Serve with Parmesan."
    ],
    notes: [
      "The longer bolognese simmers the better — 2 hours is ideal",
      "Milk rounds out the acidity of the tomatoes",
      "Use the pasta cooking water to loosen the sauce — it binds everything together"
    ]
  },

  {
    title: "Tortellini with pesto and shrimp and spinach",
    meal: "dinner",
    style: "rice-or-pasta",
    protein: "shrimp",
    cuisine: "italian",
    time_minutes: 20,
    servings: 4,
    source_url: "https://www.allrecipes.com/recipe/pesto-tortellini-shrimp/",
    keywords: "quick, elegant, weeknight, fresh, 20-minutes",
    summary: "Cheese tortellini tossed with pesto, sautéed shrimp, and wilted spinach. A restaurant-quality dinner in 20 minutes.",
    ingredients: [
      "20 oz refrigerated cheese tortellini",
      "1 lb large shrimp, peeled and deveined",
      "3 cups baby spinach",
      "1/2 cup basil pesto",
      "3 cloves garlic, minced",
      "1/4 cup grated Parmesan cheese",
      "2 tablespoons olive oil",
      "juice of 1 lemon",
      "1/4 teaspoon red pepper flakes",
      "salt and pepper to taste",
      "fresh basil for garnish"
    ],
    instructions: [
      "Cook tortellini according to package directions. Reserve 1/2 cup pasta water. Drain.",
      "Season shrimp with salt, pepper, and red pepper flakes.",
      "Heat oil in a skillet over high heat. Cook shrimp 2 minutes per side until pink. Remove.",
      "Add garlic to the skillet. Cook 30 seconds.",
      "Add spinach and toss until wilted.",
      "Add tortellini, pesto, and lemon juice. Toss with pasta water to loosen.",
      "Add shrimp back. Toss everything together.",
      "Serve with Parmesan and fresh basil."
    ],
    notes: [
      "Refrigerated tortellini cooks in 3 minutes — do not overcook",
      "Store-bought pesto works perfectly here",
      "Add sun-dried tomatoes for extra flavor"
    ]
  },

  {
    title: "Tortellini with sausage, spinach, mushrooms, lemon",
    meal: "dinner",
    style: "rice-or-pasta",
    protein: "pork",
    cuisine: "italian",
    time_minutes: 25,
    servings: 4,
    source_url: "https://www.allrecipes.com/recipe/tortellini-sausage-spinach/",
    keywords: "quick, weeknight, comfort, elegant, 25-minutes",
    summary: "Cheese tortellini with Italian sausage, mushrooms, spinach, and bright lemon in a light cream sauce.",
    ingredients: [
      "20 oz refrigerated cheese tortellini",
      "1 lb Italian sausage, casings removed",
      "8 oz cremini mushrooms, sliced",
      "3 cups baby spinach",
      "3 cloves garlic, minced",
      "1/2 cup heavy cream",
      "1/2 cup chicken broth",
      "juice of 1 lemon",
      "zest of 1 lemon",
      "1/4 cup grated Parmesan cheese",
      "2 tablespoons olive oil",
      "1/4 teaspoon red pepper flakes",
      "salt and pepper to taste",
      "fresh parsley for garnish"
    ],
    instructions: [
      "Cook tortellini according to package directions. Drain.",
      "Brown sausage in olive oil, breaking it up. Remove.",
      "Cook mushrooms in the same pan 5 minutes until golden.",
      "Add garlic and red pepper flakes. Cook 30 seconds.",
      "Add cream, broth, lemon juice, and zest. Simmer 3 minutes.",
      "Add spinach and toss until wilted.",
      "Add tortellini and sausage back. Toss to coat.",
      "Serve with Parmesan and parsley."
    ],
    notes: [
      "The lemon brightens the richness of the cream and sausage",
      "Hot Italian sausage adds more flavor than sweet",
      "Add white wine instead of broth for extra depth"
    ]
  },

  {
    title: "Zucchini and squash lasagne",
    meal: "dinner",
    style: "rice-or-pasta",
    protein: "none",
    cuisine: "italian",
    time_minutes: 60,
    servings: 8,
    source_url: "https://www.bonappetit.com/recipe/summer-squash-lasagna",
    keywords: "vegetarian, summer, make-ahead, fresh, elegant",
    summary: "Vegetable lasagna layered with zucchini, yellow squash, ricotta, and marinara. A summer garden favorite.",
    ingredients: [
      "12 lasagne noodles",
      "3 medium zucchini, thinly sliced lengthwise",
      "2 yellow squash, thinly sliced lengthwise",
      "2 cups ricotta cheese",
      "2 eggs, beaten",
      "3 cups shredded mozzarella cheese",
      "1/2 cup grated Parmesan cheese",
      "2 cups marinara sauce",
      "3 cloves garlic, minced",
      "1 large onion, diced",
      "2 tablespoons olive oil",
      "1 teaspoon dried basil",
      "1 teaspoon dried oregano",
      "1/4 teaspoon red pepper flakes",
      "salt and pepper to taste",
      "fresh basil for garnish"
    ],
    instructions: [
      "Preheat oven to 375°F. Cook noodles al dente.",
      "Salt zucchini and squash slices. Let sit 15 minutes. Pat dry.",
      "Sauté onion and garlic in olive oil 5 minutes. Add squash and cook 4 minutes.",
      "Mix ricotta with eggs, half the Parmesan, basil, oregano, salt, and pepper.",
      "Layer in a 9x13 dish: sauce, noodles, ricotta, vegetables, mozzarella. Repeat.",
      "Top with remaining mozzarella and Parmesan.",
      "Cover and bake 30 minutes. Uncover and bake 15 more minutes.",
      "Rest 15 minutes before cutting."
    ],
    notes: [
      "Salting and drying the squash removes excess water that would make the lasagna soggy",
      "Colorado zucchini in July and August is exceptional here",
      "This is an excellent make-ahead dish — assemble day before and refrigerate"
    ]
  },

  // ============================================================
  // DINNER — SOUP OR STEW
  // ============================================================

  {
    title: "Cheddar broccoli soup",
    meal: "dinner",
    style: "soup-or-stew",
    protein: "none",
    cuisine: "american",
    time_minutes: 35,
    servings: 6,
    source_url: "https://www.allrecipes.com/recipe/24098/broccoli-cheese-soup/",
    keywords: "comfort, vegetarian, creamy, warming, winter",
    summary: "Thick and creamy broccoli cheddar soup with shredded carrots and a sharp cheddar base.",
    ingredients: [
      "4 cups broccoli florets, chopped",
      "2 cups sharp cheddar cheese, shredded",
      "1 large onion, diced",
      "3 cloves garlic, minced",
      "2 carrots, shredded",
      "3 cups chicken or vegetable broth",
      "2 cups whole milk or half-and-half",
      "3 tablespoons unsalted butter",
      "3 tablespoons all-purpose flour",
      "1/2 teaspoon mustard powder",
      "1/4 teaspoon cayenne pepper",
      "salt and pepper to taste",
      "crusty bread for serving"
    ],
    instructions: [
      "Melt butter in a large pot over medium heat. Cook onion 5 minutes.",
      "Add garlic and flour. Cook 2 minutes.",
      "Gradually whisk in broth and milk. Bring to a simmer.",
      "Add broccoli and carrots. Simmer 15 minutes until broccoli is very tender.",
      "Use an immersion blender to blend half the soup for a creamy-chunky texture.",
      "Add mustard powder, cayenne, salt, and pepper.",
      "Remove from heat. Stir in cheese until melted.",
      "Serve with crusty bread."
    ],
    notes: [
      "Do not boil after adding cheese — it will become grainy",
      "Shred your own cheese for better melting",
      "Add a swirl of cream on top when serving for presentation"
    ]
  },

  {
    title: "Chicken tortilla soup in crock pot",
    meal: "dinner",
    style: "soup-or-stew",
    protein: "chicken",
    cuisine: "mexican",
    time_minutes: 30,
    servings: 6,
    source_url: "https://dashofsanity.com/chicken-tortilla-soup-crock-pot/",
    keywords: "slow-cooker, comfort, meal-prep, family, easy",
    summary: "Hands-off slow cooker chicken tortilla soup with black beans, corn, and enchilada sauce.",
    ingredients: [
      "2 lbs boneless skinless chicken breasts",
      "2 cans chicken broth (14.5 oz each)",
      "1 can red enchilada sauce (14 oz)",
      "1 can diced tomatoes with green chiles (10 oz)",
      "1 can black beans, drained and rinsed",
      "1 1/2 cups frozen corn",
      "1 large onion, diced",
      "3 cloves garlic, minced",
      "1 red bell pepper, diced",
      "2 teaspoons cumin",
      "1 teaspoon chili powder",
      "1 teaspoon smoked paprika",
      "salt and pepper to taste",
      "shredded cheddar cheese, sour cream, tortilla strips, and cilantro for serving"
    ],
    instructions: [
      "Add all ingredients except toppings to a slow cooker.",
      "Cook on low 6-8 hours or high 3-4 hours.",
      "Remove chicken and shred with two forks. Return to the slow cooker.",
      "Adjust seasoning with salt and pepper.",
      "Serve topped with cheese, sour cream, tortilla strips, and cilantro."
    ],
    notes: [
      "This is nearly identical to the stovetop version but completely hands-off",
      "Add cream cheese in the last 30 minutes for a creamier soup",
      "Freezes excellently for up to 3 months"
    ]
  },

  {
    title: "Chicken wild rice soup",
    meal: "dinner",
    style: "soup-or-stew",
    protein: "chicken",
    cuisine: "american",
    time_minutes: 50,
    servings: 6,
    source_url: "https://www.tasteofhome.com/recipes/chicken-and-wild-rice-soup/",
    keywords: "comfort, warming, creamy, winter, hearty",
    summary: "Creamy chicken and wild rice soup with carrots, celery, and herbs. A warming winter staple.",
    ingredients: [
      "1.5 lbs boneless skinless chicken breasts or thighs",
      "1 cup uncooked wild rice blend",
      "1 large onion, diced",
      "3 carrots, diced",
      "3 stalks celery, diced",
      "4 cloves garlic, minced",
      "6 cups chicken broth",
      "1 cup heavy cream or half-and-half",
      "3 tablespoons unsalted butter",
      "3 tablespoons all-purpose flour",
      "1 teaspoon dried thyme",
      "1 bay leaf",
      "salt and pepper to taste",
      "fresh parsley for garnish"
    ],
    instructions: [
      "Cook chicken in broth 20 minutes until cooked through. Remove and shred. Keep broth.",
      "Cook wild rice according to package directions.",
      "Melt butter in the soup pot. Cook onion, carrots, and celery 7 minutes.",
      "Add garlic, flour, and thyme. Cook 2 minutes.",
      "Gradually add reserved broth. Bring to a simmer.",
      "Add shredded chicken and cooked wild rice.",
      "Stir in cream. Simmer 10 minutes. Season and remove bay leaf.",
      "Serve with parsley."
    ],
    notes: [
      "Wild rice blend takes longer to cook than white rice — start it early",
      "This thickens significantly as it sits — add more broth when reheating",
      "Freeze without the cream and add it fresh when reheating"
    ]
  },

  {
    title: "Grilled cheese and tomato soup",
    meal: "dinner",
    style: "soup-or-stew",
    protein: "none",
    cuisine: "american",
    time_minutes: 35,
    servings: 4,
    source_url: "https://www.seriouseats.com/cream-of-tomato-soup-from-scratch",
    keywords: "comfort, vegetarian, classic, quick, kid-friendly",
    summary: "Silky roasted tomato soup paired with buttery grilled cheese sandwiches. The ultimate comfort food combination.",
    ingredients: [
      "2 cans whole peeled tomatoes (28 oz each)",
      "1 large onion, diced",
      "4 cloves garlic, minced",
      "2 cups chicken or vegetable broth",
      "1/2 cup heavy cream",
      "2 tablespoons unsalted butter",
      "1 tablespoon olive oil",
      "1 teaspoon sugar",
      "1/2 teaspoon dried basil",
      "salt and pepper to taste",
      "8 slices thick-cut bread (sourdough preferred)",
      "8 slices cheddar or Gruyere cheese",
      "4 tablespoons butter, softened"
    ],
    instructions: [
      "Cook onion in butter and oil 7 minutes. Add garlic and cook 1 minute.",
      "Add tomatoes, broth, sugar, and basil. Simmer 15 minutes.",
      "Use an immersion blender to purée until completely smooth.",
      "Stir in cream. Season with salt and pepper.",
      "For grilled cheese: butter the outside of each bread slice.",
      "Cook in a skillet over medium heat 3-4 minutes per side until golden and cheese melts.",
      "Serve soup with grilled cheese for dipping."
    ],
    notes: [
      "Canned San Marzano tomatoes make the best tomato soup",
      "A swirl of cream on top makes a beautiful presentation",
      "Add a grilled cheese crouton cut into cubes on top of the soup"
    ]
  },

  {
    title: "Wonton soup",
    meal: "dinner",
    style: "soup-or-stew",
    protein: "pork",
    cuisine: "asian",
    time_minutes: 40,
    servings: 4,
    source_url: "https://www.recipetineats.com/wonton-soup/",
    keywords: "asian, warming, comfort, light, fresh",
    summary: "Delicate pork wontons in a clear ginger-garlic broth with bok choy and scallions.",
    ingredients: [
      "30 wonton wrappers",
      "1/2 lb ground pork",
      "6 cups chicken broth",
      "3 cloves garlic, minced",
      "1 tablespoon fresh ginger, grated",
      "2 scallions, finely minced for filling",
      "1 tablespoon soy sauce",
      "1 teaspoon sesame oil",
      "1 egg white",
      "1 teaspoon rice wine vinegar",
      "bok choy or napa cabbage, sliced",
      "3 scallions, sliced for garnish",
      "additional soy sauce and sesame oil for serving"
    ],
    instructions: [
      "Mix ground pork with minced scallions, 1 teaspoon soy sauce, sesame oil, and egg white.",
      "Place 1 teaspoon filling in the center of each wonton wrapper.",
      "Moisten edges with water and fold into triangles, pressing to seal.",
      "Bring broth to a simmer with garlic, ginger, remaining soy sauce, and rice wine vinegar.",
      "Cook wontons in simmering broth 5-6 minutes until cooked through.",
      "Add bok choy and cook 2 minutes.",
      "Serve topped with scallions and a drizzle of sesame oil."
    ],
    notes: [
      "Wonton wrappers are available at most grocery stores in the refrigerated section",
      "Keep unfolded wrappers covered with a damp towel while working",
      "Freeze uncooked wontons in a single layer then bag — cook from frozen adding 2 minutes"
    ]
  },

  // ============================================================
  // DINNER — VEGETARIAN
  // ============================================================

  {
    title: "Stir fry",
    meal: "dinner",
    style: "vegetarian",
    protein: "none",
    cuisine: "asian",
    time_minutes: 20,
    servings: 4,
    source_url: "https://www.recipetineats.com/vegetable-stir-fry/",
    keywords: "vegetarian, quick, healthy, weeknight, 20-minutes",
    summary: "Colorful vegetable stir fry in a savory ginger-garlic sauce. Ready in 20 minutes.",
    ingredients: [
      "2 cups broccoli florets",
      "1 red bell pepper, sliced",
      "1 yellow bell pepper, sliced",
      "1 cup snap peas",
      "2 carrots, thinly sliced",
      "8 oz mushrooms, sliced",
      "1 large onion, sliced",
      "3 cloves garlic, minced",
      "1 tablespoon fresh ginger, grated",
      "3 tablespoons soy sauce",
      "1 tablespoon oyster sauce",
      "1 tablespoon sesame oil",
      "1 tablespoon cornstarch",
      "1/4 cup water",
      "2 tablespoons vegetable oil",
      "cooked rice for serving",
      "sesame seeds for garnish"
    ],
    instructions: [
      "Whisk soy sauce, oyster sauce, sesame oil, cornstarch, and water for the sauce.",
      "Heat oil in a wok over high heat until smoking.",
      "Add carrots and broccoli. Stir fry 3 minutes.",
      "Add peppers, snap peas, mushrooms, and onion. Stir fry 2 minutes.",
      "Add garlic and ginger. Cook 30 seconds.",
      "Pour sauce over vegetables. Toss until sauce thickens and coats everything.",
      "Serve over rice with sesame seeds."
    ],
    notes: [
      "High heat is essential for a proper stir fry — do not reduce it",
      "Cut all vegetables before you start — the cooking goes fast",
      "Add tofu or chicken for a protein version"
    ]
  }

];

// ============================================================
// SCRIPT EXECUTION
// ============================================================

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function buildMarkdown(recipe) {
  const frontmatter = `---
title: ${recipe.title}
meal: ${recipe.meal}
style: ${recipe.style}
protein: ${recipe.protein}
cuisine: ${recipe.cuisine}
time_minutes: ${recipe.time_minutes}
servings: ${recipe.servings}
source_url: ${recipe.source_url || ''}
keywords: ${recipe.keywords}
summary: ${recipe.summary}
---

## Ingredients

${recipe.ingredients.map(i => `- ${i}`).join('\n')}

## Instructions

${recipe.instructions.map((step, i) => `${i + 1}. ${step}`).join('\n')}

## Notes

${recipe.notes.map(n => `- ${n}`).join('\n')}
`;
  return frontmatter;
}

let created = 0;
let skipped = 0;

for (const recipe of RECIPES) {
  const slug = slugify(recipe.title);
  const dir = join(repoRoot, 'recipes', recipe.meal, recipe.style);
  const filePath = join(dir, `${slug}.md`);

  // Create directory if it does not exist
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
    console.log(`Created directory: recipes/${recipe.meal}/${recipe.style}/`);
  }

  // Check if file already exists
  if (existsSync(filePath)) {
    console.log(`Skipping (already exists): ${slug}.md`);
    skipped++;
    continue;
  }

  // Write the file
  writeFileSync(filePath, buildMarkdown(recipe), 'utf8');
  console.log(`Created: recipes/${recipe.meal}/${recipe.style}/${slug}.md`);
  created++;
}

console.log('\n===== Create Original Recipe Files Complete =====');
console.log(`Created: ${created} new recipe files`);
console.log(`Skipped: ${skipped} existing files`);
console.log('\nNext step: node ./scripts/generate-ingredient-data.mjs');
