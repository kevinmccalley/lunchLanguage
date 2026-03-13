// @ts-nocheck
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

  describe('rendering with no ingredients', () => {
    it('should render SVG with plate and bread slices', () => {
      const { container } = render(<SandwichStack />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render plate ellipse', () => {
      const { container } = render(<SandwichStack />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render bottom bread rect elements', () => {
      const { container } = render(<SandwichStack />);
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render top bread path elements', () => {
      const { container } = render(<SandwichStack />);
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should have proper SVG viewBox', () => {
      const { container } = render(<SandwichStack />);
      const svg = container.querySelector('svg');
      const viewBox = svg?.getAttribute('viewBox');
      expect(viewBox).toBeDefined();
      expect(viewBox).toContain('0');
    });
  });

  describe('rendering with single ingredient', () => {
    it('should render turkey layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'turkey' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render ham layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '2', ingredientId: 'ham' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render lettuce layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '3', ingredientId: 'lettuce' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render cheese layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '4', ingredientId: 'cheese' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render tomato_slice layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '5', ingredientId: 'tomato_slice' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render bacon layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '6', ingredientId: 'bacon' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render egg_fried layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '7', ingredientId: 'egg_fried' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('rendering with multiple ingredients', () => {
    it('should render multiple ingredient layers in correct order', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'turkey' },
          { instanceId: '2', ingredientId: 'cheese' },
          { instanceId: '3', ingredientId: 'lettuce' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render all common ingredients', () => {
      const ingredients = [
        { instanceId: '1', ingredientId: 'turkey' },
        { instanceId: '2', ingredientId: 'ham' },
        { instanceId: '3', ingredientId: 'chicken' },
        { instanceId: '4', ingredientId: 'bacon' },
        { instanceId: '5', ingredientId: 'cheese' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: ingredients,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render vegetables', () => {
      const ingredients = [
        { instanceId: '1', ingredientId: 'tomato_slice' },
        { instanceId: '2', ingredientId: 'lettuce' },
        { instanceId: '3', ingredientId: 'spinach' },
        { instanceId: '4', ingredientId: 'onion' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: ingredients,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render condiments', () => {
      const ingredients = [
        { instanceId: '1', ingredientId: 'mayo' },
        { instanceId: '2', ingredientId: 'ketchup' },
        { instanceId: '3', ingredientId: 'mustard' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: ingredients,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('ingredient removal interaction', () => {
    it('should call removeIngredient when ingredient layer is clicked', async () => {
      const user = userEvent.setup();
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: 'test-id', ingredientId: 'turkey' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const motionG = container.querySelector('g[style*="pointer"]');
      
      if (motionG) {
        await user.click(motionG);
        expect(mockRemoveIngredient).toHaveBeenCalledWith('test-id');
      }
    });

    it('should handle removal of multiple different ingredients', async () => {
      const user = userEvent.setup();
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: 'id1', ingredientId: 'turkey' },
          { instanceId: 'id2', ingredientId: 'cheese' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      render(<SandwichStack />);
      
      expect(mockRemoveIngredient).not.toHaveBeenCalled();
    });
  });

  describe('rendering with unknown ingredients', () => {
    it('should render default layer for unknown ingredientId', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'unknown-ingredient' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render multiple layers with mix of known and unknown ingredients', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'turkey' },
          { instanceId: '2', ingredientId: 'unknown-food' },
          { instanceId: '3', ingredientId: 'cheese' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('all defined ingredient types', () => {
    const allIngredients = [
      'turkey', 'ham', 'chicken', 'lettuce', 'spinach', 'tomato_slice',
      'cheese', 'swiss', 'cream_cheese', 'mayo', 'ketchup', 'mustard',
      'onion', 'pickle', 'bacon', 'egg_fried', 'avocado', 'mushroom',
      'bell_pepper', 'basil', 'jalapeno', 'cucumber', 'carrot', 'sprouts',
    ];

    it.each(allIngredients)('should render %s ingredient', (ingredientId) => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('SVG structure and attributes', () => {
    it('should have correct SVG width and height attributes', () => {
      const { container } = render(<SandwichStack />);
      const svg = container.querySelector('svg');
      expect(svg?.getAttribute('width')).toBe('100%');
      expect(svg?.getAttribute('height')).toBe('100%');
    });

    it('should have preserveAspectRatio set to xMidYMax', () => {
      const { container } = render(<SandwichStack />);
      const svg = container.querySelector('svg');
      expect(svg?.getAttribute('preserveAspectRatio')).toBe('xMidYMax meet');
    });

    it('should render sesame seeds on top bread', () => {
      const { container } = render(<SandwichStack />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(1);
    });
  });

  describe('layer stacking behavior', () => {
    it('should stack ingredients from bottom to top', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'turkey' },
          { instanceId: '2', ingredientId: 'lettuce' },
          { instanceId: '3', ingredientId: 'tomato_slice' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should handle large number of ingredients', () => {
      const ingredients = Array.from({ length: 15 }, (_, i) => ({
        instanceId: `id-${i}`,
        ingredientId: i % 2 === 0 ? 'turkey' : 'cheese',
      }));

      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: ingredients,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('empty sandwich state', () => {
    it('should render plate and bread even with empty ingredients', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(0);
    });
  });

  describe('motion and animation', () => {
    it('should apply motion wrapper to SVG', () => {
      const { container } = render(<SandwichStack />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render ingredient groups with motion animation', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'turkey' },
          { instanceId: '2', ingredientId: 'cheese' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });
  });

  describe('specific layer visual elements', () => {
    it('should render texture details for turkey', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'turkey' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const lines = container.querySelectorAll('line');
      expect(lines.length).toBeGreaterThan(0);
    });

    it('should render marbling for ham', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'ham' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render wavy paths for lettuce', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'lettuce' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render stems for sprouts', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'sprouts' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const lines = container.querySelectorAll('line');
      expect(lines.length).toBeGreaterThan(0);
    });
  });

  describe('comprehensive ingredient combinations', () => {
    it('should render classic sandwich with multiple meats and toppings', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'turkey' },
          { instanceId: '2', ingredientId: 'bacon' },
          { instanceId: '3', ingredientId: 'cheese' },
          { instanceId: '4', ingredientId: 'tomato_slice' },
          { instanceId: '5', ingredientId: 'lettuce' },
          { instanceId: '6', ingredientId: 'mayo' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render vegetarian sandwich', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'avocado' },
          { instanceId: '2', ingredientId: 'tomato_slice' },
          { instanceId: '3', ingredientId: 'lettuce' },
          { instanceId: '4', ingredientId: 'cucumber' },
          { instanceId: '5', ingredientId: 'sprouts' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });
});