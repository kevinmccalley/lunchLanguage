// @ts-nocheck
import type { Language } from '../i18n/types';
import type { MealType } from '../types';
import {
  MEAL_BASE_PRICE,
  INGREDIENT_PRICE_USD,
  CURRENCY,
  getMealCostUSD,
  formatPrice,
  formatPriceWhole,
} from './currency';

describe('currency', () => {
  describe('MEAL_BASE_PRICE', () => {
    it('should have price for pizza', () => {
      expect(MEAL_BASE_PRICE.pizza).toBe(7.00);
    });

    it('should have price for sushi', () => {
      expect(MEAL_BASE_PRICE.sushi).toBe(7.00);
    });

    it('should have price for hamburger', () => {
      expect(MEAL_BASE_PRICE.hamburger).toBe(5.00);
    });

    it('should have price for burrito', () => {
      expect(MEAL_BASE_PRICE.burrito).toBe(5.00);
    });

    it('should have price for sandwich', () => {
      expect(MEAL_BASE_PRICE.sandwich).toBe(5.00);
    });

    it('should have price for salad', () => {
      expect(MEAL_BASE_PRICE.salad).toBe(4.50);
    });

    it('should have all meal types covered', () => {
      const mealTypes: MealType[] = ['pizza', 'sushi', 'hamburger', 'burrito', 'sandwich', 'salad'];
      mealTypes.forEach(mealType => {
        expect(MEAL_BASE_PRICE[mealType]).toBeDefined();
        expect(typeof MEAL_BASE_PRICE[mealType]).toBe('number');
      });
    });
  });

  describe('INGREDIENT_PRICE_USD', () => {
    it('should be 0.05', () => {
      expect(INGREDIENT_PRICE_USD).toBe(0.05);
    });
  });

  describe('CURRENCY', () => {
    it('should have config for en-US', () => {
      const config = CURRENCY['en-US'];
      expect(config.symbol).toBe('$');
      expect(config.displayMult).toBe(1);
      expect(config.displayDecimals).toBe(2);
      expect(config.mathMult).toBe(100);
      expect(config.ingCost).toBe(5);
      expect(config.unitLabel).toBe('cents');
      expect(config.bills).toEqual([10, 20]);
    });

    it('should have config for en-GB', () => {
      const config = CURRENCY['en-GB'];
      expect(config.symbol).toBe('£');
      expect(config.displayMult).toBe(1);
      expect(config.displayDecimals).toBe(2);
      expect(config.mathMult).toBe(100);
      expect(config.ingCost).toBe(5);
      expect(config.unitLabel).toBe('pence');
      expect(config.bills).toEqual([10, 20]);
    });

    it('should have config for es', () => {
      const config = CURRENCY.es;
      expect(config.symbol).toBe('€');
      expect(config.displayMult).toBe(1);
      expect(config.displayDecimals).toBe(2);
      expect(config.mathMult).toBe(100);
      expect(config.ingCost).toBe(5);
      expect(config.unitLabel).toBe('céntimos');
      expect(config.bills).toEqual([10, 20]);
    });

    it('should have config for fr', () => {
      const config = CURRENCY.fr;
      expect(config.symbol).toBe('€');
      expect(config.displayMult).toBe(1);
      expect(config.displayDecimals).toBe(2);
      expect(config.mathMult).toBe(100);
      expect(config.ingCost).toBe(5);
      expect(config.unitLabel).toBe('centimes');
      expect(config.bills).toEqual([10, 20]);
    });

    it('should have config for de', () => {
      const config = CURRENCY.de;
      expect(config.symbol).toBe('€');
      expect(config.displayMult).toBe(1);
      expect(config.displayDecimals).toBe(2);
      expect(config.mathMult).toBe(100);
      expect(config.ingCost).toBe(5);
      expect(config.unitLabel).toBe('Cent');
      expect(config.bills).toEqual([10, 20]);
    });

    it('should have config for pt', () => {
      const config = CURRENCY.pt;
      expect(config.symbol).toBe('€');
      expect(config.displayMult).toBe(1);
      expect(config.displayDecimals).toBe(2);
      expect(config.mathMult).toBe(100);
      expect(config.ingCost).toBe(5);
      expect(config.unitLabel).toBe('cêntimos');
      expect(config.bills).toEqual([10, 20]);
    });

    it('should have config for pt-BR', () => {
      const config = CURRENCY['pt-BR'];
      expect(config.symbol).toBe('R$');
      expect(config.displayMult).toBe(1);
      expect(config.displayDecimals).toBe(2);
      expect(config.mathMult).toBe(100);
      expect(config.ingCost).toBe(5);
      expect(config.unitLabel).toBe('centavos');
      expect(config.bills).toEqual([10, 20]);
    });

    it('should have config for ja', () => {
      const config = CURRENCY.ja;
      expect(config.symbol).toBe('¥');
      expect(config.displayMult).toBe(100);
      expect(config.displayDecimals).toBe(0);
      expect(config.mathMult).toBe(100);
      expect(config.ingCost).toBe(5);
      expect(config.unitLabel).toBe('円');
      expect(config.bills).toEqual([1000, 2000]);
    });

    it('should have config for zh', () => {
      const config = CURRENCY.zh;
      expect(config.symbol).toBe('¥');
      expect(config.displayMult).toBe(10);
      expect(config.displayDecimals).toBe(0);
      expect(config.mathMult).toBe(10);
      expect(config.ingCost).toBe(1);
      expect(config.unitLabel).toBe('元');
      expect(config.bills).toEqual([100, 200]);
    });
  });

  describe('getMealCostUSD', () => {
    it('should return base price when no ingredients', () => {
      expect(getMealCostUSD('pizza', 0)).toBe(7.00);
      expect(getMealCostUSD('sushi', 0)).toBe(7.00);
      expect(getMealCostUSD('hamburger', 0)).toBe(5.00);
      expect(getMealCostUSD('salad', 0)).toBe(4.50);
    });

    it('should add ingredient costs correctly', () => {
      expect(getMealCostUSD('pizza', 1)).toBe(7.05);
      expect(getMealCostUSD('pizza', 2)).toBe(7.10);
      expect(getMealCostUSD('pizza', 10)).toBe(7.50);
    });

    it('should work with hamburger plus ingredients', () => {
      expect(getMealCostUSD('hamburger', 1)).toBe(5.05);
      expect(getMealCostUSD('hamburger', 3)).toBe(5.15);
    });

    it('should work with salad plus ingredients', () => {
      expect(getMealCostUSD('salad', 1)).toBe(4.55);
      expect(getMealCostUSD('salad', 5)).toBe(4.75);
    });

    it('should handle large ingredient counts', () => {
      expect(getMealCostUSD('pizza', 100)).toBe(12.00);
      expect(getMealCostUSD('hamburger', 50)).toBe(7.50);
    });

    it('should work with all meal types', () => {
      const mealTypes: MealType[] = ['pizza', 'sushi', 'hamburger', 'burrito', 'sandwich', 'salad'];
      mealTypes.forEach(mealType => {
        const result = getMealCostUSD(mealType, 0);
        expect(result).toBe(MEAL_BASE_PRICE[mealType]);
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThan(0);
      });
    });
  });

  describe('formatPrice', () => {
    it('should format USD currency with decimals', () => {
      expect(formatPrice(7.25, 'en-US')).toBe('$7.25');
      expect(formatPrice(5.00, 'en-US')).toBe('$5.00');
      expect(formatPrice(4.50, 'en-US')).toBe('$4.50');
    });

    it('should format GBP currency with decimals', () => {
      expect(formatPrice(7.25, 'en-GB')).toBe('£7.25');
      expect(formatPrice(5.00, 'en-GB')).toBe('£5.00');
    });

    it('should format EUR currency with decimals', () => {
      expect(formatPrice(7.25, 'es')).toBe('€7.25');
      expect(formatPrice(7.25, 'fr')).toBe('€7.25');
      expect(formatPrice(7.25, 'de')).toBe('€7.25');
      expect(formatPrice(7.25, 'pt')).toBe('€7.25');
    });

    it('should format BRL currency with decimals', () => {
      expect(formatPrice(7.25, 'pt-BR')).toBe('R$7.25');
    });

    it('should format JPY currency without decimals', () => {
      expect(formatPrice(7.25, 'ja')).toBe('¥725');
      expect(formatPrice(5.00, 'ja')).toBe('¥500');
    });

    it('should format CNY currency without decimals', () => {
      expect(formatPrice(7.25, 'zh')).toBe('¥72.5');
      expect(formatPrice(5.00, 'zh')).toBe('¥50');
    });

    it('should handle zero price', () => {
      expect(formatPrice(0, 'en-US')).toBe('$0.00');
      expect(formatPrice(0, 'ja')).toBe('¥0');
    });

    it('should handle large prices', () => {
      expect(formatPrice(100.50, 'en-US')).toBe('$100.50');
      expect(formatPrice(100.50, 'ja')).toBe('¥10050');
    });

    it('should handle very small prices', () => {
      expect(formatPrice(0.01, 'en-US')).toBe('$0.01');
      expect(formatPrice(0.05, 'en-US')).toBe('$0.05');
    });

    it('should handle fractional cents for JPY', () => {
      expect(formatPrice(1.234, 'ja')).toBe('¥123');
      expect(formatPrice(1.567, 'ja')).toBe('¥157');
    });

    it('should handle all supported languages', () => {
      const languages: Language[] = ['en-US', 'en-GB', 'es', 'fr', 'de', 'pt', 'pt-BR', 'ja', 'zh'];
      languages.forEach(lang => {
        const result = formatPrice(5.00, lang);
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
      });
    });
  });

  describe('formatPriceWhole', () => {
    it('should format USD currency without decimals', () => {
      expect(formatPriceWhole(7.25, 'en-US')).toBe('$7');
      expect(formatPriceWhole(5.00, 'en-US')).toBe('$5');
      expect(formatPriceWhole(4.50, 'en-US')).toBe('$5');
    });

    it('should format GBP currency without decimals', () => {
      expect(formatPriceWhole(7.25, 'en-GB')).toBe('£7');
      expect(formatPriceWhole(5.00, 'en-GB')).toBe('£5');
    });

    it('should format EUR currency without decimals', () => {
      expect(formatPriceWhole(7.25, 'es')).toBe('€7');
      expect(formatPriceWhole(7.25, 'fr')).toBe('€7');
      expect(formatPriceWhole(7.25, 'de')).toBe('€7');
    });

    it('should format BRL currency without decimals', () => {
      expect(formatPriceWhole(7.25, 'pt-BR')).toBe('R$7');
    });

    it('should format JPY currency', () => {
      expect(formatPriceWhole(7.25, 'ja')).toBe('¥725');
      expect(formatPriceWhole(5.00, 'ja')).toBe('¥500');
    });

    it('should format CNY currency', () => {
      expect(formatPriceWhole(7.25, 'zh')).toBe('¥72');
      expect(formatPriceWhole(5.00, 'zh')).toBe('¥50');
    });

    it('should round up correctly', () => {
      expect(formatPriceWhole(4.50, 'en-US')).toBe('$5');
      expect(formatPriceWhole(4.49, 'en-US')).toBe('$4');
      expect(formatPriceWhole(7.51, 'en-US')).toBe('$8');
    });

    it('should handle zero price', () => {
      expect(formatPriceWhole(0, 'en-US')).toBe('$0');
      expect(formatPriceWhole(0, 'ja')).toBe('¥0');
    });

    it('should handle large prices', () => {
      expect(formatPriceWhole(100.50, 'en-US')).toBe('$101');
      expect(formatPriceWhole(100.50, 'ja')).toBe('¥10050');
    });

    it('should handle all supported languages', () => {
      const languages: Language[] = ['en-US', 'en-GB', 'es', 'fr', 'de', 'pt', 'pt-BR', 'ja', 'zh'];
      languages.forEach(lang => {
        const result = formatPriceWhole(5.00, lang);
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
      });
    });

    it('should properly round for edge cases', () => {
      expect(formatPriceWhole(7.4, 'en-US')).toBe('$7');
      expect(formatPriceWhole(7.5, 'en-US')).toBe('$8');
      expect(formatPriceWhole(7.6, 'en-US')).toBe('$8');
    });
  });

  describe('integration tests', () => {
    it('should calculate and format meal cost correctly', () => {
      const cost = getMealCostUSD('pizza', 3);
      const formatted = formatPrice(cost, 'en-US');
      expect(formatted).toBe('$7.15');
    });

    it('should work with all meal types and languages', () => {
      const mealTypes: MealType[] = ['pizza', 'sushi', 'hamburger', 'burrito', 'sandwich', 'salad'];
      const languages: Language[] = ['en-US', 'en-GB', 'es', 'fr', 'de', 'pt', 'pt-BR', 'ja', 'zh'];
      
      mealTypes.forEach(mealType => {
        languages.forEach(lang => {
          const cost = getMealCostUSD(mealType, 2);
          const formatted = formatPrice(cost, lang);
          const formattedWhole = formatPriceWhole(cost, lang);
          
          expect(typeof formatted).toBe('string');
          expect(typeof formattedWhole).toBe('string');
          expect(formatted.length).toBeGreaterThan(0);
          expect(formattedWhole.length).toBeGreaterThan(0);
        });
      });
    });
  });
});