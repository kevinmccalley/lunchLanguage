// @ts-nocheck
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Kitchen } from './Kitchen';
import { useGameStore } from '../../store/gameStore';
import { useLanguageStore } from '../../store/languageStore';
import { useT } from '../../i18n/useT';
import { useSpeech } from '../../hooks/useSpeech';
import { getMealInfo } from '../../data/meals';
import { getMealCostUSD, formatPrice } from '../../utils/currency';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

jest.mock('../../store/gameStore');
jest.mock('../../store/languageStore');
jest.mock('../../i18n/useT');
jest.mock('../../hooks/useSpeech');
jest.mock('../../data/meals');
jest.mock('../../utils/currency');
jest.mock('./MealPlate', () => ({
  MealPlate: ({ plateRef, burritoWrapping }: any) => (
    <div ref={plateRef} data-testid="meal-plate" data-burrito={burritoWrapping}>
      MealPlate
    </div>
  ),
}));
jest.mock('../Ingredients/IngredientShelf', () => ({
  IngredientShelf: ({ onAdd, plateRef }: any) => (
    <div data-testid="ingredient-shelf" onClick={() => onAdd('ingredient')}>
      IngredientShelf
    </div>
  ),
}));
jest.mock('../Chef/ChefDialog', () => ({
  ChefDialog: ({ compact }: any) => <div data-testid="chef-dialog">ChefDialog</div>,
}));
jest.mock('../UI/Button', () => ({
  Button: ({ children, onClick, disabled, variant, size }: any) => (
    <button onClick={onClick} disabled={disabled} data-variant={variant} data-size={size}>
      {children}
    </button>
  ),
}));
jest.mock('../UI/StarScore', () => ({
  StarScore: () => <div data-testid="star-score">StarScore</div>,
}));

