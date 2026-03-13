// @ts-nocheck
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
  const mockPlateRef = { current: null };
  const mockRemoveIngredient = jest.fn();
  const mockT = {
    ingredients: {
      'ing-1': 'Cheese',
      'ing-2': 'Lettuce',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useT as jest.Mock).mockReturnValue(mockT);
    (useGameStore as jest.Mock).mockReturnValue({
      selectedMeal: null,
      placedIngredients: [],
      pizzaSlices: 4,
      removeIngredient: mockRemoveIngredient,
    });
    (getIngredientById as jest.Mock).mockImplementation((id) => ({
      id,
      name: `Ingredient ${id}`,
      emoji: '🥕',
    }));
  });

  describe('when no meal is selected', () => {
    it('should return null', () => {
      const { container } = render(<MealPlate plateRef={mockPlateRef} />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe('Pizza meal', () => {
    it('should render pizza base when pizza is selected', () => {
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

      const { container } = render(<MealPlate plateRef={mockPlateRef} />);
      const chips = container.querySelectorAll('button');
      expect(chips.length).toBe(0);
    });

    it('should show ingredient chips for placed ingredients', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients: [
          { ingredientId: 'ing-1', instanceId: 'inst-1' },
          { ingredientId: 'ing-2', instanceId: 'inst-2' },
        ],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText(/Cheese/)).toBeInTheDocument();
      expect(screen.getByText(/Lettuce/)).toBeInTheDocument();
    });

    it('should show ingredient count when multiple of same ingredient', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients: [
          { ingredientId: 'ing-1', instanceId: 'inst-1' },
          { ingredientId: 'ing-1', instanceId: 'inst-2' },
          { ingredientId: 'ing-1', instanceId: 'inst-3' },
        ],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText(/×3/)).toBeInTheDocument();
    });

    it('should remove ingredient when chip is clicked', async () => {
      const user = userEvent.setup();
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients: [
          { ingredientId: 'ing-1', instanceId: 'inst-1' },
        ],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      const button = screen.getByRole('button');
      await user.click(button);
      expect(mockRemoveIngredient).toHaveBeenCalledWith('inst-1');
    });

    it('should remove only the last instance when multiple ingredients of same type', async () => {
      const user = userEvent.setup();
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients: [
          { ingredientId: 'ing-1', instanceId: 'inst-1' },
          { ingredientId: 'ing-1', instanceId: 'inst-2' },
        ],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      const button = screen.getByRole('button');
      await user.click(button);
      expect(mockRemoveIngredient).toHaveBeenCalledWith('inst-2');
    });

    it('should use fallback ingredient name when translation missing', () => {
      (useT as jest.Mock).mockReturnValue({
        ingredients: {},
      });
      (getIngredientById as jest.Mock).mockReturnValue({
        id: 'ing-1',
        name: 'Ingredient Cheese',
        emoji: '🧀',
      });

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients: [
          { ingredientId: 'ing-1', instanceId: 'inst-1' },
        ],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText(/Ingredient Cheese/)).toBeInTheDocument();
    });

    it('should use ingredient id as fallback when name and translation missing', () => {
      (useT as jest.Mock).mockReturnValue({
        ingredients: {},
      });
      (getIngredientById as jest.Mock).mockReturnValue(null);

      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients: [
          { ingredientId: 'ing-1', instanceId: 'inst-1' },
        ],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText(/ing-1/)).toBeInTheDocument();
    });
  });

  describe('Hamburger meal', () => {
    it('should render hamburger stack when hamburger is selected', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'hamburger',
        placedIngredients: [],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByTestId('hamburger-stack')).toBeInTheDocument();
    });

    it('should not show removal hint when no ingredients placed', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'hamburger',
        placedIngredients: [],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<MealPlate plateRef={mockPlateRef} />);
      expect(container.textContent).not.toContain('Tap a layer to remove');
    });

    it('should show removal hint when ingredients are placed', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'hamburger',
        placedIngredients: [
          { ingredientId: 'ing-1', instanceId: 'inst-1' },
        ],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText(/Tap a layer to remove/)).toBeInTheDocument();
    });
  });

  describe('Burrito meal', () => {
    it('should render burrito assembly when burrito is selected', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'burrito',
        placedIngredients: [],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} burritoWrapping={false} />);
      expect(screen.getByTestId('burrito-assembly')).toBeInTheDocument();
    });

    it('should show ingredient chips when not wrapping', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'burrito',
        placedIngredients: [
          { ingredientId: 'ing-1', instanceId: 'inst-1' },
        ],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} burritoWrapping={false} />);
      expect(screen.getByText(/Cheese/)).toBeInTheDocument();
    });

    it('should hide ingredient chips while wrapping', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'burrito',
        placedIngredients: [
          { ingredientId: 'ing-1', instanceId: 'inst-1' },
        ],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<MealPlate plateRef={mockPlateRef} burritoWrapping={true} />);
      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBe(0);
    });

    it('should remove ingredient when chip clicked', async () => {
      const user = userEvent.setup();
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'burrito',
        placedIngredients: [
          { ingredientId: 'ing-1', instanceId: 'inst-1' },
        ],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} burritoWrapping={false} />);
      const button = screen.getByRole('button');
      await user.click(button);
      expect(mockRemoveIngredient).toHaveBeenCalledWith('inst-1');
    });
  });

  describe('Salad meal', () => {
    it('should render salad assembly when salad is selected', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'salad',
        placedIngredients: [],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByTestId('salad-assembly')).toBeInTheDocument();
    });

    it('should show ingredient chips for salad', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'salad',
        placedIngredients: [
          { ingredientId: 'ing-1', instanceId: 'inst-1' },
        ],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText(/Cheese/)).toBeInTheDocument();
    });

    it('should not show chips when no ingredients placed', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'salad',
        placedIngredients: [],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<MealPlate plateRef={mockPlateRef} />);
      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBe(0);
    });

    it('should remove ingredient when chip clicked for salad', async () => {
      const user = userEvent.setup();
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'salad',
        placedIngredients: [
          { ingredientId: 'ing-1', instanceId: 'inst-1' },
        ],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      const button = screen.getByRole('button');
      await user.click(button);
      expect(mockRemoveIngredient).toHaveBeenCalledWith('inst-1');
    });
  });

  describe('Sushi meal', () => {
    it('should render sushi assembly when sushi is selected', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'sushi',
        placedIngredients: [],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByTestId('sushi-assembly')).toBeInTheDocument();
    });

    it('should show ingredient chips for sushi', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'sushi',
        placedIngredients: [
          { ingredientId: 'ing-2', instanceId: 'inst-1' },
        ],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText(/Lettuce/)).toBeInTheDocument();
    });

    it('should not show chips when no ingredients', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'sushi',
        placedIngredients: [],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<MealPlate plateRef={mockPlateRef} />);
      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBe(0);
    });

    it('should remove ingredient when chip clicked for sushi', async () => {
      const user = userEvent.setup();
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'sushi',
        placedIngredients: [
          { ingredientId: 'ing-2', instanceId: 'inst-1' },
        ],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      const button = screen.getByRole('button');
      await user.click(button);
      expect(mockRemoveIngredient).toHaveBeenCalledWith('inst-1');
    });
  });

  describe('Sandwich meal (default)', () => {
    it('should render sandwich stack when sandwich is selected', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'sandwich',
        placedIngredients: [],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByTestId('sandwich-stack')).toBeInTheDocument();
    });

    it('should not show removal hint when no ingredients placed', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'sandwich',
        placedIngredients: [],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<MealPlate plateRef={mockPlateRef} />);
      expect(container.textContent).not.toContain('Tap a layer to remove');
    });

    it('should show removal hint when ingredients are placed', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'sandwich',
        placedIngredients: [
          { ingredientId: 'ing-1', instanceId: 'inst-1' },
        ],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText(/Tap a layer to remove/)).toBeInTheDocument();
    });
  });

  describe('plateRef handling', () => {
    it('should attach ref to plate div', () => {
      const ref = { current: null };
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients: [],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<MealPlate plateRef={ref} />);
      const plateDiv = container.querySelector('[style*="position: relative"]');
      expect(plateDiv).toBeInTheDocument();
    });
  });

  describe('burritoWrapping prop', () => {
    it('should use default false value when not provided', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'burrito',
        placedIngredients: [
          { ingredientId: 'ing-1', instanceId: 'inst-1' },
        ],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText(/Cheese/)).toBeInTheDocument();
    });

    it('should accept true value', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'burrito',
        placedIngredients: [
          { ingredientId: 'ing-1', instanceId: 'inst-1' },
        ],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<MealPlate plateRef={mockPlateRef} burritoWrapping={true} />);
      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBe(0);
    });
  });

  describe('edge cases', () => {
    it('should handle many ingredients of different types', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients: [
          { ingredientId: 'ing-1', instanceId: 'inst-1' },
          { ingredientId: 'ing-2', instanceId: 'inst-2' },
          { ingredientId: 'ing-1', instanceId: 'inst-3' },
          { ingredientId: 'ing-2', instanceId: 'inst-4' },
        ],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<MealPlate plateRef={mockPlateRef} />);
      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBe(2);
    });

    it('should handle empty string meal selection as falsy', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: '',
        placedIngredients: [],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<MealPlate plateRef={mockPlateRef} />);
      expect(container.firstChild).toBeNull();
    });

    it('should handle undefined meal selection', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: undefined,
        placedIngredients: [],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<MealPlate plateRef={mockPlateRef} />);
      expect(container.firstChild).toBeNull();
    });

    it('should pass correct props to assembly components', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'burrito',
        placedIngredients: [{ ingredientId: 'ing-1', instanceId: 'inst-1' }],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      });

      jest.spyOn(BurritoAssemblyModule, 'BurritoAssembly').mockReturnValue(<div>Burrito</div>);
      render(<MealPlate plateRef={mockPlateRef} burritoWrapping={true} />);
      expect(BurritoAssemblyModule.BurritoAssembly).toHaveBeenCalled();
    });
  });
});