// @ts-nocheck
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { useGameStore } from './store/gameStore';
import { useT } from './i18n/useT';
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
  const mockUseGameStore = useGameStore as jest.MockedFunction<typeof useGameStore>;
  const mockUseT = useT as jest.MockedFunction<typeof useT>;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup default mocks
    mockUseT.mockReturnValue({
      welcome: { title: 'Welcome' },
    } as ReturnType<typeof useT>);

    // Mock all component modules
    jest.spyOn(WelcomeScreenModule, 'WelcomeScreen').mockReturnValue(
      <div data-testid="welcome-screen">Welcome Screen</div>
    );
    jest.spyOn(MealSelectorModule, 'MealSelector').mockReturnValue(
      <div data-testid="meal-selector">Meal Selector</div>
    );
    jest.spyOn(FamilySelectorModule, 'FamilySelector').mockReturnValue(
      <div data-testid="family-selector">Family Selector</div>
    );
    jest.spyOn(KitchenModule, 'Kitchen').mockReturnValue(
      <div data-testid="kitchen">Kitchen</div>
    );
    jest.spyOn(MealSplashModule, 'MealSplash').mockReturnValue(
      <div data-testid="meal-splash">Meal Splash</div>
    );
    jest.spyOn(MathQuizModule, 'MathQuiz').mockReturnValue(
      <div data-testid="math-quiz">Math Quiz</div>
    );
    jest.spyOn(CelebrationScreenModule, 'CelebrationScreen').mockReturnValue(
      <div data-testid="celebration-screen">Celebration Screen</div>
    );
    jest.spyOn(LanguageSelectorModule, 'LanguageSelector').mockReturnValue(
      <div data-testid="language-selector">Language Selector</div>
    );
    jest.spyOn(LanguageSetupModule, 'LanguageSetup').mockReturnValue(
      <div data-testid="language-setup">Language Setup</div>
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('rendering', () => {
    it('should render the App component', () => {
      mockUseGameStore.mockReturnValue({ phase: 'welcome' } as ReturnType<typeof useGameStore>);
      render(<App />);
      expect(screen.getByTestId('welcome-screen')).toBeInTheDocument();
    });

    it('should always render LanguageSetup component', () => {
      mockUseGameStore.mockReturnValue({ phase: 'welcome' } as ReturnType<typeof useGameStore>);
      render(<App />);
      expect(screen.getByTestId('language-setup')).toBeInTheDocument();
    });

    it('should always render LanguageSelector component', () => {
      mockUseGameStore.mockReturnValue({ phase: 'welcome' } as ReturnType<typeof useGameStore>);
      render(<App />);
      expect(screen.getByTestId('language-selector')).toBeInTheDocument();
    });
  });

  describe('phase-based rendering', () => {
    it('should render WelcomeScreen when phase is welcome', () => {
      mockUseGameStore.mockReturnValue({ phase: 'welcome' } as ReturnType<typeof useGameStore>);
      render(<App />);
      expect(screen.getByTestId('welcome-screen')).toBeInTheDocument();
    });

    it('should render MealSelector when phase is mealSelect', () => {
      mockUseGameStore.mockReturnValue({ phase: 'mealSelect' } as ReturnType<typeof useGameStore>);
      render(<App />);
      expect(screen.getByTestId('meal-selector')).toBeInTheDocument();
    });

    it('should render FamilySelector when phase is familySelect', () => {
      mockUseGameStore.mockReturnValue({ phase: 'familySelect' } as ReturnType<typeof useGameStore>);
      render(<App />);
      expect(screen.getByTestId('family-selector')).toBeInTheDocument();
    });

    it('should render Kitchen when phase is cooking', () => {
      mockUseGameStore.mockReturnValue({ phase: 'cooking' } as ReturnType<typeof useGameStore>);
      render(<App />);
      expect(screen.getByTestId('kitchen')).toBeInTheDocument();
    });

    it('should render MealSplash when phase is mealSplash', () => {
      mockUseGameStore.mockReturnValue({ phase: 'mealSplash' } as ReturnType<typeof useGameStore>);
      render(<App />);
      expect(screen.getByTestId('meal-splash')).toBeInTheDocument();
    });

    it('should render MathQuiz when phase is mathQuiz', () => {
      mockUseGameStore.mockReturnValue({ phase: 'mathQuiz' } as ReturnType<typeof useGameStore>);
      render(<App />);
      expect(screen.getByTestId('math-quiz')).toBeInTheDocument();
    });

    it('should render CelebrationScreen when phase is celebration', () => {
      mockUseGameStore.mockReturnValue({ phase: 'celebration' } as ReturnType<typeof useGameStore>);
      render(<App />);
      expect(screen.getByTestId('celebration-screen')).toBeInTheDocument();
    });
  });

  describe('phase transitions', () => {
    it('should not render multiple screens simultaneously', () => {
      mockUseGameStore.mockReturnValue({ phase: 'welcome' } as ReturnType<typeof useGameStore>);
      const { rerender } = render(<App />);
      expect(screen.getByTestId('welcome-screen')).toBeInTheDocument();
      expect(screen.queryByTestId('meal-selector')).not.toBeInTheDocument();

      mockUseGameStore.mockReturnValue({ phase: 'mealSelect' } as ReturnType<typeof useGameStore>);
      rerender(<App />);
      expect(screen.getByTestId('meal-selector')).toBeInTheDocument();
      expect(screen.queryByTestId('welcome-screen')).not.toBeInTheDocument();
    });

    it('should handle phase changes from welcome to mealSelect', () => {
      mockUseGameStore.mockReturnValue({ phase: 'welcome' } as ReturnType<typeof useGameStore>);
      const { rerender } = render(<App />);
      mockUseGameStore.mockReturnValue({ phase: 'mealSelect' } as ReturnType<typeof useGameStore>);
      rerender(<App />);
      expect(screen.getByTestId('meal-selector')).toBeInTheDocument();
    });

    it('should handle phase changes from mealSelect to familySelect', () => {
      mockUseGameStore.mockReturnValue({ phase: 'mealSelect' } as ReturnType<typeof useGameStore>);
      const { rerender } = render(<App />);
      mockUseGameStore.mockReturnValue({ phase: 'familySelect' } as ReturnType<typeof useGameStore>);
      rerender(<App />);
      expect(screen.getByTestId('family-selector')).toBeInTheDocument();
    });

    it('should handle phase changes from familySelect to cooking', () => {
      mockUseGameStore.mockReturnValue({ phase: 'familySelect' } as ReturnType<typeof useGameStore>);
      const { rerender } = render(<App />);
      mockUseGameStore.mockReturnValue({ phase: 'cooking' } as ReturnType<typeof useGameStore>);
      rerender(<App />);
      expect(screen.getByTestId('kitchen')).toBeInTheDocument();
    });

    it('should handle phase changes from cooking to mealSplash', () => {
      mockUseGameStore.mockReturnValue({ phase: 'cooking' } as ReturnType<typeof useGameStore>);
      const { rerender } = render(<App />);
      mockUseGameStore.mockReturnValue({ phase: 'mealSplash' } as ReturnType<typeof useGameStore>);
      rerender(<App />);
      expect(screen.getByTestId('meal-splash')).toBeInTheDocument();
    });

    it('should handle phase changes from mealSplash to mathQuiz', () => {
      mockUseGameStore.mockReturnValue({ phase: 'mealSplash' } as ReturnType<typeof useGameStore>);
      const { rerender } = render(<App />);
      mockUseGameStore.mockReturnValue({ phase: 'mathQuiz' } as ReturnType<typeof useGameStore>);
      rerender(<App />);
      expect(screen.getByTestId('math-quiz')).toBeInTheDocument();
    });

    it('should handle phase changes from mathQuiz to celebration', () => {
      mockUseGameStore.mockReturnValue({ phase: 'mathQuiz' } as ReturnType<typeof useGameStore>);
      const { rerender } = render(<App />);
      mockUseGameStore.mockReturnValue({ phase: 'celebration' } as ReturnType<typeof useGameStore>);
      rerender(<App />);
      expect(screen.getByTestId('celebration-screen')).toBeInTheDocument();
    });

    it('should handle phase changes from celebration back to welcome', () => {
      mockUseGameStore.mockReturnValue({ phase: 'celebration' } as ReturnType<typeof useGameStore>);
      const { rerender } = render(<App />);
      mockUseGameStore.mockReturnValue({ phase: 'welcome' } as ReturnType<typeof useGameStore>);
      rerender(<App />);
      expect(screen.getByTestId('welcome-screen')).toBeInTheDocument();
    });
  });

  describe('document title', () => {
    it('should set document title with welcome title from useT', () => {
      mockUseGameStore.mockReturnValue({ phase: 'welcome' } as ReturnType<typeof useGameStore>);
      mockUseT.mockReturnValue({
        welcome: { title: 'Lunch Language' },
      } as ReturnType<typeof useT>);

      render(<App />);

      waitFor(() => {
        expect(document.title).toBe('Lunch Language 🍽️');
      });
    });

    it('should update document title when useT changes', () => {
      mockUseGameStore.mockReturnValue({ phase: 'welcome' } as ReturnType<typeof useGameStore>);
      mockUseT.mockReturnValue({
        welcome: { title: 'Welcome' },
      } as ReturnType<typeof useT>);

      const { rerender } = render(<App />);

      mockUseT.mockReturnValue({
        welcome: { title: 'Bienvenue' },
      } as ReturnType<typeof useT>);

      rerender(<App />);

      waitFor(() => {
        expect(document.title).toBe('Bienvenue 🍽️');
      });
    });

    it('should include emoji in document title', () => {
      mockUseGameStore.mockReturnValue({ phase: 'welcome' } as ReturnType<typeof useGameStore>);
      mockUseT.mockReturnValue({
        welcome: { title: 'Test Title' },
      } as ReturnType<typeof useT>);

      render(<App />);

      waitFor(() => {
        expect(document.title).toContain('🍽️');
      });
    });
  });

  describe('styling', () => {
    it('should apply correct font-family style to root div', () => {
      mockUseGameStore.mockReturnValue({ phase: 'welcome' } as ReturnType<typeof useGameStore>);
      render(<App />);

      const rootDiv = screen.getByTestId('welcome-screen').parentElement;
      expect(rootDiv).toHaveStyle({
        fontFamily: "'Nunito', 'Comic Sans MS', 'Segoe UI', system-ui, sans-serif",
      });
    });
  });

  describe('edge cases', () => {
    it('should handle undefined phase gracefully', () => {
      mockUseGameStore.mockReturnValue({ phase: undefined } as unknown as ReturnType<typeof useGameStore>);
      render(<App />);
      // Should render LanguageSetup and LanguageSelector but no screen content
      expect(screen.getByTestId('language-setup')).toBeInTheDocument();
      expect(screen.getByTestId('language-selector')).toBeInTheDocument();
    });

    it('should render with empty translation object', () => {
      mockUseGameStore.mockReturnValue({ phase: 'welcome' } as ReturnType<typeof useGameStore>);
      mockUseT.mockReturnValue({
        welcome: { title: '' },
      } as ReturnType<typeof useT>);

      render(<App />);
      expect(document.title).toBe(' 🍽️');
    });

    it('should handle rapid phase changes', () => {
      mockUseGameStore.mockReturnValue({ phase: 'welcome' } as ReturnType<typeof useGameStore>);
      const { rerender } = render(<App />);

      const phases = ['mealSelect', 'familySelect', 'cooking', 'mealSplash', 'mathQuiz', 'celebration'];

      phases.forEach((phase) => {
        mockUseGameStore.mockReturnValue({ phase } as ReturnType<typeof useGameStore>);
        rerender(<App />);
      });

      expect(screen.getByTestId('celebration-screen')).toBeInTheDocument();
    });
  });
});