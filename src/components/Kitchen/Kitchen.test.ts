// @ts-nocheck
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Kitchen } from './Kitchen';
import { useGameStore } from '../../store/gameStore';
import { useLanguageStore } from '../../store/languageStore';
import { useT } from '../../i18n/useT';
import { useSpeech } from '../../hooks/useSpeech';
import { getMealInfo } from '../../data/meals';
import { getMealCostUSD, formatPrice } from '../../utils/currency';

jest.mock('../../store/gameStore');
jest.mock('../../store/languageStore');
jest.mock('../../i18n/useT');
jest.mock('../../hooks/useSpeech');
jest.mock('../../data/meals');
jest.mock('../../utils/currency');
jest.mock('../Chef/ChefDialog', () => ({
  ChefDialog: () => <div data-testid="chef-dialog">Chef Dialog</div>,
}));
jest.mock('../UI/Button', () => ({
  Button: ({ onClick, children, disabled, variant }: any) => (
    <button onClick={onClick} disabled={disabled} data-variant={variant}>
      {children}
    </button>
  ),
}));
jest.mock('../UI/StarScore', () => ({
  StarScore: () => <div data-testid="star-score">Star Score</div>,
}));
jest.mock('./MealPlate', () => ({
  MealPlate: ({ burritoWrapping }: any) => (
    <div data-testid="meal-plate" data-burrito-wrapping={burritoWrapping}>
      Meal Plate
    </div>
  ),
}));
jest.mock('../Ingredients/IngredientShelf', () => ({
  IngredientShelf: ({ onAdd }: any) => (
    <div data-testid="ingredient-shelf" onClick={() => onAdd('ingredient')}>
      Ingredient Shelf
    </div>
  ),
}));
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('Kitchen Component', () => {
  const mockSetPhase = jest.fn();
  const mockSetChefMessage = jest.fn();
  const mockAddIngredient = jest.fn();
  const mockSetPizzaSlices = jest.fn();
  const mockSpeak = jest.fn();

  const defaultGameStore = {
    selectedMeal: 'pizza',
    placedIngredients: ['cheese', 'pepperoni'],
    pizzaSlices: 8,
    setPizzaSlices: mockSetPizzaSlices,
    addIngredient: mockAddIngredient,
    setPhase: mockSetPhase,
    setChefMessage: mockSetChefMessage,
    familySize: 4,
  };

  const defaultMealInfo = {
    emoji: '🍕',
    bgColor: '#fff0e6',
    accentColor: '#ff6b35',
    hasSlices: true,
  };

  const defaultTranslations = {
    meals: {
      pizza: { name: 'Pizza' },
      burrito: { name: 'Burrito' },
    },
    kitchen: {
      addHint: 'Add ingredients',
      doubleTapHint: 'Double tap to add',
      myMeal: (name: string) => `My ${name}`,
      emptyWarning: 'Please add ingredients',
      doneMessage: 'Great job!',
      back: 'Back',
      ingredients: (count: number) => `${count} ingredients`,
      forPeople: (size: number) => `For ${size} people`,
      slices: (count: number) => `${count} slices`,
      doneButton: 'Done',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useGameStore as jest.Mock).mockReturnValue(defaultGameStore);
    (useLanguageStore as jest.Mock).mockReturnValue({ language: 'en' });
    (useT as jest.Mock).mockReturnValue(defaultTranslations);
    (useSpeech as jest.Mock).mockReturnValue({ speak: mockSpeak });
    (getMealInfo as jest.Mock).mockReturnValue(defaultMealInfo);
    (formatPrice as jest.Mock).mockReturnValue('$10.00');
    (getMealCostUSD as jest.Mock).mockReturnValue(10);
  });

  describe('Rendering', () => {
    it('should render the Kitchen component with all main sections', () => {
      render(<Kitchen />);
      
      expect(screen.getByTestId('chef-dialog')).toBeInTheDocument();
      expect(screen.getByTestId('meal-plate')).toBeInTheDocument();
      expect(screen.getByTestId('ingredient-shelf')).toBeInTheDocument();
      expect(screen.getByTestId('star-score')).toBeInTheDocument();
    });

    it('should display meal name with emoji in header', () => {
      render(<Kitchen />);
      
      expect(screen.getByText(/🍕/)).toBeInTheDocument();
      expect(screen.getByText(/My Pizza/)).toBeInTheDocument();
    });

    it('should display ingredient count', () => {
      render(<Kitchen />);
      
      expect(screen.getByText('2 ingredients')).toBeInTheDocument();
    });

    it('should display family size', () => {
      render(<Kitchen />);
      
      expect(screen.getByText('For 4 people')).toBeInTheDocument();
    });

    it('should display meal cost', () => {
      render(<Kitchen />);
      
      expect(screen.getByText(/💰 \$10.00/)).toBeInTheDocument();
    });

    it('should render back button', () => {
      render(<Kitchen />);
      
      expect(screen.getByText('Back')).toBeInTheDocument();
    });
  });

  describe('Pizza Slices Picker', () => {
    it('should display slices button when meal has slices', () => {
      render(<Kitchen />);
      
      expect(screen.getByText('8 slices')).toBeInTheDocument();
    });

    it('should not display slices button when meal has no slices', () => {
      (getMealInfo as jest.Mock).mockReturnValue({
        ...defaultMealInfo,
        hasSlices: false,
      });
      
      render(<Kitchen />);
      
      expect(screen.queryByText(/slices/)).not.toBeInTheDocument();
    });

    it('should toggle slice picker visibility when clicking slices button', () => {
      render(<Kitchen />);
      const slicesButton = screen.getByText('8 slices');
      
      fireEvent.click(slicesButton);
      expect(screen.getByText('4')).toBeInTheDocument();
      
      fireEvent.click(slicesButton);
      expect(screen.queryByText('4')).not.toBeInTheDocument();
    });

    it('should update pizza slices when selecting from picker', () => {
      render(<Kitchen />);
      const slicesButton = screen.getByText('8 slices');
      
      fireEvent.click(slicesButton);
      const sliceOption = screen.getByText('6');
      fireEvent.click(sliceOption);
      
      expect(mockSetPizzaSlices).toHaveBeenCalledWith(6);
    });

    it('should close picker after selecting slices', () => {
      render(<Kitchen />);
      const slicesButton = screen.getByText('8 slices');
      
      fireEvent.click(slicesButton);
      expect(screen.getByText('4')).toBeInTheDocument();
      
      const sliceOption = screen.getByText('6');
      fireEvent.click(sliceOption);
      
      expect(screen.queryByText('4')).not.toBeInTheDocument();
    });

    it('should display all slice options', () => {
      render(<Kitchen />);
      const slicesButton = screen.getByText('8 slices');
      fireEvent.click(slicesButton);
      
      expect(screen.getByText('4')).toBeInTheDocument();
      expect(screen.getByText('6')).toBeInTheDocument();
      expect(screen.getByText('8')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('12')).toBeInTheDocument();
    });
  });

  describe('Done Button Behavior', () => {
    it('should call setPhase with mealSplash when done with ingredients', () => {
      render(<Kitchen />);
      const doneButton = screen.getByText('Done');
      
      fireEvent.click(doneButton);
      
      expect(mockSetPhase).toHaveBeenCalledWith('mealSplash');
    });

    it('should show warning message when attempting to submit with no ingredients', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        placedIngredients: [],
      });
      
      render(<Kitchen />);
      const doneButton = screen.getByText('Done');
      
      fireEvent.click(doneButton);
      
      expect(mockSetChefMessage).toHaveBeenCalledWith('Please add ingredients', 'thinking');
    });

    it('should disable done button when no ingredients', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        placedIngredients: [],
      });
      
      render(<Kitchen />);
      const doneButton = screen.getByText('Done');
      
      expect(doneButton).toBeDisabled();
    });

    it('should not disable done button when ingredients are present', () => {
      render(<Kitchen />);
      const doneButton = screen.getByText('Done');
      
      expect(doneButton).not.toBeDisabled();
    });

    it('should set success variant when at least 2 ingredients', () => {
      render(<Kitchen />);
      const doneButton = screen.getByText('Done');
      
      expect(doneButton).toHaveAttribute('data-variant', 'success');
    });

    it('should set secondary variant when less than 2 ingredients', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        placedIngredients: ['cheese'],
      });
      
      render(<Kitchen />);
      const doneButton = screen.getByText('Done');
      
      expect(doneButton).toHaveAttribute('data-variant', 'secondary');
    });
  });

  describe('Burrito Wrapping', () => {
    it('should set burrito wrapping for burrito meal', async () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        selectedMeal: 'burrito',
      });
      (useT as jest.Mock).mockReturnValue({
        ...defaultTranslations,
        meals: {
          ...defaultTranslations.meals,
        },
      });
      
      jest.useFakeTimers();
      render(<Kitchen />);
      const doneButton = screen.getByText('Done');
      
      fireEvent.click(doneButton);
      
      expect(mockSetChefMessage).toHaveBeenCalledWith('Great job!', 'excited');
      
      jest.advanceTimersByTime(1800);
      
      expect(mockSetPhase).toHaveBeenCalledWith('mealSplash');
      jest.useRealTimers();
    });

    it('should not delay phase change for non-burrito meals', () => {
      jest.useFakeTimers();
      render(<Kitchen />);
      const doneButton = screen.getByText('Done');
      
      fireEvent.click(doneButton);
      
      expect(mockSetPhase).toHaveBeenCalledWith('mealSplash');
      jest.useRealTimers();
    });
  });

  describe('Navigation', () => {
    it('should navigate back to meal select', () => {
      render(<Kitchen />);
      const backButton = screen.getByText('Back');
      
      fireEvent.click(backButton);
      
      expect(mockSetPhase).toHaveBeenCalledWith('mealSelect');
    });
  });

  describe('Speech and Messages', () => {
    it('should call speak on component mount with meal instructions', () => {
      render(<Kitchen />);
      
      expect(mockSpeak).toHaveBeenCalled();
      const callArgs = mockSpeak.mock.calls[0][0];
      expect(callArgs).toContain('Pizza');
      expect(callArgs).toContain('Add ingredients');
    });

    it('should set initial chef message on mount', () => {
      render(<Kitchen />);
      
      expect(mockSetChefMessage).toHaveBeenCalledWith('Add ingredients', 'happy');
    });

    it('should update chef message to excited when done clicked', () => {
      render(<Kitchen />);
      const doneButton = screen.getByText('Done');
      
      fireEvent.click(doneButton);
      
      expect(mockSetChefMessage).toHaveBeenCalledWith('Great job!', 'excited');
    });
  });

  describe('Meal Info Integration', () => {
    it('should pass selected meal to getMealInfo', () => {
      render(<Kitchen />);
      
      expect(getMealInfo).toHaveBeenCalledWith('pizza');
    });

    it('should use meal accent color for stats badge', () => {
      render(<Kitchen />);
      const statsDiv = screen.getByText('2 ingredients').parentElement;
      
      expect(statsDiv).toHaveStyle({ background: '#ff6b35' });
    });
  });

  describe('Price Calculation', () => {
    it('should call getMealCostUSD with correct parameters', () => {
      render(<Kitchen />);
      
      expect(getMealCostUSD).toHaveBeenCalledWith('pizza', 2);
    });

    it('should call formatPrice with cost and language', () => {
      render(<Kitchen />);
      
      expect(formatPrice).toHaveBeenCalledWith(10, 'en');
    });

    it('should update price when ingredients count changes', () => {
      const { rerender } = render(<Kitchen />);
      
      jest.clearAllMocks();
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        placedIngredients: ['cheese', 'pepperoni', 'mushroom'],
      });
      
      rerender(<Kitchen />);
      
      expect(getMealCostUSD).toHaveBeenCalledWith('pizza', 3);
    });
  });

  describe('Responsive Layout', () => {
    it('should set correct container styles', () => {
      const { container } = render(<Kitchen />);
      const mainDiv = container.firstChild as HTMLElement;
      
      expect(mainDiv).toHaveStyle({
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
      });
    });

    it('should use gradient background from meal info', () => {
      const { container } = render(<Kitchen />);
      const mainDiv = container.firstChild as HTMLElement;
      const style = window.getComputedStyle(mainDiv);
      
      expect(style.background).toContain('linear-gradient');
    });
  });

  describe('Ingredient Shelf Integration', () => {
    it('should pass addIngredient callback to shelf', () => {
      render(<Kitchen />);
      const shelf = screen.getByTestId('ingredient-shelf');
      
      fireEvent.click(shelf);
      
      expect(mockAddIngredient).toHaveBeenCalledWith('ingredient');
    });
  });

  describe('MealPlate Integration', () => {
    it('should pass burrito wrapping state to MealPlate', async () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        selectedMeal: 'burrito',
      });
      
      jest.useFakeTimers();
      render(<Kitchen />);
      const doneButton = screen.getByText('Done');
      
      fireEvent.click(doneButton);
      
      const mealPlate = screen.getByTestId('meal-plate');
      expect(mealPlate).toHaveAttribute('data-burrito-wrapping', 'true');
      
      jest.useRealTimers();
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing selected meal gracefully', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        selectedMeal: undefined,
      });
      
      expect(() => render(<Kitchen />)).toThrow();
    });

    it('should handle empty ingredients array', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        placedIngredients: [],
      });
      
      render(<Kitchen />);
      expect(screen.getByText('0 ingredients')).toBeInTheDocument();
    });

    it('should handle large ingredient counts', () => {
      const largeArray = Array(50).fill('ingredient');
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        placedIngredients: largeArray,
      });
      
      render(<Kitchen />);
      expect(screen.getByText('50 ingredients')).toBeInTheDocument();
    });

    it('should handle different family sizes', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        familySize: 10,
      });
      
      render(<Kitchen />);
      expect(screen.getByText('For 10 people')).toBeInTheDocument();
    });
  });
});