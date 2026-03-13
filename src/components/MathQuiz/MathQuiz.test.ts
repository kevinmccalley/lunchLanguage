// @ts-nocheck
import { render, screen, fireEvent, waitFor, vi } from '@testing-library/react';
import { MathQuiz } from './MathQuiz';
import { useGameStore } from '../../store/gameStore';
import { useLanguageStore } from '../../store/languageStore';
import { useSpeech } from '../../hooks/useSpeech';
import { getMealInfo } from '../../data/meals';
import { generateQuestions } from './generateQuestions';
import { useT } from '../../i18n/useT';

vi.mock('../../store/gameStore');
vi.mock('../../store/languageStore');
vi.mock('../../hooks/useSpeech');
vi.mock('../../data/meals');
vi.mock('./generateQuestions');
vi.mock('../../i18n/useT');
vi.mock('../Chef/ChefDialog', () => ({
  ChefDialog: () => <div data-testid="chef-dialog">Chef Dialog</div>,
}));
vi.mock('../UI/StarScore', () => ({
  StarScore: () => <div data-testid="star-score">Star Score</div>,
}));
vi.mock('../UI/Button', () => ({
  Button: ({ children, onClick, variant, size }: any) => (
    <button data-testid={`button-${variant}`} onClick={onClick}>
      {children}
    </button>
  ),
}));
vi.mock('./NumberPad', () => ({
  NumberPad: ({ onSubmit }: any) => (
    <div data-testid="number-pad">
      <button onClick={() => onSubmit(5)}>Submit 5</button>
      <button onClick={() => onSubmit(10)}>Submit 10</button>
    </div>
  ),
}));

