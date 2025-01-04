import { NextRequest, NextResponse } from 'next/server'
import { clerkClient } from '@clerk/nextjs/server'

export async function POST(request: NextRequest) {
  try {
    const { id, isAdmin } = await request.json()

    const client = await clerkClient()

    await client.users.updateUserMetadata(id, {
      publicMetadata: {
        role: isAdmin ? 'admin' : 'user',
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error toggling admin status:', error)
    return NextResponse.json({ error: 'Failed to update admin status' }, { status: 500 })
  }
}

