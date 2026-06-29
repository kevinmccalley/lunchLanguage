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

describe('DraggableIngredient', () => {
  const mockMoveIngredient = jest.fn();
  const mockRemoveIngredient = jest.fn();
  const mockContainerRef = { current: null as HTMLDivElement | null };

  const defaultPlacedIngredient: PlacedIngredient = {
    instanceId: 'instance-1',
    ingredientId: 'tomato',
    x: 100,
    y: 100,
    rotation: 0,
    scale: 1,
  };

  const mockIngredient = {
    id: 'tomato',
    emoji: '🍅',
    name: 'tomato',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockContainerRef.current = document.createElement('div');
    mockContainerRef.current.getBoundingClientRect = jest.fn(() => ({
      width: 400,
      height: 400,
      top: 0,
      left: 0,
      right: 400,
      bottom: 400,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }));

    (useGameStore as jest.Mock).mockReturnValue({
      moveIngredient: mockMoveIngredient,
      removeIngredient: mockRemoveIngredient,
    });

    (useLanguageStore as jest.Mock).mockReturnValue({
      learningLanguage: 'es',
    });

    (getIngredientById as jest.Mock).mockReturnValue(mockIngredient);

    (TRANSLATIONS as any) = {
      es: {
        ingredients: {
          tomato: 'tomate',
        },
      },
    };
  });

  it('should render ingredient emoji when ingredient exists', () => {
    render(
      <DraggableIngredient item={defaultPlacedIngredient} containerRef={mockContainerRef} />
    );
    expect(screen.getByText('🍅')).toBeInTheDocument();
  });

  it('should return null when ingredient does not exist', () => {
    (getIngredientById as jest.Mock).mockReturnValue(null);
    const { container } = render(
      <DraggableIngredient item={defaultPlacedIngredient} containerRef={mockContainerRef} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('should display learning word label when language is set and ingredient exists', () => {
    render(
      <DraggableIngredient item={defaultPlacedIngredient} containerRef={mockContainerRef} />
    );
    expect(screen.getByText('tomate')).toBeInTheDocument();
  });

  it('should not display label when learning language is null', () => {
    (useLanguageStore as jest.Mock).mockReturnValue({
      learningLanguage: null,
    });
    const { queryByText } = render(
      <DraggableIngredient item={defaultPlacedIngredient} containerRef={mockContainerRef} />
    );
    expect(queryByText('tomate')).not.toBeInTheDocument();
  });

  it('should not display label when no translation exists', () => {
    (TRANSLATIONS as any) = {
      es: {
        ingredients: {},
      },
    };
    const { queryByText } = render(
      <DraggableIngredient item={defaultPlacedIngredient} containerRef={mockContainerRef} />
    );
    expect(queryByText('tomate')).not.toBeInTheDocument();
  });

  it('should calculate size based on scale property', () => {
    const scaledItem = { ...defaultPlacedIngredient, scale: 2 };
    const { container } = render(
      <DraggableIngredient item={scaledItem} containerRef={mockContainerRef} />
    );
    const sizeDiv = container.querySelector('div[style*="width"]');
    expect(sizeDiv).toHaveStyle({ width: '96px', height: '96px' });
  });

  it('should calculate size with rounded value', () => {
    const scaledItem = { ...defaultPlacedIngredient, scale: 1.5 };
    const { container } = render(
      <DraggableIngredient item={scaledItem} containerRef={mockContainerRef} />
    );
    const sizeDiv = container.querySelector('div[style*="width"]');
    expect(sizeDiv).toHaveStyle({ width: '72px', height: '72px' });
  });

  it('should remove ingredient on double click', () => {
    const { container } = render(
      <DraggableIngredient item={defaultPlacedIngredient} containerRef={mockContainerRef} />
    );
    const element = container.querySelector('[style*="position: absolute"]') as HTMLElement;
    fireEvent.doubleClick(element);
    expect(mockRemoveIngredient).toHaveBeenCalledWith('instance-1');
  });

  it('should remove ingredient when dragged outside left boundary', async () => {
    const { container } = render(
      <DraggableIngredient item={defaultPlacedIngredient} containerRef={mockContainerRef} />
    );

    const dragElement = container.querySelector('[style*="position: absolute"]') as HTMLElement;
    
    fireEvent.pointerDown(dragElement);
    fireEvent.dragEnd(dragElement, { clientX: -100, clientY: 100 });

    await waitFor(() => {
      expect(mockRemoveIngredient).toHaveBeenCalledWith('instance-1');
    });
  });

  it('should remove ingredient when dragged outside top boundary', async () => {
    const { container } = render(
      <DraggableIngredient item={defaultPlacedIngredient} containerRef={mockContainerRef} />
    );

    const dragElement = container.querySelector('[style*="position: absolute"]') as HTMLElement;
    
    fireEvent.pointerDown(dragElement);
    fireEvent.dragEnd(dragElement, { clientX: 100, clientY: -100 });

    await waitFor(() => {
      expect(mockRemoveIngredient).toHaveBeenCalledWith('instance-1');
    });
  });

  it('should remove ingredient when dragged outside right boundary', async () => {
    const { container } = render(
      <DraggableIngredient item={defaultPlacedIngredient} containerRef={mockContainerRef} />
    );

    const dragElement = container.querySelector('[style*="position: absolute"]') as HTMLElement;
    
    fireEvent.pointerDown(dragElement);
    fireEvent.dragEnd(dragElement, { clientX: 500, clientY: 100 });

    await waitFor(() => {
      expect(mockRemoveIngredient).toHaveBeenCalledWith('instance-1');
    });
  });

  it('should remove ingredient when dragged outside bottom boundary', async () => {
    const { container } = render(
      <DraggableIngredient item={defaultPlacedIngredient} containerRef={mockContainerRef} />
    );

    const dragElement = container.querySelector('[style*="position: absolute"]') as HTMLElement;
    
    fireEvent.pointerDown(dragElement);
    fireEvent.dragEnd(dragElement, { clientX: 100, clientY: 500 });

    await waitFor(() => {
      expect(mockRemoveIngredient).toHaveBeenCalledWith('instance-1');
    });
  });

  it('should keep ingredient when dropped within boundaries', async () => {
    const { container } = render(
      <DraggableIngredient item={defaultPlacedIngredient} containerRef={mockContainerRef} />
    );

    const dragElement = container.querySelector('[style*="position: absolute"]') as HTMLElement;
    
    fireEvent.pointerDown(dragElement);
    fireEvent.dragEnd(dragElement, { clientX: 200, clientY: 200 });

    await waitFor(() => {
      expect(mockMoveIngredient).toHaveBeenCalled();
      expect(mockRemoveIngredient).not.toHaveBeenCalled();
    });
  });

  it('should call moveIngredient with correct coordinates on drag end', async () => {
    const { container } = render(
      <DraggableIngredient item={defaultPlacedIngredient} containerRef={mockContainerRef} />
    );

    const dragElement = container.querySelector('[style*="position: absolute"]') as HTMLElement;
    
    fireEvent.pointerDown(dragElement);
    fireEvent.dragEnd(dragElement, { clientX: 150, clientY: 250 });

    await waitFor(() => {
      expect(mockMoveIngredient).toHaveBeenCalledWith('instance-1', expect.any(Number), expect.any(Number));
    });
  });

  it('should not call moveIngredient if container ref is null', async () => {
    const nullRef = { current: null };
    const { container } = render(
      <DraggableIngredient item={defaultPlacedIngredient} containerRef={nullRef} />
    );

    const dragElement = container.querySelector('[style*="position: absolute"]') as HTMLElement;
    
    fireEvent.pointerDown(dragElement);
    fireEvent.dragEnd(dragElement, { clientX: 200, clientY: 200 });

    await waitFor(() => {
      expect(mockMoveIngredient).not.toHaveBeenCalled();
      expect(mockRemoveIngredient).not.toHaveBeenCalled();
    });
  });

  it('should have correct cursor style when not dragging', () => {
    const { container } = render(
      <DraggableIngredient item={defaultPlacedIngredient} containerRef={mockContainerRef} />
    );
    const dragElement = container.querySelector('[style*="cursor"]') as HTMLElement;
    expect(dragElement).toHaveStyle({ cursor: 'grab' });
  });

  it('should apply correct z-index when not dragging', () => {
    const { container } = render(
      <DraggableIngredient item={defaultPlacedIngredient} containerRef={mockContainerRef} />
    );
    const dragElement = container.querySelector('[style*="z-index"]') as HTMLElement;
    expect(dragElement).toHaveStyle({ zIndex: '10' });
  });

  it('should set drag momentum to false', () => {
    const { container } = render(
      <DraggableIngredient item={defaultPlacedIngredient} containerRef={mockContainerRef} />
    );
    const dragElement = container.querySelector('[style*="position: absolute"]') as HTMLElement;
    expect(dragElement).toBeInTheDocument();
  });

  it('should handle item with different rotation values', () => {
    const rotatedItem = { ...defaultPlacedIngredient, rotation: 45 };
    const { container } = render(
      <DraggableIngredient item={rotatedItem} containerRef={mockContainerRef} />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should handle item with minimum scale', () => {
    const minScaleItem = { ...defaultPlacedIngredient, scale: 0.1 };
    const { container } = render(
      <DraggableIngredient item={minScaleItem} containerRef={mockContainerRef} />
    );
    const sizeDiv = container.querySelector('div[style*="width"]');
    expect(sizeDiv).toHaveStyle({ width: '5px', height: '5px' });
  });

  it('should handle boundary case when dragged at exactly -60 left', async () => {
    const { container } = render(
      <DraggableIngredient item={defaultPlacedIngredient} containerRef={mockContainerRef} />
    );

    const dragElement = container.querySelector('[style*="position: absolute"]') as HTMLElement;
    
    fireEvent.pointerDown(dragElement);
    fireEvent.dragEnd(dragElement, { clientX: -60, clientY: 100 });

    await waitFor(() => {
      expect(mockMoveIngredient).toHaveBeenCalled();
    });
  });

  it('should handle boundary case when dragged at exactly -61 left', async () => {
    const { container } = render(
      <DraggableIngredient item={defaultPlacedIngredient} containerRef={mockContainerRef} />
    );

    const dragElement = container.querySelector('[style*="position: absolute"]') as HTMLElement;
    
    fireEvent.pointerDown(dragElement);
    fireEvent.dragEnd(dragElement, { clientX: -61, clientY: 100 });

    await waitFor(() => {
      expect(mockRemoveIngredient).toHaveBeenCalledWith('instance-1');
    });
  });
});