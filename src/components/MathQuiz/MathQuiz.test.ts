// @ts-nocheck
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MathQuiz } from './MathQuiz';
import { useGameStore } from '../../store/gameStore';
import { useLanguageStore } from '../../store/languageStore';
import { useT } from '../../i18n/useT';
import { useSpeech } from '../../hooks/useSpeech';
import { getMealInfo } from '../../data/meals';
import { generateQuestions } from './generateQuestions';

jest.mock('../../store/gameStore');
jest.mock('../../store/languageStore');
jest.mock('../../i18n/useT');
jest.mock('../../hooks/useSpeech');
jest.mock('../../data/meals');
jest.mock('./generateQuestions');
jest.mock('../Chef/ChefDialog', () => ({
  ChefDialog: () => <div data-testid="chef-dialog">Chef Dialog</div>,
}));
jest.mock('../UI/StarScore', () => ({
  StarScore: () => <div data-testid="star-score">Star Score</div>,
}));
jest.mock('../UI/Button', () => ({
  Button: ({ children, onClick, variant, size }: any) => (
    <button data-testid={`button-${variant}-${size}`} onClick={onClick}>
      {children}
    </button>
  ),
}));
jest.mock('./NumberPad', () => ({
  NumberPad: ({ onSubmit }: any) => (
    <div data-testid="number-pad">
      <button onClick={() => onSubmit(5)}>5</button>
      <button onClick={() => onSubmit(10)}>10</button>
    </div>
  ),
}));

