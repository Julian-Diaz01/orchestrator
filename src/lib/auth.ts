import { createClient } from '@/lib/supabase'

export async function signIn(email: string, password: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw error
  }

  return data
}

export async function signUp(email: string, password: string, name?: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name || '',
      },
    },
  })

  if (error) {
    throw error
  }

  return data
}

export async function signOut() {
  try {
    const response = await fetch('/api/signout', {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to sign out');
    }

    // Also call client-side signOut as backup
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.warn('Client-side signOut error:', error);
    }

    // Redirect to login page
    window.location.href = '/login';
  } catch (error) {
    console.error('SignOut error:', error);
    throw error;
  }
}

export async function signInWithGoogle() {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })

  if (error) {
    throw error
  }

  return data
}

export async function getCurrentUser() {
  const supabase = createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error) {
    if (error.message?.includes('Auth session missing')) {
      return null
    }
    throw error
  }

  return user
}

export async function getSession() {
  const supabase = createClient()
  
  const { data: { session }, error } = await supabase.auth.getSession()

  if (error) {
    if (error.message?.includes('Auth session missing')) {
      return null
    }
    throw error
  }

  return session
}
