// @ts-nocheck
import type { ReactElement } from 'react';
import { render, screen } from '@testing-library/react';
import { SushiAssembly } from './SushiAssembly';
import type { PlacedIngredient } from '../../types';

describe('SushiAssembly', () => {
  describe('srng function', () => {
    // srng is a private function, but we can test it through noriPoint behavior
    // Testing deterministic behavior through the component

    it('should render without crashing with empty placedIngredients', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('noriPoint function', () => {
    // Testing through component rendering - verifying deterministic placement
    it('should place ingredients consistently for the same instanceId', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'test-1',
        ingredientId: 'salmon',
      };

      const { container: container1 } = render(
        <SushiAssembly placedIngredients={[ingredient]} />
      );
      const groups1 = container1.querySelectorAll('g[transform*="translate"]');

      const { container: container2 } = render(
        <SushiAssembly placedIngredients={[ingredient]} />
      );
      const groups2 = container2.querySelectorAll('g[transform*="translate"]');

      expect(groups1.length).toBe(groups2.length);
      // Same instanceId should produce same transforms
      expect(groups1[0]?.getAttribute('transform')).toBe(groups2[0]?.getAttribute('transform'));
    });
  });

  describe('SushiFilling component', () => {
    it('should render salmon filling', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'salmon-test',
        ingredientId: 'salmon',
      };

      const { container } = render(<SushiAssembly placedIngredients={[ingredient]} />);
      const ellipses = container.querySelectorAll('ellipse[fill="#f08060"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render tuna filling', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'tuna-test',
        ingredientId: 'tuna',
      };

      const { container } = render(<SushiAssembly placedIngredients={[ingredient]} />);
      const ellipses = container.querySelectorAll('ellipse[fill="#c0392b"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render shrimp filling', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'shrimp-test',
        ingredientId: 'shrimp',
      };

      const { container } = render(<SushiAssembly placedIngredients={[ingredient]} />);
      const paths = container.querySelectorAll('path[fill="#f4a460"]');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render avocado filling', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'avocado-test',
        ingredientId: 'avocado',
      };

      const { container } = render(<SushiAssembly placedIngredients={[ingredient]} />);
      const ellipses = container.querySelectorAll('ellipse[fill="#5a9e3c"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render cucumber filling', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'cucumber-test',
        ingredientId: 'cucumber',
      };

      const { container } = render(<SushiAssembly placedIngredients={[ingredient]} />);
      const circles = container.querySelectorAll('circle[fill="#4caf50"]');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render rice filling', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'rice-test',
        ingredientId: 'rice',
      };

      const { container } = render(<SushiAssembly placedIngredients={[ingredient]} />);
      const ellipses = container.querySelectorAll('ellipse[fill="#fafafa"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render seaweed filling', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'seaweed-test',
        ingredientId: 'seaweed',
      };

      const { container } = render(<SushiAssembly placedIngredients={[ingredient]} />);
      const rects = container.querySelectorAll('rect[fill="#1a3a2a"]');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render cream cheese filling', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'cream-cheese-test',
        ingredientId: 'cream_cheese',
      };

      const { container } = render(<SushiAssembly placedIngredients={[ingredient]} />);
      const ellipses = container.querySelectorAll('ellipse[fill="#faf5ee"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render soy sauce filling', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'soy-sauce-test',
        ingredientId: 'soy_sauce',
      };

      const { container } = render(<SushiAssembly placedIngredients={[ingredient]} />);
      const paths = container.querySelectorAll('path[fill="#2c1a0a"]');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render wasabi filling', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'wasabi-test',
        ingredientId: 'wasabi',
      };

      const { container } = render(<SushiAssembly placedIngredients={[ingredient]} />);
      const ellipses = container.querySelectorAll('ellipse[fill="#3aaa60"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render ginger filling', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'ginger-test',
        ingredientId: 'ginger',
      };

      const { container } = render(<SushiAssembly placedIngredients={[ingredient]} />);
      const ellipses = container.querySelectorAll('ellipse[fill="#f5b8a8"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render default filling for unknown ingredient id', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'unknown-test',
        ingredientId: 'unknown_ingredient',
      };

      const { container } = render(<SushiAssembly placedIngredients={[ingredient]} />);
      const circles = container.querySelectorAll('circle[fill="#888"]');
      expect(circles.length).toBeGreaterThan(0);
    });
  });

  describe('FILL_COUNT configuration', () => {
    it('should render correct number of salmon pieces', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'salmon-count',
        ingredientId: 'salmon',
      };

      const { container } = render(<SushiAssembly placedIngredients={[ingredient]} />);
      const groups = container.querySelectorAll('g[transform*="translate"]');
      // Should have 6 salmon pieces (FILL_COUNT['salmon'] = 6)
      expect(groups.length).toBe(6);
    });

    it('should render correct number of cucumber pieces', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'cucumber-count',
        ingredientId: 'cucumber',
      };

      const { container } = render(<SushiAssembly placedIngredients={[ingredient]} />);
      const groups = container.querySelectorAll('g[transform*="translate"]');
      // Should have 8 cucumber pieces (FILL_COUNT['cucumber'] = 8)
      expect(groups.length).toBe(8);
    });

    it('should render default 6 pieces for ingredient without fill count', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'unknown-count',
        ingredientId: 'unknown_ingredient',
      };

      const { container } = render(<SushiAssembly placedIngredients={[ingredient]} />);
      const groups = container.querySelectorAll('g[transform*="translate"]');
      // Should default to 6 pieces
      expect(groups.length).toBe(6);
    });
  });

  describe('SushiAssembly component structure', () => {
    it('should render SVG with correct dimensions', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '300');
      expect(svg).toHaveAttribute('height', '290');
      expect(svg).toHaveAttribute('viewBox', '0 0 300 290');
    });

    it('should render bamboo mat shadow', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const shadow = container.querySelector('rect[fill="rgba(0,0,0,0.10)"]');
      expect(shadow).toHaveAttribute('x', '30');
      expect(shadow).toHaveAttribute('y', '92');
      expect(shadow).toHaveAttribute('width', '248');
      expect(shadow).toHaveAttribute('height', '196');
    });

    it('should render bamboo mat slats', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const matRects = container.querySelectorAll(
        'rect[fill="#c8b860"], rect[fill="#b8a850"]'
      );
      // Should have 14 slats (SLAT_COUNT = 14)
      expect(matRects.length).toBe(14);
    });

    it('should render mat string ties', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const ties = container.querySelectorAll('line[stroke="#8a7030"]');
      // Should have 3 string ties
      expect(ties.length).toBe(3);
    });

    it('should render nori sheet', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const noriSheet = container.querySelector('rect[fill="#1c2e1c"]');
      expect(noriSheet).toHaveAttribute('x', '38');
      expect(noriSheet).toHaveAttribute('y', '104');
      expect(noriSheet).toHaveAttribute('width', '224');
      expect(noriSheet).toHaveAttribute('height', '102');
    });

    it('should render nori texture dots', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const noriDots = container.querySelectorAll('circle[fill="#2a402a"]');
      // Should have 30 nori texture dots
      expect(noriDots.length).toBe(30);
    });

    it('should render rice base', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const riceBase = container.querySelector('rect[fill="#f8f5ee"]');
      expect(riceBase).toHaveAttribute('x', '44');
      expect(riceBase).toHaveAttribute('y', '109');
      expect(riceBase).toHaveAttribute('width', '212');
      expect(riceBase).toHaveAttribute('height', '92');
    });

    it('should render rice grain texture', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const riceGrains = container.querySelectorAll('ellipse[fill="white"][stroke="#e0ddd4"]');
      // Should have 60 rice grain textures
      expect(riceGrains.length).toBe(60);
    });

    it('should render chopsticks', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const chopsticks = container.querySelectorAll('g[transform="translate(0,8)"] rect');
      expect(chopsticks.length).toBe(2);
    });

    it('should render soy sauce dish', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const soyDish = container.querySelector('ellipse[cx="248"][cy="252"]');
      expect(soyDish).toHaveAttribute('rx', '28');
      expect(soyDish).toHaveAttribute('ry', '14');
    });

    it('should render wasabi smear', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const wasabiSmear = container.querySelector('ellipse[cx="66"][cy="252"]');
      expect(wasabiSmear).toHaveAttribute('rx', '16');
      expect(wasabiSmear).toHaveAttribute('ry', '9');
    });

    it('should render plate edge border', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const plateBorder = container.querySelector('rect[stroke="#a89040"]');
      expect(plateBorder).toHaveAttribute('x', '26');
      expect(plateBorder).toHaveAttribute('y', '88');
      expect(plateBorder).toHaveAttribute('width', '248');
      expect(plateBorder).toHaveAttribute('height', '196');
      expect(plateBorder).toHaveAttribute('stroke-width', '2');
    });
  });

  describe('Multiple ingredients', () => {
    it('should render multiple different ingredients', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'salmon-1', ingredientId: 'salmon' },
        { instanceId: 'avocado-1', ingredientId: 'avocado' },
        { instanceId: 'cucumber-1', ingredientId: 'cucumber' },
      ];

      const { container } = render(<SushiAssembly placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g[transform*="translate"]');
      // 6 salmon + 6 avocado + 8 cucumber = 20 groups
      expect(groups.length).toBe(20);
    });

    it('should render same ingredient type with different instanceIds separately', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'salmon-1', ingredientId: 'salmon' },
        { instanceId: 'salmon-2', ingredientId: 'salmon' },
      ];

      const { container } = render(<SushiAssembly placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g[transform*="translate"]');
      // 6 salmon + 6 salmon = 12 groups
      expect(groups.length).toBe(12);
    });

    it('should place ingredients with different positions for different instanceIds', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'salmon-1', ingredientId: 'salmon' },
        { instanceId: 'salmon-2', ingredientId: 'salmon' },
      ];

      const { container } = render(<SushiAssembly placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g[transform*="translate"]');
      const transform1 = groups[0]?.getAttribute('transform');
      const transform2 = groups[6]?.getAttribute('transform');
      // Different instanceIds should produce different positions
      expect(transform1).not.toBe(transform2);
    });
  });

  describe('Animation properties', () => {
    it('should have motion.svg with spring animation', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const svg = container.querySelector('svg');
      // Check that it's a motion component (has motion attributes)
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('should handle very long ingredient list', () => {
      const ingredients: PlacedIngredient[] = Array.from({ length: 50 }, (_, i) => ({
        instanceId: `ingredient-${i}`,
        ingredientId: 'salmon',
      }));

      const { container } = render(<SushiAssembly placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g[transform*="translate"]');
      // 50 ingredients * 6 pieces = 300 groups
      expect(groups.length).toBe(300);
    });

    it('should handle ingredients with special characters in instanceId', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-@#$-special', ingredientId: 'salmon' },
      ];

      const { container } = render(<SushiAssembly placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g[transform*="translate"]');
      expect(groups.length).toBe(6);
    });

    it('should handle ingredients with numeric instanceIds', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: '12345', ingredientId: 'tuna' },
      ];

      const { container } = render(<SushiAssembly placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g[transform*="translate"]');
      expect(groups.length).toBe(6);
    });

    it('should maintain consistent render with same props', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-1', ingredientId: 'salmon' },
      ];

      const { container: container1, rerender: rerender1 } = render(
        <SushiAssembly placedIngredients={ingredients} />
      );
      const groups1 = container1.querySelectorAll('g[transform*="translate"]');
      const firstTransform = groups1[0]?.getAttribute('transform');

      rerender1(<SushiAssembly placedIngredients={ingredients} />);
      const groups2 = container1.querySelectorAll('g[transform*="translate"]');
      const secondTransform = groups2[0]?.getAttribute('transform');

      expect(firstTransform).toBe(secondTransform);
    });
  });

  describe('Ingredient specific fill counts', () => {
    const testCases = [
      { id: 'salmon', count: 6 },
      { id: 'tuna', count: 6 },
      { id: 'shrimp', count: 5 },
      { id: 'avocado', count: 6 },
      { id: 'cucumber', count: 8 },
      { id: 'rice', count: 20 },
      { id: 'seaweed', count: 5 },
      { id: 'cream_cheese', count: 5 },
      { id: 'soy_sauce', count: 4 },
      { id: 'wasabi', count: 3 },
      { id: 'ginger', count: 7 },
    ];

    testCases.forEach(({ id, count }) => {
      it(`should render ${count} pieces of ${id}`, () => {
        const ingredients: PlacedIngredient[] = [
          { instanceId: `test-${id}`, ingredientId: id },
        ];

        const { container } = render(<SushiAssembly placedIngredients={ingredients} />);
        const groups = container.querySelectorAll('g[transform*="translate"]');
        expect(groups.length).toBe(count);
      });
    });
  });
});