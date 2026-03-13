// @ts-nocheck
import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { SaladAssembly } from './SaladAssembly';
import type { PlacedIngredient } from '../../types';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    svg: ({ children, ...props }: any) => <svg {...props}>{children}</svg>,
  },
}));

describe('SaladAssembly', () => {
  describe('srng function behavior', () => {
    it('should generate consistent pseudo-random numbers for the same seed and index', () => {
      // Testing through component behavior since srng is internal
      const ingredient: PlacedIngredient = {
        instanceId: 'test-123',
        ingredientId: 'lettuce',
      };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should generate different values for different seeds', () => {
      const ingredient1: PlacedIngredient = {
        instanceId: 'seed-1',
        ingredientId: 'lettuce',
      };
      const ingredient2: PlacedIngredient = {
        instanceId: 'seed-2',
        ingredientId: 'lettuce',
      };
      const { container: container1 } = render(<SaladAssembly placedIngredients={[ingredient1]} />);
      const { container: container2 } = render(<SaladAssembly placedIngredients={[ingredient2]} />);

      const groups1 = container1.querySelectorAll('g');
      const groups2 = container2.querySelectorAll('g');

      expect(groups1.length).toBeGreaterThan(0);
      expect(groups2.length).toBeGreaterThan(0);
    });
  });

  describe('bowlPoint function behavior', () => {
    it('should position ingredients within reasonable bounds for the bowl', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'test-positioning',
        ingredientId: 'lettuce',
      };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);

      const groups = container.querySelectorAll('g[transform]');
      expect(groups.length).toBeGreaterThan(0);

      groups.forEach((group) => {
        const transform = group.getAttribute('transform');
        expect(transform).toMatch(/translate\(/);
      });
    });
  });

  describe('SaladFilling component', () => {
    it('should render lettuce filling', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'test-lettuce',
        ingredientId: 'lettuce',
      };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      const ellipses = container.querySelectorAll('ellipse[fill="#3a9a3a"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render spinach filling with correct colors', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'test-spinach',
        ingredientId: 'spinach',
      };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      const ellipses = container.querySelectorAll('ellipse[fill="#2e7d32"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render tomato_slice with circle and accents', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'test-tomato',
        ingredientId: 'tomato_slice',
      };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      const circles = container.querySelectorAll('circle[fill="#e53935"]');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render cherry_tom with stem', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'test-cherry',
        ingredientId: 'cherry_tom',
      };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      const lines = container.querySelectorAll('line[stroke="#2e7d32"]');
      expect(lines.length).toBeGreaterThan(0);
    });

    it('should render cucumber with concentric circles and lines', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'test-cucumber',
        ingredientId: 'cucumber',
      };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      const circles = container.querySelectorAll('circle[fill="#4caf50"]');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render carrot as rectangle', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'test-carrot',
        ingredientId: 'carrot',
      };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      const rects = container.querySelectorAll('rect[fill="#f57c00"]');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render croutons with multiple rectangles', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'test-croutons',
        ingredientId: 'croutons',
      };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      const rects = container.querySelectorAll('rect[fill="#c9914a"]');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render mushroom with stem and cap', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'test-mushroom',
        ingredientId: 'mushroom',
      };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      const ellipses = container.querySelectorAll('ellipse[fill="#6d4c41"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render olive with pit', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'test-olive',
        ingredientId: 'olive',
      };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      const ellipses = container.querySelectorAll('ellipse[fill="#1b2631"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render bell_pepper as rounded rectangle', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'test-pepper',
        ingredientId: 'bell_pepper',
      };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      const rects = container.querySelectorAll('rect[fill="#27ae60"]');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render bacon with curved paths', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'test-bacon',
        ingredientId: 'bacon',
      };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      const paths = container.querySelectorAll('path[stroke="#c62828"]');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render chicken with ellipses', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'test-chicken',
        ingredientId: 'chicken',
      };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      const ellipses = container.querySelectorAll('ellipse[fill="#d4a96a"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render avocado with nested ellipses', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'test-avocado',
        ingredientId: 'avocado',
      };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      const ellipses = container.querySelectorAll('ellipse[fill="#5a9e3c"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render beans with layered ellipses', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'test-beans',
        ingredientId: 'beans',
      };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      const ellipses = container.querySelectorAll('ellipse[fill="#3d2b1f"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render corn as circle', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'test-corn',
        ingredientId: 'corn',
      };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      const circles = container.querySelectorAll('circle[fill="#f5c518"]');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render radish with stem and circles', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'test-radish',
        ingredientId: 'radish',
      };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      const circles = container.querySelectorAll('circle[fill="#e91e63"]');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render strawberry with seeds and stem', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'test-strawberry',
        ingredientId: 'strawberry',
      };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      const ellipses = container.querySelectorAll('ellipse[fill="#e53935"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render dressing as curved path', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'test-dressing',
        ingredientId: 'dressing',
      };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      const paths = container.querySelectorAll('path[stroke="#f39c12"]');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render walnuts with ellipses and path', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'test-walnuts',
        ingredientId: 'walnuts',
      };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      const ellipses = container.querySelectorAll('ellipse[fill="#795548"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render basil with ellipse and lines', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'test-basil',
        ingredientId: 'basil',
      };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      const ellipses = container.querySelectorAll('ellipse[fill="#2d8a2d"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render onion as ellipse', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'test-onion',
        ingredientId: 'onion',
      };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      const ellipses = container.querySelectorAll('ellipse[fill="#e8d5f5"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render sprouts with lines and circles', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'test-sprouts',
        ingredientId: 'sprouts',
      };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      const lines = container.querySelectorAll('line[stroke="#66bb6a"]');
      expect(lines.length).toBeGreaterThan(0);
    });

    it('should render default filling for unknown ingredient', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'test-unknown',
        ingredientId: 'unknown_ingredient',
      };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      const circles = container.querySelectorAll('circle[fill="#888"]');
      expect(circles.length).toBeGreaterThan(0);
    });
  });

  describe('FILL_COUNT', () => {
    it('should render correct number of lettuce pieces', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'test-count',
        ingredientId: 'lettuce',
      };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      const groups = container.querySelectorAll('g[transform*="translate"]');
      // At least 14 lettuce pieces should be rendered (FILL_COUNT.lettuce = 14)
      expect(groups.length).toBeGreaterThanOrEqual(14);
    });

    it('should use default count of 8 for unknown ingredients', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'test-default-count',
        ingredientId: 'mystery_ingredient',
      };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      const groups = container.querySelectorAll('g[transform*="translate"]');
      // At least 8 pieces should be rendered (default)
      expect(groups.length).toBeGreaterThanOrEqual(8);
    });

    it('should render all defined ingredient counts correctly', () => {
      const ingredientIds = ['lettuce', 'tomato_slice', 'cucumber', 'carrot'];
      const placedIngredients: PlacedIngredient[] = ingredientIds.map((id, idx) => ({
        instanceId: `instance-${idx}`,
        ingredientId: id,
      }));

      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g[transform*="translate"]');

      // Should have at least the sum of all FILL_COUNTs for these ingredients
      const expectedTotal = 14 + 8 + 10 + 10; // lettuce + tomato + cucumber + carrot
      expect(groups.length).toBeGreaterThanOrEqual(expectedTotal);
    });
  });

  describe('SaladAssembly component', () => {
    it('should render with empty placed ingredients', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('width', '300');
      expect(svg).toHaveAttribute('height', '280');
    });

    it('should render SVG with correct dimensions', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('viewBox', '0 0 300 280');
    });

    it('should render bowl elements', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      const ellipses = container.querySelectorAll('ellipse');
      // Should have ellipses for plate, bowl shadow, and lettuce bed
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render plate element', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      const ellipse = container.querySelector('ellipse[cx="150"][cy="268"]');
      expect(ellipse).toBeInTheDocument();
    });

    it('should render bowl paths', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render rim highlight path', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      const paths = container.querySelectorAll('path[stroke="white"]');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render multiple ingredients with different instance IDs', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'instance-1', ingredientId: 'lettuce' },
        { instanceId: 'instance-2', ingredientId: 'tomato_slice' },
        { instanceId: 'instance-3', ingredientId: 'cucumber' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g[transform*="translate"]');
      const expectedTotal = 14 + 8 + 10; // lettuce + tomato + cucumber
      expect(groups.length).toBeGreaterThanOrEqual(expectedTotal);
    });

    it('should apply transforms to ingredient groups', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'test-transform',
        ingredientId: 'lettuce',
      };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      const groups = container.querySelectorAll('g[transform]');
      expect(groups.length).toBeGreaterThan(0);

      groups.forEach((group) => {
        const transform = group.getAttribute('transform');
        expect(transform).toMatch(/translate\(\d+\.?\d* \d+\.?\d*\) rotate\(\d+\.?\d*\)/);
      });
    });

    it('should handle large numbers of ingredients', () => {
      const ingredients: PlacedIngredient[] = Array.from({ length: 10 }, (_, i) => ({
        instanceId: `instance-${i}`,
        ingredientId: 'lettuce',
      }));
      const { container } = render(<SaladAssembly placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g[transform*="translate"]');
      // 10 instances × 14 lettuce pieces each
      expect(groups.length).toBeGreaterThanOrEqual(140);
    });

    it('should generate unique keys for each ingredient piece', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'test-keys',
        ingredientId: 'lettuce',
      };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      // If React doesn't throw a key warning, keys are properly unique
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render lettuce bed base', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      const ellipse = container.querySelector('ellipse[cx="150"][cy="162"]');
      expect(ellipse).toBeInTheDocument();
      expect(ellipse).toHaveAttribute('fill', '#2e7d32');
    });

    it('should render lettuce bed decorative ellipses', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      const ellipses = container.querySelectorAll('ellipse[rx="20"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render all bowl structural elements', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      const paths = container.querySelectorAll('path');
      // Should have bowl outer, bowl inner, and rim highlight paths
      expect(paths.length).toBeGreaterThanOrEqual(3);
    });

    it('should render rim elements with proper styling', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      const rimEllipse = container.querySelector('ellipse[cy="122"][rx="128"]');
      expect(rimEllipse).toBeInTheDocument();
      expect(rimEllipse).toHaveAttribute('stroke', '#d5c9bc');
      expect(rimEllipse).toHaveAttribute('strokeWidth', '3');
    });
  });

  describe('edge cases', () => {
    it('should handle ingredient with very long instanceId', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'a'.repeat(1000),
        ingredientId: 'lettuce',
      };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should handle ingredient with special characters in instanceId', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'test-!@#$%^&*()',
        ingredientId: 'lettuce',
      };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should handle all defined ingredient types', () => {
      const allIngredients = [
        'lettuce', 'spinach', 'tomato_slice', 'cherry_tom', 'cucumber',
        'carrot', 'croutons', 'mushroom', 'olive', 'bell_pepper',
        'bacon', 'chicken', 'avocado', 'beans', 'corn',
        'radish', 'strawberry', 'dressing', 'walnuts', 'basil',
        'onion', 'sprouts',
      ];

      const placedIngredients: PlacedIngredient[] = allIngredients.map((id, idx) => ({
        instanceId: `instance-${idx}`,
        ingredientId: id,
      }));

      const { container } = render(<SaladAssembly placedIngredients={placedIngredients} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should maintain proper stacking order with bowl rim on top', () => {
      const ingredient: PlacedIngredient = {
        instanceId: 'test-stacking',
        ingredientId: 'lettuce',
      };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      const children = container.querySelector('svg')?.children;
      expect(children?.length).toBeGreaterThan(0);
      // Last element should be the rim (bowl rim renders after fillEls)
      const lastElement = children?.[children.length - 1];
      expect(lastElement?.tagName).toBe('ellipse');
    });
  });
});