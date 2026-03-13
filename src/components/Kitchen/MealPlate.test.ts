// @ts-nocheck
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MealPlate } from '../src/components/Kitchen/MealPlate';
import { useGameStore } from '../src/store/gameStore';
import { useT } from '../src/i18n/useT';
import * as PizzaBaseModule from '../src/components/Kitchen/plates/PizzaBase';
import * as HamburgerStackModule from '../src/components/Kitchen/HamburgerStack';
import * as BurritoAssemblyModule from '../src/components/Kitchen/BurritoAssembly';
import * as SaladAssemblyModule from '../src/components/Kitchen/SaladAssembly';
import * as SushiAssemblyModule from '../src/components/Kitchen/SushiAssembly';
import * as SandwichStackModule from '../src/components/Kitchen/SandwichStack';
import * as ingredientsModule from '../src/data/ingredients';

jest.mock('../src/store/gameStore');
jest.mock('../src/i18n/useT');
jest.mock('../src/components/Kitchen/plates/PizzaBase');
jest.mock('../src/components/Kitchen/HamburgerStack');
jest.mock('../src/components/Kitchen/BurritoAssembly');
jest.mock('../src/components/Kitchen/SaladAssembly');
jest.mock('../src/components/Kitchen/SushiAssembly');
jest.mock('../src/components/Kitchen/SandwichStack');
jest.mock('../src/data/ingredients');

const mockPizzaBase = jest.fn(() => <div data-testid="pizza-base" />);
const mockHamburgerStack = jest.fn(() => <div data-testid="hamburger-stack" />);
const mockBurritoAssembly = jest.fn(() => <div data-testid="burrito-assembly" />);
const mockSaladAssembly = jest.fn(() => <div data-testid="salad-assembly" />);
const mockSushiAssembly = jest.fn(() => <div data-testid="sushi-assembly" />);
const mockSandwichStack = jest.fn(() => <div data-testid="sandwich-stack" />);

