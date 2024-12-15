import connectToDatabase from "../../../../lib/mongodb";
import Pet from "../../../../lib/models/Pet";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    
    await connectToDatabase();
    // Parsing the Request URL
    const { searchParams } = new URL(req.url, "http://http://localhost:3000/"); 
    const id = searchParams.get("id");

    //If an "id" is provided then we fetch a single pet by its ID
    if (id) {
      const pet = await Pet.findById(id);

      if (!pet) {
        return NextResponse.json(
          { error: "Pet not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(pet);
    }

    // If no "id" is provided, fetch all pets from the database
    const pets = await Pet.find();
    return NextResponse.json(pets); // Returns all pets as a JSON response
  } catch (error) {
    console.error("Error fetching pets:", error);
    return NextResponse.json(
      { error: "Failed to fetch pets." },
      { status: 500 }
    );
  }
}




