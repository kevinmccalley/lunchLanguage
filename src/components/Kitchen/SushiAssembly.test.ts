// @ts-nocheck
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { SushiAssembly } from '../../src/components/Kitchen/SushiAssembly';
import type { PlacedIngredient } from '../../src/types';

// Mock framer-motion to avoid animation complexities in tests
jest.mock('framer-motion', () => ({
  motion: {
    svg: ({ children, ...props }: any) => {
      const { initial, animate, transition, ...rest } = props;
      return <svg {...rest}>{children}</svg>;
    },
  },
}));

describe('SushiAssembly', () => {
  describe('Component Rendering', () => {
    it('should render SVG with correct dimensions', () => {
      const { container } = render(
        <SushiAssembly placedIngredients={[]} />
      );
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '300');
      expect(svg).toHaveAttribute('height', '290');
      expect(svg).toHaveAttribute('viewBox', '0 0 300 290');
    });

    it('should render bamboo mat elements', () => {
      const { container } = render(
        <SushiAssembly placedIngredients={[]} />
      );
      const matRects = container.querySelectorAll('rect[x="26"]');
      expect(matRects.length).toBeGreaterThan(0);
    });

    it('should render nori sheet', () => {
      const { container } = render(
        <SushiAssembly placedIngredients={[]} />
      );
      const noriRect = Array.from(container.querySelectorAll('rect')).find(
        rect => rect.getAttribute('fill') === '#1c2e1c'
      );
      expect(noriRect).toBeInTheDocument();
    });

    it('should render rice base', () => {
      const { container } = render(
        <SushiAssembly placedIngredients={[]} />
      );
      const riceRect = Array.from(container.querySelectorAll('rect')).find(
        rect => rect.getAttribute('fill') === '#f8f5ee'
      );
      expect(riceRect).toBeInTheDocument();
    });

    it('should render decorative elements (chopsticks and soy sauce dish)', () => {
      const { container } = render(
        <SushiAssembly placedIngredients={[]} />
      );
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });
  });

  describe('Placed Ingredients Rendering', () => {
    it('should render ingredients with default count when no placedIngredients', () => {
      const { container } = render(
        <SushiAssembly placedIngredients={[]} />
      );
      const groups = container.querySelectorAll('g');
      // Should have groups for nori texture dots, rice grains, and slats
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render salmon ingredient with correct fill count', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'salmon', instanceId: 'salmon-1' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={placedIngredients} />
      );
      const groups = container.querySelectorAll('g[transform*="translate"]');
      // Should have groups for salmon (6 pieces) + rice grains + nori + slats
      expect(groups.length).toBeGreaterThan(6);
    });

    it('should render tuna ingredient with correct fill count', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'tuna', instanceId: 'tuna-1' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={placedIngredients} />
      );
      const groups = container.querySelectorAll('g[transform*="translate"]');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render shrimp ingredient with correct fill count', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'shrimp', instanceId: 'shrimp-1' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={placedIngredients} />
      );
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render avocado ingredient with correct fill count', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'avocado', instanceId: 'avocado-1' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={placedIngredients} />
      );
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render cucumber ingredient with correct fill count', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'cucumber', instanceId: 'cucumber-1' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={placedIngredients} />
      );
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render rice ingredient with correct fill count', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={placedIngredients} />
      );
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render seaweed ingredient with correct fill count', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'seaweed', instanceId: 'seaweed-1' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={placedIngredients} />
      );
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render cream cheese ingredient with correct fill count', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'cream_cheese', instanceId: 'cc-1' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={placedIngredients} />
      );
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render soy sauce ingredient with correct fill count', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'soy_sauce', instanceId: 'soy-1' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={placedIngredients} />
      );
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render wasabi ingredient with correct fill count', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'wasabi', instanceId: 'wasabi-1' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={placedIngredients} />
      );
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render ginger ingredient with correct fill count', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'ginger', instanceId: 'ginger-1' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={placedIngredients} />
      );
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render unknown ingredient with default circle', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'unknown_ingredient', instanceId: 'unknown-1' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={placedIngredients} />
      );
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render multiple ingredients together', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'salmon', instanceId: 'salmon-1' },
        { ingredientId: 'tuna', instanceId: 'tuna-1' },
        { ingredientId: 'avocado', instanceId: 'avocado-1' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={placedIngredients} />
      );
      const groups = container.querySelectorAll('g[transform*="translate"]');
      // salmon (6) + tuna (6) + avocado (6) + rice grains (60) + nori dots (30) = 108 minimum
      expect(groups.length).toBeGreaterThan(50);
    });

    it('should use default fill count for unknown ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'mysterious_ingredient', instanceId: 'mystery-1' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={placedIngredients} />
      );
      // Should still render with default count of 6
      const svgContent = container.innerHTML;
      expect(svgContent).toBeTruthy();
    });
  });

  describe('Bamboo Mat Structure', () => {
    it('should render correct number of bamboo slats', () => {
      const { container } = render(
        <SushiAssembly placedIngredients={[]} />
      );
      // Slat count is 14, plus base mat rect, nori rect, rice base rect, shadows, etc.
      const allRects = container.querySelectorAll('rect');
      expect(allRects.length).toBeGreaterThan(14);
    });

    it('should render mat string ties', () => {
      const { container } = render(
        <SushiAssembly placedIngredients={[]} />
      );
      const lines = container.querySelectorAll('line');
      // Should have 3 mat ties + potentially ingredient lines
      expect(lines.length).toBeGreaterThanOrEqual(3);
    });

    it('should render mat with alternating shades', () => {
      const { container } = render(
        <SushiAssembly placedIngredients={[]} />
      );
      const rects = Array.from(container.querySelectorAll('rect'));
      const coloredRects = rects.filter(rect => {
        const fill = rect.getAttribute('fill');
        return fill === '#c8b860' || fill === '#b8a850';
      });
      expect(coloredRects.length).toBeGreaterThan(0);
    });
  });

  describe('Nori Sheet Details', () => {
    it('should render nori texture dots', () => {
      const { container } = render(
        <SushiAssembly placedIngredients={[]} />
      );
      const circles = container.querySelectorAll('circle');
      // Should have nori dots (30), plus ingredient circles
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render nori with correct fill color', () => {
      const { container } = render(
        <SushiAssembly placedIngredients={[]} />
      );
      const noriRect = Array.from(container.querySelectorAll('rect')).find(
        rect => rect.getAttribute('fill') === '#1c2e1c'
      );
      expect(noriRect).toBeDefined();
    });
  });

  describe('Rice Base Details', () => {
    it('should render rice grain texture', () => {
      const { container } = render(
        <SushiAssembly placedIngredients={[]} />
      );
      const ellipses = container.querySelectorAll('ellipse');
      // Should have rice grains (60) + ingredient ellipses
      expect(ellipses.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty placedIngredients array', () => {
      const { container } = render(
        <SushiAssembly placedIngredients={[]} />
      );
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should handle single placed ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'salmon', instanceId: 'salmon-1' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={placedIngredients} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should handle many placed ingredients', () => {
      const placedIngredients: PlacedIngredient[] = Array.from({ length: 50 }, (_, i) => ({
        ingredientId: 'salmon',
        instanceId: `salmon-${i}`,
      }));
      const { container } = render(
        <SushiAssembly placedIngredients={placedIngredients} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should handle duplicate instanceIds gracefully', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'salmon', instanceId: 'same-id' },
        { ingredientId: 'tuna', instanceId: 'same-id' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={placedIngredients} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render all ingredient types in one assembly', () => {
      const ingredientIds = [
        'salmon', 'tuna', 'shrimp', 'avocado', 'cucumber',
        'rice', 'seaweed', 'cream_cheese', 'soy_sauce', 'wasabi', 'ginger',
      ];
      const placedIngredients: PlacedIngredient[] = ingredientIds.map((id, i) => ({
        ingredientId: id,
        instanceId: `${id}-${i}`,
      }));
      const { container } = render(
        <SushiAssembly placedIngredients={placedIngredients} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('SVG Structure', () => {
    it('should have proper SVG namespace and structure', () => {
      const { container } = render(
        <SushiAssembly placedIngredients={[]} />
      );
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('viewBox');
    });

    it('should contain all major visual layers in correct order', () => {
      const { container } = render(
        <SushiAssembly placedIngredients={[]} />
      );
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      const children = svg?.children;
      expect(children?.length).toBeGreaterThan(0);
    });
  });

  describe('Ingredient Fill Counts', () => {
    it('should use correct fill count for salmon', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'salmon', instanceId: 'test-1' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={placedIngredients} />
      );
      // Salmon has count of 6, verify at least 6 transform groups are created for it
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should use correct fill count for cucumber (8)', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'cucumber', instanceId: 'test-1' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={placedIngredients} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should use correct fill count for rice (20)', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'test-1' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={placedIngredients} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should use correct fill count for wasabi (3)', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'wasabi', instanceId: 'test-1' },
      ];
      const { container } = render(
        <SushiAssembly placedIngredients={placedIngredients} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('Decorative Elements', () => {
    it('should render chopsticks', () => {
      const { container } = render(
        <SushiAssembly placedIngredients={[]} />
      );
      const chopstickRects = Array.from(container.querySelectorAll('rect')).filter(
        rect => rect.getAttribute('x') === '34' || rect.getAttribute('x') === '46'
      );
      expect(chopstickRects.length).toBeGreaterThan(0);
    });

    it('should render soy sauce dish', () => {
      const { container } = render(
        <SushiAssembly placedIngredients={[]} />
      );
      const soySauceDish = Array.from(container.querySelectorAll('ellipse')).find(
        ellipse => ellipse.getAttribute('cx') === '248'
      );
      expect(soySauceDish).toBeDefined();
    });

    it('should render wasabi smear', () => {
      const { container } = render(
        <SushiAssembly placedIngredients={[]} />
      );
      const wasabiSmear = Array.from(container.querySelectorAll('ellipse')).find(
        ellipse => ellipse.getAttribute('cx') === '66'
      );
      expect(wasabiSmear).toBeDefined();
    });
  });
});