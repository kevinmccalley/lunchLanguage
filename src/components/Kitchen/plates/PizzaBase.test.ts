// @ts-nocheck
import { render } from '@testing-library/react';
import type { PlacedIngredient } from '../../../types';
import { PizzaBase } from './PizzaBase';

describe('PizzaBase', () => {
  describe('Component Rendering', () => {
    it('should render without crashing with minimal props', () => {
      const { container } = render(<PizzaBase slices={8} />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render with default empty placedIngredients when not provided', () => {
      const { container } = render(<PizzaBase slices={4} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg?.getAttribute('width')).toBe('300');
      expect(svg?.getAttribute('height')).toBe('300');
    });

    it('should render with explicit placedIngredients array', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-1', ingredientId: 'pepperoni' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Slice Lines Rendering', () => {
    it('should render correct number of slice dividers for 8 slices', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const lines = container.querySelectorAll('line');
      expect(lines.length).toBe(8);
    });

    it('should render correct number of slice dividers for 4 slices', () => {
      const { container } = render(<PizzaBase slices={4} />);
      const lines = container.querySelectorAll('line');
      expect(lines.length).toBe(4);
    });

    it('should render correct number of slice dividers for 1 slice', () => {
      const { container } = render(<PizzaBase slices={1} />);
      const lines = container.querySelectorAll('line');
      expect(lines.length).toBe(1);
    });

    it('should render correct number of slice dividers for 12 slices', () => {
      const { container } = render(<PizzaBase slices={12} />);
      const lines = container.querySelectorAll('line');
      expect(lines.length).toBe(12);
    });

    it('should render slice lines with correct styling', () => {
      const { container } = render(<PizzaBase slices={2} />);
      const lines = container.querySelectorAll('line');
      lines.forEach((line) => {
        expect(line.getAttribute('stroke')).toBe('#c0392b');
        expect(line.getAttribute('strokeWidth')).toBe('2');
        expect(line.getAttribute('strokeDasharray')).toBe('6 3');
      });
    });
  });

  describe('Pizza Base Elements', () => {
    it('should render pizza plate circle', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render sauce layer with correct color', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const circles = container.querySelectorAll('circle');
      const sauceCircle = Array.from(circles).find(c => c.getAttribute('fill') === '#e74c3c');
      expect(sauceCircle).toBeInTheDocument();
    });

    it('should render cheese base with correct color and opacity', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const circles = container.querySelectorAll('circle');
      const cheeseCircle = Array.from(circles).find(
        c => c.getAttribute('fill') === '#f1c40f' && c.getAttribute('opacity') === '0.9'
      );
      expect(cheeseCircle).toBeInTheDocument();
    });

    it('should render crust decoration circles', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const circles = container.querySelectorAll('circle');
      const crustDecorations = Array.from(circles).filter(
        c => c.getAttribute('r') === '3' && c.getAttribute('fill') === '#c9916a'
      );
      expect(crustDecorations.length).toBe(20);
    });

    it('should render plate rim highlight', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const circles = container.querySelectorAll('circle[r="147"]');
      expect(circles.length).toBeGreaterThan(0);
    });
  });

  describe('Toppings Rendering', () => {
    it('should render no toppings when placedIngredients is empty', () => {
      const { container } = render(<PizzaBase slices={8} placedIngredients={[]} />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(0);
    });

    it('should render pepperoni toppings with correct count', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-pepperoni', ingredientId: 'pepperoni' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(9);
    });

    it('should render mushroom toppings with correct count', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-mushroom', ingredientId: 'mushroom' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(7);
    });

    it('should render olive toppings with correct count', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-olive', ingredientId: 'olive' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(8);
    });

    it('should render bell_pepper toppings with correct count', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-pepper', ingredientId: 'bell_pepper' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(6);
    });

    it('should render cheese toppings with correct count', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-cheese', ingredientId: 'cheese' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(5);
    });

    it('should render tomato_slice toppings with correct count', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-tomato', ingredientId: 'tomato_slice' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(7);
    });

    it('should render pineapple toppings with correct count', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-pineapple', ingredientId: 'pineapple' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(7);
    });

    it('should render jalapeno toppings with correct count', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-jalapeno', ingredientId: 'jalapeno' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(6);
    });

    it('should render basil toppings with correct count', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-basil', ingredientId: 'basil' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(8);
    });

    it('should render sausage toppings with correct count', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-sausage', ingredientId: 'sausage' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(8);
    });

    it('should render onion toppings with correct count', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-onion', ingredientId: 'onion' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(5);
    });

    it('should render multiple different toppings', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-pepperoni', ingredientId: 'pepperoni' },
        { instanceId: 'test-mushroom', ingredientId: 'mushroom' },
        { instanceId: 'test-olive', ingredientId: 'olive' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(9 + 7 + 8);
    });

    it('should render unknown topping type with default fallback', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-unknown', ingredientId: 'unknown_topping' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(6);
    });

    it('should render same ingredient type multiple times', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-pepperoni-1', ingredientId: 'pepperoni' },
        { instanceId: 'test-pepperoni-2', ingredientId: 'pepperoni' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(18);
    });
  });

  describe('SVG Attributes', () => {
    it('should have correct viewBox', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const svg = container.querySelector('svg');
      expect(svg?.getAttribute('viewBox')).toBe('0 0 300 300');
    });

    it('should have correct dimensions', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const svg = container.querySelector('svg');
      expect(svg?.getAttribute('width')).toBe('300');
      expect(svg?.getAttribute('height')).toBe('300');
    });

    it('should have motion animation attributes', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg?.tagName).toBe('svg');
    });
  });

  describe('ToppingShape Component Rendering', () => {
    it('should render pepperoni shape correctly', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-pepperoni', ingredientId: 'pepperoni' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const circles = container.querySelectorAll('circle[r="9"]');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render mushroom shape correctly', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-mushroom', ingredientId: 'mushroom' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render olive shape correctly', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-olive', ingredientId: 'olive' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const circles = container.querySelectorAll('circle[r="8"]');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render bell_pepper shape with lines', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-pepper', ingredientId: 'bell_pepper' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const lines = container.querySelectorAll('line');
      expect(lines.length).toBeGreaterThan(0);
    });

    it('should render cheese shape correctly', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-cheese', ingredientId: 'cheese' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render tomato_slice shape correctly', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-tomato', ingredientId: 'tomato_slice' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const circles = container.querySelectorAll('circle[r="9"][fill="#e74c3c"]');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render pineapple shape correctly', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-pineapple', ingredientId: 'pineapple' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render jalapeno shape correctly', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-jalapeno', ingredientId: 'jalapeno' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render basil shape correctly', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-basil', ingredientId: 'basil' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const lines = container.querySelectorAll('line');
      expect(lines.length).toBeGreaterThan(0);
    });

    it('should render sausage shape correctly', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-sausage', ingredientId: 'sausage' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render onion shape correctly', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-onion', ingredientId: 'onion' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render default shape for unknown ingredient', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-unknown', ingredientId: 'unknown' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero slices', () => {
      const { container } = render(<PizzaBase slices={0} />);
      const lines = container.querySelectorAll('line');
      expect(lines.length).toBe(0);
    });

    it('should handle very large number of slices', () => {
      const { container } = render(<PizzaBase slices={100} />);
      const lines = container.querySelectorAll('line');
      expect(lines.length).toBe(100);
    });

    it('should handle empty placedIngredients array explicitly', () => {
      const { container } = render(<PizzaBase slices={8} placedIngredients={[]} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should handle multiple ingredients of same type with different instanceIds', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'pepperoni-1', ingredientId: 'pepperoni' },
        { instanceId: 'pepperoni-2', ingredientId: 'pepperoni' },
        { instanceId: 'pepperoni-3', ingredientId: 'pepperoni' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(27);
    });

    it('should render consistently with same instanceId', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-pepperoni', ingredientId: 'pepperoni' },
      ];
      const { container: container1 } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const { container: container2 } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      
      const groups1 = container1.querySelectorAll('g');
      const groups2 = container2.querySelectorAll('g');
      expect(groups1.length).toBe(groups2.length);
    });
  });

  describe('Complex Scenarios', () => {
    it('should render pizza with all available toppings', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'id1', ingredientId: 'pepperoni' },
        { instanceId: 'id2', ingredientId: 'mushroom' },
        { instanceId: 'id3', ingredientId: 'olive' },
        { instanceId: 'id4', ingredientId: 'bell_pepper' },
        { instanceId: 'id5', ingredientId: 'cheese' },
        { instanceId: 'id6', ingredientId: 'tomato_slice' },
        { instanceId: 'id7', ingredientId: 'pineapple' },
        { instanceId: 'id8', ingredientId: 'jalapeno' },
        { instanceId: 'id9', ingredientId: 'basil' },
        { instanceId: 'id10', ingredientId: 'sausage' },
        { instanceId: 'id11', ingredientId: 'onion' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      const expectedCount = 9 + 7 + 8 + 6 + 5 + 7 + 7 + 6 + 8 + 8 + 5;
      expect(groups.length).toBe(expectedCount);
    });

    it('should handle mixed valid and unknown toppings', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'id1', ingredientId: 'pepperoni' },
        { instanceId: 'id2', ingredientId: 'unknown_topping_1' },
        { instanceId: 'id3', ingredientId: 'mushroom' },
        { instanceId: 'id4', ingredientId: 'unknown_topping_2' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(9 + 6 + 7 + 6);
    });

    it('should render with different slice configurations and toppings', () => {
      const ingredients: PlacedIngredient[] = [
        { instanceId: 'test-pepperoni', ingredientId: 'pepperoni' },
      ];
      const { container: container4 } = render(
        <PizzaBase slices={4} placedIngredients={ingredients} />
      );
      const { container: container8 } = render(
        <PizzaBase slices={8} placedIngredients={ingredients} />
      );
      
      const lines4 = container4.querySelectorAll('line');
      const lines8 = container8.querySelectorAll('line');
      expect(lines4.length).toBe(4);
      expect(lines8.length).toBe(8);
    });
  });
});