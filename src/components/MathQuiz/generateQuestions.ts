import type { MathQuestion, PlacedIngredient } from '../../types';
import type { MathQuizT } from '../../i18n/types';

export const generateQuestions = (
  placedIngredients: PlacedIngredient[],
  familySize: number,
  pizzaSlices: number,
  qt: MathQuizT,
  mealName: string,
  getIngName: (id: string) => string
): MathQuestion[] => {
  const questions: MathQuestion[] = [];

  // Build counts map
  const counts: Record<string, number> = {};
  for (const item of placedIngredients) {
    counts[item.ingredientId] = (counts[item.ingredientId] ?? 0) + 1;
  }

  const total = placedIngredients.length;
  const types = Object.keys(counts);
  const sorted = [...types].sort((a, b) => counts[b] - counts[a]);

  // Q1 — total ingredient count
  questions.push({
    id: 'total',
    type: 'count',
    question: qt.qTotal(mealName),
    answer: total,
    hint: qt.hTotal(mealName),
    visual: '🧮',
  });

  // Q2 — count of most common ingredient
  if (types.length > 0) {
    const topId = sorted[0];
    const topName = getIngName(topId);
    questions.push({
      id: `count_${topId}`,
      type: 'count',
      question: qt.qCountIngredient(topName, '', mealName),
      answer: counts[topId],
      hint: qt.hCountIngredient(topName),
      visual: '🔢',
    });
  }

  // Q3 — addition: combine two ingredient types
  if (types.length >= 2) {
    const idA = sorted[0];
    const idB = sorted[1];
    const nA = getIngName(idA);
    const nB = getIngName(idB);
    questions.push({
      id: 'combined',
      type: 'count',
      question: qt.qCombined(counts[idA], nA, counts[idB], nB),
      answer: counts[idA] + counts[idB],
      hint: qt.hCombined(counts[idA], counts[idB]),
      visual: '➕',
    });
  }

  // Q4 — subtraction: how many are NOT the top ingredient
  if (types.length > 0 && total > 0) {
    const topId = sorted[0];
    const topName = getIngName(topId);
    const notCount = total - counts[topId];
    if (notCount > 0) {
      questions.push({
        id: 'not_type',
        type: 'count',
        question: qt.qNotType(total, counts[topId], topName, mealName),
        answer: notCount,
        hint: qt.hNotType(total, counts[topId]),
        visual: '➖',
      });
    }
  }

  // Q5 — pizza slice division OR family multiplication
  const isPizza = mealName.toLowerCase().includes('pizza') || mealName === 'ピザ' || mealName === '披萨';
  if (isPizza && types.length > 0) {
    const topId = sorted[0];
    const topName = getIngName(topId);
    const count = counts[topId];
    if (count >= pizzaSlices && count % pizzaSlices === 0) {
      questions.push({
        id: 'per_slice',
        type: 'divide',
        question: qt.qPerSlice(pizzaSlices, topName, '', count),
        answer: Math.floor(count / pizzaSlices),
        hint: qt.hPerSlice(count, pizzaSlices),
        visual: '🍕',
      });
    } else {
      questions.push({
        id: 'how_many_slices',
        type: 'count',
        question: qt.qHowManySlices(pizzaSlices),
        answer: pizzaSlices,
        hint: qt.hHowManySlices,
        visual: '🍕',
      });
    }
  } else if (familySize > 1 && types.length > 0) {
    const topId = sorted[0];
    const topName = getIngName(topId);
    const count = counts[topId];
    questions.push({
      id: 'family_multiply',
      type: 'multiply',
      question: qt.qFamilyMultiply(familySize, count, '', topName),
      answer: count * familySize,
      hint: qt.hFamilyMultiply(count, familySize),
      visual: '👨‍👩‍👧',
    });
  }

  // Q6 — unique ingredient types
  questions.push({
    id: 'unique_types',
    type: 'count',
    question: qt.qUniqueTypes(mealName),
    answer: types.length,
    hint: qt.hUniqueTypes,
    visual: '🌈',
  });

  // Q7 — comparison (only when there is a real difference)
  if (types.length >= 2) {
    const mostId = sorted[0];
    const leastId = sorted[sorted.length - 1];
    const diff = counts[mostId] - counts[leastId];
    if (diff > 0) {
      const nA = getIngName(mostId);
      const nB = getIngName(leastId);
      questions.push({
        id: 'compare',
        type: 'compare',
        question: qt.qCompare(counts[mostId], '', nA, counts[leastId], '', nB),
        answer: diff,
        hint: qt.hCompare(counts[mostId], counts[leastId]),
        visual: '⚖️',
      });
    }
  }

  // Q8 — total for the whole family (if family and not already covered by Q5)
  if (familySize > 1 && isPizza) {
    questions.push({
      id: 'total_family',
      type: 'multiply',
      question: qt.qTotalFamily(total, mealName, familySize),
      answer: total * familySize,
      hint: qt.hTotalFamily(total, familySize),
      visual: '👨‍👩‍👧',
    });
  }

  return questions.slice(0, 6);
};
