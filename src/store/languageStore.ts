import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Language } from '../i18n/types';

interface LanguageStore {
  language: Language;
  learningLanguage: Language | null;
  speechEnabled: boolean;
  hasCompletedSetup: boolean;
  showSetup: boolean;
  setLanguage: (lang: Language) => void;
  setLearningLanguage: (lang: Language | null) => void;
  setSpeechEnabled: (enabled: boolean) => void;
  setHasCompletedSetup: (done: boolean) => void;
  setShowSetup: (show: boolean) => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'en-US',
      learningLanguage: null,
      speechEnabled: true,
      hasCompletedSetup: false,
      showSetup: false,
      setLanguage:           (language)         => set({ language }),
      setLearningLanguage:   (learningLanguage) => set({ learningLanguage }),
      setSpeechEnabled:      (speechEnabled)    => set({ speechEnabled }),
      setHasCompletedSetup:  (hasCompletedSetup)=> set({ hasCompletedSetup }),
      setShowSetup:          (showSetup)        => set({ showSetup }),
    }),
    { name: 'lunch-language-lang' }
  )
);
