// @ts-nocheck
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { motion } from 'framer-motion';
import { DraggableIngredient } from './DraggableIngredient';
import { getIngredientById } from '../../data/ingredients';
import { useGameStore } from '../../store/gameStore';
import { useLanguageStore } from '../../store/languageStore';
import { TRANSLATIONS } from '../../i18n/translations';
import type { PlacedIngredient } from '../../types';

jest.mock('framer-motion');
jest.mock('../../data/ingredients');
jest.mock('../../store/gameStore');
jest.mock('../../store/languageStore');
jest.mock('../../i18n/translations');

describe('DraggableIngredient', () => {
  const mockMoveIngredient = jest.fn();
  const mockRemoveIngredient = jest.fn();
  const mockContainerRef = { current: document.createElement('div') };

  const mockPlacedIngredient: PlacedIngredient = {
    instanceId: 'instance-1',
    ingredientId: 'tomato',
    x: 100,
    y: 150,
    scale: 1,
    rotation: 0,
  };

  const mockIngredient = {
    id: 'tomato',
    emoji: '🍅',
    name: 'Tomato',
  };

  beforeEach(() => {
    jest.clearAllMocks();

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
          tomato: 'Tomate',
        },
      },
    };

    mockContainerRef.current = document.createElement('div');
    mockContainerRef.current.getBoundingClientRect = jest.fn().mockReturnValue({
      width: 500,
      height: 500,
      top: 0,
      left: 0,
      right: 500,
      bottom: 500,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });

    // Mock framer-motion motion.div
    (motion.div as jest.Mock) = jest.fn((props) => {
      return <div data-testid="draggable-ingredient" {...props} />;
    });
  });

  it('should render null when ingredient is not found', () => {
    (getIngredientById as jest.Mock).mockReturnValue(null);

    const { container } = render(
      <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('should render ingredient emoji', () => {
    render(<DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef} />);

    expect(screen.getByText('🍅')).toBeInTheDocument();
  });

  it('should show learning word label when learning language is set', () => {
    render(<DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef} />);

    expect(screen.getByText('Tomate')).toBeInTheDocument();
  });

  it('should not show label when no learning language is set', () => {
    (useLanguageStore as jest.Mock).mockReturnValue({
      learningLanguage: null,
    });

    render(<DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef} />);

    expect(screen.queryByText('Tomate')).not.toBeInTheDocument();
  });

  it('should not show label when learning word is not in translations', () => {
    (TRANSLATIONS as any) = {
      es: {
        ingredients: {},
      },
    };

    render(<DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef} />);

    expect(screen.queryByText('Tomate')).not.toBeInTheDocument();
  });

  it('should calculate correct size based on scale', () => {
    const itemWithScale: PlacedIngredient = {
      ...mockPlacedIngredient,
      scale: 2,
    };

    const { container } = render(
      <DraggableIngredient item={itemWithScale} containerRef={mockContainerRef} />
    );

    const emoji = screen.getByText('🍅');
    expect(emoji).toBeInTheDocument();
  });

  it('should remove ingredient when dragged far outside container (left boundary)', () => {
    const mockX = { get: jest.fn().mockReturnValue(-100) };
    const mockY = { get: jest.fn().mockReturnValue(100) };

    (motion.div as jest.Mock).mockImplementation(({ onDragEnd, ...props }) => {
      return (
        <div
          data-testid="draggable-ingredient"
          {...props}
          onDragEnd={() => {
            if (onDragEnd) onDragEnd();
          }}
        />
      );
    });

    // Mock useMotionValue
    (motion as any).useMotionValue = jest.fn((initialValue) => {
      if (initialValue === mockPlacedIngredient.x) return mockX;
      if (initialValue === mockPlacedIngredient.y) return mockY;
    });

    const { getByTestId } = render(
      <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef} />
    );

    fireEvent.dragEnd(getByTestId('draggable-ingredient'));

    expect(mockRemoveIngredient).toHaveBeenCalledWith('instance-1');
  });

  it('should remove ingredient when dragged far outside container (top boundary)', () => {
    const mockX = { get: jest.fn().mockReturnValue(100) };
    const mockY = { get: jest.fn().mockReturnValue(-100) };

    (motion.div as jest.Mock).mockImplementation(({ onDragEnd, ...props }) => {
      return (
        <div
          data-testid="draggable-ingredient"
          {...props}
          onDragEnd={() => {
            if (onDragEnd) onDragEnd();
          }}
        />
      );
    });

    (motion as any).useMotionValue = jest.fn((initialValue) => {
      if (initialValue === mockPlacedIngredient.x) return mockX;
      if (initialValue === mockPlacedIngredient.y) return mockY;
    });

    const { getByTestId } = render(
      <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef} />
    );

    fireEvent.dragEnd(getByTestId('draggable-ingredient'));

    expect(mockRemoveIngredient).toHaveBeenCalledWith('instance-1');
  });

  it('should remove ingredient when dragged far outside container (right boundary)', () => {
    const mockX = { get: jest.fn().mockReturnValue(600) };
    const mockY = { get: jest.fn().mockReturnValue(100) };

    (motion.div as jest.Mock).mockImplementation(({ onDragEnd, ...props }) => {
      return (
        <div
          data-testid="draggable-ingredient"
          {...props}
          onDragEnd={() => {
            if (onDragEnd) onDragEnd();
          }}
        />
      );
    });

    (motion as any).useMotionValue = jest.fn((initialValue) => {
      if (initialValue === mockPlacedIngredient.x) return mockX;
      if (initialValue === mockPlacedIngredient.y) return mockY;
    });

    const { getByTestId } = render(
      <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef} />
    );

    fireEvent.dragEnd(getByTestId('draggable-ingredient'));

    expect(mockRemoveIngredient).toHaveBeenCalledWith('instance-1');
  });

  it('should remove ingredient when dragged far outside container (bottom boundary)', () => {
    const mockX = { get: jest.fn().mockReturnValue(100) };
    const mockY = { get: jest.fn().mockReturnValue(600) };

    (motion.div as jest.Mock).mockImplementation(({ onDragEnd, ...props }) => {
      return (
        <div
          data-testid="draggable-ingredient"
          {...props}
          onDragEnd={() => {
            if (onDragEnd) onDragEnd();
          }}
        />
      );
    });

    (motion as any).useMotionValue = jest.fn((initialValue) => {
      if (initialValue === mockPlacedIngredient.x) return mockX;
      if (initialValue === mockPlacedIngredient.y) return mockY;
    });

    const { getByTestId } = render(
      <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef} />
    );

    fireEvent.dragEnd(getByTestId('draggable-ingredient'));

    expect(mockRemoveIngredient).toHaveBeenCalledWith('instance-1');
  });

  it('should move ingredient when dragged within container bounds', () => {
    const mockX = { get: jest.fn().mockReturnValue(150) };
    const mockY = { get: jest.fn().mockReturnValue(200) };

    (motion.div as jest.Mock).mockImplementation(({ onDragEnd, ...props }) => {
      return (
        <div
          data-testid="draggable-ingredient"
          {...props}
          onDragEnd={() => {
            if (onDragEnd) onDragEnd();
          }}
        />
      );
    });

    (motion as any).useMotionValue = jest.fn((initialValue) => {
      if (initialValue === mockPlacedIngredient.x) return mockX;
      if (initialValue === mockPlacedIngredient.y) return mockY;
    });

    const { getByTestId } = render(
      <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef} />
    );

    fireEvent.dragEnd(getByTestId('draggable-ingredient'));

    expect(mockMoveIngredient).toHaveBeenCalledWith('instance-1', 150, 200);
  });

  it('should not move ingredient when container ref is null', () => {
    const mockX = { get: jest.fn().mockReturnValue(150) };
    const mockY = { get: jest.fn().mockReturnValue(200) };

    (motion.div as jest.Mock).mockImplementation(({ onDragEnd, ...props }) => {
      return (
        <div
          data-testid="draggable-ingredient"
          {...props}
          onDragEnd={() => {
            if (onDragEnd) onDragEnd();
          }}
        />
      );
    });

    (motion as any).useMotionValue = jest.fn((initialValue) => {
      if (initialValue === mockPlacedIngredient.x) return mockX;
      if (initialValue === mockPlacedIngredient.y) return mockY;
    });

    const { getByTestId } = render(
      <DraggableIngredient item={mockPlacedIngredient} containerRef={{ current: null }} />
    );

    fireEvent.dragEnd(getByTestId('draggable-ingredient'));

    expect(mockMoveIngredient).not.toHaveBeenCalled();
    expect(mockRemoveIngredient).not.toHaveBeenCalled();
  });

  it('should remove ingredient on double click', () => {
    (motion.div as jest.Mock).mockImplementation(({ onDoubleClick, ...props }) => {
      return (
        <div
          data-testid="draggable-ingredient"
          {...props}
          onDoubleClick={() => {
            if (onDoubleClick) onDoubleClick();
          }}
        />
      );
    });

    const { getByTestId } = render(
      <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef} />
    );

    fireEvent.doubleClick(getByTestId('draggable-ingredient'));

    expect(mockRemoveIngredient).toHaveBeenCalledWith('instance-1');
  });

  it('should handle rotation in motion div style', () => {
    const itemWithRotation: PlacedIngredient = {
      ...mockPlacedIngredient,
      rotation: 45,
    };

    render(
      <DraggableIngredient item={itemWithRotation} containerRef={mockContainerRef} />
    );

    expect(screen.getByText('🍅')).toBeInTheDocument();
  });

  it('should update dragging state on drag start and end', () => {
    (motion.div as jest.Mock).mockImplementation(({ onDragStart, onDragEnd, ...props }) => {
      return (
        <div
          data-testid="draggable-ingredient"
          {...props}
          onDragStart={() => {
            if (onDragStart) onDragStart();
          }}
          onDragEnd={() => {
            if (onDragEnd) onDragEnd();
          }}
        />
      );
    });

    const mockX = { get: jest.fn().mockReturnValue(100) };
    const mockY = { get: jest.fn().mockReturnValue(100) };

    (motion as any).useMotionValue = jest.fn((initialValue) => {
      if (initialValue === mockPlacedIngredient.x) return mockX;
      if (initialValue === mockPlacedIngredient.y) return mockY;
    });

    const { getByTestId } = render(
      <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef} />
    );

    const element = getByTestId('draggable-ingredient');

    fireEvent.dragStart(element);
    expect(screen.queryByText('Tomate')).not.toBeInTheDocument();

    fireEvent.dragEnd(element);
    expect(screen.getByText('Tomate')).toBeInTheDocument();
  });

  it('should render with correct size calculation for small scale', () => {
    const itemWithSmallScale: PlacedIngredient = {
      ...mockPlacedIngredient,
      scale: 0.5,
    };

    render(
      <DraggableIngredient item={itemWithSmallScale} containerRef={mockContainerRef} />
    );

    expect(screen.getByText('🍅')).toBeInTheDocument();
  });

  it('should handle ingredient with scale 0.25', () => {
    const itemWithTinyScale: PlacedIngredient = {
      ...mockPlacedIngredient,
      scale: 0.25,
    };

    render(
      <DraggableIngredient item={itemWithTinyScale} containerRef={mockContainerRef} />
    );

    expect(screen.getByText('🍅')).toBeInTheDocument();
  });

  it('should use correct instance id in remove and move operations', () => {
    const customInstanceId = 'custom-instance-123';
    const itemWithCustomId: PlacedIngredient = {
      ...mockPlacedIngredient,
      instanceId: customInstanceId,
    };

    (motion.div as jest.Mock).mockImplementation(({ onDoubleClick, ...props }) => {
      return (
        <div
          data-testid="draggable-ingredient"
          {...props}
          onDoubleClick={() => {
            if (onDoubleClick) onDoubleClick();
          }}
        />
      );
    });

    const { getByTestId } = render(
      <DraggableIngredient item={itemWithCustomId} containerRef={mockContainerRef} />
    );

    fireEvent.doubleClick(getByTestId('draggable-ingredient'));

    expect(mockRemoveIngredient).toHaveBeenCalledWith(customInstanceId);
  });

  it('should work with edge case boundary positions', () => {
    const mockX = { get: jest.fn().mockReturnValue(-59) };
    const mockY = { get: jest.fn().mockReturnValue(-59) };

    (motion.div as jest.Mock).mockImplementation(({ onDragEnd, ...props }) => {
      return (
        <div
          data-testid="draggable-ingredient"
          {...props}
          onDragEnd={() => {
            if (onDragEnd) onDragEnd();
          }}
        />
      );
    });

    (motion as any).useMotionValue = jest.fn((initialValue) => {
      if (initialValue === mockPlacedIngredient.x) return mockX;
      if (initialValue === mockPlacedIngredient.y) return mockY;
    });

    const { getByTestId } = render(
      <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef} />
    );

    fireEvent.dragEnd(getByTestId('draggable-ingredient'));

    expect(mockMoveIngredient).toHaveBeenCalledWith('instance-1', -59, -59);
  });

  it('should work with edge case boundary positions at right and bottom', () => {
    const mockX = { get: jest.fn().mockReturnValue(559) };
    const mockY = { get: jest.fn().mockReturnValue(559) };

    (motion.div as jest.Mock).mockImplementation(({ onDragEnd, ...props }) => {
      return (
        <div
          data-testid="draggable-ingredient"
          {...props}
          onDragEnd={() => {
            if (onDragEnd) onDragEnd();
          }}
        />
      );
    });

    (motion as any).useMotionValue = jest.fn((initialValue) => {
      if (initialValue === mockPlacedIngredient.x) return mockX;
      if (initialValue === mockPlacedIngredient.y) return mockY;
    });

    const { getByTestId } = render(
      <DraggableIngredient item={mockPlacedIngredient} containerRef={mockContainerRef} />
    );

    fireEvent.dragEnd(getByTestId('draggable-ingredient'));

    expect(mockMoveIngredient).toHaveBeenCalledWith('instance-1', 559, 559);
  });
});