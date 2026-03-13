// @ts-nocheck
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { motion } from 'framer-motion';
import { IngredientShelf } from './IngredientShelf';
import { useGameStore } from '../../store/gameStore';
import { useT } from '../../i18n/useT';
import { getIngredientsByMeal } from '../../data/ingredients';
import { IngredientToken } from './IngredientToken';
import { LearningTooltip } from '../UI/LearningTooltip';

jest.mock('framer-motion');
jest.mock('../../store/gameStore');
jest.mock('../../i18n/useT');
jest.mock('../../data/ingredients');
jest.mock('./IngredientToken');
jest.mock('../UI/LearningTooltip');

describe('IngredientShelf', () => {
  const mockOnAdd = jest.fn();
  const mockPlateRef = { current: null };
  const mockT = {
    kitchen: {
      addHint: 'Add ingredients',
    },
    ingredients: {
      'ingredient-1': 'Translated Ingredient 1',
      'ingredient-2': 'Translated Ingredient 2',
    },
  };

  const mockIngredients = [
    { id: 'ingredient-1', name: 'Ingredient 1' },
    { id: 'ingredient-2', name: 'Ingredient 2' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useGameStore as jest.Mock).mockReturnValue({
      selectedMeal: 'breakfast',
    });
    (useT as jest.Mock).mockReturnValue(mockT);
    (getIngredientsByMeal as jest.Mock).mockReturnValue(mockIngredients);

    (motion.div as jest.Mock).mockImplementation(({ children, ...props }) => (
      <div data-testid="motion-div" {...props}>
        {children}
      </div>
    ));

    (IngredientToken as jest.Mock).mockImplementation(({ onClick, ingredient, size }) => (
      <div
        data-testid={`ingredient-token-${ingredient.id}`}
        onClick={onClick}
        data-size={size}
      >
        {ingredient.name}
      </div>
    ));

    (LearningTooltip as jest.Mock).mockImplementation(({ children, ingredientKey, nativeWord }) => (
      <div data-testid={`tooltip-${ingredientKey}`} data-word={nativeWord}>
        {children}
      </div>
    ));
  });

  describe('rendering', () => {
    it('should render the component with hint text', () => {
      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
      expect(screen.getByText('Add ingredients')).toBeInTheDocument();
    });

    it('should render all ingredients from the selected meal', () => {
      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
      expect(screen.getByTestId('ingredient-token-ingredient-1')).toBeInTheDocument();
      expect(screen.getByTestId('ingredient-token-ingredient-2')).toBeInTheDocument();
    });

    it('should render ingredient tokens with correct size', () => {
      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
      const tokens = screen.getAllByTestId(/ingredient-token-/);
      tokens.forEach((token) => {
        expect(token).toHaveAttribute('data-size', '68');
      });
    });

    it('should wrap each ingredient with LearningTooltip', () => {
      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
      expect(screen.getByTestId('tooltip-ingredient-1')).toBeInTheDocument();
      expect(screen.getByTestId('tooltip-ingredient-2')).toBeInTheDocument();
    });

    it('should use translated ingredient names', () => {
      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
      expect(screen.getByText('Translated Ingredient 1')).toBeInTheDocument();
      expect(screen.getByText('Translated Ingredient 2')).toBeInTheDocument();
    });

    it('should use fallback ingredient name when translation is not available', () => {
      const mixedTranslations = {
        'ingredient-1': 'Translated Ingredient 1',
      };
      (useT as jest.Mock).mockReturnValue({
        ...mockT,
        ingredients: mixedTranslations,
      });

      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
      expect(screen.getByText('Translated Ingredient 1')).toBeInTheDocument();
    });

    it('should pass correct ingredientKey to LearningTooltip', () => {
      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
      const tooltip1 = screen.getByTestId('tooltip-ingredient-1');
      const tooltip2 = screen.getByTestId('tooltip-ingredient-2');
      expect(tooltip1).toHaveAttribute('data-word', 'Translated Ingredient 1');
      expect(tooltip2).toHaveAttribute('data-word', 'Translated Ingredient 2');
    });

    it('should render motion.div with correct initial and animate props', () => {
      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
      expect(motion.div).toHaveBeenCalled();
    });

    it('should render empty list when no ingredients are available', () => {
      (getIngredientsByMeal as jest.Mock).mockReturnValue([]);
      const { container } = render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
      const tokenElements = container.querySelectorAll('[data-testid^="ingredient-token-"]');
      expect(tokenElements).toHaveLength(0);
    });
  });

  describe('ingredient interaction', () => {
    it('should call onAdd when an ingredient token is clicked', () => {
      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
      const mockPlateElement = document.createElement('div');
      mockPlateElement.getBoundingClientRect = jest.fn(() => ({
        width: 400,
        height: 300,
        top: 0,
        left: 0,
        bottom: 300,
        right: 400,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      }));
      mockPlateRef.current = mockPlateElement;

      const token = screen.getByTestId('ingredient-token-ingredient-1');
      fireEvent.click(token);

      expect(mockOnAdd).toHaveBeenCalledTimes(1);
      expect(mockOnAdd).toHaveBeenCalledWith(expect.objectContaining({
        ingredientId: 'ingredient-1',
      }));
    });

    it('should not call onAdd when plate ref is not set', () => {
      mockPlateRef.current = null;
      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

      const token = screen.getByTestId('ingredient-token-ingredient-1');
      fireEvent.click(token);

      expect(mockOnAdd).not.toHaveBeenCalled();
    });

    it('should generate unique instanceId for each added ingredient', () => {
      const mockPlateElement = document.createElement('div');
      mockPlateElement.getBoundingClientRect = jest.fn(() => ({
        width: 400,
        height: 300,
        top: 0,
        left: 0,
        bottom: 300,
        right: 400,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      }));
      mockPlateRef.current = mockPlateElement;

      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

      const token = screen.getByTestId('ingredient-token-ingredient-1');
      fireEvent.click(token);
      fireEvent.click(token);

      expect(mockOnAdd).toHaveBeenCalledTimes(2);
      const call1 = mockOnAdd.mock.calls[0][0];
      const call2 = mockOnAdd.mock.calls[1][0];
      expect(call1.instanceId).not.toBe(call2.instanceId);
    });

    it('should place ingredient within plate bounds with margin', () => {
      const mockPlateElement = document.createElement('div');
      mockPlateElement.getBoundingClientRect = jest.fn(() => ({
        width: 400,
        height: 300,
        top: 0,
        left: 0,
        bottom: 300,
        right: 400,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      }));
      mockPlateRef.current = mockPlateElement;

      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

      const token = screen.getByTestId('ingredient-token-ingredient-1');
      fireEvent.click(token);

      const addedIngredient = mockOnAdd.mock.calls[0][0];
      expect(addedIngredient.x).toBeGreaterThanOrEqual(20);
      expect(addedIngredient.x).toBeLessThanOrEqual(320);
      expect(addedIngredient.y).toBeGreaterThanOrEqual(20);
      expect(addedIngredient.y).toBeLessThanOrEqual(220);
    });

    it('should set random rotation within expected range', () => {
      const mockPlateElement = document.createElement('div');
      mockPlateElement.getBoundingClientRect = jest.fn(() => ({
        width: 400,
        height: 300,
        top: 0,
        left: 0,
        bottom: 300,
        right: 400,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      }));
      mockPlateRef.current = mockPlateElement;

      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

      const token = screen.getByTestId('ingredient-token-ingredient-1');
      fireEvent.click(token);

      const addedIngredient = mockOnAdd.mock.calls[0][0];
      expect(addedIngredient.rotation).toBeGreaterThanOrEqual(-15);
      expect(addedIngredient.rotation).toBeLessThanOrEqual(15);
    });

    it('should set random scale within expected range', () => {
      const mockPlateElement = document.createElement('div');
      mockPlateElement.getBoundingClientRect = jest.fn(() => ({
        width: 400,
        height: 300,
        top: 0,
        left: 0,
        bottom: 300,
        right: 400,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      }));
      mockPlateRef.current = mockPlateElement;

      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

      const token = screen.getByTestId('ingredient-token-ingredient-1');
      fireEvent.click(token);

      const addedIngredient = mockOnAdd.mock.calls[0][0];
      expect(addedIngredient.scale).toBeGreaterThanOrEqual(0.85);
      expect(addedIngredient.scale).toBeLessThanOrEqual(1.15);
    });

    it('should include ingredientId in the added ingredient', () => {
      const mockPlateElement = document.createElement('div');
      mockPlateElement.getBoundingClientRect = jest.fn(() => ({
        width: 400,
        height: 300,
        top: 0,
        left: 0,
        bottom: 300,
        right: 400,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      }));
      mockPlateRef.current = mockPlateElement;

      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

      const token = screen.getByTestId('ingredient-token-ingredient-2');
      fireEvent.click(token);

      const addedIngredient = mockOnAdd.mock.calls[0][0];
      expect(addedIngredient.ingredientId).toBe('ingredient-2');
    });
  });

  describe('game store integration', () => {
    it('should fetch ingredients based on selected meal from game store', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'lunch',
      });

      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

      expect(getIngredientsByMeal).toHaveBeenCalledWith('lunch');
    });

    it('should handle different meal types', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'dinner',
      });

      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

      expect(getIngredientsByMeal).toHaveBeenCalledWith('dinner');
    });
  });

  describe('animation', () => {
    it('should apply spring animation to motion container', () => {
      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
      expect(motion.div).toHaveBeenCalledWith(expect.objectContaining({
        transition: expect.objectContaining({
          type: 'spring',
          stiffness: 200,
          damping: 22,
        }),
      }), expect.anything());
    });

    it('should have correct initial state for motion container', () => {
      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
      expect(motion.div).toHaveBeenCalledWith(expect.objectContaining({
        initial: expect.objectContaining({
          y: 80,
          opacity: 0,
        }),
      }), expect.anything());
    });

    it('should have correct animate state for motion container', () => {
      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
      expect(motion.div).toHaveBeenCalledWith(expect.objectContaining({
        animate: expect.objectContaining({
          y: 0,
          opacity: 1,
        }),
      }), expect.anything());
    });
  });

  describe('style props', () => {
    it('should render with semi-transparent white background', () => {
      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
      expect(motion.div).toHaveBeenCalledWith(expect.objectContaining({
        style: expect.objectContaining({
          background: 'rgba(255,255,255,0.92)',
        }),
      }), expect.anything());
    });

    it('should have correct border radius', () => {
      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
      expect(motion.div).toHaveBeenCalledWith(expect.objectContaining({
        style: expect.objectContaining({
          borderRadius: '20px 20px 0 0',
        }),
      }), expect.anything());
    });

    it('should have correct padding', () => {
      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
      expect(motion.div).toHaveBeenCalledWith(expect.objectContaining({
        style: expect.objectContaining({
          padding: '12px 16px',
        }),
      }), expect.anything());
    });

    it('should have top border', () => {
      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
      expect(motion.div).toHaveBeenCalledWith(expect.objectContaining({
        style: expect.objectContaining({
          borderTop: '3px solid #e0e0e0',
        }),
      }), expect.anything());
    });

    it('should have shadow effect', () => {
      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
      expect(motion.div).toHaveBeenCalledWith(expect.objectContaining({
        style: expect.objectContaining({
          boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
        }),
      }), expect.anything());
    });
  });

  describe('edge cases', () => {
    it('should handle plate ref with zero dimensions', () => {
      const mockPlateElement = document.createElement('div');
      mockPlateElement.getBoundingClientRect = jest.fn(() => ({
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      }));
      mockPlateRef.current = mockPlateElement;

      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

      const token = screen.getByTestId('ingredient-token-ingredient-1');
      fireEvent.click(token);

      expect(mockOnAdd).toHaveBeenCalled();
      const addedIngredient = mockOnAdd.mock.calls[0][0];
      expect(addedIngredient.x).toBeGreaterThanOrEqual(20);
      expect(addedIngredient.y).toBeGreaterThanOrEqual(20);
    });

    it('should handle very large plate dimensions', () => {
      const mockPlateElement = document.createElement('div');
      mockPlateElement.getBoundingClientRect = jest.fn(() => ({
        width: 10000,
        height: 10000,
        top: 0,
        left: 0,
        bottom: 10000,
        right: 10000,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      }));
      mockPlateRef.current = mockPlateElement;

      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);

      const token = screen.getByTestId('ingredient-token-ingredient-1');
      fireEvent.click(token);

      expect(mockOnAdd).toHaveBeenCalled();
      const addedIngredient = mockOnAdd.mock.calls[0][0];
      expect(addedIngredient.x).toBeLessThanOrEqual(9920);
      expect(addedIngredient.y).toBeLessThanOrEqual(9920);
    });

    it('should handle special characters in ingredient names', () => {
      const specialIngredients = [
        { id: 'ingredient-1', name: 'Café' },
        { id: 'ingredient-2', name: 'Naïve' },
      ];
      (getIngredientsByMeal as jest.Mock).mockReturnValue(specialIngredients);

      render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
      expect(screen.getByText('Café')).toBeInTheDocument();
      expect(screen.getByText('Naïve')).toBeInTheDocument();
    });
  });
});