// @ts-nocheck
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IngredientToken } from './IngredientToken';
import type { Ingredient } from '../../types';

describe('IngredientToken', () => {
  const mockIngredient: Ingredient = {
    id: '1',
    name: 'Tomato',
    emoji: '🍅',
    color: '#e74c3c',
  };

  describe('rendering', () => {
    it('should render the ingredient emoji', () => {
      render(<IngredientToken ingredient={mockIngredient} />);
      expect(screen.getByText('🍅')).toBeInTheDocument();
    });

    it('should render the ingredient name when size is >= 56', () => {
      render(<IngredientToken ingredient={mockIngredient} size={56} />);
      expect(screen.getByText('Tomato')).toBeInTheDocument();
    });

    it('should not render the ingredient name when size is < 56', () => {
      render(<IngredientToken ingredient={mockIngredient} size={55} />);
      expect(screen.queryByText('Tomato')).not.toBeInTheDocument();
    });

    it('should render with default size of 64', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle('width: 64px');
      expect(motionDiv).toHaveStyle('height: 64px');
    });

    it('should render with custom size', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={100} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle('width: 100px');
      expect(motionDiv).toHaveStyle('height: 100px');
    });
  });

  describe('styling', () => {
    it('should apply the correct background color from BG_MAP', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle('background: #fdecea');
    });

    it('should use fallback background color for unmapped colors', () => {
      const ingredientWithUnmappedColor: Ingredient = {
        ...mockIngredient,
        color: '#unknowncolor',
      };
      const { container } = render(<IngredientToken ingredient={ingredientWithUnmappedColor} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle('background: #f0f0f0');
    });

    it('should apply the correct border color', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle('border: 3px solid #e74c3c');
    });

    it('should use grey fallback border color for near-white colors', () => {
      const ingredientWithLightColor: Ingredient = {
        ...mockIngredient,
        color: '#fdfefe',
      };
      const { container } = render(<IngredientToken ingredient={ingredientWithLightColor} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle('border: 3px solid #aaaaaa');
    });

    it('should apply circular shape styling', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle('borderRadius: 50%');
    });

    it('should apply grab cursor', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle('cursor: grab');
    });

    it('should apply correct shadow when not dragging', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} dragging={false} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle(`boxShadow: 0 3px 10px ${mockIngredient.color}33`);
    });

    it('should apply correct shadow when dragging', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} dragging={true} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle(`boxShadow: 0 8px 24px ${mockIngredient.color}66`);
    });

    it('should calculate emoji font size based on token size', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={100} />);
      const emojiSpan = container.querySelectorAll('span')[0];
      expect(emojiSpan).toHaveStyle('fontSize: 42px');
    });

    it('should calculate name font size based on token size', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={100} />);
      const nameSpan = container.querySelectorAll('span')[1];
      expect(nameSpan).toHaveStyle('fontSize: 15px');
    });

    it('should enforce minimum name font size of 9px', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={50} />);
      const nameSpan = container.querySelectorAll('span')[1];
      expect(nameSpan).toHaveStyle('fontSize: 9px');
    });
  });

  describe('click handling', () => {
    it('should call onClick handler when clicked', async () => {
      const onClick = jest.fn();
      const user = userEvent.setup();
      const { container } = render(<IngredientToken ingredient={mockIngredient} onClick={onClick} />);
      
      const motionDiv = container.querySelector('div');
      await user.click(motionDiv!);
      expect(onClick).toHaveBeenCalled();
    });

    it('should not error when onClick is not provided', async () => {
      const user = userEvent.setup();
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      
      const motionDiv = container.querySelector('div');
      await expect(async () => {
        await user.click(motionDiv!);
      }).not.toThrow();
    });
  });

  describe('dragging state', () => {
    it('should apply dragging animation when dragging is true', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} dragging={true} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle('boxShadow: 0 8px 24px #e74c3c66');
    });

    it('should not apply dragging animation when dragging is false', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} dragging={false} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle('boxShadow: 0 3px 10px #e74c3c33');
    });

    it('should not apply dragging animation when dragging is undefined', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle('boxShadow: 0 3px 10px #e74c3c33');
    });
  });

  describe('flexbox layout', () => {
    it('should use flex layout with column direction', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle('display: flex');
      expect(motionDiv).toHaveStyle('flexDirection: column');
    });

    it('should center items and content', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle('alignItems: center');
      expect(motionDiv).toHaveStyle('justifyContent: center');
    });

    it('should prevent flex shrinking', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle('flexShrink: 0');
    });
  });

  describe('text overflow handling', () => {
    it('should truncate long ingredient names', () => {
      const longNameIngredient: Ingredient = {
        ...mockIngredient,
        name: 'This is a very long ingredient name that should be truncated',
      };
      const { container } = render(<IngredientToken ingredient={longNameIngredient} size={64} />);
      const nameSpan = container.querySelectorAll('span')[1];
      expect(nameSpan).toHaveStyle('overflow: hidden');
      expect(nameSpan).toHaveStyle('textOverflow: ellipsis');
      expect(nameSpan).toHaveStyle('whiteSpace: nowrap');
    });

    it('should apply max-width to name span', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={100} />);
      const nameSpan = container.querySelectorAll('span')[1];
      expect(nameSpan).toHaveStyle('maxWidth: 92px');
    });
  });

  describe('edge cases', () => {
    it('should handle very small size', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={8} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle('width: 8px');
      expect(motionDiv).toHaveStyle('height: 8px');
    });

    it('should handle very large size', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={500} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle('width: 500px');
      expect(motionDiv).toHaveStyle('height: 500px');
    });

    it('should render multiple instances independently', () => {
      const ingredient1: Ingredient = {
        ...mockIngredient,
        id: '1',
        name: 'Tomato',
      };
      const ingredient2: Ingredient = {
        ...mockIngredient,
        id: '2',
        name: 'Lettuce',
      };
      render(
        <>
          <IngredientToken ingredient={ingredient1} />
          <IngredientToken ingredient={ingredient2} />
        </>
      );
      expect(screen.getByText('🍅')).toBeInTheDocument();
      expect(screen.getByText('Tomato')).toBeInTheDocument();
      expect(screen.getByText('Lettuce')).toBeInTheDocument();
    });

    it('should handle ingredients with special characters in names', () => {
      const specialIngredient: Ingredient = {
        ...mockIngredient,
        name: 'Café & Spice',
      };
      render(<IngredientToken ingredient={specialIngredient} size={64} />);
      expect(screen.getByText('Café & Spice')).toBeInTheDocument();
    });

    it('should handle different emoji', () => {
      const ingredientWithDifferentEmoji: Ingredient = {
        ...mockIngredient,
        emoji: '🥗',
      };
      render(<IngredientToken ingredient={ingredientWithDifferentEmoji} />);
      expect(screen.getByText('🥗')).toBeInTheDocument();
    });
  });

  describe('BG_MAP color palette', () => {
    it('should map common ingredient colors correctly', () => {
      const testCases = [
        { color: '#c0392b', expectedBg: '#fdecea' },
        { color: '#2c6e2c', expectedBg: '#eaf5ea' },
        { color: '#f1c40f', expectedBg: '#fefce8' },
        { color: '#16a085', expectedBg: '#e8f8f5' },
        { color: '#1abc9c', expectedBg: '#e8faf5' },
        { color: '#e67e22', expectedBg: '#fef0e4' },
      ];

      testCases.forEach(({ color, expectedBg }) => {
        const ingredient: Ingredient = {
          ...mockIngredient,
          color,
        };
        const { container } = render(<IngredientToken ingredient={ingredient} />);
        const motionDiv = container.querySelector('div');
        expect(motionDiv).toHaveStyle(`background: ${expectedBg}`);
      });
    });
  });

  describe('visible border color function', () => {
    it('should return grey color for #fdfefe', () => {
      const ingredient: Ingredient = {
        ...mockIngredient,
        color: '#fdfefe',
      };
      const { container } = render(<IngredientToken ingredient={ingredient} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle('border: 3px solid #aaaaaa');
    });

    it('should return grey color for #d5d8dc', () => {
      const ingredient: Ingredient = {
        ...mockIngredient,
        color: '#d5d8dc',
      };
      const { container } = render(<IngredientToken ingredient={ingredient} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle('border: 3px solid #aaaaaa');
    });

    it('should return original color for dark colors', () => {
      const ingredient: Ingredient = {
        ...mockIngredient,
        color: '#2c3e50',
      };
      const { container } = render(<IngredientToken ingredient={ingredient} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle('border: 3px solid #2c3e50');
    });
  });
});