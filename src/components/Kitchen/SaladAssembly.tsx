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

// Distribute evenly inside the bowl ellipse (rx=100, ry=46, centered at 150,182)
function bowlPoint(instanceId: string, idx: number, total: number) {
  const phase = srng(instanceId, 999) * Math.PI * 2;
  const angle = phase + idx * GOLDEN_ANGLE;
  const r = Math.sqrt((idx + 0.5) / total);
  const rJitter = 1 + (srng(instanceId, idx * 3 + 1) - 0.5) * 0.28;
  const aJitter = (srng(instanceId, idx * 3 + 2) - 0.5) * 0.35;
  return {
    x: 150 + r * rJitter * Math.cos(angle + aJitter) * 100,
    y: 182 + r * rJitter * Math.sin(angle + aJitter) * 46,
  };
}

const FILL_COUNT: Record<string, number> = {
  lettuce: 14, tomato_slice: 8, cucumber: 10, carrot: 10, cherry_tom: 8,
  croutons: 8, mushroom: 7, olive: 8, bell_pepper: 9, bacon: 8,
  chicken: 8, avocado: 7, beans: 10, corn: 18, radish: 8,
  strawberry: 7, dressing: 6, walnuts: 7, basil: 8, onion: 8,
  spinach: 10, sprouts: 10,
};

function SaladFilling({ id }: { id: string }): ReactElement {
  switch (id) {
    case 'lettuce':
      return <>
        <ellipse rx={11} ry={4} fill="#3a9a3a" opacity={0.9} />
        <ellipse rx={8} ry={2.5} fill="#5cb85c" opacity={0.5} />
      </>;
    case 'spinach':
      return <>
        <ellipse rx={9} ry={5} fill="#2e7d32" opacity={0.9} />
        <line x1={0} y1={-4} x2={0} y2={4} stroke="#1b5e20" strokeWidth="0.8" opacity={0.5} />
      </>;
    case 'tomato_slice':
      return <>
        <circle r={7} fill="#e53935" opacity={0.9} />
        <circle r={6.5} fill="none" stroke="#c62828" strokeWidth="0.8" opacity={0.5} />
        <ellipse cx={0} cy={-3} rx={1.2} ry={2} fill="#ef9a9a" opacity={0.6} />
        <ellipse cx={2.5} cy={2} rx={1.2} ry={2} fill="#ef9a9a" opacity={0.6} transform="rotate(60 2.5 2)" />
      </>;
    case 'cherry_tom':
      return <>
        <circle r={5.5} fill="#e53935" />
        <circle cx={-1.5} cy={-1.5} r={1.5} fill="#ef9a9a" opacity={0.5} />
        <line x1={0} y1={-5.5} x2={0} y2={-8} stroke="#2e7d32" strokeWidth="1.2" />
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
    case 'carrot':
      return <rect x={-8} y={-2} width={16} height={4} rx={2} fill="#f57c00" opacity={0.9} />;
    case 'croutons':
      return <>
        <rect x={-5} y={-5} width={10} height={10} rx={1.5} fill="#c9914a" />
        <rect x={-5} y={-5} width={10} height={5} rx={1.5} fill="#e0b06a" opacity={0.5} />
        <rect x={-5} y={-5} width={5} height={10} rx={1.5} fill="rgba(255,255,255,0.1)" />
      </>;
    case 'mushroom':
      return <>
        <rect x={-2} y={1} width={4} height={5} rx={1} fill="#a1887f" />
        <ellipse cy={0} rx={8} ry={5} fill="#6d4c41" />
        <ellipse cy={-1} rx={5} ry={2.5} fill="#8d6e63" opacity={0.4} />
      </>;
    case 'olive':
      return <>
        <ellipse rx={6} ry={4} fill="#1b2631" />
        <ellipse rx={2.5} ry={1.5} fill="#27ae60" />
      </>;
    case 'bell_pepper':
      return <rect x={-8} y={-2.5} width={16} height={5} rx={2.5} fill="#27ae60" opacity={0.9} />;
    case 'bacon':
      return <>
        <path d="M -8,0 Q -4,-3 0,0 Q 4,3 8,0" fill="none" stroke="#c62828" strokeWidth={4} strokeLinecap="round" />
        <path d="M -8,0 Q -4,-3 0,0 Q 4,3 8,0" fill="none" stroke="#795548" strokeWidth={2} strokeLinecap="round" />
      </>;
    case 'chicken':
      return <>
        <ellipse rx={9} ry={3.5} fill="#d4a96a" />
        <ellipse rx={6} ry={2} fill="#e8c080" opacity={0.5} />
      </>;
    case 'avocado':
      return <>
        <ellipse rx={7} ry={5} fill="#5a9e3c" />
        <ellipse cx={0.5} cy={-0.5} rx={4} ry={3} fill="#8bc34a" opacity={0.55} />
      </>;
    case 'beans':
      return <>
        <ellipse rx={5} ry={3.5} fill="#3d2b1f" />
        <ellipse cy={-0.5} rx={3} ry={1.5} fill="#5a3e2f" opacity={0.6} />
      </>;
    case 'corn':
      return <circle r={2.5} fill="#f5c518" stroke="#d4a900" strokeWidth="0.5" />;
    case 'radish':
      return <>
        <circle r={5.5} fill="#e91e63" opacity={0.85} />
        <circle r={3.5} fill="#f48fb1" opacity={0.5} />
        <line x1={0} y1={-5.5} x2={0} y2={-8} stroke="#2e7d32" strokeWidth="1.2" />
      </>;
    case 'strawberry':
      return <>
        <ellipse rx={5} ry={6} fill="#e53935" />
        <ellipse cy={-2} rx={3.5} ry={2.5} fill="#ef9a9a" opacity={0.45} />
        {[[-1.5,-4],[1.5,-4],[0,-1],[2,1],[-2,1]].map(([cx,cy],i)=>(
          <circle key={i} cx={cx} cy={cy} r={0.6} fill="#fdd835" opacity={0.8} />
        ))}
        <line x1={0} y1={-6} x2={0} y2={-9} stroke="#2e7d32" strokeWidth="1.2" />
      </>;
    case 'dressing':
      return <>
        <path d="M -6,0 Q -3,-3 0,0 Q 3,3 6,0" fill="none" stroke="#f39c12" strokeWidth={3.5} strokeLinecap="round" opacity={0.85} />
      </>;
    case 'walnuts':
      return <>
        <ellipse rx={6} ry={5} fill="#795548" />
        <ellipse cy={-1} rx={4} ry={2.5} fill="#a1887f" opacity={0.5} />
        <path d="M -4,0 Q 0,-2 4,0" fill="none" stroke="#5d4037" strokeWidth="1" opacity={0.5} />
      </>;
    case 'basil':
      return <>
        <ellipse rx={6} ry={8} fill="#2d8a2d" />
        <line x1={0} y1={-7} x2={0} y2={6} stroke="#1a5c1a" strokeWidth="0.8" />
        <line x1={-4} y1={-1} x2={4} y2={-1} stroke="#1a5c1a" strokeWidth="0.6" opacity={0.5} />
      </>;
    case 'onion':
      return <ellipse rx={8} ry={2.5} fill="#e8d5f5" stroke="#9b59b6" strokeWidth="0.8" opacity={0.85} />;
    case 'sprouts':
      return <>
        <line x1={0} y1={0} x2={0} y2={-6} stroke="#66bb6a" strokeWidth="1.2" />
        <line x1={0} y1={-3} x2={-3} y2={-6} stroke="#66bb6a" strokeWidth="1" />
        <line x1={0} y1={-3} x2={3} y2={-6} stroke="#66bb6a" strokeWidth="1" />
        <circle cx={0} cy={-6} r={1.2} fill="#a5d6a7" />
        <circle cx={-3} cy={-6} r={1} fill="#a5d6a7" />
        <circle cx={3} cy={-6} r={1} fill="#a5d6a7" />
      </>;
    default:
      return <circle r={5} fill="#888" opacity={0.6} />;
  }
}

