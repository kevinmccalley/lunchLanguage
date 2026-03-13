// @ts-nocheck
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MealPlate } from './MealPlate';
import { useGameStore } from '../../store/gameStore';
import { useT } from '../../i18n/useT';
import { getIngredientById } from '../../data/ingredients';

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
jest.mock('framer-motion', () => ({
  motion: {
    button: ({ children, onClick, ...props }: any) => (
      <button onClick={onClick} {...props}>
        {children}
      </button>
    ),
  },
}));

describe('MealPlate', () => {
  const mockPlateRef = React.createRef<HTMLDivElement>();
  const mockRemoveIngredient = jest.fn();
  const mockUseGameStore = useGameStore as jest.MockedFunction<typeof useGameStore>;
  const mockUseT = useT as jest.MockedFunction<typeof useT>;
  const mockGetIngredientById = getIngredientById as jest.MockedFunction<typeof getIngredientById>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseT.mockReturnValue({
      ingredients: {
        cheese: 'Cheese',
        tomato: 'Tomato',
        lettuce: 'Lettuce',
      },
    } as any);
  });

  describe('when selectedMeal is null', () => {
    it('should return null', () => {
      mockUseGameStore.mockReturnValue({
        selectedMeal: null,
        placedIngredients: [],
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      } as any);

      const { container } = render(<MealPlate plateRef={mockPlateRef} />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe('when selectedMeal is pizza', () => {
    it('should render PizzaBase component', () => {
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients: [],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      } as any);

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByTestId('pizza-base')).toBeInTheDocument();
    });

    it('should render plate div with correct styling', () => {
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients: [],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      } as any);

      const { container } = render(<MealPlate plateRef={mockPlateRef} />);
      const plateDiv = container.querySelector('[style*="position: relative"]');
      expect(plateDiv).toHaveStyle({ minHeight: '260px', flex: '1', overflow: 'hidden' });
    });

    it('should not render removal chips when no ingredients placed', () => {
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients: [],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      } as any);

      render(<MealPlate plateRef={mockPlateRef} />);
      const buttons = screen.queryAllByRole('button');
      expect(buttons.length).toBe(0);
    });

    it('should render removal chips for placed ingredients', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: 'cheese-1' },
        { ingredientId: 'tomato', instanceId: 'tomato-1' },
      ];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockImplementation((id) => ({
        id,
        name: id,
        emoji: '🧀' + id,
      }));

      render(<MealPlate plateRef={mockPlateRef} />);
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBe(2);
    });

    it('should display ingredient count when multiple of same type', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: 'cheese-1' },
        { ingredientId: 'cheese', instanceId: 'cheese-2' },
      ];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockReturnValue({
        id: 'cheese',
        name: 'Cheese',
        emoji: '🧀',
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText('×2')).toBeInTheDocument();
    });

    it('should call removeIngredient with last item instance when chip clicked', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: 'cheese-1' },
        { ingredientId: 'cheese', instanceId: 'cheese-2' },
      ];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockReturnValue({
        id: 'cheese',
        name: 'Cheese',
        emoji: '🧀',
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      const buttons = screen.getAllByRole('button');
      fireEvent.click(buttons[0]);
      expect(mockRemoveIngredient).toHaveBeenCalledWith('cheese-2');
    });

    it('should use translated ingredient name when available', () => {
      const placedIngredients = [{ ingredientId: 'cheese', instanceId: 'cheese-1' }];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockReturnValue({
        id: 'cheese',
        name: 'CheeseEnglish',
        emoji: '🧀',
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText('Cheese')).toBeInTheDocument();
    });

    it('should fall back to ingredient name when translation not available', () => {
      const placedIngredients = [{ ingredientId: 'unknown', instanceId: 'unknown-1' }];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockReturnValue({
        id: 'unknown',
        name: 'UnknownName',
        emoji: '❓',
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText('UnknownName')).toBeInTheDocument();
    });

    it('should fall back to id when no ingredient found', () => {
      const placedIngredients = [{ ingredientId: 'nonexistent', instanceId: 'nonexistent-1' }];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockReturnValue(null);
      mockUseT.mockReturnValue({
        ingredients: {},
      } as any);

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText('nonexistent')).toBeInTheDocument();
    });
  });

  describe('when selectedMeal is hamburger', () => {
    it('should render HamburgerStack component', () => {
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'hamburger',
        placedIngredients: [],
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      } as any);

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByTestId('hamburger-stack')).toBeInTheDocument();
    });

    it('should not show removal hint when no ingredients', () => {
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'hamburger',
        placedIngredients: [],
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      } as any);

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.queryByText(/Tap a layer to remove/)).not.toBeInTheDocument();
    });

    it('should show removal hint when ingredients placed', () => {
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'hamburger',
        placedIngredients: [{ ingredientId: 'cheese', instanceId: 'cheese-1' }],
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      } as any);

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText(/Tap a layer to remove/)).toBeInTheDocument();
    });
  });

  describe('when selectedMeal is burrito', () => {
    it('should render BurritoAssembly component', () => {
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'burrito',
        placedIngredients: [],
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      } as any);

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByTestId('burrito-assembly')).toBeInTheDocument();
    });

    it('should pass wrapping prop to BurritoAssembly', () => {
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'burrito',
        placedIngredients: [],
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      } as any);

      render(<MealPlate plateRef={mockPlateRef} burritoWrapping={true} />);
      expect(screen.getByTestId('burrito-assembly')).toBeInTheDocument();
    });

    it('should not show removal chips while wrapping', () => {
      const placedIngredients = [{ ingredientId: 'cheese', instanceId: 'cheese-1' }];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'burrito',
        placedIngredients,
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockReturnValue({
        id: 'cheese',
        name: 'Cheese',
        emoji: '🧀',
      });

      render(<MealPlate plateRef={mockPlateRef} burritoWrapping={true} />);
      const buttons = screen.queryAllByRole('button');
      expect(buttons.length).toBe(0);
    });

    it('should show removal chips when not wrapping', () => {
      const placedIngredients = [{ ingredientId: 'cheese', instanceId: 'cheese-1' }];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'burrito',
        placedIngredients,
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockReturnValue({
        id: 'cheese',
        name: 'Cheese',
        emoji: '🧀',
      });

      render(<MealPlate plateRef={mockPlateRef} burritoWrapping={false} />);
      const buttons = screen.queryAllByRole('button');
      expect(buttons.length).toBe(1);
    });

    it('should call removeIngredient when chip clicked while not wrapping', () => {
      const placedIngredients = [{ ingredientId: 'cheese', instanceId: 'cheese-1' }];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'burrito',
        placedIngredients,
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockReturnValue({
        id: 'cheese',
        name: 'Cheese',
        emoji: '🧀',
      });

      render(<MealPlate plateRef={mockPlateRef} burritoWrapping={false} />);
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(mockRemoveIngredient).toHaveBeenCalledWith('cheese-1');
    });
  });

  describe('when selectedMeal is salad', () => {
    it('should render SaladAssembly component', () => {
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'salad',
        placedIngredients: [],
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      } as any);

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByTestId('salad-assembly')).toBeInTheDocument();
    });

    it('should not render removal chips when no ingredients placed', () => {
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'salad',
        placedIngredients: [],
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      } as any);

      render(<MealPlate plateRef={mockPlateRef} />);
      const buttons = screen.queryAllByRole('button');
      expect(buttons.length).toBe(0);
    });

    it('should render removal chips for placed ingredients', () => {
      const placedIngredients = [
        { ingredientId: 'lettuce', instanceId: 'lettuce-1' },
      ];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'salad',
        placedIngredients,
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockReturnValue({
        id: 'lettuce',
        name: 'Lettuce',
        emoji: '🥗',
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBe(1);
    });

    it('should use green color for salad removal chips', () => {
      const placedIngredients = [
        { ingredientId: 'lettuce', instanceId: 'lettuce-1' },
      ];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'salad',
        placedIngredients,
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockReturnValue({
        id: 'lettuce',
        name: 'Lettuce',
        emoji: '🥗',
      });

      const { container } = render(<MealPlate plateRef={mockPlateRef} />);
      const button = container.querySelector('button');
      expect(button).toHaveStyle({ borderColor: '#2e7d32' });
    });

    it('should call removeIngredient when chip clicked', () => {
      const placedIngredients = [
        { ingredientId: 'lettuce', instanceId: 'lettuce-1' },
      ];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'salad',
        placedIngredients,
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockReturnValue({
        id: 'lettuce',
        name: 'Lettuce',
        emoji: '🥗',
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(mockRemoveIngredient).toHaveBeenCalledWith('lettuce-1');
    });
  });

  describe('when selectedMeal is sushi', () => {
    it('should render SushiAssembly component', () => {
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'sushi',
        placedIngredients: [],
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      } as any);

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByTestId('sushi-assembly')).toBeInTheDocument();
    });

    it('should not render removal chips when no ingredients placed', () => {
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'sushi',
        placedIngredients: [],
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      } as any);

      render(<MealPlate plateRef={mockPlateRef} />);
      const buttons = screen.queryAllByRole('button');
      expect(buttons.length).toBe(0);
    });

    it('should render removal chips for placed ingredients', () => {
      const placedIngredients = [
        { ingredientId: 'salmon', instanceId: 'salmon-1' },
      ];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'sushi',
        placedIngredients,
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockReturnValue({
        id: 'salmon',
        name: 'Salmon',
        emoji: '🍣',
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBe(1);
    });

    it('should use dark color for sushi removal chips', () => {
      const placedIngredients = [
        { ingredientId: 'salmon', instanceId: 'salmon-1' },
      ];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'sushi',
        placedIngredients,
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockReturnValue({
        id: 'salmon',
        name: 'Salmon',
        emoji: '🍣',
      });

      const { container } = render(<MealPlate plateRef={mockPlateRef} />);
      const button = container.querySelector('button');
      expect(button).toHaveStyle({ borderColor: '#1c2e1c' });
    });

    it('should call removeIngredient when chip clicked', () => {
      const placedIngredients = [
        { ingredientId: 'salmon', instanceId: 'salmon-1' },
      ];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'sushi',
        placedIngredients,
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockReturnValue({
        id: 'salmon',
        name: 'Salmon',
        emoji: '🍣',
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(mockRemoveIngredient).toHaveBeenCalledWith('salmon-1');
    });
  });

  describe('when selectedMeal is sandwich (default)', () => {
    it('should render SandwichStack component', () => {
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'sandwich',
        placedIngredients: [],
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      } as any);

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByTestId('sandwich-stack')).toBeInTheDocument();
    });

    it('should not show removal hint when no ingredients', () => {
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'sandwich',
        placedIngredients: [],
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      } as any);

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.queryByText(/Tap a layer to remove/)).not.toBeInTheDocument();
    });

    it('should show removal hint when ingredients placed', () => {
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'sandwich',
        placedIngredients: [{ ingredientId: 'bread', instanceId: 'bread-1' }],
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      } as any);

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText(/Tap a layer to remove/)).toBeInTheDocument();
    });
  });

  describe('plateRef handling', () => {
    it('should attach ref to container div', () => {
      const testRef = React.createRef<HTMLDivElement>();
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients: [],
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      } as any);

      render(<MealPlate plateRef={testRef} />);
      expect(testRef.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('ingredient grouping', () => {
    it('should group multiple same ingredients correctly for pizza', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: 'cheese-1' },
        { ingredientId: 'cheese', instanceId: 'cheese-2' },
        { ingredientId: 'cheese', instanceId: 'cheese-3' },
      ];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockReturnValue({
        id: 'cheese',
        name: 'Cheese',
        emoji: '🧀',
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText('×3')).toBeInTheDocument();
    });

    it('should group multiple same ingredients for burrito', () => {
      const placedIngredients = [
        { ingredientId: 'rice', instanceId: 'rice-1' },
        { ingredientId: 'rice', instanceId: 'rice-2' },
      ];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'burrito',
        placedIngredients,
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockReturnValue({
        id: 'rice',
        name: 'Rice',
        emoji: '🍚',
      });

      render(<MealPlate plateRef={mockPlateRef} burritoWrapping={false} />);
      expect(screen.getByText('×2')).toBeInTheDocument();
    });

    it('should keep separate chips for different ingredients', () => {
      const placedIngredients = [
        { ingredientId: 'cheese', instanceId: 'cheese-1' },
        { ingredientId: 'tomato', instanceId: 'tomato-1' },
        { ingredientId: 'lettuce', instanceId: 'lettuce-1' },
      ];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockImplementation((id) => ({
        id,
        name: id,
        emoji: '🧀',
      }));

      render(<MealPlate plateRef={mockPlateRef} />);
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBe(3);
    });
  });

  describe('edge cases', () => {
    it('should handle empty pizzaSlices', () => {
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients: [],
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      } as any);

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByTestId('pizza-base')).toBeInTheDocument();
    });

    it('should handle null ingredient from getIngredientById', () => {
      const placedIngredients = [
        { ingredientId: 'unknown', instanceId: 'unknown-1' },
      ];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockReturnValue(null);
      mockUseT.mockReturnValue({
        ingredients: {},
      } as any);

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText('unknown')).toBeInTheDocument();
    });

    it('should handle default burritoWrapping value', () => {
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'burrito',
        placedIngredients: [{ ingredientId: 'rice', instanceId: 'rice-1' }],
        pizzaSlices: 0,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockReturnValue({
        id: 'rice',
        name: 'Rice',
        emoji: '🍚',
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      const buttons = screen.queryAllByRole('button');
      expect(buttons.length).toBe(1);
    });

    it('should handle very long ingredient names', () => {
      const placedIngredients = [
        { ingredientId: 'longname', instanceId: 'longname-1' },
      ];
      mockUseGameStore.mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients,
        pizzaSlices: 4,
        removeIngredient: mockRemoveIngredient,
      } as any);
      mockGetIngredientById.mockReturnValue({
        id: 'longname',
        name: 'VeryLongIngredientNameThatShouldStillDisplay',
        emoji: '🧀',
      });

      render(<MealPlate plateRef={mockPlateRef} />);
      expect(screen.getByText('VeryLongIngredientNameThatShouldStillDisplay')).toBeInTheDocument();
    });
  });
});