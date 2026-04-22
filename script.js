const RECIPES = [
  { name: "Tacos", meal: "dinner", style: "handheld" },
  { name: "Skillet meatloaf / cheeseburger meatloaf", meal: "dinner", style: "meat" },
  { name: "Cheeseburgers", meal: "dinner", style: "meat" },
  { name: "Round steak stroganoff", meal: "dinner", style: "meat" },
  { name: "Pork chops", meal: "dinner", style: "meat" },
  { name: "Chicken parm", meal: "dinner", style: "meat" },
  { name: "Grilled chicken with potato salad", meal: "dinner", style: "meat" },
  { name: "Fried chicken", meal: "dinner", style: "meat" },
  { name: "Camper chicken enchiladas", meal: "dinner", style: "handheld" },
  { name: "Chicken wings", meal: "dinner", style: "meat" },
  { name: "Steak kabobs deconstructed", meal: "dinner", style: "meat" },
  { name: "Chili", meal: "dinner", style: "soup-or-stew" },
  { name: "BBQ in crockpot", meal: "dinner", style: "meat" },
  { name: "Braised short ribs", meal: "dinner", style: "meat" },
  { name: "Stew", meal: "dinner", style: "soup-or-stew" },
  { name: "Deconstructed steak sandwiches with cheese", meal: "dinner", style: "handheld" },

  { name: "Meatballs with zucchini and rice", meal: "dinner", style: "rice-or-pasta" },
  { name: "Hamburger stroganoff", meal: "dinner", style: "rice-or-pasta" },
  {
    name: "Tortellini with pesto and shrimp and spinach",
    meal: "dinner",
    style: "rice-or-pasta"
  },
  {
    name: "Tortellini with sausage, spinach, mushrooms, lemon",
    meal: "dinner",
    style: "rice-or-pasta"
  },
  { name: "Penne lasagne", meal: "dinner", style: "rice-or-pasta" },
  { name: "Lasagne", meal: "dinner", style: "rice-or-pasta" },
  { name: "Spaghetti", meal: "dinner", style: "rice-or-pasta" },
  { name: "Homemade mac n cheese", meal: "dinner", style: "rice-or-pasta" },
  { name: "Salmon and rice", meal: "dinner", style: "rice-or-pasta" },
  { name: "Zucchini and squash lasagne", meal: "dinner", style: "rice-or-pasta" },

  { name: "Stir fry", meal: "dinner", style: "vegetarian" },
  { name: "Lettuce wraps", meal: "dinner", style: "handheld" },
  { name: "Salmon veggie bowls", meal: "dinner", style: "bowls" },
  { name: "Chipotle bowls", meal: "dinner", style: "bowls" },
  { name: "Homemade pizza", meal: "dinner", style: "baked-casserole" },
  {
    name: "Chicken tortilla soup in crock pot",
    meal: "dinner",
    style: "soup-or-stew",
    source: "https://dashofsanity.com/chicken-tortilla-soup-crock-pot/"
  },
  { name: "Chicken tortilla soup", meal: "dinner", style: "soup-or-stew" },
  { name: "Cheddar broccoli soup", meal: "dinner", style: "soup-or-stew" },
  { name: "Chicken wild rice soup", meal: "dinner", style: "soup-or-stew" },
  { name: "Wonton soup", meal: "dinner", style: "soup-or-stew" },
  { name: "Grilled cheese and tomato soup", meal: "dinner", style: "soup-or-stew" },

  {
    name: "White chicken chili",
    meal: "breakfast",
    style: "soup-or-stew",
    source:
      "https://www.pinterest.com/pin/487233253450153141/sent/?invite_code=4fe827f3cea649cf9c9996a6747132c8&sender=487233390844584842&sfo=1"
  },
  {
    name: "Peanut chicken lettuce wraps with ginger garlic sauce",
    meal: "breakfast",
    style: "handheld",
    source: "https://pinchofyum.com/peanut-chicken-lettuce-wraps-ginger-garlic-sauce"
  },
  { name: "Greek pitas with chicken", meal: "breakfast", style: "handheld" },
  { name: "Greek pitas with turkey meat", meal: "breakfast", style: "handheld" },

  {
    name: "Pineapple zucchini muffin",
    meal: "breakfast",
    style: "baked-casserole",
    source: "https://www.blessthismessplease.com/zucchini-pineapple-muffins/"
  },
  {
    name: "Flourless chickpea peanut butter muffins",
    meal: "breakfast",
    style: "baked-casserole",
    source: "https://www.ambitiouskitchen.com/flourless-peanut-butter-chickpea-muffins/"
  },
  {
    name: "Big daddy biscuits",
    meal: "breakfast",
    style: "baked-casserole",
    source: "https://www.allrecipes.com/recipe/7040/jps-big-daddy-biscuits/"
  },
  {
    name: "Crusty bread",
    meal: "breakfast",
    style: "baked-casserole",
    source: "https://www.recipetineats.com/easy-yeast-bread-recipe-no-knead/"
  },
  {
    name: "Spicy pesto and cheese stuffed zucchini involtin",
    meal: "breakfast",
    style: "vegetarian",
    source:
      "https://www.pinterest.com/pin/487233253440955193/sent/?invite_code=6cfdfc25e6084bb68f039422b2f63e6e&sender=487233390844584842&sfo=1"
  },
  { name: "Beef and broccoli", meal: "dinner", style: "meat" },
  { name: "Suggested - Turkey and avocado wrap", meal: "lunch", style: "handheld" },
  { name: "Suggested - Greek salad with chicken", meal: "lunch", style: "bowls" },
  { name: "Suggested - BLT sandwich", meal: "lunch", style: "handheld" },
  { name: "Suggested - Tuna salad sandwich", meal: "lunch", style: "handheld" },
  { name: "Suggested - Quesadillas", meal: "lunch", style: "handheld" },
  { name: "Suggested - Lentil soup", meal: "lunch", style: "soup-or-stew" },
  { name: "Suggested - Caprese salad with prosciutto", meal: "lunch", style: "bowls" },
  { name: "Suggested - Egg salad sandwich", meal: "lunch", style: "handheld" },
  { name: "Suggested - Asian noodle salad", meal: "lunch", style: "bowls" },
  { name: "Suggested - Black bean tacos", meal: "lunch", style: "handheld" },
  { name: "Suggested - Shrimp tacos with mango slaw", meal: "dinner", style: "handheld" },
  { name: "Suggested - Garlic butter shrimp with pasta", meal: "dinner", style: "rice-or-pasta" },
  { name: "Suggested - Baked salmon with asparagus", meal: "dinner", style: "seafood" },
  { name: "Suggested - Fish tacos with cabbage slaw", meal: "dinner", style: "handheld" },
  { name: "Suggested - Shrimp fried rice", meal: "dinner", style: "rice-or-pasta" },
  { name: "Suggested - Mediterranean baked cod", meal: "dinner", style: "seafood" },
  { name: "Suggested - Clam chowder", meal: "dinner", style: "soup-or-stew" },
  { name: "Suggested - Teriyaki salmon bowls", meal: "dinner", style: "bowls" },
  { name: "Suggested - Vegetable curry", meal: "dinner", style: "bowls" },
  { name: "Suggested - Black bean enchiladas", meal: "dinner", style: "baked-casserole" },
  { name: "Suggested - Mushroom risotto", meal: "dinner", style: "rice-or-pasta" },
  { name: "Suggested - Eggplant parmesan", meal: "dinner", style: "baked-casserole" },
  { name: "Suggested - Veggie stir fry with tofu", meal: "dinner", style: "vegetarian" },
  { name: "Suggested - Caprese pasta", meal: "dinner", style: "rice-or-pasta" },
  { name: "Suggested - Shakshuka", meal: "dinner", style: "vegetarian" },
  { name: "Suggested - Butternut squash soup", meal: "dinner", style: "soup-or-stew" },
  { name: "Suggested - Spanakopita", meal: "dinner", style: "baked-casserole" },
  { name: "Suggested - Roasted vegetable grain bowls", meal: "dinner", style: "bowls" },
  { name: "Suggested - Chicken pad thai", meal: "dinner", style: "rice-or-pasta" },
  { name: "Suggested - Korean beef bulgogi bowls", meal: "dinner", style: "bowls" },
  { name: "Suggested - Thai green curry", meal: "dinner", style: "bowls" },
  { name: "Suggested - Miso soup with tofu and vegetables", meal: "dinner", style: "soup-or-stew" },
  { name: "Suggested - Vietnamese pho", meal: "dinner", style: "soup-or-stew" },
  { name: "Suggested - Japanese chicken katsu", meal: "dinner", style: "meat" },
  { name: "Suggested - Fried rice with egg and vegetables", meal: "dinner", style: "rice-or-pasta" },
  { name: "Suggested - Dan dan noodles", meal: "dinner", style: "rice-or-pasta" },
  { name: "Suggested - Chicken tikka masala", meal: "dinner", style: "bowls" },
  { name: "Suggested - Saag paneer", meal: "dinner", style: "vegetarian" },
  { name: "Suggested - Butter chicken", meal: "dinner", style: "meat" },
  { name: "Suggested - Dal tadka", meal: "dinner", style: "soup-or-stew" },
  { name: "Suggested - Aloo gobi", meal: "dinner", style: "vegetarian" },
  { name: "Suggested - Lamb kofta with tzatziki", meal: "dinner", style: "meat" },
  { name: "Suggested - Sheet pan chicken thighs and vegetables", meal: "dinner", style: "meat" },
  { name: "Suggested - One-pot chicken and rice", meal: "dinner", style: "rice-or-pasta" },
  { name: "Suggested - Sausage and peppers", meal: "dinner", style: "handheld" },
  { name: "Suggested - Caprese stuffed chicken", meal: "dinner", style: "meat" },
  { name: "Suggested - Black bean soup", meal: "dinner", style: "soup-or-stew" },
  { name: "Suggested - Avocado toast with egg", meal: "breakfast", style: "vegetarian" },
  { name: "Suggested - Banana oat pancakes", meal: "breakfast", style: "baked-casserole" },
  { name: "Suggested - Breakfast burritos", meal: "breakfast", style: "handheld" },
  { name: "Suggested - Greek yogurt parfait", meal: "breakfast", style: "bowls" },
  { name: "MealDB - Algerian Kefta (Meatballs)", meal: "dinner", style: "meat" },
  { name: "MealDB - Arepa Pabellón", meal: "dinner", style: "meat" },
  { name: "MealDB - Arepa pelua", meal: "dinner", style: "meat" },
  { name: "MealDB - Asado", meal: "dinner", style: "meat" },
  { name: "MealDB - Aussie Burgers", meal: "dinner", style: "meat" },
  { name: "MealDB - Beef and Broccoli Stir-Fry", meal: "dinner", style: "meat" },
  { name: "MealDB - Beef and Mustard Pie", meal: "dinner", style: "meat" },
  { name: "MealDB - Beef and Oyster pie", meal: "dinner", style: "meat" },
  { name: "MealDB - Beef Asado", meal: "dinner", style: "meat" },
  { name: "MealDB - Beef Banh Mi Bowls with Sriracha Mayo, Carrot & Pickled Cucumber", meal: "dinner", style: "meat" },
  { name: "MealDB - Beef Bourguignon", meal: "dinner", style: "meat" },
  { name: "MealDB - Beef Brisket Pot Roast", meal: "dinner", style: "meat" },
  { name: "MealDB - Beef Caldereta", meal: "dinner", style: "meat" },
  { name: "MealDB - Beef Dumpling Stew", meal: "dinner", style: "meat" },
  { name: "MealDB - Beef Empanadas", meal: "dinner", style: "meat" },
  { name: "MealDB - Beef Lo Mein", meal: "dinner", style: "meat" },
  { name: "MealDB - Beef Mandi", meal: "dinner", style: "meat" },
  { name: "MealDB - Beef Mechado", meal: "dinner", style: "meat" },
  { name: "MealDB - Beef pho", meal: "dinner", style: "meat" },
  { name: "MealDB - Beef Rendang", meal: "dinner", style: "meat" },
  { name: "MealDB - Beef stroganoff", meal: "dinner", style: "meat" },
  { name: "MealDB - Beef Sunday Roast", meal: "dinner", style: "meat" },
  { name: "MealDB - Beef Wellington", meal: "dinner", style: "meat" },
  { name: "MealDB - Big Mac", meal: "dinner", style: "meat" },
  { name: "MealDB - Bigos (Polish hunter's stew)", meal: "dinner", style: "meat" },
  { name: "MealDB - Bistek", meal: "dinner", style: "meat" },
  { name: "MealDB - Bitterballen (Dutch meatballs)", meal: "dinner", style: "meat" },
  { name: "MealDB - Borsch", meal: "dinner", style: "meat" },
  { name: "MealDB - Braised Beef Chilli", meal: "dinner", style: "meat" },
  { name: "MealDB - Brun Lapskaus (Norwegian Beef Vegetable Stew)", meal: "dinner", style: "meat" },
  { name: "MealDB - Carbonada Criolla", meal: "dinner", style: "meat" },
  { name: "MealDB - Cevapi Sausages", meal: "dinner", style: "meat" },
  { name: "MealDB - Chivito sandwich", meal: "dinner", style: "meat" },
  { name: "MealDB - Chivito uruguayo", meal: "dinner", style: "meat" },
  { name: "MealDB - Classic Tourtière", meal: "dinner", style: "meat" },
  { name: "MealDB - Corned Beef and Cabbage", meal: "dinner", style: "meat" },
  { name: "MealDB - Corned Beef and Cabbage – Jamaican Style", meal: "dinner", style: "meat" },
  { name: "MealDB - Corned Beef Hash", meal: "dinner", style: "meat" },
  { name: "MealDB - Croatian Bean Stew", meal: "dinner", style: "meat" },
  { name: "MealDB - Croatian lamb peka", meal: "dinner", style: "meat" },
  { name: "MealDB - Cumberland Pie", meal: "dinner", style: "meat" },
  { name: "MealDB - Drunken noodles (pad kee mao)", meal: "dinner", style: "meat" },
  { name: "MealDB - Egyptian Fatteh", meal: "dinner", style: "meat" },
  { name: "MealDB - Empanadas", meal: "dinner", style: "meat" },
  { name: "MealDB - Golabki (cabbage roll)", meal: "dinner", style: "meat" },
  { name: "MealDB - Irish stew", meal: "dinner", style: "meat" },
  { name: "MealDB - Jamaican Beef Patties", meal: "dinner", style: "meat" },
  { name: "MealDB - Jiggs Dinner", meal: "dinner", style: "meat" },
  { name: "MealDB - Karbonader (Lean Beef Patties) with Caramelized Onions", meal: "dinner", style: "meat" },
  { name: "MealDB - Kenyan Beef Curry", meal: "dinner", style: "meat" },
  { name: "MealDB - Lemongrass beef stew with noodles", meal: "dinner", style: "meat" },
  { name: "MealDB - Ma Po Tofu", meal: "dinner", style: "meat" },
  { name: "MealDB - Massaman Beef curry", meal: "dinner", style: "meat" },
  { name: "MealDB - Matambre a la Pizza", meal: "dinner", style: "meat" },
  { name: "MealDB - Milanesa", meal: "dinner", style: "meat" },
  { name: "MealDB - Minced Beef Pie", meal: "dinner", style: "meat" },
  { name: "MealDB - Mini chilli beef pies", meal: "dinner", style: "meat" },
  { name: "MealDB - Montreal Smoked Meat", meal: "dinner", style: "meat" },
  { name: "MealDB - Moussaka", meal: "dinner", style: "meat" },
  { name: "MealDB - Mulukhiyah", meal: "dinner", style: "meat" },
  { name: "MealDB - Oxtail with broad beans", meal: "dinner", style: "meat" },
  { name: "MealDB - Paszteciki (Polish Pasties)", meal: "dinner", style: "meat" },
  { name: "MealDB - Pate Chinois", meal: "dinner", style: "meat" },
  { name: "MealDB - Portuguese prego with green piri-piri", meal: "dinner", style: "meat" },
  { name: "MealDB - Red Peas Soup", meal: "dinner", style: "meat" },
  { name: "MealDB - Roti john", meal: "dinner", style: "meat" },
  { name: "MealDB - Shawarma chuck roast wrap", meal: "dinner", style: "meat" },
  { name: "MealDB - Soy-Glazed Meatloaves with Wasabi Mashed Potatoes & Roasted Carrots", meal: "dinner", style: "meat" },
  { name: "MealDB - Spaghetti Bolognese", meal: "dinner", style: "meat" },
  { name: "MealDB - Steak & Vietnamese noodle salad", meal: "dinner", style: "meat" },
  { name: "MealDB - Steak and Kidney Pie", meal: "dinner", style: "meat" },
  { name: "MealDB - Steak Diane", meal: "dinner", style: "meat" },
  { name: "MealDB - Szechuan Beef", meal: "dinner", style: "meat" },
  { name: "MealDB - Thai beef stir-fry", meal: "dinner", style: "meat" },
  { name: "MealDB - Traditional Croatian Goulash", meal: "dinner", style: "meat" },
  { name: "MealDB - Turkish lahmacun", meal: "dinner", style: "meat" },
  { name: "MealDB - Vegetable Shepherds Pie", meal: "dinner", style: "meat" },
  { name: "MealDB - Venezuelan Sancocho", meal: "dinner", style: "meat" },
  { name: "MealDB - Venezuelan Shredded Beef", meal: "dinner", style: "meat" },
  { name: "MealDB - 15-minute chicken & halloumi burgers", meal: "dinner", style: "meat" },
  { name: "MealDB - Ayam Percik", meal: "dinner", style: "meat" },
  { name: "MealDB - Brown Stew Chicken", meal: "dinner", style: "meat" },
  { name: "MealDB - Chick-Fil-A Sandwich", meal: "dinner", style: "meat" },
  { name: "MealDB - Chicken & chorizo rice pot", meal: "dinner", style: "meat" },
  { name: "MealDB - Chicken & mushroom Hotpot", meal: "dinner", style: "meat" },
  { name: "MealDB - Chicken Alfredo Primavera", meal: "dinner", style: "meat" },
  { name: "MealDB - Chicken Basquaise", meal: "dinner", style: "meat" },
  { name: "MealDB - Chicken Congee", meal: "dinner", style: "meat" },
  { name: "MealDB - Chicken Couscous", meal: "dinner", style: "meat" },
  { name: "MealDB - Chicken Enchilada Casserole", meal: "dinner", style: "meat" },
  { name: "MealDB - Chicken Fajita Mac and Cheese", meal: "dinner", style: "meat" },
  { name: "MealDB - Chicken Fried Rice", meal: "dinner", style: "meat" },
  { name: "MealDB - Chicken Ham and Leek Pie", meal: "dinner", style: "meat" },
  { name: "MealDB - Chicken Handi", meal: "dinner", style: "meat" },
  { name: "MealDB - Chicken Karaage", meal: "dinner", style: "meat" },
  { name: "MealDB - Chicken Mandi", meal: "dinner", style: "meat" },
  { name: "MealDB - Chicken Marengo", meal: "dinner", style: "meat" },
  { name: "MealDB - Chicken Parmentier", meal: "dinner", style: "meat" },
  { name: "MealDB - Chicken Quinoa Greek Salad", meal: "dinner", style: "meat" },
  { name: "MealDB - Chicken Shawarma with homemade garlic herb yoghurt sauce", meal: "dinner", style: "meat" },
  { name: "MealDB - Chicken wings with cumin, lemon & garlic", meal: "dinner", style: "meat" },
  { name: "MealDB - Chicken with saffron, raisins & pine nuts", meal: "dinner", style: "meat" },
  { name: "MealDB - Chinese Orange Chicken", meal: "dinner", style: "meat" },
  { name: "MealDB - Coq au vin", meal: "dinner", style: "meat" },
  { name: "MealDB - Crock Pot Chicken Baked Tacos", meal: "dinner", style: "meat" },
  { name: "MealDB - Easy Spanish chicken", meal: "dinner", style: "meat" },
  { name: "MealDB - French Onion Chicken with Roasted Carrots & Mashed Potatoes", meal: "dinner", style: "meat" },
  { name: "MealDB - General Tsos Chicken", meal: "dinner", style: "meat" },
  { name: "MealDB - Honey Balsamic Chicken with Crispy Broccoli & Potatoes", meal: "dinner", style: "meat" },
  { name: "MealDB - Jamaican Curry Chicken Recipe", meal: "dinner", style: "meat" },
  { name: "MealDB - Jerk chicken with rice & peas", meal: "dinner", style: "meat" },
  { name: "MealDB - kabse", meal: "dinner", style: "meat" },
  { name: "MealDB - Katsu Chicken curry", meal: "dinner", style: "meat" },
  { name: "MealDB - Kentucky Fried Chicken", meal: "dinner", style: "meat" },
  { name: "MealDB - Kung Pao Chicken", meal: "dinner", style: "meat" },
  { name: "MealDB - Nutty Chicken Curry", meal: "dinner", style: "meat" },
  { name: "MealDB - Pad See Ew", meal: "dinner", style: "meat" },
  { name: "MealDB - Panang chicken curry (kaeng panang gai)", meal: "dinner", style: "meat" },
  { name: "MealDB - Piri-piri chicken and slaw", meal: "dinner", style: "meat" },
  { name: "MealDB - Pollo en pepitoria", meal: "dinner", style: "meat" },
  { name: "MealDB - Potato Gratin with Chicken", meal: "dinner", style: "meat" },
  { name: "MealDB - Poulet Roti a l'Algerienne (Algerian Roast Chicken)", meal: "dinner", style: "meat" },
  { name: "MealDB - Rappie Pie", meal: "dinner", style: "meat" },
  { name: "MealDB - Red curry chicken kebabs", meal: "dinner", style: "meat" },
  { name: "MealDB - Roasted chicken with creamy walnut sauce", meal: "dinner", style: "meat" },
  { name: "MealDB - Rosol (Polish Chicken Soup)", meal: "dinner", style: "meat" },
  { name: "MealDB - Shawarma", meal: "dinner", style: "meat" },
  { name: "MealDB - Smoky chicken skewers", meal: "dinner", style: "meat" },
  { name: "MealDB - Spanish beans with chicken & chorizo", meal: "dinner", style: "meat" },
  { name: "MealDB - Spanish Chicken", meal: "dinner", style: "meat" },
  { name: "MealDB - Spanish chicken pie", meal: "dinner", style: "meat" },
  { name: "MealDB - Spiced smoky barbecued chicken", meal: "dinner", style: "meat" },
  { name: "MealDB - Sticky Chicken", meal: "dinner", style: "meat" },
  { name: "MealDB - Stir-fried chicken with chillies & basil", meal: "dinner", style: "meat" },
  { name: "MealDB - Sweet and Sour Chicken", meal: "dinner", style: "meat" },
  { name: "MealDB - Tajine de Poulet aux Carottes et Patates Douces (Chicken and Sweet Potato Tagine)", meal: "dinner", style: "meat" },
  { name: "MealDB - Tandoori chicken", meal: "dinner", style: "meat" },
  { name: "MealDB - Teriyaki Chicken Casserole", meal: "dinner", style: "meat" },
  { name: "MealDB - Thai chicken cakes with sweet chilli sauce", meal: "dinner", style: "meat" },
  { name: "MealDB - Thai drumsticks", meal: "dinner", style: "meat" },
  { name: "MealDB - Thai green chicken soup", meal: "dinner", style: "meat" },
  { name: "MealDB - Thai Green Curry", meal: "dinner", style: "meat" },
  { name: "MealDB - Tom kha gai", meal: "dinner", style: "meat" },
  { name: "MealDB - Venezuelan Coconut Chicken", meal: "dinner", style: "meat" },
  { name: "MealDB - Vietnamese chicken salad", meal: "dinner", style: "meat" },
  { name: "MealDB - Æbleskiver", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Alfajores", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Anzac biscuits", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Apam balik", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Apple & Blackberry Crumble", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Apple cake", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Apple Frangipan Tart", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Apricot & Turkish delight mess", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Authentic Norwegian Kransekake", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Bakewell tart", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Baklava with spiced nuts, ricotta & chocolate", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Banana Pancakes", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Battenberg Cake", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - BeaverTails", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Beetroot pancakes", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Blackberry Fool", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Blueberry & lemon friands", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Bread and Butter Pudding", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Budino Di Ricotta", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Canadian Butter Tarts", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Caribbean Tamarind balls", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Carrot Cake", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Cashew Ghoriba Biscuits", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Chelsea Buns", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Chinon Apple Tarts", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Choc Chip Pecan Pie", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Chocolate alfajores", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Chocolate Avocado Mousse", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Chocolate Caramel Crispy", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Chocolate churros with chocolate & salted caramel sauce", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Chocolate Coconut Squares", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Chocolate empanadas", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Chocolate Gateau", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Chocolate Raspberry Brownies", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Chocolate Souffle", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Christmas cake", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Christmas Pudding Flapjack", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Christmas Pudding Trifle", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Churros", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Cinnamon buns", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Classic Christmas pudding", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Cornes de Gazelle (Gazelle Horns)", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Crema Catalana", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Date squares", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Dulce de Leche", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Dundee cake", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Dutch stroopwafel", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Dziriat (Algerian Almond Tarts)", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Eccles Cakes", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Ensaimada", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Eton Mess", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Figgy Duff", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Flan", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Flapper Pie", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Fyrstekake – Norwegian Prince Cake", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Gevulde speculaas", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Grape Nut Ice Cream", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Honey Yogurt Cheesecake", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Hot Chocolate Fudge", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Jam jam cookies", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Jam Roly-Poly", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Jamaican Banana Fritters", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Jamaican Spice Bun Recipe", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Jamaican Sweet Potato Pudding", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Key Lime Pie", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Knafeh", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Krispy Kreme Donut", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Kvæfjord Cake “Verdens Beste” (World’s Best Cake)", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Lamingtons", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Madeira Cake", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Mamoul (Eid biscuits)", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Mazariner – Scandinavian Almond Tartlets", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Mince Pies", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Mini bundt cakes", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Nanaimo Bars", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - New York cheesecake", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - No-Churn Rum Raisin Ice Cream", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Norwegian Krumkake", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Pancakes", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Parkin Cake", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Passion fruit mousse", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Peach & Blueberry Grunt", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Peanut Butter Cheesecake", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Peanut Butter Cookies", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Pear Tarte Tatin", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Piernik (Polish gingerbread)", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Pistachio cake", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Pistachio Kunafa Chocolate Cake and Cupcakes", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Polish chocolate & walnut cake", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Polish doughnuts (Pączki)", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Polskie Nalesniki (Polish Pancakes)", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Portuguese custard tarts", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Postre Chajá", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Pouding chomeur", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Pumpkin Pie", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Raspberry mousse", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Rock Cakes", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Rocky Road Fudge", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Rogaliki (Polish Croissant Cookies)", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Salted Caramel Cheescake", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Saskatoon Pie", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Seri muka kuih", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Spanish fig & almond balls", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Spotted Dick", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Sticky Toffee Pudding", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Sticky Toffee Pudding Ultimate", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Strawberries Romanoff", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Strawberry Rhubarb Pie", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Sugar Pie", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Suksessterte (Norwegian almond “success cake”)", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Šúĺlance s Makom", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Summer Pudding", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Tall Skoleboller", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Tarte Tatin", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Timbits", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Treacle Tart", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Tunisian Orange Cake", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Vanilla alfajores", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Walnut Roll Gužvara", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Walnut, date & honey cake", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - White chocolate creme brulee", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Adana kebab", meal: "dinner", style: "meat" },
  { name: "MealDB - Chilli ginger lamb chops", meal: "dinner", style: "meat" },
  { name: "MealDB - Chorba Hamra bel Frik (Algerian Lamb, Tomato, and Freekeh Soup)", meal: "dinner", style: "meat" },
  { name: "MealDB - Fårikål (Norwegian National Dish)", meal: "dinner", style: "meat" },
  { name: "MealDB - Hot cumin lamb wrap with crunchy slaw & spicy mayo", meal: "dinner", style: "meat" },
  { name: "MealDB - Imam bayildi with BBQ lamb & tzatziki", meal: "dinner", style: "meat" },
  { name: "MealDB - Kapsalon", meal: "dinner", style: "meat" },
  { name: "MealDB - Keleya Zaara", meal: "dinner", style: "meat" },
  { name: "MealDB - kofta burgers", meal: "dinner", style: "meat" },
  { name: "MealDB - Lamb & apricot meatballs", meal: "dinner", style: "meat" },
  { name: "MealDB - Lamb and Lemon Souvlaki", meal: "dinner", style: "meat" },
  { name: "MealDB - Lamb and Potato pie", meal: "dinner", style: "meat" },
  { name: "MealDB - Lamb Biryani", meal: "dinner", style: "meat" },
  { name: "MealDB - Lamb Pilaf (Plov)", meal: "dinner", style: "meat" },
  { name: "MealDB - Lamb Rogan josh", meal: "dinner", style: "meat" },
  { name: "MealDB - Lamb Tagine", meal: "dinner", style: "meat" },
  { name: "MealDB - Lamb tomato and sweet spices", meal: "dinner", style: "meat" },
  { name: "MealDB - Lamb Tzatziki Burgers", meal: "dinner", style: "meat" },
  { name: "MealDB - Lancashire hotpot", meal: "dinner", style: "meat" },
  { name: "MealDB - McSinghs Scotch pie", meal: "dinner", style: "meat" },
  { name: "MealDB - Rigatoni with fennel sausage sauce", meal: "dinner", style: "meat" },
  { name: "MealDB - Slow-roast lamb with cinnamon, fennel & citrus", meal: "dinner", style: "meat" },
  { name: "MealDB - Spanish-style slow-cooked lamb shoulder & beans", meal: "dinner", style: "meat" },
  { name: "MealDB - Stuffed Lamb Tomatoes", meal: "dinner", style: "meat" },
  { name: "MealDB - Tunisian Lamb Soup", meal: "dinner", style: "meat" },
  { name: "MealDB - Turkish lamb pilau", meal: "dinner", style: "meat" },
  { name: "MealDB - Turkish-style lamb", meal: "dinner", style: "meat" },
  { name: "MealDB - Vietnamese lamb shanks with sweet potatoes", meal: "dinner", style: "meat" },
  { name: "MealDB - Bean & Sausage Hotpot", meal: "dinner", style: "bowls" },
  { name: "MealDB - Callaloo Jamaican Style", meal: "dinner", style: "bowls" },
  { name: "MealDB - Chakchouka", meal: "dinner", style: "bowls" },
  { name: "MealDB - Duck Confit", meal: "dinner", style: "bowls" },
  { name: "MealDB - French Lentils With Garlic and Thyme", meal: "dinner", style: "bowls" },
  { name: "MealDB - French Omelette", meal: "dinner", style: "bowls" },
  { name: "MealDB - Locro", meal: "dinner", style: "bowls" },
  { name: "MealDB - Migas", meal: "dinner", style: "bowls" },
  { name: "MealDB - Mutabbaq", meal: "dinner", style: "bowls" },
  { name: "MealDB - Osso Buco alla Milanese", meal: "dinner", style: "bowls" },
  { name: "MealDB - Pizza Express Margherita", meal: "dinner", style: "bowls" },
  { name: "MealDB - Poutine", meal: "dinner", style: "bowls" },
  { name: "MealDB - Purple sprouting broccoli tempura with nuoc cham", meal: "dinner", style: "bowls" },
  { name: "MealDB - Ramen Noodles with Boiled Egg", meal: "dinner", style: "bowls" },
  { name: "MealDB - Shakshouka", meal: "dinner", style: "bowls" },
  { name: "MealDB - Shakshuka Feta Cheese", meal: "dinner", style: "bowls" },
  { name: "MealDB - Spanish meatballs with clams, chorizo & squid", meal: "dinner", style: "bowls" },
  { name: "MealDB - Syrian Bread", meal: "dinner", style: "bowls" },
  { name: "MealDB - Syrian Rice with Meat", meal: "dinner", style: "bowls" },
  { name: "MealDB - Three-cheese souffles", meal: "dinner", style: "bowls" },
  { name: "MealDB - Turkey Bánh mì", meal: "dinner", style: "bowls" },
  { name: "MealDB - Turkey Meatloaf", meal: "dinner", style: "bowls" },
  { name: "MealDB - Turkish rice (vermicelli rice)", meal: "dinner", style: "bowls" },
  { name: "MealDB - Yorkshire Puddings", meal: "dinner", style: "bowls" },
  { name: "MealDB - Chilli prawn linguine", meal: "dinner", style: "rice-or-pasta" },
  { name: "MealDB - Fettuccine Alfredo", meal: "dinner", style: "rice-or-pasta" },
  { name: "MealDB - Fettucine alfredo", meal: "dinner", style: "rice-or-pasta" },
  { name: "MealDB - Grilled Mac and Cheese Sandwich", meal: "dinner", style: "rice-or-pasta" },
  { name: "MealDB - Lasagna Sandwiches", meal: "dinner", style: "rice-or-pasta" },
  { name: "MealDB - Lasagne", meal: "dinner", style: "rice-or-pasta" },
  { name: "MealDB - Pilchard puttanesca", meal: "dinner", style: "rice-or-pasta" },
  { name: "MealDB - Spaghetti alla Carbonara", meal: "dinner", style: "rice-or-pasta" },
  { name: "MealDB - Syrian Spaghetti", meal: "dinner", style: "rice-or-pasta" },
  { name: "MealDB - Venetian Duck Ragu", meal: "dinner", style: "rice-or-pasta" },
  { name: "MealDB - Bubble & Squeak", meal: "dinner", style: "meat" },
  { name: "MealDB - Arroz al horno (baked rice)", meal: "dinner", style: "meat" },
  { name: "MealDB - Barbecue pork buns", meal: "dinner", style: "meat" },
  { name: "MealDB - BBQ Pork Sloppy Joes", meal: "dinner", style: "meat" },
  { name: "MealDB - Bigos (Hunters Stew)", meal: "dinner", style: "meat" },
  { name: "MealDB - Boxty Breakfast", meal: "dinner", style: "meat" },
  { name: "MealDB - Bryndzové Halušky", meal: "dinner", style: "meat" },
  { name: "MealDB - Cassava pizza", meal: "dinner", style: "meat" },
  { name: "MealDB - Chickpea, chorizo & spinach stew", meal: "dinner", style: "meat" },
  { name: "MealDB - Choripán", meal: "dinner", style: "meat" },
  { name: "MealDB - Chorizo & chickpea soup", meal: "dinner", style: "meat" },
  { name: "MealDB - Chorizo & soft-boiled egg salad", meal: "dinner", style: "meat" },
  { name: "MealDB - Chorizo & tomato salad", meal: "dinner", style: "meat" },
  { name: "MealDB - Chorizo, potato & cheese omelette", meal: "dinner", style: "meat" },
  { name: "MealDB - Coddled pork with cider", meal: "dinner", style: "meat" },
  { name: "MealDB - Crispy Sausages and Greens", meal: "dinner", style: "meat" },
  { name: "MealDB - Fašírky", meal: "dinner", style: "meat" },
  { name: "MealDB - Ham croquetas", meal: "dinner", style: "meat" },
  { name: "MealDB - Ham hock colcannon", meal: "dinner", style: "meat" },
  { name: "MealDB - Hot and Sour Soup", meal: "dinner", style: "meat" },
  { name: "MealDB - Jamon & wild garlic croquetas", meal: "dinner", style: "meat" },
  { name: "MealDB - Japanese Katsudon", meal: "dinner", style: "meat" },
  { name: "MealDB - Pork & sauerkraut goulash", meal: "dinner", style: "meat" },
  { name: "MealDB - Pork Cassoulet", meal: "dinner", style: "meat" },
  { name: "MealDB - Pork rib bortsch", meal: "dinner", style: "meat" },
  { name: "MealDB - Portuguese barbecued pork (Febras assadas)", meal: "dinner", style: "meat" },
  { name: "MealDB - Raspeballer (Norwegian Potato Dumplings)", meal: "dinner", style: "meat" },
  { name: "MealDB - Rice paper dumplings", meal: "dinner", style: "meat" },
  { name: "MealDB - Rosemary braised red cabbage with kabanos", meal: "dinner", style: "meat" },
  { name: "MealDB - Skillet Apple Pork Chops with Roasted Sweet Potatoes & Zucchini", meal: "dinner", style: "meat" },
  { name: "MealDB - Slow-roasted ham with lemon, garlic & sage", meal: "dinner", style: "meat" },
  { name: "MealDB - Spaghetti with Spanish flavours", meal: "dinner", style: "meat" },
  { name: "MealDB - Spanish tomato bread with jamón Serrano", meal: "dinner", style: "meat" },
  { name: "MealDB - Stamppot", meal: "dinner", style: "meat" },
  { name: "MealDB - Sweet and Sour Pork", meal: "dinner", style: "meat" },
  { name: "MealDB - Thai pork & peanut curry", meal: "dinner", style: "meat" },
  { name: "MealDB - Toad In The Hole", meal: "dinner", style: "meat" },
  { name: "MealDB - Tonkatsu pork", meal: "dinner", style: "meat" },
  { name: "MealDB - Torta de fiambre", meal: "dinner", style: "meat" },
  { name: "MealDB - Tourtiere", meal: "dinner", style: "meat" },
  { name: "MealDB - Vietnamese Grilled Pork (bun-thit-nuong)", meal: "dinner", style: "meat" },
  { name: "MealDB - Vietnamese pork salad", meal: "dinner", style: "meat" },
  { name: "MealDB - Vietnamese-style caramel pork", meal: "dinner", style: "meat" },
  { name: "MealDB - Warm roast asparagus salad", meal: "dinner", style: "meat" },
  { name: "MealDB - Wontons", meal: "dinner", style: "meat" },
  { name: "MealDB - Zapiekanki", meal: "dinner", style: "meat" },
  { name: "MealDB - Arroz con gambas y calamar", meal: "dinner", style: "seafood" },
  { name: "MealDB - Baked salmon with fennel & tomatoes", meal: "dinner", style: "seafood" },
  { name: "MealDB - Bang bang prawn salad", meal: "dinner", style: "seafood" },
  { name: "MealDB - Barramundi with Moroccan spices", meal: "dinner", style: "seafood" },
  { name: "MealDB - Cajun spiced fish tacos", meal: "dinner", style: "seafood" },
  { name: "MealDB - Clam, chorizo & white bean stew", meal: "dinner", style: "seafood" },
  { name: "MealDB - Egg Foo Young", meal: "dinner", style: "seafood" },
  { name: "MealDB - Escovitch Fish", meal: "dinner", style: "seafood" },
  { name: "MealDB - Fish fofos", meal: "dinner", style: "seafood" },
  { name: "MealDB - Fish pie", meal: "dinner", style: "seafood" },
  { name: "MealDB - Fish Soup (Ukha)", meal: "dinner", style: "seafood" },
  { name: "MealDB - Fish Stew with Rouille", meal: "dinner", style: "seafood" },
  { name: "MealDB - Fiskesuppe (Creamy Norwegian Fish Soup)", meal: "dinner", style: "seafood" },
  { name: "MealDB - Fried calamari", meal: "dinner", style: "seafood" },
  { name: "MealDB - Gambas al ajillo", meal: "dinner", style: "seafood" },
  { name: "MealDB - Garides Saganaki", meal: "dinner", style: "seafood" },
  { name: "MealDB - Garlicky prawns with sherry", meal: "dinner", style: "seafood" },
  { name: "MealDB - Grilled Portuguese sardines", meal: "dinner", style: "seafood" },
  { name: "MealDB - Honey Teriyaki Salmon", meal: "dinner", style: "seafood" },
  { name: "MealDB - Jamaican Curry Shrimp Recipe", meal: "dinner", style: "seafood" },
  { name: "MealDB - Jamaican Pepper Shrimp", meal: "dinner", style: "seafood" },
  { name: "MealDB - Kedgeree", meal: "dinner", style: "seafood" },
  { name: "MealDB - Kung Po Prawns", meal: "dinner", style: "seafood" },
  { name: "MealDB - Laksa King Prawn Noodles", meal: "dinner", style: "seafood" },
  { name: "MealDB - Mediterranean Pasta Salad", meal: "dinner", style: "seafood" },
  { name: "MealDB - Mee goreng mamak", meal: "dinner", style: "seafood" },
  { name: "MealDB - Napa Cabbage with Dried Shrimp", meal: "dinner", style: "seafood" },
  { name: "MealDB - Nasi lemak", meal: "dinner", style: "seafood" },
  { name: "MealDB - Noodle bowl salad", meal: "dinner", style: "seafood" },
  { name: "MealDB - Pad Thai", meal: "dinner", style: "seafood" },
  { name: "MealDB - Paella", meal: "dinner", style: "seafood" },
  { name: "MealDB - Pan-fried hake, white bean & chorizo broth", meal: "dinner", style: "seafood" },
  { name: "MealDB - Portuguese fish stew (Caldeirada de peixe)", meal: "dinner", style: "seafood" },
  { name: "MealDB - Prawn & noodle salad with crispy shallots", meal: "dinner", style: "seafood" },
  { name: "MealDB - Prawn stir-fry", meal: "dinner", style: "seafood" },
  { name: "MealDB - Prawns with Romesco sauce", meal: "dinner", style: "seafood" },
  { name: "MealDB - Quick salt & pepper squid", meal: "dinner", style: "seafood" },
  { name: "MealDB - Recheado Masala Fish", meal: "dinner", style: "seafood" },
  { name: "MealDB - Salmon Avocado Salad", meal: "dinner", style: "seafood" },
  { name: "MealDB - Salmon noodle soup", meal: "dinner", style: "seafood" },
  { name: "MealDB - Salmon noodle wraps", meal: "dinner", style: "seafood" },
  { name: "MealDB - Salmon Prawn Risotto", meal: "dinner", style: "seafood" },
  { name: "MealDB - Salt & pepper squid", meal: "dinner", style: "seafood" },
  { name: "MealDB - Salt cod tortilla", meal: "dinner", style: "seafood" },
  { name: "MealDB - Saltfish and Ackee", meal: "dinner", style: "seafood" },
  { name: "MealDB - Sea bass with sizzled ginger, chilli & spring onions", meal: "dinner", style: "seafood" },
  { name: "MealDB - Seafood fideuà", meal: "dinner", style: "seafood" },
  { name: "MealDB - Seafood rice", meal: "dinner", style: "seafood" },
  { name: "MealDB - Shrimp Chow Fun", meal: "dinner", style: "seafood" },
  { name: "MealDB - Shrimp With Snow Peas", meal: "dinner", style: "seafood" },
  { name: "MealDB - Singapore Noodles with Shrimp", meal: "dinner", style: "seafood" },
  { name: "MealDB - Sledz w Oleju (Polish Herrings)", meal: "dinner", style: "seafood" },
  { name: "MealDB - Spanish rice & prawn one-pot", meal: "dinner", style: "seafood" },
  { name: "MealDB - Spanish seafood rice", meal: "dinner", style: "seafood" },
  { name: "MealDB - Spicy Thai prawn noodles", meal: "dinner", style: "seafood" },
  { name: "MealDB - Spring onion and prawn empanadas", meal: "dinner", style: "seafood" },
  { name: "MealDB - Squid, chickpea & chorizo salad", meal: "dinner", style: "seafood" },
  { name: "MealDB - Sushi", meal: "dinner", style: "seafood" },
  { name: "MealDB - Thai curry noodle soup", meal: "dinner", style: "seafood" },
  { name: "MealDB - Thai fried rice with prawns & peas", meal: "dinner", style: "seafood" },
  { name: "MealDB - Thai prawn curry", meal: "dinner", style: "seafood" },
  { name: "MealDB - Thai-style fish broth with greens", meal: "dinner", style: "seafood" },
  { name: "MealDB - Thai-style steamed fish", meal: "dinner", style: "seafood" },
  { name: "MealDB - Three Fish Pie", meal: "dinner", style: "seafood" },
  { name: "MealDB - Tom yum (hot & sour) soup with prawns", meal: "dinner", style: "seafood" },
  { name: "MealDB - Tom yum soup with prawns", meal: "dinner", style: "seafood" },
  { name: "MealDB - Tuna and Egg Briks", meal: "dinner", style: "seafood" },
  { name: "MealDB - Tuna Nicoise", meal: "dinner", style: "seafood" },
  { name: "MealDB - Vietnamese caramel trout", meal: "dinner", style: "seafood" },
  { name: "MealDB - Vietnamese prawn spiralized rolls", meal: "dinner", style: "seafood" },
  { name: "MealDB - Air Fryer Egg Rolls", meal: "dinner", style: "bowls" },
  { name: "MealDB - Algerian Bouzgene Berber Bread with Roasted Pepper Sauce", meal: "dinner", style: "bowls" },
  { name: "MealDB - Algerian Carrots", meal: "dinner", style: "bowls" },
  { name: "MealDB - Baba Ghanoush", meal: "dinner", style: "bowls" },
  { name: "MealDB - Blini Pancakes", meal: "dinner", style: "bowls" },
  { name: "MealDB - Boulangère Potatoes", meal: "dinner", style: "bowls" },
  { name: "MealDB - Brie wrapped in prosciutto & brioche", meal: "dinner", style: "bowls" },
  { name: "MealDB - Burek", meal: "dinner", style: "bowls" },
  { name: "MealDB - Cacik", meal: "dinner", style: "bowls" },
  { name: "MealDB - Callaloo and SaltFish", meal: "dinner", style: "bowls" },
  { name: "MealDB - Challah", meal: "dinner", style: "bowls" },
  { name: "MealDB - Cheese Borek", meal: "dinner", style: "bowls" },
  { name: "MealDB - Corba", meal: "dinner", style: "bowls" },
  { name: "MealDB - Fainá", meal: "dinner", style: "bowls" },
  { name: "MealDB - Fennel Dauphinoise", meal: "dinner", style: "bowls" },
  { name: "MealDB - Feteer Meshaltet", meal: "dinner", style: "bowls" },
  { name: "MealDB - French Onion Soup", meal: "dinner", style: "bowls" },
  { name: "MealDB - Fresh sardines", meal: "dinner", style: "bowls" },
  { name: "MealDB - Griddled flatbreads", meal: "dinner", style: "bowls" },
  { name: "MealDB - Hummus", meal: "dinner", style: "bowls" },
  { name: "MealDB - Jamaican Boiled Dumplings", meal: "dinner", style: "bowls" },
  { name: "MealDB - Jamaican Festival (Sweet Dumpling)", meal: "dinner", style: "bowls" },
  { name: "MealDB - Jamaican Fried Dumplings", meal: "dinner", style: "bowls" },
  { name: "MealDB - Jamaican Steamed Cabbage", meal: "dinner", style: "bowls" },
  { name: "MealDB - Japanese gohan rice", meal: "dinner", style: "bowls" },
  { name: "MealDB - Khobz el Dar (Algerian Semolina Bread)", meal: "dinner", style: "bowls" },
  { name: "MealDB - Kumpir", meal: "dinner", style: "bowls" },
  { name: "MealDB - Mushroom soup with buckwheat", meal: "dinner", style: "bowls" },
  { name: "MealDB - Mustard champ", meal: "dinner", style: "bowls" },
  { name: "MealDB - Norwegian Potato Lefse", meal: "dinner", style: "bowls" },
  { name: "MealDB - Pierogi (Polish Dumplings)", meal: "dinner", style: "bowls" },
  { name: "MealDB - Polish patties (kotlety)", meal: "dinner", style: "bowls" },
  { name: "MealDB - Prawn & Fennel Bisque", meal: "dinner", style: "bowls" },
  { name: "MealDB - Rye bread", meal: "dinner", style: "bowls" },
  { name: "MealDB - Sesame Cucumber Salad", meal: "dinner", style: "bowls" },
  { name: "MealDB - Shawarma bread", meal: "dinner", style: "bowls" },
  { name: "MealDB - Smoked aubergine purée", meal: "dinner", style: "bowls" },
  { name: "MealDB - Snert (Dutch Split Pea Soup)", meal: "dinner", style: "bowls" },
  { name: "MealDB - Split Pea Soup", meal: "dinner", style: "bowls" },
  { name: "MealDB - Venezuelan Arepas", meal: "dinner", style: "bowls" },
  { name: "MealDB - Venezuelan turnovers", meal: "dinner", style: "bowls" },
  { name: "MealDB - Zemiakové Placky", meal: "dinner", style: "bowls" },
  { name: "MealDB - Ajo blanco", meal: "dinner", style: "handheld" },
  { name: "MealDB - Broccoli & Stilton soup", meal: "dinner", style: "handheld" },
  { name: "MealDB - Clam chowder", meal: "dinner", style: "handheld" },
  { name: "MealDB - Cream Cheese Tart", meal: "dinner", style: "handheld" },
  { name: "MealDB - Creamy Tomato Soup", meal: "dinner", style: "handheld" },
  { name: "MealDB - Quick gazpacho", meal: "dinner", style: "handheld" },
  { name: "MealDB - Fasoliyyeh Bi Z-Zayt (Syrian Green Beans with Olive Oil)", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Padron peppers", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Red onion pickle", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Roast fennel and aubergine paella", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Vegan banh mi", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Vegan Chocolate Cake", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Vegan Lasagna", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Air fryer patatas bravas", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Algerian Flafla (Bell Pepper Salad)", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Aubergine & hummus grills", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Aubergine couscous salad", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Avocado dip with new potatoes", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Baingan Bharta", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Beetroot & red cabbage sauerkraut", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Beetroot latkes", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Beetroot Soup (Borscht)", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Braised stuffed cabbage", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Cabbage Soup (Shchi)", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Chickpea Fajitas", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Chinese Tomato Egg Stir Fry", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Chtitha Batata (Algerian Potato Stew)", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Crispy Eggplant", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Cucumber & fennel salad", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Dal fry", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Egg Drop Soup", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Eggplant Adobo", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Ezme", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Falafel", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Falafel Pita Sandwich with Tahini Sauce", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Flamiche", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Ful Medames", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Gigantes Plaki", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Griddled aubergines with sesame dressing", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Grilled aubergines with spicy chickpeas & walnut sauce", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Grilled eggplant with coconut milk", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Hodge Podge", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Jamaican Instant Pot Rice and Beans", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Jamaican Rice and Peas", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Kafteji", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Kidney Bean Curry", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Koshari", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Leblebi Soup", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Matar Paneer", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Molasses Baked Beans", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Moroccan Carrot Soup", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Mushroom & Chestnut Rotolo", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Nordic smørrebrød with asparagus and horseradish cream", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Patatas bravas", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Pisto con huevos", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Pomegranate salad", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Potato Salad (Olivier Salad)", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Provençal Omelette Cake", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Ratatouille", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Ribollita", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Roast aubergine with goat's cheese & toasted flatbread", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Roasted Eggplant With Tahini, Pine Nuts, and Lentils", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Sauerkraut pierogi", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Sauerkraut pierogii", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Shakshuka", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Sichuan Eggplant", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Sichuan Style Stir-Fried Chinese Long Beans", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Silken Tofu with Sesame Soy Sauce", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Smoky Lentil Chili with Squash", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Spanish Tortilla", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Spiced tortilla", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Spicy Arrabiata Penne", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Spicy North African Potato Salad", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Spinach & Ricotta Cannelloni", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Squash linguine", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Stovetop Eggplant With Harissa, Chickpeas, and Cumin Yogurt", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Stuffed Bell Peppers with Quinoa and Black Beans", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Sukuma Wiki", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Summer Pistou", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Sweet potato salad", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Tahini Lentils", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Tamiya", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Tangy cabbage slaw", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Tangy carrot, cabbage & onion salad", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Thai coconut & veg broth", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Thai pumpkin soup", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Thai rice noodle salad", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Tofu, greens & cashew stir-fry", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Tortang Talong", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Vegetarian Casserole", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Vegetarian Chilli", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Vegetarian Shakshuka", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Vietnamese veg parcels", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Vietnamese-style veggie hotpot", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Yaki Udon", meal: "dinner", style: "vegetarian" },
  { name: "MealDB - Bread omelette", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Breakfast Potatoes", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Dutch poffertjes (mini pancakes)", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - English Breakfast", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Fruit and Cream Cheese Breakfast Pastries", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Full English Breakfast", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Home-made Mandazi", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Jamaican Cornmeal Porridge", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Oatmeal pancakes", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Rømmegrøt – Norwegian Sour Cream Porridge", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Salmon Eggs Eggs Benedict", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Smoked Haddock Kedgeree", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Torrijas with sherry", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Ugali – Kenyan cornmeal", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Yemeni Lahsa (Elite Shakshuka)", meal: "dinner", style: "baked-casserole" },
  { name: "MealDB - Jamaican Curry Goat", meal: "dinner", style: "meat" },
  { name: "MealDB - Mbuzi Choma (Roasted Goat)", meal: "dinner", style: "meat" },
];

let recipes = [...RECIPES];

const mealFilter = document.querySelector("#mealFilter");
const styleFilter = document.querySelector("#styleFilter");
const queryFilter = document.querySelector("#queryFilter");
const recipeGrid = document.querySelector("#recipeGrid");
const resultCount = document.querySelector("#resultCount");
const plannerGrid = document.querySelector("#plannerGrid");
const plannerStatus = document.querySelector("#plannerStatus");
const clearCalendar = document.querySelector("#clearCalendar");
const copyPlan = document.querySelector("#copyPlan");
const exportPlan = document.querySelector("#exportPlan");
const printPlan = document.querySelector("#printPlan");
const recipeSubmitForm = document.querySelector("#recipeSubmitForm");
const submitPathPreview = document.querySelector("#submitPathPreview");
const submitStatus = document.querySelector("#submitStatus");
const copyRecipeMarkdown = document.querySelector("#copyRecipeMarkdown");
const isTouchDevice = ("ontouchstart" in window) || (navigator.maxTouchPoints > 0);

const STORAGE_KEY = "weeklyRecipePlanner.v1";
const BREAKFAST_UI_STORAGE_KEY = "weeklyRecipePlanner.breakfastExpanded.v1";
const PREFILL_MEAL_STORAGE_KEY = "recipes_prefill_meal";
const GITHUB_OWNER = "rmallorybpc";
const GITHUB_REPO = "recipes";
const DAYS = [
  { key: "sunday", label: "Sunday" },
  { key: "monday", label: "Monday" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" }
];
const MEALS = [
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "dinner", label: "Dinner" }
];
const ATE_OUT_RECIPE = {
  id: "ate-out-option",
  name: "Ate Out",
  meal: "dinner",
  style: "handheld",
  isSpecial: true
};

const recipesById = new Map();
let weekPlan = makeEmptyWeekPlan();
const breakfastExpandedByDay = DAYS.reduce((acc, day) => {
  acc[day.key] = false;
  return acc;
}, {});

function pretty(str) {
  return str
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function toId(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toQuotedYamlArray(value) {
  const tags = value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => `"${item.replace(/"/g, "\\\"")}"`);

  return `[${tags.join(", ")}]`;
}

function toLineItems(value, prefix) {
  const items = value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (!items.length) {
    return [prefix === "-" ? "- " : "1. "];
  }

  if (prefix === "-") {
    return items.map((item) => `- ${item}`);
  }

  return items.map((item, index) => `${index + 1}. ${item}`);
}

function buildSuggestedPath(title, meal, style) {
  return `recipes/${meal}/${style}/${toId(title || "new-recipe")}.md`;
}

function buildRecipeMarkdown(data) {
  const ingredients = toLineItems(data.ingredients, "-");
  const instructions = toLineItems(data.instructions, "1.");
  const notes = toLineItems(data.notes, "-");
  const sourceNote = data.source ? [`- Source: ${data.source}`] : [];
  const summary = data.summary || "A short description of the dish.";

  return [
    "---",
    `title: \"${data.title.replace(/\"/g, "\\\"")}\"`,
    `meal: ${data.meal}`,
    `style: ${data.style}`,
    `protein: \"${data.protein.replace(/\"/g, "\\\"")}\"`,
    `cuisine: \"${data.cuisine.replace(/\"/g, "\\\"")}\"`,
    `time_minutes: ${data.timeMinutes}`,
    `servings: ${data.servings}`,
    `keywords: ${toQuotedYamlArray(data.keywords)}`,
    "---",
    "",
    "# Summary",
    "",
    summary,
    "",
    "# Ingredients",
    "",
    ...ingredients,
    "",
    "# Instructions",
    "",
    ...instructions,
    "",
    "# Notes",
    "",
    ...notes,
    ...sourceNote
  ].join("\n");
}

function collectSubmissionData() {
  if (!(recipeSubmitForm instanceof HTMLFormElement)) {
    return null;
  }

  const formData = new FormData(recipeSubmitForm);
  const title = (formData.get("title") || "").toString().trim();

  return {
    title,
    meal: (formData.get("meal") || "dinner").toString(),
    style: (formData.get("style") || "meat").toString(),
    protein: (formData.get("protein") || "").toString().trim(),
    cuisine: (formData.get("cuisine") || "").toString().trim(),
    timeMinutes: Number.parseInt((formData.get("time_minutes") || "0").toString(), 10) || 0,
    servings: Number.parseInt((formData.get("servings") || "0").toString(), 10) || 0,
    keywords: (formData.get("keywords") || "").toString(),
    summary: (formData.get("summary") || "").toString().trim(),
    ingredients: (formData.get("ingredients") || "").toString(),
    instructions: (formData.get("instructions") || "").toString(),
    notes: (formData.get("notes") || "").toString(),
    source: (formData.get("source") || "").toString().trim()
  };
}

function buildIssueUrl(data, suggestedPath, markdown) {
  const issueTitle = `Recipe submission: ${data.title}`;
  const issueBody = [
    "## Proposed Recipe",
    "",
    `Suggested file path: ${suggestedPath}`,
    "",
    "Please review and add this recipe markdown file:",
    "",
    "```md",
    markdown,
    "```"
  ].join("\n");

  return `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/issues/new?title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(issueBody)}`;
}

function updateSubmitPathPreview() {
  if (!(recipeSubmitForm instanceof HTMLFormElement) || !submitPathPreview) {
    return;
  }

  const formData = new FormData(recipeSubmitForm);
  const title = (formData.get("title") || "").toString().trim();
  const meal = (formData.get("meal") || "dinner").toString();
  const style = (formData.get("style") || "meat").toString();
  const path = buildSuggestedPath(title, meal, style);
  submitPathPreview.textContent = `Suggested file path: ${path}`;
}

function setSubmitStatus(message) {
  if (!submitStatus) {
    return;
  }

  submitStatus.textContent = message;
}

async function copyRecipeTemplateMarkdown() {
  const data = collectSubmissionData();
  if (!data || !data.title) {
    setSubmitStatus("Enter a recipe title first.");
    return;
  }

  const markdown = buildRecipeMarkdown(data);

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(markdown);
      setSubmitStatus("Recipe markdown copied.");
      return;
    }
  } catch (_error) {
    setSubmitStatus("Copy failed. Use Create GitHub Issue instead.");
  }
}

