import type { Ingredient, MealType } from '../types';

export const INGREDIENTS: Ingredient[] = [
  // Pizza ingredients
  { id: 'pepperoni',    name: 'Pepperoni',    emoji: '🍕', color: '#c0392b', meals: ['pizza'],                        stackable: true },
  { id: 'mushroom',     name: 'Mushroom',     emoji: '🍄', color: '#8e7464', meals: ['pizza', 'salad', 'sandwich'],   stackable: true },
  { id: 'olive',        name: 'Olive',        emoji: '🟢', color: '#2c6e2c', meals: ['pizza', 'salad'],               stackable: true },
  { id: 'bell_pepper',  name: 'Bell Pepper',  emoji: '🥦', color: '#27ae60', meals: ['pizza', 'salad', 'sandwich'],   stackable: true },
  { id: 'cheese',       name: 'Cheese',       emoji: '🧀', color: '#f1c40f', meals: ['pizza', 'hamburger', 'sandwich', 'burrito'], stackable: false },
  { id: 'tomato_slice', name: 'Tomato',       emoji: '🍅', color: '#e74c3c', meals: ['pizza', 'salad', 'hamburger', 'sandwich'],   stackable: true },
  { id: 'pineapple',    name: 'Pineapple',    emoji: '🍍', color: '#f39c12', meals: ['pizza'],                        stackable: true },
  { id: 'jalapeno',     name: 'Jalapeño',     emoji: '🌶️', color: '#16a085', meals: ['pizza', 'burrito', 'sandwich'], stackable: true },
  { id: 'basil',        name: 'Basil',        emoji: '🌿', color: '#27ae60', meals: ['pizza', 'salad', 'sandwich'],   stackable: true },
  { id: 'sausage',      name: 'Sausage',      emoji: '🌭', color: '#a93226', meals: ['pizza'],                        stackable: true },

  // Hamburger ingredients
  { id: 'beef_patty',   name: 'Beef Patty',   emoji: '🥩', color: '#784212', meals: ['hamburger'],                   stackable: false },
  { id: 'lettuce',      name: 'Lettuce',      emoji: '🥬', color: '#2ecc71', meals: ['hamburger', 'sandwich', 'salad', 'burrito'], stackable: false },
  { id: 'onion',        name: 'Onion',        emoji: '🧅', color: '#d5d8dc', meals: ['hamburger', 'sandwich', 'salad', 'burrito', 'pizza'], stackable: true },
  { id: 'pickle',       name: 'Pickle',       emoji: '🥒', color: '#1abc9c', meals: ['hamburger', 'sandwich'],       stackable: true },
  { id: 'ketchup',      name: 'Ketchup',      emoji: '🥫', color: '#c0392b', meals: ['hamburger', 'sandwich'],       stackable: false },
  { id: 'mustard',      name: 'Mustard',      emoji: '🌻', color: '#f1c40f', meals: ['hamburger', 'sandwich'],       stackable: false },
  { id: 'bacon',        name: 'Bacon',        emoji: '🥓', color: '#c0392b', meals: ['hamburger', 'sandwich', 'salad'], stackable: true },
  { id: 'egg_fried',    name: 'Fried Egg',    emoji: '🍳', color: '#f1c40f', meals: ['hamburger', 'sandwich'],       stackable: false },
  { id: 'avocado',      name: 'Avocado',      emoji: '🥑', color: '#27ae60', meals: ['hamburger', 'salad', 'sandwich', 'burrito', 'sushi'], stackable: false },

  // Burrito ingredients
  { id: 'rice',         name: 'Rice',         emoji: '🍚', color: '#fdfefe', meals: ['burrito', 'sushi'],            stackable: false },
  { id: 'beans',        name: 'Black Beans',  emoji: '🌰', color: '#2c3e50', meals: ['burrito', 'salad'],            stackable: false },
  { id: 'corn',         name: 'Corn',         emoji: '🌽', color: '#f1c40f', meals: ['burrito', 'salad'],            stackable: true },
  { id: 'sour_cream',   name: 'Sour Cream',   emoji: '🥛', color: '#fdfefe', meals: ['burrito'],                     stackable: false },
  { id: 'guacamole',    name: 'Guacamole',    emoji: '🥑', color: '#2ecc71', meals: ['burrito'],                     stackable: false },
  { id: 'salsa',        name: 'Salsa',        emoji: '🍅', color: '#e74c3c', meals: ['burrito'],                     stackable: false },
  { id: 'chicken',      name: 'Chicken',      emoji: '🍗', color: '#f39c12', meals: ['burrito', 'salad', 'sandwich'], stackable: false },
  { id: 'steak',        name: 'Steak',        emoji: '🥩', color: '#884a2d', meals: ['burrito'],                     stackable: false },

  // Salad ingredients
  { id: 'croutons',     name: 'Croutons',     emoji: '🍞', color: '#d4a96a', meals: ['salad'],                       stackable: true },
  { id: 'cucumber',     name: 'Cucumber',     emoji: '🥒', color: '#27ae60', meals: ['salad', 'sushi', 'sandwich'],  stackable: true },
  { id: 'carrot',       name: 'Carrot',       emoji: '🥕', color: '#e67e22', meals: ['salad', 'sandwich'],           stackable: true },
  { id: 'radish',       name: 'Radish',       emoji: '🌹', color: '#e74c3c', meals: ['salad'],                       stackable: true },
  { id: 'cherry_tom',   name: 'Cherry Tomato',emoji: '🍒', color: '#c0392b', meals: ['salad'],                       stackable: true },
  { id: 'dressing',     name: 'Dressing',     emoji: '🍯', color: '#f39c12', meals: ['salad'],                       stackable: false },
  { id: 'walnuts',      name: 'Walnuts',      emoji: '🥜', color: '#a04000', meals: ['salad'],                       stackable: true },
  { id: 'strawberry',   name: 'Strawberry',   emoji: '🍓', color: '#c0392b', meals: ['salad'],                       stackable: true },

  // Sushi ingredients
  { id: 'salmon',       name: 'Salmon',       emoji: '🐟', color: '#f1948a', meals: ['sushi'],                       stackable: false },
  { id: 'tuna',         name: 'Tuna',         emoji: '🐠', color: '#e74c3c', meals: ['sushi'],                       stackable: false },
  { id: 'shrimp',       name: 'Shrimp',       emoji: '🍤', color: '#f39c12', meals: ['sushi'],                       stackable: false },
  { id: 'seaweed',      name: 'Seaweed',      emoji: '🍃', color: '#1a5276', meals: ['sushi'],                       stackable: false },
  { id: 'cream_cheese', name: 'Cream Cheese', emoji: '🧀', color: '#fdfefe', meals: ['sushi', 'sandwich'],           stackable: false },
  { id: 'soy_sauce',    name: 'Soy Sauce',    emoji: '🥢', color: '#2c3e50', meals: ['sushi'],                       stackable: false },
  { id: 'wasabi',       name: 'Wasabi',       emoji: '🥬', color: '#1abc9c', meals: ['sushi'],                       stackable: false },
  { id: 'ginger',       name: 'Ginger',       emoji: '🍠', color: '#f39c12', meals: ['sushi'],                       stackable: false },

  // Sandwich ingredients
  { id: 'turkey',       name: 'Turkey',       emoji: '🦃', color: '#a04000', meals: ['sandwich'],                    stackable: false },
  { id: 'ham',          name: 'Ham',          emoji: '🥩', color: '#e91e8c', meals: ['sandwich'],                    stackable: false },
  { id: 'mayo',         name: 'Mayo',         emoji: '🥛', color: '#fdfefe', meals: ['sandwich', 'hamburger'],       stackable: false },
  { id: 'spinach',      name: 'Spinach',      emoji: '🥬', color: '#27ae60', meals: ['sandwich', 'salad', 'burrito'], stackable: false },
  { id: 'swiss',        name: 'Swiss Cheese', emoji: '🧀', color: '#f9e79f', meals: ['sandwich'],                    stackable: false },
  { id: 'sprouts',      name: 'Sprouts',      emoji: '🌱', color: '#58d68d', meals: ['sandwich', 'salad'],           stackable: true },
];

export const getIngredientsByMeal = (meal: MealType): Ingredient[] =>
  INGREDIENTS.filter(i => i.meals.includes(meal));

export const getIngredientById = (id: string): Ingredient | undefined =>
  INGREDIENTS.find(i => i.id === id);
