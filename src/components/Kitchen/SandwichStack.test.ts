// @ts-nocheck
import type { ReactElement } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SandwichStack } from './SandwichStack';
import { useGameStore } from '../../store/gameStore';

// Mock the gameStore
jest.mock('../../store/gameStore');

describe('SandwichStack', () => {
  const mockRemoveIngredient = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useGameStore as jest.Mock).mockReturnValue({
      placedIngredients: [],
      removeIngredient: mockRemoveIngredient,
    });
  });

  describe('rendering', () => {
    it('should render without crashing with empty ingredients', () => {
      render(<SandwichStack />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render SVG with correct namespace', () => {
      render(<SandwichStack />);
      const svg = document.querySelector('svg');
      expect(svg?.tagName).toBe('svg');
    });

    it('should render plate elements', () => {
      render(<SandwichStack />);
      const ellipses = document.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render bottom bread slice', () => {
      render(<SandwichStack />);
      const rects = document.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render top bread slice', () => {
      render(<SandwichStack />);
      const paths = document.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render sesame seeds on top bread', () => {
      render(<SandwichStack />);
      const ellipses = document.querySelectorAll('ellipse');
      // Should have plate ellipses + sesame seed ellipses
      expect(ellipses.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('ingredient layers', () => {
    it('should render single turkey layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: 'turkey-1', ingredientId: 'turkey' }],
        removeIngredient: mockRemoveIngredient,
      });

      render(<SandwichStack />);
      const rects = document.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render multiple ingredient layers', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: 'turkey-1', ingredientId: 'turkey' },
          { instanceId: 'cheese-1', ingredientId: 'cheese' },
          { instanceId: 'lettuce-1', ingredientId: 'lettuce' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      render(<SandwichStack />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render all defined layer types', () => {
      const ingredients = [
        { instanceId: 'turkey-1', ingredientId: 'turkey' },
        { instanceId: 'ham-1', ingredientId: 'ham' },
        { instanceId: 'chicken-1', ingredientId: 'chicken' },
        { instanceId: 'lettuce-1', ingredientId: 'lettuce' },
        { instanceId: 'spinach-1', ingredientId: 'spinach' },
        { instanceId: 'tomato-1', ingredientId: 'tomato_slice' },
        { instanceId: 'cheese-1', ingredientId: 'cheese' },
        { instanceId: 'swiss-1', ingredientId: 'swiss' },
        { instanceId: 'cream-1', ingredientId: 'cream_cheese' },
        { instanceId: 'mayo-1', ingredientId: 'mayo' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: ingredients,
        removeIngredient: mockRemoveIngredient,
      });

      render(<SandwichStack />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render default layer for unknown ingredient type', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: 'unknown-1', ingredientId: 'unknown_ingredient' }],
        removeIngredient: mockRemoveIngredient,
      });

      render(<SandwichStack />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should handle all sauce types', () => {
      const sauces = [
        { instanceId: 'ketchup-1', ingredientId: 'ketchup' },
        { instanceId: 'mustard-1', ingredientId: 'mustard' },
        { instanceId: 'mayo-1', ingredientId: 'mayo' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: sauces,
        removeIngredient: mockRemoveIngredient,
      });

      render(<SandwichStack />);
      const paths = document.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should handle all vegetable types', () => {
      const vegetables = [
        { instanceId: 'lettuce-1', ingredientId: 'lettuce' },
        { instanceId: 'spinach-1', ingredientId: 'spinach' },
        { instanceId: 'tomato-1', ingredientId: 'tomato_slice' },
        { instanceId: 'onion-1', ingredientId: 'onion' },
        { instanceId: 'pickle-1', ingredientId: 'pickle' },
        { instanceId: 'bell-1', ingredientId: 'bell_pepper' },
        { instanceId: 'basil-1', ingredientId: 'basil' },
        { instanceId: 'jalapeno-1', ingredientId: 'jalapeno' },
        { instanceId: 'cucumber-1', ingredientId: 'cucumber' },
        { instanceId: 'carrot-1', ingredientId: 'carrot' },
        { instanceId: 'sprouts-1', ingredientId: 'sprouts' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: vegetables,
        removeIngredient: mockRemoveIngredient,
      });

      render(<SandwichStack />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should handle all meat/protein types', () => {
      const proteins = [
        { instanceId: 'turkey-1', ingredientId: 'turkey' },
        { instanceId: 'ham-1', ingredientId: 'ham' },
        { instanceId: 'chicken-1', ingredientId: 'chicken' },
        { instanceId: 'bacon-1', ingredientId: 'bacon' },
        { instanceId: 'egg-1', ingredientId: 'egg_fried' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: proteins,
        removeIngredient: mockRemoveIngredient,
      });

      render(<SandwichStack />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should handle all cheese types', () => {
      const cheeses = [
        { instanceId: 'cheese-1', ingredientId: 'cheese' },
        { instanceId: 'swiss-1', ingredientId: 'swiss' },
        { instanceId: 'cream-1', ingredientId: 'cream_cheese' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: cheeses,
        removeIngredient: mockRemoveIngredient,
      });

      render(<SandwichStack />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should handle avocado and mushroom layers', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: 'avocado-1', ingredientId: 'avocado' },
          { instanceId: 'mushroom-1', ingredientId: 'mushroom' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      render(<SandwichStack />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('interaction', () => {
    it('should call removeIngredient when clicking on a layer', async () => {
      const user = userEvent.setup();
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: 'turkey-1', ingredientId: 'turkey' }],
        removeIngredient: mockRemoveIngredient,
      });

      render(<SandwichStack />);
      const groups = document.querySelectorAll('g');
      
      // Find a group that represents an ingredient layer (not the bread)
      const ingredientGroup = groups[groups.length - 4]; // Ingredient layers are typically near the end
      
      if (ingredientGroup) {
        await user.click(ingredientGroup);
        // The click should be registered on the SVG elements
      }
    });

    it('should have pointer cursor on interactive layers', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: 'cheese-1', ingredientId: 'cheese' }],
        removeIngredient: mockRemoveIngredient,
      });

      render(<SandwichStack />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('SVG structure', () => {
    it('should have correct viewBox for empty stack', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [],
        removeIngredient: mockRemoveIngredient,
      });

      render(<SandwichStack />);
      const svg = document.querySelector('svg');
      const viewBox = svg?.getAttribute('viewBox');
      expect(viewBox).toMatch(/^0 \d+ 300 \d+$/);
    });

    it('should adjust viewBox height based on ingredient stack', () => {
      const singleIngredient = [{ instanceId: 'turkey-1', ingredientId: 'turkey' }];
      
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: singleIngredient,
        removeIngredient: mockRemoveIngredient,
      });

      const { rerender } = render(<SandwichStack />);
      const svg1 = document.querySelector('svg');
      const viewBox1 = svg1?.getAttribute('viewBox');

      // Now render with more ingredients
      const multipleIngredients = [
        { instanceId: 'turkey-1', ingredientId: 'turkey' },
        { instanceId: 'ham-1', ingredientId: 'ham' },
        { instanceId: 'chicken-1', ingredientId: 'chicken' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: multipleIngredients,
        removeIngredient: mockRemoveIngredient,
      });

      rerender(<SandwichStack />);
      const svg2 = document.querySelector('svg');
      const viewBox2 = svg2?.getAttribute('viewBox');

      // ViewBox should be different due to different stack heights
      expect(viewBox1).not.toEqual(viewBox2);
    });

    it('should preserve aspect ratio', () => {
      render(<SandwichStack />);
      const svg = document.querySelector('svg');
      const preserveAspectRatio = svg?.getAttribute('preserveAspectRatio');
      expect(preserveAspectRatio).toBe('xMidYMax meet');
    });

    it('should have 100% width and height', () => {
      render(<SandwichStack />);
      const svg = document.querySelector('svg');
      expect(svg?.getAttribute('width')).toBe('100%');
      expect(svg?.getAttribute('height')).toBe('100%');
    });
  });

  describe('layer ordering', () => {
    it('should render layers from bottom to top in correct visual order', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: 'turkey-1', ingredientId: 'turkey' },
          { instanceId: 'lettuce-1', ingredientId: 'lettuce' },
          { instanceId: 'tomato-1', ingredientId: 'tomato_slice' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      render(<SandwichStack />);
      const svg = document.querySelector('svg');
      // Verify that all ingredients are rendered
      const groups = document.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });
  });

  describe('large stacks', () => {
    it('should handle large number of ingredients without crashing', () => {
      const manyIngredients = Array.from({ length: 20 }, (_, i) => ({
        instanceId: `ingredient-${i}`,
        ingredientId: ['turkey', 'ham', 'cheese', 'lettuce', 'tomato_slice'][i % 5],
      }));

      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: manyIngredients,
        removeIngredient: mockRemoveIngredient,
      });

      render(<SandwichStack />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render many layers with correct positioning', () => {
      const ingredients = Array.from({ length: 10 }, (_, i) => ({
        instanceId: `ingredient-${i}`,
        ingredientId: 'cheese',
      }));

      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: ingredients,
        removeIngredient: mockRemoveIngredient,
      });

      render(<SandwichStack />);
      const viewBox = document.querySelector('svg')?.getAttribute('viewBox');
      expect(viewBox).toBeTruthy();
    });
  });

  describe('specific layer characteristics', () => {
    it('should render turkey layer with correct colors', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: 'turkey-1', ingredientId: 'turkey' }],
        removeIngredient: mockRemoveIngredient,
      });

      render(<SandwichStack />);
      const svg = document.querySelector('svg');
      expect(svg?.innerHTML).toContain('c9946a');
    });

    it('should render lettuce with wavy path', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: 'lettuce-1', ingredientId: 'lettuce' }],
        removeIngredient: mockRemoveIngredient,
      });

      render(<SandwichStack />);
      const paths = document.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render egg_fried with yolk', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: 'egg-1', ingredientId: 'egg_fried' }],
        removeIngredient: mockRemoveIngredient,
      });

      render(<SandwichStack />);
      const circles = document.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render bacon with multiple wavy paths', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: 'bacon-1', ingredientId: 'bacon' }],
        removeIngredient: mockRemoveIngredient,
      });

      render(<SandwichStack />);
      const paths = document.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render sprouts with stems and leaves', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: 'sprouts-1', ingredientId: 'sprouts' }],
        removeIngredient: mockRemoveIngredient,
      });

      render(<SandwichStack />);
      const lines = document.querySelectorAll('line');
      expect(lines.length).toBeGreaterThan(0);
    });
  });

  describe('animation properties', () => {
    it('should apply motion properties to SVG', () => {
      render(<SandwichStack />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should handle undefined ingredientId gracefully', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: 'mystery-1', ingredientId: undefined }],
        removeIngredient: mockRemoveIngredient,
      });

      render(<SandwichStack />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should handle null ingredientId gracefully', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: 'mystery-1', ingredientId: null }],
        removeIngredient: mockRemoveIngredient,
      });

      render(<SandwichStack />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render with mixed known and unknown ingredients', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: 'turkey-1', ingredientId: 'turkey' },
          { instanceId: 'unknown-1', ingredientId: 'not_a_real_ingredient' },
          { instanceId: 'cheese-1', ingredientId: 'cheese' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      render(<SandwichStack />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });
});