function submitRecipeIssue(event) {
  event.preventDefault();

  const data = collectSubmissionData();
  if (!data || !data.title) {
    setSubmitStatus("Recipe title is required.");
    return;
  }

  const suggestedPath = buildSuggestedPath(data.title, data.meal, data.style);
  const markdown = buildRecipeMarkdown(data);
  const issueUrl = buildIssueUrl(data, suggestedPath, markdown);

  window.open(issueUrl, "_blank", "noopener");
  setSubmitStatus("Opened GitHub Issue with your prefilled recipe.");
}

function hydrateSubmissionFormFromSessionMeal() {
  if (!(recipeSubmitForm instanceof HTMLFormElement)) {
    return;
  }

  const raw = sessionStorage.getItem(PREFILL_MEAL_STORAGE_KEY);
  if (!raw) {
    return;
  }

  sessionStorage.removeItem(PREFILL_MEAL_STORAGE_KEY);

  let meal;
  try {
    meal = JSON.parse(raw);
  } catch (_error) {
    return;
  }

  const titleInput = document.getElementById("submitTitle");
  const mealSelect = document.getElementById("submitMeal");
  const styleSelect = document.getElementById("submitStyle");
  const ingredientsInput = document.getElementById("submitIngredients");
  const instructionsInput = document.getElementById("submitInstructions");

  if (titleInput instanceof HTMLInputElement && meal && meal.title) {
    titleInput.value = String(meal.title);
  }

  if (mealSelect instanceof HTMLSelectElement && meal && meal.meal) {
    const mealValue = String(meal.meal).toLowerCase();
    if ([...mealSelect.options].some((option) => option.value === mealValue)) {
      mealSelect.value = mealValue;
    }
  }

  if (styleSelect instanceof HTMLSelectElement && meal && meal.style) {
    const styleValue = String(meal.style).toLowerCase();
    if ([...styleSelect.options].some((option) => option.value === styleValue)) {
      styleSelect.value = styleValue;
    }
  }

  if (ingredientsInput instanceof HTMLTextAreaElement) {
    if (meal && Array.isArray(meal.ingredients)) {
      ingredientsInput.value = meal.ingredients.map((item) => String(item)).join("\n");
    } else if (meal && typeof meal.ingredients === "string") {
      ingredientsInput.value = meal.ingredients;
    }
  }

  if (instructionsInput instanceof HTMLTextAreaElement) {
    if (meal && typeof meal.instructions === "string" && meal.instructions.trim()) {
      instructionsInput.value = meal.instructions.trim();
    } else if (meal && typeof meal.whyChosen === "string" && meal.whyChosen.trim()) {
      instructionsInput.value = meal.whyChosen.trim();
    }
  }

  updateSubmitPathPreview();
  recipeSubmitForm.scrollIntoView({ behavior: "smooth", block: "start" });
}

