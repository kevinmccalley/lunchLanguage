// @ts-nocheck
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { motion } from 'framer-motion';
import { IngredientShelf } from './IngredientShelf';
import { useGameStore } from '../../store/gameStore';
import { useT } from '../../i18n/useT';
import * as ingredientsData from '../../data/ingredients';

jest.mock('framer-motion');
jest.mock('../../store/gameStore');
jest.mock('../../i18n/useT');
jest.mock('../../data/ingredients');
jest.mock('./IngredientToken', () => ({
  IngredientToken: ({ ingredient, onClick }: any) => (
    <div data-testid={`ingredient-token-${ingredient.id}`} onClick={onClick}>
      {ingredient.name}
    </div>
  ),
}));
jest.mock('../UI/LearningTooltip', () => ({
  LearningTooltip: ({ children, ingredientKey, nativeWord }: any) => (
    <div data-testid={`tooltip-${ingredientKey}`}>
      {children}
    </div>
  ),
}));

describe('IngredientShelf', () => {
  const mockOnAdd = jest.fn();
  const mockPlateRef = { current: document.createElement('div') };
  const mockIngredients = [
    { id: 'tomato', name: 'Tomato' },
    { id: 'cheese', name: 'Cheese' },
    { id: 'basil', name: 'Basil' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockOnAdd.mockClear();

    (motion.div as jest.Mock) = jest.fn(({ children, ...props }: any) => (
      <div data-testid="motion-div" {...props}>
        {children}
      </div>
    ));

    (useGameStore as jest.Mock).mockReturnValue({
      selectedMeal: 'lunch',
    });

    (useT as jest.Mock).mockReturnValue({
      kitchen: { addHint: 'Add ingredients to your plate' },
      ingredients: {
        tomato: 'Tomate',
        cheese: 'Fromage',
        basil: 'Basilic',
      },
    });

    (ingredientsData.getIngredientsByMeal as jest.Mock).mockReturnValue(mockIngredients);

    mockPlateRef.current = document.createElement('div');
    mockPlateRef.current.getBoundingClientRect = jest.fn(() => ({
      width: 400,
      height: 300,
      top: 0,
      left: 0,
      right: 400,
      bottom: 300,
      x: 0,
      y: 0,
      toJSON: () => {},
    }));
  });

  it('should render the ingredient shelf with hint text', () => {
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
    expect(screen.getByText('Add ingredients to your plate')).toBeInTheDocument();
  });

  it('should render all ingredients from the selected meal', () => {
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
    expect(screen.getByTestId('ingredient-token-tomato')).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-token-cheese')).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-token-basil')).toBeInTheDocument();
  });

  it('should display translated ingredient names', () => {
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
    expect(screen.getByText('Tomate')).toBeInTheDocument();
    expect(screen.getByText('Fromage')).toBeInTheDocument();
    expect(screen.getByText('Basilic')).toBeInTheDocument();
  });

  it('should render learning tooltips for each ingredient', () => {
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
    expect(screen.getByTestId('tooltip-tomato')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip-cheese')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip-basil')).toBeInTheDocument();
  });

  it('should call onAdd when ingredient is clicked', () => {
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
    const tomatoToken = screen.getByTestId('ingredient-token-tomato');
    fireEvent.click(tomatoToken);
    expect(mockOnAdd).toHaveBeenCalledTimes(1);
    expect(mockOnAdd).toHaveBeenCalledWith(expect.objectContaining({
      ingredientId: 'tomato',
    }));
  });

  it('should generate unique instance IDs for each added ingredient', () => {
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
    const tomatoToken = screen.getByTestId('ingredient-token-tomato');
    fireEvent.click(tomatoToken);
    fireEvent.click(tomatoToken);
    expect(mockOnAdd).toHaveBeenCalledTimes(2);
    const firstCall = mockOnAdd.mock.calls[0][0];
    const secondCall = mockOnAdd.mock.calls[1][0];
    expect(firstCall.instanceId).not.toBe(secondCall.instanceId);
  });

  it('should calculate position within plate boundaries', () => {
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
    const tomatoToken = screen.getByTestId('ingredient-token-tomato');
    fireEvent.click(tomatoToken);
    const call = mockOnAdd.mock.calls[0][0];
    expect(call.x).toBeGreaterThanOrEqual(20);
    expect(call.x).toBeLessThanOrEqual(320);
    expect(call.y).toBeGreaterThanOrEqual(20);
    expect(call.y).toBeLessThanOrEqual(220);
  });

  it('should generate random rotation between -15 and 15 degrees', () => {
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
    const tomatoToken = screen.getByTestId('ingredient-token-tomato');
    fireEvent.click(tomatoToken);
    const call = mockOnAdd.mock.calls[0][0];
    expect(call.rotation).toBeGreaterThanOrEqual(-15);
    expect(call.rotation).toBeLessThanOrEqual(15);
  });

  it('should generate random scale between 0.85 and 1.15', () => {
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
    const tomatoToken = screen.getByTestId('ingredient-token-tomato');
    fireEvent.click(tomatoToken);
    const call = mockOnAdd.mock.calls[0][0];
    expect(call.scale).toBeGreaterThanOrEqual(0.85);
    expect(call.scale).toBeLessThanOrEqual(1.15);
  });

  it('should not call onAdd when plateRef is null', () => {
    const nullPlateRef = { current: null };
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={nullPlateRef} />);
    const tomatoToken = screen.getByTestId('ingredient-token-tomato');
    fireEvent.click(tomatoToken);
    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  it('should fetch ingredients based on selected meal', () => {
    (useGameStore as jest.Mock).mockReturnValue({
      selectedMeal: 'breakfast',
    });
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
    expect(ingredientsData.getIngredientsByMeal).toHaveBeenCalledWith('breakfast');
  });

  it('should use fallback name when translated ingredient name is missing', () => {
    (useT as jest.Mock).mockReturnValue({
      kitchen: { addHint: 'Add ingredients to your plate' },
      ingredients: {},
    });
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
    expect(screen.getByText('Tomato')).toBeInTheDocument();
  });

  it('should handle empty ingredients list', () => {
    (ingredientsData.getIngredientsByMeal as jest.Mock).mockReturnValue([]);
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
    expect(screen.getByText('Add ingredients to your plate')).toBeInTheDocument();
    expect(screen.queryByTestId(/ingredient-token/)).not.toBeInTheDocument();
  });

  it('should apply motion div props correctly', () => {
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
    expect(motion.div).toHaveBeenCalledWith(
      expect.objectContaining({
        initial: { y: 80, opacity: 0 },
        animate: { y: 0, opacity: 1 },
      }),
      expect.anything()
    );
  });

  it('should handle multiple ingredient clicks in sequence', () => {
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
    const tomatoToken = screen.getByTestId('ingredient-token-tomato');
    const cheeseToken = screen.getByTestId('ingredient-token-cheese');
    fireEvent.click(tomatoToken);
    fireEvent.click(cheeseToken);
    fireEvent.click(tomatoToken);
    expect(mockOnAdd).toHaveBeenCalledTimes(3);
    expect(mockOnAdd.mock.calls[0][0].ingredientId).toBe('tomato');
    expect(mockOnAdd.mock.calls[1][0].ingredientId).toBe('cheese');
    expect(mockOnAdd.mock.calls[2][0].ingredientId).toBe('tomato');
  });

  it('should include ingredientId in the placed ingredient object', () => {
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
    const cheeseToken = screen.getByTestId('ingredient-token-cheese');
    fireEvent.click(cheeseToken);
    expect(mockOnAdd).toHaveBeenCalledWith(expect.objectContaining({
      ingredientId: 'cheese',
      instanceId: expect.any(String),
      x: expect.any(Number),
      y: expect.any(Number),
      rotation: expect.any(Number),
      scale: expect.any(Number),
    }));
  });
});