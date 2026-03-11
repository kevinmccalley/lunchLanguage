import { AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { DraggableIngredient } from '../Ingredients/DraggableIngredient';
import { PizzaBase } from './plates/PizzaBase';
import { HamburgerBase } from './plates/HamburgerBase';
import { BurritoBase } from './plates/BurritoBase';
import { SaladBase } from './plates/SaladBase';
import { SushiBase } from './plates/SushiBase';
import { SandwichBase } from './plates/SandwichBase';

interface Props {
  plateRef: React.RefObject<HTMLDivElement | null>;
}

const PlateComponents = {
  pizza:     PizzaBase,
  hamburger: HamburgerBase,
  burrito:   BurritoBase,
  salad:     SaladBase,
  sushi:     SushiBase,
  sandwich:  SandwichBase,
};

export const MealPlate = ({ plateRef }: Props) => {
  const { selectedMeal, placedIngredients, pizzaSlices } = useGameStore();

  if (!selectedMeal) return null;

  const PlateBase = PlateComponents[selectedMeal];

  return (
    <div
      ref={plateRef}
      style={{
        position: 'relative',
        width: '100%',
        flex: 1,
        overflow: 'hidden',
        minHeight: 260,
      }}
    >
      {/* Plate/food base illustration */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <PlateBase slices={pizzaSlices} />
      </div>

      {/* Draggable placed ingredients */}
      <AnimatePresence>
        {placedIngredients.map((item) => (
          <DraggableIngredient key={item.instanceId} item={item} containerRef={plateRef} />
        ))}
      </AnimatePresence>

      {/* Trash hint */}
      {placedIngredients.length > 0 && (
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            right: 10,
            fontSize: 11,
            color: '#aaa',
            fontWeight: 500,
          }}
        >
          Double-tap to remove 🗑️
        </div>
      )}
    </div>
  );
};
