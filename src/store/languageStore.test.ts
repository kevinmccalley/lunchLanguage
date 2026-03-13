// @ts-nocheck
import { useLanguageStore } from './languageStore';
import type { Language } from '../i18n/types';

describe('useLanguageStore', () => {
  beforeEach(() => {
    // Reset the store state before each test
    const { getState } = useLanguageStore;
    const state = getState();
    state.setLanguage('en-US');
    state.setLearningLanguage(null);
    state.setSpeechEnabled(true);
    state.setHasCompletedSetup(false);
    state.setShowSetup(false);
  });

  describe('initial state', () => {
    it('should have correct initial language', () => {
      const { language } = useLanguageStore.getState();
      expect(language).toBe('en-US');
    });

    it('should have null learningLanguage initially', () => {
      const { learningLanguage } = useLanguageStore.getState();
      expect(learningLanguage).toBeNull();
    });

    it('should have speechEnabled set to true initially', () => {
      const { speechEnabled } = useLanguageStore.getState();
      expect(speechEnabled).toBe(true);
    });

    it('should have hasCompletedSetup set to false initially', () => {
      const { hasCompletedSetup } = useLanguageStore.getState();
      expect(hasCompletedSetup).toBe(false);
    });

    it('should have showSetup set to false initially', () => {
      const { showSetup } = useLanguageStore.getState();
      expect(showSetup).toBe(false);
    });
  });

  describe('setLanguage', () => {
    it('should update language to a new value', () => {
      const { setLanguage } = useLanguageStore.getState();
      setLanguage('es' as Language);
      const { language } = useLanguageStore.getState();
      expect(language).toBe('es');
    });

    it('should update language multiple times', () => {
      const { setLanguage } = useLanguageStore.getState();
      setLanguage('fr' as Language);
      let { language } = useLanguageStore.getState();
      expect(language).toBe('fr');

      setLanguage('de' as Language);
      ({ language } = useLanguageStore.getState());
      expect(language).toBe('de');
    });

    it('should handle setting language to same value', () => {
      const { setLanguage } = useLanguageStore.getState();
      setLanguage('en-US');
      const { language } = useLanguageStore.getState();
      expect(language).toBe('en-US');
    });
  });

  describe('setLearningLanguage', () => {
    it('should update learningLanguage to a new value', () => {
      const { setLearningLanguage } = useLanguageStore.getState();
      setLearningLanguage('es' as Language);
      const { learningLanguage } = useLanguageStore.getState();
      expect(learningLanguage).toBe('es');
    });

    it('should set learningLanguage to null', () => {
      const { setLearningLanguage } = useLanguageStore.getState();
      setLearningLanguage('fr' as Language);
      setLearningLanguage(null);
      const { learningLanguage } = useLanguageStore.getState();
      expect(learningLanguage).toBeNull();
    });

    it('should update learningLanguage multiple times', () => {
      const { setLearningLanguage } = useLanguageStore.getState();
      setLearningLanguage('ja' as Language);
      let { learningLanguage } = useLanguageStore.getState();
      expect(learningLanguage).toBe('ja');

      setLearningLanguage('zh' as Language);
      ({ learningLanguage } = useLanguageStore.getState());
      expect(learningLanguage).toBe('zh');
    });
  });

  describe('setSpeechEnabled', () => {
    it('should disable speech when set to false', () => {
      const { setSpeechEnabled } = useLanguageStore.getState();
      setSpeechEnabled(false);
      const { speechEnabled } = useLanguageStore.getState();
      expect(speechEnabled).toBe(false);
    });

    it('should enable speech when set to true', () => {
      const { setSpeechEnabled } = useLanguageStore.getState();
      setSpeechEnabled(false);
      setSpeechEnabled(true);
      const { speechEnabled } = useLanguageStore.getState();
      expect(speechEnabled).toBe(true);
    });

    it('should toggle speechEnabled multiple times', () => {
      const { setSpeechEnabled } = useLanguageStore.getState();
      setSpeechEnabled(false);
      let { speechEnabled } = useLanguageStore.getState();
      expect(speechEnabled).toBe(false);

      setSpeechEnabled(true);
      ({ speechEnabled } = useLanguageStore.getState());
      expect(speechEnabled).toBe(true);

      setSpeechEnabled(false);
      ({ speechEnabled } = useLanguageStore.getState());
      expect(speechEnabled).toBe(false);
    });
  });

  describe('setHasCompletedSetup', () => {
    it('should set hasCompletedSetup to true', () => {
      const { setHasCompletedSetup } = useLanguageStore.getState();
      setHasCompletedSetup(true);
      const { hasCompletedSetup } = useLanguageStore.getState();
      expect(hasCompletedSetup).toBe(true);
    });

    it('should set hasCompletedSetup to false', () => {
      const { setHasCompletedSetup } = useLanguageStore.getState();
      setHasCompletedSetup(true);
      setHasCompletedSetup(false);
      const { hasCompletedSetup } = useLanguageStore.getState();
      expect(hasCompletedSetup).toBe(false);
    });

    it('should handle multiple updates to hasCompletedSetup', () => {
      const { setHasCompletedSetup } = useLanguageStore.getState();
      setHasCompletedSetup(true);
      let { hasCompletedSetup } = useLanguageStore.getState();
      expect(hasCompletedSetup).toBe(true);

      setHasCompletedSetup(false);
      ({ hasCompletedSetup } = useLanguageStore.getState());
      expect(hasCompletedSetup).toBe(false);

      setHasCompletedSetup(true);
      ({ hasCompletedSetup } = useLanguageStore.getState());
      expect(hasCompletedSetup).toBe(true);
    });
  });

  describe('setShowSetup', () => {
    it('should set showSetup to true', () => {
      const { setShowSetup } = useLanguageStore.getState();
      setShowSetup(true);
      const { showSetup } = useLanguageStore.getState();
      expect(showSetup).toBe(true);
    });

    it('should set showSetup to false', () => {
      const { setShowSetup } = useLanguageStore.getState();
      setShowSetup(true);
      setShowSetup(false);
      const { showSetup } = useLanguageStore.getState();
      expect(showSetup).toBe(false);
    });

    it('should toggle showSetup multiple times', () => {
      const { setShowSetup } = useLanguageStore.getState();
      setShowSetup(true);
      let { showSetup } = useLanguageStore.getState();
      expect(showSetup).toBe(true);

      setShowSetup(false);
      ({ showSetup } = useLanguageStore.getState());
      expect(showSetup).toBe(false);

      setShowSetup(true);
      ({ showSetup } = useLanguageStore.getState());
      expect(showSetup).toBe(true);
    });
  });

  describe('combined state updates', () => {
    it('should update multiple state properties independently', () => {
      const {
        setLanguage,
        setLearningLanguage,
        setSpeechEnabled,
        setHasCompletedSetup,
        setShowSetup,
      } = useLanguageStore.getState();

      setLanguage('es' as Language);
      setLearningLanguage('fr' as Language);
      setSpeechEnabled(false);
      setHasCompletedSetup(true);
      setShowSetup(true);

      const state = useLanguageStore.getState();
      expect(state.language).toBe('es');
      expect(state.learningLanguage).toBe('fr');
      expect(state.speechEnabled).toBe(false);
      expect(state.hasCompletedSetup).toBe(true);
      expect(state.showSetup).toBe(true);
    });

    it('should allow independent updates to not affect other properties', () => {
      const { setLanguage } = useLanguageStore.getState();
      const initialState = useLanguageStore.getState();

      setLanguage('de' as Language);

      const state = useLanguageStore.getState();
      expect(state.learningLanguage).toBe(initialState.learningLanguage);
      expect(state.speechEnabled).toBe(initialState.speechEnabled);
      expect(state.hasCompletedSetup).toBe(initialState.hasCompletedSetup);
      expect(state.showSetup).toBe(initialState.showSetup);
    });
  });

  describe('store subscription', () => {
    it('should notify subscribers when state changes', () => {
      const listener = jest.fn();
      const unsubscribe = useLanguageStore.subscribe(listener);

      const { setLanguage } = useLanguageStore.getState();
      setLanguage('it' as Language);

      expect(listener).toHaveBeenCalled();
      unsubscribe();
    });

    it('should allow unsubscribing from updates', () => {
      const listener = jest.fn();
      const unsubscribe = useLanguageStore.subscribe(listener);
      unsubscribe();

      const { setLanguage } = useLanguageStore.getState();
      setLanguage('ko' as Language);

      expect(listener).not.toHaveBeenCalled();
    });

    it('should support multiple subscribers', () => {
      const listener1 = jest.fn();
      const listener2 = jest.fn();

      const unsubscribe1 = useLanguageStore.subscribe(listener1);
      const unsubscribe2 = useLanguageStore.subscribe(listener2);

      const { setSpeechEnabled } = useLanguageStore.getState();
      setSpeechEnabled(false);

      expect(listener1).toHaveBeenCalled();
      expect(listener2).toHaveBeenCalled();

      unsubscribe1();
      unsubscribe2();
    });
  });
});