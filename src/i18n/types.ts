export type Language = 'en-US' | 'en-GB' | 'es' | 'fr' | 'de' | 'ja' | 'zh' | 'pt' | 'pt-BR';

export interface MathQuizT {
  title: string;
  questionOf: (n: number, total: number) => string;
  hintPrefix: string;
  skipButton: string;
  correctMessages: string[];
  wrongMessages: string[];
  finalMessage: string;
  nextMessage: string;
  skipReveal: (answer: number) => string;
  // Question templates
  qTotal: (meal: string) => string;
  qCountIngredient: (ingName: string, emoji: string, meal: string) => string;
  qPerSlice: (slices: number, ingName: string, emoji: string, count: number) => string;
  qHowManySlices: (slices: number) => string;
  qFamilyMultiply: (n: number, count: number, emoji: string, ingName: string) => string;
  qTotalFamily: (total: number, meal: string, n: number) => string;
  qUniqueTypes: (meal: string) => string;
  qCompare: (cA: number, eA: string, nA: string, cB: number, eB: string, nB: string) => string;
  qCombined: (cA: number, nA: string, cB: number, nB: string) => string;
  qNotType: (total: number, count: number, name: string, meal: string) => string;
  // Hint templates
  hTotal: (meal: string) => string;
  hCountIngredient: (ingName: string) => string;
  hPerSlice: (count: number, slices: number) => string;
  hHowManySlices: string;
  hFamilyMultiply: (count: number, n: number) => string;
  hTotalFamily: (total: number, n: number) => string;
  hUniqueTypes: string;
  hCompare: (a: number, b: number) => string;
  hCombined: (cA: number, cB: number) => string;
  hNotType: (total: number, count: number) => string;
  // Currency questions
  qIngCost:    (count: number, ingCost: number, unit: string) => string;
  qMealCost:   (meal: string, base: number, count: number, ingCost: number, unit: string) => string;
  qFamilyCost: (costStr: string, n: number) => string;
  qChange:     (billStr: string, costStr: string) => string;
  hIngCost:    (count: number, ingCost: number) => string;
  hMealCost:   (base: number, extra: number) => string;
  hFamilyCost: (cost: number, n: number) => string;
  hChange:     (bill: number, cost: number) => string;
}

export interface Translations {
  chef: {
    greeting: string;
  };
  welcome: {
    title: string;
    subtitle: string;
    startButton: string;
    mealBadges: [string, string, string, string, string, string];
    pickMessage: string;
  };
  mealSelect: {
    title: string;
    prompt: string;
  };
  meals: {
    pizza:     { name: string; description: string; chefIntro: string };
    hamburger: { name: string; description: string; chefIntro: string };
    burrito:   { name: string; description: string; chefIntro: string };
    salad:     { name: string; description: string; chefIntro: string };
    sushi:     { name: string; description: string; chefIntro: string };
    sandwich:  { name: string; description: string; chefIntro: string };
  };
  family: {
    title: string;
    prompt: string;
    justMe: string;
    smallGroup: string;
    bigFamily: string;
    startButton: string;
    singleMessage: (meal: string) => string;
    multiMessage:  (meal: string, n: number) => string;
  };
  kitchen: {
    myMeal:       (meal: string) => string;
    ingredients:  (n: number) => string;
    forPeople:    (n: number) => string;
    slices:       (n: number) => string;
    addHint:      string;
    doneButton:   string;
    doubleTapHint:string;
    emptyWarning: string;
    doneMessage:  string;
    back:         string;
  };
  mathQuiz: MathQuizT;
  score: {
    correct: string;
  };
  celebration: {
    title:       string;
    subtitle:    (emoji: string, meal: string) => string;
    points:      string;
    correct:     string;
    ingredients: string;
    newMeal:     string;
    playAgain:   string;
  };
  ingredients: Record<string, string>;
  tooltip: {
    /** e.g. "Mushroom is 'Cogumelo' in Portuguese (PT)" */
    isInLanguage: (word: string, translation: string, langName: string) => string;
  };
  /** How this language names every other language. Used in tooltip messages. */
  langNames: Record<Language, string>;
  splash: {
    heading:      (mealName: string) => string;
    tagline:      string;
    tapToContinue: string;
  };
  /** Setup screen strings */
  setup: {
    title: string;
    nativePrompt: string;
    learningPrompt: string;
    skipLearning: string;
    confirm: string;
    speechLabel: string;
  };
}
