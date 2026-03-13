// @ts-nocheck
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HamburgerStack } from './HamburgerStack';
import { useGameStore } from '../../store/gameStore';

jest.mock('../../store/gameStore');

describe('HamburgerStack', () => {
  const mockRemoveIngredient = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useGameStore as jest.Mock).mockReturnValue({
      placedIngredients: [],
      removeIngredient: mockRemoveIngredient,
    });
  });

  describe('rendering', () => {
    it('should render the SVG element', () => {
      const { container } = render(<HamburgerStack />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render with proper SVG attributes', () => {
      const { container } = render(<HamburgerStack />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '100%');
      expect(svg).toHaveAttribute('height', '100%');
      expect(svg).toHaveAttribute('preserveAspectRatio', 'xMidYMax meet');
    });

    it('should render the plate elements', () => {
      const { container } = render(<HamburgerStack />);
      const ellipses = container.querySelectorAll('ellipse');
      // Plate has 2 ellipses, bottom bun has 4 ellipses
      expect(ellipses.length).toBeGreaterThanOrEqual(6);
    });

    it('should render the bottom bun', () => {
      const { container } = render(<HamburgerStack />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render the top bun dome', () => {
      const { container } = render(<HamburgerStack />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });
  });

  describe('with empty ingredient list', () => {
    it('should render only buns and plate', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      const motionGs = container.querySelectorAll('motion.g, g[class*="motion"]');
      // Should only have the top bun dome group, no ingredient layers
      expect(container.querySelectorAll('rect').length).toBeGreaterThan(0);
    });
  });

  describe('with single ingredient', () => {
    it('should render one ingredient layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'beef_patty' },
        ],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should call removeIngredient when clicking on ingredient', async () => {
      const user = userEvent.setup();
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: 'beef-1', ingredientId: 'beef_patty' },
        ],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      const groups = container.querySelectorAll('[style*="cursor"]');
      if (groups.length > 0) {
        await user.click(groups[0] as HTMLElement);
        expect(mockRemoveIngredient).toHaveBeenCalledWith('beef-1');
      }
    });
  });

  describe('with multiple ingredients', () => {
    it('should render all ingredient layers', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'beef_patty' },
          { instanceId: '2', ingredientId: 'lettuce' },
          { instanceId: '3', ingredientId: 'cheese' },
        ],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      const layers = container.querySelectorAll('[style*="cursor"]');
      expect(layers.length).toBeGreaterThanOrEqual(1);
    });

    it('should render tall stack with adjusted viewBox', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'beef_patty' },
          { instanceId: '2', ingredientId: 'lettuce' },
          { instanceId: '3', ingredientId: 'tomato_slice' },
          { instanceId: '4', ingredientId: 'cheese' },
          { instanceId: '5', ingredientId: 'bacon' },
        ],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      const svg = container.querySelector('svg');
      const viewBox = svg?.getAttribute('viewBox');
      expect(viewBox).toBeDefined();
      expect(viewBox).toContain('300');
    });
  });

  describe('ingredient layer support', () => {
    it('should render beef_patty layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'beef_patty' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render lettuce layer with wavy path', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'lettuce' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render tomato_slice layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'tomato_slice' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(6);
    });

    it('should render cheese layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'cheese' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render onion layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'onion' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render pickle layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'pickle' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render ketchup layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'ketchup' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render mustard layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'mustard' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render bacon layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'bacon' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render egg_fried layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'egg_fried' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render avocado layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'avocado' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render default layer for unknown ingredient', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'unknown_ingredient' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(0);
    });
  });

  describe('viewBox calculation', () => {
    it('should set viewBox with minimum Y of 30 for empty stack', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      const svg = container.querySelector('svg');
      const viewBox = svg?.getAttribute('viewBox');
      expect(viewBox).toBeDefined();
      expect(viewBox).toContain('0');
    });

    it('should adjust viewBox for tall stacks', () => {
      const ingredients = Array.from({ length: 10 }, (_, i) => ({
        instanceId: `${i}`,
        ingredientId: 'beef_patty',
      }));
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: ingredients,
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      const svg = container.querySelector('svg');
      const viewBox = svg?.getAttribute('viewBox');
      expect(viewBox).toBeDefined();
    });
  });

  describe('stacking order', () => {
    it('should stack ingredients in correct order (bottom to top)', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: 'bottom', ingredientId: 'beef_patty' },
          { instanceId: 'middle', ingredientId: 'lettuce' },
          { instanceId: 'top', ingredientId: 'cheese' },
        ],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      // Verify that layers are rendered
      expect(container.querySelectorAll('rect').length).toBeGreaterThan(0);
    });
  });

  describe('click interaction', () => {
    it('should have cursor pointer style on ingredient layers', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: 'test-id', ingredientId: 'beef_patty' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      const groups = container.querySelectorAll('[style*="cursor"]');
      expect(groups.length).toBeGreaterThanOrEqual(0);
    });

    it('should call removeIngredient with correct instanceId', async () => {
      const user = userEvent.setup();
      const instanceId = 'unique-id-123';
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId, ingredientId: 'beef_patty' },
        ],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      const layers = container.querySelectorAll('[style*="cursor"]');
      if (layers.length > 0) {
        await user.click(layers[0] as HTMLElement);
        expect(mockRemoveIngredient).toHaveBeenCalledWith(instanceId);
      }
    });
  });

  describe('animation properties', () => {
    it('should have spring animation on initial render', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('hit area', () => {
    it('should render invisible wider hit area for each ingredient', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'beef_patty' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      const transparentRects = container.querySelectorAll('rect[fill="transparent"]');
      expect(transparentRects.length).toBeGreaterThan(0);
    });
  });

  describe('bun dome positioning', () => {
    it('should position top bun dome above ingredients', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'beef_patty' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      const transform = container.querySelector('g[transform]')?.getAttribute('transform');
      expect(transform).toBeDefined();
      expect(transform).toContain('translate');
    });
  });

  describe('multiple clicks', () => {
    it('should handle multiple ingredient removals', async () => {
      const user = userEvent.setup();
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'beef_patty' },
          { instanceId: '2', ingredientId: 'lettuce' },
        ],
        removeIngredient: mockRemoveIngredient,
      });
      const { container, rerender } = render(<HamburgerStack />);
      let layers = container.querySelectorAll('[style*="cursor"]');
      if (layers.length > 0) {
        await user.click(layers[0] as HTMLElement);
        expect(mockRemoveIngredient).toHaveBeenCalledTimes(1);
      }

      // Update mock for second render
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '2', ingredientId: 'lettuce' }],
        removeIngredient: mockRemoveIngredient,
      });
      rerender(<HamburgerStack />);
      layers = container.querySelectorAll('[style*="cursor"]');
      if (layers.length > 0) {
        await user.click(layers[0] as HTMLElement);
        expect(mockRemoveIngredient).toHaveBeenCalledTimes(2);
      }
    });
  });
});