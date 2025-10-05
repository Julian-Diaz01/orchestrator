import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api';

interface SupabaseUser {
  user_metadata: any;
  id: string;
  email?: string;
  name?: string;
}

export interface User {
  id: string;
  email?: string | undefined;
  name?: string | undefined;
}

export function useAuth() {
  const { data, isLoading, error, ...rest } = useQuery({
    queryKey: ['user'],
    queryFn: () => apiClient.get<SupabaseUser | null>('/me'),
    retry: false,
    refetchOnWindowFocus: false,
  });
  
  const transformedUser: User | null = data ? {
    id: data.id,
    email: data.email || undefined,
    name: data.name || data.user_metadata?.name || data.email?.split('@')[0] || undefined,
  } : null;

  return {
    data: transformedUser,
    isLoading,
    error,
    ...rest,
  };
}