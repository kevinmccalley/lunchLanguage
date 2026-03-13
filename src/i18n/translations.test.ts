// @ts-nocheck
import { TRANSLATIONS, LANGUAGE_OPTIONS } from './translations';
import type { Language } from './types';

describe('translations', () => {
  describe('TRANSLATIONS object', () => {
    it('should export TRANSLATIONS with all language keys', () => {
      expect(TRANSLATIONS).toHaveProperty('en-US');
      expect(TRANSLATIONS).toHaveProperty('en-GB');
      expect(TRANSLATIONS).toHaveProperty('es');
      expect(TRANSLATIONS).toHaveProperty('fr');
      expect(TRANSLATIONS).toHaveProperty('de');
      expect(TRANSLATIONS).toHaveProperty('ja');
      expect(TRANSLATIONS).toHaveProperty('zh');
      expect(TRANSLATIONS).toHaveProperty('pt');
      expect(TRANSLATIONS).toHaveProperty('pt-BR');
    });

    it('should have 9 language translations', () => {
      expect(Object.keys(TRANSLATIONS)).toHaveLength(9);
    });

    describe('each language translation structure', () => {
      const languages: Language[] = ['en-US', 'en-GB', 'es', 'fr', 'de', 'ja', 'zh', 'pt', 'pt-BR'];

      languages.forEach((lang) => {
        describe(`${lang}`, () => {
          const trans = TRANSLATIONS[lang];

          it('should have chef section', () => {
            expect(trans.chef).toBeDefined();
            expect(trans.chef.greeting).toBeTruthy();
          });

          it('should have welcome section with required fields', () => {
            expect(trans.welcome).toBeDefined();
            expect(trans.welcome.title).toBeTruthy();
            expect(trans.welcome.subtitle).toBeTruthy();
            expect(trans.welcome.startButton).toBeTruthy();
            expect(trans.welcome.mealBadges).toHaveLength(6);
            expect(trans.welcome.pickMessage).toBeTruthy();
          });

          it('should have mealSelect section', () => {
            expect(trans.mealSelect).toBeDefined();
            expect(trans.mealSelect.title).toBeTruthy();
            expect(trans.mealSelect.prompt).toBeTruthy();
          });

          it('should have meals section with all meal types', () => {
            expect(trans.meals).toBeDefined();
            expect(trans.meals.pizza).toBeDefined();
            expect(trans.meals.hamburger).toBeDefined();
            expect(trans.meals.burrito).toBeDefined();
            expect(trans.meals.salad).toBeDefined();
            expect(trans.meals.sushi).toBeDefined();
            expect(trans.meals.sandwich).toBeDefined();

            Object.values(trans.meals).forEach((meal) => {
              expect(meal.name).toBeTruthy();
              expect(meal.description).toBeTruthy();
              expect(meal.chefIntro).toBeTruthy();
            });
          });

          it('should have family section with functions', () => {
            expect(trans.family).toBeDefined();
            expect(trans.family.title).toBeTruthy();
            expect(trans.family.prompt).toBeTruthy();
            expect(trans.family.justMe).toBeTruthy();
            expect(trans.family.smallGroup).toBeTruthy();
            expect(trans.family.bigFamily).toBeTruthy();
            expect(trans.family.startButton).toBeTruthy();
            expect(typeof trans.family.singleMessage).toBe('function');
            expect(typeof trans.family.multiMessage).toBe('function');
          });

          it('should have kitchen section with functions', () => {
            expect(trans.kitchen).toBeDefined();
            expect(typeof trans.kitchen.myMeal).toBe('function');
            expect(typeof trans.kitchen.ingredients).toBe('function');
            expect(typeof trans.kitchen.forPeople).toBe('function');
            expect(typeof trans.kitchen.slices).toBe('function');
            expect(trans.kitchen.addHint).toBeTruthy();
            expect(trans.kitchen.doneButton).toBeTruthy();
            expect(trans.kitchen.doubleTapHint).toBeTruthy();
            expect(trans.kitchen.emptyWarning).toBeTruthy();
            expect(trans.kitchen.doneMessage).toBeTruthy();
            expect(trans.kitchen.back).toBeTruthy();
          });

          it('should have mathQuiz section', () => {
            expect(trans.mathQuiz).toBeDefined();
            expect(trans.mathQuiz.title).toBeTruthy();
            expect(typeof trans.mathQuiz.questionOf).toBe('function');
            expect(trans.mathQuiz.hintPrefix).toBeTruthy();
            expect(trans.mathQuiz.skipButton).toBeTruthy();
            expect(Array.isArray(trans.mathQuiz.correctMessages)).toBe(true);
            expect(trans.mathQuiz.correctMessages.length).toBeGreaterThan(0);
            expect(Array.isArray(trans.mathQuiz.wrongMessages)).toBe(true);
            expect(trans.mathQuiz.wrongMessages.length).toBeGreaterThan(0);
            expect(trans.mathQuiz.finalMessage).toBeTruthy();
            expect(trans.mathQuiz.nextMessage).toBeTruthy();
            expect(typeof trans.mathQuiz.skipReveal).toBe('function');
          });

          it('should have all mathQuiz question functions', () => {
            expect(typeof trans.mathQuiz.qTotal).toBe('function');
            expect(typeof trans.mathQuiz.qCountIngredient).toBe('function');
            expect(typeof trans.mathQuiz.qPerSlice).toBe('function');
            expect(typeof trans.mathQuiz.qHowManySlices).toBe('function');
            expect(typeof trans.mathQuiz.qFamilyMultiply).toBe('function');
            expect(typeof trans.mathQuiz.qTotalFamily).toBe('function');
            expect(typeof trans.mathQuiz.qUniqueTypes).toBe('function');
            expect(typeof trans.mathQuiz.qCompare).toBe('function');
            expect(typeof trans.mathQuiz.qCombined).toBe('function');
            expect(typeof trans.mathQuiz.qNotType).toBe('function');
            expect(typeof trans.mathQuiz.qIngCost).toBe('function');
            expect(typeof trans.mathQuiz.qMealCost).toBe('function');
            expect(typeof trans.mathQuiz.qFamilyCost).toBe('function');
            expect(typeof trans.mathQuiz.qChange).toBe('function');
          });

          it('should have all mathQuiz hint functions', () => {
            expect(typeof trans.mathQuiz.hTotal).toBe('function');
            expect(typeof trans.mathQuiz.hCountIngredient).toBe('function');
            expect(typeof trans.mathQuiz.hPerSlice).toBe('function');
            expect(typeof trans.mathQuiz.hHowManySlices).toBe('function');
            expect(typeof trans.mathQuiz.hFamilyMultiply).toBe('function');
            expect(typeof trans.mathQuiz.hTotalFamily).toBe('function');
            expect(typeof trans.mathQuiz.hUniqueTypes).toBe('function');
            expect(typeof trans.mathQuiz.hCompare).toBe('function');
            expect(typeof trans.mathQuiz.hCombined).toBe('function');
            expect(typeof trans.mathQuiz.hNotType).toBe('function');
            expect(typeof trans.mathQuiz.hIngCost).toBe('function');
            expect(typeof trans.mathQuiz.hMealCost).toBe('function');
            expect(typeof trans.mathQuiz.hFamilyCost).toBe('function');
            expect(typeof trans.mathQuiz.hChange).toBe('function');
          });

          it('should have score section', () => {
            expect(trans.score).toBeDefined();
            expect(trans.score.correct).toBeTruthy();
          });

          it('should have celebration section with functions', () => {
            expect(trans.celebration).toBeDefined();
            expect(trans.celebration.title).toBeTruthy();
            expect(typeof trans.celebration.subtitle).toBe('function');
            expect(trans.celebration.points).toBeTruthy();
            expect(trans.celebration.correct).toBeTruthy();
            expect(trans.celebration.ingredients).toBeTruthy();
            expect(trans.celebration.newMeal).toBeTruthy();
            expect(trans.celebration.playAgain).toBeTruthy();
          });

          it('should have ingredients section with all ingredient names', () => {
            expect(trans.ingredients).toBeDefined();
            expect(trans.ingredients.pepperoni).toBeTruthy();
            expect(trans.ingredients.cheese).toBeTruthy();
            expect(trans.ingredients.bacon).toBeTruthy();
            expect(trans.ingredients.sprouts).toBeTruthy();
          });

          it('should have at least 50 ingredients defined', () => {
            const ingredientCount = Object.keys(trans.ingredients).length;
            expect(ingredientCount).toBeGreaterThanOrEqual(50);
          });

          it('should have tooltip section with function', () => {
            expect(trans.tooltip).toBeDefined();
            expect(typeof trans.tooltip.isInLanguage).toBe('function');
          });

          it('should have langNames section', () => {
            expect(trans.langNames).toBeDefined();
            expect(trans.langNames['en-US']).toBeTruthy();
            expect(trans.langNames['en-GB']).toBeTruthy();
            expect(trans.langNames.es).toBeTruthy();
            expect(trans.langNames.fr).toBeTruthy();
            expect(trans.langNames.de).toBeTruthy();
            expect(trans.langNames.ja).toBeTruthy();
            expect(trans.langNames.zh).toBeTruthy();
            expect(trans.langNames.pt).toBeTruthy();
            expect(trans.langNames['pt-BR']).toBeTruthy();
          });

          it('should have splash section with functions', () => {
            expect(trans.splash).toBeDefined();
            expect(typeof trans.splash.heading).toBe('function');
            expect(trans.splash.tagline).toBeTruthy();
            expect(trans.splash.tapToContinue).toBeTruthy();
          });

          it('should have setup section', () => {
            expect(trans.setup).toBeDefined();
            expect(trans.setup.title).toBeTruthy();
            expect(trans.setup.nativePrompt).toBeTruthy();
            expect(trans.setup.learningPrompt).toBeTruthy();
            expect(trans.setup.skipLearning).toBeTruthy();
            expect(trans.setup.confirm).toBeTruthy();
            expect(trans.setup.speechLabel).toBeTruthy();
          });
        });
      });
    });

    describe('function outputs', () => {
      const enUSTranslations = TRANSLATIONS['en-US'];

      it('should generate correct singular/plural for ingredients function', () => {
        expect(enUSTranslations.kitchen.ingredients(1)).toContain('ingredient');
        expect(enUSTranslations.kitchen.ingredients(1)).not.toContain('ingredients');
        expect(enUSTranslations.kitchen.ingredients(2)).toContain('ingredients');
      });

      it('should generate correct singular/plural for people function', () => {
        expect(enUSTranslations.kitchen.forPeople(1)).toContain('person');
        expect(enUSTranslations.kitchen.forPeople(1)).not.toContain('people');
        expect(enUSTranslations.kitchen.forPeople(2)).toContain('people');
      });

      it('should generate correct slices output', () => {
        const result = enUSTranslations.kitchen.slices(5);
        expect(result).toContain('5');
        expect(result).toContain('slices');
      });

      it('should generate single meal message with meal name', () => {
        const result = enUSTranslations.family.singleMessage('Pizza');
        expect(result).toContain('Pizza');
      });

      it('should generate multi meal message with meal name and people count', () => {
        const result = enUSTranslations.family.multiMessage('Burger', 4);
        expect(result).toContain('Burger');
        expect(result).toContain('4');
      });

      it('should generate question of message', () => {
        const result = enUSTranslations.mathQuiz.questionOf(1, 10);
        expect(result).toContain('1');
        expect(result).toContain('10');
      });

      it('should generate skip reveal message', () => {
        const result = enUSTranslations.mathQuiz.skipReveal(42);
        expect(result).toContain('42');
      });

      it('should generate total question', () => {
        const result = enUSTranslations.mathQuiz.qTotal('Pizza');
        expect(result).toContain('Pizza');
      });

      it('should generate count ingredient question', () => {
        const result = enUSTranslations.mathQuiz.qCountIngredient('Pepperoni', '🌶️', 'Pizza');
        expect(result).toContain('Pepperoni');
        expect(result).toContain('🌶️');
        expect(result).toContain('Pizza');
      });

      it('should handle qCompare with proper singular/plural', () => {
        const result1 = enUSTranslations.mathQuiz.qCompare(1, '🌶️', 'Pepperoni', 2, '🧀', 'Cheese');
        expect(result1).toContain('Pepperoni');
        expect(result1).toContain('Cheese');
        expect(result1).not.toContain('Pepperonis');

        const result2 = enUSTranslations.mathQuiz.qCompare(5, '🌶️', 'Pepperoni', 2, '🧀', 'Cheese');
        expect(result2).toContain('Pepperonis');
      });

      it('should generate tooltip text', () => {
        const result = enUSTranslations.tooltip.isInLanguage('Pizza', 'Pizzà', 'Italian');
        expect(result).toContain('Pizza');
        expect(result).toContain('Pizzà');
        expect(result).toContain('Italian');
      });

      it('should generate splash heading', () => {
        const result = enUSTranslations.splash.heading('Burger');
        expect(result).toContain('Burger');
        expect(result).toContain('ready');
      });

      it('should generate celebration subtitle', () => {
        const result = enUSTranslations.celebration.subtitle('🍕', 'Pizza');
        expect(result).toContain('🍕');
        expect(result).toContain('Pizza');
      });
    });
  });

  describe('LANGUAGE_OPTIONS array', () => {
    it('should export LANGUAGE_OPTIONS array', () => {
      expect(Array.isArray(LANGUAGE_OPTIONS)).toBe(true);
    });

    it('should have 9 language options', () => {
      expect(LANGUAGE_OPTIONS).toHaveLength(9);
    });

    it('should have correct structure for each option', () => {
      LANGUAGE_OPTIONS.forEach((option) => {
        expect(option).toHaveProperty('code');
        expect(option).toHaveProperty('label');
        expect(option).toHaveProperty('countryCode');
        expect(typeof option.code).toBe('string');
        expect(typeof option.label).toBe('string');
        expect(typeof option.countryCode).toBe('string');
      });
    });

    it('should have all expected language codes', () => {
      const codes = LANGUAGE_OPTIONS.map((opt) => opt.code);
      expect(codes).toContain('en-US');
      expect(codes).toContain('en-GB');
      expect(codes).toContain('es');
      expect(codes).toContain('fr');
      expect(codes).toContain('de');
      expect(codes).toContain('pt');
      expect(codes).toContain('pt-BR');
      expect(codes).toContain('ja');
      expect(codes).toContain('zh');
    });

    it('should have non-empty labels for each option', () => {
      LANGUAGE_OPTIONS.forEach((option) => {
        expect(option.label.length).toBeGreaterThan(0);
      });
    });

    it('should have non-empty country codes for each option', () => {
      LANGUAGE_OPTIONS.forEach((option) => {
        expect(option.countryCode.length).toBeGreaterThan(0);
      });
    });

    it('should have unique codes', () => {
      const codes = LANGUAGE_OPTIONS.map((opt) => opt.code);
      const uniqueCodes = new Set(codes);
      expect(uniqueCodes.size).toBe(codes.length);
    });
  });

  describe('consistency across languages', () => {
    const languages = Object.keys(TRANSLATIONS) as Language[];
    const enUSKeys = Object.keys(TRANSLATIONS['en-US']);

    it('should have same top-level keys across all languages', () => {
      languages.forEach((lang) => {
        const langKeys = Object.keys(TRANSLATIONS[lang]);
        expect(langKeys.sort()).toEqual(enUSKeys.sort());
      });
    });

    it('should have same meal types across all languages', () => {
      languages.forEach((lang) => {
        const mealKeys = Object.keys(TRANSLATIONS[lang].meals);
        const enUSMealKeys = Object.keys(TRANSLATIONS['en-US'].meals);
        expect(mealKeys.sort()).toEqual(enUSMealKeys.sort());
      });
    });

    it('should have same ingredients across all languages', () => {
      const enUSIngredientKeys = Object.keys(TRANSLATIONS['en-US'].ingredients).sort();

      languages.forEach((lang) => {
        const langIngredientKeys = Object.keys(TRANSLATIONS[lang].ingredients).sort();
        expect(langIngredientKeys).toEqual(enUSIngredientKeys);
      });
    });

    it('should have same langNames across all languages', () => {
      const enUSLangNamesKeys = Object.keys(TRANSLATIONS['en-US'].langNames).sort();

      languages.forEach((lang) => {
        const langLangNamesKeys = Object.keys(TRANSLATIONS[lang].langNames).sort();
        expect(langLangNamesKeys).toEqual(enUSLangNamesKeys);
      });
    });
  });

  describe('language-specific variations', () => {
    it('enGB should differ from enUS in some messages', () => {
      const enUS = TRANSLATIONS['en-US'];
      const enGB = TRANSLATIONS['en-GB'];

      expect(enUS.mathQuiz.correctMessages).not.toEqual(enGB.mathQuiz.correctMessages);
      expect(enUS.meals.hamburger.chefIntro).not.toEqual(enGB.meals.hamburger.chefIntro);
    });

    it('Spanish translation should use appropriate pluralization', () => {
      const es = TRANSLATIONS['es'];
      const result1 = es.kitchen.ingredients(1);
      const result2 = es.kitchen.ingredients(3);

      expect(result1).not.toEqual(result2);
    });

    it('Japanese translation should use appropriate counters', () => {
      const ja = TRANSLATIONS['ja'];
      expect(ja.kitchen.ingredients(1)).toBeTruthy();
      expect(ja.kitchen.ingredients(5)).toBeTruthy();
    });

    it('German translation should have correct article usage', () => {
      const de = TRANSLATIONS['de'];
      const pizzaResult = de.kitchen.myMeal('Pizza');
      const salatResult = de.kitchen.myMeal('Salat');

      expect(pizzaResult).toBeTruthy();
      expect(salatResult).toBeTruthy();
    });
  });

  describe('edge cases and special characters', () => {
    it('should handle emoji in meal badges', () => {
      const languages = Object.keys(TRANSLATIONS) as Language[];
      languages.forEach((lang) => {
        const badges = TRANSLATIONS[lang].welcome.mealBadges;
        expect(Array.isArray(badges)).toBe(true);
        badges.forEach((badge) => {
          expect(badge).toMatch(/[\p{Emoji}]/u);
        });
      });
    });

    it('should handle special characters in ingredient names', () => {
      const allTranslations = Object.values(TRANSLATIONS);
      allTranslations.forEach((trans) => {
        Object.values(trans.ingredients).forEach((ingredient) => {
          expect(typeof ingredient).toBe('string');
          expect(ingredient.length).toBeGreaterThan(0);
        });
      });
    });

    it('should handle apostrophes and contractions', () => {
      const enUS = TRANSLATIONS['en-US'];
      expect(enUS.welcome.startButton).toContain("'");
      expect(enUS.kitchen.doneButton).toContain("'");
    });

    it('should handle mathematical symbols in hints', () => {
      const enUS = TRANSLATIONS['en-US'];
      expect(enUS.mathQuiz.hPerSlice(10, 2)).toContain('÷');
      expect(enUS.mathQuiz.hCompare(5, 3)).toContain('−');
    });
  });
});