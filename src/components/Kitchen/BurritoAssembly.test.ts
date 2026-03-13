// @ts-nocheck
import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import type { PlacedIngredient } from '../../types';
import { BurritoAssembly } from './BurritoAssembly';

// Mock framer-motion to avoid animation complications in tests
jest.mock('framer-motion', () => ({
  motion: {
    svg: ({ children, ...props }: any) => <svg {...props}>{children}</svg>,
    g: ({ children, ...props }: any) => <g {...props}>{children}</g>,
  },
}));

describe('BurritoAssembly', () => {
  describe('rendering with no ingredients', () => {
    it('should render SVG with correct dimensions', () => {
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

    it('should render tortilla base with char spots', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(2);
    });

    it('should render fold score lines', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });
  });

  describe('rendering with single ingredient', () => {
    it('should render rice ingredient pieces', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render beans ingredient pieces', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'beans', instanceId: 'beans-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render corn ingredient pieces', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'corn', instanceId: 'corn-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render sour_cream ingredient pieces', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'sour_cream', instanceId: 'sour_cream-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render guacamole ingredient pieces', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'guacamole', instanceId: 'guac-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render salsa ingredient pieces', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'salsa', instanceId: 'salsa-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render chicken ingredient pieces', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'chicken', instanceId: 'chicken-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render steak ingredient pieces', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'steak', instanceId: 'steak-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render cheese ingredient pieces', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'cheese', instanceId: 'cheese-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render lettuce ingredient pieces', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'lettuce', instanceId: 'lettuce-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render bell_pepper ingredient pieces', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'bell_pepper', instanceId: 'pepper-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render jalapeno ingredient pieces', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'jalapeno', instanceId: 'jalapeno-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render onion ingredient pieces', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'onion', instanceId: 'onion-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render avocado ingredient pieces', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'avocado', instanceId: 'avocado-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render unknown ingredient with fallback style', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'unknown_ingredient', instanceId: 'unknown-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });
  });

  describe('rendering with multiple ingredients', () => {
    it('should render multiple ingredient types together', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1', quantity: 1 },
        { ingredientId: 'beans', instanceId: 'beans-1', quantity: 1 },
        { ingredientId: 'cheese', instanceId: 'cheese-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(3);
    });

    it('should render multiple instances of same ingredient', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1', quantity: 1 },
        { ingredientId: 'rice', instanceId: 'rice-2', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(15);
    });

    it('should render correct number of pieces for each ingredient type', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(18);
    });

    it('should render correct number of pieces for beans', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'beans', instanceId: 'beans-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(12);
    });

    it('should render correct number of pieces for corn', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'corn', instanceId: 'corn-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(22);
    });
  });

  describe('wrapping state transitions', () => {
    it('should render with wrapping false initially', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render with wrapping true', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={true} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should handle toggling wrapping state', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1', quantity: 1 },
      ];
      const { rerender } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      rerender(
        <BurritoAssembly placedIngredients={ingredients} wrapping={true} />
      );
      rerender(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
    });
  });

  describe('ingredient fill count mapping', () => {
    it('should use default fill count for unknown ingredient', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'unknown', instanceId: 'unknown-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(8);
    });

    it('should render sour_cream with correct piece count', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'sour_cream', instanceId: 'sc-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(7);
    });

    it('should render guacamole with correct piece count', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'guacamole', instanceId: 'guac-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(9);
    });

    it('should render salsa with correct piece count', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'salsa', instanceId: 'salsa-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(10);
    });

    it('should render chicken with correct piece count', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'chicken', instanceId: 'chicken-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(9);
    });

    it('should render steak with correct piece count', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'steak', instanceId: 'steak-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(9);
    });

    it('should render cheese with correct piece count', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'cheese', instanceId: 'cheese-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(14);
    });

    it('should render lettuce with correct piece count', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'lettuce', instanceId: 'lettuce-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(12);
    });

    it('should render bell_pepper with correct piece count', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'bell_pepper', instanceId: 'pepper-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(9);
    });

    it('should render jalapeno with correct piece count', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'jalapeno', instanceId: 'jalapeno-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(9);
    });

    it('should render onion with correct piece count', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'onion', instanceId: 'onion-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(8);
    });

    it('should render avocado with correct piece count', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'avocado', instanceId: 'avocado-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(8);
    });
  });

  describe('element positioning and transforms', () => {
    it('should apply transform to ingredient groups', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g[transform]');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should include rotation in transforms', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g[transform*="rotate"]');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should include translation in transforms', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g[transform*="translate"]');
      expect(groups.length).toBeGreaterThan(0);
    });
  });

  describe('plate and tortilla rendering', () => {
    it('should render plate shadow ellipse', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse[cx="150"][cy="258"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render main tortilla ellipse', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse[cy="135"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render char spots on tortilla', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse[fill="#c9914a"]');
      expect(ellipses.length).toBe(7);
    });

    it('should render fold score lines', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      const paths = container.querySelectorAll('path[stroke="#d4a96a"]');
      expect(paths.length).toBe(2);
    });
  });

  describe('complex ingredient scenarios', () => {
    it('should render all ingredient types simultaneously', () => {
      const allIngredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1', quantity: 1 },
        { ingredientId: 'beans', instanceId: 'beans-1', quantity: 1 },
        { ingredientId: 'corn', instanceId: 'corn-1', quantity: 1 },
        { ingredientId: 'sour_cream', instanceId: 'sc-1', quantity: 1 },
        { ingredientId: 'guacamole', instanceId: 'guac-1', quantity: 1 },
        { ingredientId: 'salsa', instanceId: 'salsa-1', quantity: 1 },
        { ingredientId: 'chicken', instanceId: 'chicken-1', quantity: 1 },
        { ingredientId: 'steak', instanceId: 'steak-1', quantity: 1 },
        { ingredientId: 'cheese', instanceId: 'cheese-1', quantity: 1 },
        { ingredientId: 'lettuce', instanceId: 'lettuce-1', quantity: 1 },
        { ingredientId: 'bell_pepper', instanceId: 'pepper-1', quantity: 1 },
        { ingredientId: 'jalapeno', instanceId: 'jalapeno-1', quantity: 1 },
        { ingredientId: 'onion', instanceId: 'onion-1', quantity: 1 },
        { ingredientId: 'avocado', instanceId: 'avocado-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={allIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(140);
    });

    it('should handle large number of instances', () => {
      const ingredients: PlacedIngredient[] = Array.from({ length: 10 }, (_, i) => ({
        ingredientId: 'rice',
        instanceId: `rice-${i}`,
        quantity: 1,
      }));
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(180);
    });
  });

  describe('wrapped burrito state', () => {
    it('should render wrapped burrito ellipses', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={true} />
      );
      const ellipses = container.querySelectorAll('ellipse[fill="#f0d49a"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render wrapped burrito roll lines', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={true} />
      );
      const paths = container.querySelectorAll('path[stroke="#c9914a"]');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render filling visible in wrapped burrito', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={true} />
      );
      const fillingEllipses = container.querySelectorAll('ellipse[fill="#b83224"]');
      expect(fillingEllipses.length).toBeGreaterThan(0);
    });

    it('should render wrapped burrito end caps', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={true} />
      );
      const endCapEllipses = container.querySelectorAll('ellipse[cx="28"], ellipse[cx="272"]');
      expect(endCapEllipses.length).toBeGreaterThan(0);
    });

    it('should render wrapped burrito shine effect', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={true} />
      );
      const shineEllipse = container.querySelector('ellipse[cx="108"][cy="106"]');
      expect(shineEllipse).toBeInTheDocument();
    });
  });

  describe('edge cases and prop variations', () => {
    it('should handle empty ingredientId', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: '', instanceId: 'empty-1', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should handle very large instanceId string', () => {
      const longId = 'a'.repeat(1000);
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: longId, quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(18);
    });

    it('should handle special characters in instanceId', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-!@#$%^&*()', quantity: 1 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBe(18);
    });

    it('should maintain stable key attributes for ingredient pieces', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1', quantity: 1 },
      ];
      const { container: container1 } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const { container: container2 } = render(
        <BurritoAssembly placedIngredients={ingredients} wrapping={false} />
      );
      const groups1 = container1.querySelectorAll('g');
      const groups2 = container2.querySelectorAll('g');
      expect(groups1.length).toBe(groups2.length);
    });
  });

  describe('left and right fold flaps', () => {
    it('should render left fold flap when wrapping', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={true} />
      );
      const ellipses = container.querySelectorAll('ellipse[cx="72"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render right fold flap when wrapping', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={true} />
      );
      const ellipses = container.querySelectorAll('ellipse[cx="228"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should hide flaps when not wrapping', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      const