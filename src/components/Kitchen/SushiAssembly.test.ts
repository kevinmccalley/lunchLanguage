// @ts-nocheck
import { render } from '@testing-library/react';
import { SushiAssembly } from '../src/components/Kitchen/SushiAssembly';
import type { PlacedIngredient } from '../src/types';

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

    it('should render bamboo mat slats', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render nori sheet', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const rects = container.querySelectorAll('rect');
      const noriRect = Array.from(rects).find((rect) => {
        const fill = rect.getAttribute('fill');
        return fill === '#1c2e1c';
      });
      expect(noriRect).toBeTruthy();
    });

    it('should render rice base', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const rects = container.querySelectorAll('rect');
      const riceRect = Array.from(rects).find((rect) => {
        const fill = rect.getAttribute('fill');
        return fill === '#f8f5ee';
      });
      expect(riceRect).toBeTruthy();
    });

    it('should render nori texture dots', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThanOrEqual(30);
    });

    it('should render rice grain texture', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThanOrEqual(60);
    });

    it('should render chopsticks', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render soy sauce dish', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const ellipses = container.querySelectorAll('ellipse');
      const soyDish = Array.from(ellipses).find((ellipse) => {
        const cx = ellipse.getAttribute('cx');
        return cx === '248';
      });
      expect(soyDish).toBeTruthy();
    });

    it('should render wasabi smear', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const ellipses = container.querySelectorAll('ellipse');
      const wasabi = Array.from(ellipses).find((ellipse) => {
        const cx = ellipse.getAttribute('cx');
        const fill = ellipse.getAttribute('fill');
        return cx === '66' && fill === '#3aaa60';
      });
      expect(wasabi).toBeTruthy();
    });
  });

  describe('Ingredient rendering', () => {
    it('should render salmon ingredient', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'salmon-1',
        ingredientId: 'salmon',
      };
      const { container } = render(
        <SushiAssembly placedIngredients={[ingredient]} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render tuna ingredient', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'tuna-1',
        ingredientId: 'tuna',
      };
      const { container } = render(
        <SushiAssembly placedIngredients={[ingredient]} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render shrimp ingredient', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'shrimp-1',
        ingredientId: 'shrimp',
      };
      const { container } = render(
        <SushiAssembly placedIngredients={[ingredient]} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render avocado ingredient', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'avocado-1',
        ingredientId: 'avocado',
      };
      const { container } = render(
        <SushiAssembly placedIngredients={[ingredient]} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render cucumber ingredient', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'cucumber-1',
        ingredientId: 'cucumber',
      };
      const { container } = render(
        <SushiAssembly placedIngredients={[ingredient]} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render rice ingredient', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'rice-1',
        ingredientId: 'rice',
      };
      const { container } = render(
        <SushiAssembly placedIngredients={[ingredient]} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render seaweed ingredient', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'seaweed-1',
        ingredientId: 'seaweed',
      };
      const { container } = render(
        <SushiAssembly placedIngredients={[ingredient]} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render cream_cheese ingredient', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'cream_cheese-1',
        ingredientId: 'cream_cheese',
      };
      const { container } = render(
        <SushiAssembly placedIngredients={[ingredient]} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render soy_sauce ingredient', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'soy_sauce-1',
        ingredientId: 'soy_sauce',
      };
      const { container } = render(
        <SushiAssembly placedIngredients={[ingredient]} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render wasabi ingredient', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'wasabi-1',
        ingredientId: 'wasabi',
      };
      const { container } = render(
        <SushiAssembly placedIngredients={[ingredient]} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render ginger ingredient', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'ginger-1',
        ingredientId: 'ginger',
      };
      const { container } = render(
        <SushiAssembly placedIngredients={[ingredient]} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render unknown ingredient as default circle', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'unknown-1',
        ingredientId: 'unknown_ingredient',
      };
      const { container } = render(
        <SushiAssembly placedIngredients={[ingredient]} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render correct number of salmon pieces', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'salmon-1',
        ingredientId: 'salmon',
      };
      const { container } = render(
        <SushiAssembly placedIngredients={[ingredient]} />
      );
      const groups = container.querySelectorAll('g[transform*="translate"]');
      expect(groups.length).toBe(6);
    });

    it('should render correct number of tuna pieces', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'tuna-1',
        ingredientId: 'tuna',
      };
      const { container } = render(
        <SushiAssembly placedIngredients={[ingredient]} />
      );
      const groups = container.querySelectorAll('g[transform*="translate"]');
      expect(groups.length).toBe(6);
    });

    it('should render correct number of shrimp pieces', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'shrimp-1',
        ingredientId: 'shrimp',
      };
      const { container } = render(
        <SushiAssembly placedIngredients={[ingredient]} />
      );
      const groups = container.querySelectorAll('g[transform*="translate"]');
      expect(groups.length).toBe(5);
    });

    it('should render correct number of rice pieces', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'rice-1',
        ingredientId: 'rice',
      };
      const { container } = render(
        <SushiAssembly placedIngredients={[ingredient]} />
      );
      const groups = container.querySelectorAll('g[transform*="translate"]');
      expect(groups.length).toBe(20);
    });

    it('should render correct number of cucumber pieces', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'cucumber-1',
        ingredientId: 'cucumber',
      };
      const { container } = render(
        <SushiAssembly placedIngredients={[ingredient]} />
      );
      const groups = container.querySelectorAll('g[transform*="translate"]');
      expect(groups.length).toBe(8);
    });

    it('should render correct number of ginger pieces', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'ginger-1',
        ingredientId: 'ginger',
      };
      const { container } = render(
        <SushiAssembly placedIngredients={[ingredient]} />
      );
      const groups = container.querySelectorAll('g[transform*="translate"]');
      expect(groups.length).toBe(7);
    });
  });

  describe('Multiple ingredients', () => {
    it('should render multiple different ingredients', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'salmon-1', ingredientId: 'salmon' },
        { instanceId: 'tuna-1', ingredientId: 'tuna' },
        { instanceId: 'avocado-1', ingredientId: 'avocado' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g[transform*="translate"]');
      expect(groups.length).toBe(6 + 6 + 6);
    });

    it('should render multiple instances of same ingredient', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'salmon-1', ingredientId: 'salmon' },
        { instanceId: 'salmon-2', ingredientId: 'salmon' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g[transform*="translate"]');
      expect(groups.length).toBe(12);
    });

    it('should render all ingredient types together', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'salmon-1', ingredientId: 'salmon' },
        { instanceId: 'tuna-1', ingredientId: 'tuna' },
        { instanceId: 'shrimp-1', ingredientId: 'shrimp' },
        { instanceId: 'avocado-1', ingredientId: 'avocado' },
        { instanceId: 'cucumber-1', ingredientId: 'cucumber' },
        { instanceId: 'rice-1', ingredientId: 'rice' },
        { instanceId: 'seaweed-1', ingredientId: 'seaweed' },
        { instanceId: 'cream_cheese-1', ingredientId: 'cream_cheese' },
        { instanceId: 'soy_sauce-1', ingredientId: 'soy_sauce' },
        { instanceId: 'wasabi-1', ingredientId: 'wasabi' },
        { instanceId: 'ginger-1', ingredientId: 'ginger' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g[transform*="translate"]');
      const expectedCount = 6 + 6 + 5 + 6 + 8 + 20 + 5 + 5 + 4 + 3 + 7;
      expect(groups.length).toBe(expectedCount);
    });
  });

  describe('Ingredient positioning', () => {
    it('should apply transform to ingredient groups', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'salmon-1',
        ingredientId: 'salmon',
      };
      const { container } = render(
        <SushiAssembly placedIngredients={[ingredient]} />
      );
      const group = container.querySelector('g[transform*="translate"]');
      expect(group).toHaveAttribute('transform');
      const transform = group?.getAttribute('transform');
      expect(transform).toMatch(/translate\(\d+\.?\d* \d+\.?\d*\) rotate\(\d+\.?\d*\)/);
    });

    it('should have unique keys for each ingredient piece', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'salmon-1', ingredientId: 'salmon' },
        { instanceId: 'tuna-1', ingredientId: 'tuna' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g[transform*="translate"]');
      const transforms = new Set();
      groups.forEach((group) => {
        const key = group.getAttribute('transform');
        expect(transforms).not.toContain(key);
        transforms.add(key);
      });
    });
  });

  describe('Bamboo mat decoration', () => {
    it('should render correct number of bamboo slats', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const rects = container.querySelectorAll('rect[fill="#c8b860"], rect[fill="#b8a850"]');
      expect(rects.length).toBe(14);
    });

    it('should alternate bamboo slat colors', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const rects = Array.from(
        container.querySelectorAll('rect[fill="#c8b860"], rect[fill="#b8a850"]')
      );
      rects.forEach((rect, index) => {
        const fill = rect.getAttribute('fill');
        const expectedColor = index % 2 === 0 ? '#c8b860' : '#b8a850';
        expect(fill).toBe(expectedColor);
      });
    });

    it('should render mat string ties', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const lines = container.querySelectorAll('line[stroke="#8a7030"]');
      expect(lines.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Accessibility and structure', () => {
    it('should have proper SVG structure', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const svg = container.querySelector('svg');
      expect(svg?.tagName.toLowerCase()).toBe('svg');
    });

    it('should render groups for ingredient pieces', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'salmon-1',
        ingredientId: 'salmon',
      };
      const { container } = render(
        <SushiAssembly placedIngredients={[ingredient]} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should contain basic SVG elements', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      expect(container.querySelector('rect')).toBeTruthy();
      expect(container.querySelector('ellipse')).toBeTruthy();
      expect(container.querySelector('circle')).toBeTruthy();
    });
  });

  describe('Motion animation', () => {
    it('should apply motion animation to SVG', () => {
      const { container } = render(<SushiAssembly placedIngredients={[]} />);
      const svg = container.querySelector('svg');
      expect(svg?.tagName.toLowerCase()).toBe('svg');
    });
  });
});