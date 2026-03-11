import { motion } from 'framer-motion';

export const BurritoBase = () => (
  <motion.svg
    width={300}
    height={200}
    viewBox="0 0 300 200"
    initial={{ scale: 0, rotate: -10 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ type: 'spring', stiffness: 200, damping: 18 }}
  >
    {/* Plate */}
    <ellipse cx={150} cy={185} rx={140} ry={18} fill="#e8e0d8" />
    <ellipse cx={150} cy={180} rx={138} ry={14} fill="#f5ede3" stroke="#d5c9bc" strokeWidth="2" />

    {/* Tortilla wrap */}
    <ellipse cx={150} cy={110} rx={135} ry={60} fill="#f5deb3" />

    {/* Wrap fold lines */}
    <path d="M30 95 Q75 80 150 88 Q225 80 270 95" fill="none" stroke="#e8c589" strokeWidth="3" opacity="0.8"/>
    <path d="M30 120 Q75 108 150 114 Q225 108 270 120" fill="none" stroke="#e8c589" strokeWidth="3" opacity="0.8"/>

    {/* Left end fold */}
    <ellipse cx={30} cy={110} rx={20} ry={55} fill="#e8c589" />
    <ellipse cx={30} cy={110} rx={14} ry={45} fill="#f5deb3" />

    {/* Right end fold */}
    <ellipse cx={270} cy={110} rx={20} ry={55} fill="#e8c589" />
    <ellipse cx={270} cy={110} rx={14} ry={45} fill="#f5deb3" />

    {/* Filling peek in center */}
    <ellipse cx={150} cy={108} rx={70} ry={26} fill="#c0392b" opacity="0.7"/>
    <ellipse cx={150} cy={110} rx={60} ry={20} fill="#27ae60" opacity="0.6"/>
    <ellipse cx={150} cy={112} rx={48} ry={14} fill="#f1c40f" opacity="0.6"/>

    {/* Shine */}
    <ellipse cx={110} cy={88} rx={28} ry={10} fill="white" opacity="0.2" transform="rotate(-8 110 88)"/>
  </motion.svg>
);
