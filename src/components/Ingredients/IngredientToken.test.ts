// @ts-nocheck
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Ingredient } from '../../types';
import { IngredientToken } from './IngredientToken';

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

    it('should render the ingredient name when size is 56 or larger', () => {
      render(<IngredientToken ingredient={mockIngredient} size={56} />);
      expect(screen.getByText('Tomato')).toBeInTheDocument();
    });

    it('should not render the ingredient name when size is less than 56', () => {
      render(<IngredientToken ingredient={mockIngredient} size={55} />);
      expect(screen.queryByText('Tomato')).not.toBeInTheDocument();
    });

    it('should render with default size of 64', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const tokenDiv = container.querySelector('div');
      expect(tokenDiv).toHaveStyle({ width: '64px', height: '64px' });
    });

    it('should render with custom size', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={100} />);
      const tokenDiv = container.querySelector('div');
      expect(tokenDiv).toHaveStyle({ width: '100px', height: '100px' });
    });
  });

  describe('styling', () => {
    it('should apply background color from BG_MAP for known ingredient colors', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const tokenDiv = container.querySelector('div');
      expect(tokenDiv).toHaveStyle({ background: '#fdecea' });
    });

    it('should apply fallback background color for unknown ingredient colors', () => {
      const unknownColorIngredient: Ingredient = {
        ...mockIngredient,
        color: '#unknowncolor',
      };
      const { container } = render(<IngredientToken ingredient={unknownColorIngredient} />);
      const tokenDiv = container.querySelector('div');
      expect(tokenDiv).toHaveStyle({ background: '#f0f0f0' });
    });

    it('should apply ingredient color as border color for most colors', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const tokenDiv = container.querySelector('div');
      expect(tokenDiv).toHaveStyle({ border: '3px solid #e74c3c' });
    });

    it('should apply grey border color for light colors that would be invisible', () => {
      const lightColorIngredient: Ingredient = {
        ...mockIngredient,
        color: '#fdfefe',
      };
      const { container } = render(<IngredientToken ingredient={lightColorIngredient} />);
      const tokenDiv = container.querySelector('div');
      expect(tokenDiv).toHaveStyle({ border: '3px solid #aaaaaa' });
    });

    it('should apply circular border radius', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const tokenDiv = container.querySelector('div');
      expect(tokenDiv).toHaveStyle({ borderRadius: '50%' });
    });

    it('should apply shadow based on dragging state when not dragging', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} dragging={false} />);
      const tokenDiv = container.querySelector('div');
      expect(tokenDiv).toHaveStyle({ boxShadow: '0 3px 10px #e74c3c33' });
    });

    it('should apply shadow based on dragging state when dragging', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} dragging={true} />);
      const tokenDiv = container.querySelector('div');
      expect(tokenDiv).toHaveStyle({ boxShadow: '0 8px 24px #e74c3c66' });
    });

    it('should apply grab cursor', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const tokenDiv = container.querySelector('div');
      expect(tokenDiv).toHaveStyle({ cursor: 'grab' });
    });

    it('should prevent user selection', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const tokenDiv = container.querySelector('div');
      expect(tokenDiv).toHaveStyle({ userSelect: 'none' });
    });
  });

  describe('emoji sizing', () => {
    it('should calculate emoji font size as 42% of token size', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={100} />);
      const emojiSpan = container.querySelector('span');
      expect(emojiSpan).toHaveStyle({ fontSize: '42px' });
    });

    it('should calculate emoji font size for default size', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const emojiSpan = container.querySelector('span');
      expect(emojiSpan).toHaveStyle({ fontSize: '26.88px' });
    });
  });

  describe('name text sizing', () => {
    it('should calculate name font size as 15% of token size when size >= 56', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={100} />);
      const nameSpan = Array.from(container.querySelectorAll('span')).find(
        (el) => el.textContent === 'Tomato',
      );
      expect(nameSpan).toHaveStyle({ fontSize: '15px' });
    });

    it('should use minimum name font size of 9px', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={56} />);
      const nameSpan = Array.from(container.querySelectorAll('span')).find(
        (el) => el.textContent === 'Tomato',
      );
      expect(nameSpan).toHaveStyle({ fontSize: '9px' });
    });

    it('should apply bold font weight to name', () => {
      render(<IngredientToken ingredient={mockIngredient} size={56} />);
      const nameSpan = screen.getByText('Tomato');
      expect(nameSpan).toHaveStyle({ fontWeight: '700' });
    });

    it('should apply text color matching border color to name', () => {
      render(<IngredientToken ingredient={mockIngredient} size={56} />);
      const nameSpan = screen.getByText('Tomato');
      expect(nameSpan).toHaveStyle({ color: '#e74c3c' });
    });

    it('should center align name text', () => {
      render(<IngredientToken ingredient={mockIngredient} size={56} />);
      const nameSpan = screen.getByText('Tomato');
      expect(nameSpan).toHaveStyle({ textAlign: 'center' });
    });

    it('should truncate long names with ellipsis', () => {
      render(<IngredientToken ingredient={mockIngredient} size={56} />);
      const nameSpan = screen.getByText('Tomato');
      expect(nameSpan).toHaveStyle({
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      });
    });
  });

  describe('onClick handler', () => {
    it('should call onClick handler when clicked', async () => {
      const onClick = jest.fn();
      render(<IngredientToken ingredient={mockIngredient} onClick={onClick} />);
      const token = screen.getByText('🍅').closest('div');
      if (token) {
        await userEvent.click(token);
      }
      expect(onClick).toHaveBeenCalled();
    });

    it('should not throw error when onClick is not provided', async () => {
      render(<IngredientToken ingredient={mockIngredient} />);
      const token = screen.getByText('🍅').closest('div');
      if (token) {
        await expect(async () => {
          await userEvent.click(token);
        }).not.toThrow();
      }
    });
  });

  describe('edge cases', () => {
    it('should handle ingredient with empty name', () => {
      const emptyNameIngredient: Ingredient = {
        ...mockIngredient,
        name: '',
      };
      const { container } = render(<IngredientToken ingredient={emptyNameIngredient} size={56} />);
      const nameSpan = Array.from(container.querySelectorAll('span')).find(
        (el) => el.textContent === '',
      );
      expect(nameSpan).toBeInTheDocument();
    });

    it('should handle ingredient with very small size', () => {
      render(<IngredientToken ingredient={mockIngredient} size={10} />);
      expect(screen.getByText('🍅')).toBeInTheDocument();
      expect(screen.queryByText('Tomato')).not.toBeInTheDocument();
    });

    it('should handle ingredient with very large size', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={500} />);
      const tokenDiv = container.querySelector('div');
      expect(tokenDiv).toHaveStyle({ width: '500px', height: '500px' });
    });

    it('should handle all colors in BG_MAP', () => {
      const colorTests = [
        { color: '#c0392b', expected: '#fdecea' },
        { color: '#8e7464', expected: '#f5ede8' },
        { color: '#2c6e2c', expected: '#eaf5ea' },
        { color: '#27ae60', expected: '#e8f8f0' },
        { color: '#f1c40f', expected: '#fefce8' },
        { color: '#e74c3c', expected: '#fdecea' },
        { color: '#f39c12', expected: '#fef3e2' },
        { color: '#16a085', expected: '#e8f8f5' },
        { color: '#a93226', expected: '#f9ecea' },
        { color: '#784212', expected: '#f5eee8' },
        { color: '#d5d8dc', expected: '#f8f9fa' },
        { color: '#1abc9c', expected: '#e8faf5' },
        { color: '#2c3e50', expected: '#eaecee' },
        { color: '#fdfefe', expected: '#f8f9fa' },
        { color: '#a04000', expected: '#f5ede4' },
        { color: '#884a2d', expected: '#f5ede8' },
        { color: '#d4a96a', expected: '#fef5ea' },
        { color: '#e67e22', expected: '#fef0e4' },
        { color: '#f9a8a8', expected: '#fff0f0' },
        { color: '#f1948a', expected: '#fff0ee' },
        { color: '#1a5276', expected: '#eaf2ff' },
        { color: '#1e8bc3', expected: '#e8f4ff' },
        { color: '#58d68d', expected: '#eafaf1' },
        { color: '#8B4513', expected: '#f5ede4' },
        { color: '#e91e8c', expected: '#fde8f4' },
      ];

      colorTests.forEach(({ color, expected }) => {
        const { container } = render(
          <IngredientToken ingredient={{ ...mockIngredient, color }} />,
        );
        const tokenDiv = container.querySelector('div');
        expect(tokenDiv).toHaveStyle({ background: expected });
      });
    });

    it('should handle light colors that need grey border', () => {
      const lightColors = ['#fdfefe', '#d5d8dc', '#f9e79f'];

      lightColors.forEach((color) => {
        const { container } = render(
          <IngredientToken ingredient={{ ...mockIngredient, color }} />,
        );
        const tokenDiv = container.querySelector('div');
        expect(tokenDiv).toHaveStyle({ border: '3px solid #aaaaaa' });
      });
    });
  });

  describe('motion animations', () => {
    it('should render motion.div component', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      expect(container.querySelector('div')).toBeInTheDocument();
    });

    it('should have proper flexbox styling', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const tokenDiv = container.querySelector('div');
      expect(tokenDiv).toHaveStyle({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      });
    });

    it('should prevent flex shrinking', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const tokenDiv = container.querySelector('div');
      expect(tokenDiv).toHaveStyle({ flexShrink: 0 });
    });

    it('should have no gap between flex items', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const tokenDiv = container.querySelector('div');
      expect(tokenDiv).toHaveStyle({ gap: '0' });
    });
  });

  describe('different ingredient types', () => {
    it('should render ingredient with special emoji', () => {
      const specialIngredient: Ingredient = {
        ...mockIngredient,
        emoji: '🥗',
        name: 'Salad',
      };
      render(<IngredientToken ingredient={specialIngredient} size={56} />);
      expect(screen.getByText('🥗')).toBeInTheDocument();
      expect(screen.getByText('Salad')).toBeInTheDocument();
    });

    it('should render ingredient with long name', () => {
      const longNameIngredient: Ingredient = {
        ...mockIngredient,
        name: 'VeryLongIngredientNameThatShouldBeTruncated',
      };
      render(<IngredientToken ingredient={longNameIngredient} size={56} />);
      expect(screen.getByText('VeryLongIngredientNameThatShouldBeTruncated')).toBeInTheDocument();
    });
  });
});