// @ts-nocheck
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Kitchen } from './Kitchen';
import { useGameStore } from '../../store/gameStore';
import { useLanguageStore } from '../../store/languageStore';
import { useSpeech } from '../../hooks/useSpeech';
import { getMealInfo } from '../../data/meals';
import { useT } from '../../i18n/useT';

jest.mock('../../store/gameStore');
jest.mock('../../store/languageStore');
jest.mock('../../hooks/useSpeech');
jest.mock('../../data/meals');
jest.mock('../../i18n/useT');
jest.mock('../Chef/ChefDialog', () => ({
  ChefDialog: () => <div data-testid="chef-dialog">Chef Dialog</div>,
}));
jest.mock('../Ingredients/IngredientShelf', () => ({
  IngredientShelf: ({ onAdd }: { onAdd: jest.Mock }) => (
    <div data-testid="ingredient-shelf" onClick={() => onAdd('ingredient1')}>
      Ingredient Shelf
    </div>
  ),
}));
jest.mock('../UI/Button', () => ({
  Button: ({ onClick, disabled, children, variant }: any) => (
    <button onClick={onClick} disabled={disabled} data-variant={variant}>
      {children}
    </button>
  ),
}));
jest.mock('../UI/StarScore', () => ({
  StarScore: () => <div data-testid="star-score">Star Score</div>,
}));
jest.mock('./MealPlate', () => ({
  MealPlate: ({ burritoWrapping }: { burritoWrapping: boolean }) => (
    <div data-testid="meal-plate" data-burrito={burritoWrapping}>
      Meal Plate
    </div>
  ),
}));
jest.mock('../../utils/currency', () => ({
  getMealCostUSD: jest.fn(() => 10.5),
  formatPrice: jest.fn((price: number) => `$${price.toFixed(2)}`),
}));

