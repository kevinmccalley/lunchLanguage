// @ts-nocheck
import { renderHook, act } from '@testing-library/react';
import { useSpeech, LANG_BCP47 } from '../src/hooks/useSpeech';
import { useLanguageStore } from '../src/store/languageStore';
import type { Language } from '../src/i18n/types';

jest.mock('../src/store/languageStore');

describe('LANG_BCP47', () => {
  it('should contain all supported languages', () => {
    const languages: Language[] = [
      'en-US',
      'en-GB',
      'es',
      'fr',
      'de',
      'ja',
      'zh',
      'pt',
      'pt-BR',
    ];

    languages.forEach((lang) => {
      expect(LANG_BCP47[lang]).toBeDefined();
    });
  });

  it('should map en-US to en-US', () => {
    expect(LANG_BCP47['en-US']).toBe('en-US');
  });

  it('should map en-GB to en-GB', () => {
    expect(LANG_BCP47['en-GB']).toBe('en-GB');
  });

  it('should map es to es-ES', () => {
    expect(LANG_BCP47['es']).toBe('es-ES');
  });

  it('should map fr to fr-FR', () => {
    expect(LANG_BCP47['fr']).toBe('fr-FR');
  });

  it('should map de to de-DE', () => {
    expect(LANG_BCP47['de']).toBe('de-DE');
  });

  it('should map ja to ja-JP', () => {
    expect(LANG_BCP47['ja']).toBe('ja-JP');
  });

  it('should map zh to zh-CN', () => {
    expect(LANG_BCP47['zh']).toBe('zh-CN');
  });

  it('should map pt to pt-PT', () => {
    expect(LANG_BCP47['pt']).toBe('pt-PT');
  });

  it('should map pt-BR to pt-BR', () => {
    expect(LANG_BCP47['pt-BR']).toBe('pt-BR');
  });
});

