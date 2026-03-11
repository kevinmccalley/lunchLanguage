import { motion } from 'framer-motion';

export const SaladBase = () => (
  <motion.svg
    width={280}
    height={220}
    viewBox="0 0 280 220"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: 'spring', stiffness: 200, damping: 18 }}
  >
    {/* Bowl shadow */}
    <ellipse cx={140} cy={210} rx={120} ry={12} fill="rgba(0,0,0,0.08)" />

    {/* Bowl outer */}
    <path d="M20 110 Q20 200 140 200 Q260 200 260 110 Z" fill="#e0d5c8" />
    {/* Bowl inner */}
    <path d="M30 110 Q30 190 140 190 Q250 190 250 110 Z" fill="#f8f4f0" />

    {/* Bowl rim */}
    <ellipse cx={140} cy={110} rx={120} ry={22} fill="#e8e0d5" stroke="#d5c9bc" strokeWidth="3" />
    <ellipse cx={140} cy={108} rx={116} ry={18} fill="#f0e8e0" />

    {/* Salad base leaves */}
    <ellipse cx={140} cy={145} rx={95} ry={38} fill="#2ecc71" opacity="0.85" />
    {[
      [80,130],[110,120],[140,118],[170,120],[200,130],
      [90,145],[160,142],[140,155],[115,150],[165,150],
    ].map(([x, y], i) => (
      <ellipse
        key={i}
        cx={x}
        cy={y}
        rx={22}
        ry={12}
        fill={i % 2 === 0 ? '#27ae60' : '#58d68d'}
        transform={`rotate(${(i * 37) % 180 - 60} ${x} ${y})`}
        opacity="0.9"
      />
    ))}

    {/* Bowl highlight */}
    <path d="M35 108 Q80 96 140 94 Q200 96 245 108"
      fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
  </motion.svg>
);
