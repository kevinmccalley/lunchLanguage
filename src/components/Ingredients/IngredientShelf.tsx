import { motion } from 'framer-motion';
import { getIngredientsByMeal } from '../../data/ingredients';
import { useGameStore } from '../../store/gameStore';
import { useT } from '../../i18n/useT';
import { IngredientToken } from './IngredientToken';
import { LearningTooltip } from '../UI/LearningTooltip';
import type { MealType, PlacedIngredient } from '../../types';

interface Props {
  onAdd: (ingredient: PlacedIngredient) => void;
  plateRef: React.RefObject<HTMLDivElement | null>;
}

export const IngredientShelf = ({ onAdd, plateRef }: Props) => {
  const { selectedMeal } = useGameStore();
  const t = useT();
  const ingredients = getIngredientsByMeal(selectedMeal as MealType);

  const handleClick = (ingredientId: string) => {
    const plate = plateRef.current;
    if (!plate) return;
    const rect = plate.getBoundingClientRect();
    const x = 20 + Math.random() * (rect.width - 80);
    const y = 20 + Math.random() * (rect.height - 80);
    onAdd({
      instanceId: `${ingredientId}-${Date.now()}-${Math.random()}`,
      ingredientId,
      x,
      y,
      rotation: (Math.random() - 0.5) * 30,
      scale: 0.85 + Math.random() * 0.3,
    });
  };

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 22 }}
      style={{
        background: 'rgba(255,255,255,0.92)', borderRadius: '20px 20px 0 0',
        padding: '12px 16px', borderTop: '3px solid #e0e0e0',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
      }}
    >
      <p style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 700, color: '#888', letterSpacing: 0.5 }}>
        {t.kitchen.addHint}
      </p>
      <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 6 }}>
        {ingredients.map((ing, i) => {
          const translatedName = t.ingredients[ing.id] ?? ing.name;
          return (
            <motion.div
              key={ing.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.04, type: 'spring', stiffness: 300, damping: 18 }}
            >
              <LearningTooltip ingredientKey={ing.id} nativeWord={translatedName}>
                <IngredientToken
                  ingredient={{ ...ing, name: translatedName }}
                  size={68}
                  onClick={() => handleClick(ing.id)}
                />
              </LearningTooltip>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
