import { motion } from 'framer-motion';
import { useT } from '../../i18n/useT';
import { LearningTooltip } from '../UI/LearningTooltip';
import type { MealInfo } from '../../data/meals';
import type { MealType } from '../../types';

interface Props {
  meal: MealInfo;
  onSelect: (id: MealType) => void;
  index: number;
}

export const MealCard = ({ meal, onSelect, index }: Props) => {
  const t = useT();
  const name = t.meals[meal.id].name;
  const description = t.meals[meal.id].description;

  return (
    <LearningTooltip mealId={meal.id} nativeWord={name}>
      <motion.button
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08, type: 'spring', stiffness: 300, damping: 22 }}
        whileHover={{ scale: 1.08, y: -6, boxShadow: `0 12px 32px ${meal.accentColor}44` }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelect(meal.id)}
        style={{
          background: meal.bgColor, border: `3px solid ${meal.accentColor}`,
          borderRadius: 20, padding: '20px 16px', cursor: 'pointer',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          minWidth: 140, boxShadow: `0 4px 16px ${meal.accentColor}22`, fontFamily: 'inherit',
        }}
      >
        <motion.span
          animate={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
          style={{ fontSize: 52, lineHeight: 1 }}
        >
          {meal.emoji}
        </motion.span>
        <span style={{ fontSize: 18, fontWeight: 800, color: meal.accentColor }}>{name}</span>
        <span style={{ fontSize: 12, color: '#666', fontWeight: 500 }}>{description}</span>
      </motion.button>
    </LearningTooltip>
  );
};
