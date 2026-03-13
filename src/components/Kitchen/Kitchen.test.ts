// @ts-nocheck
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Kitchen } from './Kitchen';
import { useGameStore } from '../../store/gameStore';
import { useLanguageStore } from '../../store/languageStore';
import { useT } from '../../i18n/useT';
import { useSpeech } from '../../hooks/useSpeech';
import { getMealInfo } from '../../data/meals';
import { getMealCostUSD, formatPrice } from '../../utils/currency';
import '@testing-library/jest-dom';

jest.mock('../../store/gameStore');
jest.mock('../../store/languageStore');
jest.mock('../../i18n/useT');
jest.mock('../../hooks/useSpeech');
jest.mock('../../data/meals');
jest.mock('../../utils/currency');
jest.mock('./MealPlate', () => ({
  MealPlate: () => <div data-testid="meal-plate">MealPlate</div>,
}));
jest.mock('../Ingredients/IngredientShelf', () => ({
  IngredientShelf: ({ onAdd }: any) => (
    <div data-testid="ingredient-shelf" onClick={() => onAdd('ingredient1')}>
      IngredientShelf
    </div>
  ),
}));
jest.mock('../Chef/ChefDialog', () => ({
  ChefDialog: () => <div data-testid="chef-dialog">ChefDialog</div>,
}));
jest.mock('../UI/Button', () => ({
  Button: ({ onClick, children, disabled, variant }: any) => (
    <button onClick={onClick} disabled={disabled} data-variant={variant}>
      {children}
    </button>
  ),
}));
jest.mock('../UI/StarScore', () => ({
  StarScore: () => <div data-testid="star-score">StarScore</div>,
}));

