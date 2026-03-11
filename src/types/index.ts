export type MealType = 'pizza' | 'hamburger' | 'burrito' | 'salad' | 'sushi' | 'sandwich';

export type GamePhase =
  | 'welcome'
  | 'mealSelect'
  | 'familySelect'
  | 'cooking'
  | 'mathQuiz'
  | 'celebration';

export interface Ingredient {
  id: string;
  name: string;
  emoji: string;
  color: string;
  meals: MealType[];
  stackable: boolean;
}

export interface PlacedIngredient {
  instanceId: string;
  ingredientId: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

export interface MathQuestion {
  id: string;
  type: 'count' | 'divide' | 'multiply' | 'compare';
  question: string;
  answer: number;
  hint: string;
  visual?: string;
}

export interface GameState {
  phase: GamePhase;
  selectedMeal: MealType | null;
  familySize: number;
  placedIngredients: PlacedIngredient[];
  pizzaSlices: number;
  currentQuestionIndex: number;
  score: number;
  correctAnswers: number;
  chefMessage: string;
  chefEmotion: 'happy' | 'excited' | 'thinking' | 'cheering' | 'pointing';
}
