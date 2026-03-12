import type { ReactElement } from 'react';
import { motion } from 'framer-motion';
import type { PlacedIngredient } from '../../types';

// Seeded PRNG (FNV-1a inspired) — same as PizzaBase
function srng(seed: string, n: number): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 16777619) >>> 0;
  }
  h = Math.imul((h ^ (n * 2654435761)) >>> 0, 2246822519) >>> 0;
  return (h >>> 0) / 4294967295;
}

// How many scattered pieces to render per ingredient instance
const FILL_COUNT: Record<string, number> = {
  rice: 18, beans: 12, corn: 22, sour_cream: 7,
  guacamole: 9, salsa: 10, chicken: 9, steak: 9,
  cheese: 14, lettuce: 12, bell_pepper: 9, jalapeno: 9,
  onion: 8, avocado: 8,
};

// Scatter within the center fill zone: x[70,230], y[112,158]
function fillPoint(instanceId: string, idx: number) {
  return {
    x: 70 + srng(instanceId, idx * 2) * 160,
    y: 112 + srng(instanceId, idx * 2 + 1) * 46,
  };
}

function BurritoFilling({ id }: { id: string }): ReactElement {
  switch (id) {
    case 'rice':
      return <ellipse rx={4} ry={2.5} fill="#f8f8ed" stroke="#d0d0b8" strokeWidth="0.5" />;

    case 'beans':
      return <>
        <ellipse rx={5} ry={3.5} fill="#3d2b1f" />
        <ellipse cy={-0.5} rx={3} ry={1.5} fill="#5a3e2f" opacity={0.6} />
      </>;

    case 'corn':
      return <circle r={2.5} fill="#f5c518" stroke="#d4a900" strokeWidth="0.5" />;

    case 'sour_cream':
      return <>
        <ellipse rx={9} ry={5.5} fill="white" opacity={0.9} stroke="#ede0d4" strokeWidth="0.8" />
        <ellipse rx={5} ry={3} fill="white" opacity={0.45} />
      </>;

    case 'guacamole':
      return <>
        <ellipse rx={8} ry={5.5} fill="#5a8a3c" />
        <ellipse cx={1} cy={-1} rx={5} ry={3} fill="#7ab84a" opacity={0.6} />
      </>;

    case 'salsa':
      return <>
        <circle r={6.5} fill="#b83224" opacity={0.88} />
        <circle cx={-2.5} cy={-2} r={1.8} fill="#e74c3c" opacity={0.75} />
        <circle cx={3} cy={2} r={1.2} fill="#e8623a" opacity={0.7} />
        <circle cx={-0.5} cy={3} r={0.9} fill="#f0d060" opacity={0.8} />
        <circle cx={2.5} cy={-2.5} r={0.7} fill="#f0d060" opacity={0.65} />
      </>;

    case 'chicken':
      return <>
        <ellipse rx={9} ry={3.5} fill="#d4a96a" />
        <ellipse rx={6} ry={2} fill="#e8c080" opacity={0.5} />
        <line x1={-6} y1={0} x2={6} y2={0} stroke="#b8893a" strokeWidth="0.7" opacity={0.4} />
      </>;

    case 'steak':
      return <>
        <ellipse rx={7} ry={5} fill="#5d3010" />
        <ellipse cy={-1} rx={5} ry={3} fill="#7a4020" opacity={0.65} />
        <ellipse rx={2.5} ry={1.5} fill="#c0392b" opacity={0.3} />
        <ellipse cx={3} cy={2} rx={1.5} ry={1} fill="#9b3010" opacity={0.4} />
      </>;

    case 'cheese':
      // shredded cheddar strands
      return <>
        <rect x={-9} y={-1.5} width={18} height={3} rx={1.5} fill="#f39c12" opacity={0.92} />
        <rect x={-6} y={-4.5} width={12} height={2.5} rx={1.2} fill="#f1c40f" opacity={0.8} transform="rotate(22)" />
        <rect x={-5} y={2} width={10} height={2.5} rx={1.2} fill="#e67e22" opacity={0.75} transform="rotate(-18)" />
        <rect x={-3} y={-7} width={8} height={2} rx={1} fill="#f39c12" opacity={0.6} transform="rotate(38)" />
      </>;

    case 'lettuce':
      return <>
        <ellipse rx={10} ry={3.5} fill="#3a9a3a" opacity={0.88} />
        <ellipse rx={7} ry={2} fill="#5cb85c" opacity={0.5} />
      </>;

    case 'bell_pepper':
      return <rect x={-8} y={-2.5} width={16} height={5} rx={2.5} fill="#27ae60" opacity={0.9} />;

    case 'jalapeno':
      return <>
        <ellipse rx={8} ry={3} fill="#2e7d32" />
        <ellipse rx={5.5} ry={2} fill="#43a047" opacity={0.6} />
        {[-4, 0, 4].map((cx, i) => <circle key={i} cx={cx} cy={0} r={0.8} fill="#1b5e20" opacity={0.5} />)}
      </>;

    case 'onion':
      return <ellipse rx={8} ry={3} fill="#e8d5f5" stroke="#9b59b6" strokeWidth="0.8" opacity={0.85} />;

    case 'avocado':
      return <>
        <ellipse rx={8} ry={5.5} fill="#5a9e3c" />
        <ellipse cx={0.5} cy={-0.5} rx={5} ry={3.5} fill="#8bc34a" opacity={0.55} />
      </>;

    default:
      return <circle r={5} fill="#888" opacity={0.6} />;
  }
}

interface Props {
  placedIngredients: PlacedIngredient[];
  wrapping: boolean;
}

const CX = 150;
const CY = 135;

