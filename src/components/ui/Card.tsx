'use client';

import React from 'react';
import { theme } from '@/lib/theme';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  onClick,
}) => {
  const paddingStyles = {
    none: { padding: 0 },
    sm: { padding: theme.spacing.sm },
    md: { padding: theme.spacing.lg },
    lg: { padding: theme.spacing.xl },
  };

  const variantStyles = {
    default: {
      backgroundColor: theme.colors.background.secondary,
      border: `1px solid ${theme.colors.border.primary}`,
      boxShadow: theme.shadows.sm,
    },
    elevated: {
      backgroundColor: theme.colors.background.secondary,
      border: 'none',
      boxShadow: theme.shadows.lg,
    },
    outlined: {
      backgroundColor: theme.colors.background.secondary,
      border: `1px solid ${theme.colors.border.secondary}`,
      boxShadow: 'none',
    },
  };

  const cardStyles: React.CSSProperties = {
    borderRadius: theme.radius.lg,
    ...paddingStyles[padding],
    ...variantStyles[variant],
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.2s ease-in-out',
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = theme.shadows.lg;
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = variantStyles[variant].boxShadow;
    }
  };

  return (
    <div
      className={className}
      style={cardStyles}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default Card;
