import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactCountryFlag from 'react-country-flag';
import { useLanguageStore } from '../../store/languageStore';
import { LANGUAGE_OPTIONS, TRANSLATIONS } from '../../i18n/translations';
import type { Language } from '../../i18n/types';

export const LanguageSetup = () => {
  const {
    language,
    learningLanguage,
    speechEnabled,
    hasCompletedSetup,
    showSetup,
    setLanguage,
    setLearningLanguage,
    setSpeechEnabled,
    setHasCompletedSetup,
    setShowSetup,
  } = useLanguageStore();

  const isOpen = !hasCompletedSetup || showSetup;

  const [step, setStep] = useState<1 | 2>(1);
  const [nativeLang, setNativeLang] = useState<Language>(language);
  const [learningLang, setLearningLang] = useState<Language | null>(learningLanguage);
  const [speechOn, setSpeechOn] = useState(speechEnabled);

  // Sync local state whenever the dialog opens
  useEffect(() => {
    if (isOpen) {
      setNativeLang(language);
      setLearningLang(learningLanguage);
      setSpeechOn(speechEnabled);
      setStep(1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const nativeT = TRANSLATIONS[nativeLang];
  const learningOptions = LANGUAGE_OPTIONS.filter(o => o.code !== nativeLang);

  const confirmSetup = () => {
    setLanguage(nativeLang);
    setLearningLanguage(learningLang);
    setSpeechEnabled(speechOn);
    setHasCompletedSetup(true);
    setShowSetup(false);
  };

  const handleClose = () => setShowSetup(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22, delay: 0.1 }}
        style={{
          background: 'white', borderRadius: 24, padding: '32px 28px',
          maxWidth: 440, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
          position: 'relative',
        }}
      >
        {/* Close button — only shown when re-opening from within the app */}
        {hasCompletedSetup && (
          <button
            onClick={handleClose}
            style={{
              position: 'absolute', top: 16, right: 16,
              background: '#f0f0f0', border: 'none', borderRadius: '50%',
              width: 32, height: 32, cursor: 'pointer', fontSize: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#666', fontWeight: 700,
            }}
          >
            ✕
          </button>
        )}

        {/* Step indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
          {[1, 2].map(s => (
            <div key={s} style={{
              width: 10, height: 10, borderRadius: '50%',
              background: step >= s ? '#667eea' : '#e0e0e0',
              transition: 'background 0.3s',
            }} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.22 }}
            >
              <h2 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 900, color: '#333', textAlign: 'center' }}>
                🌍 {nativeT.setup.title}
              </h2>
              <p style={{ margin: '0 0 20px', fontSize: 14, color: '#888', textAlign: 'center' }}>
                {nativeT.setup.nativePrompt}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {LANGUAGE_OPTIONS.map(opt => (
                  <button
                    key={opt.code}
                    onClick={() => setNativeLang(opt.code)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 14px', borderRadius: 12, cursor: 'pointer',
                      border: nativeLang === opt.code ? '2px solid #667eea' : '2px solid #e0e0e0',
                      background: nativeLang === opt.code ? '#f0f3ff' : 'white',
                      fontFamily: 'inherit', fontSize: 14, fontWeight: 600,
                      color: nativeLang === opt.code ? '#667eea' : '#444',
                      transition: 'all 0.15s',
                    }}
                  >
                    <ReactCountryFlag
                      countryCode={opt.countryCode} svg
                      style={{ width: 24, height: 16, borderRadius: 2, objectFit: 'cover', flexShrink: 0 }}
                    />
                    <span style={{ flex: 1, textAlign: 'left' }}>{opt.label}</span>
                    {nativeLang === opt.code && <span style={{ color: '#667eea' }}>✓</span>}
                  </button>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => setStep(2)}
                style={{
                  marginTop: 22, width: '100%', padding: '13px 0',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white', border: 'none', borderRadius: 14,
                  fontSize: 16, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                {nativeT.setup.confirm} →
              </motion.button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.22 }}
            >
              <h2 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 900, color: '#333', textAlign: 'center' }}>
                🎓 {nativeT.setup.title}
              </h2>
              <p style={{ margin: '0 0 16px', fontSize: 14, color: '#888', textAlign: 'center' }}>
                {nativeT.setup.learningPrompt}
              </p>

              {/* Skip / no second language */}
              <button
                onClick={() => setLearningLang(null)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                  padding: '10px 14px', borderRadius: 12, cursor: 'pointer', marginBottom: 10,
                  border: learningLang === null ? '2px solid #ff6b35' : '2px solid #e0e0e0',
                  background: learningLang === null ? '#fff5f0' : 'white',
                  fontFamily: 'inherit', fontSize: 14, fontWeight: 600,
                  color: learningLang === null ? '#ff6b35' : '#666',
                  transition: 'all 0.15s',
                }}
              >
                <span style={{ fontSize: 20 }}>🚫</span>
                <span style={{ flex: 1, textAlign: 'left' }}>{nativeT.setup.skipLearning}</span>
                {learningLang === null && <span style={{ color: '#ff6b35' }}>✓</span>}
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {learningOptions.map(opt => (
                  <button
                    key={opt.code}
                    onClick={() => setLearningLang(opt.code)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 14px', borderRadius: 12, cursor: 'pointer',
                      border: learningLang === opt.code ? '2px solid #ff6b35' : '2px solid #e0e0e0',
                      background: learningLang === opt.code ? '#fff5f0' : 'white',
                      fontFamily: 'inherit', fontSize: 14, fontWeight: 600,
                      color: learningLang === opt.code ? '#ff6b35' : '#444',
                      transition: 'all 0.15s',
                    }}
                  >
                    <ReactCountryFlag
                      countryCode={opt.countryCode} svg
                      style={{ width: 24, height: 16, borderRadius: 2, objectFit: 'cover', flexShrink: 0 }}
                    />
                    <span style={{ flex: 1, textAlign: 'left' }}>{opt.label}</span>
                    {learningLang === opt.code && <span style={{ color: '#ff6b35' }}>✓</span>}
                  </button>
                ))}
              </div>

              {/* Speech toggle */}
              <div style={{
                marginTop: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 16px', background: '#f8f8f8', borderRadius: 12,
              }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#444' }}>
                  🔊 {nativeT.setup.speechLabel}
                </span>
                <button
                  onClick={() => setSpeechOn(v => !v)}
                  style={{
                    width: 48, height: 26, borderRadius: 13,
                    background: speechOn ? '#667eea' : '#ccc',
                    border: 'none', cursor: 'pointer', position: 'relative',
                    transition: 'background 0.2s', flexShrink: 0,
                  }}
                >
                  <div style={{
                    position: 'absolute', top: 3,
                    left: speechOn ? 24 : 3,
                    width: 20, height: 20, borderRadius: '50%',
                    background: 'white', transition: 'left 0.2s',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                  }} />
                </button>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
                <motion.button
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={() => setStep(1)}
                  style={{
                    flex: 1, padding: '13px 0',
                    background: 'white', color: '#667eea',
                    border: '2px solid #667eea', borderRadius: 14,
                    fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >
                  ← {nativeT.kitchen?.back ?? 'Back'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={confirmSetup}
                  style={{
                    flex: 2, padding: '13px 0',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white', border: 'none', borderRadius: 14,
                    fontSize: 16, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >
                  {nativeT.setup.confirm} 🎉
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
