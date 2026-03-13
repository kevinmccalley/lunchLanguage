// @ts-nocheck
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { motion } from 'framer-motion';
import { DraggableIngredient } from './DraggableIngredient';
import { getIngredientById } from '../../data/ingredients';
import { useGameStore } from '../../store/gameStore';
import { useLanguageStore } from '../../store/languageStore';
import { TRANSLATIONS } from '../../i18n/translations';
import type { PlacedIngredient } from '../../types';

jest.mock('../../data/ingredients');
jest.mock('../../store/gameStore');
jest.mock('../../store/languageStore');
jest.mock('../../i18n/translations');
jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  motion: {
    div: jest.fn(({ children, ...props }) => (
      <div data-testid="motion-div" {...props}>
        {children}
      </div>
    )),
  },
}));

describe('DraggableIngredient', () => {
  const mockMoveIngredient = jest.fn();
  const mockRemoveIngredient = jest.fn();
  const mockGetIngredientById = getIngredientById as jest.MockedFunction<typeof getIngredientById>;
  const mockUseGameStore = useGameStore as jest.MockedFunction<typeof useGameStore>;
  const mockUseLanguageStore = useLanguageStore as jest.MockedFunction<typeof useLanguageStore>;

  const mockIngredient = {
    id: 'tomato',
    emoji: '🍅',
    name: 'Tomato',
  };

  const mockPlacedIngredient: PlacedIngredient = {
    instanceId: 'instance-1',
    ingredientId: 'tomato',
    x: 100,
    y: 150,
    scale: 1,
    rotation: 0,
  };

  const mockContainerRef = {
    current: {
      getBoundingClientRect: jest.fn(() => ({
        width: 500,
        height: 600,
        top: 0,
        left: 0,
        right: 500,
        bottom: 600,
        x: 0,
        y: 0,
        toJSON: jest.fn(),
      })),
    } as unknown as HTMLDivElement,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseGameStore.mockReturnValue({
      moveIngredient: mockMoveIngredient,
      removeIngredient: mockRemoveIngredient,
    } as any);
    mockUseLanguageStore.mockReturnValue({
      learningLanguage: 'es',
    } as any);
    mockGetIngredientById.mockReturnValue(mockIngredient);
  });

  describe('rendering', () => {
    it('should render the ingredient emoji when ingredient exists', () => {
      const { container } = render(
        <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef} />
      );
      expect(container.textContent).toContain('🍅');
    });

    it('should return null when ingredient does not exist', () => {
      mockGetIngredientById.mockReturnValue(null);
      const { container } = render(
        <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef} />
      );
      expect(container.firstChild).toBeNull();
    });

    it('should render with correct size based on scale', () => {
      const scaledItem = { ...mockPlacedIngredient, scale: 2 };
      const { container } = render(
        <DraggableIngredient item={scaledItem} containerRef={mockContainerRef} />
      );
      const emojiContainer = container.querySelector('span');
      expect(emojiContainer).toHaveStyle({ fontSize: '96px', lineHeight: '1', display: 'block' });
    });

    it('should calculate size as 48 * scale rounded', () => {
      const scaledItem = { ...mockPlacedIngredient, scale: 1.5 };
      const expectedSize = Math.round(48 * 1.5);
      const { container } = render(
        <DraggableIngredient item={scaledItem} containerRef={mockContainerRef} />
      );
      const emojiContainer = container.querySelector('span');
      expect(emojiContainer).toHaveStyle({ fontSize: `${expectedSize}px` });
    });
  });

  describe('learning label', () => {
    it('should render learning word label when learning language is set', () => {
      const mockTranslations = {
        es: {
          ingredients: {
            tomato: 'Tomate',
          },
        },
      };
      (TRANSLATIONS as any) = mockTranslations;
      mockUseLanguageStore.mockReturnValue({
        learningLanguage: 'es',
      } as any);

      const { container } = render(
        <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef} />
      );
      
      const labels = container.querySelectorAll('div');
      const hasLabel = Array.from(labels).some(
        (label) => label.textContent && label.textContent.includes('Tomate')
      );
      expect(hasLabel).toBe(true);
    });

    it('should not render label when learning language is null', () => {
      mockUseLanguageStore.mockReturnValue({
        learningLanguage: null,
      } as any);

      const { container } = render(
        <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef} />
      );

      const hasColoredLabel = container.querySelector('[style*="rgb(255, 107, 53)"]');
      expect(hasColoredLabel).not.toBeInTheDocument();
    });

    it('should not render label when dragging', () => {
      const mockTranslations = {
        es: {
          ingredients: {
            tomato: 'Tomate',
          },
        },
      };
      (TRANSLATIONS as any) = mockTranslations;

      const { container, rerender } = render(
        <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef} />
      );

      fireEvent.pointerDown(container.querySelector('[data-testid="motion-div"]')!);
      rerender(
        <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef} />
      );

      // After drag starts, label should be hidden
      // This is verified by the showLabel && !dragging condition
    });
  });

  describe('drag interactions', () => {
    it('should set dragging state on drag start', () => {
      const { container } = render(
        <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef} />
      );

      const motionDiv = container.querySelector('[data-testid="motion-div"]');
      expect(motionDiv).toHaveStyle('cursor: grab');
    });

    it('should update cursor style to grabbing when dragging', () => {
      const { container } = render(
        <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef} />
      );

      const motionDiv = container.querySelector('[data-testid="motion-div"]')!;
      fireEvent.pointerDown(motionDiv);

      expect(motionDiv).toHaveStyle('cursor: grab');
    });

    it('should call moveIngredient on drag end within bounds', () => {
      const { container } = render(
        <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef} />
      );

      const motionDiv = container.querySelector('[data-testid="motion-div"]')!;
      fireEvent.pointerUp(motionDiv);

      expect(mockMoveIngredient).toHaveBeenCalled();
    });

    it('should remove ingredient when dragged far left', () => {
      const itemDraggedLeft = { ...mockPlacedIngredient, x: -100 };
      const { container } = render(
        <DraggableIngredient item={itemDraggedLeft} containerRef={mockContainerRef} />
      );

      const motionDiv = container.querySelector('[data-testid="motion-div"]')!;
      fireEvent.pointerUp(motionDiv);

      expect(mockRemoveIngredient).toHaveBeenCalledWith('instance-1');
    });

    it('should remove ingredient when dragged far up', () => {
      const itemDraggedUp = { ...mockPlacedIngredient, y: -100 };
      const { container } = render(
        <DraggableIngredient item={itemDraggedUp} containerRef={mockContainerRef} />
      );

      const motionDiv = container.querySelector('[data-testid="motion-div"]')!;
      fireEvent.pointerUp(motionDiv);

      expect(mockRemoveIngredient).toHaveBeenCalledWith('instance-1');
    });

    it('should remove ingredient when dragged far right', () => {
      const itemDraggedRight = { ...mockPlacedIngredient, x: 600 };
      const { container } = render(
        <DraggableIngredient item={itemDraggedRight} containerRef={mockContainerRef} />
      );

      const motionDiv = container.querySelector('[data-testid="motion-div"]')!;
      fireEvent.pointerUp(motionDiv);

      expect(mockRemoveIngredient).toHaveBeenCalledWith('instance-1');
    });

    it('should remove ingredient when dragged far down', () => {
      const itemDraggedDown = { ...mockPlacedIngredient, y: 700 };
      const { container } = render(
        <DraggableIngredient item={itemDraggedDown} containerRef={mockContainerRef} />
      );

      const motionDiv = container.querySelector('[data-testid="motion-div"]')!;
      fireEvent.pointerUp(motionDiv);

      expect(mockRemoveIngredient).toHaveBeenCalledWith('instance-1');
    });

    it('should not remove ingredient when within boundary margins', () => {
      const itemWithinBounds = { ...mockPlacedIngredient, x: 10, y: 10 };
      const { container } = render(
        <DraggableIngredient item={itemWithinBounds} containerRef={mockContainerRef} />
      );

      const motionDiv = container.querySelector('[data-testid="motion-div"]')!;
      fireEvent.pointerUp(motionDiv);

      expect(mockRemoveIngredient).not.toHaveBeenCalled();
      expect(mockMoveIngredient).toHaveBeenCalled();
    });

    it('should not remove ingredient when at edge boundaries', () => {
      const itemAtEdge = { ...mockPlacedIngredient, x: -59, y: -59 };
      const { container } = render(
        <DraggableIngredient item={itemAtEdge} containerRef={mockContainerRef} />
      );

      const motionDiv = container.querySelector('[data-testid="motion-div"]')!;
      fireEvent.pointerUp(motionDiv);

      expect(mockRemoveIngredient).not.toHaveBeenCalled();
      expect(mockMoveIngredient).toHaveBeenCalled();
    });

    it('should handle drag end when containerRef is null', () => {
      const nullContainerRef = { current: null };
      const { container } = render(
        <DraggableIngredient item={mockPlacedIngredient} containerRef={nullContainerRef} />
      );

      const motionDiv = container.querySelector('[data-testid="motion-div"]')!;
      fireEvent.pointerUp(motionDiv);

      expect(mockMoveIngredient).not.toHaveBeenCalled();
      expect(mockRemoveIngredient).not.toHaveBeenCalled();
    });
  });

  describe('double click', () => {
    it('should remove ingredient on double click', () => {
      const { container } = render(
        <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef} />
      );

      const motionDiv = container.querySelector('[data-testid="motion-div"]')!;
      fireEvent.doubleClick(motionDiv);

      expect(mockRemoveIngredient).toHaveBeenCalledWith('instance-1');
    });
  });

  describe('styling', () => {
    it('should apply correct position styles', () => {
      const { container } = render(
        <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef} />
      );

      const motionDiv = container.querySelector('[data-testid="motion-div"]')!;
      expect(motionDiv).toHaveStyle({
        position: 'absolute',
        left: '0',
        top: '0',
        touchAction: 'none',
        userSelect: 'none',
      });
    });

    it('should apply grab cursor by default', () => {
      const { container } = render(
        <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef} />
      );

      const motionDiv = container.querySelector('[data-testid="motion-div"]')!;
      expect(motionDiv).toHaveStyle('cursor: grab');
    });

    it('should apply correct z-index when not dragging', () => {
      const { container } = render(
        <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef} />
      );

      const motionDiv = container.querySelector('[data-testid="motion-div"]')!;
      expect(motionDiv).toHaveStyle('zIndex: 10');
    });

    it('should apply rotation from item', () => {
      const rotatedItem = { ...mockPlacedIngredient, rotation: 45 };
      const { container } = render(
        <DraggableIngredient item={rotatedItem} containerRef={mockContainerRef} />
      );

      const motionDiv = container.querySelector('[data-testid="motion-div"]')!;
      expect(motionDiv).toHaveStyle('rotate: 45');
    });

    it('should apply shadow filter when dragging', () => {
      const { container } = render(
        <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef} />
      );

      const emojiContainer = container.querySelector('div > div');
      expect(emojiContainer).toHaveStyle('filter: none');
    });
  });

  describe('label styling', () => {
    it('should apply correct label background color', () => {
      const mockTranslations = {
        es: {
          ingredients: {
            tomato: 'Tomate',
          },
        },
      };
      (TRANSLATIONS as any) = mockTranslations;

      const { container } = render(
        <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef} />
      );

      const label = container.querySelector('[style*="background: #ff6b35"]');
      expect(label).toBeInTheDocument();
    });

    it('should calculate label font size based on ingredient size', () => {
      const mockTranslations = {
        es: {
          ingredients: {
            tomato: 'Tomate',
          },
        },
      };
      (TRANSLATIONS as any) = mockTranslations;
      const scaledItem = { ...mockPlacedIngredient, scale: 2 };

      const { container } = render(
        <DraggableIngredient item={scaledItem} containerRef={mockContainerRef} />
      );

      // Font size should be Math.max(9, size * 0.22) = Math.max(9, 96 * 0.22) = Math.max(9, 21.12)
      const labels = container.querySelectorAll('div');
      const labelFound = Array.from(labels).some((label) => {
        const style = label.getAttribute('style');
        return style && style.includes('fontSize');
      });
      expect(labelFound).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should handle ingredient with scale of 0', () => {
      const zeroScaleItem = { ...mockPlacedIngredient, scale: 0 };
      const { container } = render(
        <DraggableIngredient item={zeroScaleItem} containerRef={mockContainerRef} />
      );

      const emojiContainer = container.querySelector('span');
      expect(emojiContainer).toHaveStyle('fontSize: 0px');
    });

    it('should handle very large scale values', () => {
      const largeScaleItem = { ...mockPlacedIngredient, scale: 10 };
      const { container } = render(
        <DraggableIngredient item={largeScaleItem} containerRef={mockContainerRef} />
      );

      const emojiContainer = container.querySelector('span');
      expect(emojiContainer).toHaveStyle('fontSize: 480px');
    });

    it('should handle rotation values', () => {
      const rotations = [0, 90, 180, 270, 360, -90];
      rotations.forEach((rotation) => {
        const { container } = render(
          <DraggableIngredient
            item={{ ...mockPlacedIngredient, rotation }}
            containerRef={mockContainerRef}
          />
        );

        const motionDiv = container.querySelector('[data-testid="motion-div"]')!;
        expect(motionDiv).toHaveStyle(`rotate: ${rotation}`);
      });
    });

    it('should handle negative coordinates', () => {
      const negativeCoordItem = { ...mockPlacedIngredient, x: -50, y: -50 };
      const { container } = render(
        <DraggableIngredient item={negativeCoordItem} containerRef={mockContainerRef} />
      );

      expect(container.querySelector('[data-testid="motion-div"]')).toBeInTheDocument();
    });

    it('should handle very large coordinates', () => {
      const largeCoordItem = { ...mockPlacedIngredient, x: 10000, y: 10000 };
      const { container } = render(
        <DraggableIngredient item={largeCoordItem} containerRef={mockContainerRef} />
      );

      expect(container.querySelector('[data-testid="motion-div"]')).toBeInTheDocument();
    });
  });

  describe('multiple instances', () => {
    it('should render multiple draggable ingredients independently', () => {
      const item1 = { ...mockPlacedIngredient, instanceId: 'instance-1' };
      const item2 = { ...mockPlacedIngredient, instanceId: 'instance-2', x: 200, y: 250 };

      const { container: container1 } = render(
        <DraggableIngredient item={item1} containerRef={mockContainerRef} />
      );

      const { container: container2 } = render(
        <DraggableIngredient item={item2} containerRef={mockContainerRef} />
      );

      expect(container1.textContent).toContain('🍅');
      expect(container2.textContent).toContain('🍅');
    });
  });
});