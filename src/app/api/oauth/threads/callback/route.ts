import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ error: 'Threads OAuth callback not implemented' }, { status: 501 })
}


