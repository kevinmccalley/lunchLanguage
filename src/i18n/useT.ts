import { useLanguageStore } from '../store/languageStore';
import { TRANSLATIONS } from './translations';
import type { Translations } from './types';

export const useT = (): Translations => {
  const { language } = useLanguageStore();
  return TRANSLATIONS[language];
};