describe('MathQuiz', () => {
  const mockAddScore = vi.fn();
  const mockNextQuestion = vi.fn();
  const mockSetPhase = vi.fn();
  const mockSetChefMessage = vi.fn();
  const mockSpeak = vi.fn();

  const mockQuestions = [
    {
      id: '1',
      question: 'What is 2 + 3?',
      answer: 5,
      hint: 'Count on your fingers',
      visual: '🍕',
    },
    {
      id: '2',
      question: 'What is 5 + 5?',
      answer: 10,
      hint: 'Double five',
      visual: '🥗',
    },
  ];

  const mockMealInfo = {
    bgColor: '#fff0e6',
    accentColor: '#ff6b35',
  };

  const mockTranslations = {
    mathQuiz: {
      title: 'Math Quiz',
      questionOf: (current: number, total: number) => `Question ${current} of ${total}`,
      hintPrefix: 'Hint:',
      skipButton: 'Skip',
      correctMessages: ['Great!', 'Awesome!'],
      wrongMessages: ['Try again!', 'Not quite!'],
      nextMessage: 'Next question!',
      finalMessage: 'You did it!',
      skipReveal: (answer: number) => `The answer was ${answer}`,
    },
    meals: {
      pizza: { name: 'Pizza' },
    },
    ingredients: {
      cheese: 'Cheese',
    },
    kitchen: {
      doneMessage: 'Well done!',
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useGameStore).mockReturnValue({
      selectedMeal: 'pizza',
      placedIngredients: [
        { ingredientId: 'cheese', id: '1' },
        { ingredientId: 'cheese', id: '2' },
      ],
      familySize: 2,
      pizzaSlices: 8,
      currentQuestionIndex: 0,
      addScore: mockAddScore,
      nextQuestion: mockNextQuestion,
      setPhase: mockSetPhase,
      setChefMessage: mockSetChefMessage,
    } as any);

    vi.mocked(useLanguageStore).mockReturnValue({
      language: 'en',
    } as any);

    vi.mocked(useSpeech).mockReturnValue({
      speak: mockSpeak,
    } as any);

    vi.mocked(getMealInfo).mockReturnValue(mockMealInfo);

    vi.mocked(generateQuestions).mockReturnValue(mockQuestions);

    vi.mocked(useT).mockReturnValue(mockTranslations as any);
  });

  it('should render the MathQuiz component with header and current question', () => {
    render(<MathQuiz />);

    expect(screen.getByText('Math Quiz')).toBeInTheDocument();
    expect(screen.getByTestId('star-score')).toBeInTheDocument();
    expect(screen.getByTestId('chef-dialog')).toBeInTheDocument();
    expect(screen.getByText('What is 2 + 3?')).toBeInTheDocument();
  });

  it('should display question counter', () => {
    render(<MathQuiz />);
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument();
  });

  it('should display ingredient summary', () => {
    render(<MathQuiz />);
    expect(screen.getByText(/YOUR INGREDIENTS:/i)).toBeInTheDocument();
    expect(screen.getByText(/Cheese ×2/)).toBeInTheDocument();
  });

  it('should display progress dots for all questions', () => {
    render(<MathQuiz />);
    const progressDots = screen.getAllByRole('presentation').filter(
      (el) => el.style.width === '28px'
    );
    expect(progressDots).toHaveLength(2);
  });

  it('should speak the question when it appears', () => {
    render(<MathQuiz />);
    expect(mockSpeak).toHaveBeenCalledWith('What is 2 + 3?');
  });

  it('should speak the hint when showHint becomes true', async () => {
    render(<MathQuiz />);
    const submitWrongButton = screen.getByText('Submit 10');
    fireEvent.click(submitWrongButton);

    await waitFor(() => {
      expect(mockSpeak).toHaveBeenCalledWith('Hint: Count on your fingers');
    });
  });

  it('should handle correct answer submission', async () => {
    render(<MathQuiz />);
    const submitCorrectButton = screen.getByText('Submit 5');
    fireEvent.click(submitCorrectButton);

    await waitFor(() => {
      expect(mockAddScore).toHaveBeenCalledWith(10);
      expect(mockSetChefMessage).toHaveBeenCalledWith(
        expect.stringContaining('+10 ⭐'),
        'cheering'
      );
    });
  });

  it('should award 10 points for correct answer on first attempt', async () => {
    render(<MathQuiz />);
    const submitButton = screen.getByText('Submit 5');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAddScore).toHaveBeenCalledWith(10);
    });
  });

  it('should award 7 points for correct answer on second attempt', async () => {
    render(<MathQuiz />);
    const submitWrong = screen.getByText('Submit 10');
    const submitCorrect = screen.getByText('Submit 5');

    fireEvent.click(submitWrong);

    await waitFor(() => {
      expect(mockSetChefMessage).toHaveBeenCalledWith(
        expect.any(String),
        'thinking'
      );
    });

    fireEvent.click(submitCorrect);

    await waitFor(() => {
      expect(mockAddScore).toHaveBeenCalledWith(7);
    });
  });

  it('should award 5 points for correct answer on third attempt', async () => {
    render(<MathQuiz />);
    const submitWrong = screen.getByText('Submit 10');
    const submitCorrect = screen.getByText('Submit 5');

    fireEvent.click(submitWrong);
    await waitFor(() => {
      expect(mockSetChefMessage).toHaveBeenCalledWith(
        expect.any(String),
        'thinking'
      );
    });

    fireEvent.click(submitWrong);
    await waitFor(() => {
      expect(mockSetChefMessage).toHaveBeenCalledWith(
        expect.any(String),
        'thinking'
      );
    });

    fireEvent.click(submitCorrect);

    await waitFor(() => {
      expect(mockAddScore).toHaveBeenCalledWith(5);
    });
  });

  it('should display wrong feedback for incorrect answer', async () => {
    render(<MathQuiz />);
    const submitWrongButton = screen.getByText('Submit 10');
    fireEvent.click(submitWrongButton);

    await waitFor(() => {
      expect(screen.getByText('❌')).toBeInTheDocument();
    });
  });

  it('should display hint after wrong answer', async () => {
    render(<MathQuiz />);
    const submitWrongButton = screen.getByText('Submit 10');
    fireEvent.click(submitWrongButton);

    await waitFor(() => {
      expect(screen.getByText(/Hint:/)).toBeInTheDocument();
    });
  });

  it('should show skip button after 2 wrong attempts', async () => {
    render(<MathQuiz />);
    const submitWrongButton = screen.getByText('Submit 10');

    fireEvent.click(submitWrongButton);
    await waitFor(() => {
      expect(screen.queryByTestId('button-secondary')).not.toBeInTheDocument();
    });

    fireEvent.click(submitWrongButton);
    await waitFor(() => {
      expect(screen.getByTestId('button-secondary')).toBeInTheDocument();
    });
  });

  it('should move to next question on correct answer', async () => {
    render(<MathQuiz />);
    const submitCorrectButton = screen.getByText('Submit 5');
    fireEvent.click(submitCorrectButton);

    await waitFor(
      () => {
        expect(mockNextQuestion).toHaveBeenCalled();
      },
      { timeout: 2000 }
    );
  });

  it('should transition to celebration phase when all questions are answered', async () => {
    vi.mocked(useGameStore).mockReturnValue({
      selectedMeal: 'pizza',
      placedIngredients: [],
      familySize: 2,
      pizzaSlices: 8,
      currentQuestionIndex: 1,
      addScore: mockAddScore,
      nextQuestion: mockNextQuestion,
      setPhase: mockSetPhase,
      setChefMessage: mockSetChefMessage,
    } as any);

    vi.mocked(generateQuestions).mockReturnValue(mockQuestions);

    render(<MathQuiz />);
    const submitCorrectButton = screen.getByText('Submit 10');
    fireEvent.click(submitCorrectButton);

    await waitFor(
      () => {
        expect(mockSetPhase).toHaveBeenCalledWith('celebration');
      },
      { timeout: 2000 }
    );
  });

  it('should handle skip button click', async () => {
    render(<MathQuiz />);
    const submitWrongButton = screen.getByText('Submit 10');

    fireEvent.click(submitWrongButton);
    fireEvent.click(submitWrongButton);

    await waitFor(() => {
      expect(screen.getByTestId('button-secondary')).toBeInTheDocument();
    });

    const skipButton = screen.getByTestId('button-secondary');
    fireEvent.click(skipButton);

    await waitFor(() => {
      expect(mockSetChefMessage).toHaveBeenCalledWith(
        'The answer was 5',
        'happy'
      );
    });
  });

  it('should transition to celebration on skip when on last question', async () => {
    vi.mocked(useGameStore).mockReturnValue({
      selectedMeal: 'pizza',
      placedIngredients: [],
      familySize: 2,
      pizzaSlices: 8,
      currentQuestionIndex: 1,
      addScore: mockAddScore,
      nextQuestion: mockNextQuestion,
      setPhase: mockSetPhase,
      setChefMessage: mockSetChefMessage,
    } as any);

    render(<MathQuiz />);
    const submitWrongButton = screen.getByText('Submit 5');

    fireEvent.click(submitWrongButton);
    fireEvent.click(submitWrongButton);

    await waitFor(() => {
      expect(screen.getByTestId('button-secondary')).toBeInTheDocument();
    });

    const skipButton = screen.getByTestId('button-secondary');
    fireEvent.click(skipButton);

    await waitFor(() => {
      expect(mockSetPhase).toHaveBeenCalledWith('celebration');
    });
  });

  it('should auto-transition to celebration when isFinished becomes true', async () => {
    vi.mocked(useGameStore).mockReturnValue({
      selectedMeal: 'pizza',
      placedIngredients: [],
      familySize: 2,
      pizzaSlices: 8,
      currentQuestionIndex: 2,
      addScore: mockAddScore,
      nextQuestion: mockNextQuestion,
      setPhase: mockSetPhase,
      setChefMessage: mockSetChefMessage,
    } as any);

    render(<MathQuiz />);

    await waitFor(
      () => {
        expect(mockSetPhase).toHaveBeenCalledWith('celebration');
      },
      { timeout: 500 }
    );
  });

  it('should regenerate questions when language changes', () => {
    const { rerender } = render(<MathQuiz />);

    expect(generateQuestions).toHaveBeenCalled();
    const firstCallCount = vi.mocked(generateQuestions).mock.calls.length;

    vi.mocked(useLanguageStore).mockReturnValue({
      language: 'fr',
    } as any);

    rerender(<MathQuiz />);

    expect(vi.mocked(generateQuestions).mock.calls.length).toBeGreaterThan(
      firstCallCount
    );
  });

  it('should update chef message when translations change', () => {
    render(<MathQuiz />);

    expect(mockSetChefMessage).toHaveBeenCalledWith('Well done!', 'excited');
  });

  it('should not render NumberPad when isFinished is true', () => {
    vi.mocked(useGameStore).mockReturnValue({
      selectedMeal: 'pizza',
      placedIngredients: [],
      familySize: 2,
      pizzaSlices: 8,
      currentQuestionIndex: 2,
      addScore: mockAddScore,
      nextQuestion: mockNextQuestion,
      setPhase: mockSetPhase,
      setChefMessage: mockSetChefMessage,
    } as any);

    render(<MathQuiz />);

    expect(screen.queryByTestId('number-pad')).not.toBeInTheDocument();
  });

  it('should display visual emoji for question', () => {
    render(<MathQuiz />);
    expect(screen.getByText('🍕')).toBeInTheDocument();
  });

  it('should handle empty placedIngredients', () => {
    vi.mocked(useGameStore).mockReturnValue({
      selectedMeal: 'pizza',
      placedIngredients: [],
      familySize: 2,
      pizzaSlices: 8,
      currentQuestionIndex: 0,
      addScore: mockAddScore,
      nextQuestion: mockNextQuestion,
      setPhase: mockSetPhase,
      setChefMessage: mockSetChefMessage,
    } as any);

    render(<MathQuiz />);

    expect(screen.queryByText(/YOUR INGREDIENTS:/i)).not.toBeInTheDocument();
  });

  it('should correctly aggregate ingredient counts', () => {
    vi.mocked(useGameStore).mockReturnValue({
      selectedMeal: 'pizza',
      placedIngredients: [
        { ingredientId: 'cheese', id: '1' },
        { ingredientId: 'cheese', id: '2' },
        { ingredientId: 'tomato', id: '3' },
      ],
      familySize: 2,
      pizzaSlices: 8,
      currentQuestionIndex: 0,
      addScore: mockAddScore,
      nextQuestion: mockNextQuestion,
      setPhase: mockSetPhase,
      setChefMessage: mockSetChefMessage,
    } as any);

    vi.mocked(useT).mockReturnValue({
      ...mockTranslations,
      ingredients: {
        cheese: 'Cheese',
        tomato: 'Tomato',
      },
    } as any);

    render(<MathQuiz />);

    expect(screen.getByText(/Cheese ×2/)).toBeInTheDocument();
    expect(screen.getByText(/Tomato ×1/)).toBeInTheDocument();
  });

  it('should display correct feedback emoji on correct answer', async () => {
    render(<MathQuiz />);
    const submitCorrectButton = screen.getByText('Submit 5');
    fireEvent.click(submitCorrectButton);

    await waitFor(() => {
      expect(screen.getByText('✅')).toBeInTheDocument();
    });
  });

  it('should reset state after correct answer', async () => {
    render(<MathQuiz />);
    const submitWrongButton = screen.getByText('Submit 10');

    fireEvent.click(submitWrongButton);

    await waitFor(() => {
      expect(screen.getByText(/Hint:/)).toBeInTheDocument();
    });

    const submitCorrectButton = screen.getByText('Submit 5');
    fireEvent.click(submitCorrectButton);

    await waitFor(
      () => {
        expect(screen.queryByText(/Hint:/)).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it('should handle currentQ being null gracefully', () => {
    vi.mocked(generateQuestions).mockReturnValue([]);

    render(<MathQuiz />);

    expect(screen.queryByText(/What is/)).not.toBeInTheDocument();
  });

  it('should display correct meal background color', () => {
    const { container } = render(<MathQuiz />);
    const mainDiv = container.firstChild;

    expect(mainDiv).toHaveStyle(
      `background: linear-gradient(135deg, ${mockMealInfo.bgColor} 0%, white 100%)`
    );
  });

  it('should use meal accent color for header and UI elements', () => {
    render(<MathQuiz />);
    expect(screen.getByText('Math Quiz')).toHaveStyle(
      `color: ${mockMealInfo.accentColor}`
    );
  });

  it('should display all progress dots as completed for previous questions', () => {
    vi.mocked(useGameStore).mockReturnValue({
      selectedMeal: 'pizza',
      placedIngredients: [],
      familySize: 2,
      pizzaSlices: 8,
      currentQuestionIndex: 1,
      addScore: mockAddScore,
      nextQuestion: mockNextQuestion,
      setPhase: mockSetPhase,
      setChefMessage: mockSetChefMessage,
    } as any);

    const { container } = render(<MathQuiz />);
    const dots = Array.from(container.querySelectorAll('[style*="width"]')).filter(
      (el) => el.getAttribute('style')?.includes('28px')
    );

    expect(dots[0]).toHaveStyle('background: #27ae60');
    expect(dots[1]).toHaveStyle(`background: ${mockMealInfo.accentColor}`);
  });
});