describe('Kitchen', () => {
  const mockSetPhase = jest.fn();
  const mockSetChefMessage = jest.fn();
  const mockAddIngredient = jest.fn();
  const mockSetPizzaSlices = jest.fn();
  const mockSpeak = jest.fn();

  const defaultGameStoreValues = {
    selectedMeal: 'pizza',
    placedIngredients: ['cheese', 'tomato'],
    pizzaSlices: 8,
    setPizzaSlices: mockSetPizzaSlices,
    addIngredient: mockAddIngredient,
    setPhase: mockSetPhase,
    setChefMessage: mockSetChefMessage,
    familySize: 2,
  };

  const defaultMealInfo = {
    emoji: '🍕',
    bgColor: '#fff3e0',
    accentColor: '#ff6f00',
    hasSlices: true,
    ingredients: [],
  };

  const defaultLanguageStore = {
    language: 'en',
  };

  const defaultTranslations = {
    kitchen: {
      addHint: 'Add ingredients',
      myMeal: (name: string) => `My ${name}`,
      doubleTapHint: 'Double tap to add',
      emptyWarning: 'Add some ingredients first',
      doneMessage: 'Your meal is ready!',
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

  beforeEach(() => {
    jest.clearAllMocks();
    (useGameStore as jest.Mock).mockReturnValue(defaultGameStoreValues);
    (useLanguageStore as jest.Mock).mockReturnValue(defaultLanguageStore);
    (useSpeech as jest.Mock).mockReturnValue({ speak: mockSpeak });
    (getMealInfo as jest.Mock).mockReturnValue(defaultMealInfo);
    (useT as jest.Mock).mockReturnValue(defaultTranslations);
  });

  describe('Rendering', () => {
    it('should render the Kitchen component with correct meal', () => {
      render(<Kitchen />);
      expect(screen.getByText(/My Pizza/)).toBeInTheDocument();
    });

    it('should display the chef dialog', () => {
      render(<Kitchen />);
      expect(screen.getByTestId('chef-dialog')).toBeInTheDocument();
    });

    it('should display the ingredient shelf', () => {
      render(<Kitchen />);
      expect(screen.getByTestId('ingredient-shelf')).toBeInTheDocument();
    });

    it('should display the meal plate', () => {
      render(<Kitchen />);
      expect(screen.getByTestId('meal-plate')).toBeInTheDocument();
    });

    it('should display the star score', () => {
      render(<Kitchen />);
      expect(screen.getByTestId('star-score')).toBeInTheDocument();
    });

    it('should display ingredient count', () => {
      render(<Kitchen />);
      expect(screen.getByText('2 ingredients')).toBeInTheDocument();
    });

    it('should display family size', () => {
      render(<Kitchen />);
      expect(screen.getByText('For 2 people')).toBeInTheDocument();
    });

    it('should display meal cost', () => {
      render(<Kitchen />);
      expect(screen.getByText(/💰/)).toBeInTheDocument();
    });

    it('should display done button', () => {
      render(<Kitchen />);
      expect(screen.getByRole('button', { name: 'Done' })).toBeInTheDocument();
    });

    it('should display back button', () => {
      render(<Kitchen />);
      expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
    });
  });

  describe('Pizza slices functionality', () => {
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

    it('should show slice picker when slices button is clicked', async () => {
      render(<Kitchen />);
      const slicesButton = screen.getByText('8 slices');
      fireEvent.click(slicesButton);
      await waitFor(() => {
        expect(screen.getByText('4')).toBeInTheDocument();
      });
    });

    it('should hide slice picker when toggled twice', async () => {
      render(<Kitchen />);
      const slicesButton = screen.getByText('8 slices');
      fireEvent.click(slicesButton);
      await waitFor(() => {
        expect(screen.getByText('4')).toBeInTheDocument();
      });
      fireEvent.click(slicesButton);
      await waitFor(() => {
        expect(screen.queryByText('4')).not.toBeInTheDocument();
      });
    });

    it('should update pizza slices when slice option is clicked', async () => {
      render(<Kitchen />);
      const slicesButton = screen.getByText('8 slices');
      fireEvent.click(slicesButton);
      await waitFor(() => {
        const sliceButton = screen.getByRole('button', { name: '6' });
        fireEvent.click(sliceButton);
      });
      expect(mockSetPizzaSlices).toHaveBeenCalledWith(6);
    });

    it('should highlight current slice selection', async () => {
      render(<Kitchen />);
      const slicesButton = screen.getByText('8 slices');
      fireEvent.click(slicesButton);
      await waitFor(() => {
        const selectedButton = screen.getByRole('button', { name: '8' });
        expect(selectedButton).toHaveStyle(`border: 2px solid ${defaultMealInfo.accentColor}`);
      });
    });
  });

  describe('Done button functionality', () => {
    it('should have correct variant when ingredients are present', () => {
      render(<Kitchen />);
      const doneButton = screen.getByRole('button', { name: 'Done' });
      expect(doneButton).toHaveAttribute('data-variant', 'success');
    });

    it('should have secondary variant when no ingredients', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStoreValues,
        placedIngredients: [],
      });
      render(<Kitchen />);
      const doneButton = screen.getByRole('button', { name: 'Done' });
      expect(doneButton).toHaveAttribute('data-variant', 'secondary');
    });

    it('should be disabled when no ingredients', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStoreValues,
        placedIngredients: [],
      });
      render(<Kitchen />);
      const doneButton = screen.getByRole('button', { name: 'Done' });
      expect(doneButton).toBeDisabled();
    });

    it('should show warning message when done button clicked with empty ingredients', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStoreValues,
        placedIngredients: [],
      });
      render(<Kitchen />);
      const doneButton = screen.getByRole('button', { name: 'Done' });
      fireEvent.click(doneButton);
      expect(mockSetChefMessage).toHaveBeenCalledWith('Add some ingredients first', 'thinking');
    });

    it('should transition to mealSplash when done with pizza', () => {
      render(<Kitchen />);
      const doneButton = screen.getByRole('button', { name: 'Done' });
      fireEvent.click(doneButton);
      expect(mockSetChefMessage).toHaveBeenCalledWith('Your meal is ready!', 'excited');
      expect(mockSetPhase).toHaveBeenCalledWith('mealSplash');
    });

    it('should trigger burrito wrapping before transitioning', (done) => {
      jest.useFakeTimers();
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStoreValues,
        selectedMeal: 'burrito',
      });
      render(<Kitchen />);
      const doneButton = screen.getByRole('button', { name: 'Done' });
      fireEvent.click(doneButton);
      expect(mockSetChefMessage).toHaveBeenCalledWith('Your meal is ready!', 'excited');
      const mealPlate = screen.getByTestId('meal-plate');
      expect(mealPlate).toHaveAttribute('data-burrito', 'true');
      jest.advanceTimersByTime(1800);
      expect(mockSetPhase).toHaveBeenCalledWith('mealSplash');
      jest.useRealTimers();
      done();
    });
  });

  describe('Back button functionality', () => {
    it('should navigate back to meal select', () => {
      render(<Kitchen />);
      const backButton = screen.getByRole('button', { name: 'Back' });
      fireEvent.click(backButton);
      expect(mockSetPhase).toHaveBeenCalledWith('mealSelect');
    });
  });

  describe('Effect hooks', () => {
    it('should set chef message on mount', () => {
      render(<Kitchen />);
      expect(mockSetChefMessage).toHaveBeenCalledWith('Add ingredients', 'happy');
    });

    it('should call speak on mount with correct message', () => {
      render(<Kitchen />);
      expect(mockSpeak).toHaveBeenCalledWith(
        expect.stringContaining('My Pizza')
      );
    });

    it('should include meal name in speak message', () => {
      render(<Kitchen />);
      expect(mockSpeak).toHaveBeenCalledWith(
        expect.stringContaining('Pizza')
      );
    });
  });

  describe('Edge cases', () => {
    it('should handle minimal ingredient count', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStoreValues,
        placedIngredients: ['cheese'],
      });
      render(<Kitchen />);
      expect(screen.getByText('1 ingredients')).toBeInTheDocument();
    });

    it('should handle large family sizes', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStoreValues,
        familySize: 12,
      });
      render(<Kitchen />);
      expect(screen.getByText('For 12 people')).toBeInTheDocument();
    });

    it('should handle many ingredients', () => {
      const manyIngredients = Array(10).fill('ingredient');
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStoreValues,
        placedIngredients: manyIngredients,
      });
      render(<Kitchen />);
      expect(screen.getByText('10 ingredients')).toBeInTheDocument();
    });

    it('should display correct meal emoji', () => {
      (getMealInfo as jest.Mock).mockReturnValue({
        ...defaultMealInfo,
        emoji: '🌯',
      });
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStoreValues,
        selectedMeal: 'burrito',
      });
      render(<Kitchen />);
      expect(screen.getByText(/🌯/)).toBeInTheDocument();
    });
  });

  describe('Visual and styling', () => {
    it('should apply meal background color', () => {
      render(<Kitchen />);
      const mainDiv = screen.getByTestId('meal-plate').parentElement?.parentElement;
      expect(mainDiv).toHaveStyle(
        `background: linear-gradient(180deg, ${defaultMealInfo.bgColor} 0%, white 100%)`
      );
    });

    it('should use meal accent color for ingredient badge', () => {
      render(<Kitchen />);
      const ingredientBadge = screen.getByText('2 ingredients').parentElement;
      expect(ingredientBadge).toHaveStyle(`background: ${defaultMealInfo.accentColor}`);
    });
  });

  describe('Ingredient management', () => {
    it('should call addIngredient when ingredient is added', async () => {
      render(<Kitchen />);
      const shelf = screen.getByTestId('ingredient-shelf');
      fireEvent.click(shelf);
      expect(mockAddIngredient).toHaveBeenCalledWith('ingredient1');
    });
  });

  describe('Slice picker button options', () => {
    it('should display all slice options in picker', async () => {
      render(<Kitchen />);
      const slicesButton = screen.getByText('8 slices');
      fireEvent.click(slicesButton);
      await waitFor(() => {
        expect(screen.getByRole('button', { name: '4' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '6' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '8' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '10' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '12' })).toBeInTheDocument();
      });
    });

    it('should close picker after selecting a slice option', async () => {
      render(<Kitchen />);
      const slicesButton = screen.getByText('8 slices');
      fireEvent.click(slicesButton);
      await waitFor(() => {
        const fourSlicesButton = screen.getByRole('button', { name: '4' });
        fireEvent.click(fourSlicesButton);
      });
      expect(mockSetPizzaSlices).toHaveBeenCalledWith(4);
    });
  });
});