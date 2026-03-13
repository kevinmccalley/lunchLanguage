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
  MealPlate: ({ plateRef, burritoWrapping }: any) => <div ref={plateRef} data-testid="meal-plate">MealPlate {burritoWrapping && 'wrapping'}</div>,
}));
jest.mock('../Ingredients/IngredientShelf', () => ({
  IngredientShelf: ({ onAdd, plateRef }: any) => (
    <div data-testid="ingredient-shelf">
      <button onClick={() => onAdd({ id: 'test', name: 'test' })}>Add Ingredient</button>
    </div>
  ),
}));
jest.mock('../Chef/ChefDialog', () => ({
  ChefDialog: ({ compact }: any) => <div data-testid="chef-dialog">Chef {compact && 'compact'}</div>,
}));
jest.mock('../UI/Button', () => ({
  Button: ({ children, onClick, disabled, variant }: any) => (
    <button onClick={onClick} disabled={disabled} data-testid={`button-${variant}`}>
      {children}
    </button>
  ),
}));
jest.mock('../UI/StarScore', () => ({
  StarScore: () => <div data-testid="star-score">StarScore</div>,
}));

describe('Kitchen', () => {
  const mockSetChefMessage = jest.fn();
  const mockSetPhase = jest.fn();
  const mockAddIngredient = jest.fn();
  const mockSetPizzaSlices = jest.fn();
  const mockSpeak = jest.fn();

  const defaultGameStore = {
    selectedMeal: 'pizza',
    placedIngredients: [],
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

  const defaultMealInfo = {
    bgColor: '#fff3e0',
    accentColor: '#ff6b6b',
    emoji: '🍕',
    hasSlices: true,
  };

  const defaultTranslations = {
    kitchen: {
      addHint: 'Add ingredients to your plate',
      myMeal: (name: string) => `My ${name}`,
      doubleTapHint: 'Double tap to add',
      emptyWarning: 'Please add at least one ingredient',
      doneMessage: 'Looks delicious!',
      doneButton: 'Done',
      back: 'Back',
      ingredients: (count: number) => `${count} ingredients`,
      forPeople: (size: number) => `For ${size} people`,
      slices: (count: number) => `${count} slices`,
    },
    meals: {
      pizza: { name: 'Pizza' },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useGameStore as jest.Mock).mockReturnValue(defaultGameStore);
    (useLanguageStore as jest.Mock).mockReturnValue(defaultLanguageStore);
    (useT as jest.Mock).mockReturnValue(defaultTranslations);
    (useSpeech as jest.Mock).mockReturnValue({ speak: mockSpeak });
    (getMealInfo as jest.Mock).mockReturnValue(defaultMealInfo);
    (getMealCostUSD as jest.Mock).mockReturnValue(15.99);
    (formatPrice as jest.Mock).mockReturnValue('$15.99');
  });

  describe('rendering', () => {
    test('renders Kitchen component with all main sections', () => {
      render(<Kitchen />);

      expect(screen.getByTestId('chef-dialog')).toBeInTheDocument();
      expect(screen.getByTestId('meal-plate')).toBeInTheDocument();
      expect(screen.getByTestId('ingredient-shelf')).toBeInTheDocument();
      expect(screen.getByTestId('star-score')).toBeInTheDocument();
    });

    test('renders back button and navigates to mealSelect', () => {
      render(<Kitchen />);

      const backButton = screen.getByText('Back');
      fireEvent.click(backButton);

      expect(mockSetPhase).toHaveBeenCalledWith('mealSelect');
    });

    test('renders meal name with emoji in header', () => {
      render(<Kitchen />);

      expect(screen.getByText(/🍕.*Pizza/)).toBeInTheDocument();
    });

    test('renders ingredient count badge', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        placedIngredients: [{ id: '1' }, { id: '2' }, { id: '3' }],
      });

      render(<Kitchen />);

      expect(screen.getByText('3 ingredients')).toBeInTheDocument();
    });

    test('renders family size info', () => {
      render(<Kitchen />);

      expect(screen.getByText('For 4 people')).toBeInTheDocument();
    });

    test('renders price with formatted cost', () => {
      render(<Kitchen />);

      expect(screen.getByText(/💰.*\$15.99/)).toBeInTheDocument();
    });

    test('renders Done button', () => {
      render(<Kitchen />);

      expect(screen.getByTestId('button-secondary')).toBeInTheDocument();
    });
  });

  describe('slice picker', () => {
    beforeEach(() => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        placedIngredients: [{ id: '1' }],
      });
    });

    test('shows slice picker button when meal has slices', () => {
      render(<Kitchen />);

      expect(screen.getByText('8 slices')).toBeInTheDocument();
    });

    test('does not show slice picker button when meal has no slices', () => {
      (getMealInfo as jest.Mock).mockReturnValue({
        ...defaultMealInfo,
        hasSlices: false,
      });

      render(<Kitchen />);

      expect(screen.queryByText(/\d+ slices/)).not.toBeInTheDocument();
    });

    test('toggles slice picker visibility when button clicked', () => {
      render(<Kitchen />);

      const sliceButton = screen.getByText('8 slices');
      fireEvent.click(sliceButton);

      expect(screen.getByRole('button', { name: '4' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '6' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '8' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '10' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '12' })).toBeInTheDocument();
    });

    test('sets pizza slices when slice option clicked', () => {
      render(<Kitchen />);

      const sliceButton = screen.getByText('8 slices');
      fireEvent.click(sliceButton);

      const sliceOption = screen.getByRole('button', { name: '12' });
      fireEvent.click(sliceOption);

      expect(mockSetPizzaSlices).toHaveBeenCalledWith(12);
    });

    test('closes slice picker after selecting a slice', () => {
      render(<Kitchen />);

      const sliceButton = screen.getByText('8 slices');
      fireEvent.click(sliceButton);

      const sliceOption = screen.getByRole('button', { name: '12' });
      fireEvent.click(sliceOption);

      expect(screen.queryByRole('button', { name: '4' })).not.toBeInTheDocument();
    });

    test('highlights currently selected slice count', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        placedIngredients: [{ id: '1' }],
        pizzaSlices: 6,
      });

      render(<Kitchen />);

      const sliceButton = screen.getByText('6 slices');
      fireEvent.click(sliceButton);

      const selectedSliceButton = screen.getByRole('button', { name: '6' });
      expect(selectedSliceButton).toHaveStyle({
        border: `2px solid ${defaultMealInfo.accentColor}`,
        background: defaultMealInfo.accentColor,
        color: 'white',
      });
    });
  });

  describe('done button behavior', () => {
    test('disables done button when no ingredients placed', () => {
      render(<Kitchen />);

      expect(screen.getByTestId('button-secondary')).toBeDisabled();
    });

    test('enables done button when ingredients placed', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        placedIngredients: [{ id: '1' }, { id: '2' }],
      });

      render(<Kitchen />);

      expect(screen.getByTestId('button-success')).not.toBeDisabled();
    });

    test('shows warning when done clicked with no ingredients', () => {
      render(<Kitchen />);

      const doneButton = screen.getByText('Done');
      fireEvent.click(doneButton);

      expect(mockSetChefMessage).toHaveBeenCalledWith(
        'Please add at least one ingredient',
        'thinking'
      );
    });

    test('shows done message when completed with ingredients for non-burrito', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        placedIngredients: [{ id: '1' }],
      });

      render(<Kitchen />);

      const doneButton = screen.getByText('Done');
      fireEvent.click(doneButton);

      expect(mockSetChefMessage).toHaveBeenCalledWith(
        'Looks delicious!',
        'excited'
      );
    });

    test('advances to mealSplash phase for non-burrito meals', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        selectedMeal: 'pizza',
        placedIngredients: [{ id: '1' }],
      });

      render(<Kitchen />);

      const doneButton = screen.getByText('Done');
      fireEvent.click(doneButton);

      expect(mockSetPhase).toHaveBeenCalledWith('mealSplash');
    });

    test('triggers burrito wrapping animation for burrito meals', () => {
      jest.useFakeTimers();
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        selectedMeal: 'burrito',
        placedIngredients: [{ id: '1' }],
      });

      const { rerender } = render(<Kitchen />);

      const doneButton = screen.getByText('Done');
      fireEvent.click(doneButton);

      expect(screen.getByTestId('meal-plate')).toHaveTextContent('wrapping');

      jest.advanceTimersByTime(1800);
      rerender(<Kitchen />);

      expect(mockSetPhase).toHaveBeenCalledWith('mealSplash');

      jest.useRealTimers();
    });

    test('changes button variant to success with 2+ ingredients', () => {
      const { rerender } = render(<Kitchen />);

      expect(screen.getByTestId('button-secondary')).toBeInTheDocument();

      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        placedIngredients: [{ id: '1' }, { id: '2' }],
      });

      rerender(<Kitchen />);

      expect(screen.getByTestId('button-success')).toBeInTheDocument();
    });
  });

  describe('initialization and speech', () => {
    test('speaks welcome message on mount', () => {
      render(<Kitchen />);

      expect(mockSpeak).toHaveBeenCalledWith(
        'My Pizza. Add ingredients to your plate. Double tap to add'
      );
    });

    test('sets initial chef message on mount', () => {
      render(<Kitchen />);

      expect(mockSetChefMessage).toHaveBeenCalledWith(
        'Add ingredients to your plate',
        'happy'
      );
    });

    test('uses correct meal name in welcome message', () => {
      (useT as jest.Mock).mockReturnValue({
        ...defaultTranslations,
        meals: {
          sushi: { name: 'Sushi' },
        },
      });
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        selectedMeal: 'sushi',
      });

      render(<Kitchen />);

      expect(mockSpeak).toHaveBeenCalledWith(
        expect.stringContaining('Sushi')
      );
    });
  });

  describe('ingredient count updates', () => {
    test('updates ingredient count badge when ingredients change', () => {
      const { rerender } = render(<Kitchen />);

      expect(screen.getByText('0 ingredients')).toBeInTheDocument();

      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        placedIngredients: [{ id: '1' }, { id: '2' }],
      });

      rerender(<Kitchen />);

      expect(screen.getByText('2 ingredients')).toBeInTheDocument();
    });

    test('updates price when ingredient count changes', () => {
      const { rerender } = render(<Kitchen />);

      (getMealCostUSD as jest.Mock).mockReturnValue(20.99);
      (formatPrice as jest.Mock).mockReturnValue('$20.99');

      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        placedIngredients: [{ id: '1' }, { id: '2' }],
      });

      rerender(<Kitchen />);

      expect(screen.getByText(/💰.*\$20.99/)).toBeInTheDocument();
    });
  });

  describe('language and localization', () => {
    test('uses language from store for price formatting', () => {
      (useLanguageStore as jest.Mock).mockReturnValue({
        language: 'es',
      });

      render(<Kitchen />);

      expect(formatPrice).toHaveBeenCalledWith(
        expect.any(Number),
        'es'
      );
    });

    test('renders all translated text elements', () => {
      render(<Kitchen />);

      expect(screen.getByText('Back')).toBeInTheDocument();
      expect(screen.getByText('Done')).toBeInTheDocument();
    });
  });

  describe('meal info integration', () => {
    test('uses meal info for background color', () => {
      const customMealInfo = {
        ...defaultMealInfo,
        bgColor: '#ff0000',
      };
      (getMealInfo as jest.Mock).mockReturnValue(customMealInfo);

      const { container } = render(<Kitchen />);

      const mainDiv = container.firstChild as HTMLElement;
      expect(mainDiv).toHaveStyle({
        background: `linear-gradient(180deg, #ff0000 0%, white 100%)`,
      });
    });

    test('uses meal info for accent color in badges', () => {
      const customMealInfo = {
        ...defaultMealInfo,
        accentColor: '#00ff00',
      };
      (getMealInfo as jest.Mock).mockReturnValue(customMealInfo);

      render(<Kitchen />);

      expect(screen.getByText('0 ingredients')).toHaveStyle({
        background: '#00ff00',
      });
    });

    test('calls getMealInfo with selected meal', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        selectedMeal: 'burrito',
      });

      render(<Kitchen />);

      expect(getMealInfo).toHaveBeenCalledWith('burrito');
    });
  });

  describe('edge cases', () => {
    test('handles empty placed ingredients array', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        placedIngredients: [],
      });

      render(<Kitchen />);

      expect(screen.getByText('0 ingredients')).toBeInTheDocument();
    });

    test('handles large ingredient counts', () => {
      const manyIngredients = Array.from({ length: 50 }, (_, i) => ({ id: `${i}` }));
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        placedIngredients: manyIngredients,
      });

      render(<Kitchen />);

      expect(screen.getByText('50 ingredients')).toBeInTheDocument();
    });

    test('handles large family sizes', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        familySize: 20,
      });

      render(<Kitchen />);

      expect(screen.getByText('For 20 people')).toBeInTheDocument();
    });

    test('handles meal with no slices property', () => {
      (getMealInfo as jest.Mock).mockReturnValue({
        bgColor: '#fff3e0',
        accentColor: '#ff6b6b',
        emoji: '🌯',
        hasSlices: false,
      });

      render(<Kitchen />);

      expect(screen.queryByText(/\d+ slices/)).not.toBeInTheDocument();
    });
  });

  describe('plate reference', () => {
    test('passes plateRef to MealPlate component', () => {
      const { container } = render(<Kitchen />);

      const mealPlate = screen.getByTestId('meal-plate');
      expect(mealPlate).toBeInTheDocument();
    });

    test('passes plateRef to IngredientShelf component', () => {
      render(<Kitchen />);

      expect(screen.getByTestId('ingredient-shelf')).toBeInTheDocument();
    });
  });
});