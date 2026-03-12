import type { ReactElement } from 'react';
import { motion } from 'framer-motion';
import type { PlacedIngredient } from '../../types';

function srng(seed: string, n: number): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 16777619) >>> 0;
  }
  h = Math.imul((h ^ (n * 2654435761)) >>> 0, 2246822519) >>> 0;
  return (h >>> 0) / 4294967295;
}

const GOLDEN_ANGLE = 2.399963229;

// Distribute within nori sheet ellipse (rx=88, ry=48, center 150,155)
function noriPoint(instanceId: string, idx: number, total: number) {
  const phase = srng(instanceId, 999) * Math.PI * 2;
  const angle = phase + idx * GOLDEN_ANGLE;
  const r = Math.sqrt((idx + 0.5) / total);
  const rJitter = 1 + (srng(instanceId, idx * 3 + 1) - 0.5) * 0.26;
  const aJitter = (srng(instanceId, idx * 3 + 2) - 0.5) * 0.35;
  return {
    x: 150 + r * rJitter * Math.cos(angle + aJitter) * 88,
    y: 155 + r * rJitter * Math.sin(angle + aJitter) * 48,
  };
}

const FILL_COUNT: Record<string, number> = {
  salmon: 6, tuna: 6, shrimp: 5, avocado: 6, cucumber: 8,
  rice: 20, seaweed: 5, cream_cheese: 5, soy_sauce: 4,
  wasabi: 3, ginger: 7,
};

function SushiFilling({ id }: { id: string }): ReactElement {
  switch (id) {
    case 'salmon':
      return <>
        <ellipse rx={9} ry={5} fill="#f08060" opacity={0.92} />
        <ellipse cx={-1} cy={-1} rx={5} ry={2.5} fill="#f9b89a" opacity={0.5} />
        <line x1={-7} y1={2} x2={7} y2={-1} stroke="#e06040" strokeWidth="0.7" opacity={0.4} />
      </>;
    case 'tuna':
      return <>
        <ellipse rx={9} ry={4.5} fill="#c0392b" opacity={0.9} />
        <ellipse cx={0.5} cy={-1} rx={5} ry={2} fill="#e05040" opacity={0.45} />
      </>;
    case 'shrimp':
      return <>
        <path d="M -6,3 Q -7,-1 -4,-4 Q 0,-7 4,-4 Q 7,-1 6,3 Q 3,6 0,5 Q -3,6 -6,3 Z"
          fill="#f4a460" opacity={0.9} />
        <path d="M -4,-4 Q 0,-6 4,-4" fill="none" stroke="#e07030" strokeWidth="1" opacity={0.5} />
        <circle cx={0} cy={5.5} r={1.5} fill="#f4c08a" opacity={0.6} />
      </>;
    case 'avocado':
      return <>
        <ellipse rx={7} ry={5.5} fill="#5a9e3c" />
        <ellipse cx={0.5} cy={-0.5} rx={4} ry={3} fill="#8bc34a" opacity={0.55} />
        <ellipse cx={0.5} cy={0.5} rx={2} ry={1.5} fill="#d4a940" opacity={0.65} />
      </>;
    case 'cucumber':
      return <>
        <circle r={6} fill="#4caf50" />
        <circle r={4.5} fill="#a5d6a7" opacity={0.7} />
        <circle r={2} fill="#c8e6c9" opacity={0.6} />
        {[-2.5, 0, 2.5].map((x, i) => (
          <line key={i} x1={x} y1={-4} x2={x} y2={4} stroke="#388e3c" strokeWidth="0.5" opacity={0.4} />
        ))}
      </>;
    case 'rice':
      return <ellipse rx={3} ry={2} fill="#fafafa" stroke="#ddd" strokeWidth="0.4" opacity={0.9} />;
    case 'seaweed':
      return <>
        <rect x={-8} y={-3} width={16} height={6} rx={1.5} fill="#1a3a2a" opacity={0.88} />
        <path d="M -6,-1 Q -3,1 0,-1 Q 3,1 6,-1" fill="none" stroke="#2d5a3a" strokeWidth="0.8" opacity={0.5} />
      </>;
    case 'cream_cheese':
      return <>
        <ellipse rx={7} ry={4.5} fill="#faf5ee" stroke="#e8ddd0" strokeWidth="0.8" opacity={0.9} />
        <ellipse cx={0.5} cy={-0.5} rx={4} ry={2.5} fill="white" opacity={0.55} />
      </>;
    case 'soy_sauce':
      return <>
        <path d="M -5,0 Q -2,-4 1,-2 Q 4,0 5,3 Q 2,5 -2,3 Q -5,2 -5,0 Z"
          fill="#2c1a0a" opacity={0.85} />
        <path d="M -3,-1 Q 0,-3 3,-1" fill="none" stroke="#5a3010" strokeWidth="0.8" opacity={0.4} />
      </>;
    case 'wasabi':
      return <>
        <ellipse rx={6} ry={4} fill="#3aaa60" opacity={0.88} />
        <ellipse cx={0.5} cy={-0.5} rx={3.5} ry={2} fill="#5ecf80" opacity={0.5} />
      </>;
    case 'ginger':
      return <>
        <ellipse rx={6} ry={3} fill="#f5b8a8" opacity={0.85} transform="rotate(-20)" />
        <ellipse rx={4} ry={2} fill="#fad0c4" opacity={0.5} transform="rotate(-20)" />
      </>;
    default:
      return <circle r={5} fill="#888" opacity={0.6} />;
  }
}

