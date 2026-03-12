import type { ReactElement } from 'react';
import { motion } from 'framer-motion';
import type { PlacedIngredient } from '../../../types';

interface Props {
  slices: number;
  placedIngredients?: PlacedIngredient[];
}

// Seeded PRNG (FNV-1a inspired)
function srng(seed: string, n: number): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 16777619) >>> 0;
  }
  h = Math.imul((h ^ (n * 2654435761)) >>> 0, 2246822519) >>> 0;
  return (h >>> 0) / 4294967295;
}

const GOLDEN_ANGLE = 2.399963229; // 2π/φ² — sunflower spiral

// Evenly-distributed point using golden angle spiral (uniform per-slice coverage)
function goldenPoint(instanceId: string, idx: number, total: number, R: number) {
  const phase = srng(instanceId, 999) * Math.PI * 2;
  const angle = phase + idx * GOLDEN_ANGLE;
  const r = Math.sqrt((idx + 0.5) / total) * R;
  const rJitter = 1 + (srng(instanceId, idx * 3 + 1) - 0.5) * 0.24;
  const aJitter = (srng(instanceId, idx * 3 + 2) - 0.5) * 0.3;
  return { x: r * rJitter * Math.cos(angle + aJitter), y: r * rJitter * Math.sin(angle + aJitter) };
}

const TOPPING_COUNT: Record<string, number> = {
  pepperoni: 9, mushroom: 7, olive: 8, bell_pepper: 6,
  cheese: 5, tomato_slice: 7, pineapple: 7, jalapeno: 6,
  basil: 8, sausage: 8, onion: 5,
};

function ToppingShape({ id }: { id: string }) {
  switch (id) {
    case 'pepperoni':
      return <>
        <circle r={9} fill="#c0392b" />
        <circle r={9} fill="none" stroke="#7B241C" strokeWidth="1.5" />
        <circle cx={-3} cy={-3} r={1.5} fill="#7B241C" opacity={0.65} />
        <circle cx={2.5} cy={2.5} r={1.5} fill="#7B241C" opacity={0.65} />
        <circle cx={4} cy={-4.5} r={1} fill="#7B241C" opacity={0.65} />
      </>;
    case 'mushroom':
      return <>
        <rect x={-2.5} y={1} width={5} height={6} rx={1.5} fill="#A1887F" />
        <ellipse cx={0} cy={0} rx={9} ry={5.5} fill="#6D4C41" />
        <ellipse cx={0} cy={-1.5} rx={6} ry={3} fill="#8D6E63" opacity={0.45} />
      </>;
    case 'olive':
      return <>
        <circle r={8} fill="#1B2631" />
        <circle r={3.5} fill="#27ae60" />
        <circle r={1} fill="#1B2631" />
      </>;
    case 'bell_pepper':
      return <>
        <ellipse rx={11} ry={5} fill="#27ae60" />
        <ellipse rx={8} ry={3} fill="#2ecc71" opacity={0.55} />
        <line x1={-8} y1={0} x2={8} y2={0} stroke="#1a8c3e" strokeWidth="0.8" opacity={0.4} />
      </>;
    case 'cheese':
      return <>
        <ellipse rx={14} ry={8} fill="#f1c40f" opacity={0.88} />
        <ellipse rx={9} ry={5} fill="#f39c12" opacity={0.4} />
      </>;
    case 'tomato_slice':
      return <>
        <circle r={9} fill="#e74c3c" />
        <circle r={8.5} fill="none" stroke="#c0392b" strokeWidth="1" />
        <ellipse cx={0} cy={-4} rx={1.5} ry={2.5} fill="#f1948a" />
        <ellipse cx={3.5} cy={2.5} rx={1.5} ry={2.5} fill="#f1948a" transform="rotate(60 3.5 2.5)" />
        <ellipse cx={-3.5} cy={2.5} rx={1.5} ry={2.5} fill="#f1948a" transform="rotate(-60 -3.5 2.5)" />
      </>;
    case 'pineapple':
      return <>
        <rect x={-7} y={-7} width={14} height={14} rx={2} fill="#f1c40f" transform="rotate(45 0 0)" />
        <circle cx={0} cy={-3.5} r={2} fill="#e67e22" opacity={0.65} />
        <circle cx={-3} cy={2} r={2} fill="#e67e22" opacity={0.65} />
        <circle cx={3} cy={2} r={2} fill="#e67e22" opacity={0.65} />
      </>;
    case 'jalapeno':
      return <>
        <ellipse rx={5} ry={11} fill="#27ae60" />
        <ellipse rx={3} ry={7} fill="#2ecc71" opacity={0.55} />
        <ellipse cy={-8} rx={2.5} ry={2.5} fill="#27ae60" />
      </>;
    case 'basil':
      return <>
        <ellipse rx={7} ry={10} fill="#2d8a2d" />
        <line x1={0} y1={-9} x2={0} y2={8} stroke="#1a5c1a" strokeWidth="1" />
        <line x1={-5} y1={-2} x2={5} y2={-2} stroke="#1a5c1a" strokeWidth="0.7" opacity={0.6} />
        <line x1={-4} y1={2.5} x2={4} y2={2.5} stroke="#1a5c1a" strokeWidth="0.7" opacity={0.6} />
      </>;
    case 'sausage':
      return <>
        <ellipse rx={10} ry={7} fill="#784212" />
        <ellipse rx={7} ry={4.5} fill="#a04000" opacity={0.6} />
        <ellipse rx={3} ry={2} fill="#c0392b" opacity={0.35} />
      </>;
    case 'onion':
      return <>
        <ellipse rx={9} ry={5.5} fill="#f0e6ff" stroke="#9b59b6" strokeWidth="1.5" />
        <ellipse rx={5.5} ry={3} fill="none" stroke="#9b59b6" strokeWidth="0.9" opacity={0.55} />
      </>;
    default:
      return <circle r={7} fill="#888" opacity={0.6} />;
  }
}

