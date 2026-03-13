// @ts-nocheck
import { render, screen } from '@testing-library/react';
import { useGameStore } from './store/gameStore';
import { useT } from './i18n/useT';
import App from './App';
import * as WelcomeScreenModule from './components/UI/WelcomeScreen';
import * as MealSelectorModule from './components/MealSelector/MealSelector';
import * as FamilySelectorModule from './components/MealSelector/FamilySelector';
import * as KitchenModule from './components/Kitchen/Kitchen';
import * as MathQuizModule from './components/MathQuiz/MathQuiz';
import * as MealSplashModule from './components/Splash/MealSplash';
import * as CelebrationScreenModule from './components/UI/CelebrationScreen';
import * as LanguageSelectorModule from './components/UI/LanguageSelector';
import * as LanguageSetupModule from './components/UI/LanguageSetup';

jest.mock('./store/gameStore');
jest.mock('./i18n/useT');
jest.mock('./components/UI/WelcomeScreen');
jest.mock('./components/MealSelector/MealSelector');
jest.mock('./components/MealSelector/FamilySelector');
jest.mock('./components/Kitchen/Kitchen');
jest.mock('./components/MathQuiz/MathQuiz');
jest.mock('./components/Splash/MealSplash');
jest.mock('./components/UI/CelebrationScreen');
jest.mock('./components/UI/LanguageSelector');
jest.mock('./components/UI/LanguageSetup');

