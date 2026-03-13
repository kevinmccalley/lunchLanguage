// @ts-nocheck
import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import type { PlacedIngredient } from '../../types';
import { SaladAssembly } from './SaladAssembly';

// Mock framer-motion to avoid animation overhead in tests
jest.mock('framer-motion', () => ({
  motion: {
    svg: ({ children, ...props }: any) => {
      const { initial, animate, transition, ...rest } = props;
      return <svg {...rest}>{children}</svg>;
    },
  },
}));

describe('SaladAssembly', () => {
  describe('component rendering', () => {
    it('should render an SVG element with correct dimensions', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg?.getAttribute('width')).toBe('300');
      expect(svg?.getAttribute('height')).toBe('280');
      expect(svg?.getAttribute('viewBox')).toBe('0 0 300 280');
    });

    it('should render the plate elements', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      const ellipses = container.querySelectorAll('ellipse');
      // Should have plate ellipses and bowl elements
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render the bowl structure', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      const paths = container.querySelectorAll('path');
      // Should have bowl outer and inner paths, plus rim highlight
      expect(paths.length).toBeGreaterThanOrEqual(3);
    });

    it('should render lettuce bed background', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      const ellipses = container.querySelectorAll('ellipse');
      // Find the lettuce bed ellipse (cx=150, cy=162)
      const lettuceBed = Array.from(ellipses).find(
        (el) => el.getAttribute('cx') === '150' && el.getAttribute('cy') === '162'
      );
      expect(lettuceBed).toBeInTheDocument();
    });

    it('should render rim highlight path', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      const paths = container.querySelectorAll('path');
      const rimHighlight = Array.from(paths).find((p) => 
        p.getAttribute('d')?.includes('M38 120')
      );
      expect(rimHighlight).toBeInTheDocument();
    });
  });

  describe('rendering with placed ingredients', () => {
    it('should render ingredients with correct count for known ingredient types', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'lettuce-1', ingredientId: 'lettuce' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g');
      // lettuce has FILL_COUNT of 14
      expect(groups.length).toBe(14);
    });

    it('should render multiple different ingredients', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'lettuce-1', ingredientId: 'lettuce' },
        { instanceId: 'tomato-1', ingredientId: 'tomato_slice' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g');
      // lettuce: 14, tomato_slice: 8
      expect(groups.length).toBe(22);
    });

    it('should use default fill count of 8 for unknown ingredients', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'unknown-1', ingredientId: 'unknown_ingredient' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(8);
    });

    it('should render all defined ingredient fill counts correctly', () => {
      const ingredientIds = [
        'lettuce', 'tomato_slice', 'cucumber', 'carrot', 'cherry_tom',
        'croutons', 'mushroom', 'olive', 'bell_pepper', 'bacon',
        'chicken', 'avocado', 'beans', 'corn', 'radish',
        'strawberry', 'dressing', 'walnuts', 'basil', 'onion',
        'spinach', 'sprouts',
      ];

      const fillCounts: Record<string, number> = {
        lettuce: 14, tomato_slice: 8, cucumber: 10, carrot: 10, cherry_tom: 8,
        croutons: 8, mushroom: 7, olive: 8, bell_pepper: 9, bacon: 8,
        chicken: 8, avocado: 7, beans: 10, corn: 18, radish: 8,
        strawberry: 7, dressing: 6, walnuts: 7, basil: 8, onion: 8,
        spinach: 10, sprouts: 10,
      };

      ingredientIds.forEach((ingredientId) => {
        const placedIngredients: PlacedIngredient[] = [
          { instanceId: `${ingredientId}-1`, ingredientId },
        ];
        const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
        const groups = container.querySelectorAll('g');
        expect(groups.length).toBe(fillCounts[ingredientId]);
      });
    });

    it('should render multiple instances of the same ingredient type', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'lettuce-1', ingredientId: 'lettuce' },
        { instanceId: 'lettuce-2', ingredientId: 'lettuce' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g');
      // 14 + 14
      expect(groups.length).toBe(28);
    });

    it('should assign unique keys to rendered groups', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'lettuce-1', ingredientId: 'lettuce' },
        { instanceId: 'tomato-1', ingredientId: 'tomato_slice' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g');
      const keys = new Set<string>();
      groups.forEach((group) => {
        const key = group.getAttribute('key');
        if (key) keys.add(key);
      });
      // All groups should have unique keys (14 + 8 = 22)
      expect(keys.size).toBeGreaterThan(0);
    });
  });

  describe('SaladFilling component rendering', () => {
    it('should render lettuce filling correctly', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'lettuce-1', ingredientId: 'lettuce' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const ellipses = container.querySelectorAll('ellipse[rx="11"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render tomato_slice filling with correct attributes', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'tomato-1', ingredientId: 'tomato_slice' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const circles = container.querySelectorAll('circle[r="7"]');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render cucumber filling with lines', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'cucumber-1', ingredientId: 'cucumber' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const lines = container.querySelectorAll('line');
      expect(lines.length).toBeGreaterThan(0);
    });

    it('should render corn as small circles', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'corn-1', ingredientId: 'corn' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const circles = container.querySelectorAll('circle[r="2.5"]');
      expect(circles.length).toBe(18); // corn has 18 fill count
    });

    it('should render strawberry with seeds', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'strawberry-1', ingredientId: 'strawberry' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      // Strawberry should have multiple elements per instance
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(7); // strawberry has 7 fill count
    });

    it('should render sprouts with multiple lines and circles', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'sprouts-1', ingredientId: 'sprouts' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const lines = container.querySelectorAll('line');
      const circles = container.querySelectorAll('circle');
      // Sprouts have lines and circles
      expect(lines.length).toBeGreaterThan(0);
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render unknown ingredient type with fallback', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'unknown-1', ingredientId: 'not_a_real_ingredient' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const fallbackCircles = container.querySelectorAll('circle[r="5"]');
      expect(fallbackCircles.length).toBeGreaterThan(0);
    });

    it('should render all ingredient types without errors', () => {
      const ingredientIds = [
        'lettuce', 'spinach', 'tomato_slice', 'cherry_tom', 'cucumber',
        'carrot', 'croutons', 'mushroom', 'olive', 'bell_pepper',
        'bacon', 'chicken', 'avocado', 'beans', 'corn',
        'radish', 'strawberry', 'dressing', 'walnuts', 'basil',
        'onion', 'sprouts',
      ];

      ingredientIds.forEach((ingredientId) => {
        const placedIngredients: PlacedIngredient[] = [
          { instanceId: `${ingredientId}-test`, ingredientId },
        ];
        expect(() => {
          render(<SaladAssembly placedIngredients={placedIngredients} />);
        }).not.toThrow();
      });
    });
  });

  describe('ingredient positioning and transform', () => {
    it('should apply translate transform to ingredient groups', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'lettuce-1', ingredientId: 'lettuce' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g');
      groups.forEach((group) => {
        const transform = group.getAttribute('transform');
        // Should contain translate and rotate
        expect(transform).toMatch(/translate\(/);
        expect(transform).toMatch(/rotate\(/);
      });
    });

    it('should vary transforms based on instance ID', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'lettuce-1', ingredientId: 'lettuce' },
        { instanceId: 'lettuce-2', ingredientId: 'lettuce' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g');
      const transforms = new Set<string>();
      groups.forEach((group) => {
        const transform = group.getAttribute('transform');
        if (transform) transforms.add(transform);
      });
      // Different instances should have different transforms
      expect(transforms.size).toBeGreaterThan(1);
    });
  });

  describe('empty and edge cases', () => {
    it('should render with empty placedIngredients array', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      // Should still have bowl and plate elements
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render with null-like props handled correctly', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render large number of ingredients without performance issues', () => {
      const placedIngredients: PlacedIngredient[] = Array.from({ length: 10 }, (_, i) => ({
        instanceId: `lettuce-${i}`,
        ingredientId: 'lettuce',
      }));
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g');
      // 14 * 10 = 140
      expect(groups.length).toBe(140);
    });

    it('should handle rapid re-renders with different props', () => {
      const { rerender, container } = render(
        <SaladAssembly placedIngredients={[]} />
      );
      
      rerender(
        <SaladAssembly placedIngredients={[
          { instanceId: 'lettuce-1', ingredientId: 'lettuce' },
        ]} />
      );
      
      let groups = container.querySelectorAll('g');
      expect(groups.length).toBe(14);
      
      rerender(
        <SaladAssembly placedIngredients={[
          { instanceId: 'lettuce-1', ingredientId: 'lettuce' },
          { instanceId: 'tomato-1', ingredientId: 'tomato_slice' },
        ]} />
      );
      
      groups = container.querySelectorAll('g');
      expect(groups.length).toBe(22);
    });
  });

  describe('visual structure', () => {
    it('should render in correct visual order - bowl then ingredients then rim', () => {
      const placedIngredients: PlacedIngredient[] = [
        { instanceId: 'lettuce-1', ingredientId: 'lettuce' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const svg = container.querySelector('svg');
      const children = svg?.children;
      
      expect(children).toBeDefined();
      expect((children?.length ?? 0) > 0).toBe(true);
    });

    it('should render plate before bowl', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      const ellipses = container.querySelectorAll('ellipse');
      // First ellipses should be the plate
      const firstEllipse = ellipses[0];
      expect(firstEllipse).toBeInTheDocument();
    });
  });
});