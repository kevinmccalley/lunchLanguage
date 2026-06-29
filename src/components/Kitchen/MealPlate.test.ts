// @ts-nocheck
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
jest.mock('framer-motion', () => ({
  motion: {
    button: ({ children, onClick, ...props }: any) => (
      <button onClick={onClick} {...props}>
        {children}
      </button>
    ),
  },
}));
jest.mock('./plates/PizzaBase', () => ({
  PizzaBase: () => <div data-testid="pizza-base">Pizza Base</div>,
}));
jest.mock('./HamburgerStack', () => ({
  HamburgerStack: () => <div data-testid="hamburger-stack">Hamburger Stack</div>,
}));
jest.mock('./BurritoAssembly', () => ({
  BurritoAssembly: () => <div data-testid="burrito-assembly">Burrito Assembly</div>,
}));
jest.mock('./SaladAssembly', () => ({
  SaladAssembly: () => <div data-testid="salad-assembly">Salad Assembly</div>,
}));
jest.mock('./SushiAssembly', () => ({
  SushiAssembly: () => <div data-testid="sushi-assembly">Sushi Assembly</div>,
}));
jest.mock('./SandwichStack', () => ({
  SandwichStack: () => <div data-testid="sandwich-stack">Sandwich Stack</div>,
}));

