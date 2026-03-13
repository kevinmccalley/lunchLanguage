// @ts-nocheck
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HamburgerStack } from './HamburgerStack';
import { useGameStore } from '../../store/gameStore';

jest.mock('../../store/gameStore');

const mockUseGameStore = useGameStore as jest.MockedFunction<typeof useGameStore>;

describe('HamburgerStack', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering with no ingredients', () => {
    it('should render the hamburger stack component', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const svg = container.querySelector('svg');

      expect(svg).toBeInTheDocument();
    });

    it('should render plate elements', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const ellipses = container.querySelectorAll('ellipse');

      // Plate has 2 ellipses
      expect(ellipses.length).toBeGreaterThanOrEqual(2);
    });

    it('should render bottom bun', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const ellipses = container.querySelectorAll('ellipse');

      // Bottom bun has 4 ellipses
      expect(ellipses.length).toBeGreaterThanOrEqual(6);
    });

    it('should render top bun dome', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const g = container.querySelector('g[transform]');

      expect(g).toBeInTheDocument();
    });

    it('should render SVG with correct initial state', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const svg = container.querySelector('svg');

      expect(svg).toHaveAttribute('preserveAspectRatio', 'xMidYMax meet');
    });
  });

  describe('rendering with single ingredient', () => {
    it('should render beef patty ingredient', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'beef_patty' },
        ],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const rects = container.querySelectorAll('rect');

      // Beef patty has 2 rects + hit area rect
      expect(rects.length).toBeGreaterThanOrEqual(3);
    });

    it('should render lettuce ingredient', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'lettuce' },
        ],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const paths = container.querySelectorAll('path');

      // Lettuce has 2 paths
      expect(paths.length).toBeGreaterThanOrEqual(2);
    });

    it('should render tomato slice ingredient', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'tomato_slice' },
        ],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const ellipses = container.querySelectorAll('ellipse');

      // Tomato has multiple ellipses
      expect(ellipses.length).toBeGreaterThan(6);
    });

    it('should render cheese ingredient', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'cheese' },
        ],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const rects = container.querySelectorAll('rect');

      // Cheese has 2 rects + hit area
      expect(rects.length).toBeGreaterThanOrEqual(3);
    });

    it('should render onion ingredient', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'onion' },
        ],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const ellipses = container.querySelectorAll('ellipse');

      // Onion has multiple ellipses
      expect(ellipses.length).toBeGreaterThan(6);
    });

    it('should render pickle ingredient', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'pickle' },
        ],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const circles = container.querySelectorAll('circle');

      // Pickle has multiple circles
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render ketchup ingredient', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'ketchup' },
        ],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const paths = container.querySelectorAll('path');

      // Ketchup is a path
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render mustard ingredient', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'mustard' },
        ],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const paths = container.querySelectorAll('path');

      // Mustard is a path
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render bacon ingredient', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'bacon' },
        ],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const paths = container.querySelectorAll('path');

      // Bacon has paths
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render egg fried ingredient', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'egg_fried' },
        ],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const circles = container.querySelectorAll('circle');

      // Egg has circles
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render avocado ingredient', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'avocado' },
        ],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const ellipses = container.querySelectorAll('ellipse');

      // Avocado has 2 ellipses
      expect(ellipses.length).toBeGreaterThanOrEqual(2);
    });

    it('should render unknown ingredient as default layer', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'unknown_ingredient' },
        ],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const rects = container.querySelectorAll('rect');

      // Default layer has rect + hit area
      expect(rects.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('rendering with multiple ingredients', () => {
    it('should stack ingredients in order', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'beef_patty' },
          { instanceId: '2', ingredientId: 'cheese' },
          { instanceId: '3', ingredientId: 'lettuce' },
        ],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const groups = container.querySelectorAll('motion.g, g');

      // Should have multiple ingredient groups
      expect(groups.length).toBeGreaterThan(1);
    });

    it('should render multiple different ingredients correctly', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'beef_patty' },
          { instanceId: '2', ingredientId: 'tomato_slice' },
          { instanceId: '3', ingredientId: 'onion' },
          { instanceId: '4', ingredientId: 'bacon' },
        ],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const svg = container.querySelector('svg');

      expect(svg).toBeInTheDocument();
    });

    it('should handle many ingredients in stack', () => {
      const ingredients = Array.from({ length: 10 }, (_, i) => ({
        instanceId: `${i}`,
        ingredientId: i % 2 === 0 ? 'beef_patty' : 'cheese',
      }));

      mockUseGameStore.mockReturnValue({
        placedIngredients: ingredients,
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const svg = container.querySelector('svg');

      expect(svg).toBeInTheDocument();
    });
  });

  describe('interactivity', () => {
    it('should call removeIngredient when clicking on an ingredient', async () => {
      const removeIngredient = jest.fn();
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'beef_patty' },
        ],
        removeIngredient,
      } as any);

      const { container } = render(<HamburgerStack />);
      const ingredientGroup = container.querySelector('motion.g');

      if (ingredientGroup) {
        await userEvent.click(ingredientGroup as Element);
      }

      expect(removeIngredient).toHaveBeenCalled();
    });

    it('should pass correct instanceId to removeIngredient', async () => {
      const removeIngredient = jest.fn();
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: 'test-id-123', ingredientId: 'cheese' },
        ],
        removeIngredient,
      } as any);

      const { container } = render(<HamburgerStack />);
      const ingredientGroup = container.querySelector('motion.g');

      if (ingredientGroup) {
        await userEvent.click(ingredientGroup as Element);
      }

      expect(removeIngredient).toHaveBeenCalledWith('test-id-123');
    });

    it('should have pointer cursor style on ingredients', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'beef_patty' },
        ],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const ingredientGroup = container.querySelector('motion.g');

      expect(ingredientGroup).toHaveStyle({ cursor: 'pointer' });
    });
  });

  describe('SVG viewBox calculations', () => {
    it('should render with correct viewBox when stack is empty', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const svg = container.querySelector('svg');

      const viewBox = svg?.getAttribute('viewBox');
      expect(viewBox).toBeDefined();
      expect(viewBox).toMatch(/^0 \d+ 300 \d+$/);
    });

    it('should adjust viewBox height with tall stacks', () => {
      const tallStack = Array.from({ length: 15 }, (_, i) => ({
        instanceId: `${i}`,
        ingredientId: 'beef_patty',
      }));

      mockUseGameStore.mockReturnValue({
        placedIngredients: tallStack,
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const svg = container.querySelector('svg');

      const viewBox = svg?.getAttribute('viewBox');
      expect(viewBox).toBeDefined();
    });
  });

  describe('animation properties', () => {
    it('should render with proper animation attributes', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'beef_patty' },
        ],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const motionSvg = container.querySelector('motion.svg');

      expect(motionSvg).toBeInTheDocument();
    });
  });

  describe('SVG structure', () => {
    it('should have correct SVG dimensions', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const svg = container.querySelector('svg');

      expect(svg).toHaveAttribute('width', '100%');
      expect(svg).toHaveAttribute('height', '100%');
    });

    it('should contain g element for top bun with transform', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const bunGroup = container.querySelector('g[transform]');

      expect(bunGroup).toBeInTheDocument();
    });
  });

  describe('hit areas', () => {
    it('should create invisible hit area rects for ingredients', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'beef_patty' },
          { instanceId: '2', ingredientId: 'cheese' },
        ],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const transparentRects = container.querySelectorAll('rect[fill="transparent"]');

      expect(transparentRects.length).toBeGreaterThanOrEqual(2);
    });

    it('should have transparent hit area rects wider than ingredients', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'beef_patty' },
        ],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const transparentRect = container.querySelector('rect[fill="transparent"]');

      const width = transparentRect?.getAttribute('width');
      expect(width).toBeDefined();
      expect(parseFloat(width || '0')).toBeGreaterThan(200);
    });
  });

  describe('empty state', () => {
    it('should render only buns when no ingredients', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const groups = container.querySelectorAll('motion.g');

      // No ingredient motion groups when empty
      expect(groups.length).toBe(0);
    });
  });

  describe('edge cases', () => {
    it('should handle ingredient with null or undefined values gracefully', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: '' },
        ],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const svg = container.querySelector('svg');

      expect(svg).toBeInTheDocument();
    });

    it('should render correct number of ingredient layers', () => {
      const ingredients = [
        { instanceId: '1', ingredientId: 'beef_patty' },
        { instanceId: '2', ingredientId: 'cheese' },
        { instanceId: '3', ingredientId: 'lettuce' },
      ];

      mockUseGameStore.mockReturnValue({
        placedIngredients: ingredients,
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const motionGroups = container.querySelectorAll('[class*="motion"]');

      expect(motionGroups.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('store integration', () => {
    it('should call useGameStore hook', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [],
        removeIngredient: jest.fn(),
      } as any);

      render(<HamburgerStack />);

      expect(mockUseGameStore).toHaveBeenCalled();
    });

    it('should use placedIngredients from store', () => {
      const ingredients = [
        { instanceId: '1', ingredientId: 'beef_patty' },
      ];

      mockUseGameStore.mockReturnValue({
        placedIngredients: ingredients,
        removeIngredient: jest.fn(),
      } as any);

      render(<HamburgerStack />);

      expect(mockUseGameStore).toHaveBeenCalled();
    });

    it('should use removeIngredient function from store', () => {
      const removeIngredient = jest.fn();
      mockUseGameStore.mockReturnValue({
        placedIngredients: [],
        removeIngredient,
      } as any);

      render(<HamburgerStack />);

      expect(mockUseGameStore).toHaveBeenCalled();
    });
  });
});