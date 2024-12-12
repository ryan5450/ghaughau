import connectToDatabase from "../../../../lib/mongodb";
import Pet from "../../../../lib/models/Pet";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDatabase();

   
    const { searchParams } = new URL(req.url, "http://http://localhost:3000/"); 
    const id = searchParams.get("id");

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
