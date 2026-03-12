import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { getMealInfo } from '../../data/meals';
import { generateQuestions } from './generateQuestions';
import { NumberPad } from './NumberPad';
import { ChefDialog } from '../Chef/ChefDialog';
import { StarScore } from '../UI/StarScore';
import { Button } from '../UI/Button';
import { useT } from '../../i18n/useT';
import { useLanguageStore } from '../../store/languageStore';
import { useSpeech } from '../../hooks/useSpeech';

export const MathQuiz = () => {
  const {
    selectedMeal, placedIngredients, familySize, pizzaSlices,
    currentQuestionIndex, addScore, nextQuestion, setPhase, setChefMessage,
  } = useGameStore();

  const meal = getMealInfo(selectedMeal!);
  const t = useT();
  const { language } = useLanguageStore();
  const mealName = t.meals[selectedMeal!].name;
  const getIngName = (id: string) => t.ingredients[id] ?? id;

  const questions = useMemo(
    () => generateQuestions(placedIngredients, familySize, pizzaSlices, t.mathQuiz, mealName, getIngName),
    [language] // regenerate when language changes (quiz restarts anyway)
  );

  const { speak } = useSpeech();
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const currentQ = questions[currentQuestionIndex];
  const isFinished = currentQuestionIndex >= questions.length;

  // Build ingredient summary for the reference panel
  const counts: Record<string, number> = {};
  for (const item of placedIngredients) {
    counts[item.ingredientId] = (counts[item.ingredientId] ?? 0) + 1;
  }
  const ingredientSummary = Object.entries(counts);

  // Fallback: if somehow stuck in finished state without phase change, advance
  useEffect(() => {
    if (isFinished) {
      const t = setTimeout(() => setPhase('celebration'), 400);
      return () => clearTimeout(t);
    }
  }, [isFinished]);

  // Re-translate chef message when language changes
  useEffect(() => {
    setChefMessage(t.kitchen.doneMessage, 'excited');
  }, [t]);

  // Speak each question as it appears
  useEffect(() => {
    if (currentQ) speak(currentQ.question);
  }, [currentQ?.id]);

  // Speak hint when it becomes visible
  useEffect(() => {
    if (showHint && currentQ) speak(`${t.mathQuiz.hintPrefix} ${currentQ.hint}`);
  }, [showHint]);

  const handleAnswer = (value: number) => {
    if (!currentQ) return;

    if (value === currentQ.answer) {
      setFeedback('correct');
      const points = attempts === 0 ? 10 : attempts === 1 ? 7 : 5;
      addScore(points);
      const msgs = t.mathQuiz.correctMessages;
      const cheer = msgs[Math.floor(Math.random() * msgs.length)];
      setChefMessage(`${cheer} +${points} ⭐`, 'cheering');

      setTimeout(() => {
        setFeedback(null);
        setAttempts(0);
        setShowHint(false);
        if (currentQuestionIndex + 1 >= questions.length) {
          setChefMessage(t.mathQuiz.finalMessage, 'cheering');
          setPhase('celebration');
        } else {
          nextQuestion();
          setChefMessage(t.mathQuiz.nextMessage, 'excited');
        }
      }, 1800);
    } else {
      setFeedback('wrong');
      setAttempts(a => a + 1);
      const msgs = t.mathQuiz.wrongMessages;
      const enc = msgs[Math.floor(Math.random() * msgs.length)];
      setChefMessage(enc, 'thinking');
      setShowHint(true);
      setTimeout(() => setFeedback(null), 1200);
    }
  };

  const handleSkip = () => {
    if (!currentQ) return;
    setChefMessage(t.mathQuiz.skipReveal(currentQ.answer), 'happy');
    setFeedback(null);
    setAttempts(0);
    setShowHint(false);
    if (currentQuestionIndex + 1 >= questions.length) {
      setPhase('celebration');
    } else {
      nextQuestion();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${meal.bgColor} 0%, white 100%)`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'auto',
      }}
    >
      {/* Header */}
      <div style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px 10px 152px', background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        boxSizing: 'border-box',
      }}>
        <span style={{ fontSize: 18, fontWeight: 800, color: meal.accentColor }}>
          {t.mathQuiz.title}
        </span>
        <StarScore />
      </div>

      <div style={{ padding: '12px 16px', width: '100%', maxWidth: 480, boxSizing: 'border-box' }}>
        <ChefDialog compact />

        {/* Progress dots */}
        <div style={{ margin: '10px 0', display: 'flex', gap: 6, justifyContent: 'center' }}>
          {questions.map((_, i) => (
            <div key={i} style={{
              width: 28, height: 8, borderRadius: 4,
              background: i < currentQuestionIndex ? '#27ae60'
                : i === currentQuestionIndex ? meal.accentColor : '#e0e0e0',
              transition: 'background 0.3s',
            }} />
          ))}
        </div>

        {/* Ingredient recap — lets kids count while answering */}
        {ingredientSummary.length > 0 && (
          <div style={{
            background: 'white', borderRadius: 14, padding: '8px 12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.07)', marginBottom: 10,
            display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center',
          }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#aaa', letterSpacing: 0.5, marginRight: 2 }}>
              YOUR INGREDIENTS:
            </span>
            {ingredientSummary.map(([id, n]) => {
              const ingName = getIngName(id);
              return (
                <span key={id} style={{
                  background: meal.bgColor, borderRadius: 20, padding: '3px 9px',
                  fontSize: 13, fontWeight: 700, color: meal.accentColor,
                  border: `1.5px solid ${meal.accentColor}22`,
                  display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  {ingName} ×{n}
                </span>
              );
            })}
          </div>
        )}

        {!isFinished && currentQ && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              style={{
                background: 'white', borderRadius: 20, padding: 20,
                boxShadow: '0 4px 24px rgba(0,0,0,0.1)', border: `3px solid ${meal.accentColor}`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
                marginBottom: 12,
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: '#aaa', letterSpacing: 1 }}>
                {t.mathQuiz.questionOf(currentQuestionIndex + 1, questions.length)}
              </div>

              <motion.div
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ fontSize: 48 }}
              >
                {currentQ.visual}
              </motion.div>

              <p style={{ fontSize: 16, fontWeight: 700, color: '#2c2c2c', textAlign: 'center', margin: 0, lineHeight: 1.5 }}>
                {currentQ.question}
              </p>

              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{
                      background: '#fff3e0', border: '2px solid #ff9800', borderRadius: 12,
                      padding: '8px 14px', fontSize: 13, color: '#e65100', fontWeight: 600,
                      width: '100%', boxSizing: 'border-box', textAlign: 'center',
                    }}
                  >
                    {t.mathQuiz.hintPrefix} {currentQ.hint}
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {feedback && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    style={{ fontSize: 40, textAlign: 'center' }}
                  >
                    {feedback === 'correct' ? '✅' : '❌'}
                  </motion.div>
                )}
              </AnimatePresence>

              <NumberPad onSubmit={handleAnswer} />

              {attempts >= 2 && (
                <Button variant="secondary" size="sm" onClick={handleSkip}>
                  {t.mathQuiz.skipButton}
                </Button>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};