describe('useSpeech', () => {
  let mockSpeechSynthesis: {
    speak: jest.Mock;
    cancel: jest.Mock;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockSpeechSynthesis = {
      speak: jest.fn(),
      cancel: jest.fn(),
    };

    Object.defineProperty(window, 'speechSynthesis', {
      value: mockSpeechSynthesis,
      writable: true,
      configurable: true,
    });

    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('speak', () => {
    it('should speak text when speechEnabled is true', () => {
      (useLanguageStore as jest.Mock).mockReturnValue({
        speechEnabled: true,
        language: 'en-US',
      });

      const { result } = renderHook(() => useSpeech());

      act(() => {
        result.current.speak('Hello world');
      });

      jest.runAllTimers();

      expect(mockSpeechSynthesis.speak).toHaveBeenCalled();
      const utterance = mockSpeechSynthesis.speak.mock.calls[0][0];
      expect(utterance.text).toBe('Hello world');
      expect(utterance.lang).toBe('en-US');
      expect(utterance.rate).toBe(0.88);
      expect(utterance.pitch).toBe(1.1);
      expect(utterance.volume).toBe(1);
    });

    it('should not speak when speechEnabled is false', () => {
      (useLanguageStore as jest.Mock).mockReturnValue({
        speechEnabled: false,
        language: 'en-US',
      });

      const { result } = renderHook(() => useSpeech());

      act(() => {
        result.current.speak('Hello world');
      });

      jest.runAllTimers();

      expect(mockSpeechSynthesis.speak).not.toHaveBeenCalled();
    });

    it('should use the current language from store', () => {
      (useLanguageStore as jest.Mock).mockReturnValue({
        speechEnabled: true,
        language: 'fr',
      });

      const { result } = renderHook(() => useSpeech());

      act(() => {
        result.current.speak('Bonjour');
      });

      jest.runAllTimers();

      const utterance = mockSpeechSynthesis.speak.mock.calls[0][0];
      expect(utterance.lang).toBe('fr-FR');
    });

    it('should cancel previous speech before speaking', () => {
      (useLanguageStore as jest.Mock).mockReturnValue({
        speechEnabled: true,
        language: 'en-US',
      });

      const { result } = renderHook(() => useSpeech());

      act(() => {
        result.current.speak('First');
        result.current.speak('Second');
      });

      jest.runAllTimers();

      expect(mockSpeechSynthesis.cancel).toHaveBeenCalled();
    });

    it('should handle empty text gracefully', () => {
      (useLanguageStore as jest.Mock).mockReturnValue({
        speechEnabled: true,
        language: 'en-US',
      });

      const { result } = renderHook(() => useSpeech());

      act(() => {
        result.current.speak('');
      });

      jest.runAllTimers();

      expect(mockSpeechSynthesis.speak).not.toHaveBeenCalled();
    });

    it('should handle whitespace-only text gracefully', () => {
      (useLanguageStore as jest.Mock).mockReturnValue({
        speechEnabled: true,
        language: 'en-US',
      });

      const { result } = renderHook(() => useSpeech());

      act(() => {
        result.current.speak('   ');
      });

      jest.runAllTimers();

      expect(mockSpeechSynthesis.speak).not.toHaveBeenCalled();
    });

    it('should update when language changes', () => {
      const { rerender } = renderHook(() => useSpeech(), {
        initialProps: undefined,
      });

      (useLanguageStore as jest.Mock).mockReturnValue({
        speechEnabled: true,
        language: 'en-US',
      });

      rerender();

      const { result } = renderHook(() => useSpeech());

      act(() => {
        result.current.speak('Test');
      });

      jest.runAllTimers();

      let utterance = mockSpeechSynthesis.speak.mock.calls[0][0];
      expect(utterance.lang).toBe('en-US');

      mockSpeechSynthesis.speak.mockClear();

      (useLanguageStore as jest.Mock).mockReturnValue({
        speechEnabled: true,
        language: 'es',
      });

      rerender();

      act(() => {
        result.current.speak('Prueba');
      });

      jest.runAllTimers();

      utterance = mockSpeechSynthesis.speak.mock.calls[0][0];
      expect(utterance.lang).toBe('es-ES');
    });

    it('should update when speechEnabled changes', () => {
      (useLanguageStore as jest.Mock).mockReturnValue({
        speechEnabled: true,
        language: 'en-US',
      });

      const { result, rerender } = renderHook(() => useSpeech());

      act(() => {
        result.current.speak('First');
      });

      jest.runAllTimers();

      expect(mockSpeechSynthesis.speak).toHaveBeenCalledTimes(1);

      mockSpeechSynthesis.speak.mockClear();

      (useLanguageStore as jest.Mock).mockReturnValue({
        speechEnabled: false,
        language: 'en-US',
      });

      rerender();

      act(() => {
        result.current.speak('Second');
      });

      jest.runAllTimers();

      expect(mockSpeechSynthesis.speak).not.toHaveBeenCalled();
    });
  });

  describe('speakLearning', () => {
    it('should speak in the specified learning language', () => {
      (useLanguageStore as jest.Mock).mockReturnValue({
        speechEnabled: false,
        language: 'en-US',
      });

      const { result } = renderHook(() => useSpeech());

      act(() => {
        result.current.speakLearning('Hola', 'es');
      });

      jest.runAllTimers();

      expect(mockSpeechSynthesis.speak).toHaveBeenCalled();
      const utterance = mockSpeechSynthesis.speak.mock.calls[0][0];
      expect(utterance.text).toBe('Hola');
      expect(utterance.lang).toBe('es-ES');
    });

    it('should use slower rate for learning (0.75)', () => {
      (useLanguageStore as jest.Mock).mockReturnValue({
        speechEnabled: false,
        language: 'en-US',
      });

      const { result } = renderHook(() => useSpeech());

      act(() => {
        result.current.speakLearning('Test', 'fr');
      });

      jest.runAllTimers();

      const utterance = mockSpeechSynthesis.speak.mock.calls[0][0];
      expect(utterance.rate).toBe(0.75);
    });

    it('should use pitch 1.0 for learning', () => {
      (useLanguageStore as jest.Mock).mockReturnValue({
        speechEnabled: false,
        language: 'en-US',
      });

      const { result } = renderHook(() => useSpeech());

      act(() => {
        result.current.speakLearning('Test', 'de');
      });

      jest.runAllTimers();

      const utterance = mockSpeechSynthesis.speak.mock.calls[0][0];
      expect(utterance.pitch).toBe(1.0);
    });

    it('should work regardless of speechEnabled setting', () => {
      (useLanguageStore as jest.Mock).mockReturnValue({
        speechEnabled: false,
        language: 'en-US',
      });

      const { result } = renderHook(() => useSpeech());

      act(() => {
        result.current.speakLearning('Learning text', 'ja');
      });

      jest.runAllTimers();

      expect(mockSpeechSynthesis.speak).toHaveBeenCalled();
    });

    it('should cancel previous speech before speaking learning text', () => {
      (useLanguageStore as jest.Mock).mockReturnValue({
        speechEnabled: false,
        language: 'en-US',
      });

      const { result } = renderHook(() => useSpeech());

      act(() => {
        result.current.speakLearning('First', 'en-US');
        result.current.speakLearning('Second', 'en-US');
      });

      jest.runAllTimers();

      expect(mockSpeechSynthesis.cancel).toHaveBeenCalled();
    });

    it('should handle empty text gracefully', () => {
      (useLanguageStore as jest.Mock).mockReturnValue({
        speechEnabled: false,
        language: 'en-US',
      });

      const { result } = renderHook(() => useSpeech());

      act(() => {
        result.current.speakLearning('', 'zh');
      });

      jest.runAllTimers();

      expect(mockSpeechSynthesis.speak).not.toHaveBeenCalled();
    });

    it('should work with all language codes', () => {
      (useLanguageStore as jest.Mock).mockReturnValue({
        speechEnabled: false,
        language: 'en-US',
      });

      const { result } = renderHook(() => useSpeech());

      const languages: Language[] = [
        'en-US',
        'en-GB',
        'es',
        'fr',
        'de',
        'ja',
        'zh',
        'pt',
        'pt-BR',
      ];

      languages.forEach((lang) => {
        mockSpeechSynthesis.speak.mockClear();

        act(() => {
          result.current.speakLearning('Test', lang);
        });

        jest.runAllTimers();

        expect(mockSpeechSynthesis.speak).toHaveBeenCalled();
        const utterance = mockSpeechSynthesis.speak.mock.calls[0][0];
        expect(utterance.lang).toBe(LANG_BCP47[lang]);
      });
    });
  });

  describe('stop', () => {
    it('should cancel speech synthesis', () => {
      (useLanguageStore as jest.Mock).mockReturnValue({
        speechEnabled: true,
        language: 'en-US',
      });

      const { result } = renderHook(() => useSpeech());

      act(() => {
        result.current.stop();
      });

      expect(mockSpeechSynthesis.cancel).toHaveBeenCalled();
    });

    it('should be callable multiple times', () => {
      (useLanguageStore as jest.Mock).mockReturnValue({
        speechEnabled: true,
        language: 'en-US',
      });

      const { result } = renderHook(() => useSpeech());

      act(() => {
        result.current.stop();
        result.current.stop();
        result.current.stop();
      });

      expect(mockSpeechSynthesis.cancel).toHaveBeenCalledTimes(3);
    });
  });

  describe('edge cases', () => {
    it('should handle missing window.speechSynthesis gracefully', () => {
      const originalSpeechSynthesis = window.speechSynthesis;
      Object.defineProperty(window, 'speechSynthesis', {
        value: undefined,
        writable: true,
        configurable: true,
      });

      (useLanguageStore as jest.Mock).mockReturnValue({
        speechEnabled: true,
        language: 'en-US',
      });

      const { result } = renderHook(() => useSpeech());

      expect(() => {
        act(() => {
          result.current.speak('Test');
        });
      }).not.toThrow();

      Object.defineProperty(window, 'speechSynthesis', {
        value: originalSpeechSynthesis,
        writable: true,
        configurable: true,
      });
    });

    it('should respect the 80ms delay before speaking', () => {
      (useLanguageStore as jest.Mock).mockReturnValue({
        speechEnabled: true,
        language: 'en-US',
      });

      const { result } = renderHook(() => useSpeech());

      act(() => {
        result.current.speak('Test');
      });

      expect(mockSpeechSynthesis.speak).not.toHaveBeenCalled();

      jest.advanceTimersByTime(79);
      expect(mockSpeechSynthesis.speak).not.toHaveBeenCalled();

      jest.advanceTimersByTime(1);
      expect(mockSpeechSynthesis.speak).toHaveBeenCalled();
    });

    it('should set volume to 1 for all utterances', () => {
      (useLanguageStore as jest.Mock).mockReturnValue({
        speechEnabled: true,
        language: 'en-US',
      });

      const { result } = renderHook(() => useSpeech());

      act(() => {
        result.current.speak('Test');
      });

      jest.runAllTimers();

      const utterance = mockSpeechSynthesis.speak.mock.calls[0][0];
      expect(utterance.volume).toBe(1);
    });

    it('should handle special characters in text', () => {
      (useLanguageStore as jest.Mock).mockReturnValue({
        speechEnabled: true,
        language: 'en-US',
      });

      const { result } = renderHook(() => useSpeech());

      const specialText = 'Hello! How are you? #test@123';

      act(() => {
        result.current.speak(specialText);
      });

      jest.runAllTimers();

      const utterance = mockSpeechSynthesis.speak.mock.calls[0][0];
      expect(utterance.text).toBe(specialText);
    });
  });
});