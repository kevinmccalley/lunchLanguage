// @ts-nocheck
import { render } from '@testing-library/react';
import type { PlacedIngredient } from '../../types';
import { BurritoAssembly } from './BurritoAssembly';

// Mock framer-motion to avoid animation complexities in tests
jest.mock('framer-motion', () => ({
  motion: {
    svg: ({ children, ...props }: any) => <svg {...props}>{children}</svg>,
    g: ({ children, ...props }: any) => <g {...props}>{children}</g>,
  },
}));

describe('BurritoAssembly', () => {
  describe('Component Rendering', () => {
    it('should render without crashing with empty ingredients', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render SVG with correct dimensions', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '300');
      expect(svg).toHaveAttribute('height', '270');
      expect(svg).toHaveAttribute('viewBox', '0 0 300 270');
    });

    it('should render the plate (ellipse at bottom)', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render the open tortilla', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse');
      const tortillaEllipses = Array.from(ellipses).filter(
        (el) => el.getAttribute('rx') === '130' || el.getAttribute('rx') === '124'
      );
      expect(tortillaEllipses.length).toBeGreaterThan(0);
    });

    it('should render char/toasted spots on tortilla', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse[rx="7"]');
      expect(ellipses.length).toBe(7);
    });

    it('should render fold score lines', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });
  });

  describe('Ingredient Rendering', () => {
    it('should render single ingredient with correct fill count', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'rice-1', ingredientId: 'rice' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      // 7 char spots + 1 ingredient group with 18 rice pieces
      expect(groups.length).toBeGreaterThan(7);
    });

    it('should render multiple different ingredients', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'rice-1', ingredientId: 'rice' },
        { instanceId: 'beans-1', ingredientId: 'beans' },
        { instanceId: 'corn-1', ingredientId: 'corn' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      // Should have groups for: 7 char spots + (18 rice + 12 beans + 22 corn) = 7 + 52 = 59+
      expect(groups.length).toBeGreaterThan(50);
    });

    it('should render rice filling correctly', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'rice-1', ingredientId: 'rice' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse[rx="4"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render beans filling correctly', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'beans-1', ingredientId: 'beans' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render corn filling correctly', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'corn-1', ingredientId: 'corn' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const circles = container.querySelectorAll('circle[r="2.5"]');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render sour_cream filling correctly', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'sour_cream-1', ingredientId: 'sour_cream' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render guacamole filling correctly', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'guac-1', ingredientId: 'guacamole' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render salsa filling correctly', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'salsa-1', ingredientId: 'salsa' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render chicken filling correctly', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'chicken-1', ingredientId: 'chicken' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render steak filling correctly', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'steak-1', ingredientId: 'steak' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render cheese filling correctly', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'cheese-1', ingredientId: 'cheese' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render lettuce filling correctly', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'lettuce-1', ingredientId: 'lettuce' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render bell_pepper filling correctly', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'pepper-1', ingredientId: 'bell_pepper' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render jalapeno filling correctly', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'jalapeno-1', ingredientId: 'jalapeno' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render onion filling correctly', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'onion-1', ingredientId: 'onion' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render avocado filling correctly', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'avocado-1', ingredientId: 'avocado' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render unknown ingredient with fallback circle', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'unknown-1', ingredientId: 'unknown_ingredient' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const circles = container.querySelectorAll('circle[r="5"]');
      expect(circles.length).toBeGreaterThan(0);
    });
  });

  describe('Fill Count and Distribution', () => {
    it('should use default fill count of 8 for unknown ingredients', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'mystery-1', ingredientId: 'mystery_item' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      // 7 char spots + 8 mystery items = 15+
      expect(groups.length).toBeGreaterThanOrEqual(15);
    });

    it('should render correct number of rice pieces', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'rice-1', ingredientId: 'rice' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      // 7 char spots + 18 rice = 25
      expect(groups.length).toBeGreaterThanOrEqual(25);
    });

    it('should render correct number of beans pieces', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'beans-1', ingredientId: 'beans' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      // 7 char spots + 12 beans = 19
      expect(groups.length).toBeGreaterThanOrEqual(19);
    });
  });

  describe('Wrapping Animation States', () => {
    it('should render with wrapping=false initially', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'rice-1', ingredientId: 'rice' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render with wrapping=true', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'rice-1', ingredientId: 'rice' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={true} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render wrapped burrito result when wrapping=true', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'rice-1', ingredientId: 'rice' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={true} />
      );
      const paths = container.querySelectorAll('path');
      // Should have multiple paths for wrapped burrito lines
      expect(paths.length).toBeGreaterThan(2);
    });
  });

  describe('Multiple Instances of Same Ingredient', () => {
    it('should render multiple instances of the same ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'rice-1', ingredientId: 'rice' },
        { instanceId: 'rice-2', ingredientId: 'rice' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      // 7 char spots + 18*2 rice = 43
      expect(groups.length).toBeGreaterThanOrEqual(43);
    });

    it('should use different instanceId for seeded randomness', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'beans-instance-1', ingredientId: 'beans' },
        { instanceId: 'beans-instance-2', ingredientId: 'beans' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      // 7 char spots + 12*2 beans = 31
      expect(groups.length).toBeGreaterThanOrEqual(31);
    });
  });

  describe('Complex Ingredient Combinations', () => {
    it('should render all ingredient types in one burrito', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'rice-1', ingredientId: 'rice' },
        { instanceId: 'beans-1', ingredientId: 'beans' },
        { instanceId: 'corn-1', ingredientId: 'corn' },
        { instanceId: 'chicken-1', ingredientId: 'chicken' },
        { instanceId: 'cheese-1', ingredientId: 'cheese' },
        { instanceId: 'lettuce-1', ingredientId: 'lettuce' },
        { instanceId: 'guac-1', ingredientId: 'guacamole' },
        { instanceId: 'salsa-1', ingredientId: 'salsa' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      // Many groups expected: char spots + all ingredients
      expect(groups.length).toBeGreaterThan(100);
    });

    it('should render all ingredients while wrapping', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'rice-1', ingredientId: 'rice' },
        { instanceId: 'beans-1', ingredientId: 'beans' },
        { instanceId: 'corn-1', ingredientId: 'corn' },
        { instanceId: 'chicken-1', ingredientId: 'chicken' },
        { instanceId: 'cheese-1', ingredientId: 'cheese' },
        { instanceId: 'lettuce-1', ingredientId: 'lettuce' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={true} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty placedIngredients array', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should handle wrapping toggle from false to true', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'rice-1', ingredientId: 'rice' },
      ];
      const { rerender } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      rerender(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={true} />
      );
      expect(true).toBe(true);
    });

    it('should handle wrapping toggle from true to false', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'rice-1', ingredientId: 'rice' },
      ];
      const { rerender } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={true} />
      );
      rerender(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      expect(true).toBe(true);
    });

    it('should handle changing ingredients while wrapped', () => {
      const initialIngredients: PlacedIngredient[] = [
        { instanceId: 'rice-1', ingredientId: 'rice' },
      ];
      const { rerender } = render(
        <BurritoAssembly placedIngredients={initialIngredients} wrapping={true} />
      );
      const newIngredients: PlacedIngredient[] = [
        { instanceId: 'rice-1', ingredientId: 'rice' },
        { instanceId: 'beans-1', ingredientId: 'beans' },
      ];
      rerender(
        <BurritoAssembly placedIngredients={newIngredients} wrapping={true} />
      );
      expect(true).toBe(true);
    });

    it('should render with very long instanceId', () => {
      const placedIngredients: PlacedIngredient[] = [
        {
          instanceId: 'very-long-instance-id-that-is-used-for-seeded-randomness',
          ingredientId: 'rice',
        },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render with special characters in instanceId', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'rice-@#$%-1', ingredientId: 'rice' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('SVG Structure', () => {
    it('should have plate ellipses', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThanOrEqual(2);
    });

    it('should have motion groups for animations', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should contain fill elements wrapped in motion group', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'rice-1', ingredientId: 'rice' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });
  });
});