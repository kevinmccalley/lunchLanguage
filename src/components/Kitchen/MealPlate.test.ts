// @ts-nocheck
import { render, screen } from '@testing-library/react';
import { MealPlate } from './MealPlate';
import { useGameStore } from '../../store/gameStore';
import { useT } from '../../i18n/useT';
import { getIngredientById } from '../../data/ingredients';
import * as PizzaBaseModule from './plates/PizzaBase';
import * as HamburgerStackModule from './HamburgerStack';
import * as BurritoAssemblyModule from './BurritoAssembly';
import * as SaladAssemblyModule from './SaladAssembly';
import * as SushiAssemblyModule from './SushiAssembly';
import * as SandwichStackModule from './SandwichStack';

jest.mock('../../store/gameStore');
jest.mock('../../i18n/useT');
jest.mock('../../data/ingredients');
jest.mock('./plates/PizzaBase', () => ({
  PizzaBase: jest.fn(() => <div data-testid="pizza-base">PizzaBase</div>),
}));
jest.mock('./HamburgerStack', () => ({
  HamburgerStack: jest.fn(() => <div data-testid="hamburger-stack">HamburgerStack</div>),
}));
jest.mock('./BurritoAssembly', () => ({
  BurritoAssembly: jest.fn(() => <div data-testid="burrito-assembly">BurritoAssembly</div>),
}));
jest.mock('./SaladAssembly', () => ({
  SaladAssembly: jest.fn(() => <div data-testid="salad-assembly">SaladAssembly</div>),
}));
jest.mock('./SushiAssembly', () => ({
  SushiAssembly: jest.fn(() => <div data-testid="sushi-assembly">SushiAssembly</div>),
}));
jest.mock('./SandwichStack', () => ({
  SandwichStack: jest.fn(() => <div data-testid="sandwich-stack">SandwichStack</div>),
}));

