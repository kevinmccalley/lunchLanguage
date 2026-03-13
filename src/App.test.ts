// @ts-nocheck
import { render, screen } from '@testing-library/react';
import { useGameStore } from './store/gameStore';
import { useT } from './i18n/useT';
import App from './App';

jest.mock('./store/gameStore');
jest.mock('./i18n/useT');
jest.mock('./components/UI/WelcomeScreen', () => ({
  WelcomeScreen: () => <div data-testid="welcome-screen">WelcomeScreen</div>,
}));
jest.mock('./components/MealSelector/MealSelector', () => ({
  MealSelector: () => <div data-testid="meal-selector">MealSelector</div>,
}));
jest.mock('./components/MealSelector/FamilySelector', () => ({
  FamilySelector: () => <div data-testid="family-selector">FamilySelector</div>,
}));
jest.mock('./components/Kitchen/Kitchen', () => ({
  Kitchen: () => <div data-testid="kitchen">Kitchen</div>,
}));
jest.mock('./components/MathQuiz/MathQuiz', () => ({
  MathQuiz: () => <div data-testid="math-quiz">MathQuiz</div>,
}));
jest.mock('./components/Splash/MealSplash', () => ({
  MealSplash: () => <div data-testid="meal-splash">MealSplash</div>,
}));
jest.mock('./components/UI/CelebrationScreen', () => ({
  CelebrationScreen: () => <div data-testid="celebration-screen">CelebrationScreen</div>,
}));
jest.mock('./components/UI/LanguageSelector', () => ({
  LanguageSelector: () => <div data-testid="language-selector">LanguageSelector</div>,
}));
jest.mock('./components/UI/LanguageSetup', () => ({
  LanguageSetup: () => <div data-testid="language-setup">LanguageSetup</div>,
}));

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useGameStore as jest.Mock).mockReturnValue({
      phase: 'welcome',
    });
    (useT as jest.Mock).mockReturnValue({
      welcome: {
        title: 'Lunch Language',
      },
    });
  });

  describe('rendering', () => {
    it('should render without crashing', () => {
      render(<App />);
      expect(screen.getByTestId('language-setup')).toBeInTheDocument();
    });

    it('should render the LanguageSetup component', () => {
      render(<App />);
      expect(screen.getByTestId('language-setup')).toBeInTheDocument();
    });

    it('should render the LanguageSelector component', () => {
      render(<App />);
      expect(screen.getByTestId('language-selector')).toBeInTheDocument();
    });

    it('should apply the correct font family style', () => {
      const { container } = render(<App />);
      const divElement = container.querySelector('div');
      expect(divElement).toHaveStyle({
        fontFamily: "'Nunito', 'Comic Sans MS', 'Segoe UI', system-ui, sans-serif",
      });
    });
  });

  describe('phase rendering', () => {
    it('should render WelcomeScreen when phase is welcome', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });
      render(<App />);
      expect(screen.getByTestId('welcome-screen')).toBeInTheDocument();
    });

    it('should render MealSelector when phase is mealSelect', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'mealSelect' });
      render(<App />);
      expect(screen.getByTestId('meal-selector')).toBeInTheDocument();
    });

    it('should render FamilySelector when phase is familySelect', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'familySelect' });
      render(<App />);
      expect(screen.getByTestId('family-selector')).toBeInTheDocument();
    });

    it('should render Kitchen when phase is cooking', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'cooking' });
      render(<App />);
      expect(screen.getByTestId('kitchen')).toBeInTheDocument();
    });

    it('should render MealSplash when phase is mealSplash', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'mealSplash' });
      render(<App />);
      expect(screen.getByTestId('meal-splash')).toBeInTheDocument();
    });

    it('should render MathQuiz when phase is mathQuiz', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'mathQuiz' });
      render(<App />);
      expect(screen.getByTestId('math-quiz')).toBeInTheDocument();
    });

    it('should render CelebrationScreen when phase is celebration', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'celebration' });
      render(<App />);
      expect(screen.getByTestId('celebration-screen')).toBeInTheDocument();
    });

    it('should not render any phase-specific component for unknown phase', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'unknown' });
      render(<App />);
      expect(screen.queryByTestId('welcome-screen')).not.toBeInTheDocument();
      expect(screen.queryByTestId('meal-selector')).not.toBeInTheDocument();
      expect(screen.queryByTestId('family-selector')).not.toBeInTheDocument();
      expect(screen.queryByTestId('kitchen')).not.toBeInTheDocument();
      expect(screen.queryByTestId('meal-splash')).not.toBeInTheDocument();
      expect(screen.queryByTestId('math-quiz')).not.toBeInTheDocument();
      expect(screen.queryByTestId('celebration-screen')).not.toBeInTheDocument();
    });
  });

  describe('document title', () => {
    it('should set document title with translated welcome title and emoji', () => {
      (useT as jest.Mock).mockReturnValue({
        welcome: {
          title: 'Lunch Language',
        },
      });
      render(<App />);
      expect(document.title).toBe('Lunch Language 🍽️');
    });

    it('should update document title when translation changes', () => {
      const { rerender } = render(<App />);
      expect(document.title).toBe('Lunch Language 🍽️');

      (useT as jest.Mock).mockReturnValue({
        welcome: {
          title: 'Langue du Déjeuner',
        },
      });
      rerender(<App />);
      expect(document.title).toBe('Langue du Déjeuner 🍽️');
    });

    it('should include emoji in document title', () => {
      render(<App />);
      expect(document.title).toContain('🍽️');
    });

    it('should handle empty title string', () => {
      (useT as jest.Mock).mockReturnValue({
        welcome: {
          title: '',
        },
      });
      render(<App />);
      expect(document.title).toBe(' 🍽️');
    });

    it('should handle special characters in title', () => {
      (useT as jest.Mock).mockReturnValue({
        welcome: {
          title: 'Lunch & Language 中文',
        },
      });
      render(<App />);
      expect(document.title).toBe('Lunch & Language 中文 🍽️');
    });
  });

  describe('component integration', () => {
    it('should render all always-visible components together', () => {
      render(<App />);
      expect(screen.getByTestId('language-setup')).toBeInTheDocument();
      expect(screen.getByTestId('language-selector')).toBeInTheDocument();
      expect(screen.getByTestId('welcome-screen')).toBeInTheDocument();
    });

    it('should handle phase transitions', () => {
      const { rerender } = render(<App />);
      expect(screen.getByTestId('welcome-screen')).toBeInTheDocument();

      (useGameStore as jest.Mock).mockReturnValue({ phase: 'cooking' });
      rerender(<App />);
      expect(screen.getByTestId('kitchen')).toBeInTheDocument();
      expect(screen.queryByTestId('welcome-screen')).not.toBeInTheDocument();
    });

    it('should always render LanguageSetup and LanguageSelector regardless of phase', () => {
      const phases = [
        'welcome',
        'mealSelect',
        'familySelect',
        'cooking',
        'mealSplash',
        'mathQuiz',
        'celebration',
      ];

      phases.forEach((phase) => {
        (useGameStore as jest.Mock).mockReturnValue({ phase });
        const { unmount } = render(<App />);
        expect(screen.getByTestId('language-setup')).toBeInTheDocument();
        expect(screen.getByTestId('language-selector')).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('edge cases', () => {
    it('should handle null phase gracefully', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: null });
      const { container } = render(<App />);
      expect(container).toBeInTheDocument();
    });

    it('should handle undefined phase gracefully', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: undefined });
      const { container } = render(<App />);
      expect(container).toBeInTheDocument();
    });

    it('should handle missing welcome translation gracefully', () => {
      (useT as jest.Mock).mockReturnValue({
        welcome: {},
      });
      const { container } = render(<App />);
      expect(document.title).toBe('undefined 🍽️');
      expect(container).toBeInTheDocument();
    });

    it('should handle missing t object gracefully', () => {
      (useT as jest.Mock).mockReturnValue({});
      const { container } = render(<App />);
      expect(document.title).toContain('🍽️');
      expect(container).toBeInTheDocument();
    });
  });
});