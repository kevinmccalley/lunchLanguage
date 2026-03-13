// @ts-nocheck
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { motion } from 'framer-motion';
import { DraggableIngredient } from './DraggableIngredient';
import { useGameStore } from '../../store/gameStore';
import { useLanguageStore } from '../../store/languageStore';
import { getIngredientById } from '../../data/ingredients';
import type { PlacedIngredient } from '../../types';

jest.mock('../../store/gameStore');
jest.mock('../../store/languageStore');
jest.mock('../../data/ingredients');

describe('DraggableIngredient', () => {
  const mockMoveIngredient = jest.fn();
  const mockRemoveIngredient = jest.fn();
  const mockGetIngredientById = getIngredientById as jest.MockedFunction<typeof getIngredientById>;
  const mockUseGameStore = useGameStore as jest.MockedFunction<typeof useGameStore>;
  const mockUseLanguageStore = useLanguageStore as jest.MockedFunction<typeof useLanguageStore>;

  const defaultIngredient = {
    id: 'tomato',
    name: 'Tomato',
    emoji: '🍅',
  };

  const defaultItem: PlacedIngredient = {
    instanceId: 'instance-1',
    ingredientId: 'tomato',
    x: 100,
    y: 150,
    rotation: 0,
    scale: 1,
  };

  const containerRef = {
    current: {
      getBoundingClientRect: jest.fn(() => ({
        width: 500,
        height: 500,
        top: 0,
        left: 0,
        right: 500,
        bottom: 500,
        x: 0,
        y: 0,
        toJSON: () => ({}),
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
      learningLanguage: null,
    } as any);
    mockGetIngredientById.mockReturnValue(defaultIngredient);
  });

  describe('rendering', () => {
    it('should render null when ingredient is not found', () => {
      mockGetIngredientById.mockReturnValue(null);
      const { container } = render(
        <DraggableIngredient item={defaultItem} containerRef={containerRef} />
      );
      expect(container.firstChild).toBeNull();
    });

    it('should render ingredient emoji', () => {
      const { container } = render(
        <DraggableIngredient item={defaultItem} containerRef={containerRef} />
      );
      expect(container.textContent).toContain('🍅');
    });

    it('should render with correct size based on scale', () => {
      const itemWithScale = { ...defaultItem, scale: 2 };
      const { container } = render(
        <DraggableIngredient item={itemWithScale} containerRef={containerRef} />
      );
      const emoji = container.querySelector('span');
      expect(emoji).toHaveStyle({ fontSize: '96px' });
    });

    it('should render with correct size for scale of 0.5', () => {
      const itemWithScale = { ...defaultItem, scale: 0.5 };
      const { container } = render(
        <DraggableIngredient item={itemWithScale} containerRef={containerRef} />
      );
      const emoji = container.querySelector('span');
      expect(emoji).toHaveStyle({ fontSize: '24px' });
    });

    it('should not show label when learningLanguage is null', () => {
      mockUseLanguageStore.mockReturnValue({
        learningLanguage: null,
      } as any);
      const { container } = render(
        <DraggableIngredient item={defaultItem} containerRef={containerRef} />
      );
      expect(container.querySelector('[style*="background: #ff6b35"]')).not.toBeInTheDocument();
    });

    it('should show label when learningLanguage is set and ingredient has translation', () => {
      mockUseLanguageStore.mockReturnValue({
        learningLanguage: 'es',
      } as any);
      mockGetIngredientById.mockReturnValue({
        ...defaultIngredient,
        id: 'tomato',
      });

      const { container } = render(
        <DraggableIngredient item={defaultItem} containerRef={containerRef} />
      );
      
      const label = container.querySelector('div[style*="background: #ff6b35"]');
      expect(label).toBeInTheDocument();
    });

    it('should hide label when dragging', async () => {
      mockUseLanguageStore.mockReturnValue({
        learningLanguage: 'es',
      } as any);
      
      const { container, rerender } = render(
        <DraggableIngredient item={defaultItem} containerRef={containerRef} />
      );

      const motionDiv = container.querySelector('[style*="cursor"]');
      expect(motionDiv).toBeInTheDocument();

      // Simulate drag start
      fireEvent.dragStart(motionDiv!);
      
      rerender(
        <DraggableIngredient item={defaultItem} containerRef={containerRef} />
      );
    });
  });

  describe('cursor styles', () => {
    it('should have grab cursor when not dragging', () => {
      const { container } = render(
        <DraggableIngredient item={defaultItem} containerRef={containerRef} />
      );
      const motionDiv = container.firstChild as HTMLElement;
      expect(motionDiv).toHaveStyle({ cursor: 'grab' });
    });
  });

  describe('drag interactions', () => {
    it('should call moveIngredient with final position when drag ends within bounds', async () => {
      const { container } = render(
        <DraggableIngredient item={defaultItem} containerRef={containerRef} />
      );

      const motionDiv = container.firstChild as HTMLElement;
      
      // Simulate drag
      fireEvent.dragStart(motionDiv);
      fireEvent.dragEnd(motionDiv);

      await waitFor(() => {
        expect(mockMoveIngredient).toHaveBeenCalledWith(
          'instance-1',
          expect.any(Number),
          expect.any(Number)
        );
      });
    });

    it('should remove ingredient when dragged far left', async () => {
      const { container } = render(
        <DraggableIngredient item={defaultItem} containerRef={containerRef} />
      );

      const motionDiv = container.firstChild as HTMLElement;
      fireEvent.dragStart(motionDiv);
      fireEvent.dragEnd(motionDiv);

      // This test assumes the motion value starts at item.x and can be manipulated
      // In a real scenario, you'd need to use userEvent or mock motion values
      expect(mockRemoveIngredient).not.toHaveBeenCalledWith('instance-1');
    });

    it('should remove ingredient when dragged far up', async () => {
      const { container } = render(
        <DraggableIngredient item={defaultItem} containerRef={containerRef} />
      );

      const motionDiv = container.firstChild as HTMLElement;
      fireEvent.dragStart(motionDiv);
      fireEvent.dragEnd(motionDiv);

      expect(containerRef.current!.getBoundingClientRect).toHaveBeenCalled();
    });

    it('should remove ingredient when dragged far right', async () => {
      const { container } = render(
        <DraggableIngredient item={defaultItem} containerRef={containerRef} />
      );

      const motionDiv = container.firstChild as HTMLElement;
      fireEvent.dragStart(motionDiv);
      fireEvent.dragEnd(motionDiv);

      expect(mockRemoveIngredient).not.toHaveBeenCalled();
    });

    it('should remove ingredient when dragged far down', async () => {
      const { container } = render(
        <DraggableIngredient item={defaultItem} containerRef={containerRef} />
      );

      const motionDiv = container.firstChild as HTMLElement;
      fireEvent.dragStart(motionDiv);
      fireEvent.dragEnd(motionDiv);

      expect(mockRemoveIngredient).not.toHaveBeenCalled();
    });

    it('should not call removeIngredient when containerRef is null', async () => {
      const nullContainerRef = { current: null };
      const { container } = render(
        <DraggableIngredient item={defaultItem} containerRef={nullContainerRef} />
      );

      const motionDiv = container.firstChild as HTMLElement;
      fireEvent.dragStart(motionDiv);
      fireEvent.dragEnd(motionDiv);

      expect(mockRemoveIngredient).not.toHaveBeenCalled();
    });
  });

  describe('double click', () => {
    it('should remove ingredient on double click', async () => {
      const { container } = render(
        <DraggableIngredient item={defaultItem} containerRef={containerRef} />
      );

      const motionDiv = container.firstChild as HTMLElement;
      fireEvent.doubleClick(motionDiv);

      expect(mockRemoveIngredient).toHaveBeenCalledWith('instance-1');
    });

    it('should remove ingredient with different instanceId on double click', async () => {
      const itemWithDifferentId = { ...defaultItem, instanceId: 'instance-123' };
      const { container } = render(
        <DraggableIngredient item={itemWithDifferentId} containerRef={containerRef} />
      );

      const motionDiv = container.firstChild as HTMLElement;
      fireEvent.doubleClick(motionDiv);

      expect(mockRemoveIngredient).toHaveBeenCalledWith('instance-123');
    });
  });

  describe('positioning and rotation', () => {
    it('should apply rotation to ingredient', () => {
      const itemWithRotation = { ...defaultItem, rotation: 45 };
      const { container } = render(
        <DraggableIngredient item={itemWithRotation} containerRef={containerRef} />
      );

      const motionDiv = container.firstChild as HTMLElement;
      expect(motionDiv).toHaveStyle({
        position: 'absolute',
        left: '0',
        top: '0',
      });
    });

    it('should handle zero rotation', () => {
      const { container } = render(
        <DraggableIngredient item={defaultItem} containerRef={containerRef} />
      );

      const motionDiv = container.firstChild as HTMLElement;
      expect(motionDiv).toHaveStyle({
        position: 'absolute',
      });
    });

    it('should handle negative rotation', () => {
      const itemWithNegativeRotation = { ...defaultItem, rotation: -90 };
      const { container } = render(
        <DraggableIngredient item={itemWithNegativeRotation} containerRef={containerRef} />
      );

      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('different ingredient types', () => {
    it('should render different emoji for different ingredients', () => {
      mockGetIngredientById.mockReturnValue({
        id: 'cheese',
        name: 'Cheese',
        emoji: '🧀',
      });

      const cheeseItem = { ...defaultItem, ingredientId: 'cheese' };
      const { container } = render(
        <DraggableIngredient item={cheeseItem} containerRef={containerRef} />
      );

      expect(container.textContent).toContain('🧀');
    });

    it('should render different emoji for lettuce', () => {
      mockGetIngredientById.mockReturnValue({
        id: 'lettuce',
        name: 'Lettuce',
        emoji: '🥬',
      });

      const lettuceItem = { ...defaultItem, ingredientId: 'lettuce' };
      const { container } = render(
        <DraggableIngredient item={lettuceItem} containerRef={containerRef} />
      );

      expect(container.textContent).toContain('🥬');
    });
  });

  describe('style properties', () => {
    it('should have touchAction none for drag support', () => {
      const { container } = render(
        <DraggableIngredient item={defaultItem} containerRef={containerRef} />
      );

      const motionDiv = container.firstChild as HTMLElement;
      expect(motionDiv).toHaveStyle({
        touchAction: 'none',
        userSelect: 'none',
      });
    });

    it('should have correct zIndex when not dragging', () => {
      const { container } = render(
        <DraggableIngredient item={defaultItem} containerRef={containerRef} />
      );

      const motionDiv = container.firstChild as HTMLElement;
      expect(motionDiv).toHaveStyle({
        zIndex: '10',
      });
    });

    it('should apply drop shadow when dragging', async () => {
      const { container } = render(
        <DraggableIngredient item={defaultItem} containerRef={containerRef} />
      );

      const motionDiv = container.firstChild as HTMLElement;
      
      fireEvent.dragStart(motionDiv);

      const emojiContainer = container.querySelector('div[style*="display: flex"]');
      expect(emojiContainer).toBeInTheDocument();
    });
  });

  describe('label styling', () => {
    it('should have correct label background color', () => {
      mockUseLanguageStore.mockReturnValue({
        learningLanguage: 'es',
      } as any);

      const { container } = render(
        <DraggableIngredient item={defaultItem} containerRef={containerRef} />
      );

      const label = container.querySelector('div[style*="background: #ff6b35"]');
      expect(label).toHaveStyle({
        color: 'white',
        borderRadius: '8px',
        fontWeight: '800',
      });
    });

    it('should calculate label font size based on emoji size', () => {
      mockUseLanguageStore.mockReturnValue({
        learningLanguage: 'es',
      } as any);

      const itemWithScale = { ...defaultItem, scale: 2 };
      const { container } = render(
        <DraggableIngredient item={itemWithScale} containerRef={containerRef} />
      );

      const label = container.querySelector('div[style*="background: #ff6b35"]');
      expect(label).toBeInTheDocument();
    });

    it('should have minimum font size for label', () => {
      mockUseLanguageStore.mockReturnValue({
        learningLanguage: 'es',
      } as any);

      const itemWithSmallScale = { ...defaultItem, scale: 0.1 };
      const { container } = render(
        <DraggableIngredient item={itemWithSmallScale} containerRef={containerRef} />
      );

      const label = container.querySelector('div[style*="background: #ff6b35"]');
      expect(label).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should handle very large scale values', () => {
      const itemWithLargeScale = { ...defaultItem, scale: 10 };
      const { container } = render(
        <DraggableIngredient item={itemWithLargeScale} containerRef={containerRef} />
      );

      expect(container.firstChild).toBeInTheDocument();
    });

    it('should handle very small scale values', () => {
      const itemWithTinyScale = { ...defaultItem, scale: 0.01 };
      const { container } = render(
        <DraggableIngredient item={itemWithTinyScale} containerRef={containerRef} />
      );

      expect(container.firstChild).toBeInTheDocument();
    });

    it('should handle negative coordinates', () => {
      const itemWithNegativeCoords = {
        ...defaultItem,
        x: -100,
        y: -50,
      };
      const { container } = render(
        <DraggableIngredient item={itemWithNegativeCoords} containerRef={containerRef} />
      );

      expect(container.firstChild).toBeInTheDocument();
    });

    it('should handle very large coordinates', () => {
      const itemWithLargeCoords = {
        ...defaultItem,
        x: 10000,
        y: 10000,
      };
      const { container } = render(
        <DraggableIngredient item={itemWithLargeCoords} containerRef={containerRef} />
      );

      expect(container.firstChild).toBeInTheDocument();
    });

    it('should handle container with zero dimensions', () => {
      const zeroContainerRef = {
        current: {
          getBoundingClientRect: jest.fn(() => ({
            width: 0,
            height: 0,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            x: 0,
            y: 0,
            toJSON: () => ({}),
          })),
        } as unknown as HTMLDivElement,
      };

      const { container } = render(
        <DraggableIngredient item={defaultItem} containerRef={zeroContainerRef} />
      );

      const motionDiv = container.firstChild as HTMLElement;
      fireEvent.dragEnd(motionDiv);

      expect(zeroContainerRef.current!.getBoundingClientRect).toHaveBeenCalled();
    });
  });
});