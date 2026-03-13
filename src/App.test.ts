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
jest.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.title = '';
  });

  describe('phase rendering', () => {
    it('should render WelcomeScreen when phase is welcome', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });
      (useT as jest.Mock).mockReturnValue({ welcome: { title: 'Welcome' } });

      render(<App />);

      expect(screen.getByTestId('welcome-screen')).toBeInTheDocument();
    });

    it('should render MealSelector when phase is mealSelect', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'mealSelect' });
      (useT as jest.Mock).mockReturnValue({ welcome: { title: 'Lunch Language' } });

      render(<App />);

      expect(screen.getByTestId('meal-selector')).toBeInTheDocument();
    });

    it('should render FamilySelector when phase is familySelect', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'familySelect' });
      (useT as jest.Mock).mockReturnValue({ welcome: { title: 'Lunch Language' } });

      render(<App />);

      expect(screen.getByTestId('family-selector')).toBeInTheDocument();
    });

    it('should render Kitchen when phase is cooking', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'cooking' });
      (useT as jest.Mock).mockReturnValue({ welcome: { title: 'Lunch Language' } });

      render(<App />);

      expect(screen.getByTestId('kitchen')).toBeInTheDocument();
    });

    it('should render MealSplash when phase is mealSplash', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'mealSplash' });
      (useT as jest.Mock).mockReturnValue({ welcome: { title: 'Lunch Language' } });

      render(<App />);

      expect(screen.getByTestId('meal-splash')).toBeInTheDocument();
    });

    it('should render MathQuiz when phase is mathQuiz', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'mathQuiz' });
      (useT as jest.Mock).mockReturnValue({ welcome: { title: 'Lunch Language' } });

      render(<App />);

      expect(screen.getByTestId('math-quiz')).toBeInTheDocument();
    });

    it('should render CelebrationScreen when phase is celebration', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'celebration' });
      (useT as jest.Mock).mockReturnValue({ welcome: { title: 'Lunch Language' } });

      render(<App />);

      expect(screen.getByTestId('celebration-screen')).toBeInTheDocument();
    });

    it('should render nothing when phase is unknown', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'unknown' });
      (useT as jest.Mock).mockReturnValue({ welcome: { title: 'Lunch Language' } });

      const { container } = render(<App />);

      expect(screen.queryByTestId('welcome-screen')).not.toBeInTheDocument();
      expect(screen.queryByTestId('meal-selector')).not.toBeInTheDocument();
      expect(screen.queryByTestId('family-selector')).not.toBeInTheDocument();
      expect(screen.queryByTestId('kitchen')).not.toBeInTheDocument();
      expect(screen.queryByTestId('meal-splash')).not.toBeInTheDocument();
      expect(screen.queryByTestId('math-quiz')).not.toBeInTheDocument();
      expect(screen.queryByTestId('celebration-screen')).not.toBeInTheDocument();
      expect(container.querySelector('[data-testid]')).not.toBeInTheDocument();
    });
  });

  describe('always rendered components', () => {
    it('should always render LanguageSetup', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });
      (useT as jest.Mock).mockReturnValue({ welcome: { title: 'Lunch Language' } });

      render(<App />);

      expect(screen.getByTestId('language-setup')).toBeInTheDocument();
    });

    it('should always render LanguageSelector', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });
      (useT as jest.Mock).mockReturnValue({ welcome: { title: 'Lunch Language' } });

      render(<App />);

      expect(screen.getByTestId('language-selector')).toBeInTheDocument();
    });
  });

  describe('document title', () => {
    it('should set document title with welcome title and emoji', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });
      (useT as jest.Mock).mockReturnValue({ welcome: { title: 'Welcome' } });

      render(<App />);

      expect(document.title).toBe('Welcome 🍽️');
    });

    it('should update document title when translation changes', () => {
      const { rerender } = render(<App />);
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });
      (useT as jest.Mock).mockReturnValue({ welcome: { title: 'Bienvenue' } });

      rerender(<App />);

      expect(document.title).toBe('Bienvenue 🍽️');
    });

    it('should handle empty translation title', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });
      (useT as jest.Mock).mockReturnValue({ welcome: { title: '' } });

      render(<App />);

      expect(document.title).toBe(' 🍽️');
    });

    it('should handle special characters in translation title', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });
      (useT as jest.Mock).mockReturnValue({ welcome: { title: 'Lunch & Learn' } });

      render(<App />);

      expect(document.title).toBe('Lunch & Learn 🍽️');
    });
  });

  describe('styling', () => {
    it('should apply correct font family styles', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });
      (useT as jest.Mock).mockReturnValue({ welcome: { title: 'Lunch Language' } });

      const { container } = render(<App />);
      const mainDiv = container.firstChild as HTMLDivElement;

      expect(mainDiv).toHaveStyle({
        fontFamily: "'Nunito', 'Comic Sans MS', 'Segoe UI', system-ui, sans-serif",
      });
    });
  });

  describe('multiple phases in succession', () => {
    it('should switch from welcome to mealSelect', () => {
      const { rerender } = render(<App />);
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });
      (useT as jest.Mock).mockReturnValue({ welcome: { title: 'Welcome' } });

      rerender(<App />);
      expect(screen.getByTestId('welcome-screen')).toBeInTheDocument();

      (useGameStore as jest.Mock).mockReturnValue({ phase: 'mealSelect' });
      rerender(<App />);

      expect(screen.queryByTestId('welcome-screen')).not.toBeInTheDocument();
      expect(screen.getByTestId('meal-selector')).toBeInTheDocument();
    });

    it('should switch from celebration back to welcome', () => {
      const { rerender } = render(<App />);
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'celebration' });
      (useT as jest.Mock).mockReturnValue({ welcome: { title: 'Welcome' } });

      rerender(<App />);
      expect(screen.getByTestId('celebration-screen')).toBeInTheDocument();

      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });
      rerender(<App />);

      expect(screen.queryByTestId('celebration-screen')).not.toBeInTheDocument();
      expect(screen.getByTestId('welcome-screen')).toBeInTheDocument();
    });
  });
});