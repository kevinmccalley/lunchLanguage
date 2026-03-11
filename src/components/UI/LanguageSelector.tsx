import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactCountryFlag from 'react-country-flag';
import { useLanguageStore } from '../../store/languageStore';
import { LANGUAGE_OPTIONS } from '../../i18n/translations';
import type { Language } from '../../i18n/types';

// Human-readable region label so Portugal and Brazil are distinguishable
const REGION_LABEL: Partial<Record<Language, string>> = {
  pt:     'PT',
  'pt-BR':'BR',
};

const Flag = ({ countryCode, size = 28 }: { countryCode: string; size?: number }) => (
  <ReactCountryFlag
    countryCode={countryCode}
    svg
    style={{ width: size, height: size * 0.67, borderRadius: 3, objectFit: 'cover', display: 'block' }}
    title={countryCode}
  />
);

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguageStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGE_OPTIONS.find(l => l.code === language)!;
  const regionLabel = REGION_LABEL[language];

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'fixed', top: 12, right: 12, zIndex: 1000 }}>
      {/* Trigger button */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        title="Change language"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          background: 'white',
          border: '2px solid #e0e0e0',
          borderRadius: 20,
          padding: '5px 11px 5px 8px',
          cursor: 'pointer',
          boxShadow: '0 2px 12px rgba(0,0,0,0.14)',
          fontSize: 13,
          fontWeight: 700,
          color: '#333',
          fontFamily: 'inherit',
        }}
      >
        <Flag countryCode={current.countryCode} size={26} />
        <span style={{ lineHeight: 1 }}>
          {current.label}
          {regionLabel && (
            <span style={{ fontSize: 11, color: '#888', fontWeight: 600, marginLeft: 3 }}>
              ({regionLabel})
            </span>
          )}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ fontSize: 11, color: '#aaa', lineHeight: 1 }}
        >
          ▼
        </motion.span>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, type: 'spring', stiffness: 400, damping: 25 }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              right: 0,
              background: 'white',
              borderRadius: 14,
              boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
              border: '2px solid #e8e8e8',
              overflow: 'hidden',
              minWidth: 190,
            }}
          >
            {LANGUAGE_OPTIONS.map((opt, i) => {
              const isSelected = opt.code === language;
              const region = REGION_LABEL[opt.code];
              return (
                <motion.button
                  key={opt.code}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.035 }}
                  onClick={() => { setLanguage(opt.code); setOpen(false); }}
                  whileHover={{ background: '#f5f5f5' }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    width: '100%',
                    padding: '9px 14px',
                    border: 'none',
                    background: isSelected ? '#fff3e0' : 'transparent',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: 14,
                    fontWeight: isSelected ? 800 : 500,
                    color: isSelected ? '#ff6b35' : '#333',
                    textAlign: 'left',
                    borderBottom: i < LANGUAGE_OPTIONS.length - 1 ? '1px solid #f0f0f0' : 'none',
                  }}
                >
                  <Flag countryCode={opt.countryCode} size={28} />
                  <span style={{ flex: 1 }}>
                    {opt.label}
                    {region && (
                      <span style={{ fontSize: 11, color: isSelected ? '#ff9a6c' : '#999', marginLeft: 4 }}>
                        ({region})
                      </span>
                    )}
                  </span>
                  {isSelected && <span style={{ fontSize: 15, marginLeft: 'auto' }}>✓</span>}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
