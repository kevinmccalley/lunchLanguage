import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';
import { getMealInfo } from '../../data/meals';
import { ChefDialog } from '../Chef/ChefDialog';
import { Button } from '../UI/Button';
import { useT } from '../../i18n/useT';
import { useSpeech } from '../../hooks/useSpeech';

const PERSON_EMOJI = ['👦', '👧', '🧑', '👨', '👩', '👴', '👵', '🧒'];

export const FamilySelector = () => {
  const { selectedMeal, setFamilySize, setPhase, setChefMessage } = useGameStore();
  const [count, setCount] = useState(1);
  const meal = getMealInfo(selectedMeal!);
  const t = useT();
  const mealName = t.meals[selectedMeal!].name;
  const { speak } = useSpeech();

  useEffect(() => {
    speak(`${t.family.title}. ${t.family.prompt}`);
  }, [t]);

  const sizeLabel = count === 1 ? t.family.justMe : count <= 3 ? t.family.smallGroup : t.family.bigFamily;

  const handleStart = () => {
    setFamilySize(count);
    const msg = count === 1
      ? t.family.singleMessage(mealName)
      : t.family.multiMessage(mealName, count);
    setChefMessage(msg, 'pointing');
    setPhase('cooking');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${meal.bgColor}, white)`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, padding: 24,
      }}
    >
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ fontSize: 28, fontWeight: 900, color: meal.accentColor, margin: 0 }}
      >
        {meal.emoji} {t.family.title}
      </motion.h2>

      <ChefDialog />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          background: 'white', borderRadius: 24, padding: '28px 36px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: `3px solid ${meal.accentColor}`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
        }}
      >
        <p style={{ fontSize: 18, fontWeight: 600, color: '#555', margin: 0 }}>
          {t.family.prompt}
        </p>

        {/* Person emojis */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', minHeight: 50 }}>
          {PERSON_EMOJI.slice(0, count).map((p, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              style={{ fontSize: 36 }}
            >
              {p}
            </motion.span>
          ))}
        </div>

        {/* Counter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Button variant="secondary" size="lg" onClick={() => setCount(Math.max(1, count - 1))} disabled={count <= 1}>
            −
          </Button>
          <motion.span
            key={count}
            initial={{ scale: 1.5 }}
            animate={{ scale: 1 }}
            style={{ fontSize: 48, fontWeight: 900, color: meal.accentColor, minWidth: 70, textAlign: 'center' }}
          >
            {count}
          </motion.span>
          <Button variant="primary" size="lg" onClick={() => setCount(Math.min(8, count + 1))} disabled={count >= 8}>
            +
          </Button>
        </div>

        <p style={{ fontSize: 14, color: '#888', margin: 0, fontWeight: 500 }}>{sizeLabel}</p>

        <Button size="lg" onClick={handleStart}>
          {t.family.startButton}
        </Button>
      </motion.div>
    </motion.div>
  );
};
