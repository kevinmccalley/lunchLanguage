// @ts-nocheck
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IngredientShelf } from './IngredientShelf';
import { useGameStore } from '../../store/gameStore';
import { useT } from '../../i18n/useT';
import { getIngredientsByMeal } from '../../data/ingredients';

jest.mock('../../store/gameStore');
jest.mock('../../i18n/useT');
jest.mock('../../data/ingredients');
jest.mock('./IngredientToken', () => ({
  IngredientToken: ({ ingredient, onClick }: any) => (
    <button onClick={onClick} data-testid={`ingredient-${ingredient.id}`}>
      {ingredient.name}
    </button>
  ),
}));
jest.mock('../UI/LearningTooltip', () => ({
  LearningTooltip: ({ children }: any) => <div>{children}</div>,
}));

describe('IngredientShelf', () => {
  const mockOnAdd = jest.fn();
  const mockPlateRef = { current: document.createElement('div') };

  beforeEach(() => {
    jest.clearAllMocks();
    mockOnAdd.mockClear();

    (useGameStore as jest.Mock).mockReturnValue({
      selectedMeal: 'breakfast',
    });

    (useT as jest.Mock).mockReturnValue({
      kitchen: {
        addHint: 'Add ingredients to your plate',
      },
      ingredients: {
        'ingredient-1': 'Egg',
        'ingredient-2': 'Bread',
      },
    });

    (getIngredientsByMeal as jest.Mock).mockReturnValue([
      { id: 'ingredient-1', name: 'Egg' },
      { id: 'ingredient-2', name: 'Bread' },
    ]);

    mockPlateRef.current = document.createElement('div');
    mockPlateRef.current.getBoundingClientRect = jest.fn(() => ({
      width: 400,
      height: 300,
      top: 0,
      left: 0,
      right: 400,
      bottom: 300,
    } as DOMRect));
  });

  it('should render the ingredient shelf with all ingredients', () => {
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

    expect(screen.getByText('Add ingredients to your plate')).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-ingredient-1')).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-ingredient-2')).toBeInTheDocument();
  });

  it('should display translated ingredient names', () => {
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

    expect(screen.getByText('Egg')).toBeInTheDocument();
    expect(screen.getByText('Bread')).toBeInTheDocument();
  });

  it('should use fallback ingredient name when translation is not available', () => {
    (useT as jest.Mock).mockReturnValue({
      kitchen: {
        addHint: 'Add ingredients to your plate',
      },
      ingredients: {},
    });

    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

    expect(screen.getByText('Egg')).toBeInTheDocument();
    expect(screen.getByText('Bread')).toBeInTheDocument();
  });

  it('should call onAdd with correct properties when ingredient is clicked', async () => {
    const user = userEvent.setup();
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

    const ingredientButton = screen.getByTestId('ingredient-ingredient-1');
    await user.click(ingredientButton);

    expect(mockOnAdd).toHaveBeenCalledTimes(1);
    const call = mockOnAdd.mock.calls[0][0];
    expect(call.ingredientId).toBe('ingredient-1');
    expect(call.instanceId).toContain('ingredient-1-');
    expect(typeof call.x).toBe('number');
    expect(typeof call.y).toBe('number');
    expect(typeof call.rotation).toBe('number');
    expect(typeof call.scale).toBe('number');
  });

  it('should generate random position within plate bounds', async () => {
    const user = userEvent.setup();
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

    const ingredientButton = screen.getByTestId('ingredient-ingredient-1');
    await user.click(ingredientButton);

    const call = mockOnAdd.mock.calls[0][0];
    expect(call.x).toBeGreaterThanOrEqual(20);
    expect(call.x).toBeLessThanOrEqual(320);
    expect(call.y).toBeGreaterThanOrEqual(20);
    expect(call.y).toBeLessThanOrEqual(220);
  });

  it('should generate random rotation between -15 and 15 degrees', async () => {
    const user = userEvent.setup();
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

    const ingredientButton = screen.getByTestId('ingredient-ingredient-1');
    await user.click(ingredientButton);

    const call = mockOnAdd.mock.calls[0][0];
    expect(call.rotation).toBeGreaterThanOrEqual(-15);
    expect(call.rotation).toBeLessThanOrEqual(15);
  });

  it('should generate random scale between 0.85 and 1.15', async () => {
    const user = userEvent.setup();
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

    const ingredientButton = screen.getByTestId('ingredient-ingredient-1');
    await user.click(ingredientButton);

    const call = mockOnAdd.mock.calls[0][0];
    expect(call.scale).toBeGreaterThanOrEqual(0.85);
    expect(call.scale).toBeLessThanOrEqual(1.15);
  });

  it('should not call onAdd when plate ref is null', async () => {
    const user = userEvent.setup();
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={{ current: null }} />);

    const ingredientButton = screen.getByTestId('ingredient-ingredient-1');
    await user.click(ingredientButton);

    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  it('should generate unique instanceId for each ingredient click', async () => {
    const user = userEvent.setup();
    jest.useFakeTimers();
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

    const ingredientButton = screen.getByTestId('ingredient-ingredient-1');
    await user.click(ingredientButton);
    const firstInstanceId = mockOnAdd.mock.calls[0][0].instanceId;

    jest.advanceTimersByTime(1);
    await user.click(ingredientButton);
    const secondInstanceId = mockOnAdd.mock.calls[1][0].instanceId;

    expect(firstInstanceId).not.toBe(secondInstanceId);
    jest.useRealTimers();
  });

  it('should render with no ingredients when meal has no ingredients', () => {
    (getIngredientsByMeal as jest.Mock).mockReturnValue([]);

    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

    expect(screen.getByText('Add ingredients to your plate')).toBeInTheDocument();
    expect(screen.queryByTestId(/ingredient-/)).not.toBeInTheDocument();
  });

  it('should get ingredients based on selected meal from game store', () => {
    (useGameStore as jest.Mock).mockReturnValue({
      selectedMeal: 'lunch',
    });

    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

    expect(getIngredientsByMeal).toHaveBeenCalledWith('lunch');
  });

  it('should handle multiple ingredient clicks sequentially', async () => {
    const user = userEvent.setup();
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

    const ingredient1Button = screen.getByTestId('ingredient-ingredient-1');
    const ingredient2Button = screen.getByTestId('ingredient-ingredient-2');

    await user.click(ingredient1Button);
    await user.click(ingredient2Button);

    expect(mockOnAdd).toHaveBeenCalledTimes(2);
    expect(mockOnAdd.mock.calls[0][0].ingredientId).toBe('ingredient-1');
    expect(mockOnAdd.mock.calls[1][0].ingredientId).toBe('ingredient-2');
  });

  it('should pass correct props to IngredientToken component', async () => {
    const { container } = render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

    const ingredientButton = screen.getByTestId('ingredient-ingredient-1');
    expect(ingredientButton).toBeInTheDocument();
  });

  it('should pass ingredientKey prop to LearningTooltip', () => {
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

    expect(screen.getByTestId('ingredient-ingredient-1')).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-ingredient-2')).toBeInTheDocument();
  });
});