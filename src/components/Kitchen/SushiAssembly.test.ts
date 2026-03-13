// @ts-nocheck
import { render } from '@testing-library/react';
import { SushiAssembly } from './SushiAssembly';
import type { PlacedIngredient } from '../../types';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    svg: ({ children, ...props }: any) => {
      const { initial, animate, transition, ...restProps } = props;
      return <svg {...restProps}>{children}</svg>;
    },
  },
}));

describe('SushiAssembly', () => {
  describe('srng function', () => {
    // Note: srng is not exported, but we test it indirectly through component behavior
    it('should render without crashing with empty placedIngredients', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render consistent output for same seed and parameters', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-1', ingredientId: 'salmon' },
      ];
      const { container: container1 } = render(
        <SushiAssembly placedIngredients={ingredients} />
      );
      const { container: container2 } = render(
        <SushiAssembly placedIngredients={ingredients} />
      );
      expect(container1.innerHTML).toBe(container2.innerHTML);
    });
  });

  describe('noriPoint function', () => {
    it('should distribute points correctly within nori sheet', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-instance', ingredientId: 'salmon' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g[transform*="translate"]');
      expect(groups.length).toBeGreaterThan(0);
    });
  });

  describe('SushiFilling component', () => {
    it('should render salmon filling correctly', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'salmon-test', ingredientId: 'salmon' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={ingredients} />
      );
      const ellipses = container.querySelectorAll('ellipse[fill="#f08060"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render tuna filling correctly', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'tuna-test', ingredientId: 'tuna' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={ingredients} />
      );
      const ellipses = container.querySelectorAll('ellipse[fill="#c0392b"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render shrimp filling correctly', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'shrimp-test', ingredientId: 'shrimp' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={ingredients} />
      );
      const paths = container.querySelectorAll('path[fill="#f4a460"]');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render avocado filling correctly', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'avocado-test', ingredientId: 'avocado' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={ingredients} />
      );
      const ellipses = container.querySelectorAll('ellipse[fill="#5a9e3c"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render cucumber filling correctly', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'cucumber-test', ingredientId: 'cucumber' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={ingredients} />
      );
      const circles = container.querySelectorAll('circle[fill="#4caf50"]');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render rice filling correctly', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'rice-test', ingredientId: 'rice' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={ingredients} />
      );
      const ellipses = container.querySelectorAll('ellipse[fill="#fafafa"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render seaweed filling correctly', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'seaweed-test', ingredientId: 'seaweed' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={ingredients} />
      );
      const rects = container.querySelectorAll('rect[fill="#1a3a2a"]');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render cream_cheese filling correctly', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'cream-test', ingredientId: 'cream_cheese' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={ingredients} />
      );
      const ellipses = container.querySelectorAll('ellipse[fill="#faf5ee"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render soy_sauce filling correctly', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'soy-test', ingredientId: 'soy_sauce' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={ingredients} />
      );
      const paths = container.querySelectorAll('path[fill="#2c1a0a"]');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render wasabi filling correctly', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'wasabi-test', ingredientId: 'wasabi' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={ingredients} />
      );
      const ellipses = container.querySelectorAll('ellipse[fill="#3aaa60"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render ginger filling correctly', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'ginger-test', ingredientId: 'ginger' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={ingredients} />
      );
      const ellipses = container.querySelectorAll('ellipse[fill="#f5b8a8"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render default filling for unknown ingredient', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'unknown-test', ingredientId: 'unknown_ingredient' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={ingredients} />
      );
      const circles = container.querySelectorAll('circle[fill="#888"]');
      expect(circles.length).toBeGreaterThan(0);
    });
  });

  describe('FILL_COUNT mapping', () => {
    it('should render correct number of salmon pieces', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'salmon-count', ingredientId: 'salmon' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g[transform*="salmon-count"]');
      expect(groups.length).toBe(6);
    });

    it('should render correct number of cucumber pieces', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'cucumber-count', ingredientId: 'cucumber' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g[transform*="cucumber-count"]');
      expect(groups.length).toBe(8);
    });

    it('should render correct number of shrimp pieces', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'shrimp-count', ingredientId: 'shrimp' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g[transform*="shrimp-count"]');
      expect(groups.length).toBe(5);
    });

    it('should use default count for unknown ingredients', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'unknown-count', ingredientId: 'mystery_ingredient' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g[transform*="unknown-count"]');
      expect(groups.length).toBe(6);
    });
  });

  describe('SushiAssembly component', () => {
    it('should render SVG with correct dimensions', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '300');
      expect(svg).toHaveAttribute('height', '290');
      expect(svg).toHaveAttribute('viewBox', '0 0 300 290');
    });

    it('should render bamboo mat with correct number of slats', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const slats = container.querySelectorAll('rect[width="248"]');
      // 14 slats + other rects (shadows, nori sheet, rice base, etc.)
      expect(slats.length).toBeGreaterThanOrEqual(14);
    });

    it('should render nori texture dots', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const noriDots = container.querySelectorAll('circle[fill="#2a402a"]');
      expect(noriDots.length).toBe(30);
    });

    it('should render rice grain texture', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const riceGrains = container.querySelectorAll('ellipse[fill="white"]');
      expect(riceGrains.length).toBe(60);
    });

    it('should render mat string ties', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const ties = container.querySelectorAll('line[stroke="#8a7030"]');
      expect(ties.length).toBe(3);
    });

    it('should render chopsticks', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const chopstickRects = container.querySelectorAll('rect[fill*="#c8a060"], rect[fill*="#d4aa70"]');
      expect(chopstickRects.length).toBe(2);
    });

    it('should render soy sauce dish', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const soyDish = container.querySelectorAll('ellipse[fill="#2c1a0a"]');
      expect(soyDish.length).toBeGreaterThan(0);
    });

    it('should render wasabi smear', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const wasabiSmear = container.querySelectorAll('ellipse[fill="#3aaa60"]');
      expect(wasabiSmear.length).toBeGreaterThan(0);
    });

    it('should handle multiple placed ingredients', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'item-1', ingredientId: 'salmon' },
        { instanceId: 'item-2', ingredientId: 'tuna' },
        { instanceId: 'item-3', ingredientId: 'cucumber' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g[transform*="translate"]');
      // 6 salmon + 6 tuna + 8 cucumber = 20 ingredient groups
      expect(groups.length).toBe(20);
    });

    it('should render with different ingredient combinations', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'combo-1', ingredientId: 'rice' },
        { instanceId: 'combo-2', ingredientId: 'wasabi' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g[transform*="translate"]');
      // 20 rice + 3 wasabi = 23 ingredient groups
      expect(groups.length).toBe(23);
    });

    it('should apply correct transforms to ingredient groups', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'transform-test', ingredientId: 'salmon' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g[transform*="translate"]');
      groups.forEach((group) => {
        const transform = group.getAttribute('transform');
        expect(transform).toMatch(/translate\(\d+(\.\d+)?\s+\d+(\.\d+)?\)\s+rotate\(\d+(\.\d+)?\)/);
      });
    });

    it('should render plate/cutting board edge', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const edge = container.querySelector('rect[stroke="#a89040"]');
      expect(edge).toHaveAttribute('strokeWidth', '2');
    });

    it('should render nori sheet with correct styling', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const noriSheet = container.querySelector('rect[fill="#1c2e1c"]');
      expect(noriSheet).toHaveAttribute('x', '38');
      expect(noriSheet).toHaveAttribute('y', '104');
      expect(noriSheet).toHaveAttribute('width', '224');
      expect(noriSheet).toHaveAttribute('height', '102');
    });

    it('should render rice base with correct opacity', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const riceBase = container.querySelector('rect[fill="#f8f5ee"]');
      expect(riceBase).toHaveAttribute('opacity', '0.88');
    });

    it('should handle empty placedIngredients array gracefully', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      expect(container.querySelector('svg')).toBeInTheDocument();
      // Should still have all decorative elements
      expect(container.querySelectorAll('rect').length).toBeGreaterThan(10);
    });

    it('should maintain consistent rendering order', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'order-test', ingredientId: 'salmon' },
      ];
      const { container: container1 } = render(
        <SushiAssembly placedIngredients={ingredients} />
      );
      const { container: container2 } = render(
        <SushiAssembly placedIngredients={ingredients} />
      );
      const svg1 = container1.querySelector('svg')?.innerHTML;
      const svg2 = container2.querySelector('svg')?.innerHTML;
      expect(svg1).toBe(svg2);
    });
  });

  describe('Edge cases and boundary values', () => {
    it('should handle ingredient with count of 3 (wasabi)', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'wasabi-boundary', ingredientId: 'wasabi' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g[transform*="wasabi-boundary"]');
      expect(groups.length).toBe(3);
    });

    it('should handle ingredient with count of 20 (rice)', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'rice-boundary', ingredientId: 'rice' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g[transform*="rice-boundary"]');
      expect(groups.length).toBe(20);
    });

    it('should handle special characters in instanceId', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-@#$%-1', ingredientId: 'salmon' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={ingredients} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should handle very large number of placedIngredients', () => {
      const ingredients: PlacedIngredient[] = Array.from({ length: 10 }, (_, i) => ({
        instanceId: `item-${i}`,
        ingredientId: 'salmon',
      }));
      const { container } = render(
        <SushiAssembly placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g[transform*="translate"]');
      expect(groups.length).toBe(60); // 10 items * 6 salmon pieces each
    });
  });
});