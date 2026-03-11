import { create } from 'zustand';
import type { GameState, GamePhase, MealType, PlacedIngredient } from '../types';

interface GameStore extends GameState {
  setPhase: (phase: GamePhase) => void;
  selectMeal: (meal: MealType) => void;
  setFamilySize: (size: number) => void;
  addIngredient: (ingredient: PlacedIngredient) => void;
  moveIngredient: (instanceId: string, x: number, y: number) => void;
  removeIngredient: (instanceId: string) => void;
  setPizzaSlices: (slices: number) => void;
  nextQuestion: () => void;
  addScore: (points: number) => void;
  setChefMessage: (msg: string, emotion?: GameState['chefEmotion']) => void;
  reset: () => void;
}

const initialState: GameState = {
  phase: 'welcome',
  selectedMeal: null,
  familySize: 1,
  placedIngredients: [],
  pizzaSlices: 8,
  currentQuestionIndex: 0,
  score: 0,
  correctAnswers: 0,
  chefMessage: '',
  chefEmotion: 'happy',
};

export const useGameStore = create<GameStore>((set) => ({
  ...initialState,

  setPhase: (phase) => set({ phase }),

  selectMeal: (meal) => set({ selectedMeal: meal, placedIngredients: [] }),

  setFamilySize: (familySize) => set({ familySize }),

  addIngredient: (ingredient) =>
    set((state) => ({
      placedIngredients: [...state.placedIngredients, ingredient],
    })),

  moveIngredient: (instanceId, x, y) =>
    set((state) => ({
      placedIngredients: state.placedIngredients.map((i) =>
        i.instanceId === instanceId ? { ...i, x, y } : i
      ),
    })),

  removeIngredient: (instanceId) =>
    set((state) => ({
      placedIngredients: state.placedIngredients.filter(
        (i) => i.instanceId !== instanceId
      ),
    })),

  setPizzaSlices: (pizzaSlices) => set({ pizzaSlices }),

  nextQuestion: () =>
    set((state) => ({
      currentQuestionIndex: state.currentQuestionIndex + 1,
    })),

  addScore: (points) =>
    set((state) => ({
      score: state.score + points,
      correctAnswers: state.correctAnswers + 1,
    })),

  setChefMessage: (chefMessage, chefEmotion = 'happy') =>
    set({ chefMessage, chefEmotion }),

  reset: () => set(initialState),
}));
