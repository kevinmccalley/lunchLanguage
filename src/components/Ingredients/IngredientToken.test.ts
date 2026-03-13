// @ts-nocheck
import { render } from '@testing-library/react';
import { IngredientToken } from '../../../src/components/Ingredients/IngredientToken';
import type { Ingredient } from '../../../src/types';

// Mock framer-motion to avoid animation complexity in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, style, onClick, animate, whileHover, whileTap, ...props }: any) =>
      React.createElement('div', { ...props, onClick, style, 'data-animate': JSON.stringify(animate) }, children),
  },
}));

import React from 'react';

describe('IngredientToken', () => {
  const mockIngredient: Ingredient = {
    id: '1',
    name: 'Tomato',
    emoji: '🍅',
    color: '#e74c3c',
  };

  describe('rendering', () => {
    it('should render the component with default props', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      expect(container.querySelector('div')).toBeInTheDocument();
    });

    it('should render the ingredient emoji', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const span = container.querySelector('span');
      expect(span?.textContent).toBe('🍅');
    });

    it('should render the ingredient name when size >= 56', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={60} />);
      const spans = container.querySelectorAll('span');
      const nameSpan = Array.from(spans).find((s) => s.textContent === 'Tomato');
      expect(nameSpan).toBeInTheDocument();
    });

    it('should not render the ingredient name when size < 56', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={50} />);
      const spans = container.querySelectorAll('span');
      const nameSpan = Array.from(spans).find((s) => s.textContent === 'Tomato');
      expect(nameSpan).not.toBeInTheDocument();
    });

    it('should render with size 56 boundary (should show name)', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={56} />);
      const spans = container.querySelectorAll('span');
      const nameSpan = Array.from(spans).find((s) => s.textContent === 'Tomato');
      expect(nameSpan).toBeInTheDocument();
    });

    it('should render with size 55 boundary (should not show name)', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={55} />);
      const spans = container.querySelectorAll('span');
      const nameSpan = Array.from(spans).find((s) => s.textContent === 'Tomato');
      expect(nameSpan).not.toBeInTheDocument();
    });
  });

  describe('styling', () => {
    it('should apply the correct background color from BG_MAP', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const div = container.querySelector('div');
      expect(div?.style.background).toBe('#fdecea');
    });

    it('should apply fallback background color when color is not in BG_MAP', () => {
      const customIngredient: Ingredient = {
        ...mockIngredient,
        color: '#unknowncolor',
      };
      const { container } = render(<IngredientToken ingredient={customIngredient} />);
      const div = container.querySelector('div');
      expect(div?.style.background).toBe('#f0f0f0');
    });

    it('should apply the correct border color from ingredient color', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const div = container.querySelector('div');
      expect(div?.style.border).toContain('#e74c3c');
    });

    it('should apply grey border color for light/near-white colors', () => {
      const lightIngredient: Ingredient = {
        ...mockIngredient,
        color: '#fdfefe',
      };
      const { container } = render(<IngredientToken ingredient={lightIngredient} />);
      const div = container.querySelector('div');
      expect(div?.style.border).toContain('#aaaaaa');
    });

    it('should apply the correct size to width and height', () => {
      const customSize = 100;
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={customSize} />);
      const div = container.querySelector('div');
      expect(div?.style.width).toBe('100px');
      expect(div?.style.height).toBe('100px');
    });

    it('should apply default size of 64 when not provided', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const div = container.querySelector('div');
      expect(div?.style.width).toBe('64px');
      expect(div?.style.height).toBe('64px');
    });

    it('should apply rounded border radius', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const div = container.querySelector('div');
      expect(div?.style.borderRadius).toBe('50%');
    });

    it('should have grab cursor style', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const div = container.querySelector('div');
      expect(div?.style.cursor).toBe('grab');
    });

    it('should apply shadow when not dragging', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} dragging={false} />);
      const div = container.querySelector('div');
      expect(div?.style.boxShadow).toContain('0 3px 10px');
    });

    it('should apply larger shadow when dragging', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} dragging={true} />);
      const div = container.querySelector('div');
      expect(div?.style.boxShadow).toContain('0 8px 24px');
    });
  });

  describe('emoji sizing', () => {
    it('should calculate emoji font size as 42% of component size', () => {
      const size = 100;
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={size} />);
      const emojiSpan = container.querySelectorAll('span')[0];
      expect(emojiSpan?.style.fontSize).toBe(`${size * 0.42}px`);
    });

    it('should calculate emoji font size for default size', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const emojiSpan = container.querySelectorAll('span')[0];
      expect(emojiSpan?.style.fontSize).toBe('26.88px');
    });
  });

  describe('name sizing and truncation', () => {
    it('should calculate name font size as 15% of component size when size >= 56', () => {
      const size = 100;
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={size} />);
      const nameSpan = container.querySelectorAll('span')[1];
      expect(nameSpan?.style.fontSize).toBe(`${size * 0.15}px`);
    });

    it('should apply minimum font size of 9px for name', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={56} />);
      const nameSpan = container.querySelectorAll('span')[1];
      const fontSize = parseInt(nameSpan?.style.fontSize || '0');
      expect(fontSize).toBeGreaterThanOrEqual(9);
    });

    it('should apply text overflow ellipsis for long names', () => {
      const longNameIngredient: Ingredient = {
        ...mockIngredient,
        name: 'Very Long Ingredient Name',
      };
      const { container } = render(
        <IngredientToken ingredient={longNameIngredient} size={60} />
      );
      const nameSpan = container.querySelectorAll('span')[1];
      expect(nameSpan?.style.textOverflow).toBe('ellipsis');
      expect(nameSpan?.style.overflow).toBe('hidden');
      expect(nameSpan?.style.whiteSpace).toBe('nowrap');
    });

    it('should restrict name max-width to size - 8', () => {
      const size = 100;
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={size} />);
      const nameSpan = container.querySelectorAll('span')[1];
      expect(nameSpan?.style.maxWidth).toBe(`${size - 8}px`);
    });
  });

  describe('animation', () => {
    it('should apply scale and rotate animation when dragging', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} dragging={true} />);
      const div = container.querySelector('div');
      const animate = JSON.parse(div?.getAttribute('data-animate') || '{}');
      expect(animate.scale).toBe(1.2);
      expect(animate.rotate).toBe(8);
    });

    it('should reset animation when not dragging', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} dragging={false} />);
      const div = container.querySelector('div');
      const animate = JSON.parse(div?.getAttribute('data-animate') || '{}');
      expect(animate.scale).toBe(1);
      expect(animate.rotate).toBe(0);
    });
  });

  describe('interaction', () => {
    it('should call onClick handler when clicked', () => {
      const mockOnClick = jest.fn();
      const { container } = render(
        <IngredientToken ingredient={mockIngredient} onClick={mockOnClick} />
      );
      const div = container.querySelector('div');
      div?.click();
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when not provided', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const div = container.querySelector('div');
      expect(() => div?.click()).not.toThrow();
    });
  });

  describe('flexbox layout', () => {
    it('should use flex layout with column direction', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const div = container.querySelector('div');
      expect(div?.style.display).toBe('flex');
      expect(div?.style.flexDirection).toBe('column');
    });

    it('should center content both horizontally and vertically', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const div = container.querySelector('div');
      expect(div?.style.alignItems).toBe('center');
      expect(div?.style.justifyContent).toBe('center');
    });

    it('should prevent flex shrinking', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const div = container.querySelector('div');
      expect(div?.style.flexShrink).toBe('0');
    });

    it('should have zero gap between flex items', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const div = container.querySelector('div');
      expect(div?.style.gap).toBe('0');
    });
  });

  describe('various color mappings', () => {
    const colorCases = [
      { color: '#c0392b', expectedBg: '#fdecea' },
      { color: '#8e7464', expectedBg: '#f5ede8' },
      { color: '#2c6e2c', expectedBg: '#eaf5ea' },
      { color: '#27ae60', expectedBg: '#e8f8f0' },
      { color: '#f1c40f', expectedBg: '#fefce8' },
      { color: '#1abc9c', expectedBg: '#e8faf5' },
      { color: '#e91e8c', expectedBg: '#fde8f4' },
    ];

    colorCases.forEach(({ color, expectedBg }) => {
      it(`should map color ${color} to background ${expectedBg}`, () => {
        const ingredient: Ingredient = {
          ...mockIngredient,
          color,
        };
        const { container } = render(<IngredientToken ingredient={ingredient} />);
        const div = container.querySelector('div');
        expect(div?.style.background).toBe(expectedBg);
      });
    });
  });

  describe('light color border handling', () => {
    const lightColors = ['#fdfefe', '#d5d8dc', '#f9e79f'];

    lightColors.forEach((color) => {
      it(`should apply grey border for light color ${color}`, () => {
        const ingredient: Ingredient = {
          ...mockIngredient,
          color,
        };
        const { container } = render(<IngredientToken ingredient={ingredient} />);
        const div = container.querySelector('div');
        expect(div?.style.border).toContain('#aaaaaa');
      });
    });
  });

  describe('edge cases', () => {
    it('should handle very small size', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={1} />);
      const div = container.querySelector('div');
      expect(div?.style.width).toBe('1px');
      expect(div?.style.height).toBe('1px');
    });

    it('should handle very large size', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={1000} />);
      const div = container.querySelector('div');
      expect(div?.style.width).toBe('1000px');
      expect(div?.style.height).toBe('1000px');
    });

    it('should handle ingredient with empty name', () => {
      const ingredient: Ingredient = {
        ...mockIngredient,
        name: '',
      };
      const { container } = render(
        <IngredientToken ingredient={ingredient} size={60} />
      );
      const nameSpan = container.querySelectorAll('span')[1];
      expect(nameSpan?.textContent).toBe('');
    });

    it('should handle ingredient with very long name', () => {
      const ingredient: Ingredient = {
        ...mockIngredient,
        name: 'A'.repeat(100),
      };
      const { container } = render(
        <IngredientToken ingredient={ingredient} size={60} />
      );
      const nameSpan = container.querySelectorAll('span')[1];
      expect(nameSpan).toBeInTheDocument();
      expect(nameSpan?.style.textOverflow).toBe('ellipsis');
    });

    it('should handle multiple emojis', () => {
      const ingredient: Ingredient = {
        ...mockIngredient,
        emoji: '🍅🥕',
      };
      const { container } = render(<IngredientToken ingredient={ingredient} />);
      const emojiSpan = container.querySelectorAll('span')[0];
      expect(emojiSpan?.textContent).toBe('🍅🥕');
    });

    it('should apply no user select property', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const div = container.querySelector('div');
      expect(div?.style.userSelect).toBe('none');
    });
  });

  describe('name font weight and styling', () => {
    it('should apply bold font weight to name', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={60} />);
      const nameSpan = container.querySelectorAll('span')[1];
      expect(nameSpan?.style.fontWeight).toBe('700');
    });

    it('should center text align name', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={60} />);
      const nameSpan = container.querySelectorAll('span')[1];
      expect(nameSpan?.style.textAlign).toBe('center');
    });

    it('should apply line height 1.1 to name', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} size={60} />);
      const nameSpan = container.querySelectorAll('span')[1];
      expect(nameSpan?.style.lineHeight).toBe('1.1');
    });
  });

  describe('emoji line height', () => {
    it('should apply line height 1 to emoji', () => {
      const { container } = render(<IngredientToken ingredient={mockIngredient} />);
      const emojiSpan = container.querySelectorAll('span')[0];
      expect(emojiSpan?.style.lineHeight).toBe('1');
    });
  });
});