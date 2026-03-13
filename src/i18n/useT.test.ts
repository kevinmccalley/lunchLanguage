// @ts-nocheck
import { useT } from './useT';
import { useLanguageStore } from '../store/languageStore';
import { TRANSLATIONS } from './translations';
import type { Translations } from './types';

jest.mock('../store/languageStore');
jest.mock('./translations');

describe('useT', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return translations for the current language', () => {
    const mockTranslations: Translations = {
      'hello': 'Hello',
      'goodbye': 'Goodbye',
    };

    (useLanguageStore as jest.Mock).mockReturnValue({
      language: 'en-US',
    });

    (TRANSLATIONS as Record<string, Translations>)['en-US'] = mockTranslations;

    const result = useT();

    expect(result).toEqual(mockTranslations);
  });

  it('should return translations for a different supported language', () => {
    const mockTranslationsFR: Translations = {
      'hello': 'Bonjour',
      'goodbye': 'Au revoir',
    };

    (useLanguageStore as jest.Mock).mockReturnValue({
      language: 'fr-FR',
    });

    (TRANSLATIONS as Record<string, Translations>)['fr-FR'] = mockTranslationsFR;

    const result = useT();

    expect(result).toEqual(mockTranslationsFR);
  });

  it('should return en-US translations when language is not available', () => {
    const mockTranslationsDefault: Translations = {
      'hello': 'Hello',
      'goodbye': 'Goodbye',
    };

    (useLanguageStore as jest.Mock).mockReturnValue({
      language: 'unknown-language',
    });

    (TRANSLATIONS as Record<string, Translations>)['en-US'] = mockTranslationsDefault;
    (TRANSLATIONS as Record<string, Translations>)['unknown-language'] = undefined as any;

    const result = useT();

    expect(result).toEqual(mockTranslationsDefault);
  });

  it('should return en-US translations when language is undefined', () => {
    const mockTranslationsDefault: Translations = {
      'hello': 'Hello',
      'goodbye': 'Goodbye',
    };

    (useLanguageStore as jest.Mock).mockReturnValue({
      language: undefined,
    });

    (TRANSLATIONS as Record<string, Translations>)['en-US'] = mockTranslationsDefault;

    const result = useT();

    expect(result).toEqual(mockTranslationsDefault);
  });

  it('should return en-US translations when language is null', () => {
    const mockTranslationsDefault: Translations = {
      'hello': 'Hello',
      'goodbye': 'Goodbye',
    };

    (useLanguageStore as jest.Mock).mockReturnValue({
      language: null,
    });

    (TRANSLATIONS as Record<string, Translations>)['en-US'] = mockTranslationsDefault;

    const result = useT();

    expect(result).toEqual(mockTranslationsDefault);
  });

  it('should use the nullish coalescing operator to prefer language translations', () => {
    const mockTranslationsFR: Translations = {
      'hello': 'Bonjour',
    };

    const mockTranslationsDefault: Translations = {
      'hello': 'Hello',
    };

    (useLanguageStore as jest.Mock).mockReturnValue({
      language: 'fr-FR',
    });

    (TRANSLATIONS as Record<string, Translations>)['fr-FR'] = mockTranslationsFR;
    (TRANSLATIONS as Record<string, Translations>)['en-US'] = mockTranslationsDefault;

    const result = useT();

    expect(result).toBe(mockTranslationsFR);
    expect(result).not.toBe(mockTranslationsDefault);
  });

  it('should call useLanguageStore to get the current language', () => {
    const mockTranslations: Translations = {
      'hello': 'Hello',
    };

    (useLanguageStore as jest.Mock).mockReturnValue({
      language: 'en-US',
    });

    (TRANSLATIONS as Record<string, Translations>)['en-US'] = mockTranslations;

    useT();

    expect(useLanguageStore).toHaveBeenCalled();
  });

  it('should handle empty string as language', () => {
    const mockTranslationsDefault: Translations = {
      'hello': 'Hello',
    };

    (useLanguageStore as jest.Mock).mockReturnValue({
      language: '',
    });

    (TRANSLATIONS as Record<string, Translations>)['en-US'] = mockTranslationsDefault;

    const result = useT();

    expect(result).toEqual(mockTranslationsDefault);
  });
});