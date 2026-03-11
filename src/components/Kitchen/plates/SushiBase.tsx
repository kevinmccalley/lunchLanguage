import { motion } from 'framer-motion';

export const SushiBase = () => {
  // 6 sushi pieces arranged in 2 rows
  const pieces = [
    { x: 60, y: 80 }, { x: 140, y: 80 }, { x: 220, y: 80 },
    { x: 60, y: 150 }, { x: 140, y: 150 }, { x: 220, y: 150 },
  ];

  return (
    <motion.svg
      width={300}
      height={240}
      viewBox="0 0 300 240"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
    >
      {/* Plate */}
      <rect x={10} y={30} width={280} height={200} rx={20} fill="#1a252f" />
      <rect x={14} y={34} width={272} height={192} rx={18} fill="#212f3d" />

      {/* Plate highlight */}
      <rect x={20} y={40} width={80} height={12} rx={6} fill="rgba(255,255,255,0.08)" />

      {/* Sushi pieces */}
      {pieces.map((p, i) => (
        <motion.g
          key={i}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          {/* Seaweed wrap */}
          <rect x={p.x - 26} y={p.y - 20} width={52} height={38} rx={6} fill="#1a5276" />
          {/* Rice */}
          <rect x={p.x - 22} y={p.y - 17} width={44} height={32} rx={4} fill="#fdfefe" />
          {/* Topping */}
          <ellipse
            cx={p.x}
            cy={p.y - 10}
            rx={18}
            ry={10}
            fill={['#f1948a','#e74c3c','#f39c12','#f1948a','#fdfefe','#2ecc71'][i]}
            opacity="0.95"
          />
          {/* Seaweed stripe */}
          <rect x={p.x - 26} y={p.y + 4} width={52} height={6} rx={2} fill="#1a5276" opacity="0.6" />
        </motion.g>
      ))}

      {/* Chopsticks */}
      <line x1={260} y1={40} x2={290} y2={230} stroke="#c9916a" strokeWidth="6" strokeLinecap="round" />
      <line x1={272} y1={40} x2={298} y2={230} stroke="#d4a96a" strokeWidth="5" strokeLinecap="round" />
    </motion.svg>
  );
};