describe('MealPlate', () => {
  const mockRemoveIngredient = jest.fn();
  const mockUseGameStore = useGameStore as jest.MockedFunction<typeof useGameStore>;
  const mockUseT = useT as jest.MockedFunction<typeof useT>;
  const mockGetIngredientById = getIngredientById as jest.MockedFunction<typeof getIngredientById>;

  const plateRef = React.createRef<HTMLDivElement>();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseT.mockReturnValue({
      ingredients: {
        'cheese': 'Cheese',
        'tomato': 'Tomato',
        'lettuce': 'Lettuce',
      },
    } as any);
    mockRemoveIngredient.mockClear();
  });

  describe('when selectedMeal is null', () => {
    it('should return null', () => {
      mockUseGameStore.mockReturnValue({
        selectedMeal: null,
        placedIngredients: [],
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      } as any);

      const { container } = render(<MealPlate plateRef={plateRef} />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe('when selectedMeal is pizza', () => {
    it('should render PizzaBase component', () => {
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients: [],
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      } as any);

      render(<MealPlate plateRef={plateRef} />);
      expect(screen.getByTestId('pizza-base')).toBeInTheDocument();
    });

    it('should render ingredient removal chips when ingredients are placed', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: '1', x: 0, y: 0 },
        { ingredientId: 'tomato', instanceId: '2', x: 10, y: 10 },
      ];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockImplementation((id) => ({
        id,
        name: id === 'cheese' ? 'Cheese' : 'Tomato',
        emoji: id === 'cheese' ? '🧀' : '🍅',
      } as any));

      render(<MealPlate plateRef={plateRef} />);
      expect(screen.getByText(/Cheese/)).toBeInTheDocument();
      expect(screen.getByText(/Tomato/)).toBeInTheDocument();
    });

    it('should not render chips when no ingredients are placed', () => {
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients: [],
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      } as any);

      const { container } = render(<MealPlate plateRef={plateRef} />);
      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBe(0);
    });

    it('should display ingredient count when multiple same ingredients are placed', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: '1', x: 0, y: 0 },
        { ingredientId: 'cheese', instanceId: '2', x: 5, y: 5 },
        { ingredientId: 'tomato', instanceId: '3', x: 10, y: 10 },
      ];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockImplementation((id) => ({
        id,
        name: id === 'cheese' ? 'Cheese' : 'Tomato',
        emoji: id === 'cheese' ? '🧀' : '🍅',
      } as any));

      render(<MealPlate plateRef={plateRef} />);
      expect(screen.getByText('×2')).toBeInTheDocument();
    });

    it('should call removeIngredient with last instanceId when chip is clicked', async () => {
      const user = userEvent.setup();
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: '1', x: 0, y: 0 },
        { ingredientId: 'cheese', instanceId: '2', x: 5, y: 5 },
      ];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockImplementation((id) => ({
        id,
        name: 'Cheese',
        emoji: '🧀',
      } as any));

      render(<MealPlate plateRef={plateRef} />);
      const cheeseButton = screen.getByText(/Cheese/);
      await user.click(cheeseButton);
      expect(mockRemoveIngredient).toHaveBeenCalledWith('2');
    });

    it('should use fallback name when ingredient not found in translations', () => {
      const placedIngredients = [
        { ingredientId: 'unknown', instanceId: '1', x: 0, y: 0 },
      ];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockUseT.mockReturnValue({
        ingredients: {},
      } as any);
      mockGetIngredientById.mockReturnValue({
        id: 'unknown',
        name: 'Unknown Ingredient',
        emoji: '❓',
      } as any);

      render(<MealPlate plateRef={plateRef} />);
      expect(screen.getByText(/Unknown Ingredient/)).toBeInTheDocument();
    });

    it('should use ingredient id as fallback when no translation or ingredient found', () => {
      const placedIngredients = [
        { ingredientId: 'mystery', instanceId: '1', x: 0, y: 0 },
      ];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockUseT.mockReturnValue({
        ingredients: {},
      } as any);
      mockGetIngredientById.mockReturnValue(null);

      render(<MealPlate plateRef={plateRef} />);
      expect(screen.getByText(/mystery/)).toBeInTheDocument();
    });
  });

  describe('when selectedMeal is hamburger', () => {
    it('should render HamburgerStack component', () => {
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'hamburger',
        placedIngredients: [],
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      } as any);

      render(<MealPlate plateRef={plateRef} />);
      expect(screen.getByTestId('hamburger-stack')).toBeInTheDocument();
    });

    it('should show tap instruction when ingredients are placed', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: '1', x: 0, y: 0 },
      ];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'hamburger',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      } as any);

      render(<MealPlate plateRef={plateRef} />);
      expect(screen.getByText(/Tap a layer to remove/)).toBeInTheDocument();
    });

    it('should not show tap instruction when no ingredients are placed', () => {
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'hamburger',
        placedIngredients: [],
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      } as any);

      const { queryByText } = render(<MealPlate plateRef={plateRef} />);
      expect(queryByText(/Tap a layer to remove/)).not.toBeInTheDocument();
    });
  });

  describe('when selectedMeal is burrito', () => {
    it('should render BurritoAssembly component', () => {
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'burrito',
        placedIngredients: [],
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      } as any);

      render(<MealPlate plateRef={plateRef} />);
      expect(screen.getByTestId('burrito-assembly')).toBeInTheDocument();
    });

    it('should render ingredient chips when not wrapping', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: '1', x: 0, y: 0 },
      ];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'burrito',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockReturnValue({
        id: 'cheese',
        name: 'Cheese',
        emoji: '🧀',
      } as any);

      render(<MealPlate plateRef={plateRef} burritoWrapping={false} />);
      expect(screen.getByText(/Cheese/)).toBeInTheDocument();
    });

    it('should hide ingredient chips when wrapping', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: '1', x: 0, y: 0 },
      ];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'burrito',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockReturnValue({
        id: 'cheese',
        name: 'Cheese',
        emoji: '🧀',
      } as any);

      const { queryByText } = render(<MealPlate plateRef={plateRef} burritoWrapping={true} />);
      expect(queryByText(/Cheese/)).not.toBeInTheDocument();
    });

    it('should call removeIngredient when chip is clicked', async () => {
      const user = userEvent.setup();
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: '1', x: 0, y: 0 },
      ];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'burrito',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockReturnValue({
        id: 'cheese',
        name: 'Cheese',
        emoji: '🧀',
      } as any);

      render(<MealPlate plateRef={plateRef} burritoWrapping={false} />);
      const button = screen.getByText(/Cheese/);
      await user.click(button);
      expect(mockRemoveIngredient).toHaveBeenCalledWith('1');
    });
  });

  describe('when selectedMeal is salad', () => {
    it('should render SaladAssembly component', () => {
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'salad',
        placedIngredients: [],
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      } as any);

      render(<MealPlate plateRef={plateRef} />);
      expect(screen.getByTestId('salad-assembly')).toBeInTheDocument();
    });

    it('should render ingredient chips with green border', () => {
      const placedIngredients = [
        { ingredientId: 'lettuce', instanceId: '1', x: 0, y: 0 },
      ];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'salad',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockReturnValue({
        id: 'lettuce',
        name: 'Lettuce',
        emoji: '🥬',
      } as any);

      const { container } = render(<MealPlate plateRef={plateRef} />);
      const button = container.querySelector('button');
      expect(button).toHaveStyle('border: 2px solid #2e7d32');
    });

    it('should call removeIngredient when chip is clicked', async () => {
      const user = userEvent.setup();
      const placedIngredients = [
        { ingredientId: 'lettuce', instanceId: '1', x: 0, y: 0 },
      ];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'salad',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockReturnValue({
        id: 'lettuce',
        name: 'Lettuce',
        emoji: '🥬',
      } as any);

      render(<MealPlate plateRef={plateRef} />);
      const button = screen.getByText(/Lettuce/);
      await user.click(button);
      expect(mockRemoveIngredient).toHaveBeenCalledWith('1');
    });
  });

  describe('when selectedMeal is sushi', () => {
    it('should render SushiAssembly component', () => {
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'sushi',
        placedIngredients: [],
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      } as any);

      render(<MealPlate plateRef={plateRef} />);
      expect(screen.getByTestId('sushi-assembly')).toBeInTheDocument();
    });

    it('should render ingredient chips with dark border', () => {
      const placedIngredients = [
        { ingredientId: 'nori', instanceId: '1', x: 0, y: 0 },
      ];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'sushi',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockReturnValue({
        id: 'nori',
        name: 'Nori',
        emoji: '🍱',
      } as any);

      const { container } = render(<MealPlate plateRef={plateRef} />);
      const button = container.querySelector('button');
      expect(button).toHaveStyle('border: 2px solid #1c2e1c');
    });

    it('should call removeIngredient when chip is clicked', async () => {
      const user = userEvent.setup();
      const placedIngredients = [
        { ingredientId: 'nori', instanceId: '1', x: 0, y: 0 },
      ];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'sushi',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockReturnValue({
        id: 'nori',
        name: 'Nori',
        emoji: '🍱',
      } as any);

      render(<MealPlate plateRef={plateRef} />);
      const button = screen.getByText(/Nori/);
      await user.click(button);
      expect(mockRemoveIngredient).toHaveBeenCalledWith('1');
    });
  });

  describe('when selectedMeal is sandwich (default)', () => {
    it('should render SandwichStack component', () => {
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'sandwich',
        placedIngredients: [],
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      } as any);

      render(<MealPlate plateRef={plateRef} />);
      expect(screen.getByTestId('sandwich-stack')).toBeInTheDocument();
    });

    it('should show tap instruction when ingredients are placed', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: '1', x: 0, y: 0 },
      ];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'sandwich',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      } as any);

      render(<MealPlate plateRef={plateRef} />);
      expect(screen.getByText(/Tap a layer to remove/)).toBeInTheDocument();
    });

    it('should not show tap instruction when no ingredients are placed', () => {
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'sandwich',
        placedIngredients: [],
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      } as any);

      const { queryByText } = render(<MealPlate plateRef={plateRef} />);
      expect(queryByText(/Tap a layer to remove/)).not.toBeInTheDocument();
    });
  });

  describe('ref assignment', () => {
    it('should assign plateRef correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients: [],
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      } as any);

      render(<MealPlate plateRef={ref} />);
      expect(ref.current).not.toBeNull();
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('burritoWrapping prop', () => {
    it('should default to false', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: '1', x: 0, y: 0 },
      ];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'burrito',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockReturnValue({
        id: 'cheese',
        name: 'Cheese',
        emoji: '🧀',
      } as any);

      render(<MealPlate plateRef={plateRef} />);
      expect(screen.getByText(/Cheese/)).toBeInTheDocument();
    });

    it('should respect passed value', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: '1', x: 0, y: 0 },
      ];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'burrito',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockReturnValue({
        id: 'cheese',
        name: 'Cheese',
        emoji: '🧀',
      } as any);

      const { queryByText } = render(<MealPlate plateRef={plateRef} burritoWrapping={true} />);
      expect(queryByText(/Cheese/)).not.toBeInTheDocument();
    });
  });

  describe('ingredient grouping', () => {
    it('should group ingredients by id correctly', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: '1', x: 0, y: 0 },
        { ingredientId: 'tomato', instanceId: '2', x: 5, y: 5 },
        { ingredientId: 'cheese', instanceId: '3', x: 10, y: 10 },
      ];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockImplementation((id) => ({
        id,
        name: id === 'cheese' ? 'Cheese' : 'Tomato',
        emoji: id === 'cheese' ? '🧀' : '🍅',
      } as any));

      render(<MealPlate plateRef={plateRef} />);
      const cheeseButtons = screen.getAllByText(/Cheese/);
      expect(cheeseButtons).toHaveLength(1);
      expect(screen.getByText('×2')).toBeInTheDocument();
    });

    it('should remove last instanceId from grouped ingredients', async () => {
      const user = userEvent.setup();
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: '1', x: 0, y: 0 },
        { ingredientId: 'cheese', instanceId: '2', x: 5, y: 5 },
        { ingredientId: 'cheese', instanceId: '3', x: 10, y: 10 },
      ];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockReturnValue({
        id: 'cheese',
        name: 'Cheese',
        emoji: '🧀',
      } as any);

      render(<MealPlate plateRef={plateRef} />);
      const button = screen.getByText(/Cheese/);
      await user.click(button);
      expect(mockRemoveIngredient).toHaveBeenCalledWith('3');
    });
  });

  describe('styling and layout', () => {
    it('should set correct container styles', () => {
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients: [],
        pizzaSlices: 8,
        removeIngredient: mockRemoveIngredient,
      } as any);

      const { container } = render(<MealPlate plateRef={plateRef} />);
      const mainDiv = container.querySelector('div');
      expect(mainDiv).toHaveStyle('position: relative');
      expect(mainDiv).toHaveStyle('width: 100%');
      expect(mainDiv).toHaveStyle('flex: 1');
      expect(mainDiv).toHaveStyle('overflow: hidden');
      expect(mainDiv).toHaveStyle('minHeight: 260');
    });
  });
});