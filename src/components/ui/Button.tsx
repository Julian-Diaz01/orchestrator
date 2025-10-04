import React from 'react';
import { theme, colorCombinations } from '@/lib/theme';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: theme.typography.fontWeight.medium,
    borderRadius: theme.radius.md,
    border: 'none',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease-in-out',
    opacity: disabled || loading ? 0.6 : 1,
  };

  const sizeStyles = {
    sm: {
      padding: `${theme.spacing.sm} ${theme.spacing.md}`,
      fontSize: theme.typography.fontSize.sm,
      minHeight: '32px',
    },
    md: {
      padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
      fontSize: theme.typography.fontSize.base,
      minHeight: '40px',
    },
    lg: {
      padding: `${theme.spacing.md} ${theme.spacing.xl}`,
      fontSize: theme.typography.fontSize.lg,
      minHeight: '48px',
    },
  };

  const variantStyles = {
    primary: {
      backgroundColor: colorCombinations.primary.bg,
      color: colorCombinations.primary.text,
      border: 'none',
    },
    secondary: {
      backgroundColor: colorCombinations.secondary.bg,
      color: colorCombinations.secondary.text,
      border: `1px solid ${colorCombinations.secondary.border}`,
    },
    success: {
      backgroundColor: colorCombinations.success.bg,
      color: colorCombinations.success.text,
      border: 'none',
    },
    warning: {
      backgroundColor: colorCombinations.warning.bg,
      color: colorCombinations.warning.text,
      border: 'none',
    },
    error: {
      backgroundColor: colorCombinations.error.bg,
      color: colorCombinations.error.text,
      border: 'none',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: theme.colors.text.primary,
      border: 'none',
    },
  };

  const buttonStyles: React.CSSProperties = {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
  };

  return (
    <button
      className={`${className} hover:opacity-90 transition-opacity`}
      style={buttonStyles}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          style={{ color: variant === 'ghost' ? theme.colors.text.primary : theme.colors.text.inverse }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
