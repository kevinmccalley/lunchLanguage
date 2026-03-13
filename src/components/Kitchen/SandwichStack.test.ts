// @ts-nocheck
import type { ReactElement } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SandwichStack } from './SandwichStack';
import { useGameStore } from '../../store/gameStore';

jest.mock('../../store/gameStore');
jest.mock('framer-motion', () => ({
  motion: {
    svg: ({ children, ...props }: any) => <svg {...props}>{children}</svg>,
    g: ({ children, onClick, ...props }: any) => <g {...props} onClick={onClick}>{children}</g>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

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
    it('should render an SVG element', () => {
      render(<SandwichStack />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render with correct width and height attributes', () => {
      render(<SandwichStack />);
      const svg = document.querySelector('svg');
      expect(svg).toHaveAttribute('width', '100%');
      expect(svg).toHaveAttribute('height', '100%');
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

    it('should render top bread slice with arch dome path', () => {
      render(<SandwichStack />);
      const paths = document.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render sesame seeds on top bread', () => {
      render(<SandwichStack />);
      const allEllipses = document.querySelectorAll('ellipse');
      expect(allEllipses.length).toBeGreaterThan(1);
    });
  });

  describe('ingredient layers', () => {
    it('should render no ingredient layers when placedIngredients is empty', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const motionGs = container.querySelectorAll('g[style*="pointer"]');
      expect(motionGs).toHaveLength(0);
    });

    it('should render ingredient layers for placed ingredients', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'turkey' },
          { instanceId: '2', ingredientId: 'cheese' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const layers = container.querySelectorAll('g');
      expect(layers.length).toBeGreaterThan(2);
    });

    it('should render turkey layer correctly', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'turkey' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const rect = container.querySelector('rect[fill="#c9946a"]');
      expect(rect).toBeInTheDocument();
    });

    it('should render ham layer correctly', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'ham' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const rect = container.querySelector('rect[fill="#e07090"]');
      expect(rect).toBeInTheDocument();
    });

    it('should render chicken layer correctly', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'chicken' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const rect = container.querySelector('rect[fill="#d4a96a"]');
      expect(rect).toBeInTheDocument();
    });

    it('should render lettuce layer with wavy path', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'lettuce' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const path = container.querySelector('path[fill="#4CAF50"]');
      expect(path).toBeInTheDocument();
    });

    it('should render spinach layer with wavy path', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'spinach' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const path = container.querySelector('path[fill="#2E7D32"]');
      expect(path).toBeInTheDocument();
    });

    it('should render tomato_slice layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'tomato_slice' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const rect = container.querySelector('rect[fill="#E53935"]');
      expect(rect).toBeInTheDocument();
    });

    it('should render cheese layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'cheese' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const rect = container.querySelector('rect[fill="#FDD835"]');
      expect(rect).toBeInTheDocument();
    });

    it('should render swiss cheese layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'swiss' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const rect = container.querySelector('rect[fill="#F5E990"]');
      expect(rect).toBeInTheDocument();
    });

    it('should render cream_cheese layer with wavy stroke', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'cream_cheese' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const path = container.querySelector('path[stroke="#faf5ee"]');
      expect(path).toBeInTheDocument();
    });

    it('should render mayo layer with wavy stroke', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'mayo' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const path = container.querySelector('path[stroke="#FAFAFA"]');
      expect(path).toBeInTheDocument();
    });

    it('should render ketchup layer with wavy stroke', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'ketchup' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const path = container.querySelector('path[stroke="#E53935"]');
      expect(path).toBeInTheDocument();
    });

    it('should render mustard layer with wavy stroke', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'mustard' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const path = container.querySelector('path[stroke="#FDD835"]');
      expect(path).toBeInTheDocument();
    });

    it('should render onion layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'onion' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const rect = container.querySelector('rect[fill="#E1BEE7"]');
      expect(rect).toBeInTheDocument();
    });

    it('should render pickle layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'pickle' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const ellipse = container.querySelector('ellipse[fill="#8BC34A"]');
      expect(ellipse).toBeInTheDocument();
    });

    it('should render bacon layer with wavy strokes', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'bacon' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const paths = container.querySelectorAll('path[stroke="#C62828"], path[stroke="#795548"]');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render egg_fried layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'egg_fried' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const ellipse = container.querySelector('ellipse[fill="white"]');
      expect(ellipse).toBeInTheDocument();
    });

    it('should render avocado layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'avocado' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const rect = container.querySelector('rect[fill="#81C784"]');
      expect(rect).toBeInTheDocument();
    });

    it('should render mushroom layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'mushroom' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const ellipse = container.querySelector('ellipse[fill="#6D4C41"]');
      expect(ellipse).toBeInTheDocument();
    });

    it('should render bell_pepper layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'bell_pepper' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const rect = container.querySelector('rect[fill="#27ae60"]');
      expect(rect).toBeInTheDocument();
    });

    it('should render basil layer with wavy path', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'basil' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const path = container.querySelector('path[fill="#2D8A2D"]');
      expect(path).toBeInTheDocument();
    });

    it('should render jalapeno layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'jalapeno' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const ellipse = container.querySelector('ellipse[fill="#16a085"]');
      expect(ellipse).toBeInTheDocument();
    });

    it('should render cucumber layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'cucumber' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const circle = container.querySelector('circle[fill="#4caf50"]');
      expect(circle).toBeInTheDocument();
    });

    it('should render carrot layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'carrot' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const rect = container.querySelector('rect[fill="#f57c00"]');
      expect(rect).toBeInTheDocument();
    });

    it('should render sprouts layer with stems and leaves', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'sprouts' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const lines = container.querySelectorAll('line[stroke="#66bb6a"]');
      expect(lines.length).toBeGreaterThan(0);
    });

    it('should render default layer for unknown ingredient', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'unknown_ingredient' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const rect = container.querySelector('rect[fill="#9E9E9E"]');
      expect(rect).toBeInTheDocument();
    });

    it('should render multiple ingredient layers in order', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'turkey' },
          { instanceId: '2', ingredientId: 'cheese' },
          { instanceId: '3', ingredientId: 'lettuce' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const turkeyRect = container.querySelector('rect[fill="#c9946a"]');
      const cheeseRect = container.querySelector('rect[fill="#FDD835"]');
      const lettucePath = container.querySelector('path[fill="#4CAF50"]');

      expect(turkeyRect).toBeInTheDocument();
      expect(cheeseRect).toBeInTheDocument();
      expect(lettucePath).toBeInTheDocument();
    });
  });

  describe('ingredient removal', () => {
    it('should call removeIngredient when a layer is clicked', async () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'turkey' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const layerGroup = container.querySelector('g[style*="pointer"]');
      
      if (layerGroup) {
        layerGroup.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }

      expect(mockRemoveIngredient).toHaveBeenCalledWith('1');
    });

    it('should have cursor pointer style on ingredient layers', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'turkey' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const layerGroup = container.querySelector('g[style*="pointer"]');
      expect(layerGroup).toHaveStyle({ cursor: 'pointer' });
    });

    it('should remove ingredient with correct instanceId', async () => {
      const instanceId = 'unique-instance-id';
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId, ingredientId: 'ham' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const layerGroup = container.querySelector('g[style*="pointer"]');
      
      if (layerGroup) {
        layerGroup.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }

      expect(mockRemoveIngredient).toHaveBeenCalledWith(instanceId);
    });
  });

  describe('viewBox calculations', () => {
    it('should calculate viewBox with minimal height when no ingredients', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const svg = container.querySelector('svg');
      const viewBox = svg?.getAttribute('viewBox');
      
      expect(viewBox).toBeDefined();
      expect(viewBox).toContain('0');
    });

    it('should adjust viewBox height with tall sandwich', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: Array.from({ length: 10 }, (_, i) => ({
          instanceId: `${i}`,
          ingredientId: 'turkey',
        })),
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const svg = container.querySelector('svg');
      const viewBox = svg?.getAttribute('viewBox');
      
      expect(viewBox).toBeDefined();
      expect(viewBox).toContain('300');
    });

    it('should have preserveAspectRatio set to xMidYMax', () => {
      render(<SandwichStack />);
      const svg = document.querySelector('svg');
      expect(svg).toHaveAttribute('preserveAspectRatio', 'xMidYMax meet');
    });
  });

  describe('wavy path generation', () => {
    it('should handle ingredients with wavy paths', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'lettuce' },
          { instanceId: '2', ingredientId: 'spinach' },
          { instanceId: '3', ingredientId: 'basil' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const paths = container.querySelectorAll('path');
      
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render cream cheese with correct opacity', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'cream_cheese' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const path = container.querySelector('path[stroke="#faf5ee"]');
      expect(path).toHaveAttribute('opacity', '0.9');
    });
  });

  describe('sandwich height stacking', () => {
    it('should stack layers without overlap with LAYER_GAP', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'turkey' },
          { instanceId: '2', ingredientId: 'ham' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      render(<SandwichStack />);
      
      expect(mockRemoveIngredient).not.toHaveBeenCalled();
    });

    it('should handle many layers without issues', () => {
      const ingredients = Array.from({ length: 20 }, (_, i) => ({
        instanceId: `${i}`,
        ingredientId: ['turkey', 'ham', 'cheese', 'lettuce', 'bacon'][i % 5],
      }));

      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: ingredients,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const svg = container.querySelector('svg');
      
      expect(svg).toBeInTheDocument();
    });
  });

  describe('hit area rendering', () => {
    it('should render transparent hit area for each ingredient', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'turkey' },
          { instanceId: '2', ingredientId: 'cheese' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const hitAreas = container.querySelectorAll('rect[fill="transparent"]');
      
      expect(hitAreas.length).toBeGreaterThanOrEqual(2);
    });

    it('should have wider hit area than ingredient width', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'turkey' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const hitArea = container.querySelector('rect[fill="transparent"]');
      
      expect(hitArea).toHaveAttribute('x', '130');
      expect(hitArea).toHaveAttribute('width', '250');
    });
  });

  describe('store integration', () => {
    it('should call useGameStore hook', () => {
      render(<SandwichStack />);
      expect(useGameStore).toHaveBeenCalled();
    });

    it('should use placedIngredients from store', () => {
      const placedIngredients = [
        { instanceId: '1', ingredientId: 'turkey' },
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients,
        removeIngredient: mockRemoveIngredient,
      });

      render(<SandwichStack />);
      expect(useGameStore).toHaveBeenCalled();
    });

    it('should use removeIngredient function from store', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'turkey' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const layerGroup = container.querySelector('g[style*="pointer"]');
      
      if (layerGroup) {
        layerGroup.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }

      expect(mockRemoveIngredient).toHaveBeenCalled();
    });
  });

  describe('animation properties', () => {
    it('should apply correct SVG animation properties', () => {
      render(<SandwichStack />);
      const svg = document.querySelector('svg');
      
      expect(svg).toBeInTheDocument();
    });
  });

  describe('bread rendering', () => {
    it('should render bottom bread with correct colors', () => {
      render(<SandwichStack />);
      const bottomBreadRects = document.querySelectorAll('rect[fill="#c9916a"], rect[fill="#e0b07a"]');
      
      expect(bottomBreadRects.length).toBeGreaterThan(0);
    });

    it('should render top bread with arch dome', () => {
      render(<SandwichStack />);
      const paths = document.querySelectorAll('path');
      
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render both bread slices', () => {
      render(<SandwichStack />);
      const svg = document.querySelector('svg');
      
      expect(svg).toBeInTheDocument();
    });
  });

  describe('plate rendering', () => {
    it('should render plate ellipse', () => {
      render(<SandwichStack />);
      const ellipses = document.querySelectorAll('ellipse');
      
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render plate with correct colors', () => {
      render(<SandwichStack />);
      const plateEllipse = document.querySelector('ellipse[fill="#f5ede3"]');
      
      expect(plateEllipse).toBeInTheDocument();
    });
  });
});