function makeEmptyWeekPlan() {
  return DAYS.reduce((acc, day) => {
    acc[day.key] = makeEmptyMealPlan();
    return acc;
  }, {});
}

function makeEmptyMealPlan() {
  return MEALS.reduce((acc, meal) => {
    acc[meal.key] = [];
    return acc;
  }, {});
}

function legacyRecipeId(recipeName, index) {
  return `${toId(recipeName)}-${index}`;
}

function hydrateRecipeIds() {
  recipesById.clear();

  recipes.forEach((recipe, index) => {
    if (!recipe.id) {
      recipe.id = legacyRecipeId(recipe.name, index);
    }

    recipesById.set(recipe.id, recipe);

    // Keep old localStorage plan entries working after switching from static IDs.
    const oldId = legacyRecipeId(recipe.name, index);
    if (!recipesById.has(oldId)) {
      recipesById.set(oldId, recipe);
    }
  });

  recipesById.set(ATE_OUT_RECIPE.id, ATE_OUT_RECIPE);
}

function toPlannerRecipe(item, index) {
  if (!item || typeof item !== "object") {
    return null;
  }

  const name = String(item.title || item.name || "").trim();
  const meal = String(item.meal || "").trim().toLowerCase();
  const style = String(item.style || "").trim().toLowerCase();

  if (!name || !MEALS.some((entry) => entry.key === meal) || !style) {
    return null;
  }

  const stableId = String(item.id || "").trim();
  return {
    id: stableId || legacyRecipeId(name, index),
    name,
    meal,
    style,
    source: item.source_url ? String(item.source_url) : undefined
  };
}

