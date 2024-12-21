import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongodb";
import Favorite from "../../../../lib/models/Favorite";

// Utility to handle bad requests
const badRequest = (message: string) =>
  NextResponse.json({ success: false, error: message }, { status: 400 });

// Utility to handle internal server errors
const serverError = (message: string) =>
  NextResponse.json({ success: false, error: message }, { status: 500 });

// GET all favorite pets or favorites for a specific user
// GET all favorite pets or favorites for a specific user
export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    let favorites;
    if (userId) {
      // Fetch favorites for the specific user
      favorites = await Favorite.find({ userId }).populate("petId");
    } else {
      // If no userId provided, fetch all favorites
      favorites = await Favorite.find().populate("petId");
    }

    if (!favorites || favorites.length === 0) {
      return NextResponse.json(
        { success: false, error: "No favorites found" },
        { status: 404 }
      );
    }

    // Return the filtered data
    return NextResponse.json(
      {
        success: true,
        data: favorites.map((favorite) => ({
          userId: favorite.userId,
          pet: favorite.petId, // This contains populated pet details
        })),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch favorites" },
      { status: 500 }
    );
  }
}

// POST to add a new favorite
export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { userId, petId } = body;

    if (!userId || !petId) {
      return badRequest("userId and petId are required");
    }

    // Check if the favorite already exists
    const existingFavorite = await Favorite.findOne({ userId, petId });
    if (existingFavorite) {
      return badRequest("This pet is already in your favorites");
    }

    // Create a new favorite
    await Favorite.create({ userId, petId });

    return NextResponse.json(
      {
        success: true,
        message: "Favorite added successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding favorite:", error);
    return serverError("Failed to add favorite");
  }
}

// DELETE to remove a favorite
export async function DELETE(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { userId, petId } = body;

    if (petId) {
      // Delete all favorites associated with the petId
      await Favorite.deleteMany({ petId });
      return NextResponse.json(
        {
          success: true,
          message: "All favorites associated with this pet removed successfully",
        },
        { status: 200 }
      );
    }

    if (!userId || !petId) {
      return badRequest("userId and petId are required");
    }

    // Remove a specific favorite
    const deletedFavorite = await Favorite.findOneAndDelete({ userId, petId });
    if (!deletedFavorite) {
      return badRequest("Favorite not found");
    }

    return NextResponse.json(
      {
        success: true,
        message: "Favorite removed successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing favorite:", error);
    return serverError("Failed to remove favorite");
  }
}
