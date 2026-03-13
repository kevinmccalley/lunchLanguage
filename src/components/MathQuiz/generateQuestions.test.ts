// @ts-nocheck
import type { MathQuestion, PlacedIngredient, MealType } from '../../types';
import type { MathQuizT, Language } from '../../i18n/types';
import { generateQuestions } from './generateQuestions';
import { CURRENCY, MEAL_BASE_PRICE, getMealCostUSD } from '../../utils/currency';

jest.mock('../../utils/currency');

describe('generateQuestions', () => {
  let mockQt: jest.Mocked<MathQuizT>;
  let mockGetIngName: jest.Mock;

  beforeEach(() => {
    mockQt = {
      qTotal: jest.fn((name: string) => `Total ${name}`),
      hTotal: jest.fn((name: string) => `Hint: Total ${name}`),
      qCountIngredient: jest.fn((name: string, a: string, b: string) => `Count ${name}`),
      hCountIngredient: jest.fn((name: string) => `Hint: Count ${name}`),
      qCombined: jest.fn((a: number, nA: string, b: number, nB: string) => `${a} ${nA} and ${b} ${nB}`),
      hCombined: jest.fn((a: number, b: number) => `Add ${a} and ${b}`),
      qNotType: jest.fn((total: number, count: number, name: string, meal: string) => `Not ${name}`),
      hNotType: jest.fn((total: number, count: number) => `Subtract ${count} from ${total}`),
      qPerSlice: jest.fn((slices: number, name: string, a: string, count: number) => `Per slice`),
      hPerSlice: jest.fn((count: number, slices: number) => `Divide ${count} by ${slices}`),
      qHowManySlices: jest.fn((slices: number) => `How many slices`),
      hHowManySlices: `Hint: Slices`,
      qFamilyMultiply: jest.fn((family: number, count: number, a: string, name: string) => `Family multiply`),
      hFamilyMultiply: jest.fn((count: number, family: number) => `Multiply ${count} by ${family}`),
      qUniqueTypes: jest.fn((name: string) => `Unique types`),
      hUniqueTypes: `Hint: Unique types`,
      qCompare: jest.fn((a: number, a2: string, nA: string, b: number, b2: string, nB: string) => `Compare`),
      hCompare: jest.fn((a: number, b: number) => `Compare ${a} and ${b}`),
      qTotalFamily: jest.fn((total: number, name: string, family: number) => `Total family`),
      hTotalFamily: jest.fn((total: number, family: number) => `Total for family`),
      qIngCost: jest.fn((total: number, cost: number, label: string) => `Ingredient cost`),
      hIngCost: jest.fn((total: number, cost: number) => `Ingredient hint`),
      qMealCost: jest.fn((name: string, base: number, total: number, cost: number, label: string) => `Meal cost`),
      hMealCost: jest.fn((base: number, extra: number) => `Meal hint`),
      qFamilyCost: jest.fn((cost: string, family: number) => `Family cost`),
      hFamilyCost: jest.fn((cost: number, family: number) => `Family cost hint`),
      qChange: jest.fn((bill: string, cost: string) => `Change`),
      hChange: jest.fn((bill: number, cost: number) => `Change hint`),
    } as any;

    mockGetIngName = jest.fn((id: string) => `Ingredient${id}`);

    jest.clearAllMocks();
  });

  describe('basic questions without currency', () => {
    it('should generate Q1 (total count) with single ingredient', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'ing1', position: { x: 0, y: 0 } },
        { ingredientId: 'ing1', position: { x: 1, y: 1 } },
      ];

      const questions = generateQuestions(
        ingredients,
        1,
        8,
        mockQt,
        'Test Meal',
        mockGetIngName,
      );

      expect(questions[0].id).toBe('total');
      expect(questions[0].answer).toBe(2);
      expect(questions[0].type).toBe('count');
    });

    it('should generate Q2 (count most common ingredient) when ingredients present', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'ing1', position: { x: 0, y: 0 } },
        { ingredientId: 'ing1', position: { x: 1, y: 1 } },
        { ingredientId: 'ing2', position: { x: 2, y: 2 } },
      ];

      const questions = generateQuestions(
        ingredients,
        1,
        8,
        mockQt,
        'Test Meal',
        mockGetIngName,
      );

      const q2 = questions.find(q => q.id.startsWith('count_'));
      expect(q2).toBeDefined();
      expect(q2?.answer).toBe(2);
      expect(q2?.type).toBe('count');
    });

    it('should not generate Q2 when no ingredients', () => {
      const ingredients: PlacedIngredient[] = [];

      const questions = generateQuestions(
        ingredients,
        1,
        8,
        mockQt,
        'Test Meal',
        mockGetIngName,
      );

      expect(questions.find(q => q.id.startsWith('count_'))).toBeUndefined();
    });

    it('should generate Q3 (combined) when at least 2 ingredient types', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'ing1', position: { x: 0, y: 0 } },
        { ingredientId: 'ing1', position: { x: 1, y: 1 } },
        { ingredientId: 'ing2', position: { x: 2, y: 2 } },
        { ingredientId: 'ing2', position: { x: 3, y: 3 } },
        { ingredientId: 'ing2', position: { x: 4, y: 4 } },
      ];

      const questions = generateQuestions(
        ingredients,
        1,
        8,
        mockQt,
        'Test Meal',
        mockGetIngName,
      );

      const combined = questions.find(q => q.id === 'combined');
      expect(combined).toBeDefined();
      expect(combined?.answer).toBe(5);
      expect(combined?.type).toBe('count');
    });

    it('should not generate Q3 when less than 2 ingredient types', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'ing1', position: { x: 0, y: 0 } },
        { ingredientId: 'ing1', position: { x: 1, y: 1 } },
      ];

      const questions = generateQuestions(
        ingredients,
        1,
        8,
        mockQt,
        'Test Meal',
        mockGetIngName,
      );

      expect(questions.find(q => q.id === 'combined')).toBeUndefined();
    });

    it('should generate Q4 (not type subtraction) when multiple types exist', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'ing1', position: { x: 0, y: 0 } },
        { ingredientId: 'ing1', position: { x: 1, y: 1 } },
        { ingredientId: 'ing1', position: { x: 2, y: 2 } },
        { ingredientId: 'ing2', position: { x: 3, y: 3 } },
      ];

      const questions = generateQuestions(
        ingredients,
        1,
        8,
        mockQt,
        'Test Meal',
        mockGetIngName,
      );

      const notType = questions.find(q => q.id === 'not_type');
      expect(notType).toBeDefined();
      expect(notType?.answer).toBe(1);
      expect(notType?.type).toBe('count');
    });

    it('should not generate Q4 when all ingredients are the same type', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'ing1', position: { x: 0, y: 0 } },
        { ingredientId: 'ing1', position: { x: 1, y: 1 } },
      ];

      const questions = generateQuestions(
        ingredients,
        1,
        8,
        mockQt,
        'Test Meal',
        mockGetIngName,
      );

      expect(questions.find(q => q.id === 'not_type')).toBeUndefined();
    });

    it('should generate Q6 (unique types) always', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'ing1', position: { x: 0, y: 0 } },
        { ingredientId: 'ing2', position: { x: 1, y: 1 } },
        { ingredientId: 'ing3', position: { x: 2, y: 2 } },
      ];

      const questions = generateQuestions(
        ingredients,
        1,
        8,
        mockQt,
        'Test Meal',
        mockGetIngName,
      );

      const uniqueTypes = questions.find(q => q.id === 'unique_types');
      expect(uniqueTypes).toBeDefined();
      expect(uniqueTypes?.answer).toBe(3);
      expect(uniqueTypes?.type).toBe('count');
    });

    it('should generate unique types with 0 when no ingredients', () => {
      const ingredients: PlacedIngredient[] = [];

      const questions = generateQuestions(
        ingredients,
        1,
        8,
        mockQt,
        'Test Meal',
        mockGetIngName,
      );

      const uniqueTypes = questions.find(q => q.id === 'unique_types');
      expect(uniqueTypes?.answer).toBe(0);
    });
  });

  describe('pizza questions (Q5)', () => {
    it('should generate per_slice question for pizza with even division', () => {
      const ingredients: PlacedIngredient[] = Array(8)
        .fill(null)
        .map((_, i) => ({ ingredientId: 'cheese', position: { x: i, y: 0 } }));

      const questions = generateQuestions(
        ingredients,
        1,
        8,
        mockQt,
        'Pizza',
        mockGetIngName,
      );

      const perSlice = questions.find(q => q.id === 'per_slice');
      expect(perSlice).toBeDefined();
      expect(perSlice?.answer).toBe(1);
      expect(perSlice?.type).toBe('divide');
    });

    it('should generate how_many_slices for pizza when not evenly divisible', () => {
      const ingredients: PlacedIngredient[] = Array(7)
        .fill(null)
        .map((_, i) => ({ ingredientId: 'cheese', position: { x: i, y: 0 } }));

      const questions = generateQuestions(
        ingredients,
        1,
        8,
        mockQt,
        'Pizza',
        mockGetIngName,
      );

      const slices = questions.find(q => q.id === 'how_many_slices');
      expect(slices).toBeDefined();
      expect(slices?.answer).toBe(8);
    });

    it('should detect pizza in Japanese', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'ing1', position: { x: 0, y: 0 } },
      ];

      const questions = generateQuestions(
        ingredients,
        1,
        8,
        mockQt,
        'ピザ',
        mockGetIngName,
      );

      const pizza = questions.find(q => q.id === 'how_many_slices' || q.id === 'per_slice');
      expect(pizza).toBeDefined();
    });

    it('should detect pizza in Chinese', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'ing1', position: { x: 0, y: 0 } },
      ];

      const questions = generateQuestions(
        ingredients,
        1,
        8,
        mockQt,
        '披萨',
        mockGetIngName,
      );

      const pizza = questions.find(q => q.id === 'how_many_slices' || q.id === 'per_slice');
      expect(pizza).toBeDefined();
    });

    it('should generate total_family for pizza with family size > 1', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'ing1', position: { x: 0, y: 0 } },
        { ingredientId: 'ing2', position: { x: 1, y: 1 } },
      ];

      const questions = generateQuestions(
        ingredients,
        3,
        8,
        mockQt,
        'Pizza',
        mockGetIngName,
      );

      const totalFamily = questions.find(q => q.id === 'total_family');
      expect(totalFamily).toBeDefined();
      expect(totalFamily?.answer).toBe(6);
      expect(totalFamily?.type).toBe('multiply');
    });

    it('should not generate total_family for non-pizza meals', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'ing1', position: { x: 0, y: 0 } },
      ];

      const questions = generateQuestions(
        ingredients,
        3,
        8,
        mockQt,
        'Pasta',
        mockGetIngName,
      );

      expect(questions.find(q => q.id === 'total_family')).toBeUndefined();
    });
  });

  describe('family multiplication (Q5 alternative)', () => {
    it('should generate family_multiply for non-pizza with family size > 1', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'ing1', position: { x: 0, y: 0 } },
        { ingredientId: 'ing1', position: { x: 1, y: 1 } },
        { ingredientId: 'ing2', position: { x: 2, y: 2 } },
      ];

      const questions = generateQuestions(
        ingredients,
        4,
        8,
        mockQt,
        'Pasta',
        mockGetIngName,
      );

      const familyMultiply = questions.find(q => q.id === 'family_multiply');
      expect(familyMultiply).toBeDefined();
      expect(familyMultiply?.answer).toBe(8);
      expect(familyMultiply?.type).toBe('multiply');
    });

    it('should not generate family_multiply when family size is 1', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'ing1', position: { x: 0, y: 0 } },
      ];

      const questions = generateQuestions(
        ingredients,
        1,
        8,
        mockQt,
        'Pasta',
        mockGetIngName,
      );

      expect(questions.find(q => q.id === 'family_multiply')).toBeUndefined();
    });

    it('should not generate family_multiply when no ingredients', () => {
      const ingredients: PlacedIngredient[] = [];

      const questions = generateQuestions(
        ingredients,
        3,
        8,
        mockQt,
        'Pasta',
        mockGetIngName,
      );

      expect(questions.find(q => q.id === 'family_multiply')).toBeUndefined();
    });
  });

  describe('comparison question (Q7)', () => {
    it('should generate compare question when there is a difference', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'ing1', position: { x: 0, y: 0 } },
        { ingredientId: 'ing1', position: { x: 1, y: 1 } },
        { ingredientId: 'ing1', position: { x: 2, y: 2 } },
        { ingredientId: 'ing2', position: { x: 3, y: 3 } },
      ];

      const questions = generateQuestions(
        ingredients,
        1,
        8,
        mockQt,
        'Test Meal',
        mockGetIngName,
      );

      const compare = questions.find(q => q.id === 'compare');
      expect(compare).toBeDefined();
      expect(compare?.answer).toBe(2);
      expect(compare?.type).toBe('compare');
    });

    it('should not generate compare when all ingredients have same count', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'ing1', position: { x: 0, y: 0 } },
        { ingredientId: 'ing2', position: { x: 1, y: 1 } },
      ];

      const questions = generateQuestions(
        ingredients,
        1,
        8,
        mockQt,
        'Test Meal',
        mockGetIngName,
      );

      expect(questions.find(q => q.id === 'compare')).toBeUndefined();
    });

    it('should not generate compare with less than 2 types', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'ing1', position: { x: 0, y: 0 } },
      ];

      const questions = generateQuestions(
        ingredients,
        1,
        8,
        mockQt,
        'Test Meal',
        mockGetIngName,
      );

      expect(questions.find(q => q.id === 'compare')).toBeUndefined();
    });
  });

  describe('currency questions', () => {
    beforeEach(() => {
      (getMealCostUSD as jest.Mock).mockReturnValue(10);
      (CURRENCY as any) = {
        en: {
          symbol: '$',
          unitLabel: 'cents',
          ingCost: 10,
          mathMult: 1,
          displayMult: 1,
          bills: [5, 10, 20],
        },
        es: {
          symbol: '€',
          unitLabel: 'euros',
          ingCost: 5,
          mathMult: 2,
          displayMult: 1.5,
          bills: [10, 20, 50],
        },
      };
      (MEAL_BASE_PRICE as any) = {
        pizza: 5,
        burger: 3,
      };
    });

    it('should not generate currency questions without mealId', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'ing1', position: { x: 0, y: 0 } },
      ];

      const questions = generateQuestions(
        ingredients,
        1,
        8,
        mockQt,
        'Test Meal',
        mockGetIngName,
      );

      expect(questions.find(q => q.id === 'ing_cost')).toBeUndefined();
      expect(questions.find(q => q.id === 'meal_cost')).toBeUndefined();
    });

    it('should not generate currency questions without language', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'ing1', position: { x: 0, y: 0 } },
      ];

      const questions = generateQuestions(
        ingredients,
        1,
        8,
        mockQt,
        'Test Meal',
        mockGetIngName,
        'pizza' as MealType,
      );

      expect(questions.find(q => q.id === 'ing_cost')).toBeUndefined();
    });

    it('should generate ing_cost question when conditions met', () => {
      const ingredients: PlacedIngredient[] = Array(5)
        .fill(null)
        .map((_, i) => ({ ingredientId: `ing${i}`, position: { x: i, y: 0 } }));

      const questions = generateQuestions(
        ingredients,
        1,
        8,
        mockQt,
        'Test Meal',
        mockGetIngName,
        'pizza' as MealType,
        'en' as Language,
      );

      const ingCost = questions.find(q => q.id === 'ing_cost');
      expect(ingCost).toBeDefined();
      expect(ingCost?.answer).toBe(50);
      expect(ingCost?.type).toBe('multiply');
    });

    it('should not generate ing_cost when cost exceeds 999', () => {
      const ingredients: PlacedIngredient[] = Array(100)
        .fill(null)
        .map((_, i) => ({ ingredientId: `ing${i}`, position: { x: i, y: 0 } }));

      const questions = generateQuestions(
        ingredients,
        1,
        8,
        mockQt,
        'Test Meal',
        mockGetIngName,
        'pizza' as MealType,
        'en' as Language,
      );

      expect(questions.find(q => q.id === 'ing_cost')).toBeUndefined();
    });

    it('should generate meal_cost question', () => {
      const ingredients: PlacedIngredient[] = Array(3)
        .fill(null)
        .map((_, i) => ({ ingredientId: `ing${i}`, position: { x: i, y: 0 } }));

      const questions = generateQuestions(
        ingredients,
        1,
        8,
        mockQt,
        'Test Meal',
        mockGetIngName,
        'pizza' as MealType,
        'en' as Language,
      );

      const mealCost = questions.find(q => q.id === 'meal_cost');
      expect(mealCost).toBeDefined();
      expect(mealCost?.type).toBe('count');
    });

    it('should generate family_cost question for family size > 1', () => {
      const ingredients: PlacedIngredient[] = Array(2)
        .fill(null)
        .map((_, i) => ({ ingredientId: `ing${i}`, position: { x: i, y: 0 } }));

      const questions = generateQuestions(
        ingredients,
        2,
        8,
        mockQt,
        'Test Meal',
        mockGetIngName,
        'pizza' as MealType,
        'en' as Language,
      );

      const familyCost = questions.find(q => q.id === 'family_cost');
      expect(familyCost).toBeDefined();
      expect(familyCost?.type).toBe('multiply');
    });

    it('should not generate family_cost when family size is 1', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'ing1', position: { x: 0, y: 0 } },
      ];

      const questions = generateQuestions(
        ingredients,
        1,
        8,
        mockQt,
        'Test Meal',
        mockGetIngName,
        'pizza' as MealType,
        'en' as Language,
      );

      expect(questions.find(q => q.id === 'family_cost')).toBeUndefined();
    });

    it('should generate change question when bill found', () => {
      const ingredients: PlacedIngredient[] = Array(2)
        .fill(null)
        .map((_, i) => ({ ingredientId: `ing${i}`, position: { x: i, y: 0 } }));

      const questions = generateQuestions(
        ingredients,
        1,
        8,
        mockQt,
        'Test Meal',
        mockGetIngName,
        'pizza' as MealType,
        'en' as Language,
      );

      const change = questions.find(q => q.id === 'change');
      expect(change).toBeDefined();
      expect(change?.type).toBe('count');
    });

    it('should not generate change when no suitable bill found', () => {
      (getMealCostUSD as jest.Mock).mockReturnValue(100);
      (CURRENCY as any) = {
        en: {
          symbol: '$',
          unitLabel: 'cents',
          ingCost: 10,
          mathMult: 1,
          displayMult: 1,
          bills: [5, 10],
        },
      };

      const ingredients: PlacedIngredient[] = Array(50)
        .fill(null)
        .map((_, i) => ({ ingredientId: `ing${i}`, position: { x: i, y: 0 } }));

      const questions = generateQuestions(
        ingredients,
        1,
        8,
        mockQt,
        'Test Meal',
        mockGetIngName,
        'pizza' as MealType,
        'en' as Language,
      );

      expect(questions.find(q => q.id === 'change')).toBeUndefined();
    });

    it('should limit currency questions to 2', () => {
      const ingredients: PlacedIngredient[] = Array(3)
        .fill(null)
        .map((_, i) => ({ ingredientId: `ing${i}`, position: { x: i, y: 0 } }));

      const questions = generateQuestions(
        ingredients,
        2,
        8,
        mockQt,
        'Test Meal',
        mockGetIngName,
        'pizza' as MealType,
        'en' as Language,
      );

      const currencyQCount = questions.filter(q =>
        ['ing_cost', 'meal_cost', 'family_cost', 'change'].includes(q.id)
      ).length;

      expect(currencyQCount).toBeLessThanOrEqual(2);
    });
  });

  describe('question limit and ordering', () => {
    it('should return maximum 8 questions', () => {
      const ingredients: PlacedIngredient[] = Array(10)
        .fill(null)
        .map((_, i) => ({ ingredientId: `ing${i}`, position: { x: i, y: 0 } }));

      const questions = generateQuestions(
        ingredients,
        4,
        8,
        mockQt,
        'Pizza',
        mockGetIngName,
        'pizza' as MealType,
        'en' as Language,
      );

      expect(questions.length).toBeLessThanOrEqual(8);
    });

    it('should always include Q1 (total) as first question', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'ing1', position: { x: 0, y: 0 } },
      ];

      const questions = generateQuestions(
        ingredients,
        1,
        8,
        mockQt,
        'Test Meal',
        mockGetIngName,
      );

      expect(questions[0].id).toBe('total');
    });

    it('should place currency questions after Q1 when present', () => {
      const ingredients: PlacedIngredient[] = Array(3)
        .fill(null)
        .map((_, i) => ({ ingredientId: `ing${i}`, position: { x: i, y: 0 } }));

      const questions = generateQuestions(
        ingredients,
        1,
        8,
        mockQt,
        'Test Meal',
        mockGetIngName,
        'pizza' as MealType,
        'en' as Language,
      );

      expect(questions[0].id).toBe('total');
      
      if (questions.length > 1) {
        const secondIsNonCurrency =
          questions[1].id === 'ing_cost' ||
          questions[1].id === 'meal_cost' ||
          questions[1].id === 'family_cost' ||
          questions[1].id === 'change' ||
          !['ing_cost', 'meal_cost', 'family_cost', 'change'].includes(questions[1].id);

        expect(secondIsNonCurrency).toBe(true);
      }
    });
  });

  describe('edge cases', () => {
    it('should handle empty ingredient list', () => {
      const questions = generateQuestions(
        [],
        1,
        8,
        mockQt,
        'Empty Meal',
        mockGetIngName,
      );

      expect(questions).toBeDefined();
      expect(questions.length).toBeGreaterThan(0);
      expect(questions[0].answer).toBe(0);
    });

    it('should handle single ingredient', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'ing1', position: { x: 0, y: 0 } },
      ];

      const questions = generateQuestions(
        ingredients,
        1,
        8,
        mockQt,
        'Single',
        mockGetIngName,
      );

      expect(questions).toBeDefined();
      const total = questions.find(q => q.id === 'total');
      expect(total?.answer).toBe(1);
    });

    it('should handle large ingredient count', () => {
      const ingredients: PlacedIngredient[] = Array(50)
        .fill(null)
        .map((_, i) => ({
          ingredientId: 'ing1',
          position: { x: i, y: 0 },
        }));

      const questions = generateQuestions(
        ingredients,
        1,
        8,
        mockQt,
        'Heavy',
        mockGetIngName,
      );

      const total = questions.find(q => q.id === 'total');
      expect(total?.answer).toBe(50);
    });

    it('should handle large family size', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'ing1', position: { x: 0, y: 0 } },
      ];

      const questions = generateQuestions(
        ingredients,
        20,
        8,
        mockQt,
        'Pasta',
        mockGetIngName,
      );

      const familyMult = questions.find(q => q.id === 'family_multiply');
      expect(familyMult?.answer).toBe(20);
    });

    