describe('MealPlate', () => {
  const mockRemoveIngredient = jest.fn();
  const mockGetIngredientById = jest.fn();
  const plateRef = React.createRef<HTMLDivElement>();

  const mockGameStore = {
    selectedMeal: null,
    placedIngredients: [],
    pizzaSlices: 8,
    removeIngredient: mockRemoveIngredient,
  };

  const mockT = {
    ingredients: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useGameStore as jest.Mock).mockReturnValue(mockGameStore);
    (useT as jest.Mock).mockReturnValue(mockT);
    (PizzaBaseModule.PizzaBase as jest.Mock).mockImplementation(mockPizzaBase);
    (HamburgerStackModule.HamburgerStack as jest.Mock).mockImplementation(mockHamburgerStack);
    (BurritoAssemblyModule.BurritoAssembly as jest.Mock).mockImplementation(mockBurritoAssembly);
    (SaladAssemblyModule.SaladAssembly as jest.Mock).mockImplementation(mockSaladAssembly);
    (SushiAssemblyModule.SushiAssembly as jest.Mock).mockImplementation(mockSushiAssembly);
    (SandwichStackModule.SandwichStack as jest.Mock).mockImplementation(mockSandwichStack);
    (ingredientsModule.getIngredientById as jest.Mock).mockImplementation(mockGetIngredientById);
  });

  describe('null selectedMeal', () => {
    it('should return null when selectedMeal is not set', () => {
      const { container } = render(<MealPlate plateRef={plateRef} />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe('pizza meal', () => {
    it('should render pizza plate with PizzaBase component', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'pizza',
        placedIngredients: [],
      });

      render(<MealPlate plateRef={plateRef} />);
      expect(screen.getByTestId('pizza-base')).toBeInTheDocument();
    });

    it('should not display removal chips when no ingredients are placed', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'pizza',
        placedIngredients: [],
      });

      const { container } = render(<MealPlate plateRef={plateRef} />);
      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBe(0);
    });

    it('should display removal chips for placed ingredients', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: '1' },
        { ingredientId: 'tomato', instanceId: '2' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'pizza',
        placedIngredients,
      });

      mockGetIngredientById.mockImplementation((id) => ({
        id,
        name: id.charAt(0).toUpperCase() + id.slice(1),
        emoji: '🧀',
      }));

      mockT.ingredients = { cheese: 'Cheese', tomato: 'Tomato' };

      render(<MealPlate plateRef={plateRef} />);
      expect(screen.getByText(/Cheese/)).toBeInTheDocument();
      expect(screen.getByText(/Tomato/)).toBeInTheDocument();
    });

    it('should group ingredients by id and show count for duplicates', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: '1' },
        { ingredientId: 'cheese', instanceId: '2' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'pizza',
        placedIngredients,
      });

      mockGetIngredientById.mockReturnValue({
        id: 'cheese',
        name: 'Cheese',
        emoji: '🧀',
      });

      mockT.ingredients = { cheese: 'Cheese' };

      render(<MealPlate plateRef={plateRef} />);
      expect(screen.getByText(/×2/)).toBeInTheDocument();
    });

    it('should call removeIngredient when removal chip is clicked', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: '1' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'pizza',
        placedIngredients,
      });

      mockGetIngredientById.mockReturnValue({
        id: 'cheese',
        name: 'Cheese',
        emoji: '🧀',
      });

      mockT.ingredients = { cheese: 'Cheese' };

      const { container } = render(<MealPlate plateRef={plateRef} />);
      const button = container.querySelector('button');
      button?.click();
      expect(mockRemoveIngredient).toHaveBeenCalledWith('1');
    });

    it('should use ingredient name from store translations', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: '1' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'pizza',
        placedIngredients,
      });

      mockGetIngredientById.mockReturnValue(null);
      mockT.ingredients = { cheese: 'Fromage' };

      render(<MealPlate plateRef={plateRef} />);
      expect(screen.getByText(/Fromage/)).toBeInTheDocument();
    });

    it('should use ingredient id as fallback name', () => {
      const placedIngredients = [
        { ingredientId: 'unknownIngredient', instanceId: '1' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'pizza',
        placedIngredients,
      });

      mockGetIngredientById.mockReturnValue(null);
      mockT.ingredients = {};

      render(<MealPlate plateRef={plateRef} />);
      expect(screen.getByText(/unknownIngredient/)).toBeInTheDocument();
    });

    it('should set correct styles on plate container', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'pizza',
        placedIngredients: [],
      });

      const { container } = render(<MealPlate plateRef={plateRef} />);
      const plate = container.firstChild as HTMLElement;
      expect(plate).toHaveStyle({ position: 'relative', width: '100%', flex: 1, overflow: 'hidden', minHeight: '260px' });
    });

    it('should pass correct props to PizzaBase', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: '1' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 6,
      });

      render(<MealPlate plateRef={plateRef} />);
      expect(mockPizzaBase).toHaveBeenCalledWith(
        expect.objectContaining({
          slices: 6,
          placedIngredients,
        }),
        expect.anything()
      );
    });
  });

  describe('hamburger meal', () => {
    it('should render hamburger plate with HamburgerStack component', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'hamburger',
        placedIngredients: [],
      });

      render(<MealPlate plateRef={plateRef} />);
      expect(screen.getByTestId('hamburger-stack')).toBeInTheDocument();
    });

    it('should show tap instruction when ingredients are placed', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'hamburger',
        placedIngredients: [{ ingredientId: 'lettuce', instanceId: '1' }],
      });

      render(<MealPlate plateRef={plateRef} />);
      expect(screen.getByText(/Tap a layer to remove/)).toBeInTheDocument();
    });

    it('should not show tap instruction when no ingredients are placed', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'hamburger',
        placedIngredients: [],
      });

      render(<MealPlate plateRef={plateRef} />);
      expect(screen.queryByText(/Tap a layer to remove/)).not.toBeInTheDocument();
    });
  });

  describe('burrito meal', () => {
    it('should render burrito plate with BurritoAssembly component', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'burrito',
        placedIngredients: [],
      });

      render(<MealPlate plateRef={plateRef} burritoWrapping={false} />);
      expect(screen.getByTestId('burrito-assembly')).toBeInTheDocument();
    });

    it('should pass wrapping prop to BurritoAssembly', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'burrito',
        placedIngredients: [],
      });

      render(<MealPlate plateRef={plateRef} burritoWrapping={true} />);
      expect(mockBurritoAssembly).toHaveBeenCalledWith(
        expect.objectContaining({
          wrapping: true,
        }),
        expect.anything()
      );
    });

    it('should not display removal chips when wrapping is active', () => {
      const placedIngredients = [
        { ingredientId: 'rice', instanceId: '1' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'burrito',
        placedIngredients,
      });

      const { container } = render(<MealPlate plateRef={plateRef} burritoWrapping={true} />);
      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBe(0);
    });

    it('should display removal chips when wrapping is not active', () => {
      const placedIngredients = [
        { ingredientId: 'rice', instanceId: '1' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'burrito',
        placedIngredients,
      });

      mockGetIngredientById.mockReturnValue({
        id: 'rice',
        name: 'Rice',
        emoji: '🍚',
      });

      mockT.ingredients = { rice: 'Rice' };

      render(<MealPlate plateRef={plateRef} burritoWrapping={false} />);
      expect(screen.getByText(/Rice/)).toBeInTheDocument();
    });

    it('should call removeIngredient when burrito chip is clicked', () => {
      const placedIngredients = [
        { ingredientId: 'rice', instanceId: '1' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'burrito',
        placedIngredients,
      });

      mockGetIngredientById.mockReturnValue({
        id: 'rice',
        name: 'Rice',
        emoji: '🍚',
      });

      mockT.ingredients = { rice: 'Rice' };

      const { container } = render(<MealPlate plateRef={plateRef} burritoWrapping={false} />);
      const button = container.querySelector('button');
      button?.click();
      expect(mockRemoveIngredient).toHaveBeenCalledWith('1');
    });

    it('should default burritoWrapping to false', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'burrito',
        placedIngredients: [{ ingredientId: 'rice', instanceId: '1' }],
      });

      mockGetIngredientById.mockReturnValue({
        id: 'rice',
        name: 'Rice',
        emoji: '🍚',
      });

      mockT.ingredients = { rice: 'Rice' };

      render(<MealPlate plateRef={plateRef} />);
      expect(screen.getByText(/Rice/)).toBeInTheDocument();
    });
  });

  describe('salad meal', () => {
    it('should render salad plate with SaladAssembly component', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'salad',
        placedIngredients: [],
      });

      render(<MealPlate plateRef={plateRef} />);
      expect(screen.getByTestId('salad-assembly')).toBeInTheDocument();
    });

    it('should display removal chips for salad ingredients', () => {
      const placedIngredients = [
        { ingredientId: 'lettuce', instanceId: '1' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'salad',
        placedIngredients,
      });

      mockGetIngredientById.mockReturnValue({
        id: 'lettuce',
        name: 'Lettuce',
        emoji: '🥬',
      });

      mockT.ingredients = { lettuce: 'Lettuce' };

      render(<MealPlate plateRef={plateRef} />);
      expect(screen.getByText(/Lettuce/)).toBeInTheDocument();
    });

    it('should use green color for salad chip border', () => {
      const placedIngredients = [
        { ingredientId: 'lettuce', instanceId: '1' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'salad',
        placedIngredients,
      });

      mockGetIngredientById.mockReturnValue({
        id: 'lettuce',
        name: 'Lettuce',
        emoji: '🥬',
      });

      mockT.ingredients = { lettuce: 'Lettuce' };

      const { container } = render(<MealPlate plateRef={plateRef} />);
      const button = container.querySelector('button') as HTMLElement;
      expect(button).toHaveStyle({ border: '2px solid #2e7d32' });
    });

    it('should call removeIngredient when salad chip is clicked', () => {
      const placedIngredients = [
        { ingredientId: 'lettuce', instanceId: '1' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'salad',
        placedIngredients,
      });

      mockGetIngredientById.mockReturnValue({
        id: 'lettuce',
        name: 'Lettuce',
        emoji: '🥬',
      });

      mockT.ingredients = { lettuce: 'Lettuce' };

      const { container } = render(<MealPlate plateRef={plateRef} />);
      const button = container.querySelector('button');
      button?.click();
      expect(mockRemoveIngredient).toHaveBeenCalledWith('1');
    });

    it('should pass placedIngredients prop to SaladAssembly', () => {
      const placedIngredients = [
        { ingredientId: 'lettuce', instanceId: '1' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'salad',
        placedIngredients,
      });

      render(<MealPlate plateRef={plateRef} />);
      expect(mockSaladAssembly).toHaveBeenCalledWith(
        expect.objectContaining({
          placedIngredients,
        }),
        expect.anything()
      );
    });
  });

  describe('sushi meal', () => {
    it('should render sushi plate with SushiAssembly component', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'sushi',
        placedIngredients: [],
      });

      render(<MealPlate plateRef={plateRef} />);
      expect(screen.getByTestId('sushi-assembly')).toBeInTheDocument();
    });

    it('should display removal chips for sushi ingredients', () => {
      const placedIngredients = [
        { ingredientId: 'salmon', instanceId: '1' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'sushi',
        placedIngredients,
      });

      mockGetIngredientById.mockReturnValue({
        id: 'salmon',
        name: 'Salmon',
        emoji: '🍣',
      });

      mockT.ingredients = { salmon: 'Salmon' };

      render(<MealPlate plateRef={plateRef} />);
      expect(screen.getByText(/Salmon/)).toBeInTheDocument();
    });

    it('should use dark green color for sushi chip border', () => {
      const placedIngredients = [
        { ingredientId: 'salmon', instanceId: '1' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'sushi',
        placedIngredients,
      });

      mockGetIngredientById.mockReturnValue({
        id: 'salmon',
        name: 'Salmon',
        emoji: '🍣',
      });

      mockT.ingredients = { salmon: 'Salmon' };

      const { container } = render(<MealPlate plateRef={plateRef} />);
      const button = container.querySelector('button') as HTMLElement;
      expect(button).toHaveStyle({ border: '2px solid #1c2e1c' });
    });

    it('should call removeIngredient when sushi chip is clicked', () => {
      const placedIngredients = [
        { ingredientId: 'salmon', instanceId: '1' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'sushi',
        placedIngredients,
      });

      mockGetIngredientById.mockReturnValue({
        id: 'salmon',
        name: 'Salmon',
        emoji: '🍣',
      });

      mockT.ingredients = { salmon: 'Salmon' };

      const { container } = render(<MealPlate plateRef={plateRef} />);
      const button = container.querySelector('button');
      button?.click();
      expect(mockRemoveIngredient).toHaveBeenCalledWith('1');
    });

    it('should pass placedIngredients prop to SushiAssembly', () => {
      const placedIngredients = [
        { ingredientId: 'salmon', instanceId: '1' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'sushi',
        placedIngredients,
      });

      render(<MealPlate plateRef={plateRef} />);
      expect(mockSushiAssembly).toHaveBeenCalledWith(
        expect.objectContaining({
          placedIngredients,
        }),
        expect.anything()
      );
    });
  });

  describe('sandwich meal', () => {
    it('should render sandwich plate with SandwichStack component by default', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'sandwich',
        placedIngredients: [],
      });

      render(<MealPlate plateRef={plateRef} />);
      expect(screen.getByTestId('sandwich-stack')).toBeInTheDocument();
    });

    it('should show tap instruction when ingredients are placed', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'sandwich',
        placedIngredients: [{ ingredientId: 'ham', instanceId: '1' }],
      });

      render(<MealPlate plateRef={plateRef} />);
      expect(screen.getByText(/Tap a layer to remove/)).toBeInTheDocument();
    });

    it('should not show tap instruction when no ingredients are placed', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'sandwich',
        placedIngredients: [],
      });

      render(<MealPlate plateRef={plateRef} />);
      expect(screen.queryByText(/Tap a layer to remove/)).not.toBeInTheDocument();
    });

    it('should render sandwich for unknown selectedMeal', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'unknown',
        placedIngredients: [],
      });

      render(<MealPlate plateRef={plateRef} />);
      expect(screen.getByTestId('sandwich-stack')).toBeInTheDocument();
    });
  });

  describe('plateRef', () => {
    it('should attach ref to the plate container', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'pizza',
        placedIngredients: [],
      });

      render(<MealPlate plateRef={plateRef} />);
      expect(plateRef.current).toBeInstanceOf(HTMLDivElement);
    });

    it('should attach ref for all meal types', () => {
      const meals = ['pizza', 'hamburger', 'burrito', 'salad', 'sushi', 'sandwich'];

      meals.forEach((meal) => {
        const testRef = React.createRef<HTMLDivElement>();
        (useGameStore as jest.Mock).mockReturnValue({
          ...mockGameStore,
          selectedMeal: meal,
          placedIngredients: [],
        });

        render(<MealPlate plateRef={testRef} />);
        expect(testRef.current).toBeInstanceOf(HTMLDivElement);
      });
    });
  });

  describe('multiple ingredients of same type', () => {
    it('should show count for pizza', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: '1' },
        { ingredientId: 'cheese', instanceId: '2' },
        { ingredientId: 'cheese', instanceId: '3' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'pizza',
        placedIngredients,
      });

      mockGetIngredientById.mockReturnValue({
        id: 'cheese',
        name: 'Cheese',
        emoji: '🧀',
      });

      mockT.ingredients = { cheese: 'Cheese' };

      render(<MealPlate plateRef={plateRef} />);
      expect(screen.getByText(/×3/)).toBeInTheDocument();
    });

    it('should remove only the last instance when chip is clicked', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: '1' },
        { ingredientId: 'cheese', instanceId: '2' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'pizza',
        placedIngredients,
      });

      mockGetIngredientById.mockReturnValue({
        id: 'cheese',
        name: 'Cheese',
        emoji: '🧀',
      });

      mockT.ingredients = { cheese: 'Cheese' };

      const { container } = render(<MealPlate plateRef={plateRef} />);
      const button = container.querySelector('button');
      button?.click();
      expect(mockRemoveIngredient).toHaveBeenCalledWith('2');
    });
  });

  describe('emoji display', () => {
    it('should display ingredient emoji if available', () => {
      const placedIngredients = [
        { ingredientId: 'tomato', instanceId: '1' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        ...mockGameStore,
        selectedMeal: 'pizza',
        placedIngredients,
      });

      mockGetIngredientById.mockReturnValue({
        id: 'tomato',
        name: 'Tomato',
        emoji: '🍅',
      });

      mockT.ingredients = { tomato: 'Tomato' };

      render(<MealPlate plateRef={plateRef} />);
      expect(screen.getByText(/🍅/)).toBeInTheDocument();
    });
  });
});