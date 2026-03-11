import { motion } from 'framer-motion';

interface Props { slices: number }

export const PizzaBase = ({ slices }: Props) => {
  const r = 130;
  const cx = 150;
  const cy = 150;

  // Build slice divider lines
  const sliceLines = [];
  for (let i = 0; i < slices; i++) {
    const angle = (i / slices) * Math.PI * 2 - Math.PI / 2;
    sliceLines.push(
      <line
        key={i}
        x1={cx}
        y1={cy}
        x2={cx + r * Math.cos(angle)}
        y2={cy + r * Math.sin(angle)}
        stroke="#c0392b"
        strokeWidth="2"
        strokeDasharray="6 3"
        opacity="0.7"
      />
    );
  }

  return (
    <motion.svg
      width={300}
      height={300}
      viewBox="0 0 300 300"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
    >
      {/* Plate */}
      <circle cx={cx} cy={cy} r={148} fill="#e8e0d8" />
      <circle cx={cx} cy={cy} r={143} fill="#f5ede3" stroke="#d5c9bc" strokeWidth="2" />

      {/* Sauce */}
      <circle cx={cx} cy={cy} r={r} fill="#e74c3c" />

      {/* Cheese */}
      <circle cx={cx} cy={cy} r={r - 4} fill="#f1c40f" opacity="0.9" />

      {/* Crust ring */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#d4a96a" strokeWidth="18" />

      {/* Crust texture */}
      {Array.from({ length: 20 }).map((_, i) => {
        const a = (i / 20) * Math.PI * 2;
        return (
          <circle
            key={i}
            cx={cx + (r + 2) * Math.cos(a)}
            cy={cy + (r + 2) * Math.sin(a)}
            r={3}
            fill="#c9916a"
            opacity="0.6"
          />
        );
      })}

      {/* Slice dividers */}
      {sliceLines}

      {/* Plate rim highlight */}
      <circle cx={cx} cy={cy} r={147} fill="none" stroke="white" strokeWidth="3" opacity="0.4" />
    </motion.svg>
  );
};
