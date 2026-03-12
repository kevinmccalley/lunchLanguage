import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MEALS } from '../../data/meals';
import { useGameStore } from '../../store/gameStore';
import { MealCard } from './MealCard';
import { ChefDialog } from '../Chef/ChefDialog';
import { useT } from '../../i18n/useT';
import { useSpeech } from '../../hooks/useSpeech';
import type { MealType } from '../../types';

export const MealSelector = () => {
  const { selectMeal, setPhase, setChefMessage } = useGameStore();
  const t = useT();
  const { speak } = useSpeech();

  useEffect(() => {
    setChefMessage(t.welcome.pickMessage, 'excited');
    speak(`${t.mealSelect.title}. ${t.mealSelect.prompt}`);
  }, [t]);

  const handleSelect = (meal: MealType) => {
    selectMeal(meal);
    setChefMessage(t.meals[meal].chefIntro, 'excited');
    setPhase('familySelect');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24,
        padding: 24, minHeight: '100vh',
        background: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 50%, #fd79a8 100%)',
      }}
    >
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={{
          fontSize: 32, fontWeight: 900, color: '#2c2c2c', textAlign: 'center',
          textShadow: '2px 2px 0 rgba(255,255,255,0.5)', margin: 0,
        }}
      >
        {t.mealSelect.title}
      </motion.h1>

      <ChefDialog />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ fontSize: 18, color: '#555', fontWeight: 600, margin: 0 }}
      >
        {t.mealSelect.prompt}
      </motion.p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', maxWidth: 700 }}>
        {MEALS.map((meal, i) => (
          <MealCard key={meal.id} meal={meal} onSelect={handleSelect} index={i} />
        ))}
      </div>
    </motion.div>
  );
};
