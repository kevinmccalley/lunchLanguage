import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGameStore } from './store/gameStore';
import { useT } from './i18n/useT';
import { WelcomeScreen } from './components/UI/WelcomeScreen';
import { MealSelector } from './components/MealSelector/MealSelector';
import { FamilySelector } from './components/MealSelector/FamilySelector';
import { Kitchen } from './components/Kitchen/Kitchen';
import { MathQuiz } from './components/MathQuiz/MathQuiz';
import { CelebrationScreen } from './components/UI/CelebrationScreen';
import { LanguageSelector } from './components/UI/LanguageSelector';
import { LanguageSetup } from './components/UI/LanguageSetup';

function App() {
  const { phase } = useGameStore();
  const t = useT();

  // Keep the browser tab title in sync with the selected language
  useEffect(() => {
    document.title = `${t.welcome.title} 🍽️`;
  }, [t.welcome.title]);

  return (
    <div style={{ fontFamily: "'Nunito', 'Comic Sans MS', 'Segoe UI', system-ui, sans-serif" }}>
      <LanguageSetup />
      <LanguageSelector />
      <AnimatePresence mode="wait">
        {phase === 'welcome'      && <WelcomeScreen key="welcome" />}
        {phase === 'mealSelect'   && <MealSelector key="mealSelect" />}
        {phase === 'familySelect' && <FamilySelector key="familySelect" />}
        {phase === 'cooking'      && <Kitchen key="cooking" />}
        {phase === 'mathQuiz'     && <MathQuiz key="mathQuiz" />}
        {phase === 'celebration'  && <CelebrationScreen key="celebration" />}
      </AnimatePresence>
    </div>
  );
}

export default App;
