import type { MathQuestion, PlacedIngredient, MealType } from '../../types';
import type { MathQuizT, Language } from '../../i18n/types';
import { CURRENCY, MEAL_BASE_PRICE, getMealCostUSD } from '../../utils/currency';

export const generateQuestions = (
  placedIngredients: PlacedIngredient[],
  familySize: number,
  pizzaSlices: number,
  qt: MathQuizT,
  mealName: string,
  getIngName: (id: string) => string,
  mealId?: MealType,
  language?: Language,
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

  // ── Currency questions (up to 2) ─────────────────────────────────────────
  const currencyQs: MathQuestion[] = [];

  if (mealId && language) {
    const c = CURRENCY[language];
    const costUSD = getMealCostUSD(mealId, total);
    const baseUnits = Math.round(MEAL_BASE_PRICE[mealId] * c.mathMult);
    const extraUnits = total * c.ingCost;
    const totalUnits = baseUnits + extraUnits;

    // Currency Q1 — ingredient cost (multiplication: count × ingCost)
    if (total > 0 && total * c.ingCost <= 999) {
      currencyQs.push({
        id: 'ing_cost',
        type: 'multiply',
        question: qt.qIngCost(total, c.ingCost, c.unitLabel),
        answer: total * c.ingCost,
        hint: qt.hIngCost(total, c.ingCost),
        visual: '💰',
      });
    }

    // Currency Q2 — meal total cost (addition: base + extra, in math units)
    if (totalUnits <= 999) {
      currencyQs.push({
        id: 'meal_cost',
        type: 'count',
        question: qt.qMealCost(mealName, baseUnits, total, c.ingCost, c.unitLabel),
        answer: totalUnits,
        hint: qt.hMealCost(baseUnits, extraUnits),
        visual: '🧾',
      });
    }

    // Currency Q3 — family cost (multiply whole display price × family)
    const wholeDisplayCost = Math.round(costUSD * c.displayMult);
    const familyCostAnswer = wholeDisplayCost * familySize;
    if (familySize > 1 && familyCostAnswer <= 999) {
      const costStr = `${c.symbol}${wholeDisplayCost}`;
      currencyQs.push({
        id: 'family_cost',
        type: 'multiply',
        question: qt.qFamilyCost(costStr, familySize),
        answer: familyCostAnswer,
        hint: qt.hFamilyCost(wholeDisplayCost, familySize),
        visual: '👨‍👩‍👧',
      });
    }

    // Currency Q4 — change (pick smallest bill larger than cost)
    const bill = c.bills.find(b => b > wholeDisplayCost);
    if (bill !== undefined) {
      const change = bill - wholeDisplayCost;
      if (change > 0 && change <= 999) {
        const billStr = `${c.symbol}${bill}`;
        const costStr = `${c.symbol}${wholeDisplayCost}`;
        currencyQs.push({
          id: 'change',
          type: 'count',
          question: qt.qChange(billStr, costStr),
          answer: change,
          hint: qt.hChange(bill, wholeDisplayCost),
          visual: '🪙',
        });
      }
    }
  }

  // Insert up to 2 currency questions after Q1 (total count)
  const [q1, ...rest] = questions;
  const selected = currencyQs.slice(0, 2);
  const combined = [q1, ...selected, ...rest];

  return combined.slice(0, 8);
};
