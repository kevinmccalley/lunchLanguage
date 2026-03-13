// @ts-nocheck
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { SushiAssembly } from './SushiAssembly';
import type { PlacedIngredient } from '../../types';

// Mock framer-motion to avoid animation complexity in tests
jest.mock('framer-motion', () => ({
  motion: {
    svg: ({ children, ...props }: any) => {
      const { initial, animate, transition, ...svgProps } = props;
      return <svg {...svgProps}>{children}</svg>;
    },
  },
}));

describe('SushiAssembly', () => {
  describe('Component rendering', () => {
    it('should render without crashing with empty placedIngredients', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render SVG with correct dimensions', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '300');
      expect(svg).toHaveAttribute('height', '290');
      expect(svg).toHaveAttribute('viewBox', '0 0 300 290');
    });

    it('should render bamboo mat base', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const matRect = container.querySelector('rect[fill="#d4c060"]');
      expect(matRect).toBeInTheDocument();
      expect(matRect).toHaveAttribute('x', '26');
      expect(matRect).toHaveAttribute('y', '88');
      expect(matRect).toHaveAttribute('width', '248');
      expect(matRect).toHaveAttribute('height', '196');
    });

    it('should render nori sheet', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const noriRect = container.querySelector('rect[fill="#1c2e1c"]');
      expect(noriRect).toBeInTheDocument();
      expect(noriRect).toHaveAttribute('x', '38');
      expect(noriRect).toHaveAttribute('y', '104');
    });

    it('should render rice base on nori', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const riceBase = container.querySelectorAll('rect[fill="#f8f5ee"]');
      expect(riceBase.length).toBeGreaterThan(0);
    });

    it('should render decorative elements (soy sauce dish and wasabi)', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render chopsticks', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const chopstickRects = container.querySelectorAll('rect[rx="3"]');
      expect(chopstickRects.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Bamboo mat slats', () => {
    it('should render 14 slats with alternating colors', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const slats = Array.from(container.querySelectorAll('rect')).filter(
        (rect) => rect.getAttribute('fill') === '#c8b860' || rect.getAttribute('fill') === '#b8a850'
      );
      expect(slats.length).toBe(14);
    });

    it('should alternate slat colors correctly', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const allRects = Array.from(container.querySelectorAll('rect'));
      let slatCount = 0;
      for (let i = 0; i < allRects.length; i++) {
        const fill = allRects[i].getAttribute('fill');
        if (fill === '#c8b860' || fill === '#b8a850') {
          const expectedColor = slatCount % 2 === 0 ? '#c8b860' : '#b8a850';
          expect(fill).toBe(expectedColor);
          slatCount++;
        }
      }
    });

    it('should render mat string ties', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const lines = container.querySelectorAll('line[stroke="#8a7030"]');
      expect(lines.length).toBe(3);
    });
  });

  describe('Nori texture and rice grain texture', () => {
    it('should render 30 nori texture dots', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const circles = container.querySelectorAll('circle[r="1.2"]');
      expect(circles.length).toBe(30);
    });

    it('should render 60 rice grain texture elements', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const ellipses = container.querySelectorAll('ellipse[rx="3.5"]');
      expect(ellipses.length).toBe(60);
    });
  });

  describe('Ingredient placement and rendering', () => {
    it('should render ingredients from placedIngredients array', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'salmon-1', ingredientId: 'salmon' },
        { instanceId: 'tuna-1', ingredientId: 'tuna' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g[transform*="translate"]');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render correct number of salmon pieces (6)', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'salmon-1', ingredientId: 'salmon' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={ingredients} />);
      const salmonGroups = Array.from(container.querySelectorAll('g')).filter((g) =>
        g.getAttribute('key')?.includes('salmon-1')
      );
      expect(salmonGroups.length).toBe(6);
    });

    it('should render correct number of cucumber pieces (8)', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'cucumber-1', ingredientId: 'cucumber' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={ingredients} />);
      const cucumberGroups = Array.from(container.querySelectorAll('g')).filter((g) =>
        g.getAttribute('key')?.includes('cucumber-1')
      );
      expect(cucumberGroups.length).toBe(8);
    });

    it('should render correct number of rice pieces (20)', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'rice-1', ingredientId: 'rice' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={ingredients} />);
      const riceGroups = Array.from(container.querySelectorAll('g')).filter((g) =>
        g.getAttribute('key')?.includes('rice-1')
      );
      expect(riceGroups.length).toBe(20);
    });

    it('should render correct number of wasabi pieces (3)', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'wasabi-1', ingredientId: 'wasabi' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={ingredients} />);
      const wasabiGroups = Array.from(container.querySelectorAll('g')).filter((g) =>
        g.getAttribute('key')?.includes('wasabi-1')
      );
      expect(wasabiGroups.length).toBe(3);
    });

    it('should render default fill count of 6 for unknown ingredients', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'unknown-1', ingredientId: 'unknown_ingredient' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={ingredients} />);
      const unknownGroups = Array.from(container.querySelectorAll('g')).filter((g) =>
        g.getAttribute('key')?.includes('unknown-1')
      );
      expect(unknownGroups.length).toBe(6);
    });

    it('should render multiple different ingredients', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'salmon-1', ingredientId: 'salmon' },
        { instanceId: 'avocado-1', ingredientId: 'avocado' },
        { instanceId: 'tuna-1', ingredientId: 'tuna' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={ingredients} />);
      const allIngredientGroups = Array.from(container.querySelectorAll('g')).filter((g) => {
        const key = g.getAttribute('key');
        return key && (key.includes('salmon-1') || key.includes('avocado-1') || key.includes('tuna-1'));
      });
      expect(allIngredientGroups.length).toBe(6 + 6 + 6);
    });

    it('should render all ingredient types with correct piece counts', () => {
      const ingredientCounts: Record<string, number> = {
        salmon: 6, tuna: 6, shrimp: 5, avocado: 6, cucumber: 8,
        rice: 20, seaweed: 5, cream_cheese: 5, soy_sauce: 4,
        wasabi: 3, ginger: 7,
      };

      const ingredients: PlacedIngredient[] = Object.keys(ingredientCounts).map((id, idx) => ({
        instanceId: `${id}-${idx}`,
        ingredientId: id,
      }));

      const { container } = render(<SushiAssembly placedIngredients={ingredients} />);

      Object.entries(ingredientCounts).forEach(([ingredientId, count]) => {
        const groups = Array.from(container.querySelectorAll('g')).filter((g) => {
          const key = g.getAttribute('key');
          return key && key.startsWith(`${ingredientId}-`);
        });
        expect(groups.length).toBe(count);
      });
    });
  });

  describe('SushiFilling component rendering', () => {
    it('should render salmon with correct elements', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-salmon', ingredientId: 'salmon' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={ingredients} />);
      const salmonEllipses = container.querySelectorAll('ellipse[fill="#f08060"]');
      expect(salmonEllipses.length).toBeGreaterThan(0);
    });

    it('should render tuna with correct color', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-tuna', ingredientId: 'tuna' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={ingredients} />);
      const tunaEllipses = container.querySelectorAll('ellipse[fill="#c0392b"]');
      expect(tunaEllipses.length).toBeGreaterThan(0);
    });

    it('should render avocado with correct color', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-avocado', ingredientId: 'avocado' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={ingredients} />);
      const avocadoEllipses = container.querySelectorAll('ellipse[fill="#5a9e3c"]');
      expect(avocadoEllipses.length).toBeGreaterThan(0);
    });

    it('should render cucumber with correct structure', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-cucumber', ingredientId: 'cucumber' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={ingredients} />);
      const cucumberCircles = container.querySelectorAll('circle[fill="#4caf50"]');
      expect(cucumberCircles.length).toBeGreaterThan(0);
    });

    it('should render rice with correct appearance', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-rice', ingredientId: 'rice' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={ingredients} />);
      const riceEllipses = container.querySelectorAll('ellipse[fill="#fafafa"]');
      expect(riceEllipses.length).toBeGreaterThan(0);
    });

    it('should render seaweed with correct color', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-seaweed', ingredientId: 'seaweed' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={ingredients} />);
      const seaweedRects = container.querySelectorAll('rect[fill="#1a3a2a"]');
      expect(seaweedRects.length).toBeGreaterThan(0);
    });

    it('should render cream cheese with correct color', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-cream_cheese', ingredientId: 'cream_cheese' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={ingredients} />);
      const creamCheeseEllipses = container.querySelectorAll('ellipse[fill="#faf5ee"]');
      expect(creamCheeseEllipses.length).toBeGreaterThan(0);
    });

    it('should render soy sauce with correct color', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-soy_sauce', ingredientId: 'soy_sauce' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={ingredients} />);
      const soySauceElements = container.querySelectorAll('path[fill="#2c1a0a"]');
      expect(soySauceElements.length).toBeGreaterThan(0);
    });

    it('should render wasabi with correct color', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-wasabi', ingredientId: 'wasabi' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={ingredients} />);
      const wasabiEllipses = container.querySelectorAll('ellipse[fill="#3aaa60"]');
      expect(wasabiEllipses.length).toBeGreaterThan(0);
    });

    it('should render ginger with correct color and rotation', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-ginger', ingredientId: 'ginger' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={ingredients} />);
      const gingerEllipses = container.querySelectorAll('ellipse[fill="#f5b8a8"]');
      expect(gingerEllipses.length).toBeGreaterThan(0);
    });

    it('should render shrimp with path elements', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-shrimp', ingredientId: 'shrimp' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={ingredients} />);
      const shrimpPaths = container.querySelectorAll('path[fill="#f4a460"]');
      expect(shrimpPaths.length).toBeGreaterThan(0);
    });

    it('should render default appearance for unknown ingredient', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-unknown', ingredientId: 'unknown' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={ingredients} />);
      const defaultCircles = container.querySelectorAll('circle[fill="#888"]');
      expect(defaultCircles.length).toBeGreaterThan(0);
    });
  });

  describe('Edge cases and stress tests', () => {
    it('should handle large number of ingredients', () => {
      const ingredients: PlacedIngredient[] = Array.from({ length: 20 }, (_, i) => ({
        instanceId: `ingredient-${i}`,
        ingredientId: 'salmon',
      }));
      const { container } = render(<SushiAssembly placedIngredients={ingredients} />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should handle ingredients with similar instanceIds', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'salmon-1', ingredientId: 'salmon' },
        { instanceId: 'salmon-1-copy', ingredientId: 'salmon' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g[transform*="translate"]');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should handle mixed ingredient types', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'mix-1', ingredientId: 'salmon' },
        { instanceId: 'mix-2', ingredientId: 'rice' },
        { instanceId: 'mix-3', ingredientId: 'wasabi' },
        { instanceId: 'mix-4', ingredientId: 'ginger' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={ingredients} />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should maintain correct key attributes for ingredient groups', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-id', ingredientId: 'salmon' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={ingredients} />);
      const groups = Array.from(container.querySelectorAll('g')).filter((g) =>
        g.getAttribute('key')?.startsWith('test-id')
      );
      expect(groups.length).toBe(6);
      groups.forEach((group, idx) => {
        expect(group.getAttribute('key')).toBe(`test-id-${idx}`);
      });
    });
  });

  describe('Layout and structure validation', () => {
    it('should have nori sheet shadow before nori sheet', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const rects = Array.from(container.querySelectorAll('rect'));
      const noriShadowIdx = rects.findIndex((r) => r.getAttribute('fill') === 'rgba(0,0,0,0.18)');
      const noriIdx = rects.findIndex((r) => r.getAttribute('fill') === '#1c2e1c');
      expect(noriShadowIdx).toBeLessThan(noriIdx);
    });

    it('should have plate edge stroke', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const plateEdge = container.querySelector('rect[stroke="#a89040"]');
      expect(plateEdge).toBeInTheDocument();
      expect(plateEdge).toHaveAttribute('strokeWidth', '2');
    });

    it('should render soy sauce dish with correct structure', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const soySauceDishEllipses = container.querySelectorAll('ellipse[cx="248"]');
      expect(soySauceDishEllipses.length).toBeGreaterThan(0);
    });

    it('should render wasabi smear with correct structure', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const wasabiSmearEllipses = container.querySelectorAll('ellipse[cx="66"]');
      expect(wasabiSmearEllipses.length).toBeGreaterThan(0);
    });
  });
});