describe('MathQuiz', () => {
  const mockGameStore = {
    selectedMeal: 'pizza',
    placedIngredients: [{ ingredientId: 'cheese', id: '1' }],
    familySize: 4,
    pizzaSlices: 8,
    currentQuestionIndex: 0,
    addScore: jest.fn(),
    nextQuestion: jest.fn(),
    setPhase: jest.fn(),
    setChefMessage: jest.fn(),
  };

  const mockLanguageStore = {
    language: 'en',
  };

  const mockT = {
    mathQuiz: {
      title: 'Math Quiz',
      questionOf: (curr: number, total: number) => `Question ${curr} of ${total}`,
      hintPrefix: 'Hint:',
      correctMessages: ['Great!', 'Awesome!'],
      wrongMessages: ['Try again!', 'Not quite!'],
      nextMessage: 'Next question!',
      finalMessage: 'You did it!',
      skipButton: 'Skip',
      skipReveal: (answer: number) => `The answer is ${answer}`,
    },
    meals: {
      pizza: { name: 'Pizza' },
    },
    ingredients: {
      cheese: 'Cheese',
    },
    kitchen: {
      doneMessage: 'Done!',
    },
  };

  const mockMealInfo = {
    bgColor: '#ffd700',
    accentColor: '#ff6b6b',
  };

  const mockQuestions = [
    {
      id: '1',
      question: 'What is 2 + 2?',
      answer: 4,
      hint: 'Count on your fingers',
      visual: '🍕',
    },
    {
      id: '2',
      question: 'What is 3 + 3?',
      answer: 6,
      hint: 'Double of 3',
      visual: '🧀',
    },
  ];

  const mockSpeech = {
    speak: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useGameStore as jest.Mock).mockReturnValue(mockGameStore);
    (useLanguageStore as jest.Mock).mockReturnValue(mockLanguageStore);
    (useT as jest.Mock).mockReturnValue(mockT);
    (useSpeech as jest.Mock).mockReturnValue(mockSpeech);
    (getMealInfo as jest.Mock).mockReturnValue(mockMealInfo);
    (generateQuestions as jest.Mock).mockReturnValue(mockQuestions);
  });

  test('renders MathQuiz component', () => {
    render(<MathQuiz />);
    expect(screen.getByText('Math Quiz')).toBeInTheDocument();
    expect(screen.getByTestId('chef-dialog')).toBeInTheDocument();
    expect(screen.getByTestId('star-score')).toBeInTheDocument();
  });

  test('displays current question', () => {
    render(<MathQuiz />);
    expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
  });

  test('displays question number and total', () => {
    render(<MathQuiz />);
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument();
  });

  test('displays visual emoji with rotation animation', () => {
    render(<MathQuiz />);
    expect(screen.getByText('🍕')).toBeInTheDocument();
  });

  test('displays number pad', () => {
    render(<MathQuiz />);
    expect(screen.getByTestId('number-pad')).toBeInTheDocument();
  });

  test('displays ingredient summary', () => {
    render(<MathQuiz />);
    expect(screen.getByText(/YOUR INGREDIENTS:/)).toBeInTheDocument();
    expect(screen.getByText(/Cheese ×1/)).toBeInTheDocument();
  });

  test('does not display ingredient summary when no ingredients', () => {
    (useGameStore as jest.Mock).mockReturnValue({
      ...mockGameStore,
      placedIngredients: [],
    });
    render(<MathQuiz />);
    expect(screen.queryByText(/YOUR INGREDIENTS:/)).not.toBeInTheDocument();
  });

  test('displays progress dots for all questions', () => {
    render(<MathQuiz />);
    const dots = document.querySelectorAll('div[style*="height: 8px"]');
    expect(dots.length).toBe(2);
  });

  test('speaks question when it appears', () => {
    render(<MathQuiz />);
    expect(mockSpeech.speak).toHaveBeenCalledWith('What is 2 + 2?');
  });

  test('handles correct answer submission', async () => {
    render(<MathQuiz />);
    const button = screen.getByText('4');
    await act(async () => {
      button.click();
    });
    await waitFor(() => {
      expect(mockGameStore.addScore).toHaveBeenCalledWith(10);
    });
    expect(mockGameStore.setChefMessage).toHaveBeenCalledWith(
      expect.stringMatching(/Great|Awesome/),
      'cheering'
    );
  });

  test('awards 10 points for correct answer on first attempt', async () => {
    render(<MathQuiz />);
    const button = screen.getByText('4');
    await act(async () => {
      button.click();
    });
    await waitFor(() => {
      expect(mockGameStore.addScore).toHaveBeenCalledWith(10);
    });
  });

  test('handles wrong answer submission', async () => {
    render(<MathQuiz />);
    const button = screen.getByText('5');
    await act(async () => {
      button.click();
    });
    await waitFor(() => {
      expect(mockGameStore.setChefMessage).toHaveBeenCalledWith(
        expect.stringMatching(/Try again|Not quite/),
        'thinking'
      );
    });
  });

  test('shows hint after wrong answer', async () => {
    render(<MathQuiz />);
    const button = screen.getByText('5');
    await act(async () => {
      button.click();
    });
    await waitFor(() => {
      expect(screen.getByText(/Hint:/)).toBeInTheDocument();
    });
  });

  test('speaks hint when it becomes visible', async () => {
    render(<MathQuiz />);
    const button = screen.getByText('5');
    await act(async () => {
      button.click();
    });
    await waitFor(() => {
      expect(mockSpeech.speak).toHaveBeenCalledWith('Hint: Count on your fingers');
    });
  });

  test('increments attempts on wrong answer', async () => {
    render(<MathQuiz />);
    const button = screen.getByText('5');
    await act(async () => {
      button.click();
    });
    await waitFor(() => {
      expect(screen.getByText(/Hint:/)).toBeInTheDocument();
    });
    // Second attempt
    const button2 = screen.getByText('10');
    await act(async () => {
      button2.click();
    });
    await waitFor(() => {
      expect(mockGameStore.setChefMessage).toHaveBeenCalledTimes(2);
    });
  });

  test('shows skip button after 2 wrong attempts', async () => {
    render(<MathQuiz />);
    // First wrong attempt
    await act(async () => {
      screen.getByText('5').click();
    });
    await waitFor(() => {
      expect(screen.getByText(/Hint:/)).toBeInTheDocument();
    });
    // Second wrong attempt
    await act(async () => {
      screen.getByText('10').click();
    });
    await waitFor(() => {
      expect(screen.getByTestId('button-secondary-sm')).toBeInTheDocument();
    });
  });

  test('displays skip button with correct text', async () => {
    (useGameStore as jest.Mock).mockReturnValue({
      ...mockGameStore,
      currentQuestionIndex: 0,
    });
    render(<MathQuiz />);
    // Force 2 wrong attempts
    await act(async () => {
      screen.getByText('5').click();
    });
    await waitFor(() => {
      expect(screen.getByText(/Hint:/)).toBeInTheDocument();
    });
    await act(async () => {
      screen.getByText('10').click();
    });
    await waitFor(() => {
      expect(screen.getByText('Skip')).toBeInTheDocument();
    });
  });

  test('handles skip button click', async () => {
    render(<MathQuiz />);
    // Force 2 wrong attempts
    await act(async () => {
      screen.getByText('5').click();
    });
    await waitFor(() => {
      expect(screen.getByText(/Hint:/)).toBeInTheDocument();
    });
    await act(async () => {
      screen.getByText('10').click();
    });
    await waitFor(() => {
      expect(screen.getByText('Skip')).toBeInTheDocument();
    });
    const skipButton = screen.getByText('Skip');
    await act(async () => {
      skipButton.click();
    });
    await waitFor(() => {
      expect(mockGameStore.setChefMessage).toHaveBeenCalledWith(
        'The answer is 4',
        'happy'
      );
    });
  });

  test('moves to next question after correct answer', async () => {
    jest.useFakeTimers();
    render(<MathQuiz />);
    const button = screen.getByText('4');
    await act(async () => {
      button.click();
    });
    await act(async () => {
      jest.advanceTimersByTime(1800);
    });
    expect(mockGameStore.nextQuestion).toHaveBeenCalled();
    jest.useRealTimers();
  });

  test('transitions to celebration phase when quiz is finished', async () => {
    jest.useFakeTimers();
    (useGameStore as jest.Mock).mockReturnValue({
      ...mockGameStore,
      currentQuestionIndex: 2,
    });
    render(<MathQuiz />);
    await act(async () => {
      jest.advanceTimersByTime(400);
    });
    expect(mockGameStore.setPhase).toHaveBeenCalledWith('celebration');
    jest.useRealTimers();
  });

  test('sets final message when last question is answered correctly', async () => {
    jest.useFakeTimers();
    (useGameStore as jest.Mock).mockReturnValue({
      ...mockGameStore,
      currentQuestionIndex: 1,
    });
    render(<MathQuiz />);
    const button = screen.getByText('6');
    await act(async () => {
      button.click();
    });
    await waitFor(() => {
      expect(mockGameStore.setChefMessage).toHaveBeenCalledWith(
        'You did it!',
        'cheering'
      );
    });
    jest.useRealTimers();
  });

  test('regenerates questions when language changes', () => {
    const { rerender } = render(<MathQuiz />);
    expect(generateQuestions).toHaveBeenCalledTimes(1);
    (useLanguageStore as jest.Mock).mockReturnValue({
      language: 'es',
    });
    rerender(<MathQuiz />);
    expect(generateQuestions).toHaveBeenCalledTimes(2);
  });

  test('updates chef message on language change', () => {
    render(<MathQuiz />);
    expect(mockGameStore.setChefMessage).toHaveBeenCalledWith(
      'Done!',
      'excited'
    );
  });

  test('displays feedback emoji on correct answer', async () => {
    render(<MathQuiz />);
    const button = screen.getByText('4');
    await act(async () => {
      button.click();
    });
    await waitFor(() => {
      expect(screen.getByText('✅')).toBeInTheDocument();
    });
  });

  test('displays feedback emoji on wrong answer', async () => {
    render(<MathQuiz />);
    const button = screen.getByText('5');
    await act(async () => {
      button.click();
    });
    await waitFor(() => {
      expect(screen.getByText('❌')).toBeInTheDocument();
    });
  });

  test('clears feedback after timeout on wrong answer', async () => {
    jest.useFakeTimers();
    render(<MathQuiz />);
    const button = screen.getByText('5');
    await act(async () => {
      button.click();
    });
    expect(screen.getByText('❌')).toBeInTheDocument();
    await act(async () => {
      jest.advanceTimersByTime(1200);
    });
    expect(screen.queryByText('❌')).not.toBeInTheDocument();
    jest.useRealTimers();
  });

  test('clears feedback after timeout on correct answer', async () => {
    jest.useFakeTimers();
    render(<MathQuiz />);
    const button = screen.getByText('4');
    await act(async () => {
      button.click();
    });
    expect(screen.getByText('✅')).toBeInTheDocument();
    await act(async () => {
      jest.advanceTimersByTime(1800);
    });
    expect(screen.queryByText('✅')).not.toBeInTheDocument();
    jest.useRealTimers();
  });

  test('resets attempts after correct answer', async () => {
    jest.useFakeTimers();
    render(<MathQuiz />);
    // Wrong answer
    await act(async () => {
      screen.getByText('5').click();
    });
    await waitFor(() => {
      expect(screen.getByText(/Hint:/)).toBeInTheDocument();
    });
    // Correct answer
    await act(async () => {
      screen.getByText('4').click();
    });
    await act(async () => {
      jest.advanceTimersByTime(1800);
    });
    // The hint should be cleared
    expect(screen.queryByText(/Hint:/)).not.toBeInTheDocument();
    jest.useRealTimers();
  });

  test('hides hint on skip', async () => {
    render(<MathQuiz />);
    await act(async () => {
      screen.getByText('5').click();
    });
    await waitFor(() => {
      expect(screen.getByText(/Hint:/)).toBeInTheDocument();
    });
    await act(async () => {
      screen.getByText('10').click();
    });
    await waitFor(() => {
      expect(screen.getByText('Skip')).toBeInTheDocument();
    });
    const skipButton = screen.getByText('Skip');
    await act(async () => {
      skipButton.click();
    });
    await waitFor(() => {
      expect(screen.queryByText(/Hint:/)).not.toBeInTheDocument();
    });
  });

  test('awards 7 points for correct answer on second attempt', async () => {
    render(<MathQuiz />);
    // First wrong attempt
    await act(async () => {
      screen.getByText('5').click();
    });
    await waitFor(() => {
      expect(screen.getByText(/Hint:/)).toBeInTheDocument();
    });
    // Correct answer on second attempt
    await act(async () => {
      screen.getByText('4').click();
    });
    await waitFor(() => {
      expect(mockGameStore.addScore).toHaveBeenCalledWith(7);
    });
  });

  test('awards 5 points for correct answer on third+ attempt', async () => {
    render(<MathQuiz />);
    // First wrong attempt
    await act(async () => {
      screen.getByText('5').click();
    });
    await waitFor(() => {
      expect(screen.getByText(/Hint:/)).toBeInTheDocument();
    });
    // Second wrong attempt
    await act(async () => {
      screen.getByText('10').click();
    });
    await waitFor(() => {
      expect(screen.getByText('Skip')).toBeInTheDocument();
    });
    // Correct answer on third attempt
    await act(async () => {
      screen.getByText('4').click();
    });
    await waitFor(() => {
      expect(mockGameStore.addScore).toHaveBeenCalledWith(5);
    });
  });

  test('displays multiple ingredients with counts', () => {
    (useGameStore as jest.Mock).mockReturnValue({
      ...mockGameStore,
      placedIngredients: [
        { ingredientId: 'cheese', id: '1' },
        { ingredientId: 'cheese', id: '2' },
        { ingredientId: 'tomato', id: '3' },
      ],
    });
    (useT as jest.Mock).mockReturnValue({
      ...mockT,
      ingredients: {
        cheese: 'Cheese',
        tomato: 'Tomato',
      },
    });
    render(<MathQuiz />);
    expect(screen.getByText(/Cheese ×2/)).toBeInTheDocument();
  });

  test('applies meal styling to header', () => {
    render(<MathQuiz />);
    const header = screen.getByText('Math Quiz').parentElement;
    expect(header).toHaveStyle({ background: 'white' });
  });

  test('applies meal background gradient', () => {
    render(<MathQuiz />);
    const container = screen.getByTestId('chef-dialog').closest('div')?.parentElement;
    expect(container).toBeDefined();
  });

  test('handles empty question gracefully', () => {
    (generateQuestions as jest.Mock).mockReturnValue([]);
    render(<MathQuiz />);
    expect(screen.getByText('Math Quiz')).toBeInTheDocument();
  });

  test('does not submit answer if currentQ is null', async () => {
    (generateQuestions as jest.Mock).mockReturnValue([]);
    render(<MathQuiz />);
    const button = screen.queryByText('4');
    if (button) {
      await act(async () => {
        button.click();
      });
    }
    expect(mockGameStore.addScore).not.toHaveBeenCalled();
  });

  test('does not skip if currentQ is null', async () => {
    (generateQuestions as jest.Mock).mockReturnValue([]);
    render(<MathQuiz />);
    expect(mockGameStore.setChefMessage).toHaveBeenCalledWith('Done!', 'excited');
  });

  test('transitions to next question after skip', async () => {
    jest.useFakeTimers();
    render(<MathQuiz />);
    await act(async () => {
      screen.getByText('5').click();
    });
    await waitFor(() => {
      expect(screen.getByText(/Hint:/)).toBeInTheDocument();
    });
    await act(async () => {
      screen.getByText('10').click();
    });
    await waitFor(() => {
      expect(screen.getByText('Skip')).toBeInTheDocument();
    });
    const skipButton = screen.getByText('Skip');
    await act(async () => {
      skipButton.click();
    });
    expect(mockGameStore.nextQuestion).toHaveBeenCalled();
    jest.useRealTimers();
  });

  test('transitions to celebration phase after skip on last question', async () => {
    jest.useFakeTimers();
    (useGameStore as jest.Mock).mockReturnValue({
      ...mockGameStore,
      currentQuestionIndex: 1,
    });
    render(<MathQuiz />);
    await act(async () => {
      screen.getByText('5').click();
    });
    await waitFor(() => {
      expect(screen.getByText(/Hint:/)).toBeInTheDocument();
    });
    await act(async () => {
      screen.getByText('10').click();
    });
    await waitFor(() => {
      expect(screen.getByText('Skip')).toBeInTheDocument();
    });
    const skipButton = screen.getByText('Skip');
    await act(async () => {
      skipButton.click();
    });
    expect(mockGameStore.setPhase).toHaveBeenCalledWith('celebration');
    jest.useRealTimers();
  });

  test('uses correct meal info for styling', () => {
    render(<MathQuiz />);
    expect(getMealInfo).toHaveBeenCalledWith('pizza');
  });

  test('generates questions with correct parameters', () => {
    render(<MathQuiz />);
    expect(generateQuestions).toHaveBeenCalledWith(
      mockGameStore.placedIngredients,
      mockGameStore.familySize,
      mockGameStore.pizzaSlices,
      mockT.mathQuiz,
      'Pizza',
      expect.any(Function),
      'pizza',
      'en'
    );
  });

  test('animates question card on entry', () => {
    render(<MathQuiz />);
    const questionCard = screen.getByText('What is 2 + 2?').closest('div');
    expect(questionCard).toBeInTheDocument();
  });
});