async function loadRecipesFromDataset() {
  try {
    const response = await fetch("data/recipes-with-ingredients.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const payload = await response.json();
    const loaded = Array.isArray(payload?.recipes)
      ? payload.recipes
          .map((item, index) => toPlannerRecipe(item, index))
          .filter(Boolean)
      : [];

    if (!loaded.length) {
      throw new Error("Dataset contained no usable recipes");
    }

    recipes = loaded;
  } catch (error) {
    console.warn("Falling back to built-in recipe list.", error);
    recipes = [...RECIPES];
  }
}

function loadWeekPlan() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return makeEmptyWeekPlan();
    }

    const parsed = JSON.parse(saved);
    const normalized = makeEmptyWeekPlan();

    DAYS.forEach(({ key }) => {
      const dayValue = parsed[key];

      if (Array.isArray(dayValue)) {
        dayValue.forEach((recipeId) => {
          if (!recipesById.has(recipeId)) {
            return;
          }
          const recipe = recipesById.get(recipeId);
          const mealKey = MEALS.some((meal) => meal.key === recipe.meal) ? recipe.meal : "dinner";
          if (!normalized[key][mealKey].includes(recipeId)) {
            normalized[key][mealKey].push(recipeId);
          }
        });
        return;
      }

      MEALS.forEach(({ key: mealKey }) => {
        const mealItems = Array.isArray(dayValue?.[mealKey]) ? dayValue[mealKey] : [];
        normalized[key][mealKey] = mealItems.filter((recipeId) => recipesById.has(recipeId));
      });
    });

    return normalized;
  } catch (_error) {
    return makeEmptyWeekPlan();
  }
}

