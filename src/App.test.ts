// @ts-nocheck
import { render, screen } from '@testing-library/react';
import { useGameStore } from './store/gameStore';
import { useT } from './i18n/useT';
import App from './App';

jest.mock('./store/gameStore');
jest.mock('./i18n/useT');
jest.mock('./components/UI/WelcomeScreen', () => ({
  WelcomeScreen: () => <div data-testid="welcome-screen">Welcome Screen</div>,
}));
jest.mock('./components/MealSelector/MealSelector', () => ({
  MealSelector: () => <div data-testid="meal-selector">Meal Selector</div>,
}));
jest.mock('./components/MealSelector/FamilySelector', () => ({
  FamilySelector: () => <div data-testid="family-selector">Family Selector</div>,
}));
jest.mock('./components/Kitchen/Kitchen', () => ({
  Kitchen: () => <div data-testid="kitchen">Kitchen</div>,
}));
jest.mock('./components/MathQuiz/MathQuiz', () => ({
  MathQuiz: () => <div data-testid="math-quiz">Math Quiz</div>,
}));
jest.mock('./components/Splash/MealSplash', () => ({
  MealSplash: () => <div data-testid="meal-splash">Meal Splash</div>,
}));
jest.mock('./components/UI/CelebrationScreen', () => ({
  CelebrationScreen: () => <div data-testid="celebration-screen">Celebration Screen</div>,
}));
jest.mock('./components/UI/LanguageSelector', () => ({
  LanguageSelector: () => <div data-testid="language-selector">Language Selector</div>,
}));
jest.mock('./components/UI/LanguageSetup', () => ({
  LanguageSetup: () => <div data-testid="language-setup">Language Setup</div>,
}));

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useT as jest.Mock).mockReturnValue({
      welcome: {
        title: 'Lunch Language',
      },
    });
  });

  describe('rendering', () => {
    it('should render the app container with correct font family', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });

      render(<App />);

      const container = screen.getByTestId('welcome-screen').parentElement;
      expect(container).toHaveStyle({
        fontFamily: "'Nunito', 'Comic Sans MS', 'Segoe UI', system-ui, sans-serif",
      });
    });

    it('should always render LanguageSetup component', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });

      render(<App />);

      expect(screen.getByTestId('language-setup')).toBeInTheDocument();
    });

    it('should always render LanguageSelector component', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });

      render(<App />);

      expect(screen.getByTestId('language-selector')).toBeInTheDocument();
    });
  });

  describe('phase-based rendering', () => {
    it('should render WelcomeScreen when phase is welcome', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });

      render(<App />);

      expect(screen.getByTestId('welcome-screen')).toBeInTheDocument();
      expect(screen.queryByTestId('meal-selector')).not.toBeInTheDocument();
      expect(screen.queryByTestId('family-selector')).not.toBeInTheDocument();
      expect(screen.queryByTestId('kitchen')).not.toBeInTheDocument();
      expect(screen.queryByTestId('meal-splash')).not.toBeInTheDocument();
      expect(screen.queryByTestId('math-quiz')).not.toBeInTheDocument();
      expect(screen.queryByTestId('celebration-screen')).not.toBeInTheDocument();
    });

    it('should render MealSelector when phase is mealSelect', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'mealSelect' });

      render(<App />);

      expect(screen.getByTestId('meal-selector')).toBeInTheDocument();
      expect(screen.queryByTestId('welcome-screen')).not.toBeInTheDocument();
      expect(screen.queryByTestId('family-selector')).not.toBeInTheDocument();
      expect(screen.queryByTestId('kitchen')).not.toBeInTheDocument();
      expect(screen.queryByTestId('meal-splash')).not.toBeInTheDocument();
      expect(screen.queryByTestId('math-quiz')).not.toBeInTheDocument();
      expect(screen.queryByTestId('celebration-screen')).not.toBeInTheDocument();
    });

    it('should render FamilySelector when phase is familySelect', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'familySelect' });

      render(<App />);

      expect(screen.getByTestId('family-selector')).toBeInTheDocument();
      expect(screen.queryByTestId('welcome-screen')).not.toBeInTheDocument();
      expect(screen.queryByTestId('meal-selector')).not.toBeInTheDocument();
      expect(screen.queryByTestId('kitchen')).not.toBeInTheDocument();
      expect(screen.queryByTestId('meal-splash')).not.toBeInTheDocument();
      expect(screen.queryByTestId('math-quiz')).not.toBeInTheDocument();
      expect(screen.queryByTestId('celebration-screen')).not.toBeInTheDocument();
    });

    it('should render Kitchen when phase is cooking', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'cooking' });

      render(<App />);

      expect(screen.getByTestId('kitchen')).toBeInTheDocument();
      expect(screen.queryByTestId('welcome-screen')).not.toBeInTheDocument();
      expect(screen.queryByTestId('meal-selector')).not.toBeInTheDocument();
      expect(screen.queryByTestId('family-selector')).not.toBeInTheDocument();
      expect(screen.queryByTestId('meal-splash')).not.toBeInTheDocument();
      expect(screen.queryByTestId('math-quiz')).not.toBeInTheDocument();
      expect(screen.queryByTestId('celebration-screen')).not.toBeInTheDocument();
    });

    it('should render MealSplash when phase is mealSplash', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'mealSplash' });

      render(<App />);

      expect(screen.getByTestId('meal-splash')).toBeInTheDocument();
      expect(screen.queryByTestId('welcome-screen')).not.toBeInTheDocument();
      expect(screen.queryByTestId('meal-selector')).not.toBeInTheDocument();
      expect(screen.queryByTestId('family-selector')).not.toBeInTheDocument();
      expect(screen.queryByTestId('kitchen')).not.toBeInTheDocument();
      expect(screen.queryByTestId('math-quiz')).not.toBeInTheDocument();
      expect(screen.queryByTestId('celebration-screen')).not.toBeInTheDocument();
    });

    it('should render MathQuiz when phase is mathQuiz', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'mathQuiz' });

      render(<App />);

      expect(screen.getByTestId('math-quiz')).toBeInTheDocument();
      expect(screen.queryByTestId('welcome-screen')).not.toBeInTheDocument();
      expect(screen.queryByTestId('meal-selector')).not.toBeInTheDocument();
      expect(screen.queryByTestId('family-selector')).not.toBeInTheDocument();
      expect(screen.queryByTestId('kitchen')).not.toBeInTheDocument();
      expect(screen.queryByTestId('meal-splash')).not.toBeInTheDocument();
      expect(screen.queryByTestId('celebration-screen')).not.toBeInTheDocument();
    });

    it('should render CelebrationScreen when phase is celebration', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'celebration' });

      render(<App />);

      expect(screen.getByTestId('celebration-screen')).toBeInTheDocument();
      expect(screen.queryByTestId('welcome-screen')).not.toBeInTheDocument();
      expect(screen.queryByTestId('meal-selector')).not.toBeInTheDocument();
      expect(screen.queryByTestId('family-selector')).not.toBeInTheDocument();
      expect(screen.queryByTestId('kitchen')).not.toBeInTheDocument();
      expect(screen.queryByTestId('meal-splash')).not.toBeInTheDocument();
      expect(screen.queryByTestId('math-quiz')).not.toBeInTheDocument();
    });
  });

  describe('document title', () => {
    it('should set document title with welcome title and emoji on mount', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });
      (useT as jest.Mock).mockReturnValue({
        welcome: {
          title: 'Lunch Language',
        },
      });

      render(<App />);

      expect(document.title).toBe('Lunch Language 🍽️');
    });

    it('should update document title when translation changes', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });
      const { rerender } = render(<App />);

      expect(document.title).toBe('Lunch Language 🍽️');

      (useT as jest.Mock).mockReturnValue({
        welcome: {
          title: 'La langue du déjeuner',
        },
      });

      rerender(<App />);

      expect(document.title).toBe('La langue du déjeuner 🍽️');
    });

    it('should handle empty welcome title', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });
      (useT as jest.Mock).mockReturnValue({
        welcome: {
          title: '',
        },
      });

      render(<App />);

      expect(document.title).toBe(' 🍽️');
    });

    it('should handle special characters in welcome title', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });
      (useT as jest.Mock).mockReturnValue({
        welcome: {
          title: 'Test & Special <Characters>',
        },
      });

      render(<App />);

      expect(document.title).toBe('Test & Special <Characters> 🍽️');
    });
  });

  describe('phase transitions', () => {
    it('should transition from welcome to mealSelect', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });
      const { rerender } = render(<App />);

      expect(screen.getByTestId('welcome-screen')).toBeInTheDocument();

      (useGameStore as jest.Mock).mockReturnValue({ phase: 'mealSelect' });
      rerender(<App />);

      expect(screen.queryByTestId('welcome-screen')).not.toBeInTheDocument();
      expect(screen.getByTestId('meal-selector')).toBeInTheDocument();
    });

    it('should transition through all phases sequentially', () => {
      const phases = ['welcome', 'mealSelect', 'familySelect', 'cooking', 'mealSplash', 'mathQuiz', 'celebration'] as const;
      const testIds = [
        'welcome-screen',
        'meal-selector',
        'family-selector',
        'kitchen',
        'meal-splash',
        'math-quiz',
        'celebration-screen',
      ];

      for (let i = 0; i < phases.length; i++) {
        (useGameStore as jest.Mock).mockReturnValue({ phase: phases[i] });
        const { rerender } = render(<App />);

        expect(screen.getByTestId(testIds[i])).toBeInTheDocument();

        if (i < phases.length - 1) {
          rerender(<App />);
        }
      }
    });
  });

  describe('edge cases', () => {
    it('should handle undefined phase gracefully', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: undefined });

      render(<App />);

      expect(screen.getByTestId('language-setup')).toBeInTheDocument();
      expect(screen.getByTestId('language-selector')).toBeInTheDocument();
      expect(screen.queryByTestId('welcome-screen')).not.toBeInTheDocument();
    });

    it('should handle invalid phase gracefully', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'invalid-phase' });

      render(<App />);

      expect(screen.getByTestId('language-setup')).toBeInTheDocument();
      expect(screen.getByTestId('language-selector')).toBeInTheDocument();
      expect(screen.queryByTestId('welcome-screen')).not.toBeInTheDocument();
    });

    it('should handle null phase gracefully', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: null });

      render(<App />);

      expect(screen.getByTestId('language-setup')).toBeInTheDocument();
      expect(screen.getByTestId('language-selector')).toBeInTheDocument();
    });

    it('should render without crashing when useT returns empty welcome object', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });
      (useT as jest.Mock).mockReturnValue({
        welcome: {},
      });

      render(<App />);

      expect(document.title).toBe('undefined 🍽️');
    });
  });
});