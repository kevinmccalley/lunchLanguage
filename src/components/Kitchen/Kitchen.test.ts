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
jest.mock('./MealPlate', () => ({
  MealPlate: () => <div data-testid="meal-plate">MealPlate</div>,
}));
jest.mock('../Ingredients/IngredientShelf', () => ({
  IngredientShelf: ({ onAdd }: { onAdd: jest.Mock }) => (
    <div data-testid="ingredient-shelf" onClick={() => onAdd('ingredient')}>
      IngredientShelf
    </div>
  ),
}));
jest.mock('../Chef/ChefDialog', () => ({
  ChefDialog: () => <div data-testid="chef-dialog">ChefDialog</div>,
}));
jest.mock('../UI/Button', () => ({
  Button: ({ onClick, disabled, children }: any) => (
    <button onClick={onClick} disabled={disabled} data-testid="done-button">
      {children}
    </button>
  ),
}));
jest.mock('../UI/StarScore', () => ({
  StarScore: () => <div data-testid="star-score">StarScore</div>,
}));

describe('Kitchen Component', () => {
  const mockSetChefMessage = jest.fn();
  const mockSetPhase = jest.fn();
  const mockAddIngredient = jest.fn();
  const mockSetPizzaSlices = jest.fn();
  const mockSpeak = jest.fn();

  const defaultGameStoreState = {
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
    meals: {
      pizza: { name: 'Pizza' },
      burrito: { name: 'Burrito' },
    },
    kitchen: {
      back: 'Back',
      myMeal: (name: string) => `My ${name}`,
      addHint: 'Add ingredients to your meal',
      doubleTapHint: 'Double tap to add',
      emptyWarning: 'Add at least one ingredient',
      doneMessage: 'Great job!',
      ingredients: (count: number) => `${count} ingredients`,
      forPeople: (size: number) => `For ${size} people`,
      slices: (count: number) => `${count} slices`,
      doneButton: 'Done',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useGameStore as jest.Mock).mockReturnValue(defaultGameStoreState);
    (useLanguageStore as jest.Mock).mockReturnValue(defaultLanguageStore);
    (useT as jest.Mock).mockReturnValue(defaultT);
    (useSpeech as jest.Mock).mockReturnValue({ speak: mockSpeak });
    (getMealInfo as jest.Mock).mockReturnValue({
      emoji: '🍕',
      bgColor: '#fff8dc',
      accentColor: '#ff6b6b',
      hasSlices: true,
    });
    (formatPrice as jest.Mock).mockReturnValue('$5.00');
    (getMealCostUSD as jest.Mock).mockReturnValue(5);
  });

  describe('Rendering', () => {
    it('should render the Kitchen component with all major sections', () => {
      render(<Kitchen />);
      expect(screen.getByTestId('meal-plate')).toBeInTheDocument();
      expect(screen.getByTestId('ingredient-shelf')).toBeInTheDocument();
      expect(screen.getByTestId('chef-dialog')).toBeInTheDocument();
      expect(screen.getByTestId('done-button')).toBeInTheDocument();
    });

    it('should display the meal name in the header', () => {
      render(<Kitchen />);
      expect(screen.getByText(/My Pizza/)).toBeInTheDocument();
    });

    it('should display the back button', () => {
      render(<Kitchen />);
      expect(screen.getByRole('button', { name: /Back/i })).toBeInTheDocument();
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
      expect(screen.getByText(/💰 \$5.00/)).toBeInTheDocument();
    });

    it('should display StarScore component', () => {
      render(<Kitchen />);
      expect(screen.getByTestId('star-score')).toBeInTheDocument();
    });
  });

  describe('Back Button', () => {
    it('should navigate to mealSelect when back button is clicked', () => {
      render(<Kitchen />);
      const backButton = screen.getByRole('button', { name: /Back/i });
      fireEvent.click(backButton);
      expect(mockSetPhase).toHaveBeenCalledWith('mealSelect');
    });
  });

  describe('Pizza Slices', () => {
    it('should display slice picker button when meal has slices', () => {
      render(<Kitchen />);
      expect(screen.getByRole('button', { name: /8 slices/i })).toBeInTheDocument();
    });

    it('should toggle slice picker visibility when button is clicked', () => {
      render(<Kitchen />);
      const sliceButton = screen.getByRole('button', { name: /8 slices/i });
      fireEvent.click(sliceButton);
      expect(screen.getByRole('button', { name: '4' })).toBeInTheDocument();
      fireEvent.click(sliceButton);
      expect(screen.queryByRole('button', { name: '4' })).not.toBeInTheDocument();
    });

    it('should show slice options 4, 6, 8, 10, 12 when picker is open', () => {
      render(<Kitchen />);
      const sliceButton = screen.getByRole('button', { name: /8 slices/i });
      fireEvent.click(sliceButton);
      expect(screen.getByRole('button', { name: '4' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '6' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '8' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '10' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '12' })).toBeInTheDocument();
    });

    it('should update pizza slices when an option is selected', () => {
      render(<Kitchen />);
      const sliceButton = screen.getByRole('button', { name: /8 slices/i });
      fireEvent.click(sliceButton);
      const option6 = screen.getByRole('button', { name: '6' });
      fireEvent.click(option6);
      expect(mockSetPizzaSlices).toHaveBeenCalledWith(6);
    });

    it('should close picker after selecting a slice option', () => {
      render(<Kitchen />);
      const sliceButton = screen.getByRole('button', { name: /8 slices/i });
      fireEvent.click(sliceButton);
      const option6 = screen.getByRole('button', { name: '6' });
      fireEvent.click(option6);
      waitFor(() => {
        expect(screen.queryByRole('button', { name: '4' })).not.toBeInTheDocument();
      });
    });

    it('should not display slice picker button when meal does not have slices', () => {
      (getMealInfo as jest.Mock).mockReturnValue({
        emoji: '🌯',
        bgColor: '#fff8dc',
        accentColor: '#ff6b6b',
        hasSlices: false,
      });
      render(<Kitchen />);
      expect(screen.queryByRole('button', { name: /slices/i })).not.toBeInTheDocument();
    });
  });

  describe('Done Button', () => {
    it('should be enabled when there are 2 or more ingredients', () => {
      render(<Kitchen />);
      expect(screen.getByTestId('done-button')).not.toBeDisabled();
    });

    it('should be disabled when there are no ingredients', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStoreState,
        placedIngredients: [],
      });
      render(<Kitchen />);
      expect(screen.getByTestId('done-button')).toBeDisabled();
    });

    it('should show warning message when done is clicked with no ingredients', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStoreState,
        placedIngredients: [],
      });
      render(<Kitchen />);
      const doneButton = screen.getByTestId('done-button');
      fireEvent.click(doneButton);
      expect(mockSetChefMessage).toHaveBeenCalledWith('Add at least one ingredient', 'thinking');
    });

    it('should show done message when clicked with ingredients', () => {
      render(<Kitchen />);
      const doneButton = screen.getByTestId('done-button');
      fireEvent.click(doneButton);
      expect(mockSetChefMessage).toHaveBeenCalledWith('Great job!', 'excited');
    });

    it('should set phase to mealSplash when done is clicked for non-burrito meals', () => {
      render(<Kitchen />);
      const doneButton = screen.getByTestId('done-button');
      fireEvent.click(doneButton);
      expect(mockSetPhase).toHaveBeenCalledWith('mealSplash');
    });

    it('should trigger burrito wrapping animation for burrito meals', async () => {
      jest.useFakeTimers();
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStoreState,
        selectedMeal: 'burrito',
      });
      render(<Kitchen />);
      const doneButton = screen.getByTestId('done-button');
      fireEvent.click(doneButton);
      expect(mockSetChefMessage).toHaveBeenCalledWith('Great job!', 'excited');
      jest.advanceTimersByTime(1800);
      expect(mockSetPhase).toHaveBeenCalledWith('mealSplash');
      jest.useRealTimers();
    });
  });

  describe('Initial Effects', () => {
    it('should set initial chef message on mount', () => {
      render(<Kitchen />);
      expect(mockSetChefMessage).toHaveBeenCalledWith('Add ingredients to your meal', 'happy');
    });

    it('should speak initial message on mount', () => {
      render(<Kitchen />);
      expect(mockSpeak).toHaveBeenCalledWith('My Pizza. Add ingredients to your meal. Double tap to add');
    });

    it('should include meal name in initial speech', () => {
      (useT as jest.Mock).mockReturnValue({
        ...defaultT,
        meals: {
          pizza: { name: 'Delicious Pizza' },
          burrito: { name: 'Burrito' },
        },
      });
      render(<Kitchen />);
      expect(mockSpeak).toHaveBeenCalledWith('My Delicious Pizza. Add ingredients to your meal. Double tap to add');
    });
  });

  describe('Ingredient Count Updates', () => {
    it('should update ingredient count when placedIngredients changes', () => {
      const { rerender } = render(<Kitchen />);
      expect(screen.getByText('2 ingredients')).toBeInTheDocument();

      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStoreState,
        placedIngredients: ['cheese', 'tomato', 'basil'],
      });
      rerender(<Kitchen />);
      expect(screen.getByText('3 ingredients')).toBeInTheDocument();
    });

    it('should disable done button when ingredient count becomes 0', () => {
      const { rerender } = render(<Kitchen />);
      expect(screen.getByTestId('done-button')).not.toBeDisabled();

      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStoreState,
        placedIngredients: [],
      });
      rerender(<Kitchen />);
      expect(screen.getByTestId('done-button')).toBeDisabled();
    });

    it('should update button variant based on ingredient count', () => {
      const { rerender } = render(<Kitchen />);
      let button = screen.getByTestId('done-button');
      expect(button).toHaveAttribute('variant', 'success');

      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStoreState,
        placedIngredients: ['cheese'],
      });
      rerender(<Kitchen />);
      button = screen.getByTestId('done-button');
      expect(button).toHaveAttribute('variant', 'secondary');
    });
  });

  describe('Styling and Theming', () => {
    it('should apply meal background color', () => {
      const { container } = render(<Kitchen />);
      const mainDiv = container.querySelector('[style*="background"]');
      expect(mainDiv).toHaveStyle('background: linear-gradient(180deg, #fff8dc 0%, white 100%)');
    });

    it('should use meal accent color for ingredient badge', () => {
      render(<Kitchen />);
      const ingredientBadge = screen.getByText('2 ingredients').parentElement;
      expect(ingredientBadge).toHaveStyle('background: #ff6b6b');
    });

    it('should display meal emoji in header', () => {
      render(<Kitchen />);
      expect(screen.getByText(/🍕/)).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined selectedMeal gracefully', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStoreState,
        selectedMeal: undefined,
      });
      expect(() => render(<Kitchen />)).not.toThrow();
    });

    it('should handle empty placedIngredients array', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStoreState,
        placedIngredients: [],
      });
      render(<Kitchen />);
      expect(screen.getByText('0 ingredients')).toBeInTheDocument();
    });

    it('should handle single ingredient', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStoreState,
        placedIngredients: ['cheese'],
      });
      render(<Kitchen />);
      expect(screen.getByText('1 ingredients')).toBeInTheDocument();
    });

    it('should handle large family sizes', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStoreState,
        familySize: 100,
      });
      render(<Kitchen />);
      expect(screen.getByText('For 100 people')).toBeInTheDocument();
    });
  });

  describe('Burrito Specific Behavior', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should set burritoWrapping state for burrito meals', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStoreState,
        selectedMeal: 'burrito',
      });
      const { container } = render(<Kitchen />);
      const doneButton = screen.getByTestId('done-button');
      fireEvent.click(doneButton);
      
      jest.advanceTimersByTime(1800);
      expect(mockSetPhase).toHaveBeenCalledWith('mealSplash');
    });

    it('should transition to mealSplash after 1800ms for burrito', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStoreState,
        selectedMeal: 'burrito',
      });
      render(<Kitchen />);
      const doneButton = screen.getByTestId('done-button');
      fireEvent.click(doneButton);
      
      expect(mockSetPhase).not.toHaveBeenCalledWith('mealSplash');
      jest.advanceTimersByTime(1800);
      expect(mockSetPhase).toHaveBeenCalledWith('mealSplash');
    });

    it('should immediately transition to mealSplash for non-burrito meals', () => {
      render(<Kitchen />);
      const doneButton = screen.getByTestId('done-button');
      fireEvent.click(doneButton);
      expect(mockSetPhase).toHaveBeenCalledWith('mealSplash');
    });
  });

  describe('Price Updates', () => {
    it('should display updated price when ingredient count changes', () => {
      const { rerender } = render(<Kitchen />);
      expect(screen.getByText(/💰 \$5.00/)).toBeInTheDocument();

      (getMealCostUSD as jest.Mock).mockReturnValue(7.5);
      (formatPrice as jest.Mock).mockReturnValue('$7.50');
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStoreState,
        placedIngredients: ['cheese', 'tomato', 'basil'],
      });
      rerender(<Kitchen />);
      expect(screen.getByText(/💰 \$7.50/)).toBeInTheDocument();
    });

    it('should call formatPrice with correct language', () => {
      render(<Kitchen />);
      expect(formatPrice).toHaveBeenCalledWith(5, 'en');
    });
  });
});