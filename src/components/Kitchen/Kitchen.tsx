import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { getMealInfo } from '../../data/meals';
import { MealPlate } from './MealPlate';
import { IngredientShelf } from '../Ingredients/IngredientShelf';
import { ChefDialog } from '../Chef/ChefDialog';
import { Button } from '../UI/Button';
import { StarScore } from '../UI/StarScore';
import { useT } from '../../i18n/useT';
import { useLanguageStore } from '../../store/languageStore';
import { useSpeech } from '../../hooks/useSpeech';
import { getMealCostUSD, formatPrice } from '../../utils/currency';

export const Kitchen = () => {
  const {
    selectedMeal, placedIngredients, pizzaSlices,
    setPizzaSlices, addIngredient, setPhase, setChefMessage, familySize,
  } = useGameStore();

  const plateRef = useRef<HTMLDivElement>(null);
  const meal = getMealInfo(selectedMeal!);
  const t = useT();
  const { language } = useLanguageStore();
  const mealName = t.meals[selectedMeal!].name;
  const { speak } = useSpeech();
  const [showSlicePicker, setShowSlicePicker] = useState(false);
  const [burritoWrapping, setBurritoWrapping] = useState(false);

  useEffect(() => {
    setChefMessage(t.kitchen.addHint, 'happy');
    speak(`${t.kitchen.myMeal(mealName)}. ${t.kitchen.addHint}. ${t.kitchen.doubleTapHint}`);
  }, [t]);

  const ingredientCount = placedIngredients.length;

  const handleDone = () => {
    if (ingredientCount === 0) {
      setChefMessage(t.kitchen.emptyWarning, 'thinking');
      return;
    }
    setChefMessage(t.kitchen.doneMessage, 'excited');
    if (selectedMeal === 'burrito') {
      setBurritoWrapping(true);
      setTimeout(() => setPhase('mealSplash'), 1800);
    } else {
      setPhase('mealSplash');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        display: 'flex', flexDirection: 'column', height: '100vh',
        background: `linear-gradient(180deg, ${meal.bgColor} 0%, white 100%)`,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 16px 8px 152px', background: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)', flexShrink: 0,
      }}>
        <button
          onClick={() => setPhase('mealSelect')}
          style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', padding: '4px 8px' }}
        >
          {t.kitchen.back}
        </button>
        <span style={{ fontSize: 18, fontWeight: 800, color: meal.accentColor }}>
          {meal.emoji} {t.kitchen.myMeal(mealName)}
        </span>
        <StarScore />
      </div>

      {/* Chef dialog */}
      <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
        <ChefDialog compact />
      </div>

      {/* Stats bar */}
      <div style={{ display: 'flex', gap: 10, padding: '4px 16px', flexShrink: 0, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
        <motion.div
          key={ingredientCount}
          animate={{ scale: [1, 1.2, 1] }}
          style={{
            background: meal.accentColor, color: 'white',
            borderRadius: 10, padding: '3px 10px', fontSize: 13, fontWeight: 700,
          }}
        >
          {t.kitchen.ingredients(ingredientCount)}
        </motion.div>
        <div style={{
          background: '#e8e8e8', borderRadius: 10, padding: '3px 10px',
          fontSize: 13, fontWeight: 600, color: '#555',
        }}>
          {t.kitchen.forPeople(familySize)}
        </div>

        <motion.div
          key={ingredientCount}
          animate={{ scale: [1, 1.15, 1] }}
          style={{
            background: '#fff8e1', border: '2px solid #f9a825',
            borderRadius: 10, padding: '3px 10px', fontSize: 13,
            fontWeight: 700, color: '#f57f17',
          }}
        >
          💰 {formatPrice(getMealCostUSD(selectedMeal!, ingredientCount), language)}
        </motion.div>

        {meal.hasSlices && (
          <button
            onClick={() => setShowSlicePicker(v => !v)}
            style={{
              background: '#fff', border: `2px solid ${meal.accentColor}`,
              borderRadius: 10, padding: '3px 10px', fontSize: 13,
              fontWeight: 700, color: meal.accentColor, cursor: 'pointer',
            }}
          >
            {t.kitchen.slices(pizzaSlices)}
          </button>
        )}

        {showSlicePicker && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{
              display: 'flex', gap: 6, alignItems: 'center', background: 'white',
              borderRadius: 12, padding: '4px 10px', boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
            }}
          >
            {[4, 6, 8, 10, 12].map(n => (
              <button
                key={n}
                onClick={() => { setPizzaSlices(n); setShowSlicePicker(false); }}
                style={{
                  width: 32, height: 32, borderRadius: '50%',
                  border: `2px solid ${n === pizzaSlices ? meal.accentColor : '#ddd'}`,
                  background: n === pizzaSlices ? meal.accentColor : 'white',
                  color: n === pizzaSlices ? 'white' : '#555',
                  fontWeight: 700, cursor: 'pointer', fontSize: 13,
                }}
              >
                {n}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Plate area */}
      <MealPlate plateRef={plateRef} burritoWrapping={burritoWrapping} />

      {/* Ingredient shelf */}
      <IngredientShelf onAdd={addIngredient} plateRef={plateRef} />

      {/* Done button */}
      <div style={{
        padding: '10px 16px', background: 'white',
        borderTop: '2px solid #f0f0f0', display: 'flex', justifyContent: 'center', flexShrink: 0,
      }}>
        <Button
          size="lg"
          variant={ingredientCount >= 2 ? 'success' : 'secondary'}
          onClick={handleDone}
          disabled={ingredientCount === 0}
        >
          {t.kitchen.doneButton}
        </Button>
      </div>
    </motion.div>
  );
};
