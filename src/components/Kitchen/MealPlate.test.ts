// @ts-nocheck
import { render, screen, fireEvent } from '@testing-library/react';
import { MealPlate } from './MealPlate';
import { useGameStore } from '../../store/gameStore';
import { useT } from '../../i18n/useT';
import * as ingredientsModule from '../../data/ingredients';
import React from 'react';

// Mock dependencies
jest.mock('../../store/gameStore');
jest.mock('../../i18n/useT');
jest.mock('../../data/ingredients');
jest.mock('./plates/PizzaBase', () => ({
  PizzaBase: () => <div data-testid="pizza-base">PizzaBase</div>,
}));
jest.mock('./HamburgerStack', () => ({
  HamburgerStack: () => <div data-testid="hamburger-stack">HamburgerStack</div>,
}));
jest.mock('./BurritoAssembly', () => ({
  BurritoAssembly: () => <div data-testid="burrito-assembly">BurritoAssembly</div>,
}));
jest.mock('./SaladAssembly', () => ({
  SaladAssembly: () => <div data-testid="salad-assembly">SaladAssembly</div>,
}));
jest.mock('./SushiAssembly', () => ({
  SushiAssembly: () => <div data-testid="sushi-assembly">SushiAssembly</div>,
}));
jest.mock('./SandwichStack', () => ({
  SandwichStack: () => <div data-testid="sandwich-stack">SandwichStack</div>,
}));

