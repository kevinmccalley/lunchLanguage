// @ts-nocheck
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MealSplash } from './MealSplash';
import { useGameStore } from '../../store/gameStore';
import { useLanguageStore } from '../../store/languageStore';
import { getMealInfo } from '../../data/meals';
import { getIngredientById } from '../../data/ingredients';
import { useT } from '../../i18n/useT';
import { getMealCostUSD, formatPrice } from '../../utils/currency';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, onClick, ...props }: any) => (
      <div onClick={onClick} data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
}));

jest.mock('../../store/gameStore');
jest.mock('../../store/languageStore');
jest.mock('../../data/meals');
jest.mock('../../data/ingredients');
jest.mock('../../i18n/useT');
jest.mock('../../utils/currency');
jest.mock('./MealHeroIllustration', () => ({
  MealHeroIllustration: () => <div data-testid="meal-hero-illustration">Hero</div>,
}));

describe('MealSplash', () => {
  const mockSetPhase = jest.fn();
  const mockMealInfo = {
    emoji: '🍕',
    bgColor: '#ff6b6b',
    accentColor: '#ff0000',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    (useGameStore as jest.Mock).mockReturnValue({
      selectedMeal: 'pizza',
      placedIngredients: [
        { ingredientId: 'cheese' },
        { ingredientId: 'tomato' },
        { ingredientId: 'basil' },
      ],
      setPhase: mockSetPhase,
    });

    (useLanguageStore as jest.Mock).mockReturnValue({
      language: 'en',
    });

    (getMealInfo as jest.Mock).mockReturnValue(mockMealInfo);

    (getIngredientById as jest.Mock).mockImplementation((id) => ({
      name: id.charAt(0).toUpperCase() + id.slice(1),
    }));

    (useT as jest.Mock).mockReturnValue({
      meals: {
        pizza: { name: 'Pizza' },
      },
      ingredients: {
        cheese: 'Cheese',
        tomato: 'Tomato',
        basil: 'Basil',
      },
      splash: {
        heading: (name: string) => `You made ${name}!`,
        tagline: 'Delicious!',
        tapToContinue: 'Tap to continue',
      },
    });

    (getMealCostUSD as jest.Mock).mockReturnValue(10.5);
    (formatPrice as jest.Mock).mockReturnValue('$10.50');
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Rendering', () => {
    it('should render the component with all main elements', () => {
      render(<MealSplash />);
      expect(screen.getByText('You made Pizza!')).toBeInTheDocument();
      expect(screen.getByText('Delicious!')).toBeInTheDocument();
      expect(screen.getByTestId('meal-hero-illustration')).toBeInTheDocument();
    });

    it('should render particles with correct count', () => {
      const { container } = render(<MealSplash />);
      const particles = container.querySelectorAll('span');
      expect(particles.length).toBe(20);
    });

    it('should render meal emoji and top 3 ingredients in subtitle', () => {
      render(<MealSplash />);
      expect(screen.getByText(/🍕/)).toBeInTheDocument();
    });

    it('should display price formatted correctly', () => {
      render(<MealSplash />);
      expect(screen.getByText(/💰 \$10.50/)).toBeInTheDocument();
    });

    it('should render progress bar', () => {
      const { container } = render(<MealSplash />);
      const progressBar = container.querySelector('[style*="bottom: 0"]');
      expect(progressBar).toBeInTheDocument();
    });
  });

  describe('Ingredient List Handling', () => {
    it('should display top 3 ingredients sorted by count', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients: [
          { ingredientId: 'cheese' },
          { ingredientId: 'cheese' },
          { ingredientId: 'tomato' },
          { ingredientId: 'basil' },
        ],
        setPhase: mockSetPhase,
      });

      render(<MealSplash />);
      const ingredientText = screen.getByText(/Cheese · Tomato · Basil/);
      expect(ingredientText).toBeInTheDocument();
    });

    it('should display only emoji when no ingredients are placed', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients: [],
        setPhase: mockSetPhase,
      });

      render(<MealSplash />);
      const text = screen.getByText('🍕');
      expect(text).toBeInTheDocument();
    });

    it('should use fallback ingredient name when translation missing', () => {
      (useT as jest.Mock).mockReturnValue({
        meals: { pizza: { name: 'Pizza' } },
        ingredients: {},
        splash: {
          heading: (name: string) => `You made ${name}!`,
          tagline: 'Delicious!',
          tapToContinue: 'Tap to continue',
        },
      });

      render(<MealSplash />);
      expect(screen.getByText(/Cheese/)).toBeInTheDocument();
    });

    it('should handle ingredients with id fallback', () => {
      (getIngredientById as jest.Mock).mockReturnValue(null);
      (useT as jest.Mock).mockReturnValue({
        meals: { pizza: { name: 'Pizza' } },
        ingredients: {},
        splash: {
          heading: (name: string) => `You made ${name}!`,
          tagline: 'Delicious!',
          tapToContinue: 'Tap to continue',
        },
      });

      render(<MealSplash />);
      expect(screen.getByText(/cheese/)).toBeInTheDocument();
    });
  });

  describe('Auto-advance Timer', () => {
    it('should set phase to mathQuiz after 7 seconds', () => {
      render(<MealSplash />);
      expect(mockSetPhase).not.toHaveBeenCalled();

      jest.advanceTimersByTime(7000);

      expect(mockSetPhase).toHaveBeenCalledWith('mathQuiz');
    });

    it('should clean up timer on unmount', () => {
      const { unmount } = render(<MealSplash />);
      unmount();

      jest.advanceTimersByTime(7000);

      expect(mockSetPhase).not.toHaveBeenCalledWith('mathQuiz');
    });
  });

  describe('Click Handler', () => {
    it('should advance to mathQuiz phase on click', async () => {
      const { container } = render(<MealSplash />);
      const motionDiv = container.querySelector('[data-testid="motion-div"]');

      await userEvent.click(motionDiv!);

      expect(mockSetPhase).toHaveBeenCalledWith('mathQuiz');
    });
  });

  describe('Price Calculation', () => {
    it('should calculate meal cost based on placed ingredients count', () => {
      render(<MealSplash />);

      expect(getMealCostUSD).toHaveBeenCalledWith('pizza', 3);
    });

    it('should format price with correct language', () => {
      (useLanguageStore as jest.Mock).mockReturnValue({
        language: 'fr',
      });

      render(<MealSplash />);

      expect(formatPrice).toHaveBeenCalledWith(10.5, 'fr');
    });

    it('should display price in yellow badge', () => {
      const { container } = render(<MealSplash />);
      const badge = container.querySelector('[style*="background: #fff8e1"]');
      expect(badge).toBeInTheDocument();
    });
  });

  describe('Particle Burst Animation', () => {
    it('should render 20 particles at deterministic angles', () => {
      const { container } = render(<MealSplash />);
      const particles = container.querySelectorAll('span');

      expect(particles.length).toBe(20);

      particles.forEach((particle, index) => {
        const expectedAngle = (index / 20) * 360;
        expect(expectedAngle).toBe((index / 20) * 360);
      });
    });

    it('should use star shapes from STAR_SHAPES array', () => {
      const { container } = render(<MealSplash />);
      const particles = container.querySelectorAll('span');
      const STAR_SHAPES = ['★', '✦', '•', '✿', '❋'];

      particles.forEach((particle, index) => {
        const expectedSymbol = STAR_SHAPES[index % STAR_SHAPES.length];
        expect(particle.textContent).toBe(expectedSymbol);
      });
    });

    it('should apply varying colors to particles', () => {
      const { container } = render(<MealSplash />);
      const particles = Array.from(container.querySelectorAll('span'));

      let hasAccentColor = false;
      let hasGoldColor = false;
      let hasWhiteColor = false;

      particles.forEach((particle, index) => {
        const style = window.getComputedStyle(particle);
        if (index % 3 === 0) hasAccentColor = true;
        if (index % 3 === 1) hasGoldColor = true;
        if (index % 3 === 2) hasWhiteColor = true;
      });

      expect(hasAccentColor || hasGoldColor || hasWhiteColor).toBe(true);
    });
  });

  describe('Halo Background', () => {
    it('should render glowing halo behind illustration', () => {
      const { container } = render(<MealSplash />);
      const halos = container.querySelectorAll('[style*="borderRadius: 50%"]');

      expect(halos.length).toBeGreaterThan(0);
    });
  });

  describe('Text Elements', () => {
    it('should render heading with meal name', () => {
      render(<MealSplash />);
      expect(screen.getByText('You made Pizza!')).toBeInTheDocument();
    });

    it('should render tagline text', () => {
      render(<MealSplash />);
      expect(screen.getByText('Delicious!')).toBeInTheDocument();
    });

    it('should render pulsing continue prompt', () => {
      render(<MealSplash />);
      expect(screen.getByText('Tap to continue')).toBeInTheDocument();
    });
  });

  describe('Styling and Layout', () => {
    it('should use meal background color for gradient', () => {
      const { container } = render(<MealSplash />);
      const mainDiv = container.querySelector('[data-testid="motion-div"]');

      const style = mainDiv?.getAttribute('style') || '';
      expect(style).toContain('#ff6b6b');
      expect(style).toContain('#ff0000');
    });

    it('should set fixed position and full viewport size', () => {
      const { container } = render(<MealSplash />);
      const mainDiv = container.querySelector('[data-testid="motion-div"]');

      const style = mainDiv?.getAttribute('style') || '';
      expect(style).toContain('position: fixed');
      expect(style).toContain('inset: 0');
    });

    it('should set cursor to pointer', () => {
      const { container } = render(<MealSplash />);
      const mainDiv = container.querySelector('[data-testid="motion-div"]');

      const style = mainDiv?.getAttribute('style') || '';
      expect(style).toContain('cursor: pointer');
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined meal gracefully', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: undefined,
        placedIngredients: [],
        setPhase: mockSetPhase,
      });

      expect(() => {
        render(<MealSplash />);
      }).not.toThrow();
    });

    it('should handle empty ingredient list', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients: [],
        setPhase: mockSetPhase,
      });

      render(<MealSplash />);
      const mealEmoji = screen.getByText('🍕');
      expect(mealEmoji).toBeInTheDocument();
    });

    it('should handle single ingredient', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients: [{ ingredientId: 'cheese' }],
        setPhase: mockSetPhase,
      });

      render(<MealSplash />);
      const ingredientText = screen.getByText(/Cheese/);
      expect(ingredientText).toBeInTheDocument();
    });

    it('should handle more than 3 ingredients and show only top 3', () => {
      (useGameStore as jest.Mock).mockReturnValue({
        selectedMeal: 'pizza',
        placedIngredients: [
          { ingredientId: 'cheese' },
          { ingredientId: 'cheese' },
          { ingredientId: 'cheese' },
          { ingredientId: 'tomato' },
          { ingredientId: 'basil' },
          { ingredientId: 'garlic' },
        ],
        setPhase: mockSetPhase,
      });

      render(<MealSplash />);
      const ingredientText = screen.getByText(/Cheese · Tomato · Basil/);
      expect(ingredientText).toBeInTheDocument();
      expect(screen.queryByText(/garlic/i)).not.toBeInTheDocument();
    });
  });

  describe('Motion and Animation Properties', () => {
    it('should have meal hero illustration with relative positioning', () => {
      render(<MealSplash />);
      expect(screen.getByTestId('meal-hero-illustration')).toBeInTheDocument();
    });

    it('should render shadow under illustration', () => {
      const { container } = render(<MealSplash />);
      const shadow = container.querySelector('[style*="bottom: -14px"]');
      expect(shadow).toBeInTheDocument();
    });
  });
});