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
    it('should have correct base prices for all meal types', () => {
      expect(MEAL_BASE_PRICE.pizza).toBe(7.00);
      expect(MEAL_BASE_PRICE.sushi).toBe(7.00);
      expect(MEAL_BASE_PRICE.hamburger).toBe(5.00);
      expect(MEAL_BASE_PRICE.burrito).toBe(5.00);
      expect(MEAL_BASE_PRICE.sandwich).toBe(5.00);
      expect(MEAL_BASE_PRICE.salad).toBe(4.50);
    });

    it('should contain all expected meal types', () => {
      const mealTypes: MealType[] = ['pizza', 'sushi', 'hamburger', 'burrito', 'sandwich', 'salad'];
      mealTypes.forEach((mealType) => {
        expect(MEAL_BASE_PRICE).toHaveProperty(mealType);
      });
    });
  });

  describe('INGREDIENT_PRICE_USD', () => {
    it('should be 0.05 USD per ingredient', () => {
      expect(INGREDIENT_PRICE_USD).toBe(0.05);
    });
  });

  describe('CURRENCY', () => {
    it('should have config for all languages', () => {
      const languages: Language[] = ['en', 'es', 'fr', 'de', 'pt', 'pt-BR', 'ja', 'zh'];
      languages.forEach((lang) => {
        expect(CURRENCY).toHaveProperty(lang);
      });
    });

    it('should have valid config for English', () => {
      const config = CURRENCY.en;
      expect(config.symbol).toBe('$');
      expect(config.displayMult).toBe(1);
      expect(config.displayDecimals).toBe(2);
      expect(config.mathMult).toBe(100);
      expect(config.ingCost).toBe(5);
      expect(config.unitLabel).toBe('cents');
      expect(config.bills).toEqual([10, 20]);
    });

    it('should have valid config for Spanish', () => {
      const config = CURRENCY.es;
      expect(config.symbol).toBe('€');
      expect(config.displayMult).toBe(1);
      expect(config.displayDecimals).toBe(2);
      expect(config.mathMult).toBe(100);
      expect(config.ingCost).toBe(5);
      expect(config.unitLabel).toBe('céntimos');
      expect(config.bills).toEqual([10, 20]);
    });

    it('should have valid config for French', () => {
      const config = CURRENCY.fr;
      expect(config.symbol).toBe('€');
      expect(config.displayDecimals).toBe(2);
      expect(config.unitLabel).toBe('centimes');
    });

    it('should have valid config for German', () => {
      const config = CURRENCY.de;
      expect(config.symbol).toBe('€');
      expect(config.unitLabel).toBe('Cent');
    });

    it('should have valid config for Portuguese', () => {
      const config = CURRENCY.pt;
      expect(config.symbol).toBe('€');
      expect(config.unitLabel).toBe('cêntimos');
    });

    it('should have valid config for Brazilian Portuguese', () => {
      const config = CURRENCY['pt-BR'];
      expect(config.symbol).toBe('R$');
      expect(config.unitLabel).toBe('centavos');
    });

    it('should have valid config for Japanese', () => {
      const config = CURRENCY.ja;
      expect(config.symbol).toBe('¥');
      expect(config.displayMult).toBe(100);
      expect(config.displayDecimals).toBe(0);
      expect(config.mathMult).toBe(100);
      expect(config.ingCost).toBe(5);
      expect(config.unitLabel).toBe('円');
      expect(config.bills).toEqual([1000, 2000]);
    });

    it('should have valid config for Chinese', () => {
      const config = CURRENCY.zh;
      expect(config.symbol).toBe('¥');
      expect(config.displayMult).toBe(10);
      expect(config.displayDecimals).toBe(0);
      expect(config.mathMult).toBe(10);
      expect(config.ingCost).toBe(1);
      expect(config.unitLabel).toBe('元');
      expect(config.bills).toEqual([100, 200]);
    });

    it('should have all required properties in each config', () => {
      const requiredProperties = ['symbol', 'displayMult', 'displayDecimals', 'mathMult', 'ingCost', 'unitLabel', 'bills'];
      const languages: Language[] = ['en', 'es', 'fr', 'de', 'pt', 'pt-BR', 'ja', 'zh'];
      
      languages.forEach((lang) => {
        const config = CURRENCY[lang];
        requiredProperties.forEach((prop) => {
          expect(config).toHaveProperty(prop);
        });
      });
    });
  });

  describe('getMealCostUSD', () => {
    it('should return base price when ingredient count is 0', () => {
      expect(getMealCostUSD('pizza', 0)).toBe(7.00);
      expect(getMealCostUSD('salad', 0)).toBe(4.50);
      expect(getMealCostUSD('hamburger', 0)).toBe(5.00);
    });

    it('should add ingredient costs correctly', () => {
      expect(getMealCostUSD('pizza', 1)).toBe(7.05);
      expect(getMealCostUSD('pizza', 2)).toBe(7.10);
      expect(getMealCostUSD('pizza', 10)).toBe(7.50);
    });

    it('should handle all meal types', () => {
      const mealTypes: MealType[] = ['pizza', 'sushi', 'hamburger', 'burrito', 'sandwich', 'salad'];
      mealTypes.forEach((mealType) => {
        const cost = getMealCostUSD(mealType, 0);
        expect(cost).toBe(MEAL_BASE_PRICE[mealType]);
      });
    });

    it('should calculate cost with multiple ingredients', () => {
      expect(getMealCostUSD('sushi', 5)).toBe(7.25);
      expect(getMealCostUSD('hamburger', 3)).toBe(5.15);
      expect(getMealCostUSD('salad', 7)).toBe(4.85);
    });

    it('should handle ingredient count of 0', () => {
      expect(getMealCostUSD('pizza', 0)).toBe(MEAL_BASE_PRICE.pizza);
    });

    it('should work with high ingredient counts', () => {
      expect(getMealCostUSD('pizza', 100)).toBe(7.00 + 100 * 0.05);
      expect(getMealCostUSD('pizza', 1000)).toBe(7.00 + 1000 * 0.05);
    });
  });

  describe('formatPrice', () => {
    it('should format USD to English with dollar sign and cents', () => {
      expect(formatPrice(7.00, 'en')).toBe('$7.00');
      expect(formatPrice(7.25, 'en')).toBe('$7.25');
      expect(formatPrice(5.5, 'en')).toBe('$5.50');
    });

    it('should format USD to Euro currencies with 2 decimals', () => {
      expect(formatPrice(7.00, 'es')).toBe('€7.00');
      expect(formatPrice(7.25, 'fr')).toBe('€7.25');
      expect(formatPrice(5.5, 'de')).toBe('€5.50');
      expect(formatPrice(10.99, 'pt')).toBe('€10.99');
    });

    it('should format USD to Brazilian Real', () => {
      expect(formatPrice(7.00, 'pt-BR')).toBe('R$7.00');
      expect(formatPrice(10.50, 'pt-BR')).toBe('R$10.50');
    });

    it('should format USD to Japanese Yen without decimals', () => {
      expect(formatPrice(7.00, 'ja')).toBe('¥700');
      expect(formatPrice(5.5, 'ja')).toBe('¥550');
      expect(formatPrice(10.25, 'ja')).toBe('¥1025');
    });

    it('should format USD to Chinese Yuan without decimals', () => {
      expect(formatPrice(7.00, 'zh')).toBe('¥70');
      expect(formatPrice(5.5, 'zh')).toBe('¥55');
      expect(formatPrice(10.25, 'zh')).toBe('¥103');
    });

    it('should handle zero price', () => {
      expect(formatPrice(0, 'en')).toBe('$0.00');
      expect(formatPrice(0, 'ja')).toBe('¥0');
      expect(formatPrice(0, 'zh')).toBe('¥0');
    });

    it('should handle small prices', () => {
      expect(formatPrice(0.05, 'en')).toBe('$0.05');
      expect(formatPrice(0.01, 'en')).toBe('$0.01');
    });

    it('should handle large prices', () => {
      expect(formatPrice(100.00, 'en')).toBe('$100.00');
      expect(formatPrice(100.00, 'ja')).toBe('¥10000');
      expect(formatPrice(100.00, 'zh')).toBe('¥1000');
    });

    it('should handle prices with rounding in Japanese', () => {
      expect(formatPrice(7.234, 'ja')).toBe('¥723');
      expect(formatPrice(7.256, 'ja')).toBe('¥726');
    });

    it('should handle prices with rounding in Chinese', () => {
      expect(formatPrice(7.234, 'zh')).toBe('¥72');
      expect(formatPrice(7.256, 'zh')).toBe('¥73');
    });
  });

  describe('formatPriceWhole', () => {
    it('should format USD to English whole dollar amount', () => {
      expect(formatPriceWhole(7.00, 'en')).toBe('$7');
      expect(formatPriceWhole(7.25, 'en')).toBe('$7');
      expect(formatPriceWhole(7.50, 'en')).toBe('$8');
    });

    it('should format USD to Euro currencies as whole units', () => {
      expect(formatPriceWhole(7.00, 'es')).toBe('€7');
      expect(formatPriceWhole(7.25, 'fr')).toBe('€7');
      expect(formatPriceWhole(7.50, 'de')).toBe('€8');
    });

    it('should format USD to Brazilian Real as whole units', () => {
      expect(formatPriceWhole(7.00, 'pt-BR')).toBe('R$7');
      expect(formatPriceWhole(7.50, 'pt-BR')).toBe('R$8');
    });

    it('should format USD to Japanese Yen as whole units', () => {
      expect(formatPriceWhole(7.00, 'ja')).toBe('¥700');
      expect(formatPriceWhole(5.5, 'ja')).toBe('¥550');
      expect(formatPriceWhole(10.25, 'ja')).toBe('¥1025');
    });

    it('should format USD to Chinese Yuan as whole units', () => {
      expect(formatPriceWhole(7.00, 'zh')).toBe('¥70');
      expect(formatPriceWhole(5.5, 'zh')).toBe('¥55');
      expect(formatPriceWhole(10.25, 'zh')).toBe('¥103');
    });

    it('should handle zero price', () => {
      expect(formatPriceWhole(0, 'en')).toBe('$0');
      expect(formatPriceWhole(0, 'ja')).toBe('¥0');
      expect(formatPriceWhole(0, 'zh')).toBe('¥0');
    });

    it('should round appropriately', () => {
      expect(formatPriceWhole(7.49, 'en')).toBe('$7');
      expect(formatPriceWhole(7.50, 'en')).toBe('$8');
      expect(formatPriceWhole(7.99, 'en')).toBe('$8');
    });

    it('should handle large prices', () => {
      expect(formatPriceWhole(100.00, 'en')).toBe('$100');
      expect(formatPriceWhole(100.00, 'ja')).toBe('¥10000');
      expect(formatPriceWhole(100.00, 'zh')).toBe('¥1000');
    });

    it('should handle small prices', () => {
      expect(formatPriceWhole(0.05, 'en')).toBe('$0');
      expect(formatPriceWhole(0.50, 'en')).toBe('$1');
    });
  });
});