import React from 'react';
import Link from 'next/link';
import { theme } from '@/lib/theme';
import Button from './Button';

export interface HeaderProps {
  user?: {
    email?: string;
    name?: string;
  } | null;
  onSignOut?: () => void;
  showAuth?: boolean;
}

const Header: React.FC<HeaderProps> = ({ user, onSignOut, showAuth = true }) => {
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

  return (
    <header style={headerStyles}>
      <nav style={navStyles}>
        <Link href="/" style={logoStyles}>
          Orchestrator
        </Link>

        <div style={navLinksStyles}>
          {user ? (
            <>
              <div style={userInfoStyles}>
                <span>Welcome, {user.name || user.email}</span>
              </div>
              {onSignOut && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onSignOut}
                >
                  Sign Out
                </Button>
              )}
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
