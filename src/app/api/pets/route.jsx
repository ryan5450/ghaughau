import connectToDatabase from "../../../../lib/mongodb";
import Pet from "../../../../lib/models/Pet";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDatabase();

    // Use the URLSearchParams API for parsing search parameters
    const { searchParams } = new URL(req.url, "http://http://localhost:3000/"); // Add a base URL here
    const id = searchParams.get("id");

    if (id) {
      // Fetch a single pet by ID
      const pet = await Pet.findById(id);

      if (!pet) {
        return NextResponse.json(
          { error: "Pet not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(pet);
    }

    // Fetch all pets
    const pets = await Pet.find();
    return NextResponse.json(pets);
  } catch (error) {
    console.error("Error fetching pets:", error);
    return NextResponse.json(
      { error: "Failed to fetch pets." },
      { status: 500 }
    );
  }
}
