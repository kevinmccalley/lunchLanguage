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
  const mockUseGameStore = useGameStore as jest.MockedFunction<typeof useGameStore>;
  const mockUseT = useT as jest.MockedFunction<typeof useT>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseT.mockReturnValue({
      welcome: {
        title: 'Lunch Language',
      },
    } as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('rendering', () => {
    it('should render the app with correct font family', () => {
      mockUseGameStore.mockReturnValue({ phase: 'welcome' } as any);
      const { container } = render(<App />);
      const appDiv = container.querySelector('div');
      expect(appDiv).toHaveStyle({
        fontFamily: "'Nunito', 'Comic Sans MS', 'Segoe UI', system-ui, sans-serif",
      });
    });

    it('should render LanguageSetup component', () => {
      mockUseGameStore.mockReturnValue({ phase: 'welcome' } as any);
      render(<App />);
      expect(screen.getByTestId('language-setup')).toBeInTheDocument();
    });

    it('should render LanguageSelector component', () => {
      mockUseGameStore.mockReturnValue({ phase: 'welcome' } as any);
      render(<App />);
      expect(screen.getByTestId('language-selector')).toBeInTheDocument();
    });
  });

  describe('phase rendering', () => {
    it('should render WelcomeScreen when phase is welcome', () => {
      mockUseGameStore.mockReturnValue({ phase: 'welcome' } as any);
      render(<App />);
      expect(screen.getByTestId('welcome-screen')).toBeInTheDocument();
    });

    it('should render MealSelector when phase is mealSelect', () => {
      mockUseGameStore.mockReturnValue({ phase: 'mealSelect' } as any);
      render(<App />);
      expect(screen.getByTestId('meal-selector')).toBeInTheDocument();
    });

    it('should render FamilySelector when phase is familySelect', () => {
      mockUseGameStore.mockReturnValue({ phase: 'familySelect' } as any);
      render(<App />);
      expect(screen.getByTestId('family-selector')).toBeInTheDocument();
    });

    it('should render Kitchen when phase is cooking', () => {
      mockUseGameStore.mockReturnValue({ phase: 'cooking' } as any);
      render(<App />);
      expect(screen.getByTestId('kitchen')).toBeInTheDocument();
    });

    it('should render MealSplash when phase is mealSplash', () => {
      mockUseGameStore.mockReturnValue({ phase: 'mealSplash' } as any);
      render(<App />);
      expect(screen.getByTestId('meal-splash')).toBeInTheDocument();
    });

    it('should render MathQuiz when phase is mathQuiz', () => {
      mockUseGameStore.mockReturnValue({ phase: 'mathQuiz' } as any);
      render(<App />);
      expect(screen.getByTestId('math-quiz')).toBeInTheDocument();
    });

    it('should render CelebrationScreen when phase is celebration', () => {
      mockUseGameStore.mockReturnValue({ phase: 'celebration' } as any);
      render(<App />);
      expect(screen.getByTestId('celebration-screen')).toBeInTheDocument();
    });

    it('should not render multiple phase screens at once', () => {
      mockUseGameStore.mockReturnValue({ phase: 'welcome' } as any);
      render(<App />);
      expect(screen.queryByTestId('meal-selector')).not.toBeInTheDocument();
      expect(screen.queryByTestId('kitchen')).not.toBeInTheDocument();
    });
  });

  describe('document title', () => {
    it('should set document title with translation and emoji', () => {
      mockUseGameStore.mockReturnValue({ phase: 'welcome' } as any);
      mockUseT.mockReturnValue({
        welcome: {
          title: 'Test Title',
        },
      } as any);
      render(<App />);
      expect(document.title).toBe('Test Title 🍽️');
    });

    it('should update document title when translation changes', () => {
      mockUseGameStore.mockReturnValue({ phase: 'welcome' } as any);
      mockUseT.mockReturnValue({
        welcome: {
          title: 'Initial Title',
        },
      } as any);
      const { rerender } = render(<App />);
      expect(document.title).toBe('Initial Title 🍽️');

      mockUseT.mockReturnValue({
        welcome: {
          title: 'Updated Title',
        },
      } as any);
      rerender(<App />);
      expect(document.title).toBe('Updated Title 🍽️');
    });

    it('should handle empty translation title', () => {
      mockUseGameStore.mockReturnValue({ phase: 'welcome' } as any);
      mockUseT.mockReturnValue({
        welcome: {
          title: '',
        },
      } as any);
      render(<App />);
      expect(document.title).toBe(' 🍽️');
    });

    it('should handle special characters in title', () => {
      mockUseGameStore.mockReturnValue({ phase: 'welcome' } as any);
      mockUseT.mockReturnValue({
        welcome: {
          title: 'Déjeuner Langue',
        },
      } as any);
      render(<App />);
      expect(document.title).toBe('Déjeuner Langue 🍽️');
    });
  });

  describe('phase transitions', () => {
    it('should transition from welcome to mealSelect phase', () => {
      mockUseGameStore.mockReturnValue({ phase: 'welcome' } as any);
      const { rerender } = render(<App />);
      expect(screen.getByTestId('welcome-screen')).toBeInTheDocument();

      mockUseGameStore.mockReturnValue({ phase: 'mealSelect' } as any);
      rerender(<App />);
      expect(screen.queryByTestId('welcome-screen')).not.toBeInTheDocument();
      expect(screen.getByTestId('meal-selector')).toBeInTheDocument();
    });

    it('should transition from mealSelect to familySelect phase', () => {
      mockUseGameStore.mockReturnValue({ phase: 'mealSelect' } as any);
      const { rerender } = render(<App />);
      expect(screen.getByTestId('meal-selector')).toBeInTheDocument();

      mockUseGameStore.mockReturnValue({ phase: 'familySelect' } as any);
      rerender(<App />);
      expect(screen.queryByTestId('meal-selector')).not.toBeInTheDocument();
      expect(screen.getByTestId('family-selector')).toBeInTheDocument();
    });

    it('should transition through all phases sequentially', () => {
      const phases: any[] = ['welcome', 'mealSelect', 'familySelect', 'cooking', 'mealSplash', 'mathQuiz', 'celebration'];
      const testIds = ['welcome-screen', 'meal-selector', 'family-selector', 'kitchen', 'meal-splash', 'math-quiz', 'celebration-screen'];

      mockUseGameStore.mockReturnValue({ phase: phases[0] } as any);
      const { rerender } = render(<App />);

      phases.forEach((phase, index) => {
        mockUseGameStore.mockReturnValue({ phase } as any);
        rerender(<App />);
        expect(screen.getByTestId(testIds[index])).toBeInTheDocument();
      });
    });
  });

  describe('edge cases', () => {
    it('should handle undefined phase gracefully', () => {
      mockUseGameStore.mockReturnValue({ phase: undefined } as any);
      const { container } = render(<App />);
      expect(container).toBeInTheDocument();
    });

    it('should handle null phase gracefully', () => {
      mockUseGameStore.mockReturnValue({ phase: null } as any);
      const { container } = render(<App />);
      expect(container).toBeInTheDocument();
    });

    it('should render with default props', () => {
      mockUseGameStore.mockReturnValue({ phase: 'welcome' } as any);
      const { container } = render(<App />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});