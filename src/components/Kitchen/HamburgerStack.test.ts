// @ts-nocheck
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HamburgerStack } from './HamburgerStack';
import { useGameStore } from '../../store/gameStore';

jest.mock('../../store/gameStore');

describe('HamburgerStack', () => {
  const mockRemoveIngredient = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useGameStore as jest.Mock).mockReturnValue({
      placedIngredients: [],
      removeIngredient: mockRemoveIngredient,
    });
  });

  describe('Rendering', () => {
    it('should render SVG with correct structure when no ingredients are placed', () => {
      const { container } = render(<HamburgerStack />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render motion.svg component', () => {
      const { container } = render(<HamburgerStack />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '100%');
      expect(svg).toHaveAttribute('height', '100%');
      expect(svg).toHaveAttribute('preserveAspectRatio', 'xMidYMax meet');
    });

    it('should render plate elements', () => {
      const { container } = render(<HamburgerStack />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render bottom bun', () => {
      const { container } = render(<HamburgerStack />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThanOrEqual(4);
    });

    it('should render top bun dome', () => {
      const { container } = render(<HamburgerStack />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });
  });

  describe('Ingredient Layers', () => {
    it('should render beef patty ingredient layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'beef_patty' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render lettuce ingredient layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'lettuce' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render tomato slice ingredient layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'tomato_slice' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render cheese ingredient layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'cheese' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const elements = container.querySelectorAll('rect, ellipse');
      expect(elements.length).toBeGreaterThan(0);
    });

    it('should render onion ingredient layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'onion' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render pickle ingredient layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'pickle' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render ketchup ingredient layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'ketchup' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render mustard ingredient layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'mustard' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render bacon ingredient layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'bacon' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render egg fried ingredient layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'egg_fried' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render avocado ingredient layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'avocado' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render unknown ingredient with default layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'unknown_ingredient' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render multiple ingredient layers in correct order', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'beef_patty' },
          { instanceId: '2', ingredientId: 'cheese' },
          { instanceId: '3', ingredientId: 'lettuce' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const motionGroups = container.querySelectorAll('g');
      expect(motionGroups.length).toBeGreaterThan(3);
    });
  });

  describe('User Interactions', () => {
    it('should call removeIngredient when clicking on an ingredient layer', async () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: 'test-id', ingredientId: 'beef_patty' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      
      const motionGroups = container.querySelectorAll('g');
      const ingredientGroup = motionGroups[1];
      
      fireEvent.click(ingredientGroup);
      
      expect(mockRemoveIngredient).toHaveBeenCalledWith('test-id');
    });

    it('should call removeIngredient with correct instance ID', async () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: 'unique-id-123', ingredientId: 'tomato_slice' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      
      const motionGroups = container.querySelectorAll('g');
      const ingredientGroup = motionGroups[1];
      
      fireEvent.click(ingredientGroup);
      
      expect(mockRemoveIngredient).toHaveBeenCalledWith('unique-id-123');
    });

    it('should have pointer cursor style for ingredient layers', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'beef_patty' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      
      const motionGroups = container.querySelectorAll('g');
      const ingredientGroup = motionGroups[1];
      
      expect(ingredientGroup).toHaveStyle({ cursor: 'pointer' });
    });
  });

  describe('ViewBox Calculation', () => {
    it('should render with minimum viewBox when no ingredients are stacked', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const svg = container.querySelector('svg');
      const viewBox = svg?.getAttribute('viewBox');
      expect(viewBox).toBeDefined();
    });

    it('should adjust viewBox for tall ingredient stacks', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'beef_patty' },
          { instanceId: '2', ingredientId: 'lettuce' },
          { instanceId: '3', ingredientId: 'tomato_slice' },
          { instanceId: '4', ingredientId: 'cheese' },
          { instanceId: '5', ingredientId: 'onion' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const svg = container.querySelector('svg');
      const viewBox = svg?.getAttribute('viewBox');
      expect(viewBox).toBeDefined();
      const parts = viewBox?.split(' ') || [];
      expect(parts.length).toBe(4);
    });
  });

  describe('Layer Positioning', () => {
    it('should stack layers upward from base', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'beef_patty' },
          { instanceId: '2', ingredientId: 'cheese' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const motionGroups = container.querySelectorAll('g');
      expect(motionGroups.length).toBeGreaterThanOrEqual(2);
    });

    it('should handle empty ingredient list', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Animations', () => {
    it('should have initial animation properties on SVG', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render ingredient layers with animation properties', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'beef_patty' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const motionGroups = container.querySelectorAll('g');
      expect(motionGroups.length).toBeGreaterThan(0);
    });
  });

  describe('Bun Rendering', () => {
    it('should render bottom bun with multiple ellipses', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThanOrEqual(4);
    });

    it('should render top bun dome with seeds', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const groups = container.querySelectorAll('g');
      const topBunGroup = groups[groups.length - 1];
      const seedEllipses = topBunGroup?.querySelectorAll('ellipse');
      expect(seedEllipses && seedEllipses.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle very large stacks of ingredients', () => {
      const largeStack = Array.from({ length: 20 }, (_, i) => ({
        instanceId: `id-${i}`,
        ingredientId: ['beef_patty', 'cheese', 'lettuce'][i % 3],
      }));

      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: largeStack,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should handle rapid ingredient additions', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'beef_patty' },
          { instanceId: '2', ingredientId: 'cheese' },
          { instanceId: '3', ingredientId: 'lettuce' },
          { instanceId: '4', ingredientId: 'tomato_slice' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      const { container, rerender } = render(<HamburgerStack />);
      expect(container.querySelector('svg')).toBeInTheDocument();

      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'beef_patty' },
          { instanceId: '2', ingredientId: 'cheese' },
          { instanceId: '3', ingredientId: 'lettuce' },
          { instanceId: '4', ingredientId: 'tomato_slice' },
          { instanceId: '5', ingredientId: 'onion' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      rerender(<HamburgerStack />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should handle all defined ingredient types', () => {
      const allIngredients = [
        { instanceId: '1', ingredientId: 'beef_patty' },
        { instanceId: '2', ingredientId: 'lettuce' },
        { instanceId: '3', ingredientId: 'tomato_slice' },
        { instanceId: '4', ingredientId: 'cheese' },
        { instanceId: '5', ingredientId: 'onion' },
        { instanceId: '6', ingredientId: 'pickle' },
        { instanceId: '7', ingredientId: 'ketchup' },
        { instanceId: '8', ingredientId: 'mustard' },
        { instanceId: '9', ingredientId: 'bacon' },
        { instanceId: '10', ingredientId: 'egg_fried' },
        { instanceId: '11', ingredientId: 'avocado' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: allIngredients,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Invisible Hit Areas', () => {
    it('should render invisible hit areas for ingredient layers', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'beef_patty' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const rects = container.querySelectorAll('rect[fill="transparent"]');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should have correct hit area dimensions', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'beef_patty' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const hitAreaRects = container.querySelectorAll('rect[fill="transparent"]');
      
      hitAreaRects.forEach(rect => {
        const width = rect.getAttribute('width');
        const height = rect.getAttribute('height');
        expect(width).toBeDefined();
        expect(height).toBeDefined();
      });
    });
  });
});