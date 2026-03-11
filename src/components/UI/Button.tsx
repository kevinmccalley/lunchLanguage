import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
}

const COLORS = {
  primary:   { bg: '#ff6b35', hover: '#e85d2a', text: 'white', border: '#cc4a1a' },
  secondary: { bg: '#6c757d', hover: '#5a6268', text: 'white', border: '#495057' },
  success:   { bg: '#27ae60', hover: '#219a52', text: 'white', border: '#1a8046' },
  danger:    { bg: '#e74c3c', hover: '#c0392b', text: 'white', border: '#a93226' },
};

const SIZES = {
  sm: { padding: '6px 14px', fontSize: 13, borderRadius: 10 },
  md: { padding: '10px 22px', fontSize: 16, borderRadius: 14 },
  lg: { padding: '14px 32px', fontSize: 20, borderRadius: 18 },
};

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
}: Props) => {
  const colors = COLORS[variant];
  const sizeStyle = SIZES[size];

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.05, backgroundColor: colors.hover }}
      whileTap={disabled ? {} : { scale: 0.96 }}
      style={{
        background: disabled ? '#ccc' : colors.bg,
        color: disabled ? '#888' : colors.text,
        border: `3px solid ${disabled ? '#bbb' : colors.border}`,
        borderRadius: sizeStyle.borderRadius,
        padding: sizeStyle.padding,
        fontSize: sizeStyle.fontSize,
        fontWeight: 700,
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'inherit',
        width: fullWidth ? '100%' : 'auto',
        boxShadow: disabled ? 'none' : `0 4px 0 ${colors.border}`,
        transform: 'translateY(0)',
        transition: 'background 0.15s',
        letterSpacing: 0.3,
      }}
    >
      {children}
    </motion.button>
  );
};
