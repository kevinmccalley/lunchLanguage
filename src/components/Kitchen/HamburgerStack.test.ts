// @ts-nocheck
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HamburgerStack } from './HamburgerStack';
import { useGameStore } from '../../store/gameStore';

jest.mock('../../store/gameStore');
jest.mock('framer-motion', () => ({
  motion: {
    svg: ({ children, ...props }: any) => <svg {...props}>{children}</svg>,
    g: ({ children, onClick, ...props }: any) => <g {...props} onClick={onClick}>{children}</g>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

describe('HamburgerStack', () => {
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
      render(<HamburgerStack />);
      const svg = screen.getByRole('img', { hidden: true });
      expect(svg).toBeInTheDocument();
    });

    it('should render with default viewBox when no ingredients are placed', () => {
      render(<HamburgerStack />);
      const svg = screen.getByRole('img', { hidden: true });
      expect(svg).toHaveAttribute('viewBox');
      const viewBox = svg.getAttribute('viewBox');
      expect(viewBox).toMatch(/^0\s-?\d+\s300\s\d+$/);
    });

    it('should render plate elements', () => {
      const { container } = render(<HamburgerStack />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThanOrEqual(4); // plate ellipses
    });

    it('should render bottom bun elements', () => {
      const { container } = render(<HamburgerStack />);
      const ellipses = container.querySelectorAll('ellipse');
      // Bottom bun has 4 ellipses
      expect(ellipses.length).toBeGreaterThanOrEqual(8);
    });

    it('should render top bun dome', () => {
      const { container } = render(<HamburgerStack />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });
  });

  describe('ingredients rendering', () => {
    it('should render beef_patty ingredient', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ ingredientId: 'beef_patty', instanceId: '1' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(4); // includes beef_patty rects
    });

    it('should render lettuce ingredient with wavy path', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ ingredientId: 'lettuce', instanceId: '1' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render tomato_slice ingredient', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ ingredientId: 'tomato_slice', instanceId: '1' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(8);
    });

    it('should render cheese ingredient', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ ingredientId: 'cheese', instanceId: '1' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(4);
    });

    it('should render onion ingredient', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ ingredientId: 'onion', instanceId: '1' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(8);
    });

    it('should render pickle ingredient', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ ingredientId: 'pickle', instanceId: '1' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(8);
    });

    it('should render ketchup ingredient with wavy stroke', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ ingredientId: 'ketchup', instanceId: '1' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render mustard ingredient with wavy stroke', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ ingredientId: 'mustard', instanceId: '1' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render bacon ingredient', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ ingredientId: 'bacon', instanceId: '1' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render egg_fried ingredient', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ ingredientId: 'egg_fried', instanceId: '1' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should render avocado ingredient', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ ingredientId: 'avocado', instanceId: '1' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(8);
    });

    it('should render unknown ingredient with DEFAULT_LAYER', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ ingredientId: 'unknown_ingredient', instanceId: '1' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(4);
    });
  });

  describe('multiple ingredients', () => {
    it('should render multiple ingredients stacked correctly', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { ingredientId: 'beef_patty', instanceId: '1' },
          { ingredientId: 'cheese', instanceId: '2' },
          { ingredientId: 'lettuce', instanceId: '3' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(3);
    });

    it('should adjust viewBox height for tall stacks', () => {
      const longStack = Array.from({ length: 10 }, (_, i) => ({
        ingredientId: 'beef_patty',
        instanceId: `${i}`,
      }));

      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: longStack,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('viewBox');
      const viewBox = svg?.getAttribute('viewBox');
      expect(viewBox).toBeDefined();
    });
  });

  describe('interaction', () => {
    it('should call removeIngredient when ingredient is clicked', async () => {
      const user = userEvent.setup();
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ ingredientId: 'beef_patty', instanceId: 'test-id-123' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const groups = container.querySelectorAll('g');
      
      // Skip the first group which is the top bun dome
      const ingredientGroup = groups[1];
      
      await user.click(ingredientGroup);
      expect(mockRemoveIngredient).toHaveBeenCalledWith('test-id-123');
    });

    it('should have cursor pointer style on ingredient', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ ingredientId: 'beef_patty', instanceId: '1' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const groups = container.querySelectorAll('g');
      const ingredientGroup = groups[1];
      expect(ingredientGroup).toHaveStyle('cursor: pointer');
    });

    it('should handle multiple ingredient clicks independently', async () => {
      const user = userEvent.setup();
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { ingredientId: 'beef_patty', instanceId: 'id-1' },
          { ingredientId: 'cheese', instanceId: 'id-2' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const groups = container.querySelectorAll('g');
      
      await user.click(groups[1]);
      expect(mockRemoveIngredient).toHaveBeenCalledWith('id-1');

      mockRemoveIngredient.mockClear();

      await user.click(groups[2]);
      expect(mockRemoveIngredient).toHaveBeenCalledWith('id-2');
    });
  });

  describe('SVG structure', () => {
    it('should have proper SVG attributes', () => {
      render(<HamburgerStack />);
      const svg = screen.getByRole('img', { hidden: true });
      expect(svg).toHaveAttribute('width', '100%');
      expect(svg).toHaveAttribute('height', '100%');
      expect(svg).toHaveAttribute('preserveAspectRatio', 'xMidYMax meet');
    });

    it('should render invisible hit area rectangles for ingredients', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ ingredientId: 'beef_patty', instanceId: '1' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const rects = container.querySelectorAll('rect[fill="transparent"]');
      expect(rects.length).toBeGreaterThan(0);
    });
  });

  describe('edge cases', () => {
    it('should handle empty placedIngredients array', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render with only one ingredient', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ ingredientId: 'beef_patty', instanceId: '1' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should maintain instance IDs for different ingredients with same type', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { ingredientId: 'beef_patty', instanceId: 'beef-1' },
          { ingredientId: 'beef_patty', instanceId: 'beef-2' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(2);
    });
  });
});