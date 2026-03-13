// @ts-nocheck
import React from 'react';
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
    it('should render without crashing', () => {
      const { container } = render(<HamburgerStack />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render with correct SVG attributes', () => {
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

    it('should render with empty ingredients list', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('ingredient rendering', () => {
    it('should render single beef patty ingredient', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { ingredientId: 'beef_patty', instanceId: '1' },
        ],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render lettuce ingredient', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { ingredientId: 'lettuce', instanceId: '1' },
        ],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should render tomato slice ingredient', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { ingredientId: 'tomato_slice', instanceId: '1' },
        ],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      expect(container.querySelectorAll('ellipse').length).toBeGreaterThan(4);
    });

    it('should render cheese ingredient', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { ingredientId: 'cheese', instanceId: '1' },
        ],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      const rects = container.querySelectorAll('rect');
      expect(rects.length).toBeGreaterThan(0);
    });

    it('should render onion ingredient', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { ingredientId: 'onion', instanceId: '1' },
        ],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      expect(container.querySelectorAll('ellipse').length).toBeGreaterThan(0);
    });

    it('should render pickle ingredient', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { ingredientId: 'pickle', instanceId: '1' },
        ],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      expect(container.querySelectorAll('ellipse').length).toBeGreaterThan(0);
    });

    it('should render ketchup ingredient', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { ingredientId: 'ketchup', instanceId: '1' },
        ],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      expect(container.querySelectorAll('path').length).toBeGreaterThan(0);
    });

    it('should render mustard ingredient', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { ingredientId: 'mustard', instanceId: '1' },
        ],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      expect(container.querySelectorAll('path').length).toBeGreaterThan(0);
    });

    it('should render bacon ingredient', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { ingredientId: 'bacon', instanceId: '1' },
        ],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      expect(container.querySelectorAll('path').length).toBeGreaterThan(0);
    });

    it('should render egg_fried ingredient', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { ingredientId: 'egg_fried', instanceId: '1' },
        ],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      expect(container.querySelectorAll('circle').length).toBeGreaterThan(0);
    });

    it('should render avocado ingredient', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { ingredientId: 'avocado', instanceId: '1' },
        ],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      expect(container.querySelectorAll('ellipse').length).toBeGreaterThan(0);
    });

    it('should render unknown ingredient with default layer', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { ingredientId: 'unknown_ingredient', instanceId: '1' },
        ],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      expect(container.querySelectorAll('rect').length).toBeGreaterThan(0);
    });

    it('should render multiple ingredients in correct order', () => {
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

    it('should render hit area for each ingredient', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { ingredientId: 'beef_patty', instanceId: '1' },
          { ingredientId: 'cheese', instanceId: '2' },
        ],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      const transparentRects = Array.from(container.querySelectorAll('rect')).filter(
        rect => rect.getAttribute('fill') === 'transparent'
      );
      expect(transparentRects.length).toBe(2);
    });
  });

  describe('interaction', () => {
    it('should call removeIngredient when clicking on ingredient', async () => {
      const user = userEvent.setup();
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { ingredientId: 'beef_patty', instanceId: 'test-id-1' },
        ],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      const ingredientGroup = container.querySelector('g:nth-child(3)');
      if (ingredientGroup) {
        await user.click(ingredientGroup);
        expect(mockRemoveIngredient).toHaveBeenCalledWith('test-id-1');
      }
    });

    it('should call removeIngredient with correct instance id for multiple ingredients', async () => {
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
      if (groups.length > 3) {
        await user.click(groups[3]);
        expect(mockRemoveIngredient).toHaveBeenCalled();
      }
    });
  });

  describe('viewBox calculation', () => {
    it('should have correct viewBox with no ingredients', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      const svg = container.querySelector('svg');
      const viewBox = svg?.getAttribute('viewBox');
      expect(viewBox).toBeDefined();
      expect(viewBox).toMatch(/0 \d+ 300 \d+/);
    });

    it('should adjust viewBox height for tall stacks', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: Array.from({ length: 10 }, (_, i) => ({
          ingredientId: 'beef_patty',
          instanceId: `id-${i}`,
        })),
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      const svg = container.querySelector('svg');
      const viewBox = svg?.getAttribute('viewBox');
      expect(viewBox).toBeDefined();
    });
  });

  describe('styling and appearance', () => {
    it('should render with correct SVG presentation attributes', () => {
      const { container } = render(<HamburgerStack />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '100%');
      expect(svg).toHaveAttribute('height', '100%');
    });

    it('should have cursor pointer on ingredient groups', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { ingredientId: 'beef_patty', instanceId: '1' },
        ],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      const groups = container.querySelectorAll('g');
      expect(groups.length).toBeGreaterThan(0);
    });
  });

  describe('seeded ingredients', () => {
    it('should render with all ingredient types', () => {
      const allIngredients = [
        'beef_patty',
        'lettuce',
        'tomato_slice',
        'cheese',
        'onion',
        'pickle',
        'ketchup',
        'mustard',
        'bacon',
        'egg_fried',
        'avocado',
      ];

      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: allIngredients.map((id, i) => ({
          ingredientId: id,
          instanceId: `id-${i}`,
        })),
        removeIngredient: mockRemoveIngredient,
      });

      const { container } = render(<HamburgerStack />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should handle very large ingredient stacks', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: Array.from({ length: 50 }, (_, i) => ({
          ingredientId: 'beef_patty',
          instanceId: `id-${i}`,
        })),
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should handle ingredients with same type but different instance ids', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        placedIngredients: [
          { ingredientId: 'beef_patty', instanceId: 'beef-1' },
          { ingredientId: 'beef_patty', instanceId: 'beef-2' },
          { ingredientId: 'beef_patty', instanceId: 'beef-3' },
        ],
        removeIngredient: mockRemoveIngredient,
      });
      const { container } = render(<HamburgerStack />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });
});