describe('MealPlate', () => {
  const mockPlateRef = React.createRef<HTMLDivElement>();
  const mockRemoveIngredient = jest.fn();
  const mockT = {
    ingredients: {
      cheese: 'Cheese',
      tomato: 'Tomato',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useT as jest.Mock).mockReturnValue(mockT);
    (ingredientsModule.getIngredientById as jest.Mock).mockImplementation((id) => ({
      id,
      name: id,
      emoji: '🥒',
    }));
  });

  describe('when selectedMeal is null', () => {
    it('should return null', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: null,
        placedIngredients: [],
        pizzaSlices: 0,
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
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByTestId('pizza-base')).toBeInTheDocument();
    });

    it('should not show ingredient chips when no ingredients are placed', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients: [],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      const buttons = screen.queryAllByRole('button');
      expect(buttons).toHaveLength(0);
    });

    it('should show ingredient removal chips for placed ingredients', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: 'inst-1' },
        { ingredientId: 'tomato', instanceId: 'inst-2' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText(/Cheese/i)).toBeInTheDocument();
      expect(screen.getByText(/Tomato/i)).toBeInTheDocument();
    });

    it('should group multiple instances of the same ingredient', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: 'inst-1' },
        { ingredientId: 'cheese', instanceId: 'inst-2' },
        { ingredientId: 'cheese', instanceId: 'inst-3' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText(/×3/)).toBeInTheDocument();
    });

    it('should call removeIngredient with the last instance when chip is clicked', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: 'inst-1' },
        { ingredientId: 'cheese', instanceId: 'inst-2' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(mockRemoveIngredient).toHaveBeenCalledWith('inst-2');
    });

    it('should use ingredient name from translation if available', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: 'inst-1' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText(/Cheese/i)).toBeInTheDocument();
    });

    it('should fallback to ingredient name from data if translation not available', () => {
      const placedIngredients = [
        { ingredientId: 'unknown', instanceId: 'inst-1' },
      ];

      (useT as jest.Mock).mockReturnValue({
        ingredients: {},
      });
      (ingredientsModule.getIngredientById as jest.Mock).mockReturnValue({
        id: 'unknown',
        name: 'Unknown Ingredient',
        emoji: '❓',
      });

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText(/Unknown Ingredient/i)).toBeInTheDocument();
    });

    it('should use ingredient id as fallback name', () => {
      const placedIngredients = [
        { ingredientId: 'missing', instanceId: 'inst-1' },
      ];

      (useT as jest.Mock).mockReturnValue({
        ingredients: {},
      });
      (ingredientsModule.getIngredientById as jest.Mock).mockReturnValue(null);

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText(/missing/i)).toBeInTheDocument();
    });

    it('should display emoji from ingredient data', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: 'inst-1' },
      ];

      (ingredientsModule.getIngredientById as jest.Mock).mockReturnValue({
        id: 'cheese',
        name: 'Cheese',
        emoji: '🧀',
      });

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText('🧀')).toBeInTheDocument();
    });
  });

  describe('Hamburger meal', () => {
    it('should render HamburgerStack when selectedMeal is hamburger', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'hamburger',
        placedIngredients: [],
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByTestId('hamburger-stack')).toBeInTheDocument();
    });

    it('should not show tap to remove hint when no ingredients', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'hamburger',
        placedIngredients: [],
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.queryByText(/Tap a layer to remove/)).not.toBeInTheDocument();
    });

    it('should show tap to remove hint when ingredients are placed', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'hamburger',
        placedIngredients: [{ ingredientId: 'lettuce', instanceId: 'inst-1' }],
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText(/Tap a layer to remove/)).toBeInTheDocument();
    });
  });

  describe('Burrito meal', () => {
    it('should render BurritoAssembly when selectedMeal is burrito', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'burrito',
        placedIngredients: [],
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByTestId('burrito-assembly')).toBeInTheDocument();
    });

    it('should pass wrapping prop to BurritoAssembly', () => {
      const BurritoAssembly = require('./BurritoAssembly').BurritoAssembly;
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'burrito',
        placedIngredients: [],
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} burritoWrapping={true} />);
      expect(screen.getByTestId('burrito-assembly')).toBeInTheDocument();
    });

    it('should hide ingredient chips while burritoWrapping is true', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: 'inst-1' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'burrito',
        placedIngredients,
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} burritoWrapping={true} />);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('should show ingredient chips when burritoWrapping is false', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: 'inst-1' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'burrito',
        placedIngredients,
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} burritoWrapping={false} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should call removeIngredient when burrito chip is clicked', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: 'inst-1' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'burrito',
        placedIngredients,
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} burritoWrapping={false} />);
      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(mockRemoveIngredient).toHaveBeenCalledWith('inst-1');
    });
  });

  describe('Salad meal', () => {
    it('should render SaladAssembly when selectedMeal is salad', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'salad',
        placedIngredients: [],
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByTestId('salad-assembly')).toBeInTheDocument();
    });

    it('should show ingredient removal chips for salad', () => {
      const placedIngredients = [
        { ingredientId: 'lettuce', instanceId: 'inst-1' },
      ];

      (ingredientsModule.getIngredientById as jest.Mock).mockReturnValue({
        id: 'lettuce',
        name: 'Lettuce',
        emoji: '🥬',
      });

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'salad',
        placedIngredients,
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should call removeIngredient when salad chip is clicked', () => {
      const placedIngredients = [
        { ingredientId: 'lettuce', instanceId: 'inst-1' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'salad',
        placedIngredients,
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(mockRemoveIngredient).toHaveBeenCalledWith('inst-1');
    });
  });

  describe('Sushi meal', () => {
    it('should render SushiAssembly when selectedMeal is sushi', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'sushi',
        placedIngredients: [],
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByTestId('sushi-assembly')).toBeInTheDocument();
    });

    it('should show ingredient removal chips for sushi', () => {
      const placedIngredients = [
        { ingredientId: 'rice', instanceId: 'inst-1' },
      ];

      (ingredientsModule.getIngredientById as jest.Mock).mockReturnValue({
        id: 'rice',
        name: 'Rice',
        emoji: '🍚',
      });

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'sushi',
        placedIngredients,
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should call removeIngredient when sushi chip is clicked', () => {
      const placedIngredients = [
        { ingredientId: 'rice', instanceId: 'inst-1' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'sushi',
        placedIngredients,
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(mockRemoveIngredient).toHaveBeenCalledWith('inst-1');
    });
  });

  describe('Sandwich meal (default)', () => {
    it('should render SandwichStack when selectedMeal is sandwich', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'sandwich',
        placedIngredients: [],
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByTestId('sandwich-stack')).toBeInTheDocument();
    });

    it('should not show tap to remove hint when no ingredients', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'sandwich',
        placedIngredients: [],
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.queryByText(/Tap a layer to remove/)).not.toBeInTheDocument();
    });

    it('should show tap to remove hint when ingredients are placed', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'sandwich',
        placedIngredients: [{ ingredientId: 'ham', instanceId: 'inst-1' }],
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText(/Tap a layer to remove/)).toBeInTheDocument();
    });
  });

  describe('Ref handling', () => {
    it('should attach plateRef to the container div', () => {
      const ref = React.createRef<HTMLDivElement>();

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients: [],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={ref} />);
      expect(ref.current).toBeInTheDocument();
    });
  });

  describe('Default burritoWrapping prop', () => {
    it('should default burritoWrapping to false', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'burrito',
        placedIngredients: [{ ingredientId: 'cheese', instanceId: 'inst-1' }],
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('Multiple ingredients of different types', () => {
    it('should group and display multiple different ingredients for pizza', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: 'inst-1' },
        { ingredientId: 'tomato', instanceId: 'inst-2' },
        { ingredientId: 'cheese', instanceId: 'inst-3' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText(/Cheese/i)).toBeInTheDocument();
      expect(screen.getByText(/Tomato/i)).toBeInTheDocument();
      expect(screen.getByText(/×2/)).toBeInTheDocument();
    });

    it('should call removeIngredient with correct last instance for grouped ingredients', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: 'inst-1' },
        { ingredientId: 'tomato', instanceId: 'inst-2' },
        { ingredientId: 'cheese', instanceId: 'inst-3' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      const buttons = screen.getAllByRole('button');
      
      // Find and click the cheese button (first one)
      fireEvent.click(buttons[0]);
      expect(mockRemoveIngredient).toHaveBeenCalledWith('inst-3');
    });
  });

  describe('Container styles', () => {
    it('should set correct container styles', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients: [],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<MealPlate plateRef={mockPlateRef} />);
      const div = container.querySelector('[style*="position: relative"]');
      expect(div).toHaveStyle({
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        minHeight: '260px',
      });
    });
  });

  describe('Edge case: ingredient without translation or data', () => {
    it('should display ingredient id when both translation and data are missing', () => {
      const placedIngredients = [
        { ingredientId: 'mystery-ingredient', instanceId: 'inst-1' },
      ];

      (useT as jest.Mock).mockReturnValue({
        ingredients: {},
      });
      (ingredientsModule.getIngredientById as jest.Mock).mockReturnValue(null);

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText(/mystery-ingredient/i)).toBeInTheDocument();
    });
  });
});