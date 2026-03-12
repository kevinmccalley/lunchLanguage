import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { useT } from '../../i18n/useT';
import { PizzaBase } from './plates/PizzaBase';
import { HamburgerStack } from './HamburgerStack';
import { BurritoAssembly } from './BurritoAssembly';
import { SaladAssembly } from './SaladAssembly';
import { SushiAssembly } from './SushiAssembly';
import { SandwichStack } from './SandwichStack';
import { getIngredientById } from '../../data/ingredients';

interface Props {
  plateRef: React.RefObject<HTMLDivElement | null>;
  burritoWrapping?: boolean;
}

export const MealPlate = ({ plateRef, burritoWrapping = false }: Props) => {
  const { selectedMeal, placedIngredients, pizzaSlices, removeIngredient } = useGameStore();
  const t = useT();

  if (!selectedMeal) return null;

  // ─── Pizza ──────────────────────────────────────────────────────────────────
  if (selectedMeal === 'pizza') {
    // Group placed ingredients by id for the chip removal bar
    const grouped: Record<string, typeof placedIngredients> = {};
    placedIngredients.forEach(item => {
      (grouped[item.ingredientId] ??= []).push(item);
    });

    return (
      <div
        ref={plateRef}
        style={{ position: 'relative', width: '100%', flex: 1, overflow: 'hidden', minHeight: 260 }}
      >
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <PizzaBase slices={pizzaSlices} placedIngredients={placedIngredients} />
        </div>

        {/* Ingredient removal chips */}
        {Object.keys(grouped).length > 0 && (
          <div style={{
            position: 'absolute', bottom: 6, left: 6, right: 6,
            display: 'flex', flexWrap: 'wrap', gap: 5, justifyContent: 'center',
          }}>
            {Object.entries(grouped).map(([id, items]) => {
              const ing = getIngredientById(id);
              const name = t.ingredients[id] ?? ing?.name ?? id;
              return (
                <motion.button
                  key={id}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeIngredient(items[items.length - 1].instanceId)}
                  style={{
                    background: 'rgba(255,255,255,0.92)', border: '2px solid #ff6b35',
                    borderRadius: 20, padding: '2px 10px', fontSize: 12, fontWeight: 700,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                    color: '#333', fontFamily: 'inherit', boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
                  }}
                >
                  {ing?.emoji} {name}
                  {items.length > 1 && <span style={{ color: '#ff6b35' }}>×{items.length}</span>}
                  <span style={{ color: '#ff6b35', marginLeft: 2 }}>✕</span>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // ─── Hamburger ──────────────────────────────────────────────────────────────
  if (selectedMeal === 'hamburger') {
    return (
      <div
        ref={plateRef}
        style={{ position: 'relative', width: '100%', flex: 1, overflow: 'hidden', minHeight: 260 }}
      >
        <HamburgerStack />
        {placedIngredients.length > 0 && (
          <div style={{ position: 'absolute', bottom: 8, right: 10, fontSize: 11, color: '#aaa', fontWeight: 500 }}>
            Tap a layer to remove 🗑️
          </div>
        )}
      </div>
    );
  }

  // ─── Burrito ─────────────────────────────────────────────────────────────────
  if (selectedMeal === 'burrito') {
    const grouped: Record<string, typeof placedIngredients> = {};
    placedIngredients.forEach(item => { (grouped[item.ingredientId] ??= []).push(item); });

    return (
      <div ref={plateRef} style={{ position: 'relative', width: '100%', flex: 1, overflow: 'hidden', minHeight: 260 }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <BurritoAssembly placedIngredients={placedIngredients} wrapping={burritoWrapping} />
        </div>
        {/* Ingredient removal chips — hidden while wrapping */}
        {Object.keys(grouped).length > 0 && !burritoWrapping && (
          <div style={{
            position: 'absolute', bottom: 6, left: 6, right: 6,
            display: 'flex', flexWrap: 'wrap', gap: 5, justifyContent: 'center',
          }}>
            {Object.entries(grouped).map(([id, items]) => {
              const ing = getIngredientById(id);
              const name = t.ingredients[id] ?? ing?.name ?? id;
              return (
                <motion.button
                  key={id}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeIngredient(items[items.length - 1].instanceId)}
                  style={{
                    background: 'rgba(255,255,255,0.92)', border: '2px solid #ff6b35',
                    borderRadius: 20, padding: '2px 10px', fontSize: 12, fontWeight: 700,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                    color: '#333', fontFamily: 'inherit', boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
                  }}
                >
                  {ing?.emoji} {name}
                  {items.length > 1 && <span style={{ color: '#ff6b35' }}>×{items.length}</span>}
                  <span style={{ color: '#ff6b35', marginLeft: 2 }}>✕</span>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // ─── Salad ───────────────────────────────────────────────────────────────────
  if (selectedMeal === 'salad') {
    const grouped: Record<string, typeof placedIngredients> = {};
    placedIngredients.forEach(item => { (grouped[item.ingredientId] ??= []).push(item); });

    return (
      <div ref={plateRef} style={{ position: 'relative', width: '100%', flex: 1, overflow: 'hidden', minHeight: 260 }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <SaladAssembly placedIngredients={placedIngredients} />
        </div>
        {Object.keys(grouped).length > 0 && (
          <div style={{
            position: 'absolute', bottom: 6, left: 6, right: 6,
            display: 'flex', flexWrap: 'wrap', gap: 5, justifyContent: 'center',
          }}>
            {Object.entries(grouped).map(([id, items]) => {
              const ing = getIngredientById(id);
              const name = t.ingredients[id] ?? ing?.name ?? id;
              return (
                <motion.button
                  key={id}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeIngredient(items[items.length - 1].instanceId)}
                  style={{
                    background: 'rgba(255,255,255,0.92)', border: '2px solid #2e7d32',
                    borderRadius: 20, padding: '2px 10px', fontSize: 12, fontWeight: 700,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                    color: '#333', fontFamily: 'inherit', boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
                  }}
                >
                  {ing?.emoji} {name}
                  {items.length > 1 && <span style={{ color: '#2e7d32' }}>×{items.length}</span>}
                  <span style={{ color: '#2e7d32', marginLeft: 2 }}>✕</span>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // ─── Sushi ───────────────────────────────────────────────────────────────────
  if (selectedMeal === 'sushi') {
    const grouped: Record<string, typeof placedIngredients> = {};
    placedIngredients.forEach(item => { (grouped[item.ingredientId] ??= []).push(item); });

    return (
      <div ref={plateRef} style={{ position: 'relative', width: '100%', flex: 1, overflow: 'hidden', minHeight: 260 }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <SushiAssembly placedIngredients={placedIngredients} />
        </div>
        {Object.keys(grouped).length > 0 && (
          <div style={{
            position: 'absolute', bottom: 6, left: 6, right: 6,
            display: 'flex', flexWrap: 'wrap', gap: 5, justifyContent: 'center',
          }}>
            {Object.entries(grouped).map(([id, items]) => {
              const ing = getIngredientById(id);
              const name = t.ingredients[id] ?? ing?.name ?? id;
              return (
                <motion.button
                  key={id}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeIngredient(items[items.length - 1].instanceId)}
                  style={{
                    background: 'rgba(255,255,255,0.92)', border: '2px solid #1c2e1c',
                    borderRadius: 20, padding: '2px 10px', fontSize: 12, fontWeight: 700,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                    color: '#333', fontFamily: 'inherit', boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
                  }}
                >
                  {ing?.emoji} {name}
                  {items.length > 1 && <span style={{ color: '#1c2e1c' }}>×{items.length}</span>}
                  <span style={{ color: '#1c2e1c', marginLeft: 2 }}>✕</span>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // ─── Sandwich ────────────────────────────────────────────────────────────────
  return (
    <div
      ref={plateRef}
      style={{ position: 'relative', width: '100%', flex: 1, overflow: 'hidden', minHeight: 260 }}
    >
      <SandwichStack />
      {placedIngredients.length > 0 && (
        <div style={{ position: 'absolute', bottom: 8, right: 10, fontSize: 11, color: '#aaa', fontWeight: 500 }}>
          Tap a layer to remove 🗑️
        </div>
      )}
    </div>
  );
};
