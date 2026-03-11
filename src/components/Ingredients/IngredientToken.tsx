import { motion } from 'framer-motion';
import type { Ingredient } from '../../types';

interface Props {
  ingredient: Ingredient;
  size?: number;
  onClick?: () => void;
  dragging?: boolean;
}

// Color palettes for the circular token background
const BG_MAP: Record<string, string> = {
  '#c0392b': '#fdecea',
  '#8e7464': '#f5ede8',
  '#2c6e2c': '#eaf5ea',
  '#27ae60': '#e8f8f0',
  '#f1c40f': '#fefce8',
  '#e74c3c': '#fdecea',
  '#f39c12': '#fef3e2',
  '#16a085': '#e8f8f5',
  '#a93226': '#f9ecea',
  '#784212': '#f5eee8',
  '#d5d8dc': '#f8f9fa',
  '#1abc9c': '#e8faf5',
  '#2c3e50': '#eaecee',
  '#fdfefe': '#f8f9fa',
  '#a04000': '#f5ede4',
  '#884a2d': '#f5ede8',
  '#d4a96a': '#fef5ea',
  '#e67e22': '#fef0e4',
  '#f9a8a8': '#fff0f0',
  '#f1948a': '#fff0ee',
  '#1a5276': '#eaf2ff',
  '#1e8bc3': '#e8f4ff',
  '#58d68d': '#eafaf1',
  '#8B4513': '#f5ede4',
  '#e91e8c': '#fde8f4',
};

export const IngredientToken = ({ ingredient, size = 64, onClick, dragging }: Props) => {
  const bg = BG_MAP[ingredient.color] ?? '#f0f0f0';

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.92 }}
      animate={dragging ? { scale: 1.2, rotate: 8 } : { scale: 1, rotate: 0 }}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: bg,
        border: `3px solid ${ingredient.color}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'grab',
        boxShadow: dragging
          ? `0 8px 24px ${ingredient.color}66`
          : `0 3px 10px ${ingredient.color}33`,
        userSelect: 'none',
        flexShrink: 0,
        gap: 0,
      }}
    >
      <span style={{ fontSize: size * 0.42, lineHeight: 1 }}>{ingredient.emoji}</span>
      {size >= 56 && (
        <span
          style={{
            fontSize: Math.max(9, size * 0.15),
            fontWeight: 700,
            color: ingredient.color,
            textAlign: 'center',
            lineHeight: 1.1,
            maxWidth: size - 8,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {ingredient.name}
        </span>
      )}
    </motion.div>
  );
};
