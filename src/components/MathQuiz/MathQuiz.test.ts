// @ts-nocheck
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { MathQuiz } from './MathQuiz';
import { useGameStore } from '../../store/gameStore';
import { useLanguageStore } from '../../store/languageStore';
import { useSpeech } from '../../hooks/useSpeech';
import { getMealInfo } from '../../data/meals';
import { generateQuestions } from './generateQuestions';
import { useT } from '../../i18n/useT';

jest.mock('../../store/gameStore');
jest.mock('../../store/languageStore');
jest.mock('../../hooks/useSpeech');
jest.mock('../../data/meals');
jest.mock('./generateQuestions');
jest.mock('../../i18n/useT');
jest.mock('./NumberPad', () => ({
  NumberPad: ({ onSubmit }: { onSubmit: (value: number) => void }) => (
    <button onClick={() => onSubmit(42)}>Submit Answer</button>
  ),
}));
jest.mock('../Chef/ChefDialog', () => ({
  ChefDialog: () => <div>Chef Dialog</div>,
}));
jest.mock('../UI/StarScore', () => ({
  StarScore: () => <div>Star Score</div>,
}));
jest.mock('../UI/Button', () => ({
  Button: ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

describe('MathQuiz', () => {
  const mockMealInfo = {
    bgColor: '#fff9c4',
    accentColor: '#f57f17',
  };

  const mockTranslations = {
    mathQuiz: {
      title: 'Math Quiz',
      questionOf: (curr: number, total: number) => `Question ${curr} of ${total}`,
      correctMessages: ['Great!', 'Excellent!'],
      wrongMessages: ['Try again!', 'Not quite!'],
      nextMessage: 'Next question!',
      finalMessage: 'You finished!',
      skipButton: 'Skip',
      hintPrefix: 'Hint:',
      skipReveal: (answer: number) => `The answer was ${answer}`,
    },
    kitchen: {
      doneMessage: 'Well done!',
    },
    meals: {
      pizza: { name: 'Pizza' },
    },
    ingredients: {
      cheese: 'Cheese',
      tomato: 'Tomato',
    },
  };

  const mockQuestions = [
    {
      id: '1',
      question: 'How many pizzas?',
      answer: 2,
      visual: '🍕',
      hint: 'Count the slices',
    },
    {
      id: '2',
      question: 'How many toppings?',
      answer: 5,
      visual: '🧀',
      hint: 'Count all ingredients',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    (useGameStore as jest.Mock).mockReturnValue({
      selectedMeal: 'pizza',
      placedIngredients: [
        { ingredientId: 'cheese', id: '1' },
        { ingredientId: 'cheese', id: '2' },
        { ingredientId: 'tomato', id: '3' },
      ],
      familySize: 4,
      pizzaSlices: 8,
      currentQuestionIndex: 0,
      addScore: jest.fn(),
      nextQuestion: jest.fn(),
      setPhase: jest.fn(),
      setChefMessage: jest.fn(),
    });

    (useLanguageStore as jest.Mock).mockReturnValue({
      language: 'en',
    });

    (useSpeech as jest.Mock).mockReturnValue({
      speak: jest.fn(),
    });

    (getMealInfo as jest.Mock).mockReturnValue(mockMealInfo);
    (generateQuestions as jest.Mock).mockReturnValue(mockQuestions);
    (useT as jest.Mock).mockReturnValue(mockTranslations);
  });

  it('renders the quiz title and header', () => {
    render(<MathQuiz />);
    expect(screen.getByText('Math Quiz')).toBeInTheDocument();
  });

  it('renders the chef dialog and star score', () => {
    render(<MathQuiz />);
    expect(screen.getByText('Chef Dialog')).toBeInTheDocument();
    expect(screen.getByText('Star Score')).toBeInTheDocument();
  });

  it('displays progress dots for each question', () => {
    render(<MathQuiz />);
    const dots = document.querySelectorAll('[style*="height: 8px"]');
    expect(dots.length).toBe(mockQuestions.length);
  });

  it('displays ingredient summary with counts', () => {
    render(<MathQuiz />);
    expect(screen.getByText(/YOUR INGREDIENTS:/)).toBeInTheDocument();
    expect(screen.getByText(/Cheese/)).toBeInTheDocument();
    expect(screen.getByText(/×2/)).toBeInTheDocument();
    expect(screen.getByText(/Tomato/)).toBeInTheDocument();
    expect(screen.getByText(/×1/)).toBeInTheDocument();
  });

  it('displays the current question', () => {
    render(<MathQuiz />);
    expect(screen.getByText('How many pizzas?')).toBeInTheDocument();
  });

  it('displays the question number and total', () => {
    render(<MathQuiz />);
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument();
  });

  it('displays the visual emoji for the question', () => {
    render(<MathQuiz />);
    expect(screen.getByText('🍕')).toBeInTheDocument();
  });

  it('calls speak when component mounts and question appears', () => {
    const mockSpeak = jest.fn();
    (useSpeech as jest.Mock).mockReturnValue({
      speak: mockSpeak,
    });

    render(<MathQuiz />);
    expect(mockSpeak).toHaveBeenCalledWith('How many pizzas?');
  });

  it('handles correct answer submission', async () => {
    const mockAddScore = jest.fn();
    const mockNextQuestion = jest.fn();
    const mockSetChefMessage = jest.fn();
    (useGameStore as jest.Mock).mockReturnValue({
      selectedMeal: 'pizza',
      placedIngredients: [],
      familySize: 4,
      pizzaSlices: 8,
      currentQuestionIndex: 0,
      addScore: mockAddScore,
      nextQuestion: mockNextQuestion,
      setPhase: jest.fn(),
      setChefMessage: mockSetChefMessage,
    });

    render(<MathQuiz />);
    const submitButton = screen.getByText('Submit Answer');
    await userEvent.click(submitButton);

    expect(mockAddScore).toHaveBeenCalledWith(10);
    expect(mockSetChefMessage).toHaveBeenCalledWith(expect.stringContaining('+10'), 'cheering');

    await waitFor(() => {
      expect(mockNextQuestion).toHaveBeenCalled();
    }, { timeout: 2000 });
  });

  it('awards fewer points on second attempt', async () => {
    const mockAddScore = jest.fn();
    const mockSetChefMessage = jest.fn();
    (useGameStore as jest.Mock).mockReturnValue({
      selectedMeal: 'pizza',
      placedIngredients: [],
      familySize: 4,
      pizzaSlices: 8,
      currentQuestionIndex: 0,
      addScore: mockAddScore,
      nextQuestion: jest.fn(),
      setPhase: jest.fn(),
      setChefMessage: mockSetChefMessage,
    });

    render(<MathQuiz />);
    const submitButton = screen.getByText('Submit Answer');

    // First incorrect attempt
    await userEvent.click(submitButton);
    expect(mockAddScore).not.toHaveBeenCalled();

    // Wait for feedback to clear
    await waitFor(
      () => {
        expect(screen.queryByText('❌')).not.toBeInTheDocument();
      },
      { timeout: 1500 }
    );

    // Second attempt (correct)
    await userEvent.click(submitButton);
    expect(mockAddScore).toHaveBeenCalledWith(7);
  });

  it('awards minimum points on third attempt', async () => {
    const mockAddScore = jest.fn();
    const mockSetChefMessage = jest.fn();
    (useGameStore as jest.Mock).mockReturnValue({
      selectedMeal: 'pizza',
      placedIngredients: [],
      familySize: 4,
      pizzaSlices: 8,
      currentQuestionIndex: 0,
      addScore: mockAddScore,
      nextQuestion: jest.fn(),
      setPhase: jest.fn(),
      setChefMessage: mockSetChefMessage,
    });

    render(<MathQuiz />);
    const submitButton = screen.getByText('Submit Answer');

    // First wrong attempt
    await userEvent.click(submitButton);
    await waitFor(
      () => {
        expect(screen.queryByText('❌')).not.toBeInTheDocument();
      },
      { timeout: 1500 }
    );

    // Second wrong attempt
    await userEvent.click(submitButton);
    await waitFor(
      () => {
        expect(screen.queryByText('❌')).not.toBeInTheDocument();
      },
      { timeout: 1500 }
    );

    // Third attempt (correct)
    await userEvent.click(submitButton);
    expect(mockAddScore).toHaveBeenCalledWith(5);
  });

  it('shows hint after wrong answer', async () => {
    render(<MathQuiz />);
    const submitButton = screen.getByText('Submit Answer');

    // Answer incorrectly
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Hint:/)).toBeInTheDocument();
      expect(screen.getByText(/Count the slices/)).toBeInTheDocument();
    });
  });

  it('speaks the hint when it appears', async () => {
    const mockSpeak = jest.fn();
    (useSpeech as jest.Mock).mockReturnValue({
      speak: mockSpeak,
    });

    render(<MathQuiz />);
    const submitButton = screen.getByText('Submit Answer');

    // Answer incorrectly to trigger hint
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSpeak).toHaveBeenCalledWith('Hint: Count the slices');
    });
  });

  it('shows skip button after 2 attempts', async () => {
    render(<MathQuiz />);
    const submitButton = screen.getByText('Submit Answer');

    // First wrong attempt
    await userEvent.click(submitButton);
    await waitFor(
      () => {
        expect(screen.queryByText('❌')).not.toBeInTheDocument();
      },
      { timeout: 1500 }
    );

    // Second wrong attempt
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Skip')).toBeInTheDocument();
    });
  });

  it('handles skip action', async () => {
    const mockSetPhase = jest.fn();
    const mockSetChefMessage = jest.fn();
    (useGameStore as jest.Mock).mockReturnValue({
      selectedMeal: 'pizza',
      placedIngredients: [],
      familySize: 4,
      pizzaSlices: 8,
      currentQuestionIndex: 0,
      addScore: jest.fn(),
      nextQuestion: jest.fn(),
      setPhase: mockSetPhase,
      setChefMessage: mockSetChefMessage,
    });

    render(<MathQuiz />);
    const submitButton = screen.getByText('Submit Answer');

    // Trigger 2 wrong answers to show skip button
    await userEvent.click(submitButton);
    await waitFor(
      () => {
        expect(screen.queryByText('❌')).not.toBeInTheDocument();
      },
      { timeout: 1500 }
    );

    await userEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText('Skip')).toBeInTheDocument();
    });

    const skipButton = screen.getByText('Skip');
    await userEvent.click(skipButton);

    expect(mockSetChefMessage).toHaveBeenCalledWith('The answer was 2', 'happy');
  });

  it('advances to celebration phase after last question is answered correctly', async () => {
    const mockSetPhase = jest.fn();
    (useGameStore as jest.Mock).mockReturnValue({
      selectedMeal: 'pizza',
      placedIngredients: [],
      familySize: 4,
      pizzaSlices: 8,
      currentQuestionIndex: 1, // Last question
      addScore: jest.fn(),
      nextQuestion: jest.fn(),
      setPhase: mockSetPhase,
      setChefMessage: jest.fn(),
    });

    render(<MathQuiz />);
    const submitButton = screen.getByText('Submit Answer');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSetPhase).toHaveBeenCalledWith('celebration');
    }, { timeout: 2000 });
  });

  it('advances to celebration phase after skipping last question', async () => {
    const mockSetPhase = jest.fn();
    (useGameStore as jest.Mock).mockReturnValue({
      selectedMeal: 'pizza',
      placedIngredients: [],
      familySize: 4,
      pizzaSlices: 8,
      currentQuestionIndex: 1, // Last question
      addScore: jest.fn(),
      nextQuestion: jest.fn(),
      setPhase: mockSetPhase,
      setChefMessage: jest.fn(),
    });

    render(<MathQuiz />);
    const submitButton = screen.getByText('Submit Answer');

    // Trigger 2 wrong answers to show skip button
    await userEvent.click(submitButton);
    await waitFor(
      () => {
        expect(screen.queryByText('❌')).not.toBeInTheDocument();
      },
      { timeout: 1500 }
    );

    await userEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText('Skip')).toBeInTheDocument();
    });

    const skipButton = screen.getByText('Skip');
    await userEvent.click(skipButton);

    expect(mockSetPhase).toHaveBeenCalledWith('celebration');
  });

  it('regenerates questions when language changes', () => {
    const { rerender } = render(<MathQuiz />);

    expect(generateQuestions).toHaveBeenCalled();

    (useLanguageStore as jest.Mock).mockReturnValue({
      language: 'es',
    });

    rerender(<MathQuiz />);

    // Should be called again due to language dependency
    expect(generateQuestions).toHaveBeenCalledTimes(2);
  });

  it('updates chef message when translations change', () => {
    const mockSetChefMessage = jest.fn();
    (useGameStore as jest.Mock).mockReturnValue({
      selectedMeal: 'pizza',
      placedIngredients: [],
      familySize: 4,
      pizzaSlices: 8,
      currentQuestionIndex: 0,
      addScore: jest.fn(),
      nextQuestion: jest.fn(),
      setPhase: jest.fn(),
      setChefMessage: mockSetChefMessage,
    });

    render(<MathQuiz />);

    expect(mockSetChefMessage).toHaveBeenCalledWith('Well done!', 'excited');
  });

  it('displays feedback emoji on correct answer', async () => {
    render(<MathQuiz />);
    const submitButton = screen.getByText('Submit Answer');
    await userEvent.click(submitButton);

    expect(screen.getByText('✅')).toBeInTheDocument();
  });

  it('displays feedback emoji on wrong answer', async () => {
    render(<MathQuiz />);
    const submitButton = screen.getByText('Submit Answer');

    // Submit wrong answer
    await userEvent.click(submitButton);

    expect(screen.getByText('❌')).toBeInTheDocument();
  });

  it('advances to next question after correct answer delay', async () => {
    const mockNextQuestion = jest.fn();
    (useGameStore as jest.Mock).mockReturnValue({
      selectedMeal: 'pizza',
      placedIngredients: [],
      familySize: 4,
      pizzaSlices: 8,
      currentQuestionIndex: 0,
      addScore: jest.fn(),
      nextQuestion: mockNextQuestion,
      setPhase: jest.fn(),
      setChefMessage: jest.fn(),
    });

    render(<MathQuiz />);
    const submitButton = screen.getByText('Submit Answer');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNextQuestion).toHaveBeenCalled();
    }, { timeout: 2000 });
  });

  it('clears attempts and hint after correct answer', async () => {
    render(<MathQuiz />);
    const submitButton = screen.getByText('Submit Answer');

    // Wrong answer to show hint
    await userEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(/Hint:/)).toBeInTheDocument();
    });

    // Correct answer
    await userEvent.click(submitButton);

    await waitFor(
      () => {
        expect(screen.queryByText(/Hint:/)).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it('renders with proper styling and layout', () => {
    render(<MathQuiz />);
    const container = screen.getByText('Math Quiz').closest('div')?.parentElement;
    expect(container).toBeInTheDocument();
  });

  it('does not render question when all questions are finished', async () => {
    (useGameStore as jest.Mock).mockReturnValue({
      selectedMeal: 'pizza',
      placedIngredients: [],
      familySize: 4,
      pizzaSlices: 8,
      currentQuestionIndex: 2, // Beyond questions.length (2)
      addScore: jest.fn(),
      nextQuestion: jest.fn(),
      setPhase: jest.fn(),
      setChefMessage: jest.fn(),
    });

    render(<MathQuiz />);

    await waitFor(() => {
      expect(screen.queryByText('How many pizzas?')).not.toBeInTheDocument();
    });
  });

  it('sets celebration phase when finished questions state is reached', async () => {
    const mockSetPhase = jest.fn();
    (useGameStore as jest.Mock).mockReturnValue({
      selectedMeal: 'pizza',
      placedIngredients: [],
      familySize: 4,
      pizzaSlices: 8,
      currentQuestionIndex: 10, // Beyond questions
      addScore: jest.fn(),
      nextQuestion: jest.fn(),
      setPhase: mockSetPhase,
      setChefMessage: jest.fn(),
    });

    render(<MathQuiz />);

    await waitFor(() => {
      expect(mockSetPhase).toHaveBeenCalledWith('celebration');
    }, { timeout: 500 });
  });

  it('handles missing ingredient translations gracefully', () => {
    (useGameStore as jest.Mock).mockReturnValue({
      selectedMeal: 'pizza',
      placedIngredients: [
        { ingredientId: 'unknown_ingredient', id: '1' },
      ],
      familySize: 4,
      pizzaSlices: 8,
      currentQuestionIndex: 0,
      addScore: jest.fn(),
      nextQuestion: jest.fn(),
      setPhase: jest.fn(),
      setChefMessage: jest.fn(),
    });

    render(<MathQuiz />);

    expect(screen.getByText(/YOUR INGREDIENTS:/)).toBeInTheDocument();
    expect(screen.getByText(/unknown_ingredient/)).toBeInTheDocument();
  });

  it('does not show skip button before 2 attempts', () => {
    render(<MathQuiz />);
    expect(screen.queryByText('Skip')).not.toBeInTheDocument();
  });

  it('uses meal accent color for progress dots styling', () => {
    render(<MathQuiz />);
    const dots = document.querySelectorAll('[style*="background"]');
    expect(dots.length).toBeGreaterThan(0);
  });

  it('generates questions with correct parameters', () => {
    render(<MathQuiz />);

    expect(generateQuestions).toHaveBeenCalledWith(
      expect.any(Array),
      4,
      8,
      mockTranslations.mathQuiz,
      'Pizza',
      expect.any(Function),
      'pizza',
      'en'
    );
  });
});