export const BurritoAssembly = ({ placedIngredients, wrapping }: Props) => {
  const fillEls: ReactElement[] = [];
  placedIngredients.forEach((item) => {
    const count = FILL_COUNT[item.ingredientId] ?? 8;
    for (let i = 0; i < count; i++) {
      const pt = fillPoint(item.instanceId, i);
      const rot = srng(item.instanceId, i * 2 + 99) * 360;
      fillEls.push(
        <g key={`${item.instanceId}-${i}`} transform={`translate(${pt.x} ${pt.y}) rotate(${rot})`}>
          <BurritoFilling id={item.ingredientId} />
        </g>
      );
    }
  });

  return (
    <motion.svg
      width={300} height={270} viewBox="0 0 300 270"
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
    >
      {/* Plate */}
      <ellipse cx={CX} cy={258} rx={135} ry={15} fill="#e8e0d8" />
      <ellipse cx={CX} cy={254} rx={130} ry={12} fill="#f5ede3" stroke="#d5c9bc" strokeWidth="2" />

      {/* Open flat tortilla */}
      <ellipse cx={CX} cy={CY} rx={130} ry={72} fill="#f5deb3" />
      <ellipse cx={CX} cy={CY} rx={124} ry={66} fill="#fae8c0" opacity={0.55} />
      {/* Char / toasted spots */}
      {[[80,118],[205,148],[134,106],[166,157],[97,152],[219,120],[150,165]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx={7} ry={4.5} fill="#c9914a" opacity={0.28}
          transform={`rotate(${i * 30} ${x} ${y})`} />
      ))}
      {/* Fold score lines (suggest tortilla edges when open) */}
      <path d="M22 100 Q75 88 150 94 Q225 88 278 100" fill="none" stroke="#d4a96a" strokeWidth="1.5" opacity={0.4} />
      <path d="M22 170 Q75 182 150 176 Q225 182 278 170" fill="none" stroke="#d4a96a" strokeWidth="1.5" opacity={0.4} />

      {/* Ingredient fills — fades out as wrapping begins */}
      <motion.g
        animate={{ opacity: wrapping ? 0 : 1 }}
        transition={wrapping ? { delay: 0.15, duration: 0.25 } : { duration: 0.1 }}
        initial={false}
      >
        {fillEls}
      </motion.g>

      {/* Left fold flap — slides rightward from left edge */}
      <motion.g
        animate={{ x: wrapping ? 108 : 0, opacity: wrapping ? 1 : 0 }}
        transition={wrapping ? { delay: 0.08, duration: 0.5, ease: [0.4, 0, 0.8, 1] } : { duration: 0.1 }}
        initial={false}
      >
        <ellipse cx={72} cy={CY} rx={88} ry={72} fill="#e8c589" />
        <ellipse cx={72} cy={CY} rx={72} ry={66} fill="#f0d49a" opacity={0.85} />
        <ellipse cx={72} cy={CY} rx={52} ry={54} fill="#f5e2b5" opacity={0.4} />
      </motion.g>

      {/* Right fold flap — slides leftward from right edge */}
      <motion.g
        animate={{ x: wrapping ? -108 : 0, opacity: wrapping ? 1 : 0 }}
        transition={wrapping ? { delay: 0.08, duration: 0.5, ease: [0.4, 0, 0.8, 1] } : { duration: 0.1 }}
        initial={false}
      >
        <ellipse cx={228} cy={CY} rx={88} ry={72} fill="#e8c589" />
        <ellipse cx={228} cy={CY} rx={72} ry={66} fill="#f0d49a" opacity={0.85} />
        <ellipse cx={228} cy={CY} rx={52} ry={54} fill="#f5e2b5" opacity={0.4} />
      </motion.g>

      {/* Wrapped burrito result — fades in once flaps have met */}
      <motion.g
        animate={{ opacity: wrapping ? 1 : 0 }}
        transition={wrapping ? { delay: 0.7, duration: 0.45 } : { duration: 0.1 }}
        initial={false}
      >
        <ellipse cx={CX} cy={CY} rx={130} ry={62} fill="#f0d49a" />
        {/* Roll / fold lines */}
        <path d="M28 101 Q76 87 150 94 Q224 87 272 101" fill="none" stroke="#c9914a" strokeWidth="3" opacity={0.8} />
        <path d="M28 130 Q76 116 150 123 Q224 116 272 130" fill="none" stroke="#c9914a" strokeWidth="3" opacity={0.8} />
        <path d="M28 159 Q76 145 150 152 Q224 145 272 159" fill="none" stroke="#c9914a" strokeWidth="2.5" opacity={0.65} />
        {/* Filling peeking through center */}
        <ellipse cx={CX} cy={CY} rx={68} ry={28} fill="#b83224" opacity={0.6} />
        <ellipse cx={CX} cy={CY + 5} rx={55} ry={20} fill="#4a8a3c" opacity={0.55} />
        <ellipse cx={CX} cy={CY + 9} rx={42} ry={13} fill="#f1c40f" opacity={0.5} />
        {/* End caps */}
        <ellipse cx={28} cy={CY} rx={28} ry={62} fill="#c9914a" />
        <ellipse cx={28} cy={CY} rx={20} ry={54} fill="#e8c589" />
        <ellipse cx={272} cy={CY} rx={28} ry={62} fill="#c9914a" />
        <ellipse cx={272} cy={CY} rx={20} ry={54} fill="#e8c589" />
        {/* Shine */}
        <ellipse cx={108} cy={106} rx={32} ry={11} fill="white" opacity={0.2} transform="rotate(-10 108 106)" />
      </motion.g>
    </motion.svg>
  );
};
