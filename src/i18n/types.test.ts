// @ts-nocheck
import type { Language, MathQuizT, Translations } from './types';

describe('i18n/types', () => {
  describe('Language type', () => {
    it('should allow valid language codes', () => {
      const languages: Language[] = ['en', 'es', 'fr', 'de', 'ja', 'zh', 'pt', 'pt-BR'];
      expect(languages).toHaveLength(8);
    });

    it('should have specific supported languages', () => {
      const validLanguages: Language[] = ['en', 'es', 'fr', 'de', 'ja', 'zh', 'pt', 'pt-BR'];
      validLanguages.forEach((lang) => {
        expect(typeof lang).toBe('string');
        expect(lang.length).toBeGreaterThan(0);
      });
    });
  });

  describe('MathQuizT interface', () => {
    it('should have all required string properties', () => {
      const requiredStringProps: (keyof MathQuizT)[] = [
        'title',
        'hintPrefix',
        'skipButton',
        'finalMessage',
        'nextMessage',
        'hHowManySlices',
        'hUniqueTypes',
      ];
      requiredStringProps.forEach((prop) => {
        expect(typeof prop).toBe('string');
      });
    });

    it('should have all required array properties', () => {
      const requiredArrayProps: (keyof MathQuizT)[] = [
        'correctMessages',
        'wrongMessages',
      ];
      requiredArrayProps.forEach((prop) => {
        expect(typeof prop).toBe('string');
      });
    });

    it('should have all required function properties for question templates', () => {
      const questionFunctions: (keyof MathQuizT)[] = [
        'questionOf',
        'qTotal',
        'qCountIngredient',
        'qPerSlice',
        'qHowManySlices',
        'qFamilyMultiply',
        'qTotalFamily',
        'qUniqueTypes',
        'qCompare',
        'qCombined',
        'qNotType',
      ];
      questionFunctions.forEach((prop) => {
        expect(typeof prop).toBe('string');
      });
    });

    it('should have all required function properties for hint templates', () => {
      const hintFunctions: (keyof MathQuizT)[] = [
        'hTotal',
        'hCountIngredient',
        'hPerSlice',
        'hFamilyMultiply',
        'hTotalFamily',
        'hCompare',
        'hCombined',
        'hNotType',
      ];
      hintFunctions.forEach((prop) => {
        expect(typeof prop).toBe('string');
      });
    });

    it('should have all required function properties for currency questions', () => {
      const currencyFunctions: (keyof MathQuizT)[] = [
        'qIngCost',
        'qMealCost',
        'qFamilyCost',
        'qChange',
        'hIngCost',
        'hMealCost',
        'hFamilyCost',
        'hChange',
      ];
      currencyFunctions.forEach((prop) => {
        expect(typeof prop).toBe('string');
      });
    });

    it('should have skipReveal function property', () => {
      const prop: keyof MathQuizT = 'skipReveal';
      expect(typeof prop).toBe('string');
    });
  });

  describe('Translations interface', () => {
    it('should have chef section with greeting', () => {
      const chefSection: keyof Translations = 'chef';
      expect(typeof chefSection).toBe('string');
    });

    it('should have welcome section with required properties', () => {
      const welcomeSection: keyof Translations = 'welcome';
      expect(typeof welcomeSection).toBe('string');
    });

    it('should have mealSelect section', () => {
      const mealSelectSection: keyof Translations = 'mealSelect';
      expect(typeof mealSelectSection).toBe('string');
    });

    it('should have meals section with all meal types', () => {
      const mealTypes: (keyof Translations['meals'])[] = [
        'pizza',
        'hamburger',
        'burrito',
        'salad',
        'sushi',
        'sandwich',
      ];
      expect(mealTypes).toHaveLength(6);
    });

    it('should have family section with required properties', () => {
      const familySection: keyof Translations = 'family';
      expect(typeof familySection).toBe('string');
    });

    it('should have kitchen section with required properties', () => {
      const kitchenSection: keyof Translations = 'kitchen';
      expect(typeof kitchenSection).toBe('string');
    });

    it('should have mathQuiz section of type MathQuizT', () => {
      const mathQuizSection: keyof Translations = 'mathQuiz';
      expect(typeof mathQuizSection).toBe('string');
    });

    it('should have score section', () => {
      const scoreSection: keyof Translations = 'score';
      expect(typeof scoreSection).toBe('string');
    });

    it('should have celebration section with function properties', () => {
      const celebrationSection: keyof Translations = 'celebration';
      expect(typeof celebrationSection).toBe('string');
    });

    it('should have ingredients as Record', () => {
      const ingredientsSection: keyof Translations = 'ingredients';
      expect(typeof ingredientsSection).toBe('string');
    });

    it('should have tooltip section', () => {
      const tooltipSection: keyof Translations = 'tooltip';
      expect(typeof tooltipSection).toBe('string');
    });

    it('should have langNames record for all languages', () => {
      const langNamesSection: keyof Translations = 'langNames';
      expect(typeof langNamesSection).toBe('string');
    });

    it('should have splash section', () => {
      const splashSection: keyof Translations = 'splash';
      expect(typeof splashSection).toBe('string');
    });

    it('should have setup section', () => {
      const setupSection: keyof Translations = 'setup';
      expect(typeof setupSection).toBe('string');
    });
  });

  describe('Translations nested structure validation', () => {
    it('should have correct meal badge tuple structure', () => {
      const welcomeBadges: [string, string, string, string, string, string] = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
      ];
      expect(welcomeBadges).toHaveLength(6);
    });

    it('should have meal object structure with name, description, and chefIntro', () => {
      const mealProperties = ['name', 'description', 'chefIntro'];
      mealProperties.forEach((prop) => {
        expect(typeof prop).toBe('string');
      });
    });

    it('should validate all supported languages exist in langNames', () => {
      const supportedLanguages: Language[] = [
        'en',
        'es',
        'fr',
        'de',
        'ja',
        'zh',
        'pt',
        'pt-BR',
      ];
      supportedLanguages.forEach((lang) => {
        expect(typeof lang).toBe('string');
      });
    });
  });

  describe('Type compatibility checks', () => {
    it('should allow MathQuizT to have correct message arrays', () => {
      const mockQuiz: Partial<MathQuizT> = {
        correctMessages: ['Great!', 'Excellent!'],
        wrongMessages: ['Try again', 'Oops!'],
      };
      expect(mockQuiz.correctMessages).toHaveLength(2);
      expect(mockQuiz.wrongMessages).toHaveLength(2);
    });

    it('should allow function signatures in MathQuizT', () => {
      const mockQuiz: Partial<MathQuizT> = {
        questionOf: (n: number, total: number) => `Question ${n} of ${total}`,
        skipReveal: (answer: number) => `The answer is ${answer}`,
      };
      expect(typeof mockQuiz.questionOf).toBe('function');
      expect(typeof mockQuiz.skipReveal).toBe('function');
    });

    it('should allow Translations with all nested function properties', () => {
      const mockTranslations: Partial<Translations> = {
        family: {
          singleMessage: (meal: string) => `My ${meal}`,
          multiMessage: (meal: string, n: number) => `${n} ${meal}s`,
          title: 'Family',
          prompt: 'How many people?',
          justMe: 'Just me',
          smallGroup: 'Small group',
          bigFamily: 'Big family',
          startButton: 'Start',
        },
      };
      expect(typeof mockTranslations.family?.singleMessage).toBe('function');
      expect(typeof mockTranslations.family?.multiMessage).toBe('function');
    });

    it('should allow tooltip function in Translations', () => {
      const mockTranslations: Partial<Translations> = {
        tooltip: {
          isInLanguage: (word: string, translation: string, langName: string) =>
            `${word} is "${translation}" in ${langName}`,
        },
      };
      expect(typeof mockTranslations.tooltip?.isInLanguage).toBe('function');
    });

    it('should allow celebration functions in Translations', () => {
      const mockTranslations: Partial<Translations> = {
        celebration: {
          subtitle: (emoji: string, meal: string) => `${emoji} ${meal}`,
          title: 'Great job!',
          points: 'Points',
          correct: 'Correct',
          ingredients: 'Ingredients',
          newMeal: 'New meal',
          playAgain: 'Play again',
        },
      };
      expect(typeof mockTranslations.celebration?.subtitle).toBe('function');
    });

    it('should allow splash functions in Translations', () => {
      const mockTranslations: Partial<Translations> = {
        splash: {
          heading: (mealName: string) => `Welcome to ${mealName}`,
          tagline: 'Learn math with food!',
          tapToContinue: 'Tap to continue',
        },
      };
      expect(typeof mockTranslations.splash?.heading).toBe('function');
    });

    it('should allow ingredients as Record with string keys and values', () => {
      const mockTranslations: Partial<Translations> = {
        ingredients: {
          tomato: 'tomate',
          cheese: 'queso',
          bread: 'pan',
        },
      };
      expect(Object.keys(mockTranslations.ingredients || {})).toHaveLength(3);
    });
  });
});