function saveWeekPlan() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(weekPlan));
}

function loadBreakfastExpandedState() {
  try {
    const saved = localStorage.getItem(BREAKFAST_UI_STORAGE_KEY);
    if (!saved) {
      return;
    }

    const parsed = JSON.parse(saved);
    DAYS.forEach(({ key }) => {
      breakfastExpandedByDay[key] = Boolean(parsed?.[key]);
    });
  } catch (_error) {
    DAYS.forEach(({ key }) => {
      breakfastExpandedByDay[key] = false;
    });
  }
}

function saveBreakfastExpandedState() {
  localStorage.setItem(BREAKFAST_UI_STORAGE_KEY, JSON.stringify(breakfastExpandedByDay));
}

function addRecipeToDay(dayKey, mealKey, recipeId) {
  if (!recipesById.has(recipeId) || !weekPlan[dayKey]?.[mealKey]) {
    return;
  }

  if (!weekPlan[dayKey][mealKey].includes(recipeId)) {
    weekPlan[dayKey][mealKey].push(recipeId);
    saveWeekPlan();
    renderPlanner();
  }
}

function addMealsToPlannerGrid(meals) {
  try {
    const mealItems = Array.isArray(meals) ? meals : [meals];
    let placedCount = 0;

    mealItems.forEach((meal, index) => {
      if (!meal || typeof meal !== "object") {
        return;
      }

      const targetDayName = String(meal.dayName || "").trim().toLowerCase();
      if (!targetDayName) {
        return;
      }

      const dayColumn = Array.from(plannerGrid.querySelectorAll(".dayColumn")).find((column) => {
        const headerText = column.querySelector(".dayTitle")?.textContent || "";
        return headerText.trim().toLowerCase() === targetDayName;
      });

      if (!(dayColumn instanceof HTMLElement)) {
        return;
      }

      const targetMealName = String(meal.meal || "").trim().toLowerCase();
      const dayLanes = Array.from(dayColumn.querySelectorAll(".mealLane"));

      let lane = dayLanes.find((candidateLane) => {
        const label = candidateLane.querySelector(".mealLaneTitle")?.textContent || "";
        return label.trim().toLowerCase() === targetMealName;
      });

      if (!lane) {
        lane = dayLanes[0] || null;
      }

      if (!(lane instanceof HTMLElement)) {
        return;
      }

      const matchedRecipe = recipes.find((recipe) => {
        return String(recipe.name || "").trim().toLowerCase() === String(meal.title || "").trim().toLowerCase();
      });

      const recipeForPlanner = matchedRecipe || {
        name: String(meal.title || "Untitled meal"),
        meal: String(meal.meal || "dinner").toLowerCase(),
        style: String(meal.style || "meat").toLowerCase(),
        time_minutes: meal.time_minutes ?? null,
        matchedDeals: Array.isArray(meal.matchedDeals) ? meal.matchedDeals : [],
        whyChosen: String(meal.whyChosen || "")
      };

      if (!recipeForPlanner.id) {
        const generatedId = `session-${toId(recipeForPlanner.name)}-${Date.now()}-${index}`;
        recipeForPlanner.id = generatedId;
      }

      recipesById.set(recipeForPlanner.id, recipeForPlanner);

      const dayKey = dayColumn.dataset.day;
      let mealKey = lane.dataset.meal;
      if (!MEALS.some((item) => item.key === mealKey)) {
        mealKey = MEALS[0]?.key;
      }

      if (!dayKey || !mealKey || !weekPlan[dayKey]?.[mealKey]) {
        return;
      }

      weekPlan[dayKey][mealKey] = [recipeForPlanner.id];
      placedCount += 1;
    });

    if (placedCount > 0) {
      saveWeekPlan();
      renderPlanner();

      plannerGrid.querySelectorAll(".dayRecipe").forEach((item) => {
        if (!(item instanceof HTMLElement)) {
          return;
        }

        const removeButton = item.querySelector(".removePlanned");
        if (!(removeButton instanceof HTMLElement)) {
          return;
        }

        const recipeId = removeButton.dataset.recipe;
        if (!recipeId) {
          return;
        }

        item.draggable = true;
        item.addEventListener("dragstart", (event) => {
          event.dataTransfer.setData("text/plain", recipeId);
          event.dataTransfer.effectAllowed = "copy";
        });
      });
    }

    if (plannerStatus) {
      plannerStatus.textContent = `${placedCount} meals added from your suggested plan.`;
      window.setTimeout(() => {
        if (plannerStatus.textContent === `${placedCount} meals added from your suggested plan.`) {
          plannerStatus.textContent = "";
        }
      }, 4000);
    }
  } catch (error) {
    console.error("Failed to add suggested meals to planner.", error);
  }
}

