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

  // Q1 — total ingredient count
  questions.push({
    id: 'total',
    type: 'count',
    question: qt.qTotal(mealName),
    answer: total,
    hint: qt.hTotal(mealName),
    visual: '🧮',
  });

  // Q2 — per ingredient count (pick highest count)
  if (types.length > 0) {
    const topId = types.reduce((a, b) => counts[a] > counts[b] ? a : b);
    const topName = getIngName(topId);
    // Find emoji from placed ingredient
    const topEmoji = placedIngredients.find(i => i.ingredientId === topId) ? '' : '';
    questions.push({
      id: `count_${topId}`,
      type: 'count',
      question: qt.qCountIngredient(topName, topEmoji, mealName),
      answer: counts[topId],
      hint: qt.hCountIngredient(topName),
      visual: topEmoji || '🔢',
    });
  }

  // Q3 — pizza slice division
  if (mealName.toLowerCase().includes('pizza') || mealName === 'ピザ' || mealName === '披萨') {
    const topId = types.length > 0
      ? types.reduce((a, b) => counts[a] > counts[b] ? a : b)
      : null;
    if (topId) {
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
    }
  }

  // Q4 — family multiplication (per ingredient)
  if (familySize > 1 && types.length > 0) {
    const topId = types.reduce((a, b) => counts[a] > counts[b] ? a : b);
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

  // Q5 — total for the family
  if (familySize > 1) {
    questions.push({
      id: 'total_family',
      type: 'multiply',
      question: qt.qTotalFamily(total, mealName, familySize),
      answer: total * familySize,
      hint: qt.hTotalFamily(total, familySize),
      visual: '👨‍👩‍👧',
    });
  }

  // Q6 — unique types
  questions.push({
    id: 'unique_types',
    type: 'count',
    question: qt.qUniqueTypes(mealName),
    answer: types.length,
    hint: qt.hUniqueTypes,
    visual: '🌈',
  });

  // Q7 — comparison
  if (types.length >= 2) {
    const sorted = [...types].sort((a, b) => counts[b] - counts[a]);
    const mostId = sorted[0];
    const leastId = sorted[sorted.length - 1];
    if (mostId !== leastId) {
      const nA = getIngName(mostId);
      const nB = getIngName(leastId);
      questions.push({
        id: 'compare',
        type: 'compare',
        question: qt.qCompare(counts[mostId], '', nA, counts[leastId], '', nB),
        answer: counts[mostId] - counts[leastId],
        hint: qt.hCompare(counts[mostId], counts[leastId]),
        visual: '⚖️',
      });
    }
  }

  return questions.slice(0, 6);
};
