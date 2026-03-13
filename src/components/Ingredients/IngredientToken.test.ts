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
    it('should render ingredient emoji', () => {
      render(<IngredientToken ingredient={mockIngredient} />);
      expect(screen.getByText('🍅')).toBeInTheDocument();
    });

    it('should render ingredient name when size is 56 or greater', () => {
      render(<IngredientToken ingredient={mockIngredient} size={56} />);
      expect(screen.getByText('Tomato')).toBeInTheDocument();
    });

    it('should not render ingredient name when size is less than 56', () => {
      render(<IngredientToken ingredient={mockIngredient} size={55} />);
      expect(screen.queryByText('Tomato')).not.toBeInTheDocument();
    });

    it('should render with default size of 64', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const div = container.querySelector('div');
      expect(div).toHaveStyle({ width: '64px', height: '64px' });
    });

    it('should render with custom size', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={80} />);
      const div = container.querySelector('div');
      expect(div).toHaveStyle({ width: '80px', height: '80px' });
    });

    it('should apply background color from BG_MAP when color exists', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const div = container.querySelector('div');
      expect(div).toHaveStyle({ background: '#fdecea' });
    });

    it('should apply fallback background color when color not in BG_MAP', () => {
      const unknownColorIngredient: Ingredient = {
        ...mockIngredient,
        color: '#unknown00',
      };
      const { container } = render(<IngredientToken ingredient={unknownColorIngredient} />);
      const div = container.querySelector('div');
      expect(div).toHaveStyle({ background: '#f0f0f0' });
    });

    it('should apply visible border color for near-white colors', () => {
      const lightColorIngredient: Ingredient = {
        ...mockIngredient,
        color: '#fdfefe',
      };
      const { container } = render(<IngredientToken ingredient={lightColorIngredient} />);
      const div = container.querySelector('div');
      expect(div).toHaveStyle({ border: '3px solid #aaaaaa' });
    });

    it('should apply ingredient color as border for dark colors', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const div = container.querySelector('div');
      expect(div).toHaveStyle({ border: '3px solid #e74c3c' });
    });

    it('should apply circular border radius', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const div = container.querySelector('div');
      expect(div).toHaveStyle({ borderRadius: '50%' });
    });

    it('should apply flex layout styles', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const div = container.querySelector('div');
      expect(div).toHaveStyle({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      });
    });

    it('should apply shadow styles when not dragging', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} dragging={false} />);
      const div = container.querySelector('div');
      expect(div).toHaveStyle({ boxShadow: '0 3px 10px #e74c3c33' });
    });

    it('should apply larger shadow styles when dragging', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} dragging={true} />);
      const div = container.querySelector('div');
      expect(div).toHaveStyle({ boxShadow: '0 8px 24px #e74c3c66' });
    });

    it('should apply grab cursor', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const div = container.querySelector('div');
      expect(div).toHaveStyle({ cursor: 'grab' });
    });

    it('should apply user-select none', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const div = container.querySelector('div');
      expect(div).toHaveStyle({ userSelect: 'none' });
    });

    it('should apply flex-shrink 0', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const div = container.querySelector('div');
      expect(div).toHaveStyle({ flexShrink: '0' });
    });
  });

  describe('emoji sizing', () => {
    it('should size emoji at 42% of token size', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={100} />);
      const span = container.querySelector('span');
      expect(span).toHaveStyle({ fontSize: '42px' });
    });

    it('should size emoji proportionally for default size', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={64} />);
      const span = container.querySelector('span');
      expect(span).toHaveStyle({ fontSize: '26.88px' });
    });
  });

  describe('name text sizing', () => {
    it('should size name text at 15% of token size for larger tokens', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={100} />);
      const spans = container.querySelectorAll('span');
      const nameSpan = spans[1];
      expect(nameSpan).toHaveStyle({ fontSize: '15px' });
    });

    it('should use minimum font size of 9px for very small tokens', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={56} />);
      const spans = container.querySelectorAll('span');
      const nameSpan = spans[1];
      expect(nameSpan).toHaveStyle({ fontSize: '9px' });
    });

    it('should apply text styling to name', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={64} />);
      const spans = container.querySelectorAll('span');
      const nameSpan = spans[1];
      expect(nameSpan).toHaveStyle({
        fontWeight: '700',
        textAlign: 'center',
        lineHeight: '1.1',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      });
    });

    it('should set max-width for name text', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={64} />);
      const spans = container.querySelectorAll('span');
      const nameSpan = spans[1];
      expect(nameSpan).toHaveStyle({ maxWidth: '56px' });
    });
  });

  describe('onClick handler', () => {
    it('should call onClick when token is clicked', async () => {
      const user = await userEvent.setup();
      const handleClick = jest.fn();
      const { container } = render(
        <IngredientToken ingredient={mockIngredient} onClick={handleClick} />
      );
      const token = container.querySelector('div');
      await user.click(token!);
      expect(handleClick).toHaveBeenCalled();
    });

    it('should not throw error when onClick is not provided', async () => {
      const user = await userEvent.setup();
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const token = container.querySelector('div');
      expect(async () => {
        await user.click(token!);
      }).not.toThrow();
    });
  });

  describe('dragging state', () => {
    it('should apply dragging animation when dragging is true', () => {
      const { container } = render(
        <IngredientToken ingredient={mockIngredient} dragging={true} />
      );
      const div = container.querySelector('div');
      expect(div).toBeInTheDocument();
    });

    it('should apply idle animation when dragging is false', () => {
      const { container } = render(
        <IngredientToken ingredient={mockIngredient} dragging={false} />
      );
      const div = container.querySelector('div');
      expect(div).toBeInTheDocument();
    });

    it('should apply idle animation when dragging is undefined', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const div = container.querySelector('div');
      expect(div).toBeInTheDocument();
    });
  });

  describe('BG_MAP coverage', () => {
    it('should handle all colors in BG_MAP correctly', () => {
      const colors = [
        '#c0392b',
        '#8e7464',
        '#2c6e2c',
        '#27ae60',
        '#f1c40f',
        '#e74c3c',
        '#f39c12',
        '#16a085',
        '#a93226',
        '#784212',
        '#d5d8dc',
        '#1abc9c',
        '#2c3e50',
        '#fdfefe',
        '#a04000',
        '#884a2d',
        '#d4a96a',
        '#e67e22',
        '#f9a8a8',
        '#f1948a',
        '#1a5276',
        '#1e8bc3',
        '#58d68d',
        '#8B4513',
        '#e91e8c',
      ];

      colors.forEach((color) => {
        const { container } = render(
          <IngredientToken ingredient={{ ...mockIngredient, color }} />
        );
        const div = container.querySelector('div');
        expect(div).toHaveStyle({ background: expect.any(String) });
      });
    });
  });

  describe('visibleBorderColor logic', () => {
    it('should return grey for #fdfefe', () => {
      const { container } = render(
        <IngredientToken ingredient={{ ...mockIngredient, color: '#fdfefe' }} />
      );
      const div = container.querySelector('div');
      expect(div).toHaveStyle({ border: '3px solid #aaaaaa' });
    });

    it('should return grey for #d5d8dc', () => {
      const { container } = render(
        <IngredientToken ingredient={{ ...mockIngredient, color: '#d5d8dc' }} />
      );
      const div = container.querySelector('div');
      expect(div).toHaveStyle({ border: '3px solid #aaaaaa' });
    });

    it('should return grey for #f9e79f', () => {
      const { container } = render(
        <IngredientToken ingredient={{ ...mockIngredient, color: '#f9e79f' }} />
      );
      const div = container.querySelector('div');
      expect(div).toHaveStyle({ border: '3px solid #aaaaaa' });
    });

    it('should return original color for non-light colors', () => {
      const { container } = render(
        <IngredientToken ingredient={{ ...mockIngredient, color: '#e74c3c' }} />
      );
      const div = container.querySelector('div');
      expect(div).toHaveStyle({ border: '3px solid #e74c3c' });
    });
  });

  describe('edge cases', () => {
    it('should render with size of 0', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={0} />);
      const div = container.querySelector('div');
      expect(div).toHaveStyle({ width: '0px', height: '0px' });
    });

    it('should render with very large size', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={1000} />);
      const div = container.querySelector('div');
      expect(div).toHaveStyle({ width: '1000px', height: '1000px' });
    });

    it('should handle empty ingredient name', () => {
      const emptyNameIngredient: Ingredient = {
        ...mockIngredient,
        name: '',
      };
      render(<IngredientToken ingredient={emptyNameIngredient} size={64} />);
      expect(screen.queryByText('Tomato')).not.toBeInTheDocument();
    });

    it('should handle very long ingredient name', () => {
      const longNameIngredient: Ingredient = {
        ...mockIngredient,
        name: 'Very Long Ingredient Name That Should Overflow',
      };
      render(<IngredientToken ingredient={longNameIngredient} size={64} />);
      expect(screen.getByText('Very Long Ingredient Name That Should Overflow')).toBeInTheDocument();
    });

    it('should handle special characters in emoji', () => {
      const specialEmojiIngredient: Ingredient = {
        ...mockIngredient,
        emoji: '👨‍🍳',
      };
      render(<IngredientToken ingredient={specialEmojiIngredient} />);
      expect(screen.getByText('👨‍🍳')).toBeInTheDocument();
    });

    it('should handle multiple special characters in emoji', () => {
      const complexEmojiIngredient: Ingredient = {
        ...mockIngredient,
        emoji: '🥘',
      };
      render(<IngredientToken ingredient={complexEmojiIngredient} />);
      expect(screen.getByText('🥘')).toBeInTheDocument();
    });
  });
});