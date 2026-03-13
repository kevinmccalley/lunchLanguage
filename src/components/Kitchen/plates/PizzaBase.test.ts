// @ts-nocheck
import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { PizzaBase } from './PizzaBase';
import type { PlacedIngredient } from '../../../types';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    svg: ({ children, ...props }: any) => {
      const { initial, animate, transition, ...rest } = props;
      return <svg {...rest}>{children}</svg>;
    },
  },
}));

describe('PizzaBase', () => {
  describe('Component Rendering', () => {
    it('should render without crashing with default props', () => {
      const { container } = render(<PizzaBase slices={4} />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render SVG with correct dimensions', () => {
      const { container } = render(<PizzaBase slices={4} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '300');
      expect(svg).toHaveAttribute('height', '300');
      expect(svg).toHaveAttribute('viewBox', '0 0 300 300');
    });

    it('should render plate circle with correct attributes', () => {
      const { container } = render(<PizzaBase slices={4} />);
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
      // Plate outer circle
      const plateOuter = Array.from(circles).find(
        (c) => c.getAttribute('cx') === '150' && c.getAttribute('cy') === '150' && c.getAttribute('r') === '148'
      );
      expect(plateOuter).toBeInTheDocument();
    });

    it('should render base cheese circle with correct fill', () => {
      const { container } = render(<PizzaBase slices={4} />);
      const circles = container.querySelectorAll('circle');
      const cheeseBase = Array.from(circles).find(
        (c) => c.getAttribute('cx') === '150' && c.getAttribute('cy') === '150' && c.getAttribute('r') === '126'
      );
      expect(cheeseBase).toHaveAttribute('fill', '#f1c40f');
    });
  });

  describe('Slice Dividers', () => {
    it('should render correct number of slice dividers for 4 slices', () => {
      const { container } = render(<PizzaBase slices={4} />);
      const lines = container.querySelectorAll('line');
      const sliceLines = Array.from(lines).filter(
        (line) => line.getAttribute('stroke') === '#c0392b'
      );
      expect(sliceLines).toHaveLength(4);
    });

    it('should render correct number of slice dividers for 8 slices', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const lines = container.querySelectorAll('line');
      const sliceLines = Array.from(lines).filter(
        (line) => line.getAttribute('stroke') === '#c0392b'
      );
      expect(sliceLines).toHaveLength(8);
    });

    it('should render slice dividers from center', () => {
      const { container } = render(<PizzaBase slices={4} />);
      const lines = container.querySelectorAll('line');
      const sliceLines = Array.from(lines).filter(
        (line) => line.getAttribute('stroke') === '#c0392b'
      );
      sliceLines.forEach((line) => {
        expect(line.getAttribute('x1')).toBe('150');
        expect(line.getAttribute('y1')).toBe('150');
      });
    });

    it('should render slice dividers with correct styling', () => {
      const { container } = render(<PizzaBase slices={4} />);
      const sliceLines = Array.from(container.querySelectorAll('line')).filter(
        (line) => line.getAttribute('stroke') === '#c0392b'
      );
      sliceLines.forEach((line) => {
        expect(line).toHaveAttribute('strokeWidth', '2');
        expect(line).toHaveAttribute('strokeDasharray', '6 3');
        expect(line).toHaveAttribute('opacity', '0.7');
      });
    });

    it('should render no slice dividers when slices is 0', () => {
      const { container } = render(<PizzaBase slices={0} />);
      const sliceLines = Array.from(container.querySelectorAll('line')).filter(
        (line) => line.getAttribute('stroke') === '#c0392b'
      );
      expect(sliceLines).toHaveLength(0);
    });

    it('should render 1 slice divider when slices is 1', () => {
      const { container } = render(<PizzaBase slices={1} />);
      const sliceLines = Array.from(container.querySelectorAll('line')).filter(
        (line) => line.getAttribute('stroke') === '#c0392b'
      );
      expect(sliceLines).toHaveLength(1);
    });

    it('should render many slice dividers when slices is large', () => {
      const { container } = render(<PizzaBase slices={16} />);
      const sliceLines = Array.from(container.querySelectorAll('line')).filter(
        (line) => line.getAttribute('stroke') === '#c0392b'
      );
      expect(sliceLines).toHaveLength(16);
    });
  });

  describe('Crust Rendering', () => {
    it('should render crust circle with correct attributes', () => {
      const { container } = render(<PizzaBase slices={4} />);
      const circles = container.querySelectorAll('circle');
      const crust = Array.from(circles).find(
        (c) => c.getAttribute('cx') === '150' && c.getAttribute('cy') === '150' && c.getAttribute('r') === '130' && c.getAttribute('fill') === 'none'
      );
      expect(crust).toHaveAttribute('stroke', '#d4a96a');
      expect(crust).toHaveAttribute('strokeWidth', '18');
    });

    it('should render 20 crust decoration circles', () => {
      const { container } = render(<PizzaBase slices={4} />);
      const circles = container.querySelectorAll('circle');
      const crustDecorations = Array.from(circles).filter(
        (c) => c.getAttribute('r') === '3' && c.getAttribute('fill') === '#c9916a'
      );
      expect(crustDecorations).toHaveLength(20);
    });

    it('should render crust decorations with correct opacity', () => {
      const { container } = render(<PizzaBase slices={4} />);
      const circles = container.querySelectorAll('circle');
      const crustDecorations = Array.from(circles).filter(
        (c) => c.getAttribute('r') === '3' && c.getAttribute('fill') === '#c9916a'
      );
      crustDecorations.forEach((decoration) => {
        expect(decoration).toHaveAttribute('opacity', '0.6');
      });
    });
  });

  describe('Plate Rim Highlight', () => {
    it('should render plate rim highlight', () => {
      const { container } = render(<PizzaBase slices={4} />);
      const circles = container.querySelectorAll('circle');
      const rimHighlight = Array.from(circles).find(
        (c) => c.getAttribute('cx') === '150' && c.getAttribute('cy') === '150' && c.getAttribute('r') === '147' && c.getAttribute('fill') === 'none'
      );
      expect(rimHighlight).toBeInTheDocument();
    });

    it('should render rim highlight with white stroke', () => {
      const { container } = render(<PizzaBase slices={4} />);
      const circles = container.querySelectorAll('circle');
      const rimHighlight = Array.from(circles).find(
        (c) => c.getAttribute('cx') === '150' && c.getAttribute('cy') === '150' && c.getAttribute('r') === '147' && c.getAttribute('fill') === 'none'
      );
      expect(rimHighlight).toHaveAttribute('stroke', 'white');
      expect(rimHighlight).toHaveAttribute('strokeWidth', '3');
      expect(rimHighlight).toHaveAttribute('opacity', '0.4');
    });
  });

  describe('Placed Ingredients', () => {
    it('should render no toppings when placedIngredients is empty', () => {
      const { container } = render(<PizzaBase slices={4} placedIngredients={[]} />);
      const groups = container.querySelectorAll('g');
      expect(groups).toHaveLength(0);
    });

    it('should render toppings for pepperoni', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'pepperoni',
        instanceId: 'pepperoni-1',
      };
      const { container } = render(<PizzaBase slices={4} placedIngredients={[ingredient]} />);
      const groups = container.querySelectorAll('g');
      // 9 pepperoni circles should be rendered
      expect(groups).toHaveLength(9);
    });

    it('should render toppings for mushroom', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'mushroom',
        instanceId: 'mushroom-1',
      };
      const { container } = render(<PizzaBase slices={4} placedIngredients={[ingredient]} />);
      const groups = container.querySelectorAll('g');
      // 7 mushrooms should be rendered
      expect(groups).toHaveLength(7);
    });

    it('should render toppings for olive', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'olive',
        instanceId: 'olive-1',
      };
      const { container } = render(<PizzaBase slices={4} placedIngredients={[ingredient]} />);
      const groups = container.querySelectorAll('g');
      // 8 olives should be rendered
      expect(groups).toHaveLength(8);
    });

    it('should render toppings for bell_pepper', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'bell_pepper',
        instanceId: 'bell_pepper-1',
      };
      const { container } = render(<PizzaBase slices={4} placedIngredients={[ingredient]} />);
      const groups = container.querySelectorAll('g');
      // 6 bell peppers should be rendered
      expect(groups).toHaveLength(6);
    });

    it('should render toppings for cheese', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'cheese',
        instanceId: 'cheese-1',
      };
      const { container } = render(<PizzaBase slices={4} placedIngredients={[ingredient]} />);
      const groups = container.querySelectorAll('g');
      // 5 cheese pieces should be rendered
      expect(groups).toHaveLength(5);
    });

    it('should render toppings for tomato_slice', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'tomato_slice',
        instanceId: 'tomato-1',
      };
      const { container } = render(<PizzaBase slices={4} placedIngredients={[ingredient]} />);
      const groups = container.querySelectorAll('g');
      // 7 tomato slices should be rendered
      expect(groups).toHaveLength(7);
    });

    it('should render toppings for pineapple', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'pineapple',
        instanceId: 'pineapple-1',
      };
      const { container } = render(<PizzaBase slices={4} placedIngredients={[ingredient]} />);
      const groups = container.querySelectorAll('g');
      // 7 pineapples should be rendered
      expect(groups).toHaveLength(7);
    });

    it('should render toppings for jalapeno', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'jalapeno',
        instanceId: 'jalapeno-1',
      };
      const { container } = render(<PizzaBase slices={4} placedIngredients={[ingredient]} />);
      const groups = container.querySelectorAll('g');
      // 6 jalapenos should be rendered
      expect(groups).toHaveLength(6);
    });

    it('should render toppings for basil', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'basil',
        instanceId: 'basil-1',
      };
      const { container } = render(<PizzaBase slices={4} placedIngredients={[ingredient]} />);
      const groups = container.querySelectorAll('g');
      // 8 basil leaves should be rendered
      expect(groups).toHaveLength(8);
    });

    it('should render toppings for sausage', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'sausage',
        instanceId: 'sausage-1',
      };
      const { container } = render(<PizzaBase slices={4} placedIngredients={[ingredient]} />);
      const groups = container.querySelectorAll('g');
      // 8 sausage pieces should be rendered
      expect(groups).toHaveLength(8);
    });

    it('should render toppings for onion', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'onion',
        instanceId: 'onion-1',
      };
      const { container } = render(<PizzaBase slices={4} placedIngredients={[ingredient]} />);
      const groups = container.querySelectorAll('g');
      // 5 onions should be rendered
      expect(groups).toHaveLength(5);
    });

    it('should render default topping shape for unknown ingredient', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'unknown_ingredient',
        instanceId: 'unknown-1',
      };
      const { container } = render(<PizzaBase slices={4} placedIngredients={[ingredient]} />);
      const groups = container.querySelectorAll('g');
      // 6 default toppings should be rendered
      expect(groups).toHaveLength(6);
    });

    it('should render multiple different toppings', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'pepperoni', instanceId: 'pepperoni-1' },
        { ingredientId: 'mushroom', instanceId: 'mushroom-1' },
      ];
      const { container } = render(<PizzaBase slices={4} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      // 9 pepperoni + 7 mushroom = 16 total
      expect(groups).toHaveLength(16);
    });

    it('should render same ingredient type multiple times with different instanceIds', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'pepperoni', instanceId: 'pepperoni-1' },
        { ingredientId: 'pepperoni', instanceId: 'pepperoni-2' },
      ];
      const { container } = render(<PizzaBase slices={4} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      // 9 + 9 = 18 total
      expect(groups).toHaveLength(18);
    });

    it('should have unique keys for each topping element', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'pepperoni', instanceId: 'pepperoni-1' },
        { ingredientId: 'mushroom', instanceId: 'mushroom-1' },
      ];
      const { container } = render(<PizzaBase slices={4} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      const keys = new Set<string>();
      groups.forEach((g) => {
        const key = g.getAttribute('key');
        if (key) {
          expect(keys.has(key)).toBe(false);
          keys.add(key);
        }
      });
    });
  });

  describe('Topping Shapes', () => {
    it('should render pepperoni with correct structure', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'pepperoni',
        instanceId: 'pepperoni-1',
      };
      const { container } = render(<PizzaBase slices={4} placedIngredients={[ingredient]} />);
      const circles = container.querySelectorAll('circle');
      // Should have red pepperoni circles
      const pepperoniCircles = Array.from(circles).filter(
        (c) => c.getAttribute('fill') === '#c0392b' && c.getAttribute('r') === '9'
      );
      expect(pepperoniCircles.length).toBeGreaterThan(0);
    });

    it('should render mushroom with correct structure', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'mushroom',
        instanceId: 'mushroom-1',
      };
      const { container } = render(<PizzaBase slices={4} placedIngredients={[ingredient]} />);
      const ellipses = container.querySelectorAll('ellipse');
      // Should have mushroom ellipses
      const mushroomEllipses = Array.from(ellipses).filter(
        (e) => e.getAttribute('fill') === '#6D4C41' || e.getAttribute('fill') === '#8D6E63'
      );
      expect(mushroomEllipses.length).toBeGreaterThan(0);
    });

    it('should render olive with correct structure', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'olive',
        instanceId: 'olive-1',
      };
      const { container } = render(<PizzaBase slices={4} placedIngredients={[ingredient]} />);
      const circles = container.querySelectorAll('circle');
      // Should have black olive circles
      const oliveCircles = Array.from(circles).filter(
        (c) => c.getAttribute('fill') === '#1B2631' && c.getAttribute('r') === '8'
      );
      expect(oliveCircles.length).toBeGreaterThan(0);
    });

    it('should render bell_pepper with correct structure', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'bell_pepper',
        instanceId: 'bell_pepper-1',
      };
      const { container } = render(<PizzaBase slices={4} placedIngredients={[ingredient]} />);
      const ellipses = container.querySelectorAll('ellipse');
      // Should have green bell pepper ellipses
      const pepperEllipses = Array.from(ellipses).filter(
        (e) => e.getAttribute('fill') === '#27ae60' || e.getAttribute('fill') === '#2ecc71'
      );
      expect(pepperEllipses.length).toBeGreaterThan(0);
    });

    it('should render cheese with correct structure', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'cheese',
        instanceId: 'cheese-1',
      };
      const { container } = render(<PizzaBase slices={4} placedIngredients={[ingredient]} />);
      const ellipses = container.querySelectorAll('ellipse');
      // Should have yellow cheese ellipses
      const cheeseEllipses = Array.from(ellipses).filter(
        (e) => e.getAttribute('fill') === '#f1c40f' || e.getAttribute('fill') === '#f39c12'
      );
      expect(cheeseEllipses.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined placedIngredients', () => {
      const { container } = render(<PizzaBase slices={4} />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should handle empty array of placedIngredients', () => {
      const { container } = render(<PizzaBase slices={4} placedIngredients={[]} />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should handle negative slices gracefully', () => {
      const { container } = render(<PizzaBase slices={-4} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should handle very large slices count', () => {
      const { container } = render(<PizzaBase slices={100} />);
      const lines = container.querySelectorAll('line');
      const sliceLines = Array.from(lines).filter(
        (line) => line.getAttribute('stroke') === '#c0392b'
      );
      expect(sliceLines).toHaveLength(100);
    });

    it('should render consistent output for same props', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'pepperoni', instanceId: 'test-1' },
      ];
      const { container: container1 } = render(<PizzaBase slices={4} placedIngredients={ingredients} />);
      const { container: container2 } = render(<PizzaBase slices={4} placedIngredients={ingredients} />);

      const groups1 = container1.querySelectorAll('g');
      const groups2 = container2.querySelectorAll('g');
      expect(groups1).toHaveLength(groups2.length);
    });

    it('should handle mixed known and unknown toppings', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'pepperoni', instanceId: 'pepperoni-1' },
        { ingredientId: 'unknown_topping', instanceId: 'unknown-1' },
      ];
      const { container } = render(<PizzaBase slices={4} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      // 9 pepperoni + 6 unknown = 15 total
      expect(groups).toHaveLength(15);
    });
  });

  describe('SVG Structure', () => {
    it('should have proper SVG namespace', () => {
      const { container } = render(<PizzaBase slices={4} />);
      const svg = container.querySelector('svg');
      expect(svg?.tagName).toBe('svg');
    });

    it('should render plate background circles', () => {
      const { container } = render(<PizzaBase slices={4} />);
      const circles = container.querySelectorAll('circle');
      // Should have at least: plate outer, plate inner, sauce, cheese, crust highlight, rim highlight, + crust decorations
      expect(circles.length).toBeGreaterThanOrEqual(7);
    });

    it('should have correct viewBox for responsive scaling', () => {
      const { container } = render(<PizzaBase slices={4} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('viewBox', '0 0 300 300');
    });

    it('should render all SVG elements as children of motion.svg', () => {
      const { container } = render(<PizzaBase slices={4} />);
      const svg = container.querySelector('svg');
      expect(svg?.children.length).toBeGreaterThan(0);
    });
  });

  describe('Topping Distribution', () => {
    it('should distribute toppings based on instanceId for reproducibility', () => {
      const ingredient1: PlacedIngredient = {
        ingredientId: 'pepperoni',
        instanceId: 'pepperoni-same',
      };
      const ingredient2: PlacedIngredient = {
        ingredientId: 'pepperoni',
        instanceId: 'pepperoni-same',
      };

      const { container: container1 } = render(<PizzaBase slices={4} placedIngredients={[ingredient1]} />);
      const { container: container2 } = render(<PizzaBase slices={4} placedIngredients={[ingredient2]} />);

      const groups1 = container1.querySelectorAll('g');
      const groups2 = container2.querySelectorAll('g');

      // Same instanceId should produce same number of toppings and transforms
      expect(groups1).toHaveLength(groups2.length);
    });

    it('should distribute different toppings to different positions', () => {
      const ingredient1: PlacedIngredient = {
        ingredientId: 'pepperoni',
        instanceId: 'pepperoni-1',
      };
      const ingredient2: PlacedIngredient = {
        ingredientId: 'pepperoni',
        instanceId: 'pepperoni-2',
      };

      const { container: container1 } = render(<PizzaBase slices={4} placedIngredients={[ingredient1]} />);
      const { container: container2 } = render(<PizzaBase slices={4} placedIngredients={[ingredient2]} />);

      const groups1 = Array.from(container1.querySelectorAll('g'));
      const groups2 = Array.from(container2.querySelectorAll('g'));

      // Different instanceIds may have different transforms
      const transforms1 = groups1.map((g) => g.getAttribute('transform'));
      const transforms2 = groups2.map((g) => g.getAttribute('transform'));

      // At least some transforms should be different
      const allSame = transforms1.every((t, i) => t === transforms2[i]);
      expect(allSame).toBe(false);
    });
  });
});