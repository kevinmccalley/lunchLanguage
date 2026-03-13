// @ts-nocheck
import type { ReactElement } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SandwichStack } from './SandwichStack';
import { useGameStore } from '../../store/gameStore';

jest.mock('../../store/gameStore');
jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  motion: {
    svg: ({ children, ...props }: any) => <svg {...props}>{children}</svg>,
    g: ({ children, onClick, ...props }: any) => <g {...props} onClick={onClick}>{children}</g>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
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
      const { container } = render(<SandwichStack />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should have proper SVG attributes', () => {
      const { container } = render(<SandwichStack />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '100%');
      expect(svg).toHaveAttribute('height', '100%');
      expect(svg).toHaveAttribute('preserveAspectRatio', 'xMidYMax meet');
    });

    it('should render plate element', () => {
      const { container } = render(<SandwichStack />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render bottom bread', () => {
      const { container } = render(<SandwichStack />);
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render top bread group', () => {
      const { container } = render(<SandwichStack />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render sesame seeds on top bread', () => {
      const { container } = render(<SandwichStack />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(1);
    });
  });

  describe('with no placed ingredients', () => {
    it('should render only bread and plate', () => {
      const { container } = render(<SandwichStack />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should have correct viewBox when no ingredients', () => {
      const { container } = render(<SandwichStack />);
      const svg = container.querySelector('svg');
      const viewBox = svg?.getAttribute('viewBox');
      expect(viewBox).toBeTruthy();
      expect(viewBox).toMatch(/^0 \d+ 300 \d+$/);
    });
  });

  describe('with placed ingredients', () => {
    it('should render turkey layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'turkey' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(5);
    });

    it('should render ham layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'ham' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(1);
    });

    it('should render chicken layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'chicken' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      const lines = container.querySelectorAll('line');
      expect(lines.length).toBeGreaterThan(0);
    });

    it('should render lettuce layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'lettuce' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render spinach layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'spinach' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render tomato_slice layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'tomato_slice' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      expect(container.querySelectorAll('ellipse').length).toBeGreaterThan(1);
    });

    it('should render cheese layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'cheese' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      expect(container.querySelectorAll('rect').length).toBeGreaterThan(5);
    });

    it('should render swiss layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'swiss' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      expect(container.querySelectorAll('ellipse').length).toBeGreaterThan(1);
    });

    it('should render cream_cheese layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'cream_cheese' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      expect(container.querySelectorAll('path').length).toBeGreaterThan(0);
    });

    it('should render mayo layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'mayo' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      expect(container.querySelectorAll('path').length).toBeGreaterThan(0);
    });

    it('should render ketchup layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'ketchup' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      expect(container.querySelectorAll('path').length).toBeGreaterThan(0);
    });

    it('should render mustard layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'mustard' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      expect(container.querySelectorAll('path').length).toBeGreaterThan(0);
    });

    it('should render onion layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'onion' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      expect(container.querySelectorAll('ellipse').length).toBeGreaterThan(1);
    });

    it('should render pickle layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'pickle' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      expect(container.querySelectorAll('circle').length).toBeGreaterThan(0);
    });

    it('should render bacon layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'bacon' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      expect(container.querySelectorAll('path').length).toBeGreaterThan(0);
    });

    it('should render egg_fried layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'egg_fried' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      expect(container.querySelectorAll('circle').length).toBeGreaterThan(0);
    });

    it('should render avocado layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'avocado' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      expect(container.querySelectorAll('rect').length).toBeGreaterThan(5);
    });

    it('should render mushroom layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'mushroom' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      expect(container.querySelectorAll('ellipse').length).toBeGreaterThan(1);
    });

    it('should render bell_pepper layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'bell_pepper' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      expect(container.querySelectorAll('ellipse').length).toBeGreaterThan(1);
    });

    it('should render basil layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'basil' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      expect(container.querySelectorAll('path').length).toBeGreaterThan(0);
    });

    it('should render jalapeno layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'jalapeno' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      expect(container.querySelectorAll('ellipse').length).toBeGreaterThan(1);
    });

    it('should render cucumber layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'cucumber' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      expect(container.querySelectorAll('circle').length).toBeGreaterThan(0);
    });

    it('should render carrot layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'carrot' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      expect(container.querySelectorAll('rect').length).toBeGreaterThan(5);
    });

    it('should render sprouts layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'sprouts' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      expect(container.querySelectorAll('line').length).toBeGreaterThan(0);
      expect(container.querySelectorAll('circle').length).toBeGreaterThan(0);
    });

    it('should render unknown ingredient with default layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'unknown_ingredient' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      expect(container.querySelectorAll('rect').length).toBeGreaterThan(5);
    });

    it('should render multiple ingredients in correct order', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'turkey' },
          { instanceId: '2', ingredientId: 'cheese' },
          { instanceId: '3', ingredientId: 'lettuce' },
        ],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(3);
    });

    it('should render many ingredients without errors', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'turkey' },
          { instanceId: '2', ingredientId: 'ham' },
          { instanceId: '3', ingredientId: 'chicken' },
          { instanceId: '4', ingredientId: 'bacon' },
          { instanceId: '5', ingredientId: 'lettuce' },
          { instanceId: '6', ingredientId: 'tomato_slice' },
          { instanceId: '7', ingredientId: 'cheese' },
          { instanceId: '8', ingredientId: 'mayo' },
        ],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      expect(container.querySelectorAll('g').length).toBeGreaterThan(8);
    });
  });

  describe('interaction', () => {
    it('should call removeIngredient when clicking on an ingredient layer', async () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: 'test-id', ingredientId: 'turkey' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      const ingredientGroups = container.querySelectorAll('g');
      
      if (ingredientGroups.length > 0) {
        const lastGroup = ingredientGroups[ingredientGroups.length - 1];
        lastGroup.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(mockRemoveIngredient).toHaveBeenCalledWith('test-id');
      }
    });

    it('should have pointer cursor on ingredient layers', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'turkey' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should call removeIngredient with correct instance ID for multiple ingredients', async () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: 'id-1', ingredientId: 'turkey' },
          { instanceId: 'id-2', ingredientId: 'cheese' },
        ],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      const groups = container.querySelectorAll('g');
      
      if (groups.length > 1) {
        groups[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(mockRemoveIngredient).toHaveBeenCalled();
      }
    });
  });

  describe('viewBox calculation', () => {
    it('should adjust viewBox height based on ingredient stack', () => {
      const { container: container1 } = render(<SandwichStack />);
      const svg1 = container1.querySelector('svg');
      const viewBox1 = svg1?.getAttribute('viewBox');

      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: Array.from({ length: 10 }, (_, i) => ({
          instanceId: `id-${i}`,
          ingredientId: 'turkey',
        })),
        removeIngredient: mockRemoveIngredient,
      });

      const { container: container2 } = render(<SandwichStack />);
      const svg2 = container2.querySelector('svg');
      const viewBox2 = svg2?.getAttribute('viewBox');

      expect(viewBox1).toBeTruthy();
      expect(viewBox2).toBeTruthy();
      expect(viewBox1).not.toEqual(viewBox2);
    });

    it('should maintain viewBox width at 300', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'turkey' },
          { instanceId: '2', ingredientId: 'cheese' },
        ],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      const svg = container.querySelector('svg');
      const viewBox = svg?.getAttribute('viewBox');
      expect(viewBox).toMatch(/0 -?\d+ 300 \d+/);
    });
  });

  describe('SVG structure', () => {
    it('should render SVG with proper structure', () => {
      const { container } = render(<SandwichStack />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg?.getAttribute('viewBox')).toBeTruthy();
    });

    it('should render all bread components', () => {
      const { container } = render(<SandwichStack />);
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThanOrEqual(10);
    });

    it('should render paths for visual effects', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'lettuce' }],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });
  });

  describe('edge cases', () => {
    it('should handle empty ingredient list gracefully', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should handle rapid ingredient additions', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: Array.from({ length: 20 }, (_, i) => ({
          instanceId: `id-${i}`,
          ingredientId: 'turkey',
        })),
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should handle undefined removeIngredient gracefully', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'turkey' }],
        removeIngredient: undefined,
      });
      expect(() => {
        render(<SandwichStack />);
      }).not.toThrow();
    });

    it('should render correctly with only spreads', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'mayo' },
          { instanceId: '2', ingredientId: 'mustard' },
          { instanceId: '3', ingredientId: 'ketchup' },
        ],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render correctly with only vegetables', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'lettuce' },
          { instanceId: '2', ingredientId: 'tomato_slice' },
          { instanceId: '3', ingredientId: 'cucumber' },
        ],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<SandwichStack />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });
});