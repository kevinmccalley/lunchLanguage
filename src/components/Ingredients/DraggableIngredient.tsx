import { motion, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getIngredientById } from '../../data/ingredients';
import { useGameStore } from '../../store/gameStore';
import { useLanguageStore } from '../../store/languageStore';
import { TRANSLATIONS } from '../../i18n/translations';
import type { PlacedIngredient } from '../../types';

interface Props {
  item: PlacedIngredient;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const DraggableIngredient = ({ item, containerRef }: Props) => {
  const { moveIngredient, removeIngredient } = useGameStore();
  const { learningLanguage } = useLanguageStore();
  const ingredient = getIngredientById(item.ingredientId);
  const [dragging, setDragging] = useState(false);

  const learningWord = learningLanguage && ingredient
    ? TRANSLATIONS[learningLanguage].ingredients[ingredient.id]
    : null;
  const showLabel = !!learningWord;

  // Use motion values for position — avoids transform/left+top stacking bug
  const x = useMotionValue(item.x);
  const y = useMotionValue(item.y);

  // Sync if store position changes externally (e.g. initial spawn)
  useEffect(() => {
    x.set(item.x);
    y.set(item.y);
  }, []); // only on mount; dragging updates via motion values directly

  if (!ingredient) return null;

  const handleDragEnd = () => {
    setDragging(false);
    const container = containerRef.current;
    if (!container) return;

    const finalX = x.get();
    const finalY = y.get();
    const { width, height } = container.getBoundingClientRect();

    // Remove if dragged well outside the plate area
    if (finalX < -60 || finalY < -60 || finalX > width + 60 || finalY > height + 60) {
      removeIngredient(item.instanceId);
      return;
    }
    moveIngredient(item.instanceId, finalX, finalY);
  };

  const size = Math.round(48 * item.scale);

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragStart={() => setDragging(true)}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        x,
        y,
        rotate: item.rotation,
        cursor: dragging ? 'grabbing' : 'grab',
        zIndex: dragging ? 100 : 10,
        touchAction: 'none',
        userSelect: 'none',
      }}
      whileDrag={{ scale: 1.25, zIndex: 200 }}
      onDoubleClick={() => removeIngredient(item.instanceId)}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <div
          style={{
            width: size,
            height: size,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: dragging ? 'drop-shadow(0 6px 12px rgba(0,0,0,0.3))' : 'none',
          }}
        >
          <span style={{ fontSize: size, lineHeight: 1, display: 'block' }}>
            {ingredient.emoji}
          </span>
        </div>
        {showLabel && !dragging && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: '#ff6b35',
              color: 'white',
              borderRadius: 8,
              padding: '1px 6px',
              fontSize: Math.max(9, size * 0.22),
              fontWeight: 800,
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              pointerEvents: 'none',
            }}
          >
            {learningWord}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
