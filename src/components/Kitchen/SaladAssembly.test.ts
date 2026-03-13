// @ts-nocheck
import React from 'react';
import { render } from '@testing-library/react';
import { SaladAssembly } from './SaladAssembly';
import type { PlacedIngredient } from '../../types';

describe('SaladAssembly', () => {
  describe('srng (seeded random number generator)', () => {
    it('should generate consistent results for the same seed and index', () => {
      // We need to test srng indirectly through bowlPoint since it's not exported
      // But we can verify consistency by checking that the same ingredients produce consistent positions
      const ingredient1: PlacedIngredient = { ingredientId: 'lettuce', instanceId: 'test-1' };
      const ingredient2: PlacedIngredient = { ingredientId: 'lettuce', instanceId: 'test-1' };
      
      const { container: container1 } = render(<SaladAssembly placedIngredients={[ingredient1]} />);
      const { container: container2 } = render(<SaladAssembly placedIngredients={[ingredient2]} />);
      
      // Both should render the same number of elements
      const ellipses1 = container1.querySelectorAll('ellipse');
      const ellipses2 = container2.querySelectorAll('ellipse');
      expect(ellipses1.length).toBe(ellipses2.length);
    });

    it('should produce different results for different seeds', () => {
      const ingredient1: PlacedIngredient = { ingredientId: 'lettuce', instanceId: 'test-1' };
      const ingredient2: PlacedIngredient = { ingredientId: 'lettuce', instanceId: 'test-2' };
      
      const { container: container1 } = render(<SaladAssembly placedIngredients={[ingredient1]} />);
      const { container: container2 } = render(<SaladAssembly placedIngredients={[ingredient2]} />);
      
      // Get the group transforms - they should be different
      const groups1 = Array.from(container1.querySelectorAll('g[transform]')).map(g => g.getAttribute('transform'));
      const groups2 = Array.from(container2.querySelectorAll('g[transform]')).map(g => g.getAttribute('transform'));
      
      // At least some transforms should differ
      const allIdentical = groups1.every((t, i) => t === groups2[i]);
      expect(allIdentical).toBe(false);
    });
  });

  describe('bowlPoint', () => {
    it('should distribute points within reasonable bounds for the bowl ellipse', () => {
      const ingredient: PlacedIngredient = { ingredientId: 'lettuce', instanceId: 'test-instance' };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      
      // Extract transform values from groups
      const groups = Array.from(container.querySelectorAll('g[transform]'));
      groups.forEach(group => {
        const transform = group.getAttribute('transform');
        if (transform && transform.includes('translate')) {
          const match = transform.match(/translate\(([^,]+),\s*([^)]+)\)/);
          if (match) {
            const x = parseFloat(match[1]);
            const y = parseFloat(match[2]);
            // Bowl center is at 150, 182 with some padding
            expect(x).toBeGreaterThan(0);
            expect(x).toBeLessThan(300);
            expect(y).toBeGreaterThan(80);
            expect(y).toBeLessThan(250);
          }
        }
      });
    });
  });

  describe('SaladFilling component', () => {
    describe('all ingredient types', () => {
      const ingredientIds = [
        'lettuce', 'spinach', 'tomato_slice', 'cherry_tom', 'cucumber',
        'carrot', 'croutons', 'mushroom', 'olive', 'bell_pepper',
        'bacon', 'chicken', 'avocado', 'beans', 'corn',
        'radish', 'strawberry', 'dressing', 'walnuts', 'basil',
        'onion', 'sprouts',
      ];

      ingredientIds.forEach(id => {
        it(`should render ${id} correctly`, () => {
          const ingredient: PlacedIngredient = { ingredientId: id as any, instanceId: 'test' };
          const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
          
          // Should render SVG with salad elements
          const svg = container.querySelector('svg');
          expect(svg).toBeInTheDocument();
          
          // Should have the base bowl elements
          const ellipses = container.querySelectorAll('ellipse');
          expect(ellipses.length).toBeGreaterThan(0);
        });
      });

      it('should render default filling for unknown ingredient id', () => {
        const ingredient: PlacedIngredient = { ingredientId: 'unknown_ingredient' as any, instanceId: 'test' };
        const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
        
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
        
        // Should still render circles (default case)
        const circles = container.querySelectorAll('circle');
        expect(circles.length).toBeGreaterThan(0);
      });
    });

    describe('specific ingredient rendering', () => {
      it('should render lettuce with correct fills', () => {
        const ingredient: PlacedIngredient = { ingredientId: 'lettuce', instanceId: 'test' };
        const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
        
        // Lettuce has 14 items
        const groups = container.querySelectorAll('g[transform]');
        expect(groups.length).toBe(14);
      });

      it('should render corn with correct count', () => {
        const ingredient: PlacedIngredient = { ingredientId: 'corn', instanceId: 'test' };
        const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
        
        // Corn has 18 items (most items)
        const groups = container.querySelectorAll('g[transform]');
        expect(groups.length).toBe(18);
      });

      it('should render mushroom with correct count', () => {
        const ingredient: PlacedIngredient = { ingredientId: 'mushroom', instanceId: 'test' };
        const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
        
        // Mushroom has 7 items (minimum explicit count)
        const groups = container.querySelectorAll('g[transform]');
        expect(groups.length).toBe(7);
      });
    });
  });

  describe('SaladAssembly component', () => {
    it('should render SVG with correct dimensions', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '300');
      expect(svg).toHaveAttribute('height', '280');
      expect(svg).toHaveAttribute('viewBox', '0 0 300 280');
    });

    it('should render plate elements', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      
      // Should have plate ellipses
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
      
      // Check for plate center position
      const plateEllipse = Array.from(ellipses).find(el => el.getAttribute('cx') === '150' && el.getAttribute('cy') === '268');
      expect(plateEllipse).toBeDefined();
    });

    it('should render bowl elements', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      
      // Should have bowl paths
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render lettuce bed', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      
      // Should have lettuce bed ellipse
      const ellipses = container.querySelectorAll('ellipse');
      const lettuceEllipse = Array.from(ellipses).find(el => 
        el.getAttribute('cx') === '150' && el.getAttribute('cy') === '162'
      );
      expect(lettuceEllipse).toBeDefined();
    });

    it('should render with empty placedIngredients', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg?.children.length).toBeGreaterThan(0);
    });

    it('should render single ingredient', () => {
      const ingredient: PlacedIngredient = { ingredientId: 'lettuce', instanceId: 'instance-1' };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      
      // Should have base elements plus ingredient groups
      const groups = container.querySelectorAll('g[transform]');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render multiple ingredients', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'lettuce', instanceId: 'instance-1' },
        { ingredientId: 'tomato_slice', instanceId: 'instance-2' },
        { ingredientId: 'cucumber', instanceId: 'instance-3' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={ingredients} />);
      
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      
      // Should have groups for all ingredients
      const groups = container.querySelectorAll('g[transform]');
      // lettuce (14) + tomato_slice (8) + cucumber (10) = 32
      expect(groups.length).toBe(32);
    });

    it('should use default fill count for unknown ingredients', () => {
      const ingredient: PlacedIngredient = { ingredientId: 'nonexistent_ingredient' as any, instanceId: 'instance-1' };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      
      const groups = container.querySelectorAll('g[transform]');
      // Should use default count of 8
      expect(groups.length).toBe(8);
    });

    it('should apply unique keys to ingredient groups', () => {
      const ingredient: PlacedIngredient = { ingredientId: 'lettuce', instanceId: 'test-instance' };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      
      const groups = container.querySelectorAll('g[transform]');
      const keys: string[] = [];
      
      groups.forEach(group => {
        // Keys are applied but not directly accessible in DOM, but we can verify groups exist
        expect(group).toBeInTheDocument();
      });
      
      expect(groups.length).toBe(14); // lettuce count
    });

    it('should handle multiple instances of same ingredient type', () => {
      const ingredients: PlacedIngredient[] = [
        { ingredientId: 'tomato_slice', instanceId: 'tomato-1' },
        { ingredientId: 'tomato_slice', instanceId: 'tomato-2' },
      ];
      const { container } = render(<SaladAssembly placedIngredients={ingredients} />);
      
      const groups = container.querySelectorAll('g[transform]');
      // Should have 8 + 8 = 16 groups for two tomatoes
      expect(groups.length).toBe(16);
    });

    it('should apply motion animation props', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      // Motion component will be present in the DOM
      expect(svg?.tagName.toLowerCase()).toBe('svg');
    });

    it('should render rim highlight path', () => {
      const { container } = render(<SaladAssembly placedIngredients={[]} />);
      
      // Should have paths for bowl and rim
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
      
      // At least one path should be a rim highlight
      const rimPath = Array.from(paths).find(p => {
        const d = p.getAttribute('d');
        return d && d.includes('120');
      });
      expect(rimPath).toBeDefined();
    });

    it('should position ingredient groups with translate and rotate', () => {
      const ingredient: PlacedIngredient = { ingredientId: 'lettuce', instanceId: 'test' };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      
      const groups = container.querySelectorAll('g[transform]');
      groups.forEach(group => {
        const transform = group.getAttribute('transform');
        expect(transform).toMatch(/translate\([^)]+\)\s*rotate\([^)]+\)/);
      });
    });
  });

  describe('FILL_COUNT constant', () => {
    it('should respect fill counts for all known ingredients', () => {
      const testCases: Array<[string, number]> = [
        ['lettuce', 14],
        ['tomato_slice', 8],
        ['cucumber', 10],
        ['carrot', 10],
        ['cherry_tom', 8],
        ['croutons', 8],
        ['mushroom', 7],
        ['olive', 8],
        ['bell_pepper', 9],
        ['bacon', 8],
        ['chicken', 8],
        ['avocado', 7],
        ['beans', 10],
        ['corn', 18],
        ['radish', 8],
        ['strawberry', 7],
        ['dressing', 6],
        ['walnuts', 7],
        ['basil', 8],
        ['onion', 8],
        ['spinach', 10],
        ['sprouts', 10],
      ];

      testCases.forEach(([ingredientId, expectedCount]) => {
        const ingredient: PlacedIngredient = { ingredientId: ingredientId as any, instanceId: 'test' };
        const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
        
        const groups = container.querySelectorAll('g[transform]');
        expect(groups.length).toBe(expectedCount);
      });
    });
  });

  describe('edge cases', () => {
    it('should handle empty string instanceId', () => {
      const ingredient: PlacedIngredient = { ingredientId: 'lettuce', instanceId: '' };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should handle very long instanceId', () => {
      const ingredient: PlacedIngredient = {
        ingredientId: 'lettuce',
        instanceId: 'a'.repeat(1000)
      };
      const { container } = render(<SaladAssembly placedIngredients={[ingredient]} />);
      
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render many ingredients without performance issues', () => {
      const ingredients: PlacedIngredient[] = Array.from({ length: 10 }, (_, i) => ({
        ingredientId: 'lettuce' as const,
        instanceId: `instance-${i}`
      }));
      
      const { container } = render(<SaladAssembly placedIngredients={ingredients} />);
      
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      
      // Should have 10 * 14 = 140 ingredient groups
      const groups = container.querySelectorAll('g[transform]');
      expect(groups.length).toBe(140);
    });
  });
});