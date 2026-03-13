// @ts-nocheck
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IngredientShelf } from './IngredientShelf';
import { useGameStore } from '../../store/gameStore';
import { useT } from '../../i18n/useT';
import * as ingredientsModule from '../../data/ingredients';

jest.mock('../../store/gameStore');
jest.mock('../../i18n/useT');
jest.mock('../../data/ingredients');
jest.mock('./IngredientToken', () => ({
  IngredientToken: ({ ingredient, onClick }: any) => (
    <button onClick={onClick} data-testid={`ingredient-${ingredient.id}`}>
      {ingredient.name}
    </button>
  ),
}));
jest.mock('../UI/LearningTooltip', () => ({
  LearningTooltip: ({ children }: any) => <div>{children}</div>,
}));
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('IngredientShelf', () => {
  const mockOnAdd = jest.fn();
  const mockPlateRef = { current: null };
  const mockT = {
    kitchen: { addHint: 'Add ingredients' },
    ingredients: {
      tomato: 'Tomato',
      lettuce: 'Lettuce',
      cheese: 'Cheese',
    },
  };

  const mockIngredients = [
    { id: 'tomato', name: 'Tomato', emoji: '🍅' },
    { id: 'lettuce', name: 'Lettuce', emoji: '🥬' },
    { id: 'cheese', name: 'Cheese', emoji: '🧀' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockPlateRef.current = null;
    (useGameStore as jest.Mock).mockReturnValue({
      selectedMeal: 'lunch',
    });
    (useT as jest.Mock).mockReturnValue(mockT);
    (ingredientsModule.getIngredientsByMeal as jest.Mock).mockReturnValue(
      mockIngredients
    );
  });

  describe('rendering', () => {
    it('should render the ingredient shelf with correct structure', () => {
      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

      expect(screen.getByText('Add ingredients')).toBeInTheDocument();
    });

    it('should render all ingredients from the meal', () => {
      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

      expect(screen.getByTestId('ingredient-tomato')).toBeInTheDocument();
      expect(screen.getByTestId('ingredient-lettuce')).toBeInTheDocument();
      expect(screen.getByTestId('ingredient-cheese')).toBeInTheDocument();
    });

    it('should display translated ingredient names', () => {
      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

      expect(screen.getByText('Tomato')).toBeInTheDocument();
      expect(screen.getByText('Lettuce')).toBeInTheDocument();
      expect(screen.getByText('Cheese')).toBeInTheDocument();
    });

    it('should use fallback name when translation is not available', () => {
      const mockTWithMissingTranslation = {
        ...mockT,
        ingredients: { tomato: 'Tomato' },
      };
      (useT as jest.Mock).mockReturnValue(mockTWithMissingTranslation);

      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

      expect(screen.getByText('Tomato')).toBeInTheDocument();
      expect(screen.getByText('Lettuce')).toBeInTheDocument();
    });

    it('should render with empty ingredients list', () => {
      (ingredientsModule.getIngredientsByMeal as jest.Mock).mockReturnValue([]);

      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

      expect(screen.getByText('Add ingredients')).toBeInTheDocument();
      expect(screen.queryByTestId(/ingredient-/)).not.toBeInTheDocument();
    });
  });

  describe('ingredient selection', () => {
    it('should call onAdd with correct payload when ingredient is clicked', async () => {
      const mockPlate = document.createElement('div');
      mockPlate.getBoundingClientRect = () => ({
        width: 400,
        height: 300,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      } as DOMRect);
      mockPlateRef.current = mockPlate;

      jest.spyOn(Math, 'random').mockReturnValue(0.5);

      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

      const tomatoButton = screen.getByTestId('ingredient-tomato');
      await userEvent.click(tomatoButton);

      expect(mockOnAdd).toHaveBeenCalledTimes(1);
      const callArgs = mockOnAdd.mock.calls[0][0];
      expect(callArgs.ingredientId).toBe('tomato');
      expect(callArgs.x).toBe(220);
      expect(callArgs.y).toBe(170);
      expect(callArgs.rotation).toBeCloseTo(0);
      expect(callArgs.scale).toBeCloseTo(1.0);
      expect(callArgs.instanceId).toMatch(/^tomato-\d+-\d+\.?\d*$/);
    });

    it('should not call onAdd when plate ref is null', async () => {
      mockPlateRef.current = null;

      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

      const tomatoButton = screen.getByTestId('ingredient-tomato');
      await userEvent.click(tomatoButton);

      expect(mockOnAdd).not.toHaveBeenCalled();
    });

    it('should generate unique instanceIds for each ingredient click', async () => {
      const mockPlate = document.createElement('div');
      mockPlate.getBoundingClientRect = () => ({
        width: 400,
        height: 300,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      } as DOMRect);
      mockPlateRef.current = mockPlate;

      jest.spyOn(Math, 'random').mockReturnValue(0.5);
      jest.spyOn(Date, 'now').mockReturnValue(123456);

      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

      const tomatoButton = screen.getByTestId('ingredient-tomato');
      await userEvent.click(tomatoButton);
      await userEvent.click(tomatoButton);

      expect(mockOnAdd).toHaveBeenCalledTimes(2);
      const firstCall = mockOnAdd.mock.calls[0][0].instanceId;
      const secondCall = mockOnAdd.mock.calls[1][0].instanceId;
      expect(firstCall).not.toBe(secondCall);
    });

    it('should place ingredients within plate bounds with margin', async () => {
      const mockPlate = document.createElement('div');
      mockPlate.getBoundingClientRect = () => ({
        width: 100,
        height: 100,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      } as DOMRect);
      mockPlateRef.current = mockPlate;

      jest.spyOn(Math, 'random').mockReturnValue(0.9);

      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

      const tomatoButton = screen.getByTestId('ingredient-tomato');
      await userEvent.click(tomatoButton);

      const callArgs = mockOnAdd.mock.calls[0][0];
      expect(callArgs.x).toBeGreaterThanOrEqual(20);
      expect(callArgs.x).toBeLessThanOrEqual(100);
      expect(callArgs.y).toBeGreaterThanOrEqual(20);
      expect(callArgs.y).toBeLessThanOrEqual(100);
    });
  });

  describe('random positioning and properties', () => {
    beforeEach(() => {
      const mockPlate = document.createElement('div');
      mockPlate.getBoundingClientRect = () => ({
        width: 400,
        height: 300,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      } as DOMRect);
      mockPlateRef.current = mockPlate;
    });

    it('should generate rotation between -15 and 15 degrees', async () => {
      jest.spyOn(Math, 'random').mockReturnValue(0);

      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

      const tomatoButton = screen.getByTestId('ingredient-tomato');
      await userEvent.click(tomatoButton);

      const callArgs = mockOnAdd.mock.calls[0][0];
      expect(callArgs.rotation).toBeGreaterThanOrEqual(-15);
      expect(callArgs.rotation).toBeLessThanOrEqual(15);
    });

    it('should generate scale between 0.85 and 1.15', async () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.5);

      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

      const tomatoButton = screen.getByTestId('ingredient-tomato');
      await userEvent.click(tomatoButton);

      const callArgs = mockOnAdd.mock.calls[0][0];
      expect(callArgs.scale).toBeGreaterThanOrEqual(0.85);
      expect(callArgs.scale).toBeLessThanOrEqual(1.15);
    });

    it('should handle minimum scale boundary', async () => {
      jest.spyOn(Math, 'random').mockReturnValue(0);

      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

      const tomatoButton = screen.getByTestId('ingredient-tomato');
      await userEvent.click(tomatoButton);

      const callArgs = mockOnAdd.mock.calls[0][0];
      expect(callArgs.scale).toBe(0.85);
    });

    it('should handle maximum scale boundary', async () => {
      jest.spyOn(Math, 'random').mockReturnValue(1);

      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

      const tomatoButton = screen.getByTestId('ingredient-tomato');
      await userEvent.click(tomatoButton);

      const callArgs = mockOnAdd.mock.calls[0][0];
      expect(callArgs.scale).toBeCloseTo(1.15);
    });
  });

  describe('game store integration', () => {
    it('should fetch ingredients based on selected meal from store', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'dinner',
      });

      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

      expect(ingredientsModule.getIngredientsByMeal).toHaveBeenCalledWith(
        'dinner'
      );
    });

    it('should handle different meal types', () => {
      const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];

      mealTypes.forEach((meal) => {
        jest.clearAllMocks();
        (useGameStore as jest.Mock).mockReturnValue({
          selectedMeal: meal,
        });
        (ingredientsModule.getIngredientsByMeal as jest.Mock).mockReturnValue(
          mockIngredients
        );

        render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

        expect(ingredientsModule.getIngredientsByMeal).toHaveBeenCalledWith(
          meal
        );
      });
    });
  });

  describe('i18n integration', () => {
    it('should use translation hook for text', () => {
      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

      expect(useT).toHaveBeenCalled();
      expect(screen.getByText('Add ingredients')).toBeInTheDocument();
    });

    it('should translate ingredient names from i18n', () => {
      const customT = {
        ...mockT,
        ingredients: {
          tomato: 'Tomate',
          lettuce: 'Laitue',
          cheese: 'Fromage',
        },
      };
      (useT as jest.Mock).mockReturnValue(customT);

      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

      expect(screen.getByText('Tomate')).toBeInTheDocument();
      expect(screen.getByText('Laitue')).toBeInTheDocument();
      expect(screen.getByText('Fromage')).toBeInTheDocument();
    });
  });

  describe('multiple ingredient interactions', () => {
    it('should handle clicking multiple different ingredients', async () => {
      const mockPlate = document.createElement('div');
      mockPlate.getBoundingClientRect = () => ({
        width: 400,
        height: 300,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      } as DOMRect);
      mockPlateRef.current = mockPlate;

      jest.spyOn(Math, 'random').mockReturnValue(0.5);

      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

      await userEvent.click(screen.getByTestId('ingredient-tomato'));
      await userEvent.click(screen.getByTestId('ingredient-lettuce'));
      await userEvent.click(screen.getByTestId('ingredient-cheese'));

      expect(mockOnAdd).toHaveBeenCalledTimes(3);
      expect(mockOnAdd.mock.calls[0][0].ingredientId).toBe('tomato');
      expect(mockOnAdd.mock.calls[1][0].ingredientId).toBe('lettuce');
      expect(mockOnAdd.mock.calls[2][0].ingredientId).toBe('cheese');
    });
  });
});