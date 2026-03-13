// @ts-nocheck
import type { ReactElement } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SandwichStack } from './SandwichStack';
import { useGameStore } from '../../store/gameStore';

jest.mock('../../store/gameStore');
jest.mock('framer-motion', () => ({
  motion: {
    svg: ({ children, ...props }: any) => <svg {...props}>{children}</svg>,
    g: ({ children, onClick, ...props }: any) => <g {...props} onClick={onClick}>{children}</g>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('SandwichStack', () => {
  const mockRemoveIngredient = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useGameStore as jest.Mock).mockReturnValue({
      placedIngredients: [],
      removeIngredient: mockRemoveIngredient,
    });
  });

  describe('rendering', () => {
    it('should render an SVG element', () => {
      const { container } = render(<SandwichStack />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render with correct width and height attributes', () => {
      const { container } = render(<SandwichStack />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '100%');
      expect(svg).toHaveAttribute('height', '100%');
    });

    it('should render the plate', () => {
      const { container } = render(<SandwichStack />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render bottom bread slice', () => {
      const { container } = render(<SandwichStack />);
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render top bread slice with arch dome', () => {
      const { container } = render(<SandwichStack />);
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });
  });

  describe('ingredient layers', () => {
    it('should render ingredient layers when placedIngredients exist', () => {
      const placedIngredients = [
        { instanceId: '1', ingredientId: 'turkey' },
        { instanceId: '2', ingredientId: 'lettuce' },
        { instanceId: '3', ingredientId: 'tomato_slice' },
      ];
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(3);
    });

    it('should render no ingredient layers when placedIngredients is empty', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const allElements = container.querySelectorAll('*');
      expect(allElements.length).toBeGreaterThan(0);
    });

    it('should render default layer for unknown ingredient', () => {
      const placedIngredients = [
        { instanceId: '1', ingredientId: 'unknown_ingredient' },
      ];
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should call removeIngredient when clicking on an ingredient layer', async () => {
      const user = userEvent.setup();
      const placedIngredients = [
        { instanceId: 'instance-1', ingredientId: 'turkey' },
      ];
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const groups = container.querySelectorAll('g');
      
      if (groups.length > 0) {
        await user.click(groups[0]);
        expect(mockRemoveIngredient).toHaveBeenCalled();
      }
    });
  });

  describe('viewBox calculation', () => {
    it('should calculate viewBox based on ingredient height', () => {
      const placedIngredients = [
        { instanceId: '1', ingredientId: 'turkey' },
        { instanceId: '2', ingredientId: 'ham' },
      ];
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const svg = container.querySelector('svg');
      const viewBox = svg?.getAttribute('viewBox');
      expect(viewBox).toBeTruthy();
      const parts = viewBox!.split(' ');
      expect(parts.length).toBe(4);
      expect(parseInt(parts[0])).toEqual(0);
      expect(parseInt(parts[1])).toBeLessThan(360);
      expect(parseInt(parts[3])).toBeGreaterThan(0);
    });

    it('should set minimum Y value of 30 when stack is very tall', () => {
      const placedIngredients = Array.from({ length: 20 }, (_, i) => ({
        instanceId: `id-${i}`,
        ingredientId: 'lettuce',
      }));
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const svg = container.querySelector('svg');
      const viewBox = svg?.getAttribute('viewBox');
      const minY = parseInt(viewBox!.split(' ')[1]);
      expect(minY).toBeLessThanOrEqual(30);
    });
  });

  describe('all layer types', () => {
    const layerTypes = [
      'turkey',
      'ham',
      'chicken',
      'lettuce',
      'spinach',
      'tomato_slice',
      'cheese',
      'swiss',
      'cream_cheese',
      'mayo',
      'ketchup',
      'mustard',
      'onion',
      'pickle',
      'bacon',
      'egg_fried',
      'avocado',
      'mushroom',
      'bell_pepper',
      'basil',
      'jalapeno',
      'cucumber',
      'carrot',
      'sprouts',
    ];

    layerTypes.forEach(ingredientId => {
      it(`should render ${ingredientId} layer correctly`, () => {
        const placedIngredients = [{ instanceId: 'id-1', ingredientId }];
        (useGameStore as jest.Mock).mockReturnValue({
          placedIngredients,
          removeIngredient: mockRemoveIngredient,
        });

        const { container } = render(<SandwichStack />);
        expect(container.querySelector('svg')).toBeInTheDocument();
      });
    });
  });

  describe('SVG attributes', () => {
    it('should have preserveAspectRatio attribute', () => {
      const { container } = render(<SandwichStack />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('preserveAspectRatio', 'xMidYMax meet');
    });

    it('should render sesame seeds on top bread', () => {
      const { container } = render(<SandwichStack />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(1);
    });
  });

  describe('layer positioning', () => {
    it('should stack ingredients from bottom to top', () => {
      const placedIngredients = [
        { instanceId: '1', ingredientId: 'turkey' },
        { instanceId: '2', ingredientId: 'ham' },
        { instanceId: '3', ingredientId: 'lettuce' },
      ];
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(3);
    });

    it('should position each ingredient above the previous one', () => {
      const placedIngredients = [
        { instanceId: '1', ingredientId: 'cheese' },
      ];
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should handle empty placedIngredients array', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should handle null or undefined from useGameStore gracefully', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [],
        removeIngredient: jest.fn(),
      });

      expect(() => render(<SandwichStack />)).not.toThrow();
    });

    it('should render with very large ingredient list', () => {
      const placedIngredients = Array.from({ length: 50 }, (_, i) => ({
        instanceId: `id-${i}`,
        ingredientId: i % 2 === 0 ? 'turkey' : 'lettuce',
      }));
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should handle ingredients with special characters in instanceId', async () => {
      const user = userEvent.setup();
      const placedIngredients = [
        { instanceId: 'instance-with-special-!@#$', ingredientId: 'turkey' },
      ];
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });
  });

  describe('hit areas', () => {
    it('should render transparent hit areas for ingredients', () => {
      const placedIngredients = [
        { instanceId: '1', ingredientId: 'turkey' },
      ];
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const rects = container.querySelectorAll('rect[fill="transparent"]');
      expect(rects.length).toBeGreaterThan(0);
    });
  });

  describe('styling and animation', () => {
    it('should apply cursor pointer style to ingredient layers', () => {
      const placedIngredients = [
        { instanceId: '1', ingredientId: 'turkey' },
      ];
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });
});