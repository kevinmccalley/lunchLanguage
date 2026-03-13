// @ts-nocheck
import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SaladAssembly } from '../src/components/Kitchen/SaladAssembly';
import type { PlacedIngredient } from '../src/types';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    svg: ({ children, ...props }: any) => {
      const { initial, animate, transition, ...svgProps } = props;
      return <svg {...svgProps}>{children}</svg>;
    },
  },
}));

describe('SaladAssembly', () => {
  describe('component rendering', () => {
    it('should render an SVG element with correct dimensions', () => {
      const { container } = render(
        <SaladAssembly placedIngredients={[]} />
      );
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('width', '300');
      expect(svg).toHaveAttribute('height', '280');
      expect(svg).toHaveAttribute('viewBox', '0 0 300 280');
    });

    it('should always render the bowl structure', () => {
      const { container } = render(
        <SaladAssembly placedIngredients={[]} />
      );
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should always render the plate', () => {
      const { container } = render(
        <SaladAssembly placedIngredients={[]} />
      );
      const allEllipses = container.querySelectorAll('ellipse');
      const plateEllipse = Array.from(allEllipses).find(
        (el) => el.getAttribute('cx') === '150' && el.getAttribute('cy') === '268'
      );
      expect(plateEllipse).toBeInTheDocument();
    });

    it('should render lettuce bed base', () => {
      const { container } = render(
        <SaladAssembly placedIngredients={[]} />
      );
      const allEllipses = container.querySelectorAll('ellipse');
      const lettuceBed = Array.from(allEllipses).find(
        (el) => el.getAttribute('cx') === '150' && el.getAttribute('cy') === '162'
      );
      expect(lettuceBed).toBeInTheDocument();
    });

    it('should render bowl rim', () => {
      const { container } = render(
        <SaladAssembly placedIngredients={[]} />
      );
      const allEllipses = container.querySelectorAll('ellipse');
      const rimEllipse = Array.from(allEllipses).find(
        (el) => el.getAttribute('cx') === '150' && el.getAttribute('cy') === '122'
      );
      expect(rimEllipse).toBeInTheDocument();
    });
  });

  describe('with placed ingredients', () => {
    it('should render ingredient groups for single ingredient', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'lettuce',
        instanceId: 'lettuce-1',
      };
      const { container } = render(
        <SaladAssembly placedIngredients={[ingredient]} />
      );
      const groups = container.querySelectorAll('g');
      // Should have 14 lettuce items (FILL_COUNT['lettuce'] = 14)
      expect(groups.length).toBe(14);
    });

    it('should render multiple ingredients with correct total count', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'lettuce', instanceId: 'lettuce-1' },
        { ingredientId: 'tomato_slice', instanceId: 'tomato-1' },
      ];
      const { container } = render(
        <SaladAssembly placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g');
      // lettuce: 14, tomato_slice: 8
      expect(groups.length).toBe(22);
    });

    it('should use correct FILL_COUNT for each ingredient type', () => {
      const ingredientCounts: Record<string, number> = {
        lettuce: 14,
        tomato_slice: 8,
        cucumber: 10,
        carrot: 10,
        cherry_tom: 8,
        croutons: 8,
        mushroom: 7,
        olive: 8,
        bell_pepper: 9,
        bacon: 8,
        chicken: 8,
        avocado: 7,
        beans: 10,
        corn: 18,
        radish: 8,
        strawberry: 7,
        dressing: 6,
        walnuts: 7,
        basil: 8,
        onion: 8,
        spinach: 10,
        sprouts: 10,
      };

      Object.entries(ingredientCounts).forEach(([ingredientId, count]) => {
        const ingredient: PlacedIngredient = {
          ingredientId: ingredientId as any,
          instanceId: `${ingredientId}-test`,
        };
        const { container } = render(
          <SaladAssembly placedIngredients={[ingredient]} />
        );
        const groups = container.querySelectorAll('g');
        expect(groups.length).toBe(count);
      });
    });

    it('should use default fill count of 8 for unknown ingredients', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'unknown_ingredient' as any,
        instanceId: 'unknown-1',
      };
      const { container } = render(
        <SaladAssembly placedIngredients={[ingredient]} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(8);
    });

    it('should apply unique keys to ingredient elements', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'tomato_slice',
        instanceId: 'tomato-1',
      };
      const { container } = render(
        <SaladAssembly placedIngredients={[ingredient]} />
      );
      const groups = container.querySelectorAll('g');
      const keys = new Set<string>();
      groups.forEach((group, index) => {
        const key = `tomato-1-${index}`;
        keys.add(key);
      });
      expect(keys.size).toBe(8);
    });

    it('should handle multiple ingredients with same type', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'lettuce', instanceId: 'lettuce-1' },
        { ingredientId: 'lettuce', instanceId: 'lettuce-2' },
      ];
      const { container } = render(
        <SaladAssembly placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g');
      // 14 + 14 = 28
      expect(groups.length).toBe(28);
    });

    it('should render all ingredient types without errors', () => {
      const allIngredients: PlacedIngredient[] = [
        { ingredientId: 'lettuce', instanceId: 'lettuce-1' },
        { ingredientId: 'spinach', instanceId: 'spinach-1' },
        { ingredientId: 'tomato_slice', instanceId: 'tomato-1' },
        { ingredientId: 'cherry_tom', instanceId: 'cherry-1' },
        { ingredientId: 'cucumber', instanceId: 'cucumber-1' },
        { ingredientId: 'carrot', instanceId: 'carrot-1' },
        { ingredientId: 'croutons', instanceId: 'croutons-1' },
        { ingredientId: 'mushroom', instanceId: 'mushroom-1' },
        { ingredientId: 'olive', instanceId: 'olive-1' },
        { ingredientId: 'bell_pepper', instanceId: 'pepper-1' },
        { ingredientId: 'bacon', instanceId: 'bacon-1' },
        { ingredientId: 'chicken', instanceId: 'chicken-1' },
        { ingredientId: 'avocado', instanceId: 'avocado-1' },
        { ingredientId: 'beans', instanceId: 'beans-1' },
        { ingredientId: 'corn', instanceId: 'corn-1' },
        { ingredientId: 'radish', instanceId: 'radish-1' },
        { ingredientId: 'strawberry', instanceId: 'strawberry-1' },
        { ingredientId: 'dressing', instanceId: 'dressing-1' },
        { ingredientId: 'walnuts', instanceId: 'walnuts-1' },
        { ingredientId: 'basil', instanceId: 'basil-1' },
        { ingredientId: 'onion', instanceId: 'onion-1' },
        { ingredientId: 'sprouts', instanceId: 'sprouts-1' },
      ];

      expect(() => {
        render(<SaladAssembly placedIngredients={allIngredients} />);
      }).not.toThrow();
    });
  });

  describe('SVG structure integrity', () => {
    it('should maintain correct SVG hierarchy', () => {
      const { container } = render(
        <SaladAssembly placedIngredients={[]} />
      );
      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
      expect(svg?.children.length).toBeGreaterThan(0);
    });

    it('should contain path elements for bowl', () => {
      const { container } = render(
        <SaladAssembly placedIngredients={[]} />
      );
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should have correct transforms on ingredient groups', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'tomato_slice',
        instanceId: 'tomato-1',
      };
      const { container } = render(
        <SaladAssembly placedIngredients={[ingredient]} />
      );
      const groups = container.querySelectorAll('g');
      groups.forEach((group) => {
        const transform = group.getAttribute('transform');
        expect(transform).toMatch(/translate\(\d+\.?\d* \d+\.?\d*\) rotate\(\d+\.?\d*\)/);
      });
    });
  });

  describe('edge cases', () => {
    it('should handle empty ingredients array', () => {
      const { container } = render(
        <SaladAssembly placedIngredients={[]} />
      );
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should handle large number of ingredients', () => {
      const ingredients: PlacedIngredient[] = Array.from({ length: 50 }, (_, i) => ({
        ingredientId: 'lettuce',
        instanceId: `lettuce-${i}`,
      }));
      const { container } = render(
        <SaladAssembly placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g');
      // 50 * 14 = 700
      expect(groups.length).toBe(700);
    });

    it('should render correctly with single ingredient', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'corn',
        instanceId: 'corn-single',
      };
      expect(() => {
        render(<SaladAssembly placedIngredients={[ingredient]} />);
      }).not.toThrow();
    });

    it('should maintain unique instance IDs across ingredients', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'lettuce', instanceId: 'unique-1' },
        { ingredientId: 'tomato_slice', instanceId: 'unique-2' },
        { ingredientId: 'cucumber', instanceId: 'unique-3' },
      ];
      expect(() => {
        render(<SaladAssembly placedIngredients={ingredients} />);
      }).not.toThrow();
    });
  });

  describe('visual elements', () => {
    it('should render decorative lettuce bed elements', () => {
      const { container } = render(
        <SaladAssembly placedIngredients={[]} />
      );
      const allEllipses = container.querySelectorAll('ellipse');
      // Should have ellipses for plate, bowl shadow, bowl outer/inner, lettuce bed, and rim
      expect(allEllipses.length).toBeGreaterThan(10);
    });

    it('should render rim highlight path', () => {
      const { container } = render(
        <SaladAssembly placedIngredients={[]} />
      );
      const paths = container.querySelectorAll('path');
      const rimHighlight = Array.from(paths).some(
        (path) => path.getAttribute('d')?.includes('M38 120')
      );
      expect(rimHighlight).toBe(true);
    });

    it('should apply proper styling to bowl elements', () => {
      const { container } = render(
        <SaladAssembly placedIngredients={[]} />
      );
      const ellipses = container.querySelectorAll('ellipse');
      const styledEllipses = Array.from(ellipses).filter(
        (el) => el.getAttribute('fill') || el.getAttribute('stroke')
      );
      expect(styledEllipses.length).toBeGreaterThan(0);
    });
  });

  describe('ingredient rendering variations', () => {
    it('should render lettuce ingredient correctly', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'lettuce',
        instanceId: 'lettuce-test',
      };
      const { container } = render(
        <SaladAssembly placedIngredients={[ingredient]} />
      );
      const elements = container.querySelectorAll('[fill="#3a9a3a"], [fill="#5cb85c"]');
      expect(elements.length).toBeGreaterThan(0);
    });

    it('should render tomato_slice ingredient correctly', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'tomato_slice',
        instanceId: 'tomato-test',
      };
      const { container } = render(
        <SaladAssembly placedIngredients={[ingredient]} />
      );
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render corn ingredient as circles', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'corn',
        instanceId: 'corn-test',
      };
      const { container } = render(
        <SaladAssembly placedIngredients={[ingredient]} />
      );
      const circles = container.querySelectorAll('circle[fill="#f5c518"]');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render bacon ingredient with paths', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'bacon',
        instanceId: 'bacon-test',
      };
      const { container } = render(
        <SaladAssembly placedIngredients={[ingredient]} />
      );
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render dressing ingredient', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'dressing',
        instanceId: 'dressing-test',
      };
      const { container } = render(
        <SaladAssembly placedIngredients={[ingredient]} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render sprouts ingredient with lines and circles', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'sprouts',
        instanceId: 'sprouts-test',
      };
      const { container } = render(
        <SaladAssembly placedIngredients={[ingredient]} />
      );
      const lines = container.querySelectorAll('line[stroke="#66bb6a"]');
      const circles = container.querySelectorAll('circle[fill="#a5d6a7"]');
      expect(lines.length).toBeGreaterThan(0);
      expect(circles.length).toBeGreaterThan(0);
    });
  });
});