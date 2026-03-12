import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChefCharacter } from '../Chef/ChefCharacter';
import { Button } from './Button';
import { LearningTooltip } from './LearningTooltip';
import { useGameStore } from '../../store/gameStore';
import { useT } from '../../i18n/useT';
import { useSpeech } from '../../hooks/useSpeech';
import type { MealType } from '../../types';

// Same order as t.welcome.mealBadges
const BADGE_MEAL_IDS: MealType[] = ['pizza', 'hamburger', 'salad', 'sushi', 'burrito', 'sandwich'];

const FLOATING_FOOD = ['🍕','🍔','🌯','🥗','🍱','🥪','🍅','🧀','🥬','🍄','🫒','🥕','🌽'];

export const WelcomeScreen = () => {
  const { setPhase, setChefMessage } = useGameStore();
  const t = useT();
  const { speak } = useSpeech();

  // Set translated greeting and speak title/subtitle whenever this screen mounts or language changes
  useEffect(() => {
    setChefMessage(t.chef.greeting, 'happy');
    speak(`${t.welcome.title}. ${t.welcome.subtitle}`);
  }, [t]);

  const handleStart = () => {
    setChefMessage(t.welcome.pickMessage, 'excited');
    setPhase('mealSelect');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Floating food emojis */}
      {FLOATING_FOOD.map((food, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            fontSize: 28 + (i % 3) * 10,
            opacity: 0.18,
            left: `${(i * 73 + 10) % 90}%`,
            top: `${(i * 53 + 5) % 90}%`,
          }}
          animate={{ y: [0, -20, 0], rotate: [0, (i % 2 === 0 ? 15 : -15), 0] }}
          transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
        >
          {food}
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.2 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, zIndex: 1 }}
      >
        <ChefCharacter emotion="excited" size={140} />

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            fontSize: 38, fontWeight: 900, color: 'white', textAlign: 'center', margin: 0,
            textShadow: '0 3px 12px rgba(0,0,0,0.3)', lineHeight: 1.15,
          }}
        >
          {t.welcome.title}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.65 }}
          style={{
            fontSize: 17, color: 'rgba(255,255,255,0.9)', textAlign: 'center', margin: 0,
            maxWidth: 300, lineHeight: 1.5, fontWeight: 500,
          }}
        >
          {t.welcome.subtitle}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {t.welcome.mealBadges.map((label, i) => (
            <LearningTooltip key={label} mealId={BADGE_MEAL_IDS[i]} nativeWord={t.meals[BADGE_MEAL_IDS[i]].name}>
              <span
                style={{
                  background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '4px 12px',
                  fontSize: 12, color: 'white', fontWeight: 600,
                  border: '1px solid rgba(255,255,255,0.25)',
                  cursor: 'default',
                }}
              >
                {label}
              </span>
            </LearningTooltip>
          ))}
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Button size="lg" onClick={handleStart}>
            {t.welcome.startButton}
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
