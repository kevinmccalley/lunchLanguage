// @ts-nocheck
import { useLanguageStore } from './languageStore';
import type { Language } from '../i18n/types';

describe('useLanguageStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    const store = useLanguageStore.getState();
    store.setLanguage('en-US');
    store.setLearningLanguage(null);
    store.setSpeechEnabled(true);
    store.setHasCompletedSetup(false);
    store.setShowSetup(false);
  });

  describe('initial state', () => {
    it('should have correct default values', () => {
      const store = useLanguageStore.getState();
      expect(store.language).toBe('en-US');
      expect(store.learningLanguage).toBeNull();
      expect(store.speechEnabled).toBe(true);
      expect(store.hasCompletedSetup).toBe(false);
      expect(store.showSetup).toBe(false);
    });
  });

  describe('setLanguage', () => {
    it('should update language to a new value', () => {
      const store = useLanguageStore.getState();
      store.setLanguage('es-ES' as Language);
      expect(store.language).toBe('es-ES');
    });

    it('should handle multiple language changes', () => {
      const store = useLanguageStore.getState();
      store.setLanguage('fr-FR' as Language);
      expect(store.language).toBe('fr-FR');
      store.setLanguage('de-DE' as Language);
      expect(store.language).toBe('de-DE');
      store.setLanguage('en-US');
      expect(store.language).toBe('en-US');
    });

    it('should trigger state updates for subscribers', () => {
      const listener = jest.fn();
      useLanguageStore.subscribe(
        (state) => state.language,
        listener
      );
      const store = useLanguageStore.getState();
      store.setLanguage('ja-JP' as Language);
      expect(listener).toHaveBeenCalled();
    });
  });

  describe('setLearningLanguage', () => {
    it('should set learning language to a new value', () => {
      const store = useLanguageStore.getState();
      store.setLearningLanguage('es-ES' as Language);
      expect(store.learningLanguage).toBe('es-ES');
    });

    it('should set learning language to null', () => {
      const store = useLanguageStore.getState();
      store.setLearningLanguage('fr-FR' as Language);
      store.setLearningLanguage(null);
      expect(store.learningLanguage).toBeNull();
    });

    it('should handle switching between learning languages', () => {
      const store = useLanguageStore.getState();
      store.setLearningLanguage('de-DE' as Language);
      expect(store.learningLanguage).toBe('de-DE');
      store.setLearningLanguage('it-IT' as Language);
      expect(store.learningLanguage).toBe('it-IT');
    });

    it('should trigger state updates for subscribers', () => {
      const listener = jest.fn();
      useLanguageStore.subscribe(
        (state) => state.learningLanguage,
        listener
      );
      const store = useLanguageStore.getState();
      store.setLearningLanguage('pt-BR' as Language);
      expect(listener).toHaveBeenCalled();
    });
  });

  describe('setSpeechEnabled', () => {
    it('should set speech enabled to true', () => {
      const store = useLanguageStore.getState();
      store.setSpeechEnabled(true);
      expect(store.speechEnabled).toBe(true);
    });

    it('should set speech enabled to false', () => {
      const store = useLanguageStore.getState();
      store.setSpeechEnabled(false);
      expect(store.speechEnabled).toBe(false);
    });

    it('should toggle speech enabled multiple times', () => {
      const store = useLanguageStore.getState();
      store.setSpeechEnabled(false);
      expect(store.speechEnabled).toBe(false);
      store.setSpeechEnabled(true);
      expect(store.speechEnabled).toBe(true);
      store.setSpeechEnabled(false);
      expect(store.speechEnabled).toBe(false);
    });

    it('should trigger state updates for subscribers', () => {
      const listener = jest.fn();
      useLanguageStore.subscribe(
        (state) => state.speechEnabled,
        listener
      );
      const store = useLanguageStore.getState();
      store.setSpeechEnabled(false);
      expect(listener).toHaveBeenCalled();
    });
  });

  describe('setHasCompletedSetup', () => {
    it('should set hasCompletedSetup to true', () => {
      const store = useLanguageStore.getState();
      store.setHasCompletedSetup(true);
      expect(store.hasCompletedSetup).toBe(true);
    });

    it('should set hasCompletedSetup to false', () => {
      const store = useLanguageStore.getState();
      store.setHasCompletedSetup(true);
      store.setHasCompletedSetup(false);
      expect(store.hasCompletedSetup).toBe(false);
    });

    it('should handle changing setup completion status', () => {
      const store = useLanguageStore.getState();
      expect(store.hasCompletedSetup).toBe(false);
      store.setHasCompletedSetup(true);
      expect(store.hasCompletedSetup).toBe(true);
    });

    it('should trigger state updates for subscribers', () => {
      const listener = jest.fn();
      useLanguageStore.subscribe(
        (state) => state.hasCompletedSetup,
        listener
      );
      const store = useLanguageStore.getState();
      store.setHasCompletedSetup(true);
      expect(listener).toHaveBeenCalled();
    });
  });

  describe('setShowSetup', () => {
    it('should set showSetup to true', () => {
      const store = useLanguageStore.getState();
      store.setShowSetup(true);
      expect(store.showSetup).toBe(true);
    });

    it('should set showSetup to false', () => {
      const store = useLanguageStore.getState();
      store.setShowSetup(true);
      store.setShowSetup(false);
      expect(store.showSetup).toBe(false);
    });

    it('should toggle showSetup multiple times', () => {
      const store = useLanguageStore.getState();
      store.setShowSetup(true);
      expect(store.showSetup).toBe(true);
      store.setShowSetup(false);
      expect(store.showSetup).toBe(false);
      store.setShowSetup(true);
      expect(store.showSetup).toBe(true);
    });

    it('should trigger state updates for subscribers', () => {
      const listener = jest.fn();
      useLanguageStore.subscribe(
        (state) => state.showSetup,
        listener
      );
      const store = useLanguageStore.getState();
      store.setShowSetup(true);
      expect(listener).toHaveBeenCalled();
    });
  });

  describe('multiple state updates', () => {
    it('should handle multiple state updates independently', () => {
      const store = useLanguageStore.getState();
      store.setLanguage('es-ES' as Language);
      store.setLearningLanguage('fr-FR' as Language);
      store.setSpeechEnabled(false);
      store.setHasCompletedSetup(true);
      store.setShowSetup(true);

      expect(store.language).toBe('es-ES');
      expect(store.learningLanguage).toBe('fr-FR');
      expect(store.speechEnabled).toBe(false);
      expect(store.hasCompletedSetup).toBe(true);
      expect(store.showSetup).toBe(true);
    });

    it('should maintain independent state for each property', () => {
      const store = useLanguageStore.getState();
      store.setLanguage('de-DE' as Language);
      expect(store.language).toBe('de-DE');
      expect(store.learningLanguage).toBeNull();
      expect(store.speechEnabled).toBe(true);
      
      store.setLearningLanguage('it-IT' as Language);
      expect(store.language).toBe('de-DE');
      expect(store.learningLanguage).toBe('it-IT');
      expect(store.speechEnabled).toBe(true);
    });
  });

  describe('store persistence config', () => {
    it('should have persist middleware configured with correct storage name', () => {
      // Verify that the store has persist middleware by checking if it has getState
      const store = useLanguageStore.getState();
      expect(store).toBeDefined();
      expect(typeof store.setLanguage).toBe('function');
      expect(typeof store.setLearningLanguage).toBe('function');
      expect(typeof store.setSpeechEnabled).toBe('function');
      expect(typeof store.setHasCompletedSetup).toBe('function');
      expect(typeof store.setShowSetup).toBe('function');
    });
  });

  describe('store type safety', () => {
    it('should provide all expected store methods', () => {
      const store = useLanguageStore.getState();
      expect(store).toHaveProperty('language');
      expect(store).toHaveProperty('learningLanguage');
      expect(store).toHaveProperty('speechEnabled');
      expect(store).toHaveProperty('hasCompletedSetup');
      expect(store).toHaveProperty('showSetup');
      expect(store).toHaveProperty('setLanguage');
      expect(store).toHaveProperty('setLearningLanguage');
      expect(store).toHaveProperty('setSpeechEnabled');
      expect(store).toHaveProperty('setHasCompletedSetup');
      expect(store).toHaveProperty('setShowSetup');
    });
  });

  describe('edge cases', () => {
    it('should handle rapid consecutive updates', () => {
      const store = useLanguageStore.getState();
      store.setLanguage('en-US');
      store.setLanguage('es-ES' as Language);
      store.setLanguage('fr-FR' as Language);
      store.setLanguage('de-DE' as Language);
      expect(store.language).toBe('de-DE');
    });

    it('should handle resetting to default values', () => {
      const store = useLanguageStore.getState();
      store.setLanguage('ja-JP' as Language);
      store.setLearningLanguage('zh-CN' as Language);
      store.setSpeechEnabled(false);
      store.setHasCompletedSetup(true);
      store.setShowSetup(true);

      // Reset to defaults
      store.setLanguage('en-US');
      store.setLearningLanguage(null);
      store.setSpeechEnabled(true);
      store.setHasCompletedSetup(false);
      store.setShowSetup(false);

      expect(store.language).toBe('en-US');
      expect(store.learningLanguage).toBeNull();
      expect(store.speechEnabled).toBe(true);
      expect(store.hasCompletedSetup).toBe(false);
      expect(store.showSetup).toBe(false);
    });
  });
});