function removeRecipeFromDay(dayKey, mealKey, recipeId) {
  if (!weekPlan[dayKey]?.[mealKey]) {
    return;
  }

  weekPlan[dayKey][mealKey] = weekPlan[dayKey][mealKey].filter((id) => id !== recipeId);
  saveWeekPlan();
  renderPlanner();
}

function clearDay(dayKey) {
  if (!weekPlan[dayKey]) {
    return;
  }

  const hasItems = MEALS.some(({ key }) => weekPlan[dayKey][key].length > 0);
  if (!hasItems) {
    return;
  }

  weekPlan[dayKey] = makeEmptyMealPlan();
  saveWeekPlan();
  renderPlanner();
}

function clearWholeWeek() {
  weekPlan = makeEmptyWeekPlan();
  saveWeekPlan();
  renderPlanner();
}

function toggleBreakfastLane(dayKey) {
  if (!Object.prototype.hasOwnProperty.call(breakfastExpandedByDay, dayKey)) {
    return;
  }

  breakfastExpandedByDay[dayKey] = !breakfastExpandedByDay[dayKey];
  saveBreakfastExpandedState();
  renderPlanner();
}

function renderPlanner() {
  plannerGrid.innerHTML = "";

  DAYS.forEach((day) => {
    const li = document.createElement("li");
    li.className = "dayColumn";
    li.dataset.day = day.key;
    li.innerHTML = `<h3 class="dayTitle">${day.label}</h3><div class="mealLanes"></div>`;

    const mealLanes = li.querySelector(".mealLanes");

    MEALS.forEach((meal) => {
      const lane = document.createElement("section");
      lane.className = "mealLane";
      lane.dataset.day = day.key;
      lane.dataset.meal = meal.key;
      let laneList;

      if (meal.key === "breakfast") {
        const expanded = breakfastExpandedByDay[day.key];
        const panelId = `breakfast-${day.key}-panel`;
        lane.classList.add("mealLaneBreakfast");
        if (!expanded) {
          lane.classList.add("isCollapsed");
        }

        lane.innerHTML = `
          <button
            type="button"
            class="mealLaneToggle"
            data-day="${day.key}"
            aria-expanded="${expanded}"
            aria-controls="${panelId}"
          >
            <span class="mealLaneTitle">${meal.label}</span>
            <span class="mealLaneToggleIcon" aria-hidden="true">${expanded ? "-" : "+"}</span>
          </button>
          <div class="mealLaneBody" id="${panelId}" ${expanded ? "" : "hidden"}>
            <ul class="dayList"></ul>
          </div>
        `;
      } else {
        lane.innerHTML = `<h4 class="mealLaneTitle">${meal.label}</h4><ul class="dayList"></ul>`;
      }

      laneList = lane.querySelector(".dayList");
      const plannedIds = weekPlan[day.key][meal.key];

      if (!plannedIds.length) {
        const hint = document.createElement("p");
        hint.className = "dayHint";
        hint.textContent = "Drop recipes here";
        laneList.appendChild(hint);
      } else {
        plannedIds.forEach((recipeId) => {
          const recipe = recipesById.get(recipeId);
          if (!recipe) {
            return;
          }

          const item = document.createElement("li");
          item.className = "dayRecipe";
          item.innerHTML = `
            <p class="dayRecipeName">${recipe.name}</p>
            <button type="button" class="removePlanned" data-day="${day.key}" data-meal="${meal.key}" data-recipe="${recipeId}">Remove</button>
          `;
          laneList.appendChild(item);
        });
      }

      lane.addEventListener("dragover", (event) => {
        event.preventDefault();
        lane.classList.add("isOver");
      });

      lane.addEventListener("dragleave", () => {
        lane.classList.remove("isOver");
      });

      lane.addEventListener("drop", (event) => {
        event.preventDefault();
        lane.classList.remove("isOver");
        const recipeId = event.dataTransfer.getData("text/plain");
        addRecipeToDay(day.key, meal.key, recipeId);
      });

      mealLanes.appendChild(lane);
    });

    const clearDayButton = document.createElement("button");
    clearDayButton.type = "button";
    clearDayButton.className = "clearDayButton";
    clearDayButton.dataset.day = day.key;
    clearDayButton.textContent = "Clear Day";
    li.appendChild(clearDayButton);

    plannerGrid.appendChild(li);
  });
}

