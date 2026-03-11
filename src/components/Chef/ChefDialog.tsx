import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefCharacter } from './ChefCharacter';
import { useGameStore } from '../../store/gameStore';
import { useSpeech } from '../../hooks/useSpeech';

interface Props {
  compact?: boolean;
}

export const ChefDialog = ({ compact = false }: Props) => {
  const { chefMessage, chefEmotion } = useGameStore();
  const { speak } = useSpeech();

  useEffect(() => {
    if (chefMessage) speak(chefMessage);
  }, [chefMessage]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 12,
        padding: compact ? '8px 12px' : '12px 16px',
      }}
    >
      <ChefCharacter emotion={chefEmotion} size={compact ? 70 : 100} />

      <AnimatePresence mode="wait">
        <motion.div
          key={chefMessage}
          initial={{ opacity: 0, scale: 0.85, x: -10 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.85, x: -10 }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 260, damping: 20 }}
          style={{
            background: 'white',
            borderRadius: 16,
            padding: compact ? '10px 14px' : '14px 18px',
            maxWidth: 320,
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
            border: '2px solid #ff6b35',
            position: 'relative',
            fontSize: compact ? 13 : 15,
            lineHeight: 1.5,
            color: '#2c2c2c',
            fontWeight: 500,
          }}
        >
          {/* Speech bubble tail */}
          <div
            style={{
              position: 'absolute',
              left: -12,
              bottom: 18,
              width: 0,
              height: 0,
              borderTop: '8px solid transparent',
              borderBottom: '8px solid transparent',
              borderRight: '14px solid #ff6b35',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: -9,
              bottom: 19,
              width: 0,
              height: 0,
              borderTop: '7px solid transparent',
              borderBottom: '7px solid transparent',
              borderRight: '13px solid white',
            }}
          />
          {chefMessage}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
