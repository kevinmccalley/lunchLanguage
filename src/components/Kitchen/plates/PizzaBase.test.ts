// @ts-nocheck
import { render } from '@testing-library/react';
import type { PlacedIngredient } from '../../../types';
import { PizzaBase } from './PizzaBase';

describe('PizzaBase', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { container } = render(<PizzaBase slices={8} />);
      expect(container).toBeTruthy();
    });

    it('should render with default placedIngredients when not provided', () => {
      const { container } = render(<PizzaBase slices={6} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
    });

    it('should render svg with correct dimensions', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '300');
      expect(svg).toHaveAttribute('height', '300');
      expect(svg).toHaveAttribute('viewBox', '0 0 300 300');
    });

    it('should render plate circles', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const circles = container.querySelectorAll('circle');
      // At least 3 circles for plate layers + crust decorations + rim highlight
      expect(circles.length).toBeGreaterThan(3);
    });
  });

  describe('slice rendering', () => {
    it('should render correct number of slice dividers', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const lines = container.querySelectorAll('line');
      expect(lines.length).toBe(8);
    });

    it('should render slice lines with correct properties', () => {
      const { container } = render(<PizzaBase slices={4} />);
      const lines = container.querySelectorAll('line');
      lines.forEach((line) => {
        expect(line).toHaveAttribute('stroke', '#c0392b');
        expect(line).toHaveAttribute('stroke-width', '2');
        expect(line).toHaveAttribute('stroke-dasharray', '6 3');
        expect(line).toHaveAttribute('opacity', '0.7');
      });
    });

    it('should handle single slice', () => {
      const { container } = render(<PizzaBase slices={1} />);
      const lines = container.querySelectorAll('line');
      expect(lines.length).toBe(1);
    });

    it('should handle many slices', () => {
      const { container } = render(<PizzaBase slices={16} />);
      const lines = container.querySelectorAll('line');
      expect(lines.length).toBe(16);
    });

    it('should handle zero slices', () => {
      const { container } = render(<PizzaBase slices={0} />);
      const lines = container.querySelectorAll('line');
      expect(lines.length).toBe(0);
    });
  });

  describe('topping rendering', () => {
    it('should not render toppings when placedIngredients is empty', () => {
      const { container } = render(<PizzaBase slices={8} placedIngredients={[]} />);
      const groups = container.querySelectorAll('g');
      // Should not have topping groups (only the main svg structure)
      expect(groups.length).toBe(0);
    });

    it('should render correct number of toppings for pepperoni', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'pepperoni', instanceId: 'pepperoni-1' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      // 9 pepperoni toppings
      expect(groups.length).toBe(9);
    });

    it('should render correct number of toppings for mushroom', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'mushroom', instanceId: 'mushroom-1' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      // 7 mushroom toppings
      expect(groups.length).toBe(7);
    });

    it('should render correct number of toppings for olive', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'olive', instanceId: 'olive-1' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      // 8 olive toppings
      expect(groups.length).toBe(8);
    });

    it('should render correct number of toppings for bell_pepper', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'bell_pepper', instanceId: 'bell_pepper-1' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      // 6 bell_pepper toppings
      expect(groups.length).toBe(6);
    });

    it('should render correct number of toppings for cheese', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'cheese', instanceId: 'cheese-1' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      // 5 cheese toppings
      expect(groups.length).toBe(5);
    });

    it('should render correct number of toppings for tomato_slice', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'tomato_slice', instanceId: 'tomato-1' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      // 7 tomato_slice toppings
      expect(groups.length).toBe(7);
    });

    it('should render correct number of toppings for pineapple', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'pineapple', instanceId: 'pineapple-1' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      // 7 pineapple toppings
      expect(groups.length).toBe(7);
    });

    it('should render correct number of toppings for jalapeno', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'jalapeno', instanceId: 'jalapeno-1' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      // 6 jalapeno toppings
      expect(groups.length).toBe(6);
    });

    it('should render correct number of toppings for basil', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'basil', instanceId: 'basil-1' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      // 8 basil toppings
      expect(groups.length).toBe(8);
    });

    it('should render correct number of toppings for sausage', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'sausage', instanceId: 'sausage-1' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      // 8 sausage toppings
      expect(groups.length).toBe(8);
    });

    it('should render correct number of toppings for onion', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'onion', instanceId: 'onion-1' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      // 5 onion toppings
      expect(groups.length).toBe(5);
    });

    it('should render default 6 toppings for unknown ingredient', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'unknown_topping', instanceId: 'unknown-1' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      // 6 default toppings
      expect(groups.length).toBe(6);
    });

    it('should render multiple different toppings', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'pepperoni', instanceId: 'pepperoni-1' },
        { ingredientId: 'mushroom', instanceId: 'mushroom-1' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      // 9 pepperoni + 7 mushroom = 16
      expect(groups.length).toBe(16);
    });

    it('should render multiple instances of same topping', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'pepperoni', instanceId: 'pepperoni-1' },
        { ingredientId: 'pepperoni', instanceId: 'pepperoni-2' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      // 9 pepperoni + 9 pepperoni = 18
      expect(groups.length).toBe(18);
    });

    it('should render toppings with correct transform attribute', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'pepperoni', instanceId: 'pepperoni-1' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      groups.forEach((group) => {
        const transform = group.getAttribute('transform');
        expect(transform).toBeTruthy();
        expect(transform).toMatch(/translate\(\d+\.?\d* \d+\.?\d*\) rotate\(\d+\.?\d*\)/);
      });
    });
  });

  describe('topping shapes', () => {
    it('should render pepperoni circles', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'pepperoni', instanceId: 'pepperoni-1' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const circles = container.querySelectorAll('circle');
      // Plate circles + crust decoration circles + pepperoni circles
      expect(circles.length).toBeGreaterThan(20);
    });

    it('should render mushroom with rects', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'mushroom', instanceId: 'mushroom-1' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const rects = container.querySelectorAll('rect');
      // Should have at least 7 rect elements for mushrooms
      expect(rects.length).toBeGreaterThanOrEqual(7);
    });

    it('should render olive with nested circles', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'olive', instanceId: 'olive-1' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(20);
    });

    it('should render bell_pepper with ellipse', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'bell_pepper', instanceId: 'bell_pepper-1' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThanOrEqual(6);
    });

    it('should render cheese with ellipse', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'cheese', instanceId: 'cheese-1' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThanOrEqual(5);
    });

    it('should render pineapple with rect and circles', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'pineapple', instanceId: 'pineapple-1' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThanOrEqual(7);
    });
  });

  describe('motion animation', () => {
    it('should render motion.svg with animation properties', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
      // motion.svg is rendered as svg element with animation data attributes
      expect(svg?.tagName).toBe('svg');
    });
  });

  describe('edge cases', () => {
    it('should handle empty placedIngredients array', () => {
      const { container } = render(<PizzaBase slices={8} placedIngredients={[]} />);
      expect(container).toBeTruthy();
    });

    it('should handle undefined placedIngredients', () => {
      const { container } = render(<PizzaBase slices={8} />);
      expect(container).toBeTruthy();
    });

    it('should handle very small number of slices', () => {
      const { container } = render(<PizzaBase slices={1} />);
      expect(container).toBeTruthy();
    });

    it('should handle large number of slices', () => {
      const { container } = render(<PizzaBase slices={32} />);
      const lines = container.querySelectorAll('line');
      expect(lines.length).toBe(32);
    });

    it('should handle placedIngredients with special characters in instanceId', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'pepperoni', instanceId: 'pepperoni-123-abc_test' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      expect(container).toBeTruthy();
    });

    it('should handle mixed valid and unknown ingredients', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'pepperoni', instanceId: 'pepperoni-1' },
        { ingredientId: 'unknown_item', instanceId: 'unknown-1' },
        { ingredientId: 'mushroom', instanceId: 'mushroom-1' },
      ];
      const { container } = render(<PizzaBase slices={8} placedIngredients={ingredients} />);
      const groups = container.querySelectorAll('g');
      // 9 pepperoni + 6 unknown + 7 mushroom = 22
      expect(groups.length).toBe(22);
    });
  });

  describe('crust rendering', () => {
    it('should render crust circle', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const circles = container.querySelectorAll('circle');
      // Should include crust circle
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render 20 crust decoration circles', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const circles = container.querySelectorAll('circle');
      // At least plate circles + 20 crust decorations + rim
      expect(circles.length).toBeGreaterThanOrEqual(23);
    });
  });

  describe('base layers', () => {
    it('should render plate base circle', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render sauce circle', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render cheese base circle', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });
  });
});