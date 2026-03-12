import type { ReactElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';

const CX = 150;
const SW = 210;          // sandwich width
const SL = (300 - SW) / 2; // left edge x
const SR = SL + SW;      // right edge x
const STACK_BASE_Y = 288;
const TOP_BREAD_H = 62;  // arch height of top bread
const LAYER_GAP = 0;

interface LayerRender {
  height: number;
  render: (y: number) => ReactElement;
}

function wavyPath(y: number, amp: number, left: number, right: number, steps: number, phase = 0): string {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const x = left + (i / steps) * (right - left);
    const yv = y + amp * Math.sin((i / steps) * Math.PI * 3 + phase);
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${yv.toFixed(1)}`;
  }).join(' ');
}

const LAYERS: Record<string, LayerRender> = {
  turkey: {
    height: 16,
    render: (y) => (
      <g>
        <rect x={SL} y={y} width={SW} height={16} rx={4} fill="#c9946a" />
        <rect x={SL} y={y} width={SW} height={8} rx={4} fill="#d9a87c" opacity={0.6} />
        {/* Grain texture */}
        {[0.2, 0.4, 0.6, 0.8].map((t, i) => (
          <line key={i}
            x1={SL + SW * t - 4} y1={y + 3}
            x2={SL + SW * t + 4} y2={y + 13}
            stroke="#b07850" strokeWidth="1.5" opacity={0.3} strokeLinecap="round"
          />
        ))}
      </g>
    ),
  },
  ham: {
    height: 14,
    render: (y) => (
      <g>
        <rect x={SL} y={y} width={SW} height={14} rx={4} fill="#e07090" />
        <rect x={SL} y={y} width={SW} height={7} rx={4} fill="#f090a8" opacity={0.5} />
        {/* Fat marbling */}
        {[0.15, 0.45, 0.72].map((t, i) => (
          <ellipse key={i} cx={SL + SW * t} cy={y + 7} rx={12} ry={3}
            fill="white" opacity={0.25} />
        ))}
      </g>
    ),
  },
  chicken: {
    height: 18,
    render: (y) => (
      <g>
        <rect x={SL} y={y} width={SW} height={18} rx={5} fill="#d4a96a" />
        <rect x={SL} y={y} width={SW} height={9} rx={5} fill="#e8c080" opacity={0.55} />
        {[0.25, 0.5, 0.75].map((t, i) => (
          <line key={i}
            x1={SL + SW * t - 5} y1={y + 4}
            x2={SL + SW * t + 5} y2={y + 14}
            stroke="#b8904a" strokeWidth="1.5" opacity={0.3} strokeLinecap="round"
          />
        ))}
      </g>
    ),
  },
  lettuce: {
    height: 14,
    render: (y) => {
      const L = SL - 12;
      const R = SR + 12;
      const top = wavyPath(y + 1, 6, L, R, 12);
      const bot = `L${R},${y + 14} L${L},${y + 14} Z`;
      return (
        <g>
          <path d={`${top} ${bot}`} fill="#4CAF50" />
          <path d={top} fill="none" stroke="#2E7D32" strokeWidth="1" />
        </g>
      );
    },
  },
  spinach: {
    height: 13,
    render: (y) => {
      const L = SL - 10;
      const R = SR + 10;
      const top = wavyPath(y + 1, 5, L, R, 14, 0.8);
      const bot = `L${R},${y + 13} L${L},${y + 13} Z`;
      return (
        <g>
          <path d={`${top} ${bot}`} fill="#2E7D32" />
          <path d={top} fill="none" stroke="#1B5E20" strokeWidth="1" />
        </g>
      );
    },
  },
  tomato_slice: {
    height: 13,
    render: (y) => (
      <g>
        <rect x={SL} y={y} width={SW} height={13} rx={3} fill="#E53935" />
        <rect x={SL} y={y} width={SW} height={13} rx={3} fill="none" stroke="#B71C1C" strokeWidth="1" opacity={0.4} />
        {[-55, -18, 19, 56].map((dx, i) => (
          <ellipse key={i} cx={CX + dx} cy={y + 6} rx={14} ry={5} fill="#EF9A9A" opacity={0.4} />
        ))}
      </g>
    ),
  },
  cheese: {
    height: 10,
    render: (y) => (
      <g>
        <rect x={SL - 14} y={y} width={SW + 28} height={10} rx={2} fill="#FDD835" />
        <rect x={SL - 14} y={y} width={SW + 28} height={5} rx={2} fill="#FFEE58" opacity={0.55} />
      </g>
    ),
  },
  swiss: {
    height: 10,
    render: (y) => (
      <g>
        <rect x={SL - 14} y={y} width={SW + 28} height={10} rx={2} fill="#F5E990" />
        <rect x={SL - 14} y={y} width={SW + 28} height={5} rx={2} fill="#FFFDE7" opacity={0.5} />
        {[-60, -28, 4, 36, 68].map((dx, i) => (
          <ellipse key={i} cx={CX + dx} cy={y + 5} rx={7} ry={4} fill="#E6D060" opacity={0.6} />
        ))}
      </g>
    ),
  },
  cream_cheese: {
    height: 9,
    render: (y) => (
      <g>
        <path d={wavyPath(y + 4, 3, SL, SR, 10, 0.3)}
          fill="none" stroke="#faf5ee" strokeWidth={7} strokeLinecap="round" opacity={0.9} />
      </g>
    ),
  },
  mayo: {
    height: 8,
    render: (y) => (
      <path d={wavyPath(y + 4, 2.5, SL, SR, 10, 0.5)}
        fill="none" stroke="#FAFAFA" strokeWidth={6} strokeLinecap="round" opacity={0.9} />
    ),
  },
  ketchup: {
    height: 8,
    render: (y) => (
      <path d={wavyPath(y + 4, 3, SL, SR, 9, 0)}
        fill="none" stroke="#E53935" strokeWidth={5} strokeLinecap="round" opacity={0.9} />
    ),
  },
  mustard: {
    height: 8,
    render: (y) => (
      <path d={wavyPath(y + 4, 3, SL, SR, 9, 1.5)}
        fill="none" stroke="#FDD835" strokeWidth={5} strokeLinecap="round" opacity={0.9} />
    ),
  },
  onion: {
    height: 11,
    render: (y) => (
      <g>
        <rect x={SL} y={y + 1} width={SW} height={9} rx={3} fill="#E1BEE7" opacity={0.8} />
        {[-50, -16, 18, 52].map((dx, i) => (
          <ellipse key={i} cx={CX + dx} cy={y + 5} rx={18} ry={4}
            fill="none" stroke="#7B1FA2" strokeWidth={1.2} opacity={0.4} />
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
            <ellipse cx={CX + dx} cy={y + 6} rx={20} ry={7} fill="#8BC34A" />
            <ellipse cx={CX + dx} cy={y + 6} rx={20} ry={7} fill="none" stroke="#558B2F" strokeWidth="1" />
            {[-6, 6].map((s, j) => (
              <circle key={j} cx={CX + dx + s} cy={y + 6} r={1.5} fill="#33691E" opacity={0.5} />
            ))}
          </g>
        ))}
      </g>
    ),
  },
  bacon: {
    height: 14,
    render: (y) => (
      <g>
        {[0, 1].map(row => (
          <path key={row}
            d={wavyPath(y + 2 + row * 6, 4, SL + row * 12, SR - row * 12, 8, row * 1.2)}
            fill="none"
            stroke={row === 0 ? '#C62828' : '#795548'}
            strokeWidth={row === 0 ? 6 : 5}
            strokeLinecap="round"
            opacity={0.88}
          />
        ))}
      </g>
    ),
  },
  egg_fried: {
    height: 18,
    render: (y) => (
      <g>
        <ellipse cx={CX} cy={y + 9} rx={SW * 0.36} ry={10} fill="white" />
        <ellipse cx={CX + 24} cy={y + 8} rx={SW * 0.18} ry={8} fill="white" opacity={0.65} />
        <circle cx={CX} cy={y + 9} r={7} fill="#FDD835" />
        <circle cx={CX} cy={y + 9} r={4} fill="#FB8C00" opacity={0.5} />
      </g>
    ),
  },
  avocado: {
    height: 14,
    render: (y) => (
      <g>
        <rect x={SL} y={y} width={SW} height={14} rx={4} fill="#81C784" />
        <rect x={SL + 20} y={y} width={SW - 40} height={8} rx={3} fill="#A5D6A7" opacity={0.55} />
      </g>
    ),
  },
  mushroom: {
    height: 14,
    render: (y) => (
      <g>
        {[-52, -17, 18, 53].map((dx, i) => (
          <g key={i}>
            <ellipse cx={CX + dx} cy={y + 6} rx={16} ry={8} fill="#6D4C41" />
            <ellipse cx={CX + dx} cy={y + 5} rx={10} ry={4} fill="#8D6E63" opacity={0.45} />
            <rect cx={CX + dx - 2} y={y + 9} width={4} height={5} rx={1} fill="#A1887F" />
          </g>
        ))}
      </g>
    ),
  },
  bell_pepper: {
    height: 13,
    render: (y) => (
      <g>
        <rect x={SL} y={y} width={SW} height={13} rx={4} fill="#27ae60" opacity={0.9} />
        {[-55, -18, 19, 56].map((dx, i) => (
          <ellipse key={i} cx={CX + dx} cy={y + 6} rx={14} ry={5} fill="#2ecc71" opacity={0.4} />
        ))}
      </g>
    ),
  },
  basil: {
    height: 12,
    render: (y) => {
      const L = SL - 8;
      const R = SR + 8;
      const top = wavyPath(y, 4, L, R, 16, 0.5);
      return (
        <g>
          <path d={`${top} L${R},${y + 12} L${L},${y + 12} Z`} fill="#2D8A2D" opacity={0.85} />
          <path d={top} fill="none" stroke="#1A5C1A" strokeWidth="0.8" />
        </g>
      );
    },
  },
  jalapeno: {
    height: 12,
    render: (y) => (
      <g>
        {[-50, -16, 18, 52].map((dx, i) => (
          <ellipse key={i} cx={CX + dx} cy={y + 6} rx={14} ry={6} fill="#16a085" opacity={0.88} />
        ))}
      </g>
    ),
  },
  cucumber: {
    height: 12,
    render: (y) => (
      <g>
        {[-55, -18, 19, 56].map((dx, i) => (
          <g key={i}>
            <circle cx={CX + dx} cy={y + 6} r={9} fill="#4caf50" />
            <circle cx={CX + dx} cy={y + 6} r={6.5} fill="#a5d6a7" opacity={0.7} />
            <circle cx={CX + dx} cy={y + 6} r={3} fill="#c8e6c9" opacity={0.6} />
          </g>
        ))}
      </g>
    ),
  },
  carrot: {
    height: 10,
    render: (y) => (
      <g>
        {[-55, -18, 19, 56].map((dx, i) => (
          <rect key={i} x={CX + dx - 16} y={y + 1} width={32} height={8} rx={4} fill="#f57c00" opacity={0.9} />
        ))}
      </g>
    ),
  },
  sprouts: {
    height: 16,
    render: (y) => {
      const stems = Array.from({ length: 18 }, (_, i) => {
        const x = SL + 10 + (i / 17) * (SW - 20);
        const h = 8 + (i % 3) * 3;
        const lean = ((i % 5) - 2) * 3;
        return { x, h, lean };
      });
      return (
        <g>
          {stems.map((s, i) => (
            <g key={i}>
              <line x1={s.x} y1={y + 15} x2={s.x + s.lean} y2={y + 15 - s.h}
                stroke="#66bb6a" strokeWidth="1.2" />
              <circle cx={s.x + s.lean} cy={y + 15 - s.h} r={1.4} fill="#a5d6a7" />
            </g>
          ))}
        </g>
      );
    },
  },
};

const DEFAULT_LAYER: LayerRender = {
  height: 14,
  render: (y) => (
    <rect x={SL} y={y} width={SW} height={14} rx={5} fill="#9E9E9E" opacity={0.65} />
  ),
};

export const SandwichStack = () => {
  const { placedIngredients, removeIngredient } = useGameStore();

  let currentY = STACK_BASE_Y;
  const layerData = [...placedIngredients].map(item => {
    const spec = LAYERS[item.ingredientId] ?? DEFAULT_LAYER;
    currentY -= spec.height + LAYER_GAP;
    return { item, spec, y: currentY };
  });

  const topBreadBottom = currentY;
  const topBreadTop = topBreadBottom - TOP_BREAD_H;

  const minY = Math.min(topBreadTop - 80, 30);
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
      <ellipse cx={CX} cy={348} rx={134} ry={16} fill="#e8e0d8" />
      <ellipse cx={CX} cy={343} rx={130} ry={13} fill="#f5ede3" stroke="#d5c9bc" strokeWidth="2" />

      {/* Bottom bread slice */}
      <rect x={SL - 4} y={STACK_BASE_Y - 4} width={SW + 8} height={22} rx={6} fill="#a07840" />
      <rect x={SL} y={STACK_BASE_Y - 2} width={SW} height={20} rx={5} fill="#c9916a" />
      <rect x={SL} y={STACK_BASE_Y - 2} width={SW} height={10} rx={5} fill="#e0b07a" opacity={0.6} />
      {/* Crust line bottom */}
      <rect x={SL} y={STACK_BASE_Y + 12} width={SW} height={4} rx={2} fill="#a07840" opacity={0.5} />
      {/* Bottom bread shine */}
      <ellipse cx={CX - 30} cy={STACK_BASE_Y + 3} rx={28} ry={5} fill="white" opacity={0.12} />

      {/* Ingredient layers */}
      <AnimatePresence>
        {layerData.map(({ item, spec, y }) => (
          <motion.g
            key={item.instanceId}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            onClick={() => removeIngredient(item.instanceId)}
            style={{ cursor: 'pointer' }}
          >
            {spec.render(y)}
            {/* Wider transparent hit area */}
            <rect x={SL - 20} y={y} width={SW + 40} height={spec.height} fill="transparent" />
          </motion.g>
        ))}
      </AnimatePresence>

      {/* Top bread slice — arch dome */}
      <g transform={`translate(0, ${topBreadTop - 10})`}>
        {/* Shadow under top bread */}
        <rect x={SL - 2} y={TOP_BREAD_H + 2} width={SW + 4} height={12} rx={5} fill="rgba(0,0,0,0.10)" />
        {/* Crust border */}
        <rect x={SL - 4} y={TOP_BREAD_H - 2} width={SW + 8} height={18} rx={6} fill="#a07840" />
        {/* Inner bread bottom */}
        <rect x={SL} y={TOP_BREAD_H} width={SW} height={16} rx={5} fill="#d4a96a" />
        <rect x={SL} y={TOP_BREAD_H} width={SW} height={8} rx={5} fill="#e8c589" opacity={0.55} />
        {/* Bread dome arch */}
        <path
          d={`M${SL} ${TOP_BREAD_H} Q${SL - 10} ${TOP_BREAD_H * 0.5} ${CX} ${TOP_BREAD_H * 0.12} Q${SR + 10} ${TOP_BREAD_H * 0.5} ${SR} ${TOP_BREAD_H} Z`}
          fill="#d4a96a"
        />
        <path
          d={`M${SL + 12} ${TOP_BREAD_H} Q${SL + 4} ${TOP_BREAD_H * 0.58} ${CX} ${TOP_BREAD_H * 0.22} Q${SR - 4} ${TOP_BREAD_H * 0.58} ${SR - 12} ${TOP_BREAD_H} Z`}
          fill="#e8c589" opacity={0.55}
        />
        {/* Sesame seeds */}
        {[[110, 18], [142, 10], [168, 14], [125, 28], [158, 25], [148, 36]].map(([x, sy], i) => (
          <ellipse key={i} cx={x} cy={sy} rx={4} ry={2.2}
            fill="#c9916a" transform={`rotate(${i * 28 - 14} ${x} ${sy})`} />
        ))}
        {/* Bread shine */}
        <ellipse cx={118} cy={16} rx={22} ry={8} fill="white" opacity={0.18} transform="rotate(-18 118 16)" />
      </g>
    </motion.svg>
  );
};
