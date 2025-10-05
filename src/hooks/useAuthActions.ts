import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface User {
  id: string;
  email?: string | undefined;
  name?: string | undefined;
}

/**
 * Hook for authentication actions like sign out
 * Separates business logic from UI components
 */
export function useAuthActions() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const signOutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/signout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to sign out');
      }

      return response;
    },
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
      // Redirect to home page
      router.push('/');
    },
    onError: (error) => {
      console.error('Sign out failed:', error);
      // Still clear cache and redirect on error
      queryClient.clear();
      router.push('/');
    },
  });

  return {
    signOut: signOutMutation.mutate,
    isSigningOut: signOutMutation.isPending,
    signOutError: signOutMutation.error,
  };
}
