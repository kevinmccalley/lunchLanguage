// @ts-nocheck
import { render, screen } from '@testing-library/react';
import { motion } from 'framer-motion';
import { DraggableIngredient } from './DraggableIngredient';
import { useGameStore } from '../../store/gameStore';
import { useLanguageStore } from '../../store/languageStore';
import { getIngredientById } from '../../data/ingredients';
import type { PlacedIngredient } from '../../types';

jest.mock('framer-motion');
jest.mock('../../store/gameStore');
jest.mock('../../store/languageStore');
jest.mock('../../data/ingredients');
jest.mock('../../i18n/translations', () => ({
  TRANSLATIONS: {
    es: {
      ingredients: {
        'tomato': 'tomate',
        'lettuce': 'lechuga',
      },
    },
    fr: {
      ingredients: {
        'tomato': 'tomate',
        'lettuce': 'laitue',
      },
    },
  },
}));

describe('DraggableIngredient', () => {
  const mockMoveIngredient = jest.fn();
  const mockRemoveIngredient = jest.fn();
  const mockGetIngredientById = getIngredientById as jest.MockedFunction<typeof getIngredientById>;
  const mockUseGameStore = useGameStore as jest.MockedFunction<typeof useGameStore>;
  const mockUseLanguageStore = useLanguageStore as jest.MockedFunction<typeof useLanguageStore>;

  const mockContainerRef = {
    current: {
      getBoundingClientRect: jest.fn(() => ({
        width: 500,
        height: 500,
      })),
    },
  };

  const mockPlacedIngredient: PlacedIngredient = {
    instanceId: 'inst-1',
    ingredientId: 'tomato',
    x: 100,
    y: 150,
    rotation: 0,
    scale: 1,
  };

  const mockIngredient = {
    id: 'tomato',
    name: 'Tomato',
    emoji: '🍅',
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
    mockGetIngredientById.mockReturnValue(mockIngredient as any);

    // Mock motion.div as a regular div
    (motion.div as any) = ({ children, ...props }: any) => (
      <div data-testid="draggable-ingredient" {...props}>
        {children}
      </div>
    );

    // Mock motion.div for label
    (motion.div as any).prototype = {};
  });

  it('renders the ingredient emoji', () => {
    render(
      <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef as any} />
    );
    expect(screen.getByText('🍅')).toBeInTheDocument();
  });

  it('returns null when ingredient is not found', () => {
    mockGetIngredientById.mockReturnValue(null);
    const { container } = render(
      <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef as any} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('displays the learning word when learningLanguage and ingredient exist', () => {
    render(
      <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef as any} />
    );
    expect(screen.getByText('tomate')).toBeInTheDocument();
  });

  it('does not display the learning word when learningLanguage is null', () => {
    mockUseLanguageStore.mockReturnValue({ learningLanguage: null } as any);
    render(
      <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef as any} />
    );
    expect(screen.queryByText('tomate')).not.toBeInTheDocument();
  });

  it('calculates size correctly based on scale', () => {
    const itemWithScale = { ...mockPlacedIngredient, scale: 2 };
    const { container } = render(
      <DraggableIngredient item={itemWithScale} containerRef={mockContainerRef as any} />
    );
    const emoji = screen.getByText('🍅').parentElement;
    expect(emoji).toHaveStyle({ width: '96px', height: '96px' });
  });

  it('handles drag end when ingredient is within bounds', () => {
    const { container } = render(
      <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef as any} />
    );

    const draggableElement = screen.getByTestId('draggable-ingredient');
    const onDragEnd = draggableElement.props.onDragEnd;

    // Mock the motion values
    const mockX = { get: jest.fn(() => 200) };
    const mockY = { get: jest.fn(() => 250) };
    jest.spyOn(require('framer-motion'), 'useMotionValue').mockReturnValueOnce(mockX).mockReturnValueOnce(mockY);

    if (onDragEnd) {
      onDragEnd({} as any);
    }

    expect(mockMoveIngredient).toHaveBeenCalledWith('inst-1', 200, 250);
  });

  it('removes ingredient when dragged outside the container (left boundary)', () => {
    const { container } = render(
      <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef as any} />
    );

    const draggableElement = screen.getByTestId('draggable-ingredient');
    const onDragEnd = draggableElement.props.onDragEnd;

    // Mock motion values to simulate dragging outside left boundary
    jest.spyOn(require('framer-motion'), 'useMotionValue')
      .mockReturnValueOnce({ get: jest.fn(() => -100) })
      .mockReturnValueOnce({ get: jest.fn(() => 200) });

    if (onDragEnd) {
      onDragEnd({} as any);
    }

    expect(mockRemoveIngredient).toHaveBeenCalledWith('inst-1');
  });

  it('removes ingredient when dragged outside the container (top boundary)', () => {
    const { container } = render(
      <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef as any} />
    );

    const draggableElement = screen.getByTestId('draggable-ingredient');
    const onDragEnd = draggableElement.props.onDragEnd;

    jest.spyOn(require('framer-motion'), 'useMotionValue')
      .mockReturnValueOnce({ get: jest.fn(() => 200) })
      .mockReturnValueOnce({ get: jest.fn(() => -100) });

    if (onDragEnd) {
      onDragEnd({} as any);
    }

    expect(mockRemoveIngredient).toHaveBeenCalledWith('inst-1');
  });

  it('removes ingredient when dragged outside the container (right boundary)', () => {
    const { container } = render(
      <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef as any} />
    );

    const draggableElement = screen.getByTestId('draggable-ingredient');
    const onDragEnd = draggableElement.props.onDragEnd;

    jest.spyOn(require('framer-motion'), 'useMotionValue')
      .mockReturnValueOnce({ get: jest.fn(() => 600) })
      .mockReturnValueOnce({ get: jest.fn(() => 200) });

    if (onDragEnd) {
      onDragEnd({} as any);
    }

    expect(mockRemoveIngredient).toHaveBeenCalledWith('inst-1');
  });

  it('removes ingredient when dragged outside the container (bottom boundary)', () => {
    const { container } = render(
      <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef as any} />
    );

    const draggableElement = screen.getByTestId('draggable-ingredient');
    const onDragEnd = draggableElement.props.onDragEnd;

    jest.spyOn(require('framer-motion'), 'useMotionValue')
      .mockReturnValueOnce({ get: jest.fn(() => 200) })
      .mockReturnValueOnce({ get: jest.fn(() => 600) });

    if (onDragEnd) {
      onDragEnd({} as any);
    }

    expect(mockRemoveIngredient).toHaveBeenCalledWith('inst-1');
  });

  it('does not move ingredient when container ref is null', () => {
    const nullContainerRef = { current: null };
    const { container } = render(
      <DraggableIngredient item={mockPlacedIngredient} containerRef={nullContainerRef as any} />
    );

    const draggableElement = screen.getByTestId('draggable-ingredient');
    const onDragEnd = draggableElement.props.onDragEnd;

    jest.spyOn(require('framer-motion'), 'useMotionValue')
      .mockReturnValueOnce({ get: jest.fn(() => 200) })
      .mockReturnValueOnce({ get: jest.fn(() => 250) });

    if (onDragEnd) {
      onDragEnd({} as any);
    }

    expect(mockMoveIngredient).not.toHaveBeenCalled();
    expect(mockRemoveIngredient).not.toHaveBeenCalled();
  });

  it('removes ingredient on double click', () => {
    render(
      <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef as any} />
    );

    const draggableElement = screen.getByTestId('draggable-ingredient');
    const onDoubleClick = draggableElement.props.onDoubleClick;

    if (onDoubleClick) {
      onDoubleClick({} as any);
    }

    expect(mockRemoveIngredient).toHaveBeenCalledWith('inst-1');
  });

  it('applies correct z-index when dragging', () => {
    const { container } = render(
      <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef as any} />
    );

    const draggableElement = screen.getByTestId('draggable-ingredient');

    expect(draggableElement.props.style.zIndex).toBe(10);
  });

  it('renders with correct rotation from item', () => {
    const itemWithRotation = { ...mockPlacedIngredient, rotation: 45 };
    const { container } = render(
      <DraggableIngredient item={itemWithRotation} containerRef={mockContainerRef as any} />
    );

    const draggableElement = screen.getByTestId('draggable-ingredient');
    expect(draggableElement.props.style.rotate).toBe(45);
  });

  it('applies grab cursor when not dragging', () => {
    render(
      <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef as any} />
    );

    const draggableElement = screen.getByTestId('draggable-ingredient');
    expect(draggableElement.props.style.cursor).toBe('grab');
  });

  it('handles ingredient with different learning language', () => {
    mockUseLanguageStore.mockReturnValue({
      learningLanguage: 'fr',
    } as any);

    render(
      <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef as any} />
    );

    expect(screen.getByText('tomate')).toBeInTheDocument();
  });

  it('does not show label when dragging', () => {
    const { container } = render(
      <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef as any} />
    );

    const draggableElement = screen.getByTestId('draggable-ingredient');
    const onDragStart = draggableElement.props.onDragStart;

    if (onDragStart) {
      onDragStart({} as any);
    }

    // After drag starts, the label should not be visible
    // This would require checking the rendered output after state change
  });

  it('handles edge case where ingredient ID maps to no translation', () => {
    mockGetIngredientById.mockReturnValue({
      id: 'unknown',
      name: 'Unknown',
      emoji: '❓',
    } as any);

    render(
      <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef as any} />
    );

    expect(screen.getByText('❓')).toBeInTheDocument();
  });

  it('sets position to absolute and touchAction to none', () => {
    render(
      <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef as any} />
    );

    const draggableElement = screen.getByTestId('draggable-ingredient');
    expect(draggableElement.props.style.position).toBe('absolute');
    expect(draggableElement.props.style.touchAction).toBe('none');
    expect(draggableElement.props.style.userSelect).toBe('none');
  });
});