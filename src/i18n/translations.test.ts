// @ts-nocheck
import type { Language, Translations } from './types';
import { TRANSLATIONS, LANGUAGE_OPTIONS } from './translations';

describe('translations', () => {
  describe('TRANSLATIONS object', () => {
    it('should contain all required language codes', () => {
      expect(TRANSLATIONS).toHaveProperty('en');
      expect(TRANSLATIONS).toHaveProperty('es');
      expect(TRANSLATIONS).toHaveProperty('fr');
      expect(TRANSLATIONS).toHaveProperty('de');
      expect(TRANSLATIONS).toHaveProperty('ja');
      expect(TRANSLATIONS).toHaveProperty('zh');
      expect(TRANSLATIONS).toHaveProperty('pt');
      expect(TRANSLATIONS).toHaveProperty('pt-BR');
    });

    it('should have 8 language translations', () => {
      expect(Object.keys(TRANSLATIONS).length).toBe(8);
    });
  });

  describe('LANGUAGE_OPTIONS array', () => {
    it('should contain 8 language options', () => {
      expect(LANGUAGE_OPTIONS.length).toBe(8);
    });

    it('should have all required properties for each language option', () => {
      LANGUAGE_OPTIONS.forEach((option) => {
        expect(option).toHaveProperty('code');
        expect(option).toHaveProperty('label');
        expect(option).toHaveProperty('countryCode');
      });
    });

    it('should have valid language codes', () => {
      const validCodes = ['en', 'es', 'fr', 'de', 'pt', 'pt-BR', 'ja', 'zh'];
      LANGUAGE_OPTIONS.forEach((option) => {
        expect(validCodes).toContain(option.code);
      });
    });

    it('should have non-empty labels', () => {
      LANGUAGE_OPTIONS.forEach((option) => {
        expect(option.label.length).toBeGreaterThan(0);
      });
    });

    it('should have non-empty country codes', () => {
      LANGUAGE_OPTIONS.forEach((option) => {
        expect(option.countryCode.length).toBeGreaterThan(0);
      });
    });
  });

  describe('English translations', () => {
    const en = TRANSLATIONS.en;

    it('should have chef section with greeting', () => {
      expect(en.chef.greeting).toBeDefined();
      expect(typeof en.chef.greeting).toBe('string');
    });

    it('should have welcome section with all required fields', () => {
      expect(en.welcome.title).toBeDefined();
      expect(en.welcome.subtitle).toBeDefined();
      expect(en.welcome.startButton).toBeDefined();
      expect(en.welcome.mealBadges).toBeDefined();
      expect(Array.isArray(en.welcome.mealBadges)).toBe(true);
      expect(en.welcome.mealBadges.length).toBe(6);
      expect(en.welcome.pickMessage).toBeDefined();
    });

    it('should have mealSelect section', () => {
      expect(en.mealSelect.title).toBeDefined();
      expect(en.mealSelect.prompt).toBeDefined();
    });

    it('should have all meal types in meals section', () => {
      expect(en.meals.pizza).toBeDefined();
      expect(en.meals.hamburger).toBeDefined();
      expect(en.meals.burrito).toBeDefined();
      expect(en.meals.salad).toBeDefined();
      expect(en.meals.sushi).toBeDefined();
      expect(en.meals.sandwich).toBeDefined();
    });

    it('should have correct meal structure', () => {
      const mealKeys = Object.keys(en.meals);
      mealKeys.forEach((mealKey) => {
        const meal = en.meals[mealKey as keyof typeof en.meals];
        expect(meal.name).toBeDefined();
        expect(meal.description).toBeDefined();
        expect(meal.chefIntro).toBeDefined();
      });
    });

    it('should have family section with callable functions', () => {
      expect(en.family.title).toBeDefined();
      expect(en.family.prompt).toBeDefined();
      expect(typeof en.family.singleMessage).toBe('function');
      expect(typeof en.family.multiMessage).toBe('function');

      const singleMsg = en.family.singleMessage('Pizza');
      expect(typeof singleMsg).toBe('string');
      expect(singleMsg).toContain('Pizza');

      const multiMsg = en.family.multiMessage('Pizza', 4);
      expect(typeof multiMsg).toBe('string');
      expect(multiMsg).toContain('4');
    });

    it('should have kitchen section with callable functions', () => {
      expect(en.kitchen.myMeal('Pizza')).toContain('Pizza');
      expect(en.kitchen.ingredients(1)).toContain('ingredient');
      expect(en.kitchen.ingredients(3)).toContain('ingredients');
      expect(en.kitchen.forPeople(1)).toContain('person');
      expect(en.kitchen.forPeople(2)).toContain('people');
      expect(en.kitchen.slices(5)).toContain('5');
    });

    it('should have mathQuiz section with all required properties', () => {
      expect(en.mathQuiz.title).toBeDefined();
      expect(typeof en.mathQuiz.questionOf).toBe('function');
      expect(typeof en.mathQuiz.hintPrefix).toBe('string');
      expect(en.mathQuiz.correctMessages).toBeDefined();
      expect(Array.isArray(en.mathQuiz.correctMessages)).toBe(true);
      expect(en.mathQuiz.correctMessages.length).toBeGreaterThan(0);
      expect(en.mathQuiz.wrongMessages).toBeDefined();
      expect(Array.isArray(en.mathQuiz.wrongMessages)).toBe(true);
    });

    it('should have mathQuiz question functions that work correctly', () => {
      expect(en.mathQuiz.qTotal('Pizza')).toContain('Pizza');
      expect(en.mathQuiz.qCountIngredient('cheese', '🧀', 'Pizza')).toContain('cheese');
      expect(en.mathQuiz.hPerSlice(12, 4)).toContain('12');
      expect(en.mathQuiz.hPerSlice(12, 4)).toContain('4');
      expect(en.mathQuiz.qFamilyMultiply(4, 3, '🧀', 'cheese')).toContain('4');
      expect(en.mathQuiz.qFamilyMultiply(4, 3, '🧀', 'cheese')).toContain('3');
    });

    it('should have score section', () => {
      expect(en.score.correct).toBeDefined();
      expect(typeof en.score.correct).toBe('string');
    });

    it('should have celebration section with callable functions', () => {
      expect(en.celebration.title).toBeDefined();
      expect(typeof en.celebration.subtitle).toBe('function');
      expect(en.celebration.subtitle('🍕', 'Pizza')).toContain('Pizza');
      expect(en.celebration.subtitle('🍕', 'Pizza')).toContain('🍕');
    });

    it('should have ingredients section with all defined', () => {
      expect(en.ingredients.pepperoni).toBeDefined();
      expect(en.ingredients.cheese).toBeDefined();
      expect(en.ingredients.tomato_slice).toBeDefined();
    });

    it('should have tooltip section', () => {
      expect(typeof en.tooltip.isInLanguage).toBe('function');
      const tooltip = en.tooltip.isInLanguage('hello', 'hola', 'Spanish');
      expect(tooltip).toContain('hello');
      expect(tooltip).toContain('hola');
      expect(tooltip).toContain('Spanish');
    });

    it('should have langNames section', () => {
      expect(en.langNames.en).toBeDefined();
      expect(en.langNames.es).toBeDefined();
      expect(en.langNames.fr).toBeDefined();
      expect(en.langNames.de).toBeDefined();
      expect(en.langNames.ja).toBeDefined();
      expect(en.langNames.zh).toBeDefined();
      expect(en.langNames.pt).toBeDefined();
      expect(en.langNames['pt-BR']).toBeDefined();
    });

    it('should have splash section with callable functions', () => {
      expect(typeof en.splash.heading).toBe('function');
      expect(en.splash.heading('Pizza')).toContain('Pizza');
      expect(en.splash.tagline).toBeDefined();
      expect(en.splash.tapToContinue).toBeDefined();
    });

    it('should have setup section', () => {
      expect(en.setup.title).toBeDefined();
      expect(en.setup.nativePrompt).toBeDefined();
      expect(en.setup.learningPrompt).toBeDefined();
      expect(en.setup.skipLearning).toBeDefined();
      expect(en.setup.confirm).toBeDefined();
      expect(en.setup.speechLabel).toBeDefined();
    });
  });

  describe('Spanish translations', () => {
    const es = TRANSLATIONS.es;

    it('should have all required sections', () => {
      expect(es.chef).toBeDefined();
      expect(es.welcome).toBeDefined();
      expect(es.meals).toBeDefined();
      expect(es.family).toBeDefined();
      expect(es.kitchen).toBeDefined();
      expect(es.mathQuiz).toBeDefined();
      expect(es.celebration).toBeDefined();
    });

    it('should have family message functions', () => {
      expect(typeof es.family.singleMessage).toBe('function');
      expect(typeof es.family.multiMessage).toBe('function');
      const msg = es.family.singleMessage('Pizza');
      expect(typeof msg).toBe('string');
    });
  });

  describe('French translations', () => {
    const fr = TRANSLATIONS.fr;

    it('should have all required sections', () => {
      expect(fr.chef).toBeDefined();
      expect(fr.welcome).toBeDefined();
      expect(fr.meals).toBeDefined();
      expect(fr.mathQuiz).toBeDefined();
    });

    it('should have proper function implementations', () => {
      expect(typeof fr.mathQuiz.qTotal).toBe('function');
      expect(fr.mathQuiz.qTotal('Pizza')).toContain('Pizza');
    });
  });

  describe('German translations', () => {
    const de = TRANSLATIONS.de;

    it('should have all required sections', () => {
      expect(de.chef).toBeDefined();
      expect(de.welcome).toBeDefined();
      expect(de.kitchen).toBeDefined();
    });

    it('should handle German meal names correctly', () => {
      const msg = de.family.singleMessage('Pizza', 1);
      expect(typeof msg).toBe('string');
    });
  });

  describe('Japanese translations', () => {
    const ja = TRANSLATIONS.ja;

    it('should have all required sections in Japanese', () => {
      expect(ja.chef.greeting).toBeDefined();
      expect(ja.welcome.title).toContain('ランチ');
    });

    it('should have Japanese specific meal names', () => {
      expect(ja.meals.pizza.name).toBe('ピザ');
      expect(ja.meals.hamburger.name).toBe('ハンバーガー');
      expect(ja.meals.sushi.name).toBe('寿司');
    });
  });

  describe('Chinese Simplified translations', () => {
    const zh = TRANSLATIONS.zh;

    it('should have all required sections in Chinese', () => {
      expect(zh.chef.greeting).toBeDefined();
      expect(zh.welcome.title).toBe('午餐语言');
    });

    it('should have Chinese meal names', () => {
      expect(zh.meals.pizza.name).toBe('披萨');
      expect(zh.meals.sushi.name).toBe('寿司');
    });
  });

  describe('Portuguese (Portugal) translations', () => {
    const pt = TRANSLATIONS.pt;

    it('should have all required sections', () => {
      expect(pt.chef).toBeDefined();
      expect(pt.welcome).toBeDefined();
      expect(pt.meals).toBeDefined();
    });

    it('should have Portuguese Portugal specific terms', () => {
      expect(pt.welcome.mealBadges).toContain('🥪 Sandes');
    });
  });

  describe('Portuguese (Brazil) translations', () => {
    const ptBR = TRANSLATIONS['pt-BR'];

    it('should have all required sections', () => {
      expect(ptBR.chef).toBeDefined();
      expect(ptBR.welcome).toBeDefined();
      expect(ptBR.meals).toBeDefined();
    });

    it('should have Portuguese Brazil specific terms', () => {
      expect(ptBR.welcome.mealBadges).toContain('🥪 Sanduíches');
    });

    it('should differ from Portuguese Portugal in specific terms', () => {
      const pt = TRANSLATIONS.pt;
      expect(ptBR.welcome.mealBadges).not.toEqual(pt.welcome.mealBadges);
    });
  });

  describe('mathematical question functions edge cases', () => {
    const en = TRANSLATIONS.en;

    it('should handle singular and plural correctly in ingredient count', () => {
      expect(en.kitchen.ingredients(1)).toContain('ingredient');
      expect(en.kitchen.ingredients(2)).toContain('ingredients');
      expect(en.kitchen.ingredients(0)).toContain('ingredients');
    });

    it('should handle person/people correctly', () => {
      expect(en.kitchen.forPeople(1)).toContain('person');
      expect(en.kitchen.forPeople(2)).toContain('people');
      expect(en.kitchen.forPeople(5)).toContain('people');
    });

    it('should format complex questions correctly', () => {
      const q = en.mathQuiz.qCompare(5, '🧀', 'cheese', 3, '🍕', 'pepperoni');
      expect(q).toContain('5');
      expect(q).toContain('cheese');
      expect(q).toContain('3');
      expect(q).toContain('pepperoni');
    });

    it('should handle ingredient cost question with correct units', () => {
      const q = en.mathQuiz.qIngCost(3, 2, 'dollars');
      expect(q).toContain('3');
      expect(q).toContain('2');
      expect(q).toContain('dollars');
    });

    it('should format meal cost questions correctly', () => {
      const q = en.mathQuiz.qMealCost('Pizza', 10, 2, 3, 'dollars');
      expect(q).toContain('Pizza');
      expect(q).toContain('10');
      expect(q).toContain('2');
    });

    it('should handle family multiply questions', () => {
      const q = en.mathQuiz.qFamilyMultiply(4, 5, '🧀', 'cheese');
      expect(q).toContain('4');
      expect(q).toContain('5');
      expect(q).toContain('cheese');
    });
  });

  describe('translation consistency', () => {
    it('should have same section structure across all languages', () => {
      const languages = Object.keys(TRANSLATIONS) as Language[];
      const enKeys = Object.keys(TRANSLATIONS.en);

      languages.forEach((lang) => {
        const langKeys = Object.keys(TRANSLATIONS[lang]);
        expect(langKeys).toEqual(enKeys);
      });
    });

    it('should have same meal types in all languages', () => {
      const languages = Object.keys(TRANSLATIONS) as Language[];
      const enMealKeys = Object.keys(TRANSLATIONS.en.meals);

      languages.forEach((lang) => {
        const langMealKeys = Object.keys(TRANSLATIONS[lang].meals);
        expect(langMealKeys).toEqual(enMealKeys);
      });
    });

    it('should have correct messages arrays in all languages', () => {
      const languages = Object.keys(TRANSLATIONS) as Language[];

      languages.forEach((lang) => {
        expect(Array.isArray(TRANSLATIONS[lang].mathQuiz.correctMessages)).toBe(true);
        expect(Array.isArray(TRANSLATIONS[lang].mathQuiz.wrongMessages)).toBe(true);
        expect(TRANSLATIONS[lang].mathQuiz.correctMessages.length).toBeGreaterThan(0);
        expect(TRANSLATIONS[lang].mathQuiz.wrongMessages.length).toBeGreaterThan(0);
      });
    });
  });

  describe('ingredient translation coverage', () => {
    const languages = Object.keys(TRANSLATIONS) as Language[];
    const enIngredientKeys = Object.keys(TRANSLATIONS.en.ingredients);

    languages.forEach((lang) => {
      it(`should have all ingredients translated in ${lang}`, () => {
        const langIngredientKeys = Object.keys(TRANSLATIONS[lang].ingredients);
        expect(langIngredientKeys).toEqual(enIngredientKeys);
      });
    });
  });

  describe('function implementations across languages', () => {
    it('should have consistent function signatures across languages', () => {
      const languages = Object.keys(TRANSLATIONS) as Language[];

      languages.forEach((lang) => {
        expect(typeof TRANSLATIONS[lang].family.singleMessage).toBe('function');
        expect(typeof TRANSLATIONS[lang].family.multiMessage).toBe('function');
        expect(typeof TRANSLATIONS[lang].kitchen.myMeal).toBe('function');
        expect(typeof TRANSLATIONS[lang].mathQuiz.qTotal).toBe('function');
      });
    });

    it('should return strings from all function implementations', () => {
      const languages = Object.keys(TRANSLATIONS) as Language[];

      languages.forEach((lang) => {
        expect(typeof TRANSLATIONS[lang].family.singleMessage('Pizza')).toBe('string');
        expect(typeof TRANSLATIONS[lang].family.multiMessage('Pizza', 2)).toBe('string');
        expect(typeof TRANSLATIONS[lang].kitchen.myMeal('Pizza')).toBe('string');
        expect(typeof TRANSLATIONS[lang].mathQuiz.qTotal('Pizza')).toBe('string');
      });
    });
  });
});