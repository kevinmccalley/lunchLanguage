import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { useT } from '../../i18n/useT';

export const StarScore = () => {
  const { score, correctAnswers } = useGameStore();
  const t = useT();

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      style={{
        display: 'flex', alignItems: 'center', gap: 8, background: 'white',
        borderRadius: 20, padding: '6px 16px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.1)', border: '2px solid #ffd700',
      }}
    >
      <span style={{ fontSize: 20 }}>⭐</span>
      <span style={{ fontSize: 18, fontWeight: 700, color: '#f39c12' }}>{score}</span>
      {correctAnswers > 0 && (
        <span style={{ fontSize: 13, color: '#7f8c8d', marginLeft: 4 }}>
          {correctAnswers} {t.score.correct}
        </span>
      )}
    </motion.div>
  );
};
