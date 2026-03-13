import type { Language } from '../i18n/types';
import type { MealType } from '../types';

// ─── Base prices (USD) ───────────────────────────────────────────────────────
export const MEAL_BASE_PRICE: Record<MealType, number> = {
  pizza:     7.00,
  sushi:     7.00,
  hamburger: 5.00,
  burrito:   5.00,
  sandwich:  5.00,
  salad:     4.50,
};

export const INGREDIENT_PRICE_USD = 0.05;

// ─── Per-language currency config ────────────────────────────────────────────
export interface CurrencyConfig {
  symbol:          string;
  displayMult:     number;   // USD → display amount  (1 for $/€, 100 for ¥JPY, 10 for ¥CNY)
  displayDecimals: number;   // digits after decimal in display
  mathMult:        number;   // USD → integer math units (same as displayMult but always yields int)
  ingCost:         number;   // ingredient cost in math units (5 for ¢/¥, 1 for 元)
  unitLabel:       string;   // small-unit name used in questions
  bills:           number[]; // payment amounts for change questions, in whole display units
}

export const CURRENCY: Record<Language, CurrencyConfig> = {
  'en-US': { symbol: '$',  displayMult: 1,   displayDecimals: 2, mathMult: 100, ingCost: 5, unitLabel: 'cents',     bills: [10, 20] },
  'en-GB': { symbol: '£',  displayMult: 1,   displayDecimals: 2, mathMult: 100, ingCost: 5, unitLabel: 'pence',     bills: [10, 20] },
  es:      { symbol: '€',  displayMult: 1,   displayDecimals: 2, mathMult: 100, ingCost: 5, unitLabel: 'céntimos',  bills: [10, 20] },
  fr:      { symbol: '€',  displayMult: 1,   displayDecimals: 2, mathMult: 100, ingCost: 5, unitLabel: 'centimes',  bills: [10, 20] },
  de:      { symbol: '€',  displayMult: 1,   displayDecimals: 2, mathMult: 100, ingCost: 5, unitLabel: 'Cent',      bills: [10, 20] },
  pt:      { symbol: '€',  displayMult: 1,   displayDecimals: 2, mathMult: 100, ingCost: 5, unitLabel: 'cêntimos',  bills: [10, 20] },
  'pt-BR': { symbol: 'R$', displayMult: 1,   displayDecimals: 2, mathMult: 100, ingCost: 5, unitLabel: 'centavos',  bills: [10, 20] },
  ja:      { symbol: '¥',  displayMult: 100, displayDecimals: 0, mathMult: 100, ingCost: 5, unitLabel: '円',         bills: [1000, 2000] },
  zh:      { symbol: '¥',  displayMult: 10,  displayDecimals: 0, mathMult: 10,  ingCost: 1, unitLabel: '元',         bills: [100, 200] },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Cost for ONE person in USD */
export function getMealCostUSD(mealId: MealType, ingredientCount: number): number {
  return MEAL_BASE_PRICE[mealId] + ingredientCount * INGREDIENT_PRICE_USD;
}

/** Display string with decimals, e.g. "$7.25" or "¥725" */
export function formatPrice(usd: number, lang: Language): string {
  const c = CURRENCY[lang];
  return `${c.symbol}${(usd * c.displayMult).toFixed(c.displayDecimals)}`;
}

/** Whole-unit display string (no decimals), e.g. "$7" or "¥700" */
export function formatPriceWhole(usd: number, lang: Language): string {
  const c = CURRENCY[lang];
  return `${c.symbol}${Math.round(usd * c.displayMult)}`;
}