function buildPlanExport() {
  const lines = ["Weekly Recipe Plan", `Generated: ${new Date().toLocaleString()}`, ""];

  DAYS.forEach((day) => {
    lines.push(day.label);

    MEALS.forEach((meal) => {
      const items = weekPlan[day.key][meal.key]
        .map((recipeId) => recipesById.get(recipeId)?.name)
        .filter(Boolean);

      if (!items.length) {
        lines.push(`  ${meal.label}: -`);
        return;
      }

      lines.push(`  ${meal.label}:`);
      items.forEach((item) => lines.push(`    - ${item}`));
    });

    lines.push("");
  });

  return lines.join("\n");
}

function exportWeeklyPlan() {
  const content = buildPlanExport();
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "weekly-recipe-plan.txt";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function setPlannerStatus(message) {
  plannerStatus.textContent = message;
}

function getRecipeDisplayTitle(recipe) {
  if (!recipe || typeof recipe !== "object") {
    return "Recipe";
  }
  return String(recipe.title || recipe.name || "Recipe");
}

function ensureTouchPickerStyles() {
  if (document.getElementById("touchPickerStyles")) {
    return;
  }

  const style = document.createElement("style");
  style.id = "touchPickerStyles";
  style.textContent = `
    .touchAddBtn {
      display: none;
      width: 100%;
      margin-top: 0.5rem;
      padding: 0.5rem;
      font-size: 13px;
      background: var(--color-background-info, color-mix(in srgb, var(--accent-2) 16%, #fff 84%));
      color: var(--color-text-info, #1f5d4f);
      border: 1px solid var(--color-border-info, color-mix(in srgb, var(--accent-2) 45%, #cfe5de 55%));
      border-radius: var(--border-radius-md, 10px);
      cursor: pointer;
      font-family: var(--font-sans, inherit);
    }

    @media (max-width: 768px) {
      .touchAddBtn {
        display: block;
      }
    }

    .pickerOverlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: 100;
    }

    .pickerPanel {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: var(--color-background-primary, var(--card));
      border-radius: var(--border-radius-lg, 16px) var(--border-radius-lg, 16px) 0 0;
      padding: 1.25rem;
      z-index: 101;
      max-height: 70vh;
      overflow-y: auto;
    }

    .pickerTitle {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 1rem;
      color: var(--color-text-primary, var(--ink));
    }

    .pickerGrid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .pickerSlot {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.625rem 0.375rem;
      border: 0.5px solid var(--color-border-tertiary, #e4d4c5);
      border-radius: var(--border-radius-md, 10px);
      background: var(--color-background-secondary, #fffdf8);
      cursor: pointer;
      gap: 2px;
      min-height: 44px;
    }

    .pickerSlot:active {
      background: var(--color-background-info, color-mix(in srgb, var(--accent-2) 16%, #fff 84%));
    }

    .pickerDay {
      font-size: 12px;
      font-weight: 500;
      color: var(--color-text-primary, var(--ink));
    }

    .pickerMeal {
      font-size: 11px;
      color: var(--color-text-secondary, var(--muted));
    }

    .pickerCancel {
      width: 100%;
      padding: 0.875rem;
      font-size: 14px;
      background: transparent;
      border: 0.5px solid var(--color-border-secondary, #d8c7b8);
      border-radius: var(--border-radius-md, 10px);
      cursor: pointer;
      color: var(--color-text-secondary, var(--muted));
      font-family: var(--font-sans, inherit);
      min-height: 44px;
    }
  `;

  document.head.appendChild(style);
}

function showMealDayPicker(recipe, triggerElement) {
  const existing = document.getElementById("mealDayPicker");
  if (existing) {
    existing.remove();
  }

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const meals = ["Breakfast", "Lunch", "Dinner"];
  const recipeTitle = getRecipeDisplayTitle(recipe).replace(/"/g, "&quot;");

  const picker = document.createElement("div");
  picker.id = "mealDayPicker";
  picker.innerHTML = `
    <div class="pickerOverlay"></div>
    <div class="pickerPanel" role="dialog" aria-modal="true" aria-label="Add recipe to planner">
      <p class="pickerTitle">Add "${recipeTitle}" to:</p>
      <div class="pickerGrid">
        ${days.map((day) => meals.map((meal) => `
          <button class="pickerSlot" data-day="${day}" data-meal="${meal.toLowerCase()}" type="button">
            <span class="pickerDay">${day.slice(0, 3)}</span>
            <span class="pickerMeal">${meal}</span>
          </button>
        `).join("")).join("")}
      </div>
      <button class="pickerCancel" type="button">Cancel</button>
    </div>
  `;

  document.body.appendChild(picker);

  picker.querySelectorAll(".pickerSlot").forEach((btn) => {
    btn.addEventListener("click", function onSlotClick() {
      const day = this.dataset.day;
      const meal = this.dataset.meal;
      addRecipeToPlannerSlot(recipe, day, meal);
      picker.remove();
      if (triggerElement instanceof HTMLElement) {
        triggerElement.focus();
      }
    });
  });

  const cancelButton = picker.querySelector(".pickerCancel");
  const overlay = picker.querySelector(".pickerOverlay");

  if (cancelButton instanceof HTMLElement) {
    cancelButton.addEventListener("click", () => {
      picker.remove();
      if (triggerElement instanceof HTMLElement) {
        triggerElement.focus();
      }
    });
  }

  if (overlay instanceof HTMLElement) {
    overlay.addEventListener("click", () => {
      picker.remove();
      if (triggerElement instanceof HTMLElement) {
        triggerElement.focus();
      }
    });
  }
}

function addRecipeToPlannerSlot(recipe, dayName, mealType) {
  const dayConfig = DAYS.find((day) => day.label.toLowerCase() === String(dayName || "").toLowerCase());
  const mealKey = String(mealType || "").toLowerCase();

  if (!dayConfig || !MEALS.some((meal) => meal.key === mealKey)) {
    const status = document.getElementById("plannerStatus");
    if (status) {
      status.textContent = `Could not find ${dayName} ${mealType} slot. Try scrolling to that day first.`;
      window.setTimeout(() => {
        if (status.textContent.includes("Could not find")) {
          status.textContent = "";
        }
      }, 3000);
    }
    return;
  }

  const recipeId = recipe && recipe.id ? recipe.id : null;
  if (!recipeId || !recipesById.has(recipeId)) {
    return;
  }

  addRecipeToDay(dayConfig.key, mealKey, recipeId);

  const status = document.getElementById("plannerStatus");
  if (status) {
    status.textContent = `${getRecipeDisplayTitle(recipe)} added to ${dayConfig.label} ${mealKey}.`;
    window.setTimeout(() => {
      if (status.textContent.includes(" added to ")) {
        status.textContent = "";
      }
    }, 3000);
  }

  document.getElementById("plannerGrid")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

async function copyWeeklyPlan() {
  const content = buildPlanExport();

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(content);
      setPlannerStatus("Weekly plan copied to clipboard.");
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = content;
    textarea.setAttribute("readonly", "true");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    setPlannerStatus("Weekly plan copied to clipboard.");
  } catch (_error) {
    setPlannerStatus("Copy failed. Use Export instead.");
  }
}

function renderCards(items) {
  const visibleItems = [...items, ATE_OUT_RECIPE];

  recipeGrid.innerHTML = "";
  resultCount.textContent = `${visibleItems.length} recipe${visibleItems.length === 1 ? "" : "s"}`;

  visibleItems.forEach((recipe, index) => {
    const li = document.createElement("li");
    li.className = "card";
    if (recipe.isSpecial) {
      li.classList.add("ateOutCard");
    }
    li.style.animationDelay = `${Math.min(index * 20, 300)}ms`;
    li.draggable = true;
    li.dataset.recipeId = recipe.id;

    li.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", recipe.id);
      event.dataTransfer.effectAllowed = "copy";
    });

    const sourceHtml = recipe.source
      ? `<a class="sourceLink" href="${recipe.source}" target="_blank" rel="noopener noreferrer">Source</a>`
      : "";

    const tagsHtml = recipe.isSpecial
      ? '<span class="tag">Any meal</span><span class="tag">Planner option</span>'
      : `<span class="tag">${pretty(recipe.meal)}</span><span class="tag">${pretty(recipe.style)}</span>`;

    li.innerHTML = `
      <p class="recipeName">${recipe.name}</p>
      <div class="tags">
        ${tagsHtml}
      </div>
      ${sourceHtml}
    `;

    if (isTouchDevice) {
      const addBtn = document.createElement("button");
      addBtn.className = "touchAddBtn";
      addBtn.textContent = "+ Add to Plan";
      addBtn.setAttribute("type", "button");
      addBtn.setAttribute("aria-label", `Add ${getRecipeDisplayTitle(recipe)} to meal plan`);
      addBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        showMealDayPicker(recipe, addBtn);
      });
      li.appendChild(addBtn);
    }

    recipeGrid.appendChild(li);
  });
}

