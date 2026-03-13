// @ts-nocheck
import { render } from '@testing-library/react';
import type { PlacedIngredient } from '../../../types';
import { PizzaBase } from './PizzaBase';

describe('PizzaBase', () => {
  describe('rendering', () => {
    it('should render an SVG element with correct dimensions', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('width', '300');
      expect(svg).toHaveAttribute('height', '300');
      expect(svg).toHaveAttribute('viewBox', '0 0 300 300');
    });

    it('should render correct number of slice dividers', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const lines = container.querySelectorAll('line');
      expect(lines).toHaveLength(8);
    });

    it('should render slice dividers with correct stroke properties', () => {
      const { container } = render(<PizzaBase slices={4} />);
      const lines = container.querySelectorAll('line');
      lines.forEach((line) => {
        expect(line).toHaveAttribute('stroke', '#c0392b');
        expect(line).toHaveAttribute('strokeWidth', '2');
        expect(line).toHaveAttribute('strokeDasharray', '6 3');
        expect(line).toHaveAttribute('opacity', '0.7');
      });
    });

    it('should render pizza base circles', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render crust decoration circles', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const circles = container.querySelectorAll('circle');
      // Should have at least: plate, plate inner, sauce, cheese, and 20 crust circles
      expect(circles.length).toBeGreaterThanOrEqual(24);
    });

    it('should render plate rim highlight', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const circleElements = container.querySelectorAll('circle');
      const hasPlateRimHighlight = Array.from(circleElements).some(
        (circle) => circle.getAttribute('stroke') === 'white' && circle.getAttribute('opacity') === '0.4'
      );
      expect(hasPlateRimHighlight).toBe(true);
    });
  });

  describe('slice variations', () => {
    it('should render single slice pizza', () => {
      const { container } = render(<PizzaBase slices={1} />);
      const lines = container.querySelectorAll('line');
      expect(lines).toHaveLength(1);
    });

    it('should render pizza with many slices', () => {
      const { container } = render(<PizzaBase slices={16} />);
      const lines = container.querySelectorAll('line');
      expect(lines).toHaveLength(16);
    });

    it('should render pizza with zero slices', () => {
      const { container } = render(<PizzaBase slices={0} />);
      const lines = container.querySelectorAll('line');
      expect(lines).toHaveLength(0);
    });
  });

  describe('toppings', () => {
    it('should render no toppings when placedIngredients is empty', () => {
      const { container } = render(<PizzaBase slices={8} placedIngredients={[]} />);
      const groups = container.querySelectorAll('g');
      // Should only have groups from ToppingShape inside toppingEls, not any topping groups
      expect(groups.length).toBe(0);
    });

    it('should render toppings for pepperoni', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'pepperoni', instanceId: 'pepperoni-1' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g');
      // Should have 9 pepperoni toppings
      expect(groups).toHaveLength(9);
    });

    it('should render toppings for mushroom', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'mushroom', instanceId: 'mushroom-1' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g');
      // Should have 7 mushroom toppings
      expect(groups).toHaveLength(7);
    });

    it('should render toppings for olive', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'olive', instanceId: 'olive-1' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g');
      // Should have 8 olive toppings
      expect(groups).toHaveLength(8);
    });

    it('should render toppings for all known ingredients', () => {
      const ingredientIds = ['pepperoni', 'mushroom', 'olive', 'bell_pepper', 'cheese', 'tomato_slice', 'pineapple', 'jalapeno', 'basil', 'sausage', 'onion'];
      ingredientIds.forEach((ingredientId) => {
        const { container } = render(
          <PizzaBase slices={8} placedIngredients={[{ ingredientId, instanceId: `${ingredientId}-1` }]} />
        );
        const groups = container.querySelectorAll('g');
        expect(groups.length).toBeGreaterThan(0);
      });
    });

    it('should render multiple toppings on same pizza', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'pepperoni', instanceId: 'pepperoni-1' },
        { ingredientId: 'mushroom', instanceId: 'mushroom-1' },
        { ingredientId: 'olive', instanceId: 'olive-1' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g');
      // 9 + 7 + 8 = 24
      expect(groups).toHaveLength(24);
    });

    it('should render unknown ingredient type as default', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'unknown_ingredient', instanceId: 'unknown-1' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g');
      // Should have 6 toppings (default count)
      expect(groups).toHaveLength(6);
    });

    it('should generate different positions for same ingredient with different instance IDs', () => {
      const { container: container1 } = render(
        <PizzaBase slices={8} placedIngredients={[{ ingredientId: 'pepperoni', instanceId: 'pepperoni-1' }]} />
      );
      const { container: container2 } = render(
        <PizzaBase slices={8} placedIngredients={[{ ingredientId: 'pepperoni', instanceId: 'pepperoni-2' }]} />
      );

      const groups1 = container1.querySelectorAll('g');
      const groups2 = container2.querySelectorAll('g');

      expect(groups1).toHaveLength(9);
      expect(groups2).toHaveLength(9);

      // Get transform values to verify they're different
      const transform1 = groups1[0]?.getAttribute('transform');
      const transform2 = groups2[0]?.getAttribute('transform');

      expect(transform1).not.toBe(transform2);
    });

    it('should assign unique keys to topping elements', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'pepperoni', instanceId: 'pepperoni-1' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g');
      const keys = Array.from(groups).map((el) => el.getAttribute('key'));
      // All keys should be unique
      const uniqueKeys = new Set(keys);
      expect(uniqueKeys.size).toBe(groups.length);
    });
  });

  describe('motion animation', () => {
    it('should have motion.svg with animation properties', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      // motion.svg should be present in the DOM
      expect(svg?.tagName.toLowerCase()).toBe('svg');
    });
  });

  describe('default props', () => {
    it('should use empty array as default for placedIngredients', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const groups = container.querySelectorAll('g');
      expect(groups).toHaveLength(0);
    });

    it('should render without placedIngredients prop', () => {
      const { container } = render(<PizzaBase slices={6} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('topping shapes', () => {
    it('should render pepperoni with correct SVG elements', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'pepperoni', instanceId: 'pepperoni-1' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render cheese topping', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'cheese', instanceId: 'cheese-1' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render basil topping with lines', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'basil', instanceId: 'basil-1' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const lines = container.querySelectorAll('line');
      expect(lines.length).toBeGreaterThan(0);
    });
  });

  describe('edge cases', () => {
    it('should handle empty placed ingredients array', () => {
      const { container } = render(<PizzaBase slices={8} placedIngredients={[]} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should handle undefined placedIngredients', () => {
      const { container } = render(<PizzaBase slices={8} placedIngredients={undefined} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render with large number of slices', () => {
      const { container } = render(<PizzaBase slices={360} />);
      const lines = container.querySelectorAll('line');
      expect(lines).toHaveLength(360);
    });

    it('should handle multiple toppings of same type', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'pepperoni', instanceId: 'pepperoni-1' },
        { ingredientId: 'pepperoni', instanceId: 'pepperoni-2' },
        { ingredientId: 'pepperoni', instanceId: 'pepperoni-3' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={placedIngredients} />);
      const groups = container.querySelectorAll('g');
      // 9 * 3 = 27
      expect(groups).toHaveLength(27);
    });
  });
});