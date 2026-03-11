import type { MealType } from '../types';

export interface MealInfo {
  id: MealType;
  name: string;
  emoji: string;
  description: string;
  bgColor: string;
  accentColor: string;
  plateBg: string;
  hasSlices: boolean;
  chefIntro: string;
}

export const MEALS: MealInfo[] = [
  {
    id: 'pizza',
    name: 'Pizza',
    emoji: '🍕',
    description: 'Round & cheesy!',
    bgColor: '#fff3e0',
    accentColor: '#ff6b35',
    plateBg: '#f5e6d3',
    hasSlices: true,
    chefIntro: "Mamma mia! Let's make a delicious pizza! Drag your favourite toppings onto the dough!",
  },
  {
    id: 'hamburger',
    name: 'Hamburger',
    emoji: '🍔',
    description: 'Stack it high!',
    bgColor: '#fff8e1',
    accentColor: '#f57c00',
    plateBg: '#fdebd0',
    hasSlices: false,
    chefIntro: "Yee-haw! We're building the greatest burger in town! Pile on those toppings!",
  },
  {
    id: 'burrito',
    name: 'Burrito',
    emoji: '🌯',
    description: 'Wrap it up!',
    bgColor: '#f3e5f5',
    accentColor: '#8e44ad',
    plateBg: '#e8daef',
    hasSlices: false,
    chefIntro: "¡Hola amigo! Time to make the most amazing burrito! Wrap up all your favourite fillings!",
  },
  {
    id: 'salad',
    name: 'Salad',
    emoji: '🥗',
    description: 'Fresh & healthy!',
    bgColor: '#e8f5e9',
    accentColor: '#2e7d32',
    plateBg: '#d5f5e3',
    hasSlices: false,
    chefIntro: "Ooh la la! A beautiful salad! Toss in all the colourful veggies you love!",
  },
  {
    id: 'sushi',
    name: 'Sushi',
    emoji: '🍱',
    description: 'Roll with it!',
    bgColor: '#e3f2fd',
    accentColor: '#1565c0',
    plateBg: '#d6eaf8',
    hasSlices: false,
    chefIntro: "Irasshaimase! Welcome to my sushi kitchen! Let's create the perfect sushi roll!",
  },
  {
    id: 'sandwich',
    name: 'Sandwich',
    emoji: '🥪',
    description: 'Layer by layer!',
    bgColor: '#fce4ec',
    accentColor: '#c62828',
    plateBg: '#fadbd8',
    hasSlices: false,
    chefIntro: "Right-o! Let's build a cracking sandwich! Layer those lovely ingredients!",
  },
];

export const getMealInfo = (id: MealType): MealInfo =>
  MEALS.find(m => m.id === id)!;
