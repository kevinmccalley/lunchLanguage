import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import type { GameState } from '../../types';

interface Props {
  emotion: GameState['chefEmotion'];
  size?: number;
}

export const ChefCharacter = ({ emotion, size = 120 }: Props) => {
  const bodyControls = useAnimation();
  const armControls = useAnimation();
  const eyeControls = useAnimation();

  useEffect(() => {
    switch (emotion) {
      case 'excited':
        bodyControls.start({
          y: [0, -10, 0, -10, 0],
          transition: { duration: 0.8, ease: 'easeInOut' },
        });
        armControls.start({
          rotate: [0, -20, 0, -20, 0],
          transition: { duration: 0.8 },
        });
        break;
      case 'cheering':
        bodyControls.start({
          y: [0, -15, 0],
          rotate: [0, -5, 5, 0],
          transition: { duration: 0.6, repeat: 2 },
        });
        armControls.start({
          rotate: [-60, -120, -60],
          transition: { duration: 0.4, repeat: 4 },
        });
        break;
      case 'thinking':
        bodyControls.start({
          rotate: [-3, 3, -3],
          transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
        });
        break;
      case 'pointing':
        armControls.start({
          rotate: -45,
          transition: { duration: 0.3 },
        });
        break;
      default:
        bodyControls.start({ y: 0, rotate: 0, transition: { duration: 0.3 } });
        armControls.start({ rotate: 0, transition: { duration: 0.3 } });
    }
  }, [emotion, bodyControls, armControls]);

  // Idle breathing animation
  useEffect(() => {
    const idle = async () => {
      if (emotion === 'happy') {
        await bodyControls.start({
          y: [0, -3, 0],
          transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        });
      }
    };
    idle();
  }, [emotion, bodyControls]);

  const blinkEyes = async () => {
    await eyeControls.start({ scaleY: 0.1, transition: { duration: 0.08 } });
    await eyeControls.start({ scaleY: 1, transition: { duration: 0.08 } });
  };

  useEffect(() => {
    const interval = setInterval(blinkEyes, 3500);
    return () => clearInterval(interval);
  }, []);

  const s = size;

  return (
    <motion.div
      animate={bodyControls}
      style={{ display: 'inline-block', width: s, height: s * 1.4 }}
    >
      <svg width={s} height={s * 1.4} viewBox="0 0 120 168" fill="none">
        {/* Chef hat */}
        <motion.g>
          {/* Hat base band */}
          <rect x="28" y="48" width="64" height="12" rx="4" fill="#e8e8e8" />
          {/* Hat top */}
          <rect x="36" y="10" width="48" height="42" rx="8" fill="white" />
          {/* Hat shine */}
          <rect x="44" y="18" width="8" height="20" rx="4" fill="#f0f0f0" opacity="0.6" />
        </motion.g>

        {/* Face */}
        <circle cx="60" cy="80" r="30" fill="#fcd5a8" />

        {/* Cheeks */}
        <circle cx="40" cy="88" r="7" fill="#f9a8a8" opacity="0.5" />
        <circle cx="80" cy="88" r="7" fill="#f9a8a8" opacity="0.5" />

        {/* Eyes */}
        <motion.g animate={eyeControls} style={{ originX: '60px', originY: '75px' }}>
          {emotion === 'cheering' ? (
            <>
              {/* Happy arc eyes */}
              <path d="M48 74 Q52 70 56 74" stroke="#3d2b1f" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              <path d="M64 74 Q68 70 72 74" stroke="#3d2b1f" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            </>
          ) : (
            <>
              <circle cx="50" cy="76" r="5" fill="#3d2b1f" />
              <circle cx="70" cy="76" r="5" fill="#3d2b1f" />
              <circle cx="52" cy="74" r="1.5" fill="white" />
              <circle cx="72" cy="74" r="1.5" fill="white" />
            </>
          )}
        </motion.g>

        {/* Eyebrows */}
        {emotion === 'thinking' ? (
          <>
            <path d="M44 66 Q50 62 56 66" stroke="#3d2b1f" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            <path d="M64 63 Q70 67 76 63" stroke="#3d2b1f" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          </>
        ) : (
          <>
            <path d="M44 68 Q50 64 56 68" stroke="#3d2b1f" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            <path d="M64 68 Q70 64 76 68" stroke="#3d2b1f" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          </>
        )}

        {/* Mouth */}
        {emotion === 'excited' || emotion === 'cheering' ? (
          <path d="M48 90 Q60 100 72 90" stroke="#3d2b1f" strokeWidth="2.5" strokeLinecap="round" fill="#ff8a80" />
        ) : emotion === 'thinking' ? (
          <path d="M50 93 Q60 90 70 93" stroke="#3d2b1f" strokeWidth="2" strokeLinecap="round" fill="none"/>
        ) : (
          <path d="M48 91 Q60 99 72 91" stroke="#3d2b1f" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        )}

        {/* Moustache */}
        <path d="M46 86 Q52 90 58 86 Q60 84 62 86 Q68 90 74 86"
          stroke="#8B4513" strokeWidth="2" fill="none" strokeLinecap="round"/>

        {/* Body / Apron */}
        <rect x="30" y="108" width="60" height="52" rx="12" fill="#ff6b35" />
        {/* Apron */}
        <rect x="40" y="112" width="40" height="44" rx="6" fill="white" opacity="0.9"/>
        {/* Apron pocket */}
        <rect x="48" y="140" width="24" height="14" rx="4" fill="#ffe0d0" stroke="#ff6b35" strokeWidth="1.5"/>

        {/* Left arm */}
        <motion.g animate={armControls} style={{ transformOrigin: '30px 118px' }}>
          <rect x="10" y="108" width="22" height="14" rx="7" fill="#ff6b35" />
          {/* Hand */}
          <circle cx="12" cy="115" r="8" fill="#fcd5a8" />
        </motion.g>

        {/* Right arm — holding spoon */}
        <motion.g
          animate={emotion === 'pointing' ? { rotate: -30 } : { rotate: 0 }}
          style={{ transformOrigin: '90px 118px' }}
          transition={{ duration: 0.3 }}
        >
          <rect x="88" y="108" width="22" height="14" rx="7" fill="#ff6b35" />
          <circle cx="108" cy="115" r="8" fill="#fcd5a8" />
          {/* Spoon */}
          <line x1="108" y1="115" x2="118" y2="90" stroke="#c0c0c0" strokeWidth="2.5" strokeLinecap="round"/>
          <ellipse cx="119" cy="87" rx="5" ry="7" fill="#d0d0d0" />
        </motion.g>

        {/* Legs */}
        <rect x="38" y="154" width="18" height="12" rx="6" fill="#ff6b35" />
        <rect x="64" y="154" width="18" height="12" rx="6" fill="#ff6b35" />
        {/* Shoes */}
        <ellipse cx="47" cy="165" rx="12" ry="6" fill="#3d2b1f" />
        <ellipse cx="73" cy="165" rx="12" ry="6" fill="#3d2b1f" />
      </svg>
    </motion.div>
  );
};