interface Props { placedIngredients: PlacedIngredient[]; }

export const SushiAssembly = ({ placedIngredients }: Props) => {
  const fillEls: ReactElement[] = [];
  placedIngredients.forEach((item) => {
    const count = FILL_COUNT[item.ingredientId] ?? 6;
    for (let i = 0; i < count; i++) {
      const pt = noriPoint(item.instanceId, i, count);
      const rot = srng(item.instanceId, i * 2 + 77) * 360;
      fillEls.push(
        <g key={`${item.instanceId}-${i}`} transform={`translate(${pt.x} ${pt.y}) rotate(${rot})`}>
          <SushiFilling id={item.ingredientId} />
        </g>
      );
    }
  });

  // Bamboo mat slats
  const SLAT_COUNT = 14;
  const slatEls: ReactElement[] = [];
  for (let i = 0; i < SLAT_COUNT; i++) {
    const y = 88 + i * 16;
    const shade = i % 2 === 0 ? '#c8b860' : '#b8a850';
    slatEls.push(
      <rect key={i} x={26} y={y} width={248} height={15} rx={2} fill={shade} />
    );
  }

  return (
    <motion.svg
      width={300} height={290} viewBox="0 0 300 290"
      initial={{ scale: 0 }} animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
    >
      {/* Bamboo mat shadow */}
      <rect x={30} y={92} width={248} height={196} rx={10} fill="rgba(0,0,0,0.10)" />

      {/* Bamboo mat base */}
      <rect x={26} y={88} width={248} height={196} rx={8} fill="#d4c060" />
      {slatEls}
      {/* Mat string ties */}
      {[60, 150, 240].map((x, i) => (
        <line key={i} x1={x} y1={88} x2={x} y2={284} stroke="#8a7030" strokeWidth="1.5" opacity={0.35} />
      ))}

      {/* Plate / cutting board edge */}
      <rect x={26} y={88} width={248} height={196} rx={8} fill="none" stroke="#a89040" strokeWidth="2" />

      {/* Nori sheet shadow */}
      <rect x={40} y={106} width={222} height={102} rx={6} fill="rgba(0,0,0,0.18)" />

      {/* Nori sheet */}
      <rect x={38} y={104} width={224} height={102} rx={6} fill="#1c2e1c" />
      {/* Nori texture dots */}
      {Array.from({ length: 30 }, (_, i) => {
        const nx = 50 + srng('nori', i * 3) * 200;
        const ny = 110 + srng('nori', i * 3 + 1) * 88;
        return <circle key={i} cx={nx} cy={ny} r={1.2} fill="#2a402a" opacity={0.6} />;
      })}

      {/* Rice base on nori */}
      <rect x={44} y={109} width={212} height={92} rx={4} fill="#f8f5ee" opacity={0.88} />
      {/* Rice grain texture */}
      {Array.from({ length: 60 }, (_, i) => {
        const rx2 = 50 + srng('rice_base', i * 2) * 198;
        const ry2 = 113 + srng('rice_base', i * 2 + 1) * 82;
        return <ellipse key={i} cx={rx2} cy={ry2} rx={3.5} ry={2} fill="white"
          stroke="#e0ddd4" strokeWidth="0.4"
          transform={`rotate(${srng('rice_base', i * 2 + 2) * 180} ${rx2} ${ry2})`}
          opacity={0.7} />;
      })}

      {/* Ingredient scatter — on top of rice */}
      {fillEls}

      {/* Chopsticks */}
      <g transform="translate(0,8)">
        <rect x={34} y={226} width={6} height={52} rx={3} fill="#c8a060" transform="rotate(-8 37 252)" />
        <rect x={46} y={224} width={6} height={54} rx={3} fill="#d4aa70" transform="rotate(-5 49 251)" />
      </g>

      {/* Soy sauce dish (decorative) */}
      <ellipse cx={248} cy={252} rx={28} ry={14} fill="#1a0a00" opacity={0.85} />
      <ellipse cx={248} cy={251} rx={24} ry={11} fill="#2c1a0a" />
      <ellipse cx={246} cy={249} rx={10} ry={5} fill="#3a2010" opacity={0.6} />

      {/* Wasabi smear (decorative) */}
      <ellipse cx={66} cy={252} rx={16} ry={9} fill="#3aaa60" opacity={0.75} />
      <ellipse cx={64} cy={251} rx={9} ry={5} fill="#5ecf80" opacity={0.45} />
    </motion.svg>
  );
};
