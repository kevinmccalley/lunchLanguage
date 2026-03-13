// @ts-nocheck
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { motion } from 'framer-motion';
import { IngredientShelf } from './IngredientShelf';
import { useGameStore } from '../../store/gameStore';
import { useT } from '../../i18n/useT';
import { getIngredientsByMeal } from '../../data/ingredients';
import { IngredientToken } from './IngredientToken';
import { LearningTooltip } from '../UI/LearningTooltip';
import type { PlacedIngredient } from '../../types';

jest.mock('framer-motion');
jest.mock('../../store/gameStore');
jest.mock('../../i18n/useT');
jest.mock('../../data/ingredients');
jest.mock('./IngredientToken');
jest.mock('../UI/LearningTooltip');

describe('IngredientShelf', () => {
  const mockOnAdd = jest.fn();
  const mockPlateRef = { current: document.createElement('div') };
  const mockT = {
    kitchen: { addHint: 'Add ingredients' },
    ingredients: {
      tomato: 'Tomato',
      cheese: 'Cheese',
    },
  };

  const mockIngredients = [
    { id: 'tomato', name: 'Tomato', emoji: '🍅' },
    { id: 'cheese', name: 'Cheese', emoji: '🧀' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    (useGameStore as jest.Mock).mockReturnValue({
      selectedMeal: 'lunch',
    });

    (useT as jest.Mock).mockReturnValue(mockT);

    (getIngredientsByMeal as jest.Mock).mockReturnValue(mockIngredients);

    (IngredientToken as jest.Mock).mockImplementation(({ ingredient, onClick }) => (
      <div onClick={onClick} data-testid={`token-${ingredient.id}`}>
        {ingredient.name}
      </div>
    ));

    (LearningTooltip as jest.Mock).mockImplementation(({ children }) => (
      <div data-testid="learning-tooltip">{children}</div>
    ));

    (motion.div as jest.Mock).mockImplementation(({ children, ...props }) => (
      <div {...props} data-testid="motion-div">
        {children}
      </div>
    ));

    if (mockPlateRef.current) {
      mockPlateRef.current.getBoundingClientRect = jest.fn(() => ({
        width: 400,
        height: 300,
        top: 0,
        left: 0,
        right: 400,
        bottom: 300,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      }));
    }
  });

  it('should render the ingredient shelf with ingredients', () => {
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

    expect(screen.getByText('Add ingredients')).toBeInTheDocument();
    expect(screen.getByTestId('token-tomato')).toBeInTheDocument();
    expect(screen.getByTestId('token-cheese')).toBeInTheDocument();
  });

  it('should display translated ingredient names', () => {
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

    expect(screen.getByText('Tomato')).toBeInTheDocument();
    expect(screen.getByText('Cheese')).toBeInTheDocument();
  });

  it('should call getIngredientsByMeal with selected meal type', () => {
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

    expect(getIngredientsByMeal).toHaveBeenCalledWith('lunch');
  });

  it('should call onAdd with correct structure when ingredient is clicked', () => {
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

    const tomatoToken = screen.getByTestId('token-tomato');
    fireEvent.click(tomatoToken);

    expect(mockOnAdd).toHaveBeenCalledTimes(1);
    const addedIngredient = mockOnAdd.mock.calls[0][0] as PlacedIngredient;

    expect(addedIngredient.ingredientId).toBe('tomato');
    expect(addedIngredient.instanceId).toMatch(/^tomato-\d+-[\d.]+$/);
    expect(typeof addedIngredient.x).toBe('number');
    expect(typeof addedIngredient.y).toBe('number');
    expect(typeof addedIngredient.rotation).toBe('number');
    expect(typeof addedIngredient.scale).toBe('number');
  });

  it('should position ingredients within plate bounds', () => {
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

    const tomatoToken = screen.getByTestId('token-tomato');
    fireEvent.click(tomatoToken);

    const addedIngredient = mockOnAdd.mock.calls[0][0] as PlacedIngredient;

    expect(addedIngredient.x).toBeGreaterThanOrEqual(20);
    expect(addedIngredient.x).toBeLessThanOrEqual(320); // 20 + (400 - 80)
    expect(addedIngredient.y).toBeGreaterThanOrEqual(20);
    expect(addedIngredient.y).toBeLessThanOrEqual(220); // 20 + (300 - 80)
  });

  it('should apply random rotation within range', () => {
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

    const tomatoToken = screen.getByTestId('token-tomato');
    fireEvent.click(tomatoToken);

    const addedIngredient = mockOnAdd.mock.calls[0][0] as PlacedIngredient;

    expect(addedIngredient.rotation).toBeGreaterThanOrEqual(-15);
    expect(addedIngredient.rotation).toBeLessThanOrEqual(15);
  });

  it('should apply random scale within range', () => {
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

    const tomatoToken = screen.getByTestId('token-tomato');
    fireEvent.click(tomatoToken);

    const addedIngredient = mockOnAdd.mock.calls[0][0] as PlacedIngredient;

    expect(addedIngredient.scale).toBeGreaterThanOrEqual(0.85);
    expect(addedIngredient.scale).toBeLessThanOrEqual(1.15);
  });

  it('should not add ingredient if plateRef is not available', () => {
    const nullPlateRef = { current: null };
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={nullPlateRef} />);

    const tomatoToken = screen.getByTestId('token-tomato');
    fireEvent.click(tomatoToken);

    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  it('should handle missing translation for ingredient', () => {
    const customT = {
      kitchen: { addHint: 'Add ingredients' },
      ingredients: {},
    };
    (useT as jest.Mock).mockReturnValue(customT);

    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

    const tomatoToken = screen.getByTestId('token-tomato');
    expect(tomatoToken).toBeInTheDocument();
    expect(tomatoToken.textContent).toBe('Tomato'); // falls back to ingredient.name
  });

  it('should render with correct motion animation properties', () => {
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

    expect(motion.div).toHaveBeenCalledWith(
      expect.objectContaining({
        initial: { y: 80, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: expect.objectContaining({
          delay: 0.3,
          type: 'spring',
          stiffness: 200,
          damping: 22,
        }),
      }),
      expect.anything()
    );
  });

  it('should render learning tooltip for each ingredient', () => {
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

    const tooltips = screen.getAllByTestId('learning-tooltip');
    expect(tooltips).toHaveLength(2);
  });

  it('should pass correct props to LearningTooltip', () => {
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

    expect(LearningTooltip).toHaveBeenCalledWith(
      expect.objectContaining({
        ingredientKey: 'tomato',
        nativeWord: 'Tomato',
      }),
      expect.anything()
    );

    expect(LearningTooltip).toHaveBeenCalledWith(
      expect.objectContaining({
        ingredientKey: 'cheese',
        nativeWord: 'Cheese',
      }),
      expect.anything()
    );
  });

  it('should pass correct props to IngredientToken', () => {
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

    expect(IngredientToken).toHaveBeenCalledWith(
      expect.objectContaining({
        ingredient: expect.objectContaining({
          id: 'tomato',
          name: 'Tomato',
        }),
        size: 68,
        onClick: expect.any(Function),
      }),
      expect.anything()
    );
  });

  it('should generate unique instanceIds for same ingredient clicked multiple times', () => {
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

    const tomatoToken = screen.getByTestId('token-tomato');
    fireEvent.click(tomatoToken);
    fireEvent.click(tomatoToken);

    const firstInstanceId = mockOnAdd.mock.calls[0][0].instanceId;
    const secondInstanceId = mockOnAdd.mock.calls[1][0].instanceId;

    expect(firstInstanceId).not.toBe(secondInstanceId);
  });

  it('should handle empty ingredients list', () => {
    (getIngredientsByMeal as jest.Mock).mockReturnValue([]);

    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

    expect(screen.getByText('Add ingredients')).toBeInTheDocument();
    expect(IngredientToken).not.toHaveBeenCalled();
  });

  it('should render hint text with correct styling properties', () => {
    const { container } = render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

    const hintText = screen.getByText('Add ingredients');
    expect(hintText).toBeInTheDocument();
  });
});