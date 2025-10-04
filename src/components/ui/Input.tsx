import React from 'react';
import { theme } from '@/lib/theme';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'filled';
  size?: 'sm' | 'md' | 'lg';
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  variant = 'default',
  size = 'md',
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xs,
  };

  const labelStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
  };

  const sizeStyles = {
    sm: {
      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
      fontSize: theme.typography.fontSize.sm,
      minHeight: '32px',
    },
    md: {
      padding: `${theme.spacing.sm} ${theme.spacing.md}`,
      fontSize: theme.typography.fontSize.base,
      minHeight: '40px',
    },
    lg: {
      padding: `${theme.spacing.md} ${theme.spacing.lg}`,
      fontSize: theme.typography.fontSize.lg,
      minHeight: '48px',
    },
  };

  const variantStyles = {
    default: {
      backgroundColor: theme.colors.background.secondary,
      border: `1px solid ${error ? theme.colors.error[300] : theme.colors.border.primary}`,
    },
    filled: {
      backgroundColor: theme.colors.gray[50],
      border: `1px solid ${error ? theme.colors.error[300] : 'transparent'}`,
    },
  };

  const inputStyles: React.CSSProperties = {
    ...sizeStyles[size],
    ...variantStyles[variant],
    borderRadius: theme.radius.md,
    color: theme.colors.text.primary,
    outline: 'none',
    transition: 'all 0.2s ease-in-out',
    width: '100%',
    boxSizing: 'border-box',
  };

  const helperTextStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.xs,
    color: error ? theme.colors.error[600] : theme.colors.text.secondary,
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = error ? theme.colors.error[500] : theme.colors.border.focus;
    e.target.style.boxShadow = `0 0 0 1px ${error ? theme.colors.error[500] : theme.colors.border.focus}`;
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = error ? theme.colors.error[300] : theme.colors.border.primary;
    e.target.style.boxShadow = 'none';
    props.onBlur?.(e);
  };

  return (
    <div style={containerStyles}>
      {label && (
        <label htmlFor={inputId} style={labelStyles}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={className}
        style={inputStyles}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {(error || helperText) && (
        <span style={helperTextStyles}>
          {error || helperText}
        </span>
      )}
    </div>
  );
};

export default Input;
