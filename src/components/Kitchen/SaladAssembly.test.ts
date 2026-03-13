// @ts-nocheck
import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { SaladAssembly } from '../src/components/Kitchen/SaladAssembly';
import type { PlacedIngredient } from '../src/types';

// Mock framer-motion to simplify testing
jest.mock('framer-motion', () => ({
  motion: {
    svg: ({ children, ...props }: any) => {
      const { initial, animate, transition, ...svgProps } = props;
      return <svg {...svgProps}>{children}</svg>;
    },
  },
}));

describe('SaladAssembly', () => {
  describe('Component Rendering', () => {
    it('should render an SVG element with correct dimensions', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('width', '300');
      expect(svg).toHaveAttribute('height', '280');
      expect(svg).toHaveAttribute('viewBox', '0 0 300 280');
    });

    it('should render plate elements', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render bowl elements', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render lettuce bed base', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      const ellipses = container.querySelectorAll('ellipse[opacity="0.25"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render rim highlight path', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      const paths = container.querySelectorAll('path');
      const rimPath = Array.from(paths).find(p => p.getAttribute('d')?.includes('M38 120'));
      expect(rimPath).toBeTruthy();
    });
  });

  describe('PlacedIngredients Rendering', () => {
    it('should render no ingredient groups when placedIngredients is empty', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      const groups = container.querySelectorAll('g');
      // Only the lettuce bed groups should exist, not ingredient groups
      expect(groups.length).toBe(0);
    });

    it('should render ingredient groups for single placed ingredient with default count', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'lettuce', instanceId: 'lettuce-1' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(14); // lettuce has FILL_COUNT of 14
    });

    it('should render ingredient groups for multiple placed ingredients', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'lettuce', instanceId: 'lettuce-1' },
        { ingredientId: 'tomato_slice', instanceId: 'tomato-1' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(14 + 8); // 14 for lettuce + 8 for tomato_slice
    });

    it('should render correct count for each ingredient type', () => {
      const testCases = [
        { ingredientId: 'cucumber', expectedCount: 10 },
        { ingredientId: 'carrot', expectedCount: 10 },
        { ingredientId: 'cherry_tom', expectedCount: 8 },
        { ingredientId: 'corn', expectedCount: 18 },
        { ingredientId: 'dressing', expectedCount: 6 },
      ];

      testCases.forEach(({ ingredientId, expectedCount }) => {
        const placedIngredients: PlacedIngredient[] = [
          { ingredientId, instanceId: `${ingredientId}-1` },
        ];
        const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
        const groups = container.querySelectorAll('g');
        expect(groups.length).toBe(expectedCount);
      });
    });

    it('should use default count of 8 for unknown ingredients', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'unknown_ingredient', instanceId: 'unknown-1' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(8);
    });

    it('should create unique keys for each ingredient instance', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'lettuce', instanceId: 'lettuce-1' },
        { ingredientId: 'lettuce', instanceId: 'lettuce-2' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(28); // 14 * 2
    });
  });

  describe('SaladFilling Component', () => {
    it('should render lettuce filling', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'lettuce', instanceId: 'lettuce-1' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const ellipses = container.querySelectorAll('ellipse[rx="11"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render spinach filling', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'spinach', instanceId: 'spinach-1' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const spinachEllipses = container.querySelectorAll('ellipse[rx="9"]');
      expect(spinachEllipses.length).toBeGreaterThan(0);
    });

    it('should render tomato_slice filling', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'tomato_slice', instanceId: 'tomato-1' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const circles = container.querySelectorAll('circle[r="7"]');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render cherry_tom filling with stem', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'cherry_tom', instanceId: 'cherry-1' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const lines = container.querySelectorAll('line');
      expect(lines.length).toBeGreaterThan(0);
    });

    it('should render cucumber filling with stripes', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'cucumber', instanceId: 'cucumber-1' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render carrot filling', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'carrot', instanceId: 'carrot-1' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const rects = container.querySelectorAll('rect[fill="#f57c00"]');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render croutons filling with layering', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'croutons', instanceId: 'croutons-1' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render mushroom filling', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'mushroom', instanceId: 'mushroom-1' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render olive filling', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'olive', instanceId: 'olive-1' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render bell_pepper filling', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'bell_pepper', instanceId: 'pepper-1' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render bacon filling with curved path', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'bacon', instanceId: 'bacon-1' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render chicken filling', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'chicken', instanceId: 'chicken-1' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render avocado filling', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'avocado', instanceId: 'avocado-1' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render beans filling', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'beans', instanceId: 'beans-1' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render corn filling', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'corn', instanceId: 'corn-1' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render radish filling with stem', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'radish', instanceId: 'radish-1' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render strawberry filling with seeds and stem', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'strawberry', instanceId: 'strawberry-1' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const circles = container.querySelectorAll('circle');
      const lines = container.querySelectorAll('line');
      expect(circles.length).toBeGreaterThan(0);
      expect(lines.length).toBeGreaterThan(0);
    });

    it('should render dressing filling', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'dressing', instanceId: 'dressing-1' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render walnuts filling', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'walnuts', instanceId: 'walnuts-1' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render basil filling', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'basil', instanceId: 'basil-1' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const ellipses = container.querySelectorAll('ellipse');
      const lines = container.querySelectorAll('line');
      expect(ellipses.length).toBeGreaterThan(0);
      expect(lines.length).toBeGreaterThan(0);
    });

    it('should render onion filling', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'onion', instanceId: 'onion-1' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render sprouts filling with stems and leaves', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'sprouts', instanceId: 'sprouts-1' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const lines = container.querySelectorAll('line');
      const circles = container.querySelectorAll('circle');
      expect(lines.length).toBeGreaterThan(0);
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render default fallback for unknown ingredient id', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'unknown_item', instanceId: 'unknown-1' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });
  });

  describe('Transform and Positioning', () => {
    it('should apply transform attribute to ingredient groups', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'carrot', instanceId: 'carrot-1' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g');
      groups.forEach((group) => {
        const transform = group.getAttribute('transform');
        expect(transform).toMatch(/translate\([^)]+\)\s+rotate\([^)]+\)/);
      });
    });

    it('should have different positions for different instance ids', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'lettuce', instanceId: 'lettuce-1' },
        { ingredientId: 'lettuce', instanceId: 'lettuce-2' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const groups = Array.from(container.querySelectorAll('g'));
      const transforms = groups.map(g => g.getAttribute('transform'));

      // First 14 groups (lettuce-1) should have different transforms than next 14 (lettuce-2)
      const firstSetTransforms = transforms.slice(0, 14);
      const secondSetTransforms = transforms.slice(14, 28);

      expect(firstSetTransforms).not.toEqual(secondSetTransforms);
    });

    it('should apply rotation to each ingredient instance', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'corn', instanceId: 'corn-1' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const groups = Array.from(container.querySelectorAll('g'));
      const rotations = groups.map(g => {
        const transform = g.getAttribute('transform');
        const rotateMatch = transform?.match(/rotate\(([^)]+)\)/);
        return rotateMatch ? parseFloat(rotateMatch[1]) : null;
      });

      // Should have some variation in rotations
      const uniqueRotations = new Set(rotations);
      expect(uniqueRotations.size).toBeGreaterThan(1);
    });
  });

  describe('SVG Structure', () => {
    it('should have correct SVG namespace and attributes', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '300');
      expect(svg).toHaveAttribute('height', '280');
      expect(svg).toHaveAttribute('viewBox', '0 0 300 280');
    });

    it('should render plate ellipses with correct colors', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      const ellipses = Array.from(container.querySelectorAll('ellipse'));
      const plateEllipses = ellipses.filter(e => {
        const fill = e.getAttribute('fill');
        return fill === '#e8e0d8' || fill === '#f5ede3';
      });
      expect(plateEllipses.length).toBeGreaterThan(0);
    });

    it('should render bowl paths with correct fills', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      const paths = Array.from(container.querySelectorAll('path'));
      const bowlPaths = paths.filter(p => {
        const fill = p.getAttribute('fill');
        return fill === '#e0d5c8' || fill === '#f8f4f0';
      });
      expect(bowlPaths.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty placedIngredients array', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should handle large number of placed ingredients', () => {
      const placedIngredients: PlacedIngredient[] = [];
      for (let i = 0; i < 10; i++) {
        placedIngredients.push({
          ingredientId: 'lettuce',
          instanceId: `lettuce-${i}`,
        });
      }
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(140); // 10 * 14
    });

    it('should handle mixed ingredient types', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'lettuce', instanceId: 'lettuce-1' },
        { ingredientId: 'tomato_slice', instanceId: 'tomato-1' },
        { ingredientId: 'cucumber', instanceId: 'cucumber-1' },
        { ingredientId: 'croutons', instanceId: 'croutons-1' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(14 + 8 + 10 + 8); // sum of all ingredient counts
    });

    it('should maintain consistent rendering with same props', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'carrot', instanceId: 'carrot-1' },
      ];
      const { container: container1 } = render(
        <SaladAssembly placedIngredients={placedIngredients} />
      );
      const { container: container2 } = render(
        <SaladAssembly placedIngredients={placedIngredients} />
      );

      const groups1 = Array.from(container1.querySelectorAll('g')).map(g =>
        g.getAttribute('transform')
      );
      const groups2 = Array.from(container2.querySelectorAll('g')).map(g =>
        g.getAttribute('transform')
      );

      expect(groups1).toEqual(groups2);
    });

    it('should handle ingredient with zero fill count gracefully', () => {
      // This tests the scenario where an ingredient might be in placed ingredients
      // but not in FILL_COUNT (uses default of 8)
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'nonexistent_ingredient', instanceId: 'nonexistent-1' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(8); // default count
    });
  });

  describe('Ingredient Fill Counts', () => {
    const ingredientCounts = [
      ['lettuce', 14],
      ['tomato_slice', 8],
      ['cucumber', 10],
      ['carrot', 10],
      ['cherry_tom', 8],
      ['croutons', 8],
      ['mushroom', 7],
      ['olive', 8],
      ['bell_pepper', 9],
      ['bacon', 8],
      ['chicken', 8],
      ['avocado', 7],
      ['beans', 10],
      ['corn', 18],
      ['radish', 8],
      ['strawberry', 7],
      ['dressing', 6],
      ['walnuts', 7],
      ['basil', 8],
      ['onion', 8],
      ['spinach', 10],
      ['sprouts', 10],
    ];

    ingredientCounts.forEach(([ingredientId, expectedCount]) => {
      it(`should render ${expectedCount} instances of ${ingredientId}`, () => {
        const placedIngredients: PlacedIngredient[] = [
          { ingredientId: ingredientId as string, instanceId: `${ingredientId}-1` },
        ];
        const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
        const groups = container.querySelectorAll('g');
        expect(groups.length).toBe(expectedCount);
      });
    });
  });
});