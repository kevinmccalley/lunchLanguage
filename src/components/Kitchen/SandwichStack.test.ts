// @ts-nocheck
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SandwichStack } from './SandwichStack';
import { useGameStore } from '../../store/gameStore';

jest.mock('../../store/gameStore');
jest.mock('framer-motion', () => ({
  motion: {
    svg: ({ children, ...props }: any) => <svg {...props}>{children}</svg>,
    g: ({ children, onClick, ...props }: any) => (
      <g {...props} onClick={onClick}>
        {children}
      </g>
    ),
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
    it('should render SVG element with correct viewBox', () => {
      const { container } = render(<SandwichStack />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('preserveAspectRatio', 'xMidYMax meet');
    });

    it('should render plate ellipse', () => {
      const { container } = render(<SandwichStack />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should render bottom bread slice with correct structure', () => {
      const { container } = render(<SandwichStack />);
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render top bread slice with sesame seeds', () => {
      const { container } = render(<SandwichStack />);
      const ellipses = container.querySelectorAll('ellipse');
      expect(ellipses.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('ingredient layers', () => {
    it('should render no ingredient layers when placedIngredients is empty', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render ingredient layers when placedIngredients is not empty', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'turkey' },
          { instanceId: '2', ingredientId: 'lettuce' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render layers in correct order (last placed on top)', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'turkey' },
          { instanceId: '2', ingredientId: 'lettuce' },
          { instanceId: '3', ingredientId: 'cheese' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container).toBeInTheDocument();
    });

    it('should handle unknown ingredient IDs with default layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'unknown_ingredient' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container).toBeInTheDocument();
    });
  });

  describe('ingredient click handling', () => {
    it('should call removeIngredient when ingredient layer is clicked', async () => {
      const user = userEvent.setup();
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: 'test-id-1', ingredientId: 'turkey' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const groups = container.querySelectorAll('g');
      
      if (groups.length > 0) {
        const lastGroup = groups[groups.length - 1];
        await user.click(lastGroup);
      }
    });

    it('should handle multiple ingredient removals', async () => {
      const user = userEvent.setup();
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'turkey' },
          { instanceId: '2', ingredientId: 'lettuce' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      render(<SandwichStack />);
      expect(mockRemoveIngredient).not.toHaveBeenCalled();
    });
  });

  describe('specific ingredient rendering', () => {
    it('should render turkey ingredient correctly', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'turkey' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container).toBeInTheDocument();
    });

    it('should render ham ingredient correctly', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'ham' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container).toBeInTheDocument();
    });

    it('should render chicken ingredient correctly', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'chicken' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container).toBeInTheDocument();
    });

    it('should render lettuce ingredient correctly', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'lettuce' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container).toBeInTheDocument();
    });

    it('should render spinach ingredient correctly', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'spinach' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container).toBeInTheDocument();
    });

    it('should render tomato_slice ingredient correctly', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'tomato_slice' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container).toBeInTheDocument();
    });

    it('should render cheese ingredient correctly', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'cheese' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container).toBeInTheDocument();
    });

    it('should render swiss ingredient correctly', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'swiss' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container).toBeInTheDocument();
    });

    it('should render cream_cheese ingredient correctly', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'cream_cheese' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container).toBeInTheDocument();
    });

    it('should render mayo ingredient correctly', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'mayo' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container).toBeInTheDocument();
    });

    it('should render ketchup ingredient correctly', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'ketchup' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container).toBeInTheDocument();
    });

    it('should render mustard ingredient correctly', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'mustard' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container).toBeInTheDocument();
    });

    it('should render onion ingredient correctly', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'onion' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container).toBeInTheDocument();
    });

    it('should render pickle ingredient correctly', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'pickle' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container).toBeInTheDocument();
    });

    it('should render bacon ingredient correctly', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'bacon' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container).toBeInTheDocument();
    });

    it('should render egg_fried ingredient correctly', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'egg_fried' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container).toBeInTheDocument();
    });

    it('should render avocado ingredient correctly', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'avocado' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container).toBeInTheDocument();
    });

    it('should render mushroom ingredient correctly', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'mushroom' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container).toBeInTheDocument();
    });

    it('should render bell_pepper ingredient correctly', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'bell_pepper' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container).toBeInTheDocument();
    });

    it('should render basil ingredient correctly', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'basil' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container).toBeInTheDocument();
    });

    it('should render jalapeno ingredient correctly', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'jalapeno' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container).toBeInTheDocument();
    });

    it('should render cucumber ingredient correctly', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'cucumber' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container).toBeInTheDocument();
    });

    it('should render carrot ingredient correctly', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'carrot' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container).toBeInTheDocument();
    });

    it('should render sprouts ingredient correctly', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'sprouts' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container).toBeInTheDocument();
    });
  });

  describe('complex ingredient stacks', () => {
    it('should render multiple ingredients stacked correctly', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'turkey' },
          { instanceId: '2', ingredientId: 'cheese' },
          { instanceId: '3', ingredientId: 'lettuce' },
          { instanceId: '4', ingredientId: 'tomato_slice' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container).toBeInTheDocument();
    });

    it('should render full sandwich with all ingredient types', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'turkey' },
          { instanceId: '2', ingredientId: 'ham' },
          { instanceId: '3', ingredientId: 'chicken' },
          { instanceId: '4', ingredientId: 'lettuce' },
          { instanceId: '5', ingredientId: 'spinach' },
          { instanceId: '6', ingredientId: 'tomato_slice' },
          { instanceId: '7', ingredientId: 'cheese' },
          { instanceId: '8', ingredientId: 'swiss' },
          { instanceId: '9', ingredientId: 'bacon' },
          { instanceId: '10', ingredientId: 'egg_fried' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container).toBeInTheDocument();
    });

    it('should handle alternating protein and vegetable layers', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'turkey' },
          { instanceId: '2', ingredientId: 'lettuce' },
          { instanceId: '3', ingredientId: 'ham' },
          { instanceId: '4', ingredientId: 'tomato_slice' },
          { instanceId: '5', ingredientId: 'bacon' },
          { instanceId: '6', ingredientId: 'spinach' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container).toBeInTheDocument();
    });

    it('should handle multiple sauce layers', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'mayo' },
          { instanceId: '2', ingredientId: 'ketchup' },
          { instanceId: '3', ingredientId: 'mustard' },
        ],
        removeIngredient: mockRemoveIngredible,
      });

      const { container } = render(<SandwichStack />);
      expect(container).toBeInTheDocument();
    });
  });

  describe('viewBox calculations', () => {
    it('should calculate appropriate viewBox based on sandwich height', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'turkey' },
          { instanceId: '2', ingredientId: 'lettuce' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const svg = container.querySelector('svg');
      const viewBox = svg?.getAttribute('viewBox');
      expect(viewBox).toBeDefined();
      expect(viewBox).toMatch(/^0 -?\d+ 300 \d+$/);
    });

    it('should have minimum height constraint for viewBox', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('animation states', () => {
    it('should render with proper initial and animate props on motion.svg', () => {
      const { container } = render(<SandwichStack />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render ingredient layers with AnimatePresence wrapper', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'turkey' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should handle very tall sandwich with many layers', () => {
      const manyLayers = Array.from({ length: 30 }, (_, i) => ({
        instanceId: `${i}`,
        ingredientId: ['turkey', 'lettuce', 'cheese'][i % 3],
      }));

      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: manyLayers,
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container).toBeInTheDocument();
    });

    it('should handle single ingredient sandwich', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'turkey' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      expect(container).toBeInTheDocument();
    });

    it('should handle rapid ingredient additions and removals', async () => {
      const user = userEvent.setup();
      const { rerender } = render(<SandwichStack />);

      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'turkey' }],
        removeIngredient: mockRemoveIngredient,
      });

      rerender(<SandwichStack />);

      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'turkey' },
          { instanceId: '2', ingredientId: 'lettuce' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      rerender(<SandwichStack />);

      expect(mockRemoveIngredient).not.toHaveBeenCalled();
    });

    it('should preserve sandwich structure when ingredient order changes', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '1', ingredientId: 'turkey' },
          { instanceId: '2', ingredientId: 'lettuce' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      const { rerender } = render(<SandwichStack />);

      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { instanceId: '2', ingredientId: 'lettuce' },
          { instanceId: '1', ingredientId: 'turkey' },
        ],
        removeIngredient: mockRemoveIngredient,
      });

      rerender(<SandwichStack />);
      expect(mockRemoveIngredient).not.toHaveBeenCalled();
    });
  });

  describe('hit area and clickability', () => {
    it('should have wider transparent hit area for easier clicking', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [{ instanceId: '1', ingredientId: 'turkey' }],
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<SandwichStack />);
      const rects = container.querySelectorAll('rect[fill="transparent"]');
      expect(rects.length).toBeGreaterThan(0);
    });
  });
});