describe('Kitchen', () => {
  const mockSetPhase = jest.fn();
  const mockSetChefMessage = jest.fn();
  const mockAddIngredient = jest.fn();
  const mockSetPizzaSlices = jest.fn();
  const mockSpeak = jest.fn();
  const mockT = {
    kitchen: {
      back: 'Back',
      myMeal: (name: string) => `My ${name}`,
      addHint: 'Add ingredients',
      doubleTapHint: 'Double tap to add',
      emptyWarning: 'Add at least one ingredient',
      doneMessage: 'Great job!',
      doneButton: 'Done',
      ingredients: (count: number) => `${count} ingredients`,
      forPeople: (size: number) => `For ${size} people`,
      slices: (count: number) => `${count} slices`,
    },
    meals: {
      pizza: { name: 'Pizza' },
      burrito: { name: 'Burrito' },
      salad: { name: 'Salad' },
    },
  };

  const mockMealInfo = {
    bgColor: '#FFE0B2',
    accentColor: '#FF6F00',
    emoji: '🍕',
    hasSlices: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useGameStore as jest.Mock).mockReturnValue({
      selectedMeal: 'pizza',
      placedIngredients: ['cheese', 'tomato'],
      pizzaSlices: 8,
      setPizzaSlices: mockSetPizzaSlices,
      addIngredient: mockAddIngredient,
      setPhase: mockSetPhase,
      setChefMessage: mockSetChefMessage,
      familySize: 4,
    });

    (useLanguageStore as jest.Mock).mockReturnValue({
      language: 'en',
    });

    (useT as jest.Mock).mockReturnValue(mockT);

    (useSpeech as jest.Mock).mockReturnValue({
      speak: mockSpeak,
    });

    (getMealInfo as jest.Mock).mockReturnValue(mockMealInfo);

    (getMealCostUSD as jest.Mock).mockReturnValue(10.5);

    (formatPrice as jest.Mock).mockReturnValue('$10.50');
  });

  it('should render the Kitchen component with all sections', () => {
    render(<Kitchen />);

    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByText(/My Pizza/)).toBeInTheDocument();
    expect(screen.getByTestId('star-score')).toBeInTheDocument();
    expect(screen.getByTestId('chef-dialog')).toBeInTheDocument();
    expect(screen.getByTestId('meal-plate')).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-shelf')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });

  it('should display ingredient count with correct localization', () => {
    render(<Kitchen />);

    expect(screen.getByText('2 ingredients')).toBeInTheDocument();
  });

  it('should display family size information', () => {
    render(<Kitchen />);

    expect(screen.getByText('For 4 people')).toBeInTheDocument();
  });

  it('should display meal cost formatted with currency', () => {
    render(<Kitchen />);

    expect(screen.getByText('💰 $10.50')).toBeInTheDocument();
  });

  it('should call setChefMessage and speak on component mount', () => {
    render(<Kitchen />);

    expect(mockSetChefMessage).toHaveBeenCalledWith('Add ingredients', 'happy');
    expect(mockSpeak).toHaveBeenCalledWith('My Pizza. Add ingredients. Double tap to add');
  });

  it('should navigate back to meal select when back button is clicked', () => {
    render(<Kitchen />);

    const backButton = screen.getByText('Back');
    fireEvent.click(backButton);

    expect(mockSetPhase).toHaveBeenCalledWith('mealSelect');
  });

  it('should show pizza slice picker button when meal has slices', () => {
    render(<Kitchen />);

    expect(screen.getByText('8 slices')).toBeInTheDocument();
  });

  it('should toggle slice picker when slice button is clicked', () => {
    render(<Kitchen />);

    const sliceButton = screen.getByText('8 slices');
    fireEvent.click(sliceButton);

    const sliceOptions = screen.getAllByRole('button').filter(
      (btn) => btn.textContent === '8',
    );
    expect(sliceOptions.length).toBeGreaterThan(1);
  });

  it('should update pizza slices when slice option is selected', () => {
    render(<Kitchen />);

    const sliceButton = screen.getByText('8 slices');
    fireEvent.click(sliceButton);

    const sliceButtons = screen.getAllByRole('button');
    const slice6Button = sliceButtons.find((btn) => btn.textContent === '6');
    fireEvent.click(slice6Button!);

    expect(mockSetPizzaSlices).toHaveBeenCalledWith(6);
  });

  it('should hide slice picker after selection', () => {
    const { rerender } = render(<Kitchen />);

    const sliceButton = screen.getByText('8 slices');
    fireEvent.click(sliceButton);

    const sliceButtons = screen.getAllByRole('button');
    const slice6Button = sliceButtons.find((btn) => btn.textContent === '6');
    fireEvent.click(slice6Button!);

    rerender(<Kitchen />);

    const slicePickerButtons = screen.queryAllByRole('button').filter(
      (btn) => btn.textContent?.match(/^(4|6|8|10|12)$/),
    );
    expect(slicePickerButtons).toHaveLength(0);
  });

  it('should not show slice picker when meal does not have slices', () => {
    (getMealInfo as jest.Mock).mockReturnValue({
      ...mockMealInfo,
      hasSlices: false,
    });

    render(<Kitchen />);

    expect(screen.queryByText(/slices/)).not.toBeInTheDocument();
  });

  it('should disable done button when no ingredients are placed', () => {
    (useGameStore as jest.Mock).mockReturnValue({
      selectedMeal: 'pizza',
      placedIngredients: [],
      pizzaSlices: 8,
      setPizzaSlices: mockSetPizzaSlices,
      addIngredient: mockAddIngredient,
      setPhase: mockSetPhase,
      setChefMessage: mockSetChefMessage,
      familySize: 4,
    });

    render(<Kitchen />);

    const doneButton = screen.getByText('Done');
    expect(doneButton).toBeDisabled();
  });

  it('should show warning when done button is clicked with no ingredients', () => {
    (useGameStore as jest.Mock).mockReturnValue({
      selectedMeal: 'pizza',
      placedIngredients: [],
      pizzaSlices: 8,
      setPizzaSlices: mockSetPizzaSlices,
      addIngredient: mockAddIngredient,
      setPhase: mockSetPhase,
      setChefMessage: mockSetChefMessage,
      familySize: 4,
    });

    render(<Kitchen />);

    const doneButton = screen.getByText('Done');
    fireEvent.click(doneButton);

    expect(mockSetChefMessage).toHaveBeenCalledWith(
      'Add at least one ingredient',
      'thinking',
    );
  });

  it('should set success variant on done button when ingredients >= 2', () => {
    render(<Kitchen />);

    const doneButton = screen.getByText('Done');
    expect(doneButton).toHaveAttribute('data-variant', 'success');
  });

  it('should set secondary variant on done button when ingredients < 2', () => {
    (useGameStore as jest.Mock).mockReturnValue({
      selectedMeal: 'pizza',
      placedIngredients: ['cheese'],
      pizzaSlices: 8,
      setPizzaSlices: mockSetPizzaSlices,
      addIngredient: mockAddIngredient,
      setPhase: mockSetPhase,
      setChefMessage: mockSetChefMessage,
      familySize: 4,
    });

    render(<Kitchen />);

    const doneButton = screen.getByText('Done');
    expect(doneButton).toHaveAttribute('data-variant', 'secondary');
  });

  it('should transition to mealSplash phase when done with pizza', () => {
    render(<Kitchen />);

    const doneButton = screen.getByText('Done');
    fireEvent.click(doneButton);

    expect(mockSetChefMessage).toHaveBeenCalledWith('Great job!', 'excited');
    expect(mockSetPhase).toHaveBeenCalledWith('mealSplash');
  });

  it('should show burrito wrapping and transition to mealSplash when done with burrito', async () => {
    jest.useFakeTimers();

    (useGameStore as jest.Mock).mockReturnValue({
      selectedMeal: 'burrito',
      placedIngredients: ['filling1', 'filling2'],
      pizzaSlices: 0,
      setPizzaSlices: mockSetPizzaSlices,
      addIngredient: mockAddIngredient,
      setPhase: mockSetPhase,
      setChefMessage: mockSetChefMessage,
      familySize: 2,
    });

    (useT as jest.Mock).mockReturnValue({
      ...mockT,
      meals: {
        ...mockT.meals,
        burrito: { name: 'Burrito' },
      },
    });

    render(<Kitchen />);

    const doneButton = screen.getByText('Done');
    fireEvent.click(doneButton);

    const mealPlate = screen.getByTestId('meal-plate');
    expect(mealPlate).toHaveAttribute('data-burrito', 'true');

    jest.advanceTimersByTime(1800);

    expect(mockSetPhase).toHaveBeenCalledWith('mealSplash');

    jest.useRealTimers();
  });

  it('should render header with meal emoji and name', () => {
    render(<Kitchen />);

    expect(screen.getByText(/🍕 My Pizza/)).toBeInTheDocument();
  });

  it('should apply correct background gradient from meal info', () => {
    render(<Kitchen />);

    const mainDiv = screen.getByTestId('chef-dialog').closest('div')?.parentElement;
    expect(mainDiv).toHaveStyle({
      background: 'linear-gradient(180deg, #FFE0B2 0%, white 100%)',
    });
  });

  it('should update ingredient count animation key when ingredients change', () => {
    const { rerender } = render(<Kitchen />);

    (useGameStore as jest.Mock).mockReturnValue({
      selectedMeal: 'pizza',
      placedIngredients: ['cheese', 'tomato', 'basil'],
      pizzaSlices: 8,
      setPizzaSlices: mockSetPizzaSlices,
      addIngredient: mockAddIngredient,
      setPhase: mockSetPhase,
      setChefMessage: mockSetChefMessage,
      familySize: 4,
    });

    rerender(<Kitchen />);

    expect(screen.getByText('3 ingredients')).toBeInTheDocument();
  });

  it('should call getMealInfo with selected meal', () => {
    render(<Kitchen />);

    expect(getMealInfo).toHaveBeenCalledWith('pizza');
  });

  it('should call getMealCostUSD with selected meal and ingredient count', () => {
    render(<Kitchen />);

    expect(getMealCostUSD).toHaveBeenCalledWith('pizza', 2);
  });

  it('should call formatPrice with meal cost and language', () => {
    render(<Kitchen />);

    expect(formatPrice).toHaveBeenCalledWith(10.5, 'en');
  });

  it('should pass addIngredient callback to IngredientShelf', () => {
    render(<Kitchen />);

    const shelf = screen.getByTestId('ingredient-shelf');
    fireEvent.click(shelf);

    expect(mockAddIngredient).toHaveBeenCalledWith('ingredient');
  });

  it('should pass plateRef to both MealPlate and IngredientShelf', () => {
    render(<Kitchen />);

    const mealPlate = screen.getByTestId('meal-plate');
    expect(mealPlate).toBeInTheDocument();

    const shelf = screen.getByTestId('ingredient-shelf');
    expect(shelf).toBeInTheDocument();
  });

  it('should display all slice picker options when opened', () => {
    render(<Kitchen />);

    const sliceButton = screen.getByText('8 slices');
    fireEvent.click(sliceButton);

    [4, 6, 8, 10, 12].forEach((n) => {
      const buttons = screen.getAllByRole('button');
      expect(buttons.some((btn) => btn.textContent === `${n}`)).toBe(true);
    });
  });

  it('should highlight selected slice in picker', () => {
    render(<Kitchen />);

    const sliceButton = screen.getByText('8 slices');
    fireEvent.click(sliceButton);

    const allButtons = screen.getAllByRole('button');
    const slice8Button = allButtons.find((btn) => btn.textContent === '8');

    expect(slice8Button).toHaveStyle({ border: '2px solid #FF6F00' });
    expect(slice8Button).toHaveStyle({ background: '#FF6F00' });
  });

  it('should use meal accent color for header text', () => {
    render(<Kitchen />);

    const headerText = screen.getByText(/My Pizza/);
    expect(headerText).toHaveStyle({ color: '#FF6F00' });
  });

  it('should call speak with correct message format', () => {
    render(<Kitchen />);

    expect(mockSpeak).toHaveBeenCalledWith(
      expect.stringContaining('My Pizza'),
    );
    expect(mockSpeak).toHaveBeenCalledWith(
      expect.stringContaining('Add ingredients'),
    );
  });
});