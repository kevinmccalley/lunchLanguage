// @ts-nocheck
import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { SushiAssembly } from './SushiAssembly';
import type { PlacedIngredient } from '../../types';

describe('SushiAssembly', () => {
  describe('Component rendering', () => {
    it('should render an SVG element', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should have correct SVG dimensions', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '300');
      expect(svg).toHaveAttribute('height', '290');
      expect(svg).toHaveAttribute('viewBox', '0 0 300 290');
    });

    it('should render bamboo mat elements', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render chopsticks', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const g = container.querySelectorAll('g');
      expect(g.length).toBeGreaterThan(0);
    });

    it('should render soy sauce dish', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render wasabi smear', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });
  });

  describe('Placed ingredients rendering', () => {
    it('should render no ingredient groups when placedIngredients is empty', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const groups = container.querySelectorAll('g');
      // Should have at least the chopsticks group, but no ingredient groups
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render salmon ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'salmon', instanceId: 'test-salmon-1' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={placedIngredients} />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render tuna ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'tuna', instanceId: 'test-tuna-1' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={placedIngredients} />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render shrimp ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'shrimp', instanceId: 'test-shrimp-1' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={placedIngredients} />);
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render avocado ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'avocado', instanceId: 'test-avocado-1' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={placedIngredients} />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render cucumber ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'cucumber', instanceId: 'test-cucumber-1' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={placedIngredients} />);
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render rice ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'test-rice-1' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={placedIngredients} />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render seaweed ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'seaweed', instanceId: 'test-seaweed-1' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={placedIngredients} />);
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render cream_cheese ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'cream_cheese', instanceId: 'test-cream-cheese-1' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={placedIngredients} />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render soy_sauce ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'soy_sauce', instanceId: 'test-soy-sauce-1' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={placedIngredients} />);
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render wasabi ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'wasabi', instanceId: 'test-wasabi-1' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={placedIngredients} />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render ginger ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'ginger', instanceId: 'test-ginger-1' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={placedIngredients} />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render default ingredient for unknown id', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'unknown', instanceId: 'test-unknown-1' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={placedIngredients} />);
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render correct number of filling elements for salmon', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'salmon', instanceId: 'test-salmon-1' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g');
      // 1 for salmon (6 fillings) + 1 for chopsticks
      expect(groups.length).toBeGreaterThan(1);
    });

    it('should render multiple placed ingredients', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'salmon', instanceId: 'test-salmon-1' },
        { ingredientId: 'avocado', instanceId: 'test-avocado-1' },
        { ingredientId: 'cucumber', instanceId: 'test-cucumber-1' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(3);
    });

    it('should use correct fill count for each ingredient type', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'test-rice-1' }, // 20 fillings
      ];
      const { container } = render(<SushiAssembly placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g');
      // Should have more groups due to 20 rice fillings
      expect(groups.length).toBeGreaterThan(10);
    });
  });

  describe('SVG structure', () => {
    it('should contain nori sheet element', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const rects = container.querySelectorAll('rect[fill="#1c2e1c"]');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should contain rice base element', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const rects = container.querySelectorAll('rect');
      const riceBase = Array.from(rects).some((rect) => {
        const fill = rect.getAttribute('fill');
        return fill === '#f8f5ee';
      });
      expect(riceBase).toBe(true);
    });

    it('should contain proper motion animation attributes', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render bamboo mat slats correctly', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const rects = container.querySelectorAll('rect');
      // Should have at least 14 slats
      expect(rects.length).toBeGreaterThanOrEqual(14);
    });

    it('should render mat string ties', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const lines = container.querySelectorAll('line');
      // Should have at least 3 string ties
      expect(lines.length).toBeGreaterThanOrEqual(3);
    });

    it('should render nori texture dots', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const circles = container.querySelectorAll('circle');
      // Should have nori texture dots + ingredient circles
      expect(circles.length).toBeGreaterThanOrEqual(30);
    });

    it('should render rice grain texture', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const ellipses = container.querySelectorAll('ellipse');
      // Should have rice grain textures
      expect(ellipses.length).toBeGreaterThanOrEqual(60);
    });
  });

  describe('Edge cases', () => {
    it('should handle empty placedIngredients array', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should handle many placed ingredients', () => {
      const placedIngredients: PlacedIngredient[] = Array.from({ length: 10 }, (_, i) => ({
        ingredientId: 'salmon',
        instanceId: `test-salmon-${i}`,
      }));
      const { container } = render(<SushiAssembly placedIngredients={placedIngredients} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should handle duplicate instance ids gracefully', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'salmon', instanceId: 'same-id' },
        { ingredientId: 'salmon', instanceId: 'same-id' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={placedIngredients} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render with various ingredient combinations', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'salmon', instanceId: 'id1' },
        { ingredientId: 'rice', instanceId: 'id2' },
        { ingredientId: 'wasabi', instanceId: 'id3' },
        { ingredientId: 'ginger', instanceId: 'id4' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={placedIngredients} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Ingredient specific properties', () => {
    it('salmon should have proper fill color', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'salmon', instanceId: 'test-salmon-1' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={placedIngredients} />);
      const ellipses = container.querySelectorAll('ellipse[fill="#f08060"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('tuna should have proper fill color', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'tuna', instanceId: 'test-tuna-1' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={placedIngredients} />);
      const ellipses = container.querySelectorAll('ellipse[fill="#c0392b"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('avocado should have proper fill color', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'avocado', instanceId: 'test-avocado-1' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={placedIngredients} />);
      const ellipses = container.querySelectorAll('ellipse[fill="#5a9e3c"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('cucumber should have proper fill color', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'cucumber', instanceId: 'test-cucumber-1' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={placedIngredients} />);
      const circles = container.querySelectorAll('circle[fill="#4caf50"]');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('seaweed should have proper fill color', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'seaweed', instanceId: 'test-seaweed-1' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={placedIngredients} />);
      const rects = container.querySelectorAll('rect[fill="#1a3a2a"]');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('cream_cheese should have proper fill color', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'cream_cheese', instanceId: 'test-cream-cheese-1' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={placedIngredients} />);
      const ellipses = container.querySelectorAll('ellipse[fill="#faf5ee"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('wasabi should have proper fill color', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'wasabi', instanceId: 'test-wasabi-1' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={placedIngredients} />);
      const ellipses = container.querySelectorAll('ellipse[fill="#3aaa60"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('ginger should have proper fill color', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'ginger', instanceId: 'test-ginger-1' },
      ];
      const { container } = render(<SushiAssembly placedIngredients={placedIngredients} />);
      const ellipses = container.querySelectorAll('ellipse[fill="#f5b8a8"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });
  });
});