import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';
import { getAuth } from '@clerk/nextjs/server'; // Replace this with your authentication provider's library

export async function GET(req) {
  try {
    // Authenticate and get the user's identity
    const { userId } = getAuth(req); // Assuming `getAuth` retrieves the authenticated user's ID
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized: User is not logged in' },
        { status: 401 }
      );
    }

    // Fetch user details from the database
    const user = await prisma.user.findUnique({
      where: {
        clerkUserId: userId, // Replace with the correct column to identify users
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        imageUrl: true,
        clerkUserId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error fetching user details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user details', details: error.message },
      { status: 500 }
    );
  }
}