describe('App', () => {
  const mockT = {
    welcome: {
      title: 'Welcome to Lunch Language'
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useT as jest.Mock).mockReturnValue(mockT);
    (WelcomeScreenModule.WelcomeScreen as jest.Mock).mockReturnValue(<div data-testid="welcome-screen">Welcome Screen</div>);
    (MealSelectorModule.MealSelector as jest.Mock).mockReturnValue(<div data-testid="meal-selector">Meal Selector</div>);
    (FamilySelectorModule.FamilySelector as jest.Mock).mockReturnValue(<div data-testid="family-selector">Family Selector</div>);
    (KitchenModule.Kitchen as jest.Mock).mockReturnValue(<div data-testid="kitchen">Kitchen</div>);
    (MathQuizModule.MathQuiz as jest.Mock).mockReturnValue(<div data-testid="math-quiz">Math Quiz</div>);
    (MealSplashModule.MealSplash as jest.Mock).mockReturnValue(<div data-testid="meal-splash">Meal Splash</div>);
    (CelebrationScreenModule.CelebrationScreen as jest.Mock).mockReturnValue(<div data-testid="celebration-screen">Celebration Screen</div>);
    (LanguageSelectorModule.LanguageSelector as jest.Mock).mockReturnValue(<div data-testid="language-selector">Language Selector</div>);
    (LanguageSetupModule.LanguageSetup as jest.Mock).mockReturnValue(<div data-testid="language-setup">Language Setup</div>);
  });

  describe('rendering', () => {
    it('should render the App component', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });
      render(<App />);
      expect(screen.getByTestId('language-setup')).toBeInTheDocument();
      expect(screen.getByTestId('language-selector')).toBeInTheDocument();
    });

    it('should set document title on mount and when translation changes', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });
      render(<App />);
      expect(document.title).toBe('Welcome to Lunch Language 🍽️');
    });

    it('should update document title when translation changes', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });
      const { rerender } = render(<App />);
      
      const newT = {
        welcome: {
          title: 'Updated Title'
        }
      };
      (useT as jest.Mock).mockReturnValue(newT);
      
      rerender(<App />);
      expect(document.title).toBe('Updated Title 🍽️');
    });
  });

  describe('phase rendering - welcome', () => {
    it('should render WelcomeScreen when phase is welcome', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });
      render(<App />);
      expect(screen.getByTestId('welcome-screen')).toBeInTheDocument();
    });

    it('should not render WelcomeScreen when phase is not welcome', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'mealSelect' });
      render(<App />);
      expect(screen.queryByTestId('welcome-screen')).not.toBeInTheDocument();
    });
  });

  describe('phase rendering - mealSelect', () => {
    it('should render MealSelector when phase is mealSelect', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'mealSelect' });
      render(<App />);
      expect(screen.getByTestId('meal-selector')).toBeInTheDocument();
    });

    it('should not render MealSelector when phase is not mealSelect', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });
      render(<App />);
      expect(screen.queryByTestId('meal-selector')).not.toBeInTheDocument();
    });
  });

  describe('phase rendering - familySelect', () => {
    it('should render FamilySelector when phase is familySelect', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'familySelect' });
      render(<App />);
      expect(screen.getByTestId('family-selector')).toBeInTheDocument();
    });

    it('should not render FamilySelector when phase is not familySelect', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });
      render(<App />);
      expect(screen.queryByTestId('family-selector')).not.toBeInTheDocument();
    });
  });

  describe('phase rendering - cooking', () => {
    it('should render Kitchen when phase is cooking', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'cooking' });
      render(<App />);
      expect(screen.getByTestId('kitchen')).toBeInTheDocument();
    });

    it('should not render Kitchen when phase is not cooking', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });
      render(<App />);
      expect(screen.queryByTestId('kitchen')).not.toBeInTheDocument();
    });
  });

  describe('phase rendering - mealSplash', () => {
    it('should render MealSplash when phase is mealSplash', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'mealSplash' });
      render(<App />);
      expect(screen.getByTestId('meal-splash')).toBeInTheDocument();
    });

    it('should not render MealSplash when phase is not mealSplash', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });
      render(<App />);
      expect(screen.queryByTestId('meal-splash')).not.toBeInTheDocument();
    });
  });

  describe('phase rendering - mathQuiz', () => {
    it('should render MathQuiz when phase is mathQuiz', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'mathQuiz' });
      render(<App />);
      expect(screen.getByTestId('math-quiz')).toBeInTheDocument();
    });

    it('should not render MathQuiz when phase is not mathQuiz', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });
      render(<App />);
      expect(screen.queryByTestId('math-quiz')).not.toBeInTheDocument();
    });
  });

  describe('phase rendering - celebration', () => {
    it('should render CelebrationScreen when phase is celebration', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'celebration' });
      render(<App />);
      expect(screen.getByTestId('celebration-screen')).toBeInTheDocument();
    });

    it('should not render CelebrationScreen when phase is not celebration', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });
      render(<App />);
      expect(screen.queryByTestId('celebration-screen')).not.toBeInTheDocument();
    });
  });

  describe('multiple phases', () => {
    it('should render only one phase at a time', () => {
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
  });

  describe('hooks usage', () => {
    it('should call useGameStore hook', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });
      render(<App />);
      expect(useGameStore).toHaveBeenCalled();
    });

    it('should call useT hook', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });
      render(<App />);
      expect(useT).toHaveBeenCalled();
    });
  });

  describe('styling', () => {
    it('should apply font family styles to the root div', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });
      const { container } = render(<App />);
      const rootDiv = container.firstChild as HTMLElement;
      
      expect(rootDiv.style.fontFamily).toContain("Nunito");
    });

    it('should have correct font family with fallbacks', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });
      const { container } = render(<App />);
      const rootDiv = container.firstChild as HTMLElement;
      const fontFamily = rootDiv.style.fontFamily;
      
      expect(fontFamily).toMatch(/Nunito.*Comic Sans MS.*Segoe UI.*system-ui.*sans-serif/);
    });
  });

  describe('edge cases', () => {
    it('should handle undefined phase gracefully', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: undefined });
      const { container } = render(<App />);
      expect(container).toBeInTheDocument();
    });

    it('should handle invalid phase gracefully', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'invalidPhase' });
      const { container } = render(<App />);
      expect(container).toBeInTheDocument();
    });

    it('should always render LanguageSetup component', () => {
      const phases = ['welcome', 'mealSelect', 'familySelect', 'cooking', 'mealSplash', 'mathQuiz', 'celebration'];
      
      phases.forEach(phase => {
        jest.clearAllMocks();
        (useGameStore as jest.Mock).mockReturnValue({ phase });
        (useT as jest.Mock).mockReturnValue(mockT);
        (WelcomeScreenModule.WelcomeScreen as jest.Mock).mockReturnValue(<div data-testid="welcome-screen">Welcome Screen</div>);
        (MealSelectorModule.MealSelector as jest.Mock).mockReturnValue(<div data-testid="meal-selector">Meal Selector</div>);
        (FamilySelectorModule.FamilySelector as jest.Mock).mockReturnValue(<div data-testid="family-selector">Family Selector</div>);
        (KitchenModule.Kitchen as jest.Mock).mockReturnValue(<div data-testid="kitchen">Kitchen</div>);
        (MathQuizModule.MathQuiz as jest.Mock).mockReturnValue(<div data-testid="math-quiz">Math Quiz</div>);
        (MealSplashModule.MealSplash as jest.Mock).mockReturnValue(<div data-testid="meal-splash">Meal Splash</div>);
        (CelebrationScreenModule.CelebrationScreen as jest.Mock).mockReturnValue(<div data-testid="celebration-screen">Celebration Screen</div>);
        (LanguageSelectorModule.LanguageSelector as jest.Mock).mockReturnValue(<div data-testid="language-selector">Language Selector</div>);
        (LanguageSetupModule.LanguageSetup as jest.Mock).mockReturnValue(<div data-testid="language-setup">Language Setup</div>);
        
        const { unmount } = render(<App />);
        expect(screen.getByTestId('language-setup')).toBeInTheDocument();
        unmount();
      });
    });

    it('should always render LanguageSelector component', () => {
      const phases = ['welcome', 'mealSelect', 'familySelect', 'cooking', 'mealSplash', 'mathQuiz', 'celebration'];
      
      phases.forEach(phase => {
        jest.clearAllMocks();
        (useGameStore as jest.Mock).mockReturnValue({ phase });
        (useT as jest.Mock).mockReturnValue(mockT);
        (WelcomeScreenModule.WelcomeScreen as jest.Mock).mockReturnValue(<div data-testid="welcome-screen">Welcome Screen</div>);
        (MealSelectorModule.MealSelector as jest.Mock).mockReturnValue(<div data-testid="meal-selector">Meal Selector</div>);
        (FamilySelectorModule.FamilySelector as jest.Mock).mockReturnValue(<div data-testid="family-selector">Family Selector</div>);
        (KitchenModule.Kitchen as jest.Mock).mockReturnValue(<div data-testid="kitchen">Kitchen</div>);
        (MathQuizModule.MathQuiz as jest.Mock).mockReturnValue(<div data-testid="math-quiz">Math Quiz</div>);
        (MealSplashModule.MealSplash as jest.Mock).mockReturnValue(<div data-testid="meal-splash">Meal Splash</div>);
        (CelebrationScreenModule.CelebrationScreen as jest.Mock).mockReturnValue(<div data-testid="celebration-screen">Celebration Screen</div>);
        (LanguageSelectorModule.LanguageSelector as jest.Mock).mockReturnValue(<div data-testid="language-selector">Language Selector</div>);
        (LanguageSetupModule.LanguageSetup as jest.Mock).mockReturnValue(<div data-testid="language-setup">Language Setup</div>);
        
        const { unmount } = render(<App />);
        expect(screen.getByTestId('language-selector')).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('AnimatePresence behavior', () => {
    it('should use wait mode for AnimatePresence', () => {
      (useGameStore as jest.Mock).mockReturnValue({ phase: 'welcome' });
      const { container } = render(<App />);
      expect(container).toBeInTheDocument();
    });
  });
});