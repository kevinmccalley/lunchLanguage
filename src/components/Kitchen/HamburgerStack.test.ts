// @ts-nocheck

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HamburgerStack } from './HamburgerStack';
import { useGameStore } from '../../store/gameStore';
import React from 'react';

jest.mock('../../store/gameStore');

const mockUseGameStore = useGameStore as jest.MockedFunction<typeof useGameStore>;

describe('HamburgerStack', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering with empty ingredients', () => {
    it('should render SVG element with correct structure when no ingredients are placed', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const svg = container.querySelector('svg');

      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('width', '100%');
      expect(svg).toHaveAttribute('height', '100%');
      expect(svg).toHaveAttribute('preserveAspectRatio', 'xMidYMax meet');
    });

    it('should render plate element', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const ellipses = container.querySelectorAll('ellipse');

      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render bottom bun elements', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const ellipses = container.querySelectorAll('ellipse');

      expect(ellipses.length).toBeGreaterThanOrEqual(5);
    });

    it('should render top bun dome with correct transform', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const groups = container.querySelectorAll('g');

      const topBunGroup = Array.from(groups).find(g => g.getAttribute('transform'));
      expect(topBunGroup).toBeInTheDocument();
    });

    it('should render top bun with sesame seeds', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const sesameSeedEllipses = container.querySelectorAll('g[transform] ellipse[r="4"]');

      expect(sesameSeedEllipses.length).toBeGreaterThan(0);
    });
  });

  describe('rendering with single ingredient', () => {
    it('should render single beef patty layer', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'beef_patty' },
        ] as any,
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const rects = container.querySelectorAll('rect[fill="#6D4C41"]');

      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render single lettuce layer', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'lettuce' },
        ] as any,
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const paths = container.querySelectorAll('path[fill="#4CAF50"]');

      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render single tomato slice layer', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'tomato_slice' },
        ] as any,
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const ellipses = container.querySelectorAll('ellipse[fill="#E53935"]');

      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render single cheese layer', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'cheese' },
        ] as any,
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const rects = container.querySelectorAll('rect[fill="#FDD835"]');

      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render single onion layer', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'onion' },
        ] as any,
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const ellipses = container.querySelectorAll('ellipse[fill="#E1BEE7"]');

      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render single pickle layer', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'pickle' },
        ] as any,
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const ellipses = container.querySelectorAll('ellipse[fill="#8BC34A"]');

      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render single ketchup layer', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'ketchup' },
        ] as any,
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const paths = container.querySelectorAll('path[stroke="#E53935"]');

      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render single mustard layer', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'mustard' },
        ] as any,
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const paths = container.querySelectorAll('path[stroke="#FDD835"]');

      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render single bacon layer', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'bacon' },
        ] as any,
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const paths = container.querySelectorAll('path[stroke="#C62828"]');

      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render single egg fried layer', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'egg_fried' },
        ] as any,
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const circles = container.querySelectorAll('circle[fill="#FDD835"]');

      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render single avocado layer', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'avocado' },
        ] as any,
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const ellipses = container.querySelectorAll('ellipse[fill="#81C784"]');

      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render unknown ingredient as default layer', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'unknown_ingredient' },
        ] as any,
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const rects = container.querySelectorAll('rect[fill="#9E9E9E"]');

      expect(rects.length).toBeGreaterThan(0);
    });
  });

  describe('rendering with multiple ingredients', () => {
    it('should render multiple ingredients stacked correctly', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'beef_patty' },
          { instanceId: '2', ingredientId: 'cheese' },
          { instanceId: '3', ingredientId: 'lettuce' },
        ] as any,
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const motionGroups = container.querySelectorAll('g[opacity]');

      expect(motionGroups.length).toBeGreaterThan(0);
    });

    it('should render all ingredient types together', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'beef_patty' },
          { instanceId: '2', ingredientId: 'tomato_slice' },
          { instanceId: '3', ingredientId: 'lettuce' },
          { instanceId: '4', ingredientId: 'cheese' },
          { instanceId: '5', ingredientId: 'onion' },
        ] as any,
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const svg = container.querySelector('svg');

      expect(svg?.querySelectorAll('g').length).toBeGreaterThan(5);
    });
  });

  describe('click handling and ingredient removal', () => {
    it('should call removeIngredient when clicking on ingredient layer', async () => {
      const removeIngredient = jest.fn();
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: 'test-1', ingredientId: 'beef_patty' },
        ] as any,
        removeIngredient,
      } as any);

      const { container } = render(<HamburgerStack />);
      const ingredientGroup = container.querySelector('g[opacity]');

      if (ingredientGroup) {
        await userEvent.click(ingredientGroup);
      }

      expect(removeIngredient).toHaveBeenCalledWith('test-1');
    });

    it('should handle multiple clicks on different ingredients', async () => {
      const removeIngredient = jest.fn();
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: 'test-1', ingredientId: 'beef_patty' },
          { instanceId: 'test-2', ingredientId: 'cheese' },
        ] as any,
        removeIngredient,
      } as any);

      const { container } = render(<HamburgerStack />);
      const ingredientGroups = container.querySelectorAll('g[opacity]');

      if (ingredientGroups.length >= 2) {
        await userEvent.click(ingredientGroups[0]);
        await userEvent.click(ingredientGroups[1]);
      }

      expect(removeIngredient).toHaveBeenCalledTimes(2);
    });
  });

  describe('viewBox calculations', () => {
    it('should adjust viewBox for tall stacks', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: Array.from({ length: 15 }, (_, i) => ({
          instanceId: `${i}`,
          ingredientId: 'beef_patty',
        })) as any,
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const svg = container.querySelector('svg');
      const viewBox = svg?.getAttribute('viewBox');

      expect(viewBox).toMatch(/^0 -?\d+ 300 \d+$/);
    });

    it('should have minimum viewBox for empty stack', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const svg = container.querySelector('svg');
      const viewBox = svg?.getAttribute('viewBox');

      expect(viewBox).toBeTruthy();
      const parts = viewBox!.split(' ');
      expect(parts).toHaveLength(4);
      expect(parseFloat(parts[0])).toBe(0);
      expect(parseFloat(parts[2])).toBe(300);
    });
  });

  describe('hit area rendering', () => {
    it('should render invisible hit area for each ingredient', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'beef_patty' },
        ] as any,
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const transparentRects = container.querySelectorAll('rect[fill="transparent"]');

      expect(transparentRects.length).toBeGreaterThan(0);
    });

    it('should render hit areas with extended width', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'beef_patty' },
        ] as any,
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const transparentRects = container.querySelectorAll('rect[fill="transparent"]');

      if (transparentRects.length > 0) {
        const firstRect = transparentRects[0];
        const width = parseFloat(firstRect.getAttribute('width') || '0');
        expect(width).toBeGreaterThan(200);
      }
    });
  });

  describe('motion and animation properties', () => {
    it('should render SVG with motion properties', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const svg = container.querySelector('svg');

      expect(svg).toBeInTheDocument();
    });

    it('should maintain aspect ratio correctly', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'beef_patty' },
        ] as any,
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const svg = container.querySelector('svg');

      expect(svg?.getAttribute('preserveAspectRatio')).toBe('xMidYMax meet');
    });
  });

  describe('ingredient layer specifications', () => {
    it('should render lettuce with wavy path', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'lettuce' },
        ] as any,
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const paths = container.querySelectorAll('path');

      expect(paths.length).toBeGreaterThan(0);
      const path = Array.from(paths).find(p => p.getAttribute('fill') === '#4CAF50');
      expect(path?.getAttribute('d')).toMatch(/M[\d\.\s,LZ]+/);
    });

    it('should render bacon with correct strokes', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'bacon' },
        ] as any,
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const paths = container.querySelectorAll('path[stroke="#C62828"]');

      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render cheese layer with additional width', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'cheese' },
        ] as any,
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const cheeseRects = container.querySelectorAll('rect[fill="#FDD835"]');

      expect(cheeseRects.length).toBeGreaterThan(0);
      if (cheeseRects.length > 0) {
        const width = parseFloat(cheeseRects[0].getAttribute('width') || '0');
        expect(width).toBeGreaterThan(200);
      }
    });

    it('should render beef patty with brown striations', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'beef_patty' },
        ] as any,
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const lines = container.querySelectorAll('line[stroke="#4E342E"]');

      expect(lines.length).toBe(3);
    });

    it('should render tomato with seeds', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'tomato_slice' },
        ] as any,
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const seedEllipses = container.querySelectorAll('ellipse[fill="#EF9A9A"]');

      expect(seedEllipses.length).toBe(4);
    });
  });

  describe('edge cases', () => {
    it('should handle very long ingredient list', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: Array.from({ length: 50 }, (_, i) => ({
          instanceId: `${i}`,
          ingredientId: ['beef_patty', 'cheese', 'lettuce', 'tomato_slice', 'onion'][i % 5],
        })) as any,
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const svg = container.querySelector('svg');

      expect(svg).toBeInTheDocument();
    });

    it('should handle undefined ingredient gracefully', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'nonexistent_ingredient_xyz' },
        ] as any,
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const defaultLayerRects = container.querySelectorAll('rect[fill="#9E9E9E"]');

      expect(defaultLayerRects.length).toBeGreaterThan(0);
    });

    it('should render correctly when ingredient order changes', () => {
      const { rerender, container: container1 } = render(
        <HamburgerStack />
      );
      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'beef_patty' },
          { instanceId: '2', ingredientId: 'cheese' },
        ] as any,
        removeIngredient: jest.fn(),
      } as any);

      rerender(<HamburgerStack />);

      mockUseGameStore.mockReturnValue({
        placedIngredients: [
          { instanceId: '2', ingredientId: 'cheese' },
          { instanceId: '1', ingredientId: 'beef_patty' },
        ] as any,
        removeIngredient: jest.fn(),
      } as any);

      rerender(<HamburgerStack />);

      const svg = container1.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('plate and bun rendering', () => {
    it('should always render plate regardless of ingredients', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const ellipses = container.querySelectorAll('ellipse[fill="#f5ede3"]');

      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render bottom bun with multiple layers', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const bunEllipses = container.querySelectorAll('ellipse[fill*="#"][cy*="3"]');

      expect(bunEllipses.length).toBeGreaterThan(0);
    });

    it('should render top bun with highlight', () => {
      mockUseGameStore.mockReturnValue({
        placedIngredients: [],
        removeIngredient: jest.fn(),
      } as any);

      const { container } = render(<HamburgerStack />);
      const highlight = container.querySelector('ellipse[opacity="0.2"]');

      expect(highlight).toBeInTheDocument();
    });
  });
});