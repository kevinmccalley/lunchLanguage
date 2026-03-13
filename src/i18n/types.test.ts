// @ts-nocheck
import { Language, MathQuizT, Translations } from '../src/i18n/types';

describe('i18n/types', () => {
  describe('Language type', () => {
    it('should allow valid language codes', () => {
      const languages: Language[] = [
        'en-US',
        'en-GB',
        'es',
        'fr',
        'de',
        'ja',
        'zh',
        'pt',
        'pt-BR',
      ];
      expect(languages).toHaveLength(9);
    });
  });

  describe('MathQuizT interface', () => {
    it('should define all required string properties', () => {
      const mockQuiz: MathQuizT = {
        title: 'Math Quiz',
        questionOf: (n: number, total: number) => `Question ${n} of ${total}`,
        hintPrefix: 'Hint: ',
        skipButton: 'Skip',
        correctMessages: ['Great!', 'Excellent!'],
        wrongMessages: ['Try again', 'Not quite'],
        finalMessage: 'Quiz complete',
        nextMessage: 'Next',
        skipReveal: (answer: number) => `The answer is ${answer}`,
        qTotal: (meal: string) => `Total ${meal}`,
        qCountIngredient: (ingName: string, emoji: string, meal: string) =>
          `Count ${emoji} ${ingName} in ${meal}`,
        qPerSlice: (slices: number, ingName: string, emoji: string, count: number) =>
          `${ingName} per slice`,
        qHowManySlices: (slices: number) => `How many slices`,
        qFamilyMultiply: (n: number, count: number, emoji: string, ingName: string) =>
          `Multiply for family`,
        qTotalFamily: (total: number, meal: string, n: number) => `Total for family`,
        qUniqueTypes: (meal: string) => `Unique types`,
        qCompare: (
          cA: number,
          eA: string,
          nA: string,
          cB: number,
          eB: string,
          nB: string
        ) => `Compare`,
        qCombined: (cA: number, nA: string, cB: number, nB: string) => `Combined`,
        qNotType: (total: number, count: number, name: string, meal: string) =>
          `Not ${name}`,
        hTotal: (meal: string) => `Hint for ${meal}`,
        hCountIngredient: (ingName: string) => `Count ${ingName}`,
        hPerSlice: (count: number, slices: number) => `Per slice hint`,
        hHowManySlices: 'How many slices hint',
        hFamilyMultiply: (count: number, n: number) => `Multiply hint`,
        hTotalFamily: (total: number, n: number) => `Total family hint`,
        hUniqueTypes: 'Unique types hint',
        hCompare: (a: number, b: number) => `Compare ${a} and ${b}`,
        hCombined: (cA: number, cB: number) => `Combined hint`,
        hNotType: (total: number, count: number) => `Not type hint`,
        qIngCost: (count: number, ingCost: number, unit: string) => `Cost`,
        qMealCost: (meal: string, base: number, count: number, ingCost: number, unit: string) =>
          `Meal cost`,
        qFamilyCost: (costStr: string, n: number) => `Family cost`,
        qChange: (billStr: string, costStr: string) => `Change`,
        hIngCost: (count: number, ingCost: number) => `Ingredient cost hint`,
        hMealCost: (base: number, extra: number) => `Meal cost hint`,
        hFamilyCost: (cost: number, n: number) => `Family cost hint`,
        hChange: (bill: number, cost: number) => `Change hint`,
      };

      expect(mockQuiz.title).toBe('Math Quiz');
      expect(mockQuiz.hintPrefix).toBe('Hint: ');
      expect(mockQuiz.skipButton).toBe('Skip');
      expect(mockQuiz.finalMessage).toBe('Quiz complete');
      expect(mockQuiz.nextMessage).toBe('Next');
    });

    it('should define arrays for message variations', () => {
      const mockQuiz: MathQuizT = {
        title: 'Math Quiz',
        questionOf: (n: number, total: number) => `Question ${n} of ${total}`,
        hintPrefix: 'Hint: ',
        skipButton: 'Skip',
        correctMessages: ['Great!', 'Excellent!', 'Nice work!'],
        wrongMessages: ['Try again', 'Not quite', 'Almost!'],
        finalMessage: 'Quiz complete',
        nextMessage: 'Next',
        skipReveal: (answer: number) => `The answer is ${answer}`,
        qTotal: (meal: string) => `Total ${meal}`,
        qCountIngredient: (ingName: string, emoji: string, meal: string) =>
          `Count ${emoji} ${ingName} in ${meal}`,
        qPerSlice: (slices: number, ingName: string, emoji: string, count: number) =>
          `${ingName} per slice`,
        qHowManySlices: (slices: number) => `How many slices`,
        qFamilyMultiply: (n: number, count: number, emoji: string, ingName: string) =>
          `Multiply for family`,
        qTotalFamily: (total: number, meal: string, n: number) => `Total for family`,
        qUniqueTypes: (meal: string) => `Unique types`,
        qCompare: (
          cA: number,
          eA: string,
          nA: string,
          cB: number,
          eB: string,
          nB: string
        ) => `Compare`,
        qCombined: (cA: number, nA: string, cB: number, nB: string) => `Combined`,
        qNotType: (total: number, count: number, name: string, meal: string) =>
          `Not ${name}`,
        hTotal: (meal: string) => `Hint for ${meal}`,
        hCountIngredient: (ingName: string) => `Count ${ingName}`,
        hPerSlice: (count: number, slices: number) => `Per slice hint`,
        hHowManySlices: 'How many slices hint',
        hFamilyMultiply: (count: number, n: number) => `Multiply hint`,
        hTotalFamily: (total: number, n: number) => `Total family hint`,
        hUniqueTypes: 'Unique types hint',
        hCompare: (a: number, b: number) => `Compare ${a} and ${b}`,
        hCombined: (cA: number, cB: number) => `Combined hint`,
        hNotType: (total: number, count: number) => `Not type hint`,
        qIngCost: (count: number, ingCost: number, unit: string) => `Cost`,
        qMealCost: (meal: string, base: number, count: number, ingCost: number, unit: string) =>
          `Meal cost`,
        qFamilyCost: (costStr: string, n: number) => `Family cost`,
        qChange: (billStr: string, costStr: string) => `Change`,
        hIngCost: (count: number, ingCost: number) => `Ingredient cost hint`,
        hMealCost: (base: number, extra: number) => `Meal cost hint`,
        hFamilyCost: (cost: number, n: number) => `Family cost hint`,
        hChange: (bill: number, cost: number) => `Change hint`,
      };

      expect(mockQuiz.correctMessages).toHaveLength(3);
      expect(mockQuiz.wrongMessages).toHaveLength(3);
      expect(mockQuiz.correctMessages[0]).toBe('Great!');
      expect(mockQuiz.wrongMessages[0]).toBe('Try again');
    });

    it('should support function callbacks with parameters', () => {
      const mockQuiz: MathQuizT = {
        title: 'Math Quiz',
        questionOf: (n: number, total: number) => `Question ${n} of ${total}`,
        hintPrefix: 'Hint: ',
        skipButton: 'Skip',
        correctMessages: ['Great!'],
        wrongMessages: ['Try again'],
        finalMessage: 'Quiz complete',
        nextMessage: 'Next',
        skipReveal: (answer: number) => `The answer is ${answer}`,
        qTotal: (meal: string) => `Total ${meal}`,
        qCountIngredient: (ingName: string, emoji: string, meal: string) =>
          `Count ${emoji} ${ingName} in ${meal}`,
        qPerSlice: (slices: number, ingName: string, emoji: string, count: number) =>
          `${ingName} per slice`,
        qHowManySlices: (slices: number) => `How many slices`,
        qFamilyMultiply: (n: number, count: number, emoji: string, ingName: string) =>
          `Multiply for family`,
        qTotalFamily: (total: number, meal: string, n: number) => `Total for family`,
        qUniqueTypes: (meal: string) => `Unique types`,
        qCompare: (
          cA: number,
          eA: string,
          nA: string,
          cB: number,
          eB: string,
          nB: string
        ) => `Compare`,
        qCombined: (cA: number, nA: string, cB: number, nB: string) => `Combined`,
        qNotType: (total: number, count: number, name: string, meal: string) =>
          `Not ${name}`,
        hTotal: (meal: string) => `Hint for ${meal}`,
        hCountIngredient: (ingName: string) => `Count ${ingName}`,
        hPerSlice: (count: number, slices: number) => `Per slice hint`,
        hHowManySlices: 'How many slices hint',
        hFamilyMultiply: (count: number, n: number) => `Multiply hint`,
        hTotalFamily: (total: number, n: number) => `Total family hint`,
        hUniqueTypes: 'Unique types hint',
        hCompare: (a: number, b: number) => `Compare ${a} and ${b}`,
        hCombined: (cA: number, cB: number) => `Combined hint`,
        hNotType: (total: number, count: number) => `Not type hint`,
        qIngCost: (count: number, ingCost: number, unit: string) => `Cost`,
        qMealCost: (meal: string, base: number, count: number, ingCost: number, unit: string) =>
          `Meal cost`,
        qFamilyCost: (costStr: string, n: number) => `Family cost`,
        qChange: (billStr: string, costStr: string) => `Change`,
        hIngCost: (count: number, ingCost: number) => `Ingredient cost hint`,
        hMealCost: (base: number, extra: number) => `Meal cost hint`,
        hFamilyCost: (cost: number, n: number) => `Family cost hint`,
        hChange: (bill: number, cost: number) => `Change hint`,
      };

      expect(mockQuiz.questionOf(1, 5)).toBe('Question 1 of 5');
      expect(mockQuiz.skipReveal(42)).toBe('The answer is 42');
      expect(mockQuiz.qTotal('pizza')).toBe('Total pizza');
      expect(
        mockQuiz.qCountIngredient('cheese', '🧀', 'pizza')
      ).toBe('Count 🧀 cheese in pizza');
      expect(mockQuiz.hCompare(10, 20)).toBe('Compare 10 and 20');
    });
  });

  describe('Translations interface', () => {
    it('should define chef section', () => {
      const translations: Translations = {
        chef: {
          greeting: 'Hello, I am the chef!',
        },
        welcome: {
          title: 'Welcome',
          subtitle: 'Learn and cook',
          startButton: 'Start',
          mealBadges: ['🍕', '🍔', '🌯', '🥗', '🍣', '🥪'],
          pickMessage: 'Pick a meal',
        },
        mealSelect: {
          title: 'Select Meal',
          prompt: 'Choose a meal',
        },
        meals: {
          pizza: {
            name: 'Pizza',
            description: 'Italian favorite',
            chefIntro: 'Lets make pizza',
          },
          hamburger: {
            name: 'Hamburger',
            description: 'Classic burger',
            chefIntro: 'Lets make burger',
          },
          burrito: {
            name: 'Burrito',
            description: 'Mexican wrap',
            chefIntro: 'Lets make burrito',
          },
          salad: {
            name: 'Salad',
            description: 'Healthy option',
            chefIntro: 'Lets make salad',
          },
          sushi: {
            name: 'Sushi',
            description: 'Japanese delicacy',
            chefIntro: 'Lets make sushi',
          },
          sandwich: {
            name: 'Sandwich',
            description: 'Simple and tasty',
            chefIntro: 'Lets make sandwich',
          },
        },
        family: {
          title: 'Family Size',
          prompt: 'How many people?',
          justMe: 'Just me',
          smallGroup: 'Small group',
          bigFamily: 'Big family',
          startButton: 'Start',
          singleMessage: (meal: string) => `Making ${meal} for one`,
          multiMessage: (meal: string, n: number) => `Making ${meal} for ${n}`,
        },
        kitchen: {
          myMeal: (meal: string) => `My ${meal}`,
          ingredients: (n: number) => `${n} ingredients`,
          forPeople: (n: number) => `For ${n} people`,
          slices: (n: number) => `${n} slices`,
          addHint: 'Add hint',
          doneButton: 'Done',
          doubleTapHint: 'Double tap to confirm',
          emptyWarning: 'Add ingredients',
          doneMessage: 'Finished!',
          back: 'Back',
        },
        mathQuiz: {
          title: 'Math Quiz',
          questionOf: (n: number, total: number) => `Question ${n} of ${total}`,
          hintPrefix: 'Hint: ',
          skipButton: 'Skip',
          correctMessages: ['Great!'],
          wrongMessages: ['Try again'],
          finalMessage: 'Done',
          nextMessage: 'Next',
          skipReveal: (answer: number) => `Answer: ${answer}`,
          qTotal: (meal: string) => `Total ${meal}`,
          qCountIngredient: (ingName: string, emoji: string, meal: string) =>
            `Count ${emoji}`,
          qPerSlice: (slices: number, ingName: string, emoji: string, count: number) =>
            `Per slice`,
          qHowManySlices: (slices: number) => `Slices`,
          qFamilyMultiply: (n: number, count: number, emoji: string, ingName: string) =>
            `Multiply`,
          qTotalFamily: (total: number, meal: string, n: number) => `Total`,
          qUniqueTypes: (meal: string) => `Types`,
          qCompare: (
            cA: number,
            eA: string,
            nA: string,
            cB: number,
            eB: string,
            nB: string
          ) => `Compare`,
          qCombined: (cA: number, nA: string, cB: number, nB: string) => `Combined`,
          qNotType: (total: number, count: number, name: string, meal: string) =>
            `Not type`,
          hTotal: (meal: string) => `Total hint`,
          hCountIngredient: (ingName: string) => `Count hint`,
          hPerSlice: (count: number, slices: number) => `Slice hint`,
          hHowManySlices: 'Slices hint',
          hFamilyMultiply: (count: number, n: number) => `Multiply hint`,
          hTotalFamily: (total: number, n: number) => `Total hint`,
          hUniqueTypes: 'Types hint',
          hCompare: (a: number, b: number) => `Compare hint`,
          hCombined: (cA: number, cB: number) => `Combined hint`,
          hNotType: (total: number, count: number) => `Not type hint`,
          qIngCost: (count: number, ingCost: number, unit: string) => `Cost`,
          qMealCost: (meal: string, base: number, count: number, ingCost: number, unit: string) =>
            `Cost`,
          qFamilyCost: (costStr: string, n: number) => `Cost`,
          qChange: (billStr: string, costStr: string) => `Change`,
          hIngCost: (count: number, ingCost: number) => `Cost hint`,
          hMealCost: (base: number, extra: number) => `Cost hint`,
          hFamilyCost: (cost: number, n: number) => `Cost hint`,
          hChange: (bill: number, cost: number) => `Change hint`,
        },
        score: {
          correct: 'Correct',
        },
        celebration: {
          title: 'Celebrate!',
          subtitle: (emoji: string, meal: string) => `You made ${emoji} ${meal}!`,
          points: 'Points',
          correct: 'Correct',
          ingredients: 'Ingredients',
          newMeal: 'New meal',
          playAgain: 'Play again',
        },
        ingredients: {
          cheese: 'Cheese',
          tomato: 'Tomato',
        },
        tooltip: {
          isInLanguage: (word: string, translation: string, langName: string) =>
            `${word} is ${translation} in ${langName}`,
        },
        langNames: {
          'en-US': 'English (US)',
          'en-GB': 'English (UK)',
          es: 'Spanish',
          fr: 'French',
          de: 'German',
          ja: 'Japanese',
          zh: 'Chinese',
          pt: 'Portuguese',
          'pt-BR': 'Portuguese (BR)',
        },
        splash: {
          heading: (mealName: string) => `Welcome to ${mealName}`,
          tagline: 'Learn by cooking',
          tapToContinue: 'Tap to continue',
        },
        setup: {
          title: 'Setup',
          nativePrompt: 'Native language?',
          learningPrompt: 'Learning language?',
          skipLearning: 'Skip',
          confirm: 'Confirm',
          speechLabel: 'Enable speech',
        },
      };

      expect(translations.chef.greeting).toBe('Hello, I am the chef!');
    });

    it('should define welcome section with meal badges tuple', () => {
      const translations: Translations = {
        chef: { greeting: 'Chef' },
        welcome: {
          title: 'Welcome',
          subtitle: 'Learn and cook',
          startButton: 'Start',
          mealBadges: ['🍕', '🍔', '🌯', '🥗', '🍣', '🥪'],
          pickMessage: 'Pick a meal',
        },
        mealSelect: {
          title: 'Select Meal',
          prompt: 'Choose a meal',
        },
        meals: {
          pizza: {
            name: 'Pizza',
            description: 'Italian favorite',
            chefIntro: 'Lets make pizza',
          },
          hamburger: {
            name: 'Hamburger',
            description: 'Classic burger',
            chefIntro: 'Lets make burger',
          },
          burrito: {
            name: 'Burrito',
            description: 'Mexican wrap',
            chefIntro: 'Lets make burrito',
          },
          salad: {
            name: 'Salad',
            description: 'Healthy option',
            chefIntro: 'Lets make salad',
          },
          sushi: {
            name: 'Sushi',
            description: 'Japanese delicacy',
            chefIntro: 'Lets make sushi',
          },
          sandwich: {
            name: 'Sandwich',
            description: 'Simple and tasty',
            chefIntro: 'Lets make sandwich',
          },
        },
        family: {
          title: 'Family Size',
          prompt: 'How many people?',
          justMe: 'Just me',
          smallGroup: 'Small group',
          bigFamily: 'Big family',
          startButton: 'Start',
          singleMessage: (meal: string) => `Making ${meal}`,
          multiMessage: (meal: string, n: number) => `Making ${meal} for ${n}`,
        },
        kitchen: {
          myMeal: (meal: string) => `My ${meal}`,
          ingredients: (n: number) => `${n} ingredients`,
          forPeople: (n: number) => `For ${n}`,
          slices: (n: number) => `${n} slices`,
          addHint: 'Add',
          doneButton: 'Done',
          doubleTapHint: 'Tap',
          emptyWarning: 'Add',
          doneMessage: 'Done',
          back: 'Back',
        },
        mathQuiz: {
          title: 'Quiz',
          questionOf: (n: number, total: number) => `Q${n}/${total}`,
          hintPrefix: 'H: ',
          skipButton: 'Skip',
          correctMessages: ['Good'],
          wrongMessages: ['Try'],
          finalMessage: 'End',
          nextMessage: 'Next',
          skipReveal: (answer: number) => `${answer}`,
          qTotal: (meal: string) => `Total`,
          qCountIngredient: (ingName: string, emoji: string, meal: string) => `Count`,
          qPerSlice: (slices: number, ingName: string, emoji: string, count: number) =>
            `Slice`,
          qHowManySlices: (slices: number) => `Slices`,
          qFamilyMultiply: (n: number, count: number, emoji: string, ingName: string) =>
            `Mult`,
          qTotalFamily: (total: number, meal: string, n: number) => `Total`,
          qUniqueTypes: (meal: string) => `Types`,
          qCompare: (
            cA: number,
            eA: string,
            nA: string,
            cB: number,
            eB: string,
            nB: string
          ) => `Cmp`,
          qCombined: (cA: number, nA: string, cB: number, nB: string) => `Comb`,
          qNotType: (total: number, count: number, name: string, meal: string) =>
            `Not`,
          hTotal: (meal: string) => `H`,
          hCountIngredient: (ingName: string) => `H`,
          hPerSlice: (count: number, slices: number) => `H`,
          hHowManySlices: 'H',
          hFamilyMultiply: (count: number, n: number) => `H`,
          hTotalFamily: (total: number, n: number) => `H`,
          hUniqueTypes: 'H',
          hCompare: (a: number, b: number) => `H`,
          hCombined: (cA: number, cB: number) => `H`,
          hNotType: (total: number, count: number) => `H`,
          qIngCost: (count: number, ingCost: number, unit: string) => `Cost`,
          qMealCost: (meal: string, base: number, count: number, ingCost: number, unit: string) =>
            `Cost`,
          qFamilyCost: (costStr: string, n: number) => `Cost`,
          qChange: (billStr: string, costStr: string) => `Change`,
          hIngCost: (count: number, ingCost: number) => `H`,
          hMealCost: (base: number, extra: number) => `H`,
          hFamilyCost: (cost: number, n: number) => `H`,
          hChange: (bill: number, cost: number) => `H`,
        },
        score: { correct: 'Correct' },
        celebration: {
          title: 'Celebrate',
          subtitle: (emoji: string, meal: string) => `Made ${meal}`,
          points: 'Points',
          correct: 'Correct',
          ingredients: 'Ingredients',
          newMeal: 'New',
          playAgain: 'Again',
        },
        ingredients: { cheese: 'Cheese' },
        tooltip: {
          isInLanguage: (word: string, translation: string, langName: string) =>
            `${word} = ${translation}`,
        },
        langNames: {
          'en-US': 'English',
          'en-GB': 'English',
          es: 'Spanish',
          fr: 'French',
          de: 'German',
          ja: 'Japanese',
          zh: 'Chinese',
          pt: 'Portuguese',
          'pt-BR': 'Portuguese',
        },
        splash: {
          heading: (mealName: string) => `${mealName}`,
          tagline: 'Cook',
          tapToContinue: 'Tap',
        },
        setup: {
          title: 'Setup',
          nativePrompt: 'Native?',
          learningPrompt: 'Learn?',
          skipLearning: 'Skip',
          confirm: 'OK',
          speechLabel: 'Speech',
        },
      };

      expect(translations.welcome.mealBadges).toHaveLength(6);
      expect(translations.welcome.mealBadges[0]).toBe('🍕');
      expect(translations.welcome.mealBadges[5]).toBe('🥪');
    });

    it('should define all meal types with name, description, and chefIntro', () => {
      const translations: Translations = {
        chef: { greeting: 'Chef' },
        welcome: {
          title: 'Welcome',
          subtitle: 'Learn',
          startButton: 'Start',
          mealBadges: ['🍕', '🍔', '🌯', '🥗', '🍣', '🥪'],
          pickMessage: 'Pick',
        },
        mealSelect: {
          title: 'Select',
          prompt: 'Choose',
        },
        meals: {
          pizza: {
            name: 'Pizza',
            description: 'Italian',
            chefIntro: 'Intro',
          },
          hamburger: {
            name: 'Hamburger',
            description: 'Burger',
            chefIntro: 'Intro',
          },
          burrito: {
            name: 'Burrito',
            description: 'Mexican',
            chefIntro: 'Intro',
          },
          salad: {
            name: 'Salad',
            description: 'Healthy',
            chefIntro: 'Intro',
          },
          sushi: {
            name: 'Sushi',
            description: 'Japanese',
            chefIntro: 'Intro',
          },
          sandwich: {
            name: 'Sandwich',
            description: 'Simple',
            chefIntro: 'Intro',
          },
        },
        family: {
          title: 'Family',
          prompt: 'How many?',
          justMe: 'Me',
          smallGroup: 'Small',
          bigFamily: 'Big',
          startButton: 'Start',
          singleMessage: (meal: string) => `${meal}`,
          multiMessage: (meal: string, n: number) => `${meal} x${n}`,
        },
        kitchen: {
          myMeal: (meal: string) => `${meal}`,
          ingredients: (n: number) => `${n}`,
          forPeople: (n: number) => `${n}`,
          slices: (n: number) => `${n}`,
          addHint: 'Add',
          doneButton: 'Done',
          doubleTapHint: 'Tap',
          emptyWarning: 'Empty',
          doneMessage: 'Done',
          back: 'Back',
        },
        mathQuiz: {
          title: 'Quiz',
          questionOf: (n: number, total: number) => `${n}/${total}`,
          hintPrefix: 'H',
          skipButton: 'Skip',
          correctMessages: ['Good'],
          wrongMessages: ['Bad'],
          finalMessage: 'End',
          nextMessage: 'Next',
          skipReveal: (answer: number) => `${answer}`,
          qTotal: (meal: string) => `Total`,
          qCountIngredient: (ingName: string, emoji: string, meal: string) => `Count`,
          qPerSlice: (slices: number, ingName: string, emoji: string, count: number) =>
            `Per`,
          qHowManySlices: (slices: number) => `Slices`,
          qFamilyMultiply: (n: number, count: number, emoji: string, ingName: string) =>
            `Mult`,
          qTotalFamily: (total: number, meal: string, n: number) => `Total`,
          qUniqueTypes: (meal: string) => `Types`,
          qCompare: (
            cA: number,
            eA: string,
            nA: string,
            cB: number,
            eB: string,
            nB: string
          ) => `Cmp`,
          qCombined: (cA: number, nA: string, cB: number, nB: string) => `Comb`,
          qNotType: (total: number, count: number, name: string, meal: string) =>
            `Not`,
          hTotal: (meal: string) => `H`,
          hCountIngredient: (ingName: string) => `H`,
          hPerSlice: (count: number, slices: number) => `H`,
          hHow