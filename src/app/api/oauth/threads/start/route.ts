import { NextResponse } from 'next/server'
import { createClient } from '@/app/utils/supabase/server'

// Threads (Instagram) OAuth is not publicly documented in the same way as Twitter.
// This route is a placeholder and will return 501 until app credentials and flow are finalized.
export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.json({ error: 'Threads OAuth not implemented' }, { status: 501 })
}


