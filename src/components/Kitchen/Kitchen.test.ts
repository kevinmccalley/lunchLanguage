// @ts-nocheck
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Kitchen } from './Kitchen';
import { useGameStore } from '../../store/gameStore';
import { useLanguageStore } from '../../store/languageStore';
import { useSpeech } from '../../hooks/useSpeech';
import { useT } from '../../i18n/useT';
import { getMealInfo } from '../../data/meals';
import { getMealCostUSD, formatPrice } from '../../utils/currency';

jest.mock('../../store/gameStore');
jest.mock('../../store/languageStore');
jest.mock('../../hooks/useSpeech');
jest.mock('../../i18n/useT');
jest.mock('../../data/meals');
jest.mock('../../utils/currency');
jest.mock('../Ingredients/IngredientShelf', () => ({
  IngredientShelf: () => <div data-testid="ingredient-shelf">Ingredient Shelf</div>,
}));
jest.mock('../Chef/ChefDialog', () => ({
  ChefDialog: () => <div data-testid="chef-dialog">Chef Dialog</div>,
}));
jest.mock('../UI/Button', () => ({
  Button: ({ children, onClick, disabled, variant }: any) => (
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

describe('Kitchen Component', () => {
  const mockSetChefMessage = jest.fn();
  const mockSetPhase = jest.fn();
  const mockAddIngredient = jest.fn();
  const mockSetPizzaSlices = jest.fn();
  const mockSpeak = jest.fn();

  const defaultGameStore = {
    selectedMeal: 'pizza',
    placedIngredients: ['cheese', 'tomato'],
    pizzaSlices: 8,
    setPizzaSlices: mockSetPizzaSlices,
    addIngredient: mockAddIngredient,
    setPhase: mockSetPhase,
    setChefMessage: mockSetChefMessage,
    familySize: 4,
  };

  const defaultLanguageStore = {
    language: 'en',
  };

  const defaultT = {
    kitchen: {
      addHint: 'Add ingredients',
      myMeal: (name: string) => `My ${name}`,
      doubleTapHint: 'Double tap to add',
      emptyWarning: 'Add at least one ingredient',
      doneMessage: 'Great job!',
      back: 'Back',
      ingredients: (count: number) => `${count} ingredients`,
      forPeople: (size: number) => `For ${size} people`,
      slices: (slices: number) => `${slices} slices`,
      doneButton: 'Done',
    },
    meals: {
      pizza: { name: 'Pizza' },
    },
  };

  const defaultMealInfo = {
    bgColor: '#fff3cd',
    accentColor: '#ff6b6b',
    emoji: '🍕',
    hasSlices: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useGameStore as jest.Mock).mockReturnValue(defaultGameStore);
    (useLanguageStore as jest.Mock).mockReturnValue(defaultLanguageStore);
    (useSpeech as jest.Mock).mockReturnValue({ speak: mockSpeak });
    (useT as jest.Mock).mockReturnValue(defaultT);
    (getMealInfo as jest.Mock).mockReturnValue(defaultMealInfo);
    (getMealCostUSD as jest.Mock).mockReturnValue(15.99);
    (formatPrice as jest.Mock).mockReturnValue('$15.99');
  });

  describe('Rendering', () => {
    it('should render the Kitchen component with all main sections', () => {
      render(<Kitchen />);

      expect(screen.getByTestId('ingredient-shelf')).toBeInTheDocument();
      expect(screen.getByTestId('chef-dialog')).toBeInTheDocument();
      expect(screen.getByTestId('star-score')).toBeInTheDocument();
      expect(screen.getByTestId('meal-plate')).toBeInTheDocument();
    });

    it('should display the meal emoji and name in the header', () => {
      render(<Kitchen />);

      expect(screen.getByText('🍕 My Pizza')).toBeInTheDocument();
    });

    it('should display the back button', () => {
      render(<Kitchen />);

      expect(screen.getByText('Back')).toBeInTheDocument();
    });

    it('should display the done button', () => {
      render(<Kitchen />);

      expect(screen.getByText('Done')).toBeInTheDocument();
    });

    it('should display ingredient count in stats bar', () => {
      render(<Kitchen />);

      expect(screen.getByText('2 ingredients')).toBeInTheDocument();
    });

    it('should display family size in stats bar', () => {
      render(<Kitchen />);

      expect(screen.getByText('For 4 people')).toBeInTheDocument();
    });

    it('should display formatted meal cost', () => {
      render(<Kitchen />);

      expect(screen.getByText('💰 $15.99')).toBeInTheDocument();
    });
  });

  describe('Pizza slices functionality', () => {
    it('should render slice picker button when meal has slices', () => {
      render(<Kitchen />);

      expect(screen.getByText('8 slices')).toBeInTheDocument();
    });

    it('should not render slice picker button when meal does not have slices', () => {
      (getMealInfo as jest.Mock).mockReturnValue({
        ...defaultMealInfo,
        hasSlices: false,
      });

      render(<Kitchen />);

      expect(screen.queryByText('8 slices')).not.toBeInTheDocument();
    });

    it('should toggle slice picker visibility when button is clicked', () => {
      render(<Kitchen />);

      const sliceButton = screen.getByText('8 slices');
      fireEvent.click(sliceButton);

      expect(screen.getByText('4')).toBeInTheDocument();
      expect(screen.getByText('6')).toBeInTheDocument();
      expect(screen.getByText('8')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('12')).toBeInTheDocument();
    });

    it('should set pizza slices when a slice option is clicked', () => {
      render(<Kitchen />);

      const sliceButton = screen.getByText('8 slices');
      fireEvent.click(sliceButton);

      const sixSlicesButton = screen.getAllByText('6')[1] as HTMLButtonElement;
      fireEvent.click(sixSlicesButton);

      expect(mockSetPizzaSlices).toHaveBeenCalledWith(6);
    });

    it('should close slice picker after selection', () => {
      render(<Kitchen />);

      const sliceButton = screen.getByText('8 slices');
      fireEvent.click(sliceButton);

      const sixSlicesButton = screen.getAllByText('6')[1] as HTMLButtonElement;
      fireEvent.click(sixSlicesButton);

      expect(screen.queryByText('4')).not.toBeInTheDocument();
    });
  });

  describe('Done button functionality', () => {
    it('should have success variant when ingredients >= 2', () => {
      render(<Kitchen />);

      const button = screen.getByText('Done');
      expect(button).toHaveAttribute('data-variant', 'success');
    });

    it('should have secondary variant when ingredients < 2', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        placedIngredients: ['cheese'],
      });

      render(<Kitchen />);

      const button = screen.getByText('Done');
      expect(button).toHaveAttribute('data-variant', 'secondary');
    });

    it('should disable done button when no ingredients are added', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        placedIngredients: [],
      });

      render(<Kitchen />);

      const button = screen.getByText('Done');
      expect(button).toBeDisabled();
    });

    it('should show warning message when done is clicked with no ingredients', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        placedIngredients: [],
      });

      render(<Kitchen />);
      const button = screen.getByText('Done');
      fireEvent.click(button);

      expect(mockSetChefMessage).toHaveBeenCalledWith('Add at least one ingredient', 'thinking');
    });

    it('should show success message and transition to mealSplash when done is clicked with ingredients (non-burrito)', () => {
      render(<Kitchen />);

      const button = screen.getByText('Done');
      fireEvent.click(button);

      expect(mockSetChefMessage).toHaveBeenCalledWith('Great job!', 'excited');
      expect(mockSetPhase).toHaveBeenCalledWith('mealSplash');
    });

    it('should set burritoWrapping to true for burrito meal', () => {
      jest.useFakeTimers();
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        selectedMeal: 'burrito',
      });

      render(<Kitchen />);

      const mealPlate = screen.getByTestId('meal-plate');
      expect(mealPlate).toHaveAttribute('data-burrito-wrapping', 'false');

      const button = screen.getByText('Done');
      fireEvent.click(button);

      expect(mockSetChefMessage).toHaveBeenCalledWith('Great job!', 'excited');
      jest.advanceTimersByTime(1800);
      expect(mockSetPhase).toHaveBeenCalledWith('mealSplash');

      jest.useRealTimers();
    });
  });

  describe('Back button functionality', () => {
    it('should navigate back to mealSelect when back button is clicked', () => {
      render(<Kitchen />);

      const backButton = screen.getByText('Back');
      fireEvent.click(backButton);

      expect(mockSetPhase).toHaveBeenCalledWith('mealSelect');
    });
  });

  describe('Initialization and side effects', () => {
    it('should set chef message and speak on mount', () => {
      render(<Kitchen />);

      expect(mockSetChefMessage).toHaveBeenCalledWith('Add ingredients', 'happy');
      expect(mockSpeak).toHaveBeenCalledWith('My Pizza. Add ingredients. Double tap to add');
    });

    it('should update chef message when translations change', () => {
      const { rerender } = render(<Kitchen />);

      mockSetChefMessage.mockClear();
      mockSpeak.mockClear();

      const newT = {
        ...defaultT,
        kitchen: {
          ...defaultT.kitchen,
          addHint: 'New hint',
        },
      };
      (useT as jest.Mock).mockReturnValue(newT);

      rerender(<Kitchen />);

      expect(mockSetChefMessage).toHaveBeenCalled();
    });
  });

  describe('Meal cost calculation', () => {
    it('should call getMealCostUSD with correct parameters', () => {
      render(<Kitchen />);

      expect(getMealCostUSD).toHaveBeenCalledWith('pizza', 2);
    });

    it('should call formatPrice with correct parameters', () => {
      render(<Kitchen />);

      expect(formatPrice).toHaveBeenCalledWith(15.99, 'en');
    });

    it('should update cost when ingredient count changes', () => {
      const { rerender } = render(<Kitchen />);

      getMealCostUSD.mockClear();
      formatPrice.mockClear();

      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        placedIngredients: ['cheese', 'tomato', 'basil'],
      });

      rerender(<Kitchen />);

      expect(getMealCostUSD).toHaveBeenCalledWith('pizza', 3);
    });
  });

  describe('Meal info usage', () => {
    it('should call getMealInfo with the selected meal', () => {
      render(<Kitchen />);

      expect(getMealInfo).toHaveBeenCalledWith('pizza');
    });

    it('should use meal background color in styling', () => {
      render(<Kitchen />);

      const container = screen.getByText('Back').closest('div')?.parentElement;
      expect(container).toHaveStyle(
        `background: linear-gradient(180deg, ${defaultMealInfo.bgColor} 0%, white 100%)`
      );
    });

    it('should use meal accent color for ingredient count styling', () => {
      render(<Kitchen />);

      const ingredientBadge = screen.getByText('2 ingredients');
      expect(ingredientBadge).toHaveStyle(`background: ${defaultMealInfo.accentColor}`);
    });
  });

  describe('Language store integration', () => {
    it('should use language from language store for price formatting', () => {
      (useLanguageStore as jest.Mock).mockReturnValue({
        language: 'fr',
      });

      render(<Kitchen />);

      expect(formatPrice).toHaveBeenCalledWith(15.99, 'fr');
    });
  });

  describe('Edge cases', () => {
    it('should handle zero ingredients gracefully', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        placedIngredients: [],
      });

      render(<Kitchen />);

      expect(screen.getByText('0 ingredients')).toBeInTheDocument();
    });

    it('should handle large ingredient counts', () => {
      const manyIngredients = Array(50).fill('ingredient');
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        placedIngredients: manyIngredients,
      });

      render(<Kitchen />);

      expect(screen.getByText('50 ingredients')).toBeInTheDocument();
    });

    it('should handle different meal types correctly', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        selectedMeal: 'sandwich',
      });
      (getMealInfo as jest.Mock).mockReturnValue({
        ...defaultMealInfo,
        emoji: '🥪',
        hasSlices: false,
      });

      render(<Kitchen />);

      expect(screen.getByText('🥪')).toBeInTheDocument();
      expect(screen.queryByText(/slices/)).not.toBeInTheDocument();
    });
  });
});