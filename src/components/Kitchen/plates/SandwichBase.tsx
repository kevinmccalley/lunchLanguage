import { motion } from 'framer-motion';

export const SandwichBase = () => (
  <motion.svg
    width={300}
    height={200}
    viewBox="0 0 300 200"
    initial={{ scale: 0, y: -20 }}
    animate={{ scale: 1, y: 0 }}
    transition={{ type: 'spring', stiffness: 200, damping: 18 }}
  >
    {/* Plate */}
    <ellipse cx={150} cy={188} rx={138} ry={14} fill="#e8e0d8" />
    <ellipse cx={150} cy={184} rx={135} ry={10} fill="#f5ede3" stroke="#d5c9bc" strokeWidth="1.5"/>

    {/* Bottom bread slice */}
    <path d="M30 165 Q30 180 150 180 Q270 180 270 165 L255 148 Q150 160 45 148 Z" fill="#d4a96a" />
    <path d="M45 148 Q150 158 255 148 Q240 140 150 142 Q60 140 45 148 Z" fill="#e8c589" />

    {/* Filling layers */}
    <rect x={48} y={122} width={204} height={14} rx={4} fill="#27ae60" opacity="0.8" />
    <rect x={50} y={110} width={200} height={14} rx={4} fill="#f1c40f" opacity="0.8"/>
    <rect x={48} y={98} width={204} height={14} rx={4} fill="#e8c589" opacity="0.8" />

    {/* Top bread slice */}
    <path d="M40 100 Q40 78 150 72 Q260 78 260 100 L255 114 Q150 105 45 114 Z" fill="#d4a96a" />
    <path d="M42 100 Q42 82 150 76 Q258 82 258 100" fill="none" stroke="#e8c589" strokeWidth="8" strokeLinecap="round"/>

    {/* Crust */}
    <path d="M42 100 L40 114 Q80 106 150 110 Q220 106 260 114 L258 100 Q220 92 150 88 Q80 92 42 100 Z"
      fill="#c9916a" />

    {/* Bread shine */}
    <ellipse cx={110} cy={85} rx={25} ry={8} fill="white" opacity="0.18" transform="rotate(-5 110 85)" />
  </motion.svg>
);