function applyFilters() {
  const meal = mealFilter.value;
  const style = styleFilter.value;
  const query = queryFilter.value.trim().toLowerCase();

  const filtered = recipes.filter((recipe) => {
    const matchesMeal = meal === "all" || recipe.meal === meal;
    const matchesStyle = style === "all" || recipe.style === style;
    const haystack = `${recipe.name} ${recipe.meal} ${recipe.style}`.toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    return matchesMeal && matchesStyle && matchesQuery;
  });

  renderCards(filtered);
}

plannerGrid.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLElement)) {
    return;
  }

  if (target.classList.contains("removePlanned")) {
    const { day, meal, recipe } = target.dataset;
    if (day && meal && recipe) {
      removeRecipeFromDay(day, meal, recipe);
    }
  }

  if (target.classList.contains("clearDayButton")) {
    const { day } = target.dataset;
    if (day) {
      clearDay(day);
    }
  }

  if (target.closest(".mealLaneToggle")) {
    const toggleButton = target.closest(".mealLaneToggle");
    if (toggleButton instanceof HTMLElement) {
      const { day } = toggleButton.dataset;
      if (day) {
        toggleBreakfastLane(day);
      }
    }
  }
});

clearCalendar.addEventListener("click", clearWholeWeek);
copyPlan.addEventListener("click", copyWeeklyPlan);
exportPlan.addEventListener("click", exportWeeklyPlan);
printPlan.addEventListener("click", () => window.print());

mealFilter.addEventListener("change", applyFilters);
styleFilter.addEventListener("change", applyFilters);
queryFilter.addEventListener("input", applyFilters);

if (recipeSubmitForm instanceof HTMLFormElement) {
  recipeSubmitForm.addEventListener("input", updateSubmitPathPreview);
  recipeSubmitForm.addEventListener("submit", submitRecipeIssue);
  hydrateSubmissionFormFromSessionMeal();
  updateSubmitPathPreview();
}

if (copyRecipeMarkdown) {
  copyRecipeMarkdown.addEventListener("click", copyRecipeTemplateMarkdown);
}

if (isTouchDevice) {
  ensureTouchPickerStyles();
}

async function initializePlanner() {
  await loadRecipesFromDataset();

  hydrateRecipeIds();
  weekPlan = loadWeekPlan();
  loadBreakfastExpandedState();
  renderPlanner();

  const pendingPlannerMealsRaw = sessionStorage.getItem("recipes_add_to_planner");
  if (pendingPlannerMealsRaw) {
    sessionStorage.removeItem("recipes_add_to_planner");

    try {
      const parsedMeals = JSON.parse(pendingPlannerMealsRaw);
      const meals = Array.isArray(parsedMeals) ? parsedMeals : [parsedMeals];
      addMealsToPlannerGrid(meals);
      document.getElementById("plannerGrid")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (error) {
      console.error("Failed to parse pending planner meals from sessionStorage.", error);
    }
  }

  applyFilters();
}

initializePlanner();
