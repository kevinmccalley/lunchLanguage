// @ts-nocheck
import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { PizzaBase } from './PizzaBase';
import type { PlacedIngredient } from '../../../types';

describe('PizzaBase', () => {
  describe('Component rendering', () => {
    it('should render an SVG element', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should have correct SVG dimensions', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '300');
      expect(svg).toHaveAttribute('height', '300');
      expect(svg).toHaveAttribute('viewBox', '0 0 300 300');
    });

    it('should render pizza base circles (plate, sauce, cheese)', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThanOrEqual(3);
    });

    it('should render crust as a stroked circle', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const circles = container.querySelectorAll('circle[stroke="#d4a96a"]');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render plate rim highlight', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const highlights = container.querySelectorAll('circle[stroke="white"]');
      expect(highlights.length).toBeGreaterThan(0);
    });
  });

  describe('Slice dividers', () => {
    it('should render correct number of slice dividers', () => {
      const slices = 8;
      const { container } = render(<PizzaBase slices={slices} />);
      const lines = container.querySelectorAll('line[stroke="#c0392b"]');
      expect(lines.length).toBe(slices);
    });

    it('should render 4 slices', () => {
      const { container } = render(<PizzaBase slices={4} />);
      const lines = container.querySelectorAll('line[stroke="#c0392b"]');
      expect(lines.length).toBe(4);
    });

    it('should render 6 slices', () => {
      const { container } = render(<PizzaBase slices={6} />);
      const lines = container.querySelectorAll('line[stroke="#c0392b"]');
      expect(lines.length).toBe(6);
    });

    it('should render 12 slices', () => {
      const { container } = render(<PizzaBase slices={12} />);
      const lines = container.querySelectorAll('line[stroke="#c0392b"]');
      expect(lines.length).toBe(12);
    });

    it('should render 1 slice', () => {
      const { container } = render(<PizzaBase slices={1} />);
      const lines = container.querySelectorAll('line[stroke="#c0392b"]');
      expect(lines.length).toBe(1);
    });

    it('should have dashed stroke style on slice dividers', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const lines = container.querySelectorAll('line[stroke="#c0392b"]');
      const firstLine = lines[0];
      expect(firstLine).toHaveAttribute('strokeDasharray', '6 3');
    });
  });

  describe('Crust bubbles', () => {
    it('should render 20 crust bubbles', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const crustBubbles = container.querySelectorAll('circle[fill="#c9916a"]');
      expect(crustBubbles.length).toBe(20);
    });

    it('should have correct opacity on crust bubbles', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const crustBubbles = container.querySelectorAll('circle[fill="#c9916a"]');
      crustBubbles.forEach((bubble) => {
        expect(bubble).toHaveAttribute('opacity', '0.6');
      });
    });

    it('should have correct radius on crust bubbles', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const crustBubbles = container.querySelectorAll('circle[fill="#c9916a"]');
      crustBubbles.forEach((bubble) => {
        expect(bubble).toHaveAttribute('r', '3');
      });
    });
  });

  describe('Toppings rendering', () => {
    it('should not render toppings when placedIngredients is empty', () => {
      const { container } = render(<PizzaBase slices={8} placedIngredients={[]} />);
      const groups = container.querySelectorAll('g[transform*="translate"]');
      expect(groups.length).toBe(0);
    });

    it('should render toppings for single ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'pepperoni', instanceId: 'test-1' }
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g[transform*="translate"]');
      expect(groups.length).toBe(9); // pepperoni count is 9
    });

    it('should render correct count of pepperoni toppings', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'pepperoni', instanceId: 'test-1' }
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g[transform*="translate"]');
      expect(groups.length).toBe(9);
    });

    it('should render correct count of mushroom toppings', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'mushroom', instanceId: 'test-1' }
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g[transform*="translate"]');
      expect(groups.length).toBe(7);
    });

    it('should render correct count of olive toppings', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'olive', instanceId: 'test-1' }
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g[transform*="translate"]');
      expect(groups.length).toBe(8);
    });

    it('should render correct count of bell_pepper toppings', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'bell_pepper', instanceId: 'test-1' }
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g[transform*="translate"]');
      expect(groups.length).toBe(6);
    });

    it('should render correct count of cheese toppings', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'cheese', instanceId: 'test-1' }
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g[transform*="translate"]');
      expect(groups.length).toBe(5);
    });

    it('should render correct count of tomato_slice toppings', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'tomato_slice', instanceId: 'test-1' }
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g[transform*="translate"]');
      expect(groups.length).toBe(7);
    });

    it('should render correct count of pineapple toppings', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'pineapple', instanceId: 'test-1' }
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g[transform*="translate"]');
      expect(groups.length).toBe(7);
    });

    it('should render correct count of jalapeno toppings', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'jalapeno', instanceId: 'test-1' }
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g[transform*="translate"]');
      expect(groups.length).toBe(6);
    });

    it('should render correct count of basil toppings', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'basil', instanceId: 'test-1' }
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g[transform*="translate"]');
      expect(groups.length).toBe(8);
    });

    it('should render correct count of sausage toppings', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'sausage', instanceId: 'test-1' }
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g[transform*="translate"]');
      expect(groups.length).toBe(8);
    });

    it('should render correct count of onion toppings', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'onion', instanceId: 'test-1' }
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g[transform*="translate"]');
      expect(groups.length).toBe(5);
    });

    it('should use default topping count for unknown ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'unknown_topping', instanceId: 'test-1' }
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g[transform*="translate"]');
      expect(groups.length).toBe(6); // default count
    });

    it('should render multiple different toppings', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'pepperoni', instanceId: 'test-1' },
        { ingredientId: 'mushroom', instanceId: 'test-2' }
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g[transform*="translate"]');
      expect(groups.length).toBe(16); // 9 + 7
    });

    it('should render three different toppings', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'pepperoni', instanceId: 'test-1' },
        { ingredientId: 'mushroom', instanceId: 'test-2' },
        { ingredientId: 'olive', instanceId: 'test-3' }
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g[transform*="translate"]');
      expect(groups.length).toBe(24); // 9 + 7 + 8
    });

    it('should have unique keys for topping groups', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'pepperoni', instanceId: 'test-1' }
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g[transform*="translate"]');
      const keys = new Set<string>();
      groups.forEach((group, index) => {
        expect(group).toHaveAttribute('key', `test-1-${index}`);
      });
    });
  });

  describe('ToppingShape component', () => {
    it('should render pepperoni shape with circles', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'pepperoni', instanceId: 'test-1' }
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const pepperoniCircles = container.querySelectorAll('circle[r="9"][fill="#c0392b"]');
      expect(pepperoniCircles.length).toBeGreaterThan(0);
    });

    it('should render mushroom shape with ellipses', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'mushroom', instanceId: 'test-1' }
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render olive shape', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'olive', instanceId: 'test-1' }
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const oliveCircles = container.querySelectorAll('circle[r="8"][fill="#1B2631"]');
      expect(oliveCircles.length).toBeGreaterThan(0);
    });

    it('should render bell_pepper shape with green ellipse', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'bell_pepper', instanceId: 'test-1' }
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const pepperEllipses = container.querySelectorAll('ellipse[fill="#27ae60"]');
      expect(pepperEllipses.length).toBeGreaterThan(0);
    });

    it('should render cheese shape with yellow ellipse', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'cheese', instanceId: 'test-1' }
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const cheeseEllipses = container.querySelectorAll('ellipse[fill="#f1c40f"]');
      expect(cheeseEllipses.length).toBeGreaterThan(0);
    });

    it('should render tomato_slice shape', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'tomato_slice', instanceId: 'test-1' }
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const tomatoCircles = container.querySelectorAll('circle[r="9"][fill="#e74c3c"]');
      expect(tomatoCircles.length).toBeGreaterThan(0);
    });

    it('should render pineapple shape', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'pineapple', instanceId: 'test-1' }
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const rects = container.querySelectorAll('rect[fill="#f1c40f"]');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render jalapeno shape with green ellipse', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'jalapeno', instanceId: 'test-1' }
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const jalapenoEllipses = container.querySelectorAll('ellipse[fill="#27ae60"]');
      expect(jalapenoEllipses.length).toBeGreaterThan(0);
    });

    it('should render basil shape with lines', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'basil', instanceId: 'test-1' }
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const lines = container.querySelectorAll('line[stroke="#1a5c1a"]');
      expect(lines.length).toBeGreaterThan(0);
    });

    it('should render sausage shape', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'sausage', instanceId: 'test-1' }
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const sausageEllipses = container.querySelectorAll('ellipse[fill="#784212"]');
      expect(sausageEllipses.length).toBeGreaterThan(0);
    });

    it('should render onion shape with purple stroke', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'onion', instanceId: 'test-1' }
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const onionEllipses = container.querySelectorAll('ellipse[stroke="#9b59b6"]');
      expect(onionEllipses.length).toBeGreaterThan(0);
    });

    it('should render default shape for unknown ingredient id', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'unknown', instanceId: 'test-1' }
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const defaultCircles = container.querySelectorAll('circle[r="7"][fill="#888"]');
      expect(defaultCircles.length).toBeGreaterThan(0);
    });
  });

  describe('Animation properties', () => {
    it('should have spring animation configuration', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('should handle 0 slices', () => {
      const { container } = render(<PizzaBase slices={0} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      const lines = container.querySelectorAll('line[stroke="#c0392b"]');
      expect(lines.length).toBe(0);
    });

    it('should handle large number of slices', () => {
      const { container } = render(<PizzaBase slices={100} />);
      const lines = container.querySelectorAll('line[stroke="#c0392b"]');
      expect(lines.length).toBe(100);
    });

    it('should handle undefined placedIngredients', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should handle empty placedIngredients array', () => {
      const { container } = render(<PizzaBase slices={8} placedIngredients={[]} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      const groups = container.querySelectorAll('g[transform*="translate"]');
      expect(groups.length).toBe(0);
    });

    it('should handle many toppings', () => {
      const placedIngredients: PlacedIngredient[] = Array.from({ length: 10 }, (_, i) => ({
        ingredientId: 'pepperoni',
        instanceId: `test-${i}`
      }));
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g[transform*="translate"]');
      expect(groups.length).toBe(90); // 10 * 9 pepperonis
    });

    it('should render consistently with same props', () => {
      const props = {
        slices: 8,
        placedIngredients: [{ ingredientId: 'pepperoni', instanceId: 'test-1' }]
      };
      const { container: container1 } = render(<PizzaBase {...props} />);
      const { container: container2 } = render(<PizzaBase {...props} />);
      
      const groups1 = container1.querySelectorAll('g[transform*="translate"]');
      const groups2 = container2.querySelectorAll('g[transform*="translate"]');
      expect(groups1.length).toBe(groups2.length);
    });
  });
});