describe('Kitchen Component', () => {
  const mockSetPhase = jest.fn();
  const mockSetChefMessage = jest.fn();
  const mockAddIngredient = jest.fn();
  const mockSetPizzaSlices = jest.fn();
  const mockSpeak = jest.fn();

  const defaultGameStoreState = {
    selectedMeal: 'pizza',
    placedIngredients: ['cheese', 'tomato'],
    pizzaSlices: 8,
    familySize: 4,
    setPizzaSlices: mockSetPizzaSlices,
    addIngredient: mockAddIngredient,
    setPhase: mockSetPhase,
    setChefMessage: mockSetChefMessage,
  };

  const defaultLanguageStoreState = {
    language: 'en',
  };

  const defaultTranslations = {
    kitchen: {
      addHint: 'Add ingredients',
      myMeal: (name: string) => `My ${name}`,
      doubleTapHint: 'Double tap to add',
      emptyWarning: 'Add at least one ingredient',
      doneMessage: 'Great job!',
      back: 'Back',
      ingredients: (count: number) => `${count} ingredients`,
      forPeople: (size: number) => `For ${size} people`,
      slices: (count: number) => `${count} slices`,
      doneButton: 'Done',
    },
    meals: {
      pizza: { name: 'Pizza' },
    },
  };

  const defaultMealInfo = {
    bgColor: '#fff9e6',
    accentColor: '#f57f17',
    emoji: '🍕',
    hasSlices: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useGameStore as jest.Mock).mockReturnValue(defaultGameStoreState);
    (useLanguageStore as jest.Mock).mockReturnValue(defaultLanguageStoreState);
    (useT as jest.Mock).mockReturnValue(defaultTranslations);
    (useSpeech as jest.Mock).mockReturnValue({ speak: mockSpeak });
    (getMealInfo as jest.Mock).mockReturnValue(defaultMealInfo);
    (getMealCostUSD as jest.Mock).mockReturnValue(12.99);
    (formatPrice as jest.Mock).mockReturnValue('$12.99');
  });

  describe('Component Rendering', () => {
    it('should render the Kitchen component with all main sections', () => {
      render(<Kitchen />);

      expect(screen.getByTestId('meal-plate')).toBeInTheDocument();
      expect(screen.getByTestId('ingredient-shelf')).toBeInTheDocument();
      expect(screen.getByTestId('chef-dialog')).toBeInTheDocument();
      expect(screen.getByTestId('star-score')).toBeInTheDocument();
    });

    it('should display the meal name and emoji in header', () => {
      render(<Kitchen />);

      expect(screen.getByText(/My Pizza/)).toBeInTheDocument();
    });

    it('should display the back button', () => {
      render(<Kitchen />);

      expect(screen.getByText('Back')).toBeInTheDocument();
    });

    it('should display ingredient count in stats bar', () => {
      render(<Kitchen />);

      expect(screen.getByText('2 ingredients')).toBeInTheDocument();
    });

    it('should display family size in stats bar', () => {
      render(<Kitchen />);

      expect(screen.getByText('For 4 people')).toBeInTheDocument();
    });

    it('should display price in stats bar', () => {
      render(<Kitchen />);

      expect(screen.getByText(/💰 \$12.99/)).toBeInTheDocument();
    });

    it('should display done button', () => {
      render(<Kitchen />);

      expect(screen.getByRole('button', { name: 'Done' })).toBeInTheDocument();
    });
  });

  describe('Pizza Slices Picker', () => {
    it('should show slice picker button when meal has slices', () => {
      render(<Kitchen />);

      const sliceButton = screen.getByRole('button', { name: '8 slices' });
      expect(sliceButton).toBeInTheDocument();
    });

    it('should hide slice picker button when meal does not have slices', () => {
      (getMealInfo as jest.Mock).mockReturnValue({
        ...defaultMealInfo,
        hasSlices: false,
      });

      render(<Kitchen />);

      expect(screen.queryByRole('button', { name: /slices/ })).not.toBeInTheDocument();
    });

    it('should toggle slice picker visibility when slice button is clicked', () => {
      render(<Kitchen />);

      const sliceButton = screen.getByRole('button', { name: '8 slices' });
      fireEvent.click(sliceButton);

      expect(screen.getByRole('button', { name: '4' })).toBeInTheDocument();

      fireEvent.click(sliceButton);

      expect(screen.queryByRole('button', { name: '4' })).not.toBeInTheDocument();
    });

    it('should show all slice options when picker is open', () => {
      render(<Kitchen />);

      const sliceButton = screen.getByRole('button', { name: '8 slices' });
      fireEvent.click(sliceButton);

      expect(screen.getByRole('button', { name: '4' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '6' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '8' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '10' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '12' })).toBeInTheDocument();
    });

    it('should update pizza slices when option is selected', () => {
      render(<Kitchen />);

      const sliceButton = screen.getByRole('button', { name: '8 slices' });
      fireEvent.click(sliceButton);

      const sixSliceButton = screen.getByRole('button', { name: '6' });
      fireEvent.click(sixSliceButton);

      expect(mockSetPizzaSlices).toHaveBeenCalledWith(6);
    });

    it('should close slice picker after selection', () => {
      render(<Kitchen />);

      const sliceButton = screen.getByRole('button', { name: '8 slices' });
      fireEvent.click(sliceButton);

      const sixSliceButton = screen.getByRole('button', { name: '6' });
      fireEvent.click(sixSliceButton);

      expect(screen.queryByRole('button', { name: '4' })).not.toBeInTheDocument();
    });
  });

  describe('Done Button Behavior', () => {
    it('should disable done button when there are no ingredients', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStoreState,
        placedIngredients: [],
      });

      render(<Kitchen />);

      const doneButton = screen.getByRole('button', { name: 'Done' });
      expect(doneButton).toBeDisabled();
    });

    it('should enable done button when ingredients are present', () => {
      render(<Kitchen />);

      const doneButton = screen.getByRole('button', { name: 'Done' });
      expect(doneButton).not.toBeDisabled();
    });

    it('should show warning when done is clicked with no ingredients', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStoreState,
        placedIngredients: [],
      });

      render(<Kitchen />);

      const doneButton = screen.getByRole('button', { name: 'Done' });
      fireEvent.click(doneButton);

      expect(mockSetChefMessage).toHaveBeenCalledWith(
        'Add at least one ingredient',
        'thinking'
      );
    });

    it('should transition to mealSplash when done is clicked with ingredients', () => {
      render(<Kitchen />);

      const doneButton = screen.getByRole('button', { name: 'Done' });
      fireEvent.click(doneButton);

      expect(mockSetChefMessage).toHaveBeenCalledWith('Great job!', 'excited');
    });

    it('should have success variant when ingredients >= 2', () => {
      render(<Kitchen />);

      const doneButton = screen.getByRole('button', { name: 'Done' });
      expect(doneButton).toHaveAttribute('data-variant', 'success');
    });

    it('should have secondary variant when ingredients < 2', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStoreState,
        placedIngredients: ['cheese'],
      });

      render(<Kitchen />);

      const doneButton = screen.getByRole('button', { name: 'Done' });
      expect(doneButton).toHaveAttribute('data-variant', 'secondary');
    });
  });

  describe('Burrito Wrapping', () => {
    it('should set burrito wrapping state when burrito is selected', async () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStoreState,
        selectedMeal: 'burrito',
      });

      jest.useFakeTimers();

      render(<Kitchen />);

      const doneButton = screen.getByRole('button', { name: 'Done' });
      fireEvent.click(doneButton);

      expect(screen.getByTestId('meal-plate')).toBeInTheDocument();

      jest.runAllTimers();

      jest.useRealTimers();
    });

    it('should transition to mealSplash after wrapping timeout for burrito', async () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStoreState,
        selectedMeal: 'burrito',
      });

      jest.useFakeTimers();

      render(<Kitchen />);

      const doneButton = screen.getByRole('button', { name: 'Done' });
      fireEvent.click(doneButton);

      jest.advanceTimersByTime(1800);

      expect(mockSetPhase).toHaveBeenCalledWith('mealSplash');

      jest.useRealTimers();
    });

    it('should immediately transition for non-burrito meals', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStoreState,
        selectedMeal: 'pizza',
      });

      render(<Kitchen />);

      const doneButton = screen.getByRole('button', { name: 'Done' });
      fireEvent.click(doneButton);

      expect(mockSetPhase).toHaveBeenCalledWith('mealSplash');
    });
  });

  describe('Back Button', () => {
    it('should navigate to mealSelect when back button is clicked', () => {
      render(<Kitchen />);

      const backButton = screen.getByRole('button', { name: 'Back' });
      fireEvent.click(backButton);

      expect(mockSetPhase).toHaveBeenCalledWith('mealSelect');
    });
  });

  describe('Initial Effects', () => {
    it('should set chef message on mount', () => {
      render(<Kitchen />);

      expect(mockSetChefMessage).toHaveBeenCalledWith(
        'Add ingredients',
        'happy'
      );
    });

    it('should speak initial message on mount', () => {
      render(<Kitchen />);

      expect(mockSpeak).toHaveBeenCalledWith(
        'My Pizza. Add ingredients. Double tap to add'
      );
    });

    it('should use correct meal name in initial speech', () => {
      (useT as jest.Mock).mockReturnValue({
        ...defaultTranslations,
        meals: {
          pizza: { name: 'Pepperoni Pizza' },
        },
      });

      render(<Kitchen />);

      expect(mockSpeak).toHaveBeenCalledWith(
        expect.stringContaining('My Pepperoni Pizza')
      );
    });
  });

  describe('Styling and Layout', () => {
    it('should render with correct background gradient', () => {
      render(<Kitchen />);

      const container = screen.getByTestId('meal-plate').parentElement?.parentElement;
      expect(container).toHaveStyle(
        `background: linear-gradient(180deg, ${defaultMealInfo.bgColor} 0%, white 100%)`
      );
    });

    it('should have proper flex layout', () => {
      render(<Kitchen />);

      const container = screen.getByTestId('meal-plate').parentElement?.parentElement;
      expect(container).toHaveStyle('display: flex');
      expect(container).toHaveStyle('flexDirection: column');
      expect(container).toHaveStyle('height: 100vh');
    });
  });

  describe('Stats Display', () => {
    it('should display correct cost using getMealCostUSD and formatPrice', () => {
      (getMealCostUSD as jest.Mock).mockReturnValue(15.50);
      (formatPrice as jest.Mock).mockReturnValue('$15.50');

      render(<Kitchen />);

      expect(getMealCostUSD).toHaveBeenCalledWith('pizza', 2);
      expect(formatPrice).toHaveBeenCalledWith(15.50, 'en');
      expect(screen.getByText(/💰 \$15.50/)).toBeInTheDocument();
    });

    it('should update stats when ingredient count changes', () => {
      const { rerender } = render(<Kitchen />);

      expect(screen.getByText('2 ingredients')).toBeInTheDocument();

      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStoreState,
        placedIngredients: ['cheese', 'tomato', 'basil'],
      });

      rerender(<Kitchen />);

      expect(screen.getByText('3 ingredients')).toBeInTheDocument();
    });
  });

  describe('MealPlate Props', () => {
    it('should pass burritoWrapping prop to MealPlate', () => {
      const MealPlateMock = jest.fn(() => <div data-testid="meal-plate">MealPlate</div>);
      jest.doMock('./MealPlate', () => ({
        MealPlate: MealPlateMock,
      }));

      render(<Kitchen />);

      expect(screen.getByTestId('meal-plate')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle meal selection change', () => {
      const { rerender } = render(<Kitchen />);

      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStoreState,
        selectedMeal: 'tacos',
      });
      (useT as jest.Mock).mockReturnValue({
        ...defaultTranslations,
        meals: {
          tacos: { name: 'Tacos' },
        },
      });

      rerender(<Kitchen />);

      expect(screen.getByText(/My Tacos/)).toBeInTheDocument();
    });

    it('should handle empty placedIngredients array', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStoreState,
        placedIngredients: [],
      });

      render(<Kitchen />);

      expect(screen.getByText('0 ingredients')).toBeInTheDocument();
    });

    it('should handle large family sizes', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStoreState,
        familySize: 12,
      });

      render(<Kitchen />);

      expect(screen.getByText('For 12 people')).toBeInTheDocument();
    });

    it('should handle different languages', () => {
      (useLanguageStore as jest.Mock).mockReturnValue({
        language: 'es',
      });

      render(<Kitchen />);

      expect(formatPrice).toHaveBeenCalledWith(12.99, 'es');
    });
  });
});