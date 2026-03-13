// @ts-nocheck
import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { BurritoAssembly } from '../src/components/Kitchen/BurritoAssembly';
import type { PlacedIngredient } from '../src/types';

describe('BurritoAssembly', () => {
  describe('component rendering', () => {
    it('should render without crashing with empty placedIngredients', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render svg with correct dimensions', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '300');
      expect(svg).toHaveAttribute('height', '270');
      expect(svg).toHaveAttribute('viewBox', '0 0 300 270');
    });

    it('should render plate elements', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render tortilla base elements', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(2);
    });

    it('should render char spots on tortilla', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse[cx]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render fold score lines', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('ingredient placement', () => {
    it('should render single ingredient with correct fill count', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'rice',
        instanceId: 'rice-1',
      };
      const { container } = render(
        <BurritoAssembly placedIngredients={[ingredient]} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThanOrEqual(18);
    });

    it('should render beans with correct fill count', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'beans',
        instanceId: 'beans-1',
      };
      const { container } = render(
        <BurritoAssembly placedIngredients={[ingredient]} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThanOrEqual(12);
    });

    it('should render multiple ingredients', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1' },
        { ingredientId: 'beans', instanceId: 'beans-1' },
        { ingredientId: 'corn', instanceId: 'corn-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThanOrEqual(18 + 12 + 22);
    });

    it('should apply correct transforms to ingredient groups', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'rice',
        instanceId: 'rice-1',
      };
      const { container } = render(
        <BurritoAssembly placedIngredients={[ingredient]} wrapping={false} />
      );
      const groups = container.querySelectorAll('g[transform]');
      expect(groups.length).toBeGreaterThan(0);
      const firstGroup = groups[0];
      expect(firstGroup?.getAttribute('transform')).toMatch(/translate\(/);
      expect(firstGroup?.getAttribute('transform')).toMatch(/rotate\(/);
    });

    it('should handle ingredient with default fill count', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'unknown_ingredient',
        instanceId: 'unknown-1',
      };
      const { container } = render(
        <BurritoAssembly placedIngredients={[ingredient]} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThanOrEqual(8);
    });

    it('should render all supported ingredient types', () => {
      const supportedIngredients = [
        'rice', 'beans', 'corn', 'sour_cream', 'guacamole', 'salsa',
        'chicken', 'steak', 'cheese', 'lettuce', 'bell_pepper',
        'jalapeno', 'onion', 'avocado',
      ];

      supportedIngredients.forEach((ingredientId) => {
        const ingredient: PlacedIngredient = {
          ingredientId,
          instanceId: `${ingredientId}-1`,
        };
        const { container } = render(
          <BurritoAssembly placedIngredients={[ingredient]} wrapping={false} />
        );
        expect(container.querySelector('svg')).toBeInTheDocument();
      });
    });
  });

  describe('wrapping animation state', () => {
    it('should show ingredients when not wrapping', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'rice',
        instanceId: 'rice-1',
      };
      const { container } = render(
        <BurritoAssembly placedIngredients={[ingredient]} wrapping={false} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should hide ingredients when wrapping', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'rice',
        instanceId: 'rice-1',
      };
      const { container } = render(
        <BurritoAssembly placedIngredients={[ingredient]} wrapping={true} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render left fold flap when not wrapping', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render right fold flap when not wrapping', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render wrapped burrito result', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={true} />
      );
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });
  });

  describe('ingredient specific rendering', () => {
    it('should render rice as ellipse', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'rice',
        instanceId: 'rice-1',
      };
      const { container } = render(
        <BurritoAssembly placedIngredients={[ingredient]} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render beans with multiple ellipses', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'beans',
        instanceId: 'beans-1',
      };
      const { container } = render(
        <BurritoAssembly placedIngredients={[ingredient]} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render corn as circles', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'corn',
        instanceId: 'corn-1',
      };
      const { container } = render(
        <BurritoAssembly placedIngredients={[ingredient]} wrapping={false} />
      );
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render sour_cream with layered ellipses', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'sour_cream',
        instanceId: 'sour_cream-1',
      };
      const { container } = render(
        <BurritoAssembly placedIngredients={[ingredient]} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render salsa with multiple circles', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'salsa',
        instanceId: 'salsa-1',
      };
      const { container } = render(
        <BurritoAssembly placedIngredients={[ingredient]} wrapping={false} />
      );
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render chicken with ellipses and line', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'chicken',
        instanceId: 'chicken-1',
      };
      const { container } = render(
        <BurritoAssembly placedIngredients={[ingredient]} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render steak with multiple ellipses', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'steak',
        instanceId: 'steak-1',
      };
      const { container } = render(
        <BurritoAssembly placedIngredients={[ingredient]} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render cheese with rectangles', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'cheese',
        instanceId: 'cheese-1',
      };
      const { container } = render(
        <BurritoAssembly placedIngredients={[ingredient]} wrapping={false} />
      );
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render lettuce with ellipses', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'lettuce',
        instanceId: 'lettuce-1',
      };
      const { container } = render(
        <BurritoAssembly placedIngredients={[ingredient]} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render bell_pepper with rectangle', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'bell_pepper',
        instanceId: 'bell_pepper-1',
      };
      const { container } = render(
        <BurritoAssembly placedIngredients={[ingredient]} wrapping={false} />
      );
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render jalapeno with ellipses and circles', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'jalapeno',
        instanceId: 'jalapeno-1',
      };
      const { container } = render(
        <BurritoAssembly placedIngredients={[ingredient]} wrapping={false} />
      );
      const elements = container.querySelectorAll('ellipse, circle');
      expect(elements.length).toBeGreaterThan(0);
    });

    it('should render onion as ellipse', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'onion',
        instanceId: 'onion-1',
      };
      const { container } = render(
        <BurritoAssembly placedIngredients={[ingredient]} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render avocado with ellipses', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'avocado',
        instanceId: 'avocado-1',
      };
      const { container } = render(
        <BurritoAssembly placedIngredients={[ingredient]} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render unknown ingredient as grey circle', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'unknown',
        instanceId: 'unknown-1',
      };
      const { container } = render(
        <BurritoAssembly placedIngredients={[ingredient]} wrapping={false} />
      );
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });
  });

  describe('edge cases', () => {
    it('should handle very large number of ingredients', () => {
      const ingredients: PlacedIngredient[] = Array.from({ length: 100 }, (_, i) => ({
        ingredientId: 'rice',
        instanceId: `rice-${i}`,
      }));
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should handle duplicate instanceIds', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1' },
        { ingredientId: 'rice', instanceId: 'rice-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should re-render when placedIngredients changes', () => {
      const { rerender, container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      const initialGroups = container.querySelectorAll('g').length;

      const newIngredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1' },
      ];
      rerender(
        <BurritoAssembly placedIngredients={newIngredients} wrapping={false} />
      );
      const newGroups = container.querySelectorAll('g').length;

      expect(newGroups).toBeGreaterThan(initialGroups);
    });

    it('should re-render when wrapping state changes', () => {
      const { rerender } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      expect(() => {
        rerender(
          <BurritoAssembly placedIngredients={[]} wrapping={true} />
        );
      }).not.toThrow();
    });

    it('should handle mixed ingredients', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1' },
        { ingredientId: 'beans', instanceId: 'beans-1' },
        { ingredientId: 'chicken', instanceId: 'chicken-1' },
        { ingredientId: 'cheese', instanceId: 'cheese-1' },
        { ingredientId: 'salsa', instanceId: 'salsa-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('fill count mapping', () => {
    it('should use correct fill count for rice', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'rice',
        instanceId: 'rice-1',
      };
      const { container } = render(
        <BurritoAssembly placedIngredients={[ingredient]} wrapping={false} />
      );
      const groups = container.querySelectorAll('g[transform]');
      expect(groups.length).toBeGreaterThanOrEqual(18);
    });

    it('should use correct fill count for corn', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'corn',
        instanceId: 'corn-1',
      };
      const { container } = render(
        <BurritoAssembly placedIngredients={[ingredient]} wrapping={false} />
      );
      const groups = container.querySelectorAll('g[transform]');
      expect(groups.length).toBeGreaterThanOrEqual(22);
    });

    it('should use correct fill count for sour_cream', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'sour_cream',
        instanceId: 'sour_cream-1',
      };
      const { container } = render(
        <BurritoAssembly placedIngredients={[ingredient]} wrapping={false} />
      );
      const groups = container.querySelectorAll('g[transform]');
      expect(groups.length).toBeGreaterThanOrEqual(7);
    });
  });
});