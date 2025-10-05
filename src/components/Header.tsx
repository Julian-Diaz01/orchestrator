'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useAuthActions } from '@/hooks/useAuthActions';
import { theme } from '@/lib/theme';
import Button from './ui/Button';

export interface User {
  id: string;
  email?: string | undefined;
  name?: string | undefined;
}

export interface HeaderProps {
  user?: User | null;
  showAuth?: boolean;
  onSignOut?: () => void;
  isLoading?: boolean;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  user: propUser, 
  showAuth = true, 
  onSignOut,
  isLoading: propIsLoading,
  className = ''
}) => {
  const { data: user, isLoading: authIsLoading } = useAuth();
  const { signOut, isSigningOut } = useAuthActions();
  
  const currentUser = propUser ?? user;
  const isLoading = propIsLoading ?? authIsLoading;

  const handleSignOut = () => {
    if (onSignOut) {
      onSignOut();
      return;
    }
    signOut();
  };

  const headerStyles: React.CSSProperties = {
    backgroundColor: theme.colors.background.secondary,
    borderBottom: `1px solid ${theme.colors.border.primary}`,
    boxShadow: theme.shadows.sm,
  };

  const navStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1280px',
    margin: '0 auto',
    padding: `0 ${theme.spacing.lg}`,
    height: '64px',
  };

  const logoStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    textDecoration: 'none',
  };

  const navLinksStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.lg,
  };

  const userInfoStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
    color: theme.colors.text.secondary,
    fontSize: theme.typography.fontSize.sm,
  };

  if (isLoading) {
    return (
      <header style={headerStyles} className={className}>
        <nav style={navStyles}>
          <Link href="/" style={logoStyles}>
            Orchestrator
          </Link>
          <div style={navLinksStyles}>
            <div 
              style={{
                ...userInfoStyles,
                backgroundColor: theme.colors.gray[200],
                borderRadius: theme.radius.md,
                padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                animation: 'pulse 2s infinite',
              }}
            >
              Loading...
            </div>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header style={headerStyles} className={className}>
      <nav style={navStyles}>
        <Link href="/" style={logoStyles}>
          Orchestrator
        </Link>

        <div style={navLinksStyles}>
          {currentUser ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
              
              <Button
                variant="error"
                size="sm"
                onClick={handleSignOut}
                loading={isSigningOut}
                disabled={isSigningOut}
              >
                Sign Out
              </Button>
            </>
          ) : (
            showAuth && (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;