interface Props { placedIngredients: PlacedIngredient[]; }

export const SaladAssembly = ({ placedIngredients }: Props) => {
  const fillEls: ReactElement[] = [];
  placedIngredients.forEach((item) => {
    const count = FILL_COUNT[item.ingredientId] ?? 8;
    for (let i = 0; i < count; i++) {
      const pt = bowlPoint(item.instanceId, i, count);
      const rot = srng(item.instanceId, i * 2 + 77) * 360;
      fillEls.push(
        <g key={`${item.instanceId}-${i}`} transform={`translate(${pt.x} ${pt.y}) rotate(${rot})`}>
          <SaladFilling id={item.ingredientId} />
        </g>
      );
    }
  });

  return (
    <motion.svg
      width={300} height={280} viewBox="0 0 300 280"
      initial={{ scale: 0 }} animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
    >
      {/* Plate */}
      <ellipse cx={150} cy={268} rx={138} ry={14} fill="#e8e0d8" />
      <ellipse cx={150} cy={264} rx={134} ry={11} fill="#f5ede3" stroke="#d5c9bc" strokeWidth="2" />

      {/* Bowl shadow */}
      <ellipse cx={150} cy={258} rx={118} ry={10} fill="rgba(0,0,0,0.07)" />

      {/* Bowl outer */}
      <path d="M32 122 Q32 252 150 252 Q268 252 268 122 Z" fill="#e0d5c8" />
      {/* Bowl inner */}
      <path d="M42 122 Q42 240 150 240 Q258 240 258 122 Z" fill="#f8f4f0" />

      {/* Lettuce bed (always present — the visual base of the salad) */}
      <ellipse cx={150} cy={162} rx={95} ry={40} fill="#2e7d32" opacity={0.25} />
      {[[80,148],[112,136],[144,133],[176,136],[208,148],[92,162],[168,159],[148,172],[120,167],[178,167]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx={20} ry={11}
          fill={i % 2 === 0 ? '#2e7d32' : '#4caf50'} opacity={0.35}
          transform={`rotate(${(i * 37) % 180 - 60} ${x} ${y})`}
        />
      ))}

      {/* Ingredient scatter — clipped inside bowl via paint order */}
      {fillEls}

      {/* Bowl rim — renders on top so nothing bleeds outside */}
      <ellipse cx={150} cy={122} rx={128} ry={23} fill="#e8e0d5" stroke="#d5c9bc" strokeWidth="3" />
      <ellipse cx={150} cy={120} rx={122} ry={18} fill="#f0e8e0" />
      {/* Rim highlight */}
      <path d="M38 120 Q92 106 150 104 Q208 106 262 120"
        fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" opacity={0.5} />
    </motion.svg>
  );
};
