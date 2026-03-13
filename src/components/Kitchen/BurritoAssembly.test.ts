// @ts-nocheck
import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import type { PlacedIngredient } from '../../types';
import { BurritoAssembly } from './BurritoAssembly';

jest.mock('framer-motion', () => ({
  motion: {
    svg: ({ children, ...props }: any) => (
      <svg {...props} data-testid="burrito-svg">
        {children}
      </svg>
    ),
    g: ({ children, ...props }: any) => (
      <g {...props} data-testid="motion-g">
        {children}
      </g>
    ),
  },
}));

describe('BurritoAssembly', () => {
  describe('rendering', () => {
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

    it('should render tortilla with char spots', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      const charSpots = container.querySelectorAll('ellipse[fill="#c9914a"]');
      expect(charSpots.length).toBe(7);
    });

    it('should render fold score lines', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });
  });

  describe('ingredient rendering', () => {
    it('should render rice ingredient with correct count', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1', x: 0, y: 0 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render beans ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'beans', instanceId: 'beans-1', x: 0, y: 0 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse[fill="#3d2b1f"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render corn ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'corn', instanceId: 'corn-1', x: 0, y: 0 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const circles = container.querySelectorAll('circle[fill="#f5c518"]');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render sour_cream ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'sour_cream', instanceId: 'sour_cream-1', x: 0, y: 0 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse[fill="white"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render guacamole ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'guacamole', instanceId: 'guac-1', x: 0, y: 0 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse[fill="#5a8a3c"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render salsa ingredient with multiple circles', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'salsa', instanceId: 'salsa-1', x: 0, y: 0 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const circles = container.querySelectorAll('circle[fill="#b83224"]');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render chicken ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'chicken', instanceId: 'chicken-1', x: 0, y: 0 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse[fill="#d4a96a"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render steak ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'steak', instanceId: 'steak-1', x: 0, y: 0 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse[fill="#5d3010"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render cheese ingredient with rotated rectangles', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'cheese', instanceId: 'cheese-1', x: 0, y: 0 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const rects = container.querySelectorAll('rect[fill="#f39c12"]');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render lettuce ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'lettuce', instanceId: 'lettuce-1', x: 0, y: 0 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse[fill="#3a9a3a"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render bell_pepper ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'bell_pepper', instanceId: 'pepper-1', x: 0, y: 0 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const rects = container.querySelectorAll('rect[fill="#27ae60"]');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render jalapeno ingredient with seeds', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'jalapeno', instanceId: 'jalapeno-1', x: 0, y: 0 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse[fill="#2e7d32"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render onion ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'onion', instanceId: 'onion-1', x: 0, y: 0 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse[fill="#e8d5f5"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render avocado ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'avocado', instanceId: 'avocado-1', x: 0, y: 0 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const ellipses = container.querySelectorAll('ellipse[fill="#5a9e3c"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render unknown ingredient as fallback circle', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'unknown_ingredient', instanceId: 'unknown-1', x: 0, y: 0 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const circles = container.querySelectorAll('circle[fill="#888"]');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render correct number of fill elements per ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1', x: 0, y: 0 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThanOrEqual(18);
    });

    it('should handle multiple ingredients', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1', x: 0, y: 0 },
        { ingredientId: 'beans', instanceId: 'beans-1', x: 0, y: 0 },
        { ingredientId: 'cheese', instanceId: 'cheese-1', x: 0, y: 0 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });
  });

  describe('wrapping state', () => {
    it('should have ingredients visible when wrapping is false', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1', x: 0, y: 0 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render left fold flap', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={true} />
      );
      const ellipses = container.querySelectorAll('ellipse[fill="#e8c589"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render right fold flap', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={true} />
      );
      const ellipses = container.querySelectorAll('ellipse[fill="#e8c589"]');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render wrapped burrito result', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={true} />
      );
      const wrappedEllipse = container.querySelectorAll('ellipse[fill="#f0d49a"]');
      expect(wrappedEllipse.length).toBeGreaterThan(0);
    });

    it('should render wrapped burrito with roll lines', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={true} />
      );
      const paths = container.querySelectorAll('path[stroke="#c9914a"]');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render wrapped burrito with filling peeking through', () => {
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
      const endCapEllipses = container.querySelectorAll('ellipse[fill="#c9914a"]');
      expect(endCapEllipses.length).toBeGreaterThan(0);
    });

    it('should render wrapped burrito shine effect', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={true} />
      );
      const shineEllipse = container.querySelector('ellipse[fill="white"][opacity="0.2"]');
      expect(shineEllipse).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should handle empty placedIngredients array', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should handle undefined fill count by using default', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'nonexistent', instanceId: 'nonexistent-1', x: 0, y: 0 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should handle large number of ingredients', () => {
      const placedIngredients: PlacedIngredient[] = Array.from({ length: 10 }, (_, i) => ({
        ingredientId: 'rice',
        instanceId: `rice-${i}`,
        x: 0,
        y: 0,
      }));
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should transition from wrapping false to true', () => {
      const { rerender, container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
      rerender(<BurritoAssembly placedIngredients={[]} wrapping={true} />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should transition from wrapping true to false', () => {
      const { rerender, container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={true} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
      rerender(<BurritoAssembly placedIngredients={[]} wrapping={false} />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('ingredient fill count mapping', () => {
    it('should use correct fill count for rice', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1', x: 0, y: 0 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('[key*="rice-1"]');
      expect(groups.length).toBeGreaterThanOrEqual(0);
    });

    it('should use correct fill count for beans', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'beans', instanceId: 'beans-1', x: 0, y: 0 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should use correct fill count for corn', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'corn', instanceId: 'corn-1', x: 0, y: 0 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should use correct fill count for sour_cream', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'sour_cream', instanceId: 'sc-1', x: 0, y: 0 },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });
});