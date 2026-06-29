// @ts-nocheck
import React from 'react';
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

    it('should not render the ingredient name when size < 56', () => {
      render(<IngredientToken ingredient={mockIngredient} size={55} />);
      expect(screen.queryByText('Tomato')).not.toBeInTheDocument();
    });

    it('should render with default size of 64', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle({ width: 64, height: 64 });
    });

    it('should render with custom size', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={100} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle({ width: 100, height: 100 });
    });
  });

  describe('styling', () => {
    it('should apply correct background color from BG_MAP', () => {
      const ingredient: Ingredient = {
        id: '1',
        name: 'Test',
        emoji: '🍅',
        color: '#e74c3c',
      };
      const { container } = render(<IngredientToken ingredient={ingredient} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle({ background: '#fdecea' });
    });

    it('should apply fallback background color for unmapped colors', () => {
      const ingredient: Ingredient = {
        id: '1',
        name: 'Test',
        emoji: '🍅',
        color: '#unknowncolor',
      };
      const { container } = render(<IngredientToken ingredient={ingredient} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle({ background: '#f0f0f0' });
    });

    it('should apply correct border color from ingredient color', () => {
      const ingredient: Ingredient = {
        id: '1',
        name: 'Test',
        emoji: '🍅',
        color: '#e74c3c',
      };
      const { container } = render(<IngredientToken ingredient={ingredient} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle({ border: '3px solid #e74c3c' });
    });

    it('should apply grey border color for light colors', () => {
      const ingredient: Ingredient = {
        id: '1',
        name: 'Test',
        emoji: '🍅',
        color: '#fdfefe',
      };
      const { container } = render(<IngredientToken ingredient={ingredient} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle({ border: '3px solid #aaaaaa' });
    });

    it('should apply circular border radius', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle({ borderRadius: '50%' });
    });

    it('should have cursor grab style', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle({ cursor: 'grab' });
    });

    it('should have flexbox layout', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      });
    });

    it('should not allow text selection', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle({ userSelect: 'none' });
    });

    it('should apply normal box shadow when not dragging', () => {
      const ingredient: Ingredient = {
        id: '1',
        name: 'Test',
        emoji: '🍅',
        color: '#e74c3c',
      };
      const { container } = render(<IngredientToken ingredient={ingredient} dragging={false} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle({ boxShadow: '0 3px 10px #e74c3c33' });
    });

    it('should apply dragging box shadow when dragging', () => {
      const ingredient: Ingredient = {
        id: '1',
        name: 'Test',
        emoji: '🍅',
        color: '#e74c3c',
      };
      const { container } = render(<IngredientToken ingredient={ingredient} dragging={true} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle({ boxShadow: '0 8px 24px #e74c3c66' });
    });
  });

  describe('emoji sizing', () => {
    it('should scale emoji to 42% of token size', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={100} />);
      const emojiSpan = container.querySelector('span');
      expect(emojiSpan).toHaveStyle({ fontSize: 42 });
    });

    it('should scale emoji with default size', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={64} />);
      const emojiSpan = container.querySelector('span');
      expect(emojiSpan).toHaveStyle({ fontSize: 26.88 });
    });
  });

  describe('name text styling', () => {
    it('should scale name font size to 15% of token size', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={100} />);
      const spans = container.querySelectorAll('span');
      const nameSpan = spans[1];
      expect(nameSpan).toHaveStyle({ fontSize: 15 });
    });

    it('should enforce minimum font size of 9px for name', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={30} />);
      const spans = container.querySelectorAll('span');
      const nameSpan = spans[1];
      expect(nameSpan).toHaveStyle({ fontSize: 9 });
    });

    it('should apply font weight to name', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={80} />);
      const spans = container.querySelectorAll('span');
      const nameSpan = spans[1];
      expect(nameSpan).toHaveStyle({ fontWeight: 700 });
    });

    it('should truncate long ingredient names', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={80} />);
      const spans = container.querySelectorAll('span');
      const nameSpan = spans[1];
      expect(nameSpan).toHaveStyle({
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      });
    });

    it('should apply color from visible border color', () => {
      const ingredient: Ingredient = {
        id: '1',
        name: 'Test',
        emoji: '🍅',
        color: '#e74c3c',
      };
      const { container } = render(<IngredientToken ingredient={ingredient} size={100} />);
      const spans = container.querySelectorAll('span');
      const nameSpan = spans[1];
      expect(nameSpan).toHaveStyle({ color: '#e74c3c' });
    });
  });

  describe('interaction', () => {
    it('should call onClick handler when clicked', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      render(<IngredientToken ingredient={mockIngredient} onClick={handleClick} />);
      const element = screen.getByText('🍅').closest('div');
      if (element) {
        await user.click(element);
        expect(handleClick).toHaveBeenCalled();
      }
    });

    it('should not throw if onClick is not provided', async () => {
      const user = userEvent.setup();
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const motionDiv = container.querySelector('div');
      expect(async () => {
        if (motionDiv) {
          await user.click(motionDiv);
        }
      }).not.toThrow();
    });
  });

  describe('different ingredient colors', () => {
    it('should handle all mapped colors correctly', () => {
      const colors = [
        { color: '#c0392b', expectedBg: '#fdecea' },
        { color: '#8e7464', expectedBg: '#f5ede8' },
        { color: '#2c6e2c', expectedBg: '#eaf5ea' },
        { color: '#27ae60', expectedBg: '#e8f8f0' },
        { color: '#f1c40f', expectedBg: '#fefce8' },
      ];

      colors.forEach(({ color, expectedBg }) => {
        const { container, unmount } = render(
          <IngredientToken
            ingredient={{ ...mockIngredient, color }}
            size={64}
          />
        );
        const motionDiv = container.querySelector('div');
        expect(motionDiv).toHaveStyle({ background: expectedBg });
        unmount();
      });
    });

    it('should handle grey fallback colors', () => {
      const greyColors = ['#fdfefe', '#d5d8dc', '#f9e79f'];

      greyColors.forEach((color) => {
        const { container, unmount } = render(
          <IngredientToken
            ingredient={{ ...mockIngredient, color }}
            size={64}
          />
        );
        const motionDiv = container.querySelector('div');
        expect(motionDiv).toHaveStyle({ border: '3px solid #aaaaaa' });
        unmount();
      });
    });
  });

  describe('size edge cases', () => {
    it('should handle size of 0', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={0} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle({ width: 0, height: 0 });
    });

    it('should handle very large sizes', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={1000} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle({ width: 1000, height: 1000 });
    });

    it('should handle size exactly at 56 boundary', () => {
      render(<IngredientToken ingredient={mockIngredient} size={56} />);
      expect(screen.getByText('Tomato')).toBeInTheDocument();
    });

    it('should handle size just below 56 boundary', () => {
      render(<IngredientToken ingredient={mockIngredient} size={55.99} />);
      expect(screen.queryByText('Tomato')).not.toBeInTheDocument();
    });
  });

  describe('dragging state', () => {
    it('should apply dragging styles when dragging is true', () => {
      const { container } = render(
        <IngredientToken ingredient={mockIngredient} dragging={true} />
      );
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle({ boxShadow: expect.stringContaining('#e74c3c66') });
    });

    it('should apply normal styles when dragging is false', () => {
      const { container } = render(
        <IngredientToken ingredient={mockIngredient} dragging={false} />
      );
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle({ boxShadow: expect.stringContaining('#e74c3c33') });
    });

    it('should apply normal styles when dragging is undefined', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const motionDiv = container.querySelector('div');
      expect(motionDiv).toHaveStyle({ boxShadow: expect.stringContaining('#e74c3c33') });
    });
  });

  describe('ingredient with different emoji and names', () => {
    it('should render correctly with different emoji', () => {
      const ingredient: Ingredient = {
        id: '1',
        name: 'Apple',
        emoji: '🍎',
        color: '#e74c3c',
      };
      render(<IngredientToken ingredient={ingredient} size={64} />);
      expect(screen.getByText('🍎')).toBeInTheDocument();
    });

    it('should render correctly with long ingredient name', () => {
      const ingredient: Ingredient = {
        id: '1',
        name: 'VeryLongIngredientNameThatMightOverflow',
        emoji: '🍅',
        color: '#e74c3c',
      };
      render(<IngredientToken ingredient={ingredient} size={64} />);
      expect(screen.getByText('VeryLongIngredientNameThatMightOverflow')).toBeInTheDocument();
    });

    it('should render correctly with single character name', () => {
      const ingredient: Ingredient = {
        id: '1',
        name: 'A',
        emoji: '🍅',
        color: '#e74c3c',
      };
      render(<IngredientToken ingredient={ingredient} size={64} />);
      expect(screen.getByText('A')).toBeInTheDocument();
    });
  });
});