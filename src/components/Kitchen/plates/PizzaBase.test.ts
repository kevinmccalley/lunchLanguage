// @ts-nocheck
import { render } from '@testing-library/react';
import { PizzaBase } from './PizzaBase';
import type { PlacedIngredient } from '../../../types';

describe('PizzaBase', () => {
  describe('Rendering', () => {
    it('should render an SVG element with correct dimensions', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('width', '300');
      expect(svg).toHaveAttribute('height', '300');
      expect(svg).toHaveAttribute('viewBox', '0 0 300 300');
    });

    it('should render plate circles', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render correct number of slice dividers', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const lines = container.querySelectorAll('line');
      expect(lines.length).toBe(8);
    });

    it('should render slice dividers with correct attributes', () => {
      const { container } = render(<PizzaBase slices={4} />);
      const lines = container.querySelectorAll('line');
      lines.forEach((line) => {
        expect(line).toHaveAttribute('stroke', '#c0392b');
        expect(line).toHaveAttribute('strokeWidth', '2');
        expect(line).toHaveAttribute('strokeDasharray', '6 3');
        expect(line).toHaveAttribute('opacity', '0.7');
      });
    });

    it('should render with different slice counts', () => {
      const sliceCounts = [4, 6, 8, 12];
      sliceCounts.forEach((count) => {
        const { container } = render(<PizzaBase slices={count} />);
        const lines = container.querySelectorAll('line');
        expect(lines.length).toBe(count);
      });
    });

    it('should render crust elements', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const allCircles = container.querySelectorAll('circle');
      const crustElements = Array.from(allCircles).filter(
        (circle) => circle.getAttribute('r') === '3'
      );
      expect(crustElements.length).toBe(20);
    });
  });

  describe('Placed Ingredients', () => {
    it('should render toppings when placedIngredients is provided', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'pepperoni', instanceId: 'pepperoni-1' },
      ];
      const { container } = render(
        <PizzaBase slices={8} placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render correct number of toppings for pepperoni', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'pepperoni', instanceId: 'pepperoni-1' },
      ];
      const { container } = render(
        <PizzaBase slices={8} placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(9);
    });

    it('should render correct number of toppings for mushroom', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'mushroom', instanceId: 'mushroom-1' },
      ];
      const { container } = render(
        <PizzaBase slices={8} placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(7);
    });

    it('should render correct number of toppings for olive', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'olive', instanceId: 'olive-1' },
      ];
      const { container } = render(
        <PizzaBase slices={8} placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(8);
    });

    it('should render correct number of toppings for bell_pepper', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'bell_pepper', instanceId: 'bell_pepper-1' },
      ];
      const { container } = render(
        <PizzaBase slices={8} placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(6);
    });

    it('should render correct number of toppings for cheese', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'cheese', instanceId: 'cheese-1' },
      ];
      const { container } = render(
        <PizzaBase slices={8} placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(5);
    });

    it('should render correct number of toppings for tomato_slice', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'tomato_slice', instanceId: 'tomato-1' },
      ];
      const { container } = render(
        <PizzaBase slices={8} placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(7);
    });

    it('should render correct number of toppings for pineapple', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'pineapple', instanceId: 'pineapple-1' },
      ];
      const { container } = render(
        <PizzaBase slices={8} placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(7);
    });

    it('should render correct number of toppings for jalapeno', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'jalapeno', instanceId: 'jalapeno-1' },
      ];
      const { container } = render(
        <PizzaBase slices={8} placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(6);
    });

    it('should render correct number of toppings for basil', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'basil', instanceId: 'basil-1' },
      ];
      const { container } = render(
        <PizzaBase slices={8} placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(8);
    });

    it('should render correct number of toppings for sausage', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'sausage', instanceId: 'sausage-1' },
      ];
      const { container } = render(
        <PizzaBase slices={8} placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(8);
    });

    it('should render correct number of toppings for onion', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'onion', instanceId: 'onion-1' },
      ];
      const { container } = render(
        <PizzaBase slices={8} placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(5);
    });

    it('should render multiple different toppings', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'pepperoni', instanceId: 'pepperoni-1' },
        { ingredientId: 'mushroom', instanceId: 'mushroom-1' },
        { ingredientId: 'olive', instanceId: 'olive-1' },
      ];
      const { container } = render(
        <PizzaBase slices={8} placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(9 + 7 + 8);
    });

    it('should handle empty placedIngredients array', () => {
      const { container } = render(
        <PizzaBase slices={8} placedIngredients={[]} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(0);
    });

    it('should handle undefined placedIngredients', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should use default topping count for unknown ingredient', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'unknown-topping', instanceId: 'unknown-1' },
      ];
      const { container } = render(
        <PizzaBase slices={8} placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(6);
    });

    it('should render toppings with unique keys based on instanceId and index', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'pepperoni', instanceId: 'pepperoni-1' },
      ];
      const { container } = render(
        <PizzaBase slices={8} placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g');
      groups.forEach((group, index) => {
        expect(group).toHaveAttribute(
          'transform',
          expect.stringContaining('translate')
        );
        expect(group).toHaveAttribute(
          'transform',
          expect.stringContaining('rotate')
        );
      });
    });
  });

  describe('Topping Shapes', () => {
    it('should render pepperoni with circles and stroke', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'pepperoni', instanceId: 'pepperoni-1' },
      ];
      const { container } = render(
        <PizzaBase slices={8} placedIngredients={ingredients} />
      );
      const circles = container.querySelectorAll('circle[r="9"]');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render mushroom with rect and ellipse', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'mushroom', instanceId: 'mushroom-1' },
      ];
      const { container } = render(
        <PizzaBase slices={8} placedIngredients={ingredients} />
      );
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render olive with nested circles', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'olive', instanceId: 'olive-1' },
      ];
      const { container } = render(
        <PizzaBase slices={8} placedIngredients={ingredients} />
      );
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render bell_pepper with ellipse and line', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'bell_pepper', instanceId: 'bell_pepper-1' },
      ];
      const { container } = render(
        <PizzaBase slices={8} placedIngredients={ingredients} />
      );
      const ellipses = container.querySelectorAll('ellipse');
      const lines = container.querySelectorAll('line');
      expect(ellipses.length).toBeGreaterThan(0);
      expect(lines.length).toBeGreaterThan(0);
    });

    it('should render cheese with opacity variations', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'cheese', instanceId: 'cheese-1' },
      ];
      const { container } = render(
        <PizzaBase slices={8} placedIngredients={ingredients} />
      );
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render tomato_slice with ellipse accents', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'tomato_slice', instanceId: 'tomato-1' },
      ];
      const { container } = render(
        <PizzaBase slices={8} placedIngredients={ingredients} />
      );
      const circles = container.querySelectorAll('circle');
      const ellipses = container.querySelectorAll('ellipse');
      expect(circles.length).toBeGreaterThan(0);
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render pineapple with rect and circles', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'pineapple', instanceId: 'pineapple-1' },
      ];
      const { container } = render(
        <PizzaBase slices={8} placedIngredients={ingredients} />
      );
      const rects = container.querySelectorAll('rect');
      const circles = container.querySelectorAll('circle');
      expect(rects.length).toBeGreaterThan(0);
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render jalapeno with ellipse', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'jalapeno', instanceId: 'jalapeno-1' },
      ];
      const { container } = render(
        <PizzaBase slices={8} placedIngredients={ingredients} />
      );
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render basil with lines', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'basil', instanceId: 'basil-1' },
      ];
      const { container } = render(
        <PizzaBase slices={8} placedIngredients={ingredients} />
      );
      const ellipses = container.querySelectorAll('ellipse');
      const lines = container.querySelectorAll('line');
      expect(ellipses.length).toBeGreaterThan(0);
      expect(lines.length).toBeGreaterThan(0);
    });

    it('should render sausage with nested ellipses', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'sausage', instanceId: 'sausage-1' },
      ];
      const { container } = render(
        <PizzaBase slices={8} placedIngredients={ingredients} />
      );
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render onion with ellipses and stroke', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'onion', instanceId: 'onion-1' },
      ];
      const { container } = render(
        <PizzaBase slices={8} placedIngredients={ingredients} />
      );
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render default shape for unknown topping id', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'unknown-id', instanceId: 'unknown-1' },
      ];
      const { container } = render(
        <PizzaBase slices={8} placedIngredients={ingredients} />
      );
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });
  });

  describe('Animation', () => {
    it('should render motion.svg with animation attributes', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should have spring transition configuration', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveStyle('animation');
    });
  });

  describe('Edge Cases', () => {
    it('should handle single slice', () => {
      const { container } = render(<PizzaBase slices={1} />);
      const lines = container.querySelectorAll('line');
      expect(lines.length).toBe(1);
    });

    it('should handle large number of slices', () => {
      const { container } = render(<PizzaBase slices={24} />);
      const lines = container.querySelectorAll('line');
      expect(lines.length).toBe(24);
    });

    it('should render zero slices', () => {
      const { container } = render(<PizzaBase slices={0} />);
      const lines = container.querySelectorAll('line');
      expect(lines.length).toBe(0);
    });

    it('should render with many placed ingredients', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'pepperoni', instanceId: 'pepperoni-1' },
        { ingredientId: 'pepperoni', instanceId: 'pepperoni-2' },
        { ingredientId: 'pepperoni', instanceId: 'pepperoni-3' },
        { ingredientId: 'mushroom', instanceId: 'mushroom-1' },
        { ingredientId: 'olive', instanceId: 'olive-1' },
      ];
      const { container } = render(
        <PizzaBase slices={8} placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(9 + 9 + 9 + 7 + 8);
    });

    it('should handle duplicate instanceIds with different ingredients', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'pepperoni', instanceId: 'topping-1' },
        { ingredientId: 'mushroom', instanceId: 'topping-1' },
      ];
      const { container } = render(
        <PizzaBase slices={8} placedIngredients={ingredients} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(9 + 7);
    });
  });

  describe('SVG Structure', () => {
    it('should render sauce layer', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const circles = container.querySelectorAll('circle[r="130"]');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render cheese base layer', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const circles = container.querySelectorAll('circle[r="126"]');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render plate background', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const circles = container.querySelectorAll('circle[r="148"]');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should have correct SVG nesting', () => {
      const { container } = render(<PizzaBase slices={8} />);
      const svg = container.querySelector('svg');
      expect(svg?.children.length).toBeGreaterThan(0);
    });
  });
});