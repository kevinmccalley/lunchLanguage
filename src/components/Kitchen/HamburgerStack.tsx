import type { ReactElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';

const CX = 150;
const BURGER_W = 200;
// Y of top of bottom bun (layers stack upward from here)
const STACK_BASE_Y = 284;
const TOP_BUN_H = 75; // dome height
const LAYER_GAP = 0;  // no gap between layers

interface LayerRender {
  height: number;
  render: (y: number) => ReactElement;
}

function wavyPath(y: number, yAmp: number, left: number, right: number, steps: number, phase = 0): string {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const x = left + (i / steps) * (right - left);
    const yv = y + yAmp * Math.sin((i / steps) * Math.PI * 3 + phase);
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${yv.toFixed(1)}`;
  }).join(' ');
}

const LAYERS: Record<string, LayerRender> = {
  beef_patty: {
    height: 22,
    render: (y) => (
      <g>
        <rect x={(300 - BURGER_W) / 2} y={y} width={BURGER_W} height={22} rx={8} fill="#6D4C41" />
        <rect x={(300 - BURGER_W) / 2} y={y} width={BURGER_W} height={11} rx={8} fill="#795548" />
        {[0.22, 0.48, 0.74].map((t, i) => (
          <line key={i}
            x1={(300 - BURGER_W) / 2 + BURGER_W * t - 3} y1={y + 4}
            x2={(300 - BURGER_W) / 2 + BURGER_W * t + 3} y2={y + 18}
            stroke="#4E342E" strokeWidth="2.5" strokeLinecap="round" opacity={0.45}
          />
        ))}
      </g>
    ),
  },
  lettuce: {
    height: 15,
    render: (y) => {
      const L = (300 - BURGER_W) / 2 - 14;
      const R = (300 + BURGER_W) / 2 + 14;
      const top = wavyPath(y + 2, 7, L, R, 12);
      const bot = `L${R},${y + 15} L${L},${y + 15} Z`;
      return (
        <g>
          <path d={`${top} ${bot}`} fill="#4CAF50" />
          <path d={top} fill="none" stroke="#2E7D32" strokeWidth="1" />
        </g>
      );
    },
  },
  tomato_slice: {
    height: 13,
    render: (y) => (
      <g>
        <ellipse cx={CX} cy={y + 6} rx={BURGER_W / 2} ry={7} fill="#E53935" />
        <ellipse cx={CX} cy={y + 6} rx={BURGER_W / 2} ry={6.5} fill="none" stroke="#B71C1C" strokeWidth="1" opacity={0.5} />
        {[-44, -15, 14, 43].map((dx, i) => (
          <ellipse key={i} cx={CX + dx} cy={y + 6} rx={7} ry={5.5} fill="#EF9A9A" opacity={0.45} />
        ))}
      </g>
    ),
  },
  cheese: {
    height: 11,
    render: (y) => (
      <g>
        <rect x={(300 - BURGER_W - 32) / 2} y={y} width={BURGER_W + 32} height={11} rx={2} fill="#FDD835" />
        <rect x={(300 - BURGER_W - 32) / 2} y={y} width={BURGER_W + 32} height={5} rx={2} fill="#FFEE58" opacity={0.55} />
        {[-55, -18, 19, 56].map((dx, i) => (
          <ellipse key={i} cx={CX + dx} cy={y + 15} rx={5} ry={6} fill="#FDD835" />
        ))}
      </g>
    ),
  },
  onion: {
    height: 11,
    render: (y) => (
      <g>
        <ellipse cx={CX} cy={y + 5} rx={BURGER_W / 2} ry={6} fill="#E1BEE7" opacity={0.8} />
        {[-35, 0, 35].map((dx, i) => (
          <ellipse key={i} cx={CX + dx} cy={y + 5} rx={20} ry={5} fill="none" stroke="#7B1FA2" strokeWidth="1.5" opacity={0.45} />
        ))}
      </g>
    ),
  },
  pickle: {
    height: 12,
    render: (y) => (
      <g>
        {[-55, -18, 19, 56].map((dx, i) => (
          <g key={i}>
            <ellipse cx={CX + dx} cy={y + 6} rx={18} ry={7} fill="#8BC34A" />
            <ellipse cx={CX + dx} cy={y + 6} rx={18} ry={7} fill="none" stroke="#558B2F" strokeWidth="1" />
            {[-5, 5].map((s, j) => (
              <circle key={j} cx={CX + dx + s} cy={y + 6} r={1.5} fill="#33691E" opacity={0.5} />
            ))}
          </g>
        ))}
      </g>
    ),
  },
  ketchup: {
    height: 9,
    render: (y) => {
      const L = (300 - BURGER_W) / 2;
      const R = (300 + BURGER_W) / 2;
      return (
        <path d={wavyPath(y + 4, 3.5, L, R, 9, 0)} fill="none" stroke="#E53935" strokeWidth="5" strokeLinecap="round" opacity={0.92} />
      );
    },
  },
  mustard: {
    height: 9,
    render: (y) => {
      const L = (300 - BURGER_W) / 2;
      const R = (300 + BURGER_W) / 2;
      return (
        <path d={wavyPath(y + 5, 3.5, L, R, 9, 1.5)} fill="none" stroke="#FDD835" strokeWidth="5" strokeLinecap="round" opacity={0.92} />
      );
    },
  },
  bacon: {
    height: 15,
    render: (y) => {
      const L = (300 - BURGER_W) / 2;
      return (
        <g>
          {[0, 1].map(row => (
            <path key={row}
              d={wavyPath(y + 3 + row * 7, 4, L + row * 14, L + row * 14 + BURGER_W - 14, 8, row * 1.2)}
              fill="none"
              stroke={row === 0 ? '#C62828' : '#795548'}
              strokeWidth={row === 0 ? 6 : 5}
              strokeLinecap="round"
              opacity={0.88}
            />
          ))}
        </g>
      );
    },
  },
  egg_fried: {
    height: 18,
    render: (y) => (
      <g>
        <ellipse cx={CX} cy={y + 9} rx={BURGER_W * 0.36} ry={10} fill="white" />
        <ellipse cx={CX + 22} cy={y + 8} rx={BURGER_W * 0.2} ry={8} fill="white" opacity={0.65} />
        <circle cx={CX} cy={y + 9} r={7} fill="#FDD835" />
        <circle cx={CX} cy={y + 9} r={4} fill="#FB8C00" opacity={0.5} />
      </g>
    ),
  },
  avocado: {
    height: 14,
    render: (y) => (
      <g>
        <ellipse cx={CX} cy={y + 7} rx={BURGER_W / 2} ry={8} fill="#81C784" />
        <ellipse cx={CX} cy={y + 7} rx={BURGER_W / 2 - 18} ry={5.5} fill="#A5D6A7" opacity={0.55} />
      </g>
    ),
  },
};

const DEFAULT_LAYER: LayerRender = {
  height: 16,
  render: (y) => (
    <rect x={(300 - BURGER_W) / 2} y={y} width={BURGER_W} height={16} rx={6} fill="#9E9E9E" opacity={0.65} />
  ),
};

export const HamburgerStack = () => {
  const { placedIngredients, removeIngredient } = useGameStore();

  // Calculate layer positions (stack upward from STACK_BASE_Y)
  let currentY = STACK_BASE_Y;
  const layerData = [...placedIngredients].map(item => {
    const spec = LAYERS[item.ingredientId] ?? DEFAULT_LAYER;
    currentY -= spec.height + LAYER_GAP;
    return { item, spec, y: currentY };
  });

  const topBunBottom = currentY; // top bun dome sits here
  const topBunDomeY = topBunBottom - TOP_BUN_H;

  // Dynamic viewBox to accommodate tall stacks
  // Bun is lifted by TOP_BUN_H*0.82 so its dome top sits ~80px above topBunDomeY
  const minY = Math.min(topBunDomeY - 90, 30);
  const vbHeight = 360 - minY;

  return (
    <motion.svg
      width="100%" height="100%"
      viewBox={`0 ${minY} 300 ${vbHeight}`}
      preserveAspectRatio="xMidYMax meet"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 180, damping: 20 }}
    >
      {/* Plate */}
      <ellipse cx={CX} cy={345} rx={132} ry={16} fill="#e8e0d8" />
      <ellipse cx={CX} cy={340} rx={128} ry={13} fill="#f5ede3" stroke="#d5c9bc" strokeWidth="2" />

      {/* Bottom bun */}
      <ellipse cx={CX} cy={330} rx={106} ry={16} fill="#b8893a" />
      <ellipse cx={CX} cy={318} rx={104} ry={20} fill="#d4a96a" />
      <ellipse cx={CX} cy={308} rx={100} ry={14} fill="#e8c589" />
      <ellipse cx={CX} cy={302} rx={96} ry={10} fill="#f0d49a" />

      {/* Ingredient layers */}
      <AnimatePresence>
        {layerData.map(({ item, spec, y }) => (
          <motion.g
            key={item.instanceId}
            initial={{ opacity: 0, scaleY: 0, originY: y + (spec.height / 2) }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            onClick={() => removeIngredient(item.instanceId)}
            style={{ cursor: 'pointer' }}
          >
            {spec.render(y)}
            {/* Invisible wider hit area */}
            <rect
              x={(300 - BURGER_W) / 2 - 20} y={y}
              width={BURGER_W + 40} height={spec.height}
              fill="transparent"
            />
          </motion.g>
        ))}
      </AnimatePresence>

      {/* Top bun dome — lifted so outer ellipse bottom sits at topBunBottom (not 61px into the stack) */}
      <g transform={`translate(0, ${topBunDomeY - 30 - Math.round(TOP_BUN_H * 0.82)})`}>
        <ellipse cx={CX} cy={TOP_BUN_H + 30} rx={110} ry={TOP_BUN_H * 0.82} fill="#c49a5a" />
        <ellipse cx={CX} cy={TOP_BUN_H * 0.72 + 30} rx={106} ry={TOP_BUN_H * 0.67} fill="#d4a96a" />
        <ellipse cx={CX} cy={TOP_BUN_H * 0.5 + 30} rx={100} ry={TOP_BUN_H * 0.5} fill="#e8c589" />
        {[[110, 22], [135, 14], [158, 18], [123, 33], [148, 32], [138, 44]].map(([x, sy], i) => (
          <ellipse key={i} cx={x} cy={sy} rx={4} ry={2.5} fill="#c9916a" transform={`rotate(${i * 28 - 14} ${x} ${sy})`} />
        ))}
        <ellipse cx={116} cy={20} rx={22} ry={9} fill="white" opacity="0.2" transform="rotate(-20 116 20)" />
      </g>
    </motion.svg>
  );
};
