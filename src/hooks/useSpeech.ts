import { useCallback } from 'react';
import { useLanguageStore } from '../store/languageStore';
import type { Language } from '../i18n/types';

/** Maps our Language codes to BCP-47 tags that SpeechSynthesis understands. */
export const LANG_BCP47: Record<Language, string> = {
  en:      'en-GB',
  es:      'es-ES',
  fr:      'fr-FR',
  de:      'de-DE',
  ja:      'ja-JP',
  zh:      'zh-CN',
  pt:      'pt-PT',
  'pt-BR': 'pt-BR',
};

const cancel = () => {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
};

/**
 * Speak `text` in the given language (or the current UI language if omitted).
 * Cancels any in-flight utterance first.
 */
const say = (text: string, lang: Language, rate = 0.88, pitch = 1.1) => {
  if (typeof window === 'undefined' || !window.speechSynthesis || !text.trim()) return;
  cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = LANG_BCP47[lang];
  utt.rate = rate;
  utt.pitch = pitch;
  utt.volume = 1;
  // Small delay so the browser doesn't drop it after a state update
  setTimeout(() => window.speechSynthesis.speak(utt), 80);
};

export const useSpeech = () => {
  const { speechEnabled, language } = useLanguageStore();

  /** Speak in the current native UI language (auto-narration). */
  const speak = useCallback((text: string) => {
    if (!speechEnabled) return;
    say(text, language);
  }, [speechEnabled, language]);

  /** Speak in the learning language (for tooltips). Always works regardless of speechEnabled. */
  const speakLearning = useCallback((text: string, learningLang: Language) => {
    say(text, learningLang, 0.75, 1.0); // slower for comprehension
  }, []);

  return { speak, speakLearning, stop: cancel };
};
