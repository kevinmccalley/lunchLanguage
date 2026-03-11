import { motion } from 'framer-motion';
import { useState } from 'react';

interface Props {
  onSubmit: (value: number) => void;
  maxDigits?: number;
}

export const NumberPad = ({ onSubmit, maxDigits = 3 }: Props) => {
  const [input, setInput] = useState('');

  const press = (digit: string) => {
    if (input.length >= maxDigits) return;
    setInput(prev => prev + digit);
  };

  const clear = () => setInput('');

  const submit = () => {
    if (!input) return;
    onSubmit(parseInt(input, 10));
    setInput('');
  };

  const buttons = ['7','8','9','4','5','6','1','2','3'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
      {/* Display */}
      <div
        style={{
          background: '#1a252f',
          borderRadius: 12,
          padding: '10px 20px',
          minWidth: 140,
          textAlign: 'center',
          fontSize: 36,
          fontWeight: 900,
          color: input ? '#2ecc71' : '#555',
          letterSpacing: 4,
          border: '3px solid #2c3e50',
          fontFamily: 'monospace',
        }}
      >
        {input || '?'}
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {buttons.map(b => (
          <motion.button
            key={b}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9, backgroundColor: '#2980b9' }}
            onClick={() => press(b)}
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              border: '2px solid #3498db',
              background: '#ebf5fb',
              fontSize: 24,
              fontWeight: 800,
              color: '#1a5276',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {b}
          </motion.button>
        ))}
      </div>

      {/* Bottom row */}
      <div style={{ display: 'flex', gap: 8 }}>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.9 }}
          onClick={clear}
          style={{
            width: 56,
            height: 56,
            borderRadius: 12,
            border: '2px solid #e74c3c',
            background: '#fdecea',
            fontSize: 18,
            fontWeight: 800,
            color: '#c0392b',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          ⌫
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => press('0')}
          style={{
            width: 56,
            height: 56,
            borderRadius: 12,
            border: '2px solid #3498db',
            background: '#ebf5fb',
            fontSize: 24,
            fontWeight: 800,
            color: '#1a5276',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          0
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.9 }}
          onClick={submit}
          disabled={!input}
          style={{
            width: 56,
            height: 56,
            borderRadius: 12,
            border: '2px solid #27ae60',
            background: input ? '#27ae60' : '#ccc',
            fontSize: 22,
            fontWeight: 800,
            color: 'white',
            cursor: input ? 'pointer' : 'not-allowed',
            fontFamily: 'inherit',
          }}
        >
          ✓
        </motion.button>
      </div>
    </div>
  );
};
