// import { NextResponse } from 'next/server'
// import prisma from '../../../../lib/prisma'

// export async function GET() {
//   try {
//     const users = await prisma.user.findMany({
//       select: {
//         id: true,
//         email: true,
//         firstName: true,
//         lastName: true,
//         imageUrl: true,
//         clerkUserId: true,
//         createdAt: true,
//         updatedAt: true,
//       },
//     })

//     return NextResponse.json(users, { status: 200 })
//   } catch (error) {
//     console.error('Error fetching users:', error)
//     return NextResponse.json(
//       { error: 'Failed to fetch users', details: error.message },
//       { status: 500 }
//     )
//   }
// }

import { createClerkClient } from '@clerk/backend'

const clerk = createClerkClient(
  { secretKey: process.env.CLERK_SECRET_KEY });

  export async function GET() {
    try {
      const users = await clerk.users.getUserList(); // Fetch all users
      return new Response(JSON.stringify(users), { status: 200 }); // Ensure it's an array
    } catch (error) {
      console.error("Failed to fetch users:", error);
      return new Response(JSON.stringify({ error: "Failed to fetch users" }), { status: 500 });
    }
  }

export async function PUT(request) {
  try {
    const { id, updates } = await request.json(); // Expect `id` and `updates` in the body
    const updatedUser = await clerk.users.updateUser(id, updates); // Update user details
    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.error("Failed to update user:", error);
    return new Response(JSON.stringify({ error: "Failed to update user" }), { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json(); // Expect `id` in the body
    await clerk.users.deleteUser(id); // Delete user
    return new Response(JSON.stringify({ message: "User deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Failed to delete user:", error);
    return new Response(JSON.stringify({ error: "Failed to delete user" }), { status: 500 });
  }
}
