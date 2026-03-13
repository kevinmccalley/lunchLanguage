import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { getMealInfo } from '../../data/meals';
import { getIngredientById } from '../../data/ingredients';
import { useT } from '../../i18n/useT';
import { useLanguageStore } from '../../store/languageStore';
import { getMealCostUSD, formatPrice } from '../../utils/currency';
import { MealHeroIllustration } from './MealHeroIllustration';

// 20 particles scattered in a circle — fixed angles so they're deterministic
const PARTICLE_ANGLES = Array.from({ length: 20 }, (_, i) => (i / 20) * 360);

const STAR_SHAPES = ['★', '✦', '•', '✿', '❋'];

export const MealSplash = () => {
  const { selectedMeal, placedIngredients, setPhase } = useGameStore();
  const meal = getMealInfo(selectedMeal!);
  const t = useT();
  const { language } = useLanguageStore();

  // Auto-advance after 7 seconds
  useEffect(() => {
    const timer = setTimeout(() => setPhase('mathQuiz'), 7000);
    return () => clearTimeout(timer);
  }, []);

  // Build "with X, Y and Z" personalised subtitle from top 3 ingredients
  const ingredientList = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const item of placedIngredients) {
      counts[item.ingredientId] = (counts[item.ingredientId] ?? 0) + 1;
    }
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([id]) => {
        const ing = getIngredientById(id);
        return (t.ingredients[id] ?? ing?.name ?? id);
      });
  }, [placedIngredients, t]);

  const mealName = t.meals[selectedMeal!].name;

  const ingredientText = ingredientList.length > 0
    ? `${meal.emoji}  ${ingredientList.join(' · ')}`
    : meal.emoji;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.4 }}
      onClick={() => setPhase('mathQuiz')}
      style={{
        position: 'fixed', inset: 0, zIndex: 400,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', overflow: 'hidden',
        background: `radial-gradient(ellipse at 50% 40%,
          ${meal.bgColor} 0%,
          ${meal.accentColor}22 55%,
          ${meal.accentColor}55 100%)`,
      }}
    >
      {/* ── Particle burst ─────────────────────────────────────────────── */}
      {PARTICLE_ANGLES.map((angle, i) => {
        const rad  = (angle * Math.PI) / 180;
        const dist = 140 + (i % 4) * 35;
        const tx   = Math.cos(rad) * dist;
        const ty   = Math.sin(rad) * dist;
        const symbol = STAR_SHAPES[i % STAR_SHAPES.length];
        const size   = 12 + (i % 5) * 5;
        return (
          <motion.span
            key={i}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0, rotate: 0 }}
            animate={{
              x: tx, y: ty,
              opacity: [0, 1, 0.8, 0],
              scale: [0, 1.2, 1, 0],
              rotate: (i % 2 === 0 ? 1 : -1) * (180 + i * 12),
            }}
            transition={{
              duration: 2.2,
              delay: 0.15 + (i * 0.06),
              ease: 'easeOut',
            }}
            style={{
              position: 'absolute',
              fontSize: size,
              color: i % 3 === 0 ? meal.accentColor
                   : i % 3 === 1 ? '#ffd700'
                   : 'rgba(255,255,255,0.85)',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            {symbol}
          </motion.span>
        );
      })}

      {/* ── Glowing halo behind illustration ───────────────────────────── */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.3, 1.1], opacity: [0, 0.4, 0.25] }}
        transition={{ duration: 0.8, delay: 0.1 }}
        style={{
          position: 'absolute',
          width: 320, height: 320,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${meal.accentColor}55 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      {/* ── Hero illustration ──────────────────────────────────────────── */}
      <motion.div
        initial={{ scale: 0, rotate: -12, y: 30 }}
        animate={{ scale: 1, rotate: 0, y: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.1 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Plate shadow */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          style={{
            position: 'absolute', bottom: -14, left: '50%',
            transform: 'translateX(-50%)',
            width: '78%', height: 18, borderRadius: '50%',
            background: 'rgba(0,0,0,0.18)',
            filter: 'blur(6px)',
            pointerEvents: 'none',
          }}
        />
        <MealHeroIllustration mealId={selectedMeal!} />
      </motion.div>

      {/* ── Text block ────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, type: 'spring', stiffness: 280, damping: 22 }}
        style={{
          marginTop: 18, textAlign: 'center', padding: '0 24px',
          position: 'relative', zIndex: 1,
        }}
      >
        <h1 style={{
          fontSize: 30, fontWeight: 900, margin: '0 0 6px',
          color: meal.accentColor,
          textShadow: '0 2px 12px rgba(255,255,255,0.6)',
          lineHeight: 1.2,
        }}>
          {t.splash.heading(mealName)}
        </h1>

        {/* Ingredient pills */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            fontSize: 14, fontWeight: 700, color: '#555',
            margin: '0 0 6px', letterSpacing: 0.5,
          }}
        >
          {ingredientText}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          style={{ fontSize: 16, fontWeight: 600, color: '#444', margin: '0 0 8px' }}
        >
          {t.splash.tagline}
        </motion.p>

        {/* Price badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, type: 'spring', stiffness: 300, damping: 18 }}
          style={{
            display: 'inline-block',
            background: '#fff8e1', border: `2px solid #f9a825`,
            borderRadius: 20, padding: '5px 16px', fontSize: 18,
            fontWeight: 800, color: '#f57f17', margin: '0 0 18px',
          }}
        >
          💰 {formatPrice(getMealCostUSD(selectedMeal!, placedIngredients.length), language)}
        </motion.div>

        {/* Pulsing continue prompt */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.5, 1] }}
          transition={{ delay: 2.5, duration: 1.8, repeat: Infinity, repeatType: 'reverse' }}
          style={{ fontSize: 13, color: '#888', fontWeight: 600, margin: 0 }}
        >
          {t.splash.tapToContinue}
        </motion.p>
      </motion.div>

      {/* ── Progress bar ──────────────────────────────────────────────── */}
      <motion.div
        style={{
          position: 'absolute', bottom: 0, left: 0, height: 4,
          background: meal.accentColor, originX: 0,
        }}
        initial={{ scaleX: 0, width: '100%' }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 7, ease: 'linear' }}
      />
    </motion.div>
  );
};
