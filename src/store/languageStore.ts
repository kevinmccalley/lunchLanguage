import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Language } from '../i18n/types';

interface LanguageStore {
  language: Language;
  learningLanguage: Language | null;
  speechEnabled: boolean;
  hasCompletedSetup: boolean;
  setLanguage: (lang: Language) => void;
  setLearningLanguage: (lang: Language | null) => void;
  setSpeechEnabled: (enabled: boolean) => void;
  setHasCompletedSetup: (done: boolean) => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'en',
      learningLanguage: null,
      speechEnabled: true,
      hasCompletedSetup: false,
      setLanguage:           (language)         => set({ language }),
      setLearningLanguage:   (learningLanguage) => set({ learningLanguage }),
      setSpeechEnabled:      (speechEnabled)    => set({ speechEnabled }),
      setHasCompletedSetup:  (hasCompletedSetup)=> set({ hasCompletedSetup }),
    }),
    { name: 'lunch-language-lang' }
  )
);
