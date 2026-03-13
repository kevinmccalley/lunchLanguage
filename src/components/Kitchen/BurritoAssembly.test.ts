// @ts-nocheck
import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import type { PlacedIngredient } from '../../types';
import { BurritoAssembly } from './BurritoAssembly';

jest.mock('framer-motion', () => ({
  motion: {
    svg: ({ children, ...props }: any) => <svg {...props}>{children}</svg>,
    g: ({ children, ...props }: any) => <g {...props}>{children}</g>,
  },
}));

describe('BurritoAssembly', () => {
  describe('Component rendering', () => {
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

    it('should render tortilla base', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      const ellipses = Array.from(container.querySelectorAll('ellipse'));
      const tortillaEllipse = ellipses.find(el => el.getAttribute('fill') === '#f5deb3');
      expect(tortillaEllipse).toBeDefined();
    });

    it('should render char spots on tortilla', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      const charEllipses = Array.from(container.querySelectorAll('ellipse')).filter(
        el => el.getAttribute('fill') === '#c9914a'
      );
      expect(charEllipses.length).toBe(7);
    });

    it('should render fold score lines', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });
  });

  describe('Ingredient rendering', () => {
    it('should render no ingredients when placedIngredients is empty', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      // Only fold flaps and wrapped burrito groups, no ingredient groups
      const ingredientGroups = Array.from(groups).filter(
        g => g.getAttribute('transform')?.includes('translate')
      );
      expect(ingredientGroups.length).toBe(0);
    });

    it('should render ingredients with correct FILL_COUNT for rice', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      const ingredientGroups = Array.from(groups).filter(
        g => g.getAttribute('transform')?.includes('translate')
      );
      expect(ingredientGroups.length).toBe(18);
    });

    it('should render ingredients with correct FILL_COUNT for beans', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'beans', instanceId: 'beans-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      const ingredientGroups = Array.from(groups).filter(
        g => g.getAttribute('transform')?.includes('translate')
      );
      expect(ingredientGroups.length).toBe(12);
    });

    it('should render ingredients with correct FILL_COUNT for corn', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'corn', instanceId: 'corn-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      const ingredientGroups = Array.from(groups).filter(
        g => g.getAttribute('transform')?.includes('translate')
      );
      expect(ingredientGroups.length).toBe(22);
    });

    it('should render ingredients with correct FILL_COUNT for cheese', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'cheese', instanceId: 'cheese-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      const ingredientGroups = Array.from(groups).filter(
        g => g.getAttribute('transform')?.includes('translate')
      );
      expect(ingredientGroups.length).toBe(14);
    });

    it('should render multiple ingredient instances', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1' },
        { ingredientId: 'beans', instanceId: 'beans-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      const ingredientGroups = Array.from(groups).filter(
        g => g.getAttribute('transform')?.includes('translate')
      );
      // 18 for rice + 12 for beans
      expect(ingredientGroups.length).toBe(30);
    });

    it('should use default FILL_COUNT of 8 for unknown ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'unknown_ingredient', instanceId: 'unknown-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      const ingredientGroups = Array.from(groups).filter(
        g => g.getAttribute('transform')?.includes('translate')
      );
      expect(ingredientGroups.length).toBe(8);
    });

    it('should render sour_cream ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'sour_cream', instanceId: 'sour_cream-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      const ingredientGroups = Array.from(groups).filter(
        g => g.getAttribute('transform')?.includes('translate')
      );
      expect(ingredientGroups.length).toBe(7);
    });

    it('should render guacamole ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'guacamole', instanceId: 'guac-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      const ingredientGroups = Array.from(groups).filter(
        g => g.getAttribute('transform')?.includes('translate')
      );
      expect(ingredientGroups.length).toBe(9);
    });

    it('should render salsa ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'salsa', instanceId: 'salsa-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      const ingredientGroups = Array.from(groups).filter(
        g => g.getAttribute('transform')?.includes('translate')
      );
      expect(ingredientGroups.length).toBe(10);
    });

    it('should render chicken ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'chicken', instanceId: 'chicken-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      const ingredientGroups = Array.from(groups).filter(
        g => g.getAttribute('transform')?.includes('translate')
      );
      expect(ingredientGroups.length).toBe(9);
    });

    it('should render steak ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'steak', instanceId: 'steak-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      const ingredientGroups = Array.from(groups).filter(
        g => g.getAttribute('transform')?.includes('translate')
      );
      expect(ingredientGroups.length).toBe(9);
    });

    it('should render lettuce ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'lettuce', instanceId: 'lettuce-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      const ingredientGroups = Array.from(groups).filter(
        g => g.getAttribute('transform')?.includes('translate')
      );
      expect(ingredientGroups.length).toBe(12);
    });

    it('should render bell_pepper ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'bell_pepper', instanceId: 'pepper-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      const ingredientGroups = Array.from(groups).filter(
        g => g.getAttribute('transform')?.includes('translate')
      );
      expect(ingredientGroups.length).toBe(9);
    });

    it('should render jalapeno ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'jalapeno', instanceId: 'jalapeno-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      const ingredientGroups = Array.from(groups).filter(
        g => g.getAttribute('transform')?.includes('translate')
      );
      expect(ingredientGroups.length).toBe(9);
    });

    it('should render onion ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'onion', instanceId: 'onion-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      const ingredientGroups = Array.from(groups).filter(
        g => g.getAttribute('transform')?.includes('translate')
      );
      expect(ingredientGroups.length).toBe(8);
    });

    it('should render avocado ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'avocado', instanceId: 'avocado-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      const ingredientGroups = Array.from(groups).filter(
        g => g.getAttribute('transform')?.includes('translate')
      );
      expect(ingredientGroups.length).toBe(8);
    });

    it('should apply transforms with consistent positioning and rotation', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = container.querySelectorAll('g');
      const ingredientGroups = Array.from(groups).filter(
        g => g.getAttribute('transform')?.includes('translate')
      );
      
      ingredientGroups.forEach(group => {
        const transform = group.getAttribute('transform');
        expect(transform).toMatch(/translate\(\d+\.?\d* \d+\.?\d*\) rotate\(\d+\.?\d*\)/);
      });
    });
  });

  describe('Wrapping animation state', () => {
    it('should show ingredients when wrapping is false', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = Array.from(container.querySelectorAll('g')).filter(
        g => g.getAttribute('transform')?.includes('translate')
      );
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render with wrapping true', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={true} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render without crashing with empty ingredients and wrapping true', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={true} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render without crashing with empty ingredients and wrapping false', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('BurritoFilling component variants', () => {
    it('should render rice with correct fill color', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const ellipses = Array.from(container.querySelectorAll('ellipse')).filter(
        el => el.getAttribute('fill') === '#f8f8ed'
      );
      expect(ellipses.length).toBe(18);
    });

    it('should render beans with multiple elements', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'beans', instanceId: 'beans-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const darkEllipses = Array.from(container.querySelectorAll('ellipse')).filter(
        el => el.getAttribute('fill') === '#3d2b1f'
      );
      expect(darkEllipses.length).toBeGreaterThan(0);
    });

    it('should render corn with circles', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'corn', instanceId: 'corn-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const yellowCircles = Array.from(container.querySelectorAll('circle')).filter(
        el => el.getAttribute('fill') === '#f5c518'
      );
      expect(yellowCircles.length).toBe(22);
    });

    it('should render salsa with multiple colored circles', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'salsa', instanceId: 'salsa-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const circles = Array.from(container.querySelectorAll('circle'));
      const salsaCircles = circles.filter(
        el => ['#b83224', '#e74c3c', '#e8623a', '#f0d060'].includes(el.getAttribute('fill') || '')
      );
      expect(salsaCircles.length).toBeGreaterThan(0);
    });

    it('should render chicken with lines', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'chicken', instanceId: 'chicken-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const lines = Array.from(container.querySelectorAll('line')).filter(
        el => el.getAttribute('stroke') === '#b8893a'
      );
      expect(lines.length).toBeGreaterThan(0);
    });

    it('should render cheese with rectangles', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'cheese', instanceId: 'cheese-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const rects = Array.from(container.querySelectorAll('rect'));
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render jalapeno with multiple circles', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'jalapeno', instanceId: 'jalapeno-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const circles = Array.from(container.querySelectorAll('circle')).filter(
        el => el.getAttribute('fill') === '#1b5e20'
      );
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render default filling for unknown ingredient id', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'unknown_id_xyz', instanceId: 'unknown-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const greyCircles = Array.from(container.querySelectorAll('circle')).filter(
        el => el.getAttribute('fill') === '#888'
      );
      expect(greyCircles.length).toBe(8);
    });
  });

  describe('Edge cases and special scenarios', () => {
    it('should handle large number of placed ingredients', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1' },
        { ingredientId: 'rice', instanceId: 'rice-2' },
        { ingredientId: 'beans', instanceId: 'beans-1' },
        { ingredientId: 'corn', instanceId: 'corn-1' },
        { ingredientId: 'salsa', instanceId: 'salsa-1' },
      ];
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups = Array.from(container.querySelectorAll('g')).filter(
        g => g.getAttribute('transform')?.includes('translate')
      );
      // 18 + 18 + 12 + 22 + 10 = 80
      expect(groups.length).toBe(80);
    });

    it('should render all standard ingredients', () => {
      const allIngredients = [
        'rice', 'beans', 'corn', 'sour_cream', 'guacamole', 'salsa',
        'chicken', 'steak', 'cheese', 'lettuce', 'bell_pepper',
        'jalapeno', 'onion', 'avocado'
      ];
      const placedIngredients: PlacedIngredient[] = allIngredients.map((id, idx) => ({
        ingredientId: id,
        instanceId: `${id}-${idx}`,
      }));
      const { container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should maintain consistent element keys for same ingredient', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1' },
      ];
      const { container: container1 } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const { container: container2 } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const groups1 = container1.querySelectorAll('g');
      const groups2 = container2.querySelectorAll('g');
      expect(groups1.length).toBe(groups2.length);
    });

    it('should handle wrapping transition from false to true', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'rice-1' },
      ];
      const { rerender, container } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
      
      rerender(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={true} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render plate and fold lines consistently', () => {
      const { container } = render(
        <BurritoAssembly placedIngredients={[]} wrapping={false} />
      );
      const paths = container.querySelectorAll('path');
      // Should have fold score lines and potentially wrapped burrito lines
      expect(paths.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Instance ID consistency', () => {
    it('should use instanceId for deterministic positioning', () => {
      const placedIngredients: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'test-seed-123' },
      ];
      const { container: container1 } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      const { container: container2 } = render(
        <BurritoAssembly placedIngredients={placedIngredients} wrapping={false} />
      );
      
      const groups1 = Array.from(container1.querySelectorAll('g')).filter(
        g => g.getAttribute('transform')?.includes('translate')
      );
      const groups2 = Array.from(container2.querySelectorAll('g')).filter(
        g => g.getAttribute('transform')?.includes('translate')
      );
      
      expect(groups1.length).toBe(groups2.length);
      groups1.forEach((g1, idx) => {
        expect(g1.getAttribute('transform')).toBe(groups2[idx].getAttribute('transform'));
      });
    });

    it('should produce different positions for different instanceIds', () => {
      const ingredient1: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'seed-1' },
      ];
      const ingredient2: PlacedIngredient[] = [
        { ingredientId: 'rice', instanceId: 'seed-2' },
      ];
      
      const { container: container1 } = render(
        <BurritoAssembly placedIngredients={ingredient1} wrapping={false} />
      );
      const { container: container2 } = render(
        <BurritoAssembly placedIngredients={ingredient2} wrapping={false} />
      );
      
      const groups1 = Array.from(container1.querySelectorAll('g')).filter(
        g => g.getAttribute('transform')?.includes('translate')
      )[0];
      const groups2 = Array.from(container2.querySelectorAll('g')).filter(
        g => g.getAttribute('transform')?.includes('translate')
      )[0];
      
      const transform1 = groups1?.getAttribute('transform');
      const transform2 = groups2?.getAttribute('transform');
      
      expect(transform1).not.toBe(transform2);
    });
  });
});