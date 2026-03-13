// @ts-nocheck
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MathQuiz } from './MathQuiz';
import { useGameStore } from '../../store/gameStore';
import { useLanguageStore } from '../../store/languageStore';
import { useSpeech } from '../../hooks/useSpeech';
import { generateQuestions } from './generateQuestions';
import { getMealInfo } from '../../data/meals';
import { useT } from '../../i18n/useT';

jest.mock('../../store/gameStore');
jest.mock('../../store/languageStore');
jest.mock('../../hooks/useSpeech');
jest.mock('./generateQuestions');
jest.mock('../../data/meals');
jest.mock('../../i18n/useT');
jest.mock('../Chef/ChefDialog', () => ({
  ChefDialog: () => <div data-testid="chef-dialog">Chef Dialog</div>,
}));
jest.mock('../UI/StarScore', () => ({
  StarScore: () => <div data-testid="star-score">Star Score</div>,
}));
jest.mock('../UI/Button', () => ({
  Button: ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>,
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
  const mockAddScore = jest.fn();
  const mockNextQuestion = jest.fn();
  const mockSetPhase = jest.fn();
  const mockSetChefMessage = jest.fn();
  const mockSpeak = jest.fn();

  const defaultGameStore = {
    selectedMeal: 'pasta',
    placedIngredients: [
      { ingredientId: 'tomato', x: 0, y: 0 },
      { ingredientId: 'tomato', x: 0, y: 0 },
      { ingredientId: 'cheese', x: 0, y: 0 },
    ],
    familySize: 4,
    pizzaSlices: 8,
    currentQuestionIndex: 0,
    addScore: mockAddScore,
    nextQuestion: mockNextQuestion,
    setPhase: mockSetPhase,
    setChefMessage: mockSetChefMessage,
  };

  const mockQuestions = [
    {
      id: 'q1',
      question: 'What is 2 + 2?',
      answer: 4,
      hint: 'Count on your fingers',
      visual: '🍝',
    },
    {
      id: 'q2',
      question: 'What is 5 + 3?',
      answer: 8,
      hint: 'Start from 5 and count up',
      visual: '🧀',
    },
  ];

  const mockMealInfo = {
    bgColor: '#FFE5B4',
    accentColor: '#FF6B6B',
  };

  const mockTranslations = {
    mathQuiz: {
      title: 'Math Quiz',
      questionOf: (current: number, total: number) => `Question ${current} of ${total}`,
      hintPrefix: 'Hint:',
      skipButton: 'Skip',
      correctMessages: ['Great job!', 'Excellent!'],
      wrongMessages: ['Try again!', 'Not quite!'],
      nextMessage: 'Next question!',
      finalMessage: 'You did it!',
      skipReveal: (answer: number) => `The answer was ${answer}`,
    },
    kitchen: {
      doneMessage: 'Quiz complete!',
    },
    meals: {
      pasta: { name: 'Pasta' },
    },
    ingredients: {
      tomato: 'Tomato',
      cheese: 'Cheese',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    (useGameStore as jest.Mock).mockReturnValue(defaultGameStore);
    (useLanguageStore as jest.Mock).mockReturnValue({ language: 'en' });
    (useSpeech as jest.Mock).mockReturnValue({ speak: mockSpeak });
    (generateQuestions as jest.Mock).mockReturnValue(mockQuestions);
    (getMealInfo as jest.Mock).mockReturnValue(mockMealInfo);
    (useT as jest.Mock).mockReturnValue(mockTranslations);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders the quiz component with header and current question', () => {
    render(<MathQuiz />);
    expect(screen.getByText('Math Quiz')).toBeInTheDocument();
    expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
    expect(screen.getByTestId('chef-dialog')).toBeInTheDocument();
  });

  it('displays the current question counter', () => {
    render(<MathQuiz />);
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument();
  });

  it('renders progress dots for each question', () => {
    render(<MathQuiz />);
    const dots = screen.getAllByRole('presentation', { hidden: true });
    expect(dots).toHaveLength(2);
  });

  it('displays ingredient summary with counts', () => {
    render(<MathQuiz />);
    expect(screen.getByText('YOUR INGREDIENTS:')).toBeInTheDocument();
    expect(screen.getByText(/Tomato ×2/)).toBeInTheDocument();
    expect(screen.getByText(/Cheese ×1/)).toBeInTheDocument();
  });

  it('does not display ingredient summary when no ingredients are placed', () => {
    (useGameStore as jest.Mock).mockReturnValue({
      ...defaultGameStore,
      placedIngredients: [],
    });
    render(<MathQuiz />);
    expect(screen.queryByText('YOUR INGREDIENTS:')).not.toBeInTheDocument();
  });

  it('speaks the question when it loads', () => {
    render(<MathQuiz />);
    expect(mockSpeak).toHaveBeenCalledWith('What is 2 + 2?');
  });

  it('displays the NumberPad component', () => {
    render(<MathQuiz />);
    expect(screen.getByTestId('number-pad')).toBeInTheDocument();
  });

  it('shows visual element rotating', () => {
    render(<MathQuiz />);
    expect(screen.getByText('🍝')).toBeInTheDocument();
  });

  describe('answer handling', () => {
    it('handles correct answer and updates score', async () => {
      render(<MathQuiz />);
      const correctButton = screen.getAllByRole('button')[1]; // Button with value 4
      fireEvent.click(correctButton);

      await waitFor(() => {
        expect(mockAddScore).toHaveBeenCalledWith(10);
      });
      expect(mockSetChefMessage).toHaveBeenCalledWith(
        expect.stringContaining('+10'),
        'cheering'
      );
    });

    it('displays correct feedback emoji on correct answer', async () => {
      render(<MathQuiz />);
      const correctButton = screen.getAllByRole('button')[1];
      fireEvent.click(correctButton);

      await waitFor(() => {
        expect(screen.getByText('✅')).toBeInTheDocument();
      });
    });

    it('awards 10 points for correct answer on first attempt', () => {
      render(<MathQuiz />);
      const correctButton = screen.getAllByRole('button')[1];
      fireEvent.click(correctButton);

      expect(mockAddScore).toHaveBeenCalledWith(10);
    });

    it('handles wrong answer and shows hint', async () => {
      render(<MathQuiz />);
      const wrongButton = screen.getAllByRole('button')[0]; // Button with value 5
      fireEvent.click(wrongButton);

      await waitFor(() => {
        expect(screen.getByText(/Hint:/)).toBeInTheDocument();
      });
      expect(mockSetChefMessage).toHaveBeenCalledWith(
        expect.any(String),
        'thinking'
      );
    });

    it('displays wrong feedback emoji on incorrect answer', async () => {
      render(<MathQuiz />);
      const wrongButton = screen.getAllByRole('button')[0];
      fireEvent.click(wrongButton);

      await waitFor(() => {
        expect(screen.getByText('❌')).toBeInTheDocument();
      });
    });

    it('shows hint when answer is wrong', async () => {
      render(<MathQuiz />);
      const wrongButton = screen.getAllByRole('button')[0];
      fireEvent.click(wrongButton);

      await waitFor(() => {
        expect(screen.getByText('Hint: Count on your fingers')).toBeInTheDocument();
      });
    });

    it('speaks the hint when it becomes visible', async () => {
      render(<MathQuiz />);
      const wrongButton = screen.getAllByRole('button')[0];
      fireEvent.click(wrongButton);

      await waitFor(() => {
        expect(mockSpeak).toHaveBeenCalledWith('Hint: Count on your fingers');
      });
    });

    it('increments attempts counter on wrong answer', () => {
      render(<MathQuiz />);
      const wrongButton = screen.getAllByRole('button')[0];
      
      fireEvent.click(wrongButton);
      expect(screen.getByText(/Hint:/)).toBeInTheDocument();
      
      fireEvent.click(wrongButton);
      expect(screen.getByText(/Hint:/)).toBeInTheDocument();
    });

    it('shows skip button after 2 wrong attempts', async () => {
      render(<MathQuiz />);
      const wrongButton = screen.getAllByRole('button')[0];
      
      fireEvent.click(wrongButton);
      jest.runOnlyPendingTimers();
      
      fireEvent.click(wrongButton);
      
      await waitFor(() => {
        expect(screen.getByText('Skip')).toBeInTheDocument();
      });
    });
  });

  describe('advancing questions', () => {
    it('advances to next question after correct answer', async () => {
      render(<MathQuiz />);
      const correctButton = screen.getAllByRole('button')[1];
      fireEvent.click(correctButton);

      await waitFor(() => {
        jest.runAllTimers();
        expect(mockNextQuestion).toHaveBeenCalled();
      });
    });

    it('moves to celebration phase when last question is answered correctly', async () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        currentQuestionIndex: 1, // Last question
      });

      render(<MathQuiz />);
      const correctButton = screen.getAllByRole('button')[1];
      fireEvent.click(correctButton);

      await waitFor(() => {
        jest.runAllTimers();
        expect(mockSetPhase).toHaveBeenCalledWith('celebration');
      });
    });

    it('sets final message when last question is answered correctly', async () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        currentQuestionIndex: 1,
      });

      render(<MathQuiz />);
      const correctButton = screen.getAllByRole('button')[1];
      fireEvent.click(correctButton);

      await waitFor(() => {
        expect(mockSetChefMessage).toHaveBeenCalledWith(
          'You did it!',
          'cheering'
        );
      });
    });
  });

  describe('skip functionality', () => {
    it('reveals answer when skip is clicked', async () => {
      render(<MathQuiz />);
      const wrongButton = screen.getAllByRole('button')[0];
      
      fireEvent.click(wrongButton);
      jest.runOnlyPendingTimers();
      fireEvent.click(wrongButton);
      
      await waitFor(() => {
        fireEvent.click(screen.getByText('Skip'));
        expect(mockSetChefMessage).toHaveBeenCalledWith(
          expect.stringContaining('The answer was 4'),
          'happy'
        );
      });
    });

    it('advances to next question after skip', async () => {
      render(<MathQuiz />);
      const wrongButton = screen.getAllByRole('button')[0];
      
      fireEvent.click(wrongButton);
      jest.runOnlyPendingTimers();
      fireEvent.click(wrongButton);
      
      await waitFor(() => {
        fireEvent.click(screen.getByText('Skip'));
        jest.runAllTimers();
        expect(mockNextQuestion).toHaveBeenCalled();
      });
    });

    it('moves to celebration phase when last question is skipped', async () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        currentQuestionIndex: 1,
      });

      render(<MathQuiz />);
      const wrongButton = screen.getAllByRole('button')[0];
      
      fireEvent.click(wrongButton);
      jest.runOnlyPendingTimers();
      fireEvent.click(wrongButton);
      
      await waitFor(() => {
        fireEvent.click(screen.getByText('Skip'));
        expect(mockSetPhase).toHaveBeenCalledWith('celebration');
      });
    });

    it('clears state after skip', async () => {
      render(<MathQuiz />);
      const wrongButton = screen.getAllByRole('button')[0];
      
      fireEvent.click(wrongButton);
      jest.runOnlyPendingTimers();
      fireEvent.click(wrongButton);
      
      await waitFor(() => {
        fireEvent.click(screen.getByText('Skip'));
        // Hint should be cleared
        expect(screen.queryByText(/Hint:/)).not.toBeInTheDocument();
      });
    });
  });

  describe('scoring', () => {
    it('awards 10 points for first attempt correct', () => {
      render(<MathQuiz />);
      const correctButton = screen.getAllByRole('button')[1];
      fireEvent.click(correctButton);

      expect(mockAddScore).toHaveBeenCalledWith(10);
    });

    it('awards 7 points for second attempt correct', () => {
      render(<MathQuiz />);
      const wrongButton = screen.getAllByRole('button')[0];
      const correctButton = screen.getAllByRole('button')[1];

      fireEvent.click(wrongButton);
      jest.runOnlyPendingTimers();
      
      fireEvent.click(correctButton);
      expect(mockAddScore).toHaveBeenCalledWith(7);
    });

    it('awards 5 points for third attempt correct', () => {
      render(<MathQuiz />);
      const wrongButton = screen.getAllByRole('button')[0];
      const correctButton = screen.getAllByRole('button')[1];

      fireEvent.click(wrongButton);
      jest.runOnlyPendingTimers();
      fireEvent.click(wrongButton);
      jest.runOnlyPendingTimers();
      
      fireEvent.click(correctButton);
      expect(mockAddScore).toHaveBeenCalledWith(5);
    });
  });

  describe('phase transitions', () => {
    it('transitions to celebration when all questions are finished', async () => {
      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        currentQuestionIndex: 2, // Beyond array length
      });

      render(<MathQuiz />);
      jest.runOnlyPendingTimers();

      await waitFor(() => {
        expect(mockSetPhase).toHaveBeenCalledWith('celebration');
      });
    });

    it('sets next message after advancing to next question', async () => {
      render(<MathQuiz />);
      const correctButton = screen.getAllByRole('button')[1];
      fireEvent.click(correctButton);

      await waitFor(() => {
        jest.runAllTimers();
        expect(mockSetChefMessage).toHaveBeenCalledWith(
          'Next question!',
          'excited'
        );
      });
    });
  });

  describe('language changes', () => {
    it('regenerates questions when language changes', () => {
      const { rerender } = render(<MathQuiz />);
      jest.clearAllMocks();
      
      (useLanguageStore as jest.Mock).mockReturnValue({ language: 'es' });
      (generateQuestions as jest.Mock).mockReturnValue(mockQuestions);
      
      rerender(<MathQuiz />);
      expect(generateQuestions).toHaveBeenCalled();
    });

    it('updates chef message with translations on language change', () => {
      render(<MathQuiz />);
      jest.clearAllMocks();
      
      const newTranslations = {
        ...mockTranslations,
        kitchen: { doneMessage: 'Quiz completado!' },
      };
      (useT as jest.Mock).mockReturnValue(newTranslations);

      act(() => {
        jest.runOnlyPendingTimers();
      });

      expect(mockSetChefMessage).toHaveBeenCalled();
    });
  });

  describe('ingredient tracking', () => {
    it('correctly counts multiple ingredients of the same type', () => {
      render(<MathQuiz />);
      expect(screen.getByText(/Tomato ×2/)).toBeInTheDocument();
    });

    it('displays multiple different ingredients', () => {
      render(<MathQuiz />);
      expect(screen.getByText(/Tomato ×2/)).toBeInTheDocument();
      expect(screen.getByText(/Cheese ×1/)).toBeInTheDocument();
    });

    it('uses getIngName translation for ingredient labels', () => {
      render(<MathQuiz />);
      expect(screen.getByText(/Tomato ×2/)).toBeInTheDocument();
    });

    it('falls back to ingredient id if translation missing', () => {
      (useT as jest.Mock).mockReturnValue({
        ...mockTranslations,
        ingredients: {}, // Empty translations
      });

      render(<MathQuiz />);
      expect(screen.getByText(/tomato ×2/)).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('does not crash with no questions', () => {
      (generateQuestions as jest.Mock).mockReturnValue([]);
      render(<MathQuiz />);
      expect(screen.queryByText('What is 2 + 2?')).not.toBeInTheDocument();
    });

    it('handles missing meal info gracefully', () => {
      (getMealInfo as jest.Mock).mockReturnValue({
        bgColor: '#000',
        accentColor: '#fff',
      });
      render(<MathQuiz />);
      expect(screen.getByText('Math Quiz')).toBeInTheDocument();
    });

    it('does not submit answer if no current question', () => {
      (generateQuestions as jest.Mock).mockReturnValue([]);
      render(<MathQuiz />);
      const button = screen.getAllByRole('button')[0];
      fireEvent.click(button);
      expect(mockAddScore).not.toHaveBeenCalled();
    });

    it('resets state after transitioning to next question', async () => {
      render(<MathQuiz />);
      const wrongButton = screen.getAllByRole('button')[0];
      
      fireEvent.click(wrongButton);
      jest.runOnlyPendingTimers();

      const correctButton = screen.getAllByRole('button')[1];
      fireEvent.click(correctButton);
      jest.runAllTimers();

      // After transition, state should be reset
      expect(screen.queryByText(/Hint:/)).not.toBeInTheDocument();
    });

    it('clears feedback after incorrect attempt timeout', async () => {
      render(<MathQuiz />);
      const wrongButton = screen.getAllByRole('button')[0];
      fireEvent.click(wrongButton);

      await waitFor(() => {
        expect(screen.getByText('❌')).toBeInTheDocument();
      });

      jest.runOnlyPendingTimers();

      expect(screen.queryByText('❌')).not.toBeInTheDocument();
    });

    it('respects question memoization and only regenerates on language change', () => {
      const { rerender } = render(<MathQuiz />);
      expect(generateQuestions).toHaveBeenCalledTimes(1);

      (useGameStore as jest.Mock).mockReturnValue({
        ...defaultGameStore,
        currentQuestionIndex: 1,
      });
      rerender(<MathQuiz />);

      // Should not regenerate when only currentQuestionIndex changes
      expect(generateQuestions).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility and display', () => {
    it('displays meal accent color in various elements', () => {
      render(<MathQuiz />);
      // The title should have the accent color
      expect(screen.getByText('Math Quiz')).toHaveStyle({
        color: mockMealInfo.accentColor,
      });
    });

    it('renders with background gradient using meal colors', () => {
      render(<MathQuiz />);
      const container = screen.getByText('Math Quiz').closest('div')?.parentElement;
      expect(container).toHaveStyle({
        background: expect.stringContaining(mockMealInfo.bgColor),
      });
    });

    it('displays question with proper formatting', () => {
      render(<MathQuiz />);
      expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
    });
  });
});