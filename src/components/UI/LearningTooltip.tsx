import { useState, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ReactCountryFlag from 'react-country-flag';
import { useLanguageStore } from '../../store/languageStore';
import { TRANSLATIONS, LANGUAGE_OPTIONS } from '../../i18n/translations';
import { useSpeech } from '../../hooks/useSpeech';
import { useT } from '../../i18n/useT';
import type { MealType } from '../../types';

interface Props {
  children: ReactNode;
  /** For ingredient lookups */
  ingredientKey?: string;
  /** For meal name lookups */
  mealId?: MealType;
  /** Pre-computed native word (used to build the tooltip sentence) */
  nativeWord: string;
}

interface TooltipPos { top: number; left: number; }

export const LearningTooltip = ({ children, ingredientKey, mealId, nativeWord }: Props) => {
  const { learningLanguage } = useLanguageStore();
  const { speakLearning } = useSpeech();
  const t = useT();
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState<TooltipPos>({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // No learning language selected → render children as-is
  if (!learningLanguage) return <>{children}</>;

  const learningT = TRANSLATIONS[learningLanguage];
  const langOption = LANGUAGE_OPTIONS.find(o => o.code === learningLanguage);
  const langName = t.langNames[learningLanguage];

  // Look up the translation in the learning language
  let learningWord: string | undefined;
  if (ingredientKey) {
    learningWord = learningT.ingredients[ingredientKey];
  } else if (mealId) {
    learningWord = learningT.meals[mealId]?.name;
  }

  if (!learningWord) return <>{children}</>;

  const tooltipSentence = t.tooltip.isInLanguage(nativeWord, learningWord, langName);

  const computePos = () => {
    if (!triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    // Use viewport coords directly — paired with position:fixed so no scroll offset needed
    setPos({
      top: r.top - 8,
      left: r.left + r.width / 2,
    });
  };

  const show = () => {
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
    computePos();
    setVisible(true);
    speakLearning(learningWord!, learningLanguage);
  };

  const hide = () => {
    dismissTimer.current = setTimeout(() => setVisible(false), 200);
  };

  const hideFast = () => setVisible(false);

  const tooltip = (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.92 }}
          transition={{ duration: 0.15, type: 'spring', stiffness: 500, damping: 28 }}
          onMouseEnter={() => { if (dismissTimer.current) clearTimeout(dismissTimer.current); }}
          onMouseLeave={hideFast}
          style={{
            position: 'fixed',
            // pos already contains (r.top - 8); transform moves the element up by its own height
            // so the bottom edge sits exactly 8px above the top of the trigger
            top: pos.top,
            left: pos.left,
            transform: 'translate(-50%, -100%)',
            zIndex: 99999,
            background: 'white',
            border: '2px solid #ff6b35',
            borderRadius: 12,
            padding: '8px 12px',
            boxShadow: '0 6px 24px rgba(0,0,0,0.15)',
            minWidth: 180,
            maxWidth: 260,
            textAlign: 'center',
            whiteSpace: 'normal',
            pointerEvents: 'auto',
          }}
        >
          {/* Arrow pointing down */}
          <div style={{
            position: 'absolute', bottom: -9, left: '50%', transform: 'translateX(-50%)',
            width: 0, height: 0,
            borderLeft: '8px solid transparent', borderRight: '8px solid transparent',
            borderTop: '9px solid #ff6b35',
          }} />
          <div style={{
            position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)',
            width: 0, height: 0,
            borderLeft: '7px solid transparent', borderRight: '7px solid transparent',
            borderTop: '8px solid white',
          }} />

          {/* Flag + big word */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginBottom: 4 }}>
            {langOption && (
              <ReactCountryFlag
                countryCode={langOption.countryCode}
                svg
                style={{ width: 22, height: 15, borderRadius: 2, objectFit: 'cover' }}
              />
            )}
            <span style={{ fontSize: 17, fontWeight: 900, color: '#ff6b35' }}>
              {learningWord}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); speakLearning(learningWord!, learningLanguage); }}
              title="Hear it"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 16, lineHeight: 1, padding: 2,
              }}
            >
              🔊
            </button>
          </div>

          {/* Sentence */}
          <div style={{ fontSize: 11, color: '#666', fontWeight: 500, lineHeight: 1.4 }}>
            {tooltipSentence}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div
      ref={triggerRef}
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={show}
      onMouseLeave={hide}
      onTouchStart={(e) => {
        e.preventDefault();
        if (visible) { hideFast(); } else { show(); dismissTimer.current = setTimeout(hideFast, 3000); }
      }}
    >
      {children}
      {createPortal(tooltip, document.body)}
    </div>
  );
};
