import { motion } from 'framer-motion';

export const HamburgerBase = () => (
  <motion.svg
    width={280}
    height={220}
    viewBox="0 0 280 220"
    initial={{ scale: 0, y: 30 }}
    animate={{ scale: 1, y: 0 }}
    transition={{ type: 'spring', stiffness: 200, damping: 18 }}
  >
    {/* Plate */}
    <ellipse cx={140} cy={195} rx={130} ry={22} fill="#e8e0d8" />
    <ellipse cx={140} cy={192} rx={128} ry={18} fill="#f5ede3" stroke="#d5c9bc" strokeWidth="2" />

    {/* Bottom bun */}
    <ellipse cx={140} cy={170} rx={100} ry={25} fill="#d4a96a" />
    <ellipse cx={140} cy={155} rx={100} ry={18} fill="#e8c589" />

    {/* Patty area */}
    <rect x={42} y={130} width={196} height={30} rx={8} fill="#784212" />
    <rect x={42} y={130} width={196} height={16} rx={8} fill="#8B4513" />

    {/* Lettuce peek */}
    <path d="M30 128 Q60 110 90 125 Q120 108 150 124 Q180 108 210 124 Q240 110 260 128"
      fill="#27ae60" />

    {/* Top bun */}
    <ellipse cx={140} cy={112} rx={105} ry={52} fill="#d4a96a" />
    <ellipse cx={140} cy={95} rx={100} ry={40} fill="#e8c589" />
    {/* Sesame seeds */}
    {[[115,85],[140,78],[162,82],[128,95],[152,95],[138,105]].map(([x,y],i) => (
      <ellipse key={i} cx={x} cy={y} rx={4} ry={2.5} fill="#c9916a" transform={`rotate(${i*25} ${x} ${y})`} />
    ))}
    {/* Shine */}
    <ellipse cx={120} cy={85} rx={22} ry={10} fill="white" opacity="0.2" transform="rotate(-20 120 85)" />
  </motion.svg>
);
