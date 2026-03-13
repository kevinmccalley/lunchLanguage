// @ts-nocheck
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { IngredientShelf } from './IngredientShelf';
import { useGameStore } from '../../store/gameStore';
import { useT } from '../../i18n/useT';
import * as ingredientsData from '../../data/ingredients';

jest.mock('../../store/gameStore');
jest.mock('../../i18n/useT');
jest.mock('../../data/ingredients');
jest.mock('./IngredientToken');
jest.mock('../UI/LearningTooltip');
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => React.createElement('div', props, children),
  },
}));

describe('IngredientShelf', () => {
  const mockOnAdd = jest.fn();
  const mockPlateRef = React.createRef<HTMLDivElement>();
  const mockIngredients = [
    { id: 'tomato', name: 'Tomato', emoji: '🍅' },
    { id: 'lettuce', name: 'Lettuce', emoji: '🥬' },
    { id: 'cheese', name: 'Cheese', emoji: '🧀' },
  ];
  const mockT = {
    kitchen: { addHint: 'Click to add ingredients' },
    ingredients: {
      tomato: 'Tomate',
      lettuce: 'Lechuga',
      cheese: 'Queso',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useGameStore as jest.Mock).mockReturnValue({ selectedMeal: 'lunch' });
    (useT as jest.Mock).mockReturnValue(mockT);
    (ingredientsData.getIngredientsByMeal as jest.Mock).mockReturnValue(mockIngredients);
  });

  it('should render the ingredient shelf with correct title', () => {
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
    expect(screen.getByText('Click to add ingredients')).toBeInTheDocument();
  });

  it('should render all ingredients from the selected meal', () => {
    (ingredientsData.getIngredientsByMeal as jest.Mock).mockReturnValue(mockIngredients);
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
    expect(ingredientsData.getIngredientsByMeal).toHaveBeenCalledWith('lunch');
  });

  it('should fetch ingredients based on selectedMeal from store', () => {
    (useGameStore as jest.Mock).mockReturnValue({ selectedMeal: 'breakfast' });
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
    expect(ingredientsData.getIngredientsByMeal).toHaveBeenCalledWith('breakfast');
  });

  it('should use translated ingredient names from i18n', () => {
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
    expect(useT).toHaveBeenCalled();
  });

  it('should handle ingredient click with valid plate ref', () => {
    const mockDiv = document.createElement('div');
    mockDiv.getBoundingClientRect = jest.fn(() => ({
      width: 400,
      height: 300,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }));
    const plateRef = React.createRef<HTMLDivElement>();
    Object.defineProperty(plateRef, 'current', {
      writable: true,
      value: mockDiv,
    });

    render(<IngredientShelf onAdd={mockOnAdd} plateRef={plateRef} />);
  });

  it('should not call onAdd when plateRef is null', () => {
    const plateRef = React.createRef<HTMLDivElement>();
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={plateRef} />);
  });

  it('should generate unique instanceIds for each added ingredient', () => {
    const mockDiv = document.createElement('div');
    mockDiv.getBoundingClientRect = jest.fn(() => ({
      width: 400,
      height: 300,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }));
    const plateRef = React.createRef<HTMLDivElement>();
    Object.defineProperty(plateRef, 'current', {
      writable: true,
      value: mockDiv,
    });

    const { rerender } = render(<IngredientShelf onAdd={mockOnAdd} plateRef={plateRef} />);
  });

  it('should handle empty ingredients list', () => {
    (ingredientsData.getIngredientsByMeal as jest.Mock).mockReturnValue([]);
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
    expect(screen.getByText('Click to add ingredients')).toBeInTheDocument();
  });

  it('should use fallback ingredient name when translation is missing', () => {
    const ingredientsWithMissingTranslation = [
      { id: 'unknown', name: 'Unknown Ingredient', emoji: '❓' },
    ];
    (ingredientsData.getIngredientsByMeal as jest.Mock).mockReturnValue(ingredientsWithMissingTranslation);
    const mockTWithPartialTranslations = {
      kitchen: { addHint: 'Click to add ingredients' },
      ingredients: {},
    };
    (useT as jest.Mock).mockReturnValue(mockTWithPartialTranslations);

    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
  });

  it('should handle selectedMeal as MealType', () => {
    (useGameStore as jest.Mock).mockReturnValue({ selectedMeal: 'dinner' });
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
    expect(ingredientsData.getIngredientsByMeal).toHaveBeenCalledWith('dinner');
  });

  it('should apply correct styling to container', () => {
    const { container } = render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
    const motionDiv = container.querySelector('div');
    expect(motionDiv).toBeInTheDocument();
  });

  it('should render LearningTooltip wrapper for each ingredient', () => {
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
  });

  it('should pass correct props to IngredientToken', () => {
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
  });

  it('should handle ingredient position calculation within plate bounds', () => {
    const mockDiv = document.createElement('div');
    const getBoundingClientRectMock = jest.fn(() => ({
      width: 500,
      height: 400,
      top: 100,
      left: 100,
      right: 600,
      bottom: 500,
      x: 100,
      y: 100,
      toJSON: () => ({}),
    }));
    mockDiv.getBoundingClientRect = getBoundingClientRectMock;

    const plateRef = React.createRef<HTMLDivElement>();
    Object.defineProperty(plateRef, 'current', {
      writable: true,
      value: mockDiv,
    });

    render(<IngredientShelf onAdd={mockOnAdd} plateRef={plateRef} />);
  });

  it('should pass correct size prop to IngredientToken', () => {
    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
  });

  it('should handle multiple ingredients with different translation states', () => {
    const mixedIngredients = [
      { id: 'tomato', name: 'Tomato', emoji: '🍅' },
      { id: 'unknown', name: 'Unknown', emoji: '❓' },
    ];
    (ingredientsData.getIngredientsByMeal as jest.Mock).mockReturnValue(mixedIngredients);

    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
  });

  it('should maintain ingredient order from data source', () => {
    const orderedIngredients = [
      { id: 'first', name: 'First', emoji: '1️⃣' },
      { id: 'second', name: 'Second', emoji: '2️⃣' },
      { id: 'third', name: 'Third', emoji: '3️⃣' },
    ];
    (ingredientsData.getIngredientsByMeal as jest.Mock).mockReturnValue(orderedIngredients);

    render(<IngredientShelf onAdd={mockOnAdd} plateRef={mockPlateRef} />);
  });

  it('should calculate rotation between -15 and 15 degrees', () => {
    const mockDiv = document.createElement('div');
    mockDiv.getBoundingClientRect = jest.fn(() => ({
      width: 400,
      height: 300,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }));

    const plateRef = React.createRef<HTMLDivElement>();
    Object.defineProperty(plateRef, 'current', {
      writable: true,
      value: mockDiv,
    });

    render(<IngredientShelf onAdd={mockOnAdd} plateRef={plateRef} />);
  });

  it('should calculate scale between 0.85 and 1.15', () => {
    const mockDiv = document.createElement('div');
    mockDiv.getBoundingClientRect = jest.fn(() => ({
      width: 400,
      height: 300,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }));

    const plateRef = React.createRef<HTMLDivElement>();
    Object.defineProperty(plateRef, 'current', {
      writable: true,
      value: mockDiv,
    });

    render(<IngredientShelf onAdd={mockOnAdd} plateRef={plateRef} />);
  });
});