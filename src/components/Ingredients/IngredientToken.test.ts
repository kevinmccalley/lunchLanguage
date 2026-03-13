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
      const div = container.querySelector('div[style*="width"]');
      expect(div).toHaveStyle('width: 64px');
      expect(div).toHaveStyle('height: 64px');
    });

    it('should render with custom size', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={100} />);
      const div = container.querySelector('div[style*="width"]');
      expect(div).toHaveStyle('width: 100px');
      expect(div).toHaveStyle('height: 100px');
    });
  });

  describe('styling with background color mapping', () => {
    it('should apply mapped background color for known ingredient color', () => {
      const ingredientWithKnownColor: Ingredient = {
        ...mockIngredient,
        color: '#e74c3c',
      };
      const { container } = render(<IngredientToken ingredient={ingredientWithKnownColor} />);
      const div = container.firstChild as HTMLElement;
      expect(div).toHaveStyle('background: #fdecea');
    });

    it('should apply fallback background color for unknown ingredient color', () => {
      const ingredientWithUnknownColor: Ingredient = {
        ...mockIngredient,
        color: '#unknowncolor',
      };
      const { container } = render(<IngredientToken ingredient={ingredientWithUnknownColor} />);
      const div = container.firstChild as HTMLElement;
      expect(div).toHaveStyle('background: #f0f0f0');
    });

    it('should map various ingredient colors correctly', () => {
      const colorMappings = [
        { color: '#c0392b', expectedBg: '#fdecea' },
        { color: '#8e7464', expectedBg: '#f5ede8' },
        { color: '#2c6e2c', expectedBg: '#eaf5ea' },
        { color: '#f1c40f', expectedBg: '#fefce8' },
        { color: '#16a085', expectedBg: '#e8f8f5' },
      ];

      colorMappings.forEach(({ color, expectedBg }) => {
        const { container, unmount } = render(
          <IngredientToken ingredient={{ ...mockIngredient, color }} />
        );
        const div = container.firstChild as HTMLElement;
        expect(div).toHaveStyle(`background: ${expectedBg}`);
        unmount();
      });
    });
  });

  describe('border color with visibility handling', () => {
    it('should apply grey border color for near-white colors', () => {
      const nearWhiteColors = ['#fdfefe', '#d5d8dc', '#f9e79f'];

      nearWhiteColors.forEach((color) => {
        const { container, unmount } = render(
          <IngredientToken ingredient={{ ...mockIngredient, color }} />
        );
        const div = container.firstChild as HTMLElement;
        expect(div).toHaveStyle('border: 3px solid #aaaaaa');
        unmount();
      });
    });

    it('should apply ingredient color as border for non-light colors', () => {
      const { container } = render(
        <IngredientToken ingredient={{ ...mockIngredient, color: '#e74c3c' }} />
      );
      const div = container.firstChild as HTMLElement;
      expect(div).toHaveStyle('border: 3px solid #e74c3c');
    });
  });

  describe('shadow styling', () => {
    it('should apply default shadow when not dragging', () => {
      const { container } = render(
        <IngredientToken ingredient={mockIngredient} dragging={false} />
      );
      const div = container.firstChild as HTMLElement;
      expect(div).toHaveStyle('boxShadow: 0 3px 10px #e74c3c33');
    });

    it('should apply dragging shadow when dragging is true', () => {
      const { container } = render(
        <IngredientToken ingredient={mockIngredient} dragging={true} />
      );
      const div = container.firstChild as HTMLElement;
      expect(div).toHaveStyle('boxShadow: 0 8px 24px #e74c3c66');
    });
  });

  describe('emoji sizing', () => {
    it('should calculate emoji font size as 42% of container size', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={100} />);
      const emojiSpan = container.querySelector('span') as HTMLElement;
      expect(emojiSpan).toHaveStyle('fontSize: 42px');
    });

    it('should calculate emoji font size correctly for small sizes', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={64} />);
      const emojiSpan = container.querySelector('span') as HTMLElement;
      expect(emojiSpan).toHaveStyle('fontSize: 26.88px');
    });
  });

  describe('name styling', () => {
    it('should calculate name font size as 15% of container size when size >= 56', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={100} />);
      const nameSpan = container.querySelectorAll('span')[1] as HTMLElement;
      expect(nameSpan).toHaveStyle('fontSize: 15px');
    });

    it('should use minimum font size of 9px for name', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={56} />);
      const nameSpan = container.querySelectorAll('span')[1] as HTMLElement;
      expect(nameSpan).toHaveStyle('fontSize: 9px');
    });

    it('should apply bold font weight to name', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={64} />);
      const nameSpan = container.querySelectorAll('span')[1] as HTMLElement;
      expect(nameSpan).toHaveStyle('fontWeight: 700');
    });

    it('should truncate name with ellipsis when text overflows', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={56} />);
      const nameSpan = container.querySelectorAll('span')[1] as HTMLElement;
      expect(nameSpan).toHaveStyle('overflow: hidden');
      expect(nameSpan).toHaveStyle('textOverflow: ellipsis');
      expect(nameSpan).toHaveStyle('whiteSpace: nowrap');
    });

    it('should use border color for name text color', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={64} />);
      const nameSpan = container.querySelectorAll('span')[1] as HTMLElement;
      expect(nameSpan).toHaveStyle('color: #e74c3c');
    });
  });

  describe('interactivity', () => {
    it('should call onClick handler when clicked', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      const { container } = render(
        <IngredientToken ingredient={mockIngredient} onClick={handleClick} />
      );
      const div = container.firstChild as HTMLElement;
      await user.click(div);
      expect(handleClick).toHaveBeenCalled();
    });

    it('should not throw error when onClick is not provided', async () => {
      const user = userEvent.setup();
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const div = container.firstChild as HTMLElement;
      await user.click(div);
      expect(true).toBe(true);
    });
  });

  describe('layout styles', () => {
    it('should have circular shape with border-radius 50%', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const div = container.firstChild as HTMLElement;
      expect(div).toHaveStyle('borderRadius: 50%');
    });

    it('should use flexbox for centering content', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const div = container.firstChild as HTMLElement;
      expect(div).toHaveStyle('display: flex');
      expect(div).toHaveStyle('flexDirection: column');
      expect(div).toHaveStyle('alignItems: center');
      expect(div).toHaveStyle('justifyContent: center');
    });

    it('should have grab cursor', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const div = container.firstChild as HTMLElement;
      expect(div).toHaveStyle('cursor: grab');
    });

    it('should prevent text selection', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const div = container.firstChild as HTMLElement;
      expect(div).toHaveStyle('userSelect: none');
    });

    it('should prevent shrinking', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const div = container.firstChild as HTMLElement;
      expect(div).toHaveStyle('flexShrink: 0');
    });

    it('should have zero gap between flex items', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const div = container.firstChild as HTMLElement;
      expect(div).toHaveStyle('gap: 0');
    });
  });

  describe('edge cases', () => {
    it('should handle ingredient with very long name', () => {
      const longNameIngredient: Ingredient = {
        ...mockIngredient,
        name: 'This is a very long ingredient name that should be truncated',
      };
      render(<IngredientToken ingredient={longNameIngredient} size={64} />);
      expect(screen.getByText('This is a very long ingredient name that should be truncated')).toBeInTheDocument();
    });

    it('should handle size of 0', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={0} />);
      const div = container.firstChild as HTMLElement;
      expect(div).toHaveStyle('width: 0px');
      expect(div).toHaveStyle('height: 0px');
    });

    it('should handle very large size', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={1000} />);
      const div = container.firstChild as HTMLElement;
      expect(div).toHaveStyle('width: 1000px');
      expect(div).toHaveStyle('height: 1000px');
    });

    it('should handle ingredient with special emoji characters', () => {
      const specialEmojiIngredient: Ingredient = {
        ...mockIngredient,
        emoji: '🍕🍔',
      };
      render(<IngredientToken ingredient={specialEmojiIngredient} />);
      expect(screen.getByText('🍕🍔')).toBeInTheDocument();
    });

    it('should handle all mapped color variations', () => {
      const colorVariations = [
        { color: '#c0392b', name: 'Crimson' },
        { color: '#27ae60', name: 'Green' },
        { color: '#1abc9c', name: 'Turquoise' },
        { color: '#e91e8c', name: 'Pink' },
      ];

      colorVariations.forEach(({ color, name }) => {
        const { unmount } = render(
          <IngredientToken ingredient={{ ...mockIngredient, color, name }} size={64} />
        );
        expect(screen.getByText(name)).toBeInTheDocument();
        unmount();
      });
    });
  });
});