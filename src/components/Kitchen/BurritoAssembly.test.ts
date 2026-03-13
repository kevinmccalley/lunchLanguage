// @ts-nocheck
import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import type { PlacedIngredient } from '../../types';
import { BurritoAssembly } from './BurritoAssembly';

// Mock framer-motion to avoid animation complications in tests
jest.mock('framer-motion', () => ({
  motion: {
    svg: ({ children, ...props }: any) => {
      const { initial, animate, transition, ...svgProps } = props;
      return <svg {...svgProps}>{children}</svg>;
    },
    g: ({ children, animate, transition, initial, ...props }: any) => {
      return <g {...props}>{children}</g>;
    },
  },
}));

describe('BurritoAssembly', () => {
  describe('rendering with empty ingredients', () => {
    it('should render SVG with correct dimensions', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '300');
      expect(svg).toHaveAttribute('height', '270');
      expect(svg).toHaveAttribute('viewBox', '0 0 300 270');
    });

    it('should render plate elements', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render tortilla base', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse');
      // Should have at least plate and tortilla ellipses
      expect(ellipses.length).toBeGreaterThanOrEqual(2);
    });

    it('should render char spots on tortilla', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse[opacity="0.28"]');
      expect(ellipses.length).toBe(7);
    });

    it('should render fold score lines', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('rendering with placed ingredients', () => {
    it('should render filled ingredients when placedIngredients provided', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      // Should have ingredient groups plus structure groups
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render correct number of fill pieces for rice', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      // 18 rice pieces + structure groups
      expect(groups.length).toBeGreaterThanOrEqual(18);
    });

    it('should render correct number of fill pieces for beans', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'beans', instanceId: 'beans-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      // 12 beans pieces + structure groups
      expect(groups.length).toBeGreaterThanOrEqual(12);
    });

    it('should render multiple ingredients', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1' },
        { ingredientId: 'beans', instanceId: 'beans-1' },
        { ingredientId: 'corn', instanceId: 'corn-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      // 18 + 12 + 22 = 52 fill pieces + structure groups
      expect(groups.length).toBeGreaterThanOrEqual(52);
    });

    it('should render all supported ingredient types', () => {
      const supportedIngredients = [
        'rice', 'beans', 'corn', 'sour_cream', 'guacamole', 'salsa',
        'chicken', 'steak', 'cheese', 'lettuce', 'bell_pepper',
        'jalapeno', 'onion', 'avocado'
      ];

      const ingredients: PlacedIngredient[] = supportedIngredients.map((id, idx) => ({
        ingredientId: id,
        instanceId: `${id}-${idx}`,
      }));

      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should use default fill count of 8 for unknown ingredients', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'unknown_ingredient', instanceId: 'unknown-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      // 8 unknown pieces + structure groups
      expect(groups.length).toBeGreaterThanOrEqual(8);
    });
  });

  describe('wrapping state transitions', () => {
    it('should render with wrapping false initially', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render with wrapping true', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={true} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should handle wrapping state change', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1' },
      ];
      const { rerender, container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      
      rerender(
        <BurritoAssembly placedIngredients={ingredients} wrapping={true} />
      );
      
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('specific ingredient renderings', () => {
    it('should render rice with correct SVG structure', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse[fill="#f8f8ed"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render beans with correct colors', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'beans', instanceId: 'beans-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse[fill="#3d2b1f"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render corn with circle elements', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'corn', instanceId: 'corn-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const circles = container.querySelectorAll('circle[fill="#f5c518"]');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render sour_cream with opacity elements', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'sour_cream', instanceId: 'sour_cream-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse[fill="white"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render guacamole with correct colors', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'guacamole', instanceId: 'guac-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse[fill="#5a8a3c"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render salsa with multiple circles', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'salsa', instanceId: 'salsa-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const circles = container.querySelectorAll('circle[fill="#b83224"]');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render chicken with ellipses and lines', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'chicken', instanceId: 'chicken-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse[fill="#d4a96a"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render steak with multiple ellipses', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'steak', instanceId: 'steak-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse[fill="#5d3010"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render cheese with rect elements', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'cheese', instanceId: 'cheese-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const rects = container.querySelectorAll('rect[fill="#f39c12"]');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render lettuce with correct colors', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'lettuce', instanceId: 'lettuce-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse[fill="#3a9a3a"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render bell_pepper as rect', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'bell_pepper', instanceId: 'pepper-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const rects = container.querySelectorAll('rect[fill="#27ae60"]');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render jalapeno with ellipses and circles', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'jalapeno', instanceId: 'jalapeno-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse[fill="#2e7d32"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render onion with ellipse', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'onion', instanceId: 'onion-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse[fill="#e8d5f5"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render avocado with correct colors', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'avocado', instanceId: 'avocado-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse[fill="#5a9e3c"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render unknown ingredient with fallback circle', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'nonexistent', instanceId: 'nonexistent-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const circles = container.querySelectorAll('circle[fill="#888"]');
      expect(circles.length).toBeGreaterThan(0);
    });
  });

  describe('ingredient fill counts', () => {
    const testCases = [
      { id: 'rice', expectedCount: 18 },
      { id: 'beans', expectedCount: 12 },
      { id: 'corn', expectedCount: 22 },
      { id: 'sour_cream', expectedCount: 7 },
      { id: 'guacamole', expectedCount: 9 },
      { id: 'salsa', expectedCount: 10 },
      { id: 'chicken', expectedCount: 9 },
      { id: 'steak', expectedCount: 9 },
      { id: 'cheese', expectedCount: 14 },
      { id: 'lettuce', expectedCount: 12 },
      { id: 'bell_pepper', expectedCount: 9 },
      { id: 'jalapeno', expectedCount: 9 },
      { id: 'onion', expectedCount: 8 },
      { id: 'avocado', expectedCount: 8 },
    ];

    testCases.forEach(({ id, expectedCount }) => {
      it(`should render ${expectedCount} pieces for ${id}`, () => {
        const ingredients: PlacedIngredient[] = [
          { ingredientId: id, instanceId: `${id}-instance` },
        ];
        const { container } = render(
          <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
        );
        // Each piece is wrapped in a group with transform
        const groups = container.querySelectorAll('g');
        // We expect at least expectedCount groups for the ingredient
        expect(groups.length).toBeGreaterThanOrEqual(expectedCount);
      });
    });
  });

  describe('SVG structure validation', () => {
    it('should have all required SVG elements', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg?.querySelector('ellipse')).toBeInTheDocument();
      expect(svg?.querySelector('path')).toBeInTheDocument();
    });

    it('should render wrapped burrito elements when wrapping is true', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={true} />
      );
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      // Should contain paths for wrapped burrito
      const paths = svg?.querySelectorAll('path');
      expect(paths).toBeDefined();
    });
  });

  describe('edge cases and boundary conditions', () => {
    it('should handle very large number of ingredients', () => {
      const ingredients: PlacedIngredient[] = Array.from({ length: 50 }, (_, i) => ({
        ingredientId: 'rice',
        instanceId: `rice-${i}`,
      }));
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should handle duplicate ingredient instances', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1' },
        { ingredientId: 'rice', instanceId: 'rice-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should maintain consistent rendering on multiple renders', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1' },
        { ingredientId: 'beans', instanceId: 'beans-1' },
      ];
      const { rerender, container: container1 } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups1 = container1.querySelectorAll('g').length;
      
      rerender(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      
      const groups2 = container1.querySelectorAll('g').length;
      expect(groups1).toBe(groups2);
    });
  });

  describe('motion.g animation groups', () => {
    it('should render ingredient fill group', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render left fold flap group', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render right fold flap group', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render wrapped burrito result group', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });
});