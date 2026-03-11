import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChefCharacter } from '../Chef/ChefCharacter';
import { Button } from './Button';
import { useGameStore } from '../../store/gameStore';
import { getMealInfo } from '../../data/meals';
import { useT } from '../../i18n/useT';
import { useSpeech } from '../../hooks/useSpeech';

const CONFETTI_COLORS = ['#ff6b35','#f1c40f','#2ecc71','#3498db','#e74c3c','#9b59b6','#ff9ff3'];

const Confetti = ({ count = 40 }: { count?: number }) => {
  const pieces = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    size: 6 + Math.random() * 10,
    duration: 2 + Math.random() * 2,
    delay: Math.random() * 1.5,
    rotate: Math.random() * 360,
  }));

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      {pieces.map(p => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: p.rotate }}
          animate={{ y: '110vh', opacity: [1, 1, 0], rotate: p.rotate + 720 }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', width: p.size, height: p.size * 0.6, background: p.color, borderRadius: 2, top: 0 }}
        />
      ))}
    </div>
  );
};

export const CelebrationScreen = () => {
  const { score, correctAnswers, selectedMeal, reset, setPhase, placedIngredients } = useGameStore();
  const t = useT();
  const { speak } = useSpeech();

  useEffect(() => {
    if (!selectedMeal) return;
    const meal = getMealInfo(selectedMeal);
    speak(`${t.celebration.title}. ${t.celebration.subtitle(meal.emoji, t.meals[selectedMeal].name)}`);
  }, [t]);

  if (!selectedMeal) return null;
  const meal = getMealInfo(selectedMeal);
  const mealName = t.meals[selectedMeal].name;

  const stars = score >= 50 ? 3 : score >= 30 ? 2 : 1;
  const medal = score >= 50 ? '🥇' : score >= 30 ? '🥈' : '🥉';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: 24, position: 'relative', overflow: 'hidden',
      }}
    >
      <Confetti />

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
        style={{
          background: 'white', borderRadius: 28, padding: '32px 28px',
          maxWidth: 360, width: '100%', textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)', zIndex: 1,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
        }}
      >
        <ChefCharacter emotion="cheering" size={110} />

        <motion.h1
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ fontSize: 28, fontWeight: 900, color: '#2c3e50', margin: 0 }}
        >
          {t.celebration.title} {medal}
        </motion.h1>

        <p style={{ color: '#666', margin: 0, fontSize: 15, lineHeight: 1.5 }}>
          {t.celebration.subtitle(meal.emoji, mealName)}
        </p>

        {/* Stars */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          {[1, 2, 3].map(n => (
            <motion.span
              key={n}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: n <= stars ? 1 : 0.4, rotate: 0 }}
              transition={{ delay: 0.4 + n * 0.2, type: 'spring', stiffness: 300 }}
              style={{ fontSize: 40, opacity: n <= stars ? 1 : 0.25 }}
            >
              ⭐
            </motion.span>
          ))}
        </div>

        {/* Score stats */}
        <div style={{ background: '#f8f9fa', borderRadius: 16, padding: '14px 24px', display: 'flex', gap: 24 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 32, fontWeight: 900, color: '#f39c12' }}>{score}</div>
            <div style={{ fontSize: 12, color: '#888', fontWeight: 600 }}>{t.celebration.points}</div>
          </div>
          <div style={{ width: 2, background: '#e0e0e0', borderRadius: 2 }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 32, fontWeight: 900, color: '#27ae60' }}>{correctAnswers}</div>
            <div style={{ fontSize: 12, color: '#888', fontWeight: 600 }}>{t.celebration.correct}</div>
          </div>
          <div style={{ width: 2, background: '#e0e0e0', borderRadius: 2 }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 32, fontWeight: 900, color: '#3498db' }}>{placedIngredients.length}</div>
            <div style={{ fontSize: 12, color: '#888', fontWeight: 600 }}>{t.celebration.ingredients}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <Button
            variant="secondary"
            onClick={() => { setPhase('mealSelect'); setTimeout(reset, 50); }}
          >
            {t.celebration.newMeal}
          </Button>
          <Button
            variant="success"
            onClick={() => { setPhase('welcome'); setTimeout(reset, 50); }}
          >
            {t.celebration.playAgain}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};