describe('MealPlate', () => {
  const mockPlateRef = { current: null };
  const mockRemoveIngredient = jest.fn();
  const mockTranslations = {
    ingredients: {
      'cheese': 'Cheese',
      'tomato': 'Tomato',
      'lettuce': 'Lettuce',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useT as jest.Mock).mockReturnValue(mockTranslations);
    (getIngredientById as jest.Mock).mockImplementation((id: string) => ({
      id,
      name: id.charAt(0).toUpperCase() + id.slice(1),
      emoji: '🥒',
    }));
  });

  describe('when no meal is selected', () => {
    it('should return null', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: null,
        placedIngredients: [],
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<MealPlate plateRef={mockPlateRef} />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe('Pizza meal', () => {
    it('should render PizzaBase when selectedMeal is pizza', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients: [],
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByTestId('pizza-base')).toBeInTheDocument();
    });

    it('should render ingredient removal chips for pizza with placed ingredients', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: '1', position: { x: 0, y: 0 } },
        { ingredientId: 'tomato', instanceId: '2', position: { x: 10, y: 10 } },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText('Cheese')).toBeInTheDocument();
      expect(screen.getByText('Tomato')).toBeInTheDocument();
    });

    it('should not render chips when no ingredients are placed for pizza', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients: [],
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<MealPlate plateRef={mockPlateRef} />);
      const chips = container.querySelectorAll('button');
      expect(chips.length).toBe(0);
    });

    it('should display count when multiple ingredients of same type are placed', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: '1', position: { x: 0, y: 0 } },
        { ingredientId: 'cheese', instanceId: '2', position: { x: 10, y: 10 } },
        { ingredientId: 'cheese', instanceId: '3', position: { x: 20, y: 20 } },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText('×3')).toBeInTheDocument();
    });

    it('should call removeIngredient with last instance when clicking chip for pizza', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: '1', position: { x: 0, y: 0 } },
        { ingredientId: 'cheese', instanceId: '2', position: { x: 10, y: 10 } },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<MealPlate plateRef={mockPlateRef} />);
      const button = container.querySelector('button');
      button?.click();
      expect(mockRemoveIngredient).toHaveBeenCalledWith('2');
    });

    it('should use ingredient emoji from getIngredientById', () => {
      (getIngredientById as jest.Mock).mockReturnValue({
        id: 'cheese',
        name: 'Cheese',
        emoji: '🧀',
      });

      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: '1', position: { x: 0, y: 0 } },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText('🧀')).toBeInTheDocument();
    });

    it('should use id as fallback when ingredient not found in translations or ingredients', () => {
      (getIngredientById as jest.Mock).mockReturnValue(null);
      (useT as jest.Mock).mockReturnValue({ ingredients: {} });

      const placedIngredients = [
        { ingredientId: 'unknown', instanceId: '1', position: { x: 0, y: 0 } },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText('unknown')).toBeInTheDocument();
    });
  });

  describe('Hamburger meal', () => {
    it('should render HamburgerStack when selectedMeal is hamburger', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'hamburger',
        placedIngredients: [],
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByTestId('hamburger-stack')).toBeInTheDocument();
    });

    it('should show removal hint when hamburger has placed ingredients', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: '1', position: { x: 0, y: 0 } },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'hamburger',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText('Tap a layer to remove 🗑️')).toBeInTheDocument();
    });

    it('should not show removal hint when hamburger has no ingredients', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'hamburger',
        placedIngredients: [],
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.queryByText('Tap a layer to remove 🗑️')).not.toBeInTheDocument();
    });
  });

  describe('Burrito meal', () => {
    it('should render BurritoAssembly when selectedMeal is burrito', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'burrito',
        placedIngredients: [],
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByTestId('burrito-assembly')).toBeInTheDocument();
    });

    it('should pass burritoWrapping prop to BurritoAssembly', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'burrito',
        placedIngredients: [],
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} burritoWrapping={true} />);
      expect(PizzaBaseModule.PizzaBase).toHaveBeenCalled();
      expect(BurritoAssemblyModule.BurritoAssembly).toHaveBeenCalledWith(
        expect.objectContaining({ wrapping: true }),
        expect.anything()
      );
    });

    it('should hide ingredient chips when burritoWrapping is true', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: '1', position: { x: 0, y: 0 } },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'burrito',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<MealPlate plateRef={mockPlateRef} burritoWrapping={true} />);
      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBe(0);
    });

    it('should show ingredient chips when burritoWrapping is false', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: '1', position: { x: 0, y: 0 } },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'burrito',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} burritoWrapping={false} />);
      expect(screen.getByText('Cheese')).toBeInTheDocument();
    });

    it('should handle multiple burrito ingredients with counts', () => {
      const placedIngredients = [
        { ingredientId: 'rice', instanceId: '1', position: { x: 0, y: 0 } },
        { ingredientId: 'rice', instanceId: '2', position: { x: 10, y: 10 } },
        { ingredientId: 'beans', instanceId: '3', position: { x: 20, y: 20 } },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'burrito',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} burritoWrapping={false} />);
      expect(screen.getByText('×2')).toBeInTheDocument();
    });
  });

  describe('Salad meal', () => {
    it('should render SaladAssembly when selectedMeal is salad', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'salad',
        placedIngredients: [],
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByTestId('salad-assembly')).toBeInTheDocument();
    });

    it('should render ingredient removal chips for salad', () => {
      const placedIngredients = [
        { ingredientId: 'lettuce', instanceId: '1', position: { x: 0, y: 0 } },
        { ingredientId: 'tomato', instanceId: '2', position: { x: 10, y: 10 } },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'salad',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText('Lettuce')).toBeInTheDocument();
      expect(screen.getByText('Tomato')).toBeInTheDocument();
    });

    it('should use green border color for salad chips', () => {
      const placedIngredients = [
        { ingredientId: 'lettuce', instanceId: '1', position: { x: 0, y: 0 } },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'salad',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<MealPlate plateRef={mockPlateRef} />);
      const button = container.querySelector('button');
      expect(button).toHaveStyle({ border: '2px solid #2e7d32' });
    });

    it('should call removeIngredient when salad chip is clicked', () => {
      const placedIngredients = [
        { ingredientId: 'lettuce', instanceId: '1', position: { x: 0, y: 0 } },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'salad',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<MealPlate plateRef={mockPlateRef} />);
      const button = container.querySelector('button');
      button?.click();
      expect(mockRemoveIngredient).toHaveBeenCalledWith('1');
    });
  });

  describe('Sushi meal', () => {
    it('should render SushiAssembly when selectedMeal is sushi', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'sushi',
        placedIngredients: [],
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByTestId('sushi-assembly')).toBeInTheDocument();
    });

    it('should render ingredient removal chips for sushi', () => {
      const placedIngredients = [
        { ingredientId: 'rice', instanceId: '1', position: { x: 0, y: 0 } },
        { ingredientId: 'nori', instanceId: '2', position: { x: 10, y: 10 } },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'sushi',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText('Rice')).toBeInTheDocument();
      expect(screen.getByText('Nori')).toBeInTheDocument();
    });

    it('should use dark border color for sushi chips', () => {
      const placedIngredients = [
        { ingredientId: 'rice', instanceId: '1', position: { x: 0, y: 0 } },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'sushi',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<MealPlate plateRef={mockPlateRef} />);
      const button = container.querySelector('button');
      expect(button).toHaveStyle({ border: '2px solid #1c2e1c' });
    });

    it('should display multiple sushi ingredients with counts', () => {
      const placedIngredients = [
        { ingredientId: 'rice', instanceId: '1', position: { x: 0, y: 0 } },
        { ingredientId: 'rice', instanceId: '2', position: { x: 5, y: 5 } },
        { ingredientId: 'rice', instanceId: '3', position: { x: 10, y: 10 } },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'sushi',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText('×3')).toBeInTheDocument();
    });
  });

  describe('Sandwich meal (default)', () => {
    it('should render SandwichStack when selectedMeal is sandwich', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'sandwich',
        placedIngredients: [],
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByTestId('sandwich-stack')).toBeInTheDocument();
    });

    it('should render SandwichStack for unknown meal type', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'unknown',
        placedIngredients: [],
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByTestId('sandwich-stack')).toBeInTheDocument();
    });

    it('should show removal hint when sandwich has placed ingredients', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: '1', position: { x: 0, y: 0 } },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'sandwich',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText('Tap a layer to remove 🗑️')).toBeInTheDocument();
    });

    it('should not show removal hint when sandwich has no ingredients', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'sandwich',
        placedIngredients: [],
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.queryByText('Tap a layer to remove 🗑️')).not.toBeInTheDocument();
    });
  });

  describe('ref handling', () => {
    it('should attach ref to plate container for pizza', () => {
      const ref = { current: null };
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients: [],
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={ref} />);
      expect(ref.current).toBeDefined();
    });

    it('should attach ref to plate container for hamburger', () => {
      const ref = { current: null };
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'hamburger',
        placedIngredients: [],
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={ref} />);
      expect(ref.current).toBeDefined();
    });

    it('should attach ref to plate container for burrito', () => {
      const ref = { current: null };
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'burrito',
        placedIngredients: [],
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={ref} />);
      expect(ref.current).toBeDefined();
    });
  });

  describe('burritoWrapping prop', () => {
    it('should default burritoWrapping to false', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'burrito',
        placedIngredients: [{ ingredientId: 'rice', instanceId: '1', position: { x: 0, y: 0 } }],
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(BurritoAssemblyModule.BurritoAssembly).toHaveBeenCalledWith(
        expect.objectContaining({ wrapping: false }),
        expect.anything()
      );
    });

    it('should pass burritoWrapping=true when provided', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'burrito',
        placedIngredients: [],
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} burritoWrapping={true} />);
      expect(BurritoAssemblyModule.BurritoAssembly).toHaveBeenCalledWith(
        expect.objectContaining({ wrapping: true }),
        expect.anything()
      );
    });
  });

  describe('translation fallbacks', () => {
    it('should use translation when available', () => {
      (useT as jest.Mock).mockReturnValue({
        ingredients: { cheese: 'Fromage' },
      });

      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: '1', position: { x: 0, y: 0 } },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText('Fromage')).toBeInTheDocument();
    });

    it('should use ingredient name when translation not available', () => {
      (useT as jest.Mock).mockReturnValue({ ingredients: {} });
      (getIngredientById as jest.Mock).mockReturnValue({
        id: 'cheese',
        name: 'CheeseFromDB',
        emoji: '🧀',
      });

      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: '1', position: { x: 0, y: 0 } },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText('CheeseFromDB')).toBeInTheDocument();
    });

    it('should fallback to id when ingredient not found and translation not available', () => {
      (useT as jest.Mock).mockReturnValue({ ingredients: {} });
      (getIngredientById as jest.Mock).mockReturnValue(null);

      const placedIngredients = [
        { ingredientId: 'unknownIngredient', instanceId: '1', position: { x: 0, y: 0 } },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText('unknownIngredient')).toBeInTheDocument();
    });
  });

  describe('chip styling and behavior', () => {
    it('should render emoji in chip for all meal types with chips', () => {
      (getIngredientById as jest.Mock).mockReturnValue({
        id: 'cheese',
        name: 'Cheese',
        emoji: '🧀',
      });

      const mealTypes = ['pizza', 'burrito', 'salad', 'sushi'];

      mealTypes.forEach(meal => {
        jest.clearAllMocks();
        (useT as jest.Mock).mockReturnValue(mockTranslations);
        (getIngredientById as jest.Mock).mockReturnValue({
          id: 'cheese',
          name: 'Cheese',
          emoji: '🧀',
        });

        const placedIngredients = [
          { ingredientId: 'cheese', instanceId: '1', position: { x: 0, y: 0 } },
        ];

        (useGameStore as jest.Mock).mockReturnValue({
          selectedMeal: meal,
          placedIngredients,
          pizzaSlices: 8,
          removeIngredient: mockRemoveIngredient,
        });

        const { unmount } = render(<MealPlate plateRef={mockPlateRef} />);
        expect(screen.getByText('🧀')).toBeInTheDocument();
        unmount();
      });
    });

    it('should render close button in chip', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: '1', position: { x: 0, y: 0 } },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText('✕')).toBeInTheDocument();
    });
  });

  describe('empty ingredient list handling', () => {
    it('should not render chips section when all meal types have empty placedIngredients', () => {
      const mealTypes = ['pizza', 'burrito', 'salad', 'sushi'];

      mealTypes.forEach(meal => {
        jest.clearAllMocks();
        (useT as jest.Mock).mockReturnValue(mockTranslations);
        (getIngredientById as jest.Mock).mockImplementation((id: string) => ({
          id,
          name: id,
          emoji: '🥒',
        }));

        (useGameStore as jest.Mock).mockReturnValue({
          selectedMeal: meal,
          placedIngredients: [],
          pizzaSlices: 8,
          removeIngredient: mockRemoveIngredient,
        });

        const { container, unmount } = render(<MealPlate plateRef={mockPlateRef} />);
        const buttons = container.querySelectorAll('button');
        expect(buttons.length).toBe(0);
        unmount();
      });
    });
  });

  describe('complex ingredient scenarios', () => {
    it('should handle pizza with many different ingredients', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: '1', position: { x: 0, y: 0 } },
        { ingredientId: 'tomato', instanceId: '2', position: { x: 10, y: 10 } },
        { ingredientId: 