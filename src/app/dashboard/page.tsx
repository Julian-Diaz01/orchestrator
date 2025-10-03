'use client';

import { theme } from '@/lib/theme';
import Header from '@/components/Header';
import Card from '@/components/ui/Card';
import { useAuth } from '@/hooks/useAuth';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { data: user, isLoading, error } = useAuth();

  useEffect(() => {
    if (error || (!isLoading && !user)) {
      redirect('/login');
    }
  }, [user, isLoading, error]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme.colors.background.primary }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.colors.background.primary }}>
      <Header user={user} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold" style={{ color: theme.colors.text.primary }}>
            Welcome back, {user.name || user.email || 'User'}!
          </h1>
          <p className="mt-2" style={{ color: theme.colors.text.secondary }}>
            Here's what's happening with your social media posts today.
          </p>
        </div>

        {/* Dashboard Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <h2 className="text-xl font-bold" style={{ color: theme.colors.text.primary }}>
              Your Social Media Accounts
            </h2>

<p className="text-sm text-gray-500">Add accounts to get started</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