const TOPPING_AREA_R = 107;

export const PizzaBase = ({ slices, placedIngredients = [] }: Props) => {
  const cx = 150, cy = 150, r = 130;

  const sliceLines = Array.from({ length: slices }, (_, i) => {
    const angle = (i / slices) * Math.PI * 2 - Math.PI / 2;
    return (
      <line
        key={i} x1={cx} y1={cy}
        x2={cx + r * Math.cos(angle)} y2={cy + r * Math.sin(angle)}
        stroke="#c0392b" strokeWidth="2" strokeDasharray="6 3" opacity="0.7"
      />
    );
  });

  const toppingEls: ReactElement[] = [];
  placedIngredients.forEach((item) => {
    const count = TOPPING_COUNT[item.ingredientId] ?? 6;
    for (let i = 0; i < count; i++) {
      const pt = goldenPoint(item.instanceId, i, count, TOPPING_AREA_R);
      const rot = srng(item.instanceId, i * 2 + 77) * 360;
      toppingEls.push(
        <g
          key={`${item.instanceId}-${i}`}
          transform={`translate(${cx + pt.x} ${cy + pt.y}) rotate(${rot})`}
        >
          <ToppingShape id={item.ingredientId} />
        </g>
      );
    }
  });

  return (
    <motion.svg
      width={300} height={300} viewBox="0 0 300 300"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
    >
      {/* Plate */}
      <circle cx={cx} cy={cy} r={148} fill="#e8e0d8" />
      <circle cx={cx} cy={cy} r={143} fill="#f5ede3" stroke="#d5c9bc" strokeWidth="2" />
      {/* Sauce */}
      <circle cx={cx} cy={cy} r={r} fill="#e74c3c" />
      {/* Cheese base */}
      <circle cx={cx} cy={cy} r={r - 4} fill="#f1c40f" opacity="0.9" />
      {/* Scattered toppings */}
      {toppingEls}
      {/* Crust (rendered on top so toppings don't bleed onto crust) */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#d4a96a" strokeWidth="18" />
      {Array.from({ length: 20 }, (_, i) => {
        const a = (i / 20) * Math.PI * 2;
        return <circle key={i} cx={cx + (r + 2) * Math.cos(a)} cy={cy + (r + 2) * Math.sin(a)} r={3} fill="#c9916a" opacity="0.6" />;
      })}
      {/* Slice dividers */}
      {sliceLines}
      {/* Plate rim highlight */}
      <circle cx={cx} cy={cy} r={147} fill="none" stroke="white" strokeWidth="3" opacity="0.4" />
    </motion.svg>
  );
};
