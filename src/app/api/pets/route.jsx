import connectToDatabase from "../../../../lib/mongodb";
import Pet from "../../../../lib/models/Pet";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url, "http://localhost:3000/");
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

export async function POST(request) {
  try {
    const data = await request.json();

    await connectToDatabase();

    const newPet = new Pet({
      name: data.name,
      age: data.age,
      species: data.species,
      gender: data.gender,
      breed: data.breed,
      imageUrl: data.imageUrl,
      description: data.description,
      vaccinationStatus: data.vaccinationStatus,
      status: data.status,
    });

    const savedPet = await newPet.save();
    return NextResponse.json({ pet: savedPet }, { status: 201 });
  } catch (error) {
    console.error("Failed to add pet:", error);
    return NextResponse.json({ error: "Failed to add pet" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url, "http://localhost:3000/");
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const data = await request.json();

    await connectToDatabase();

    const updatedPet = await Pet.findByIdAndUpdate(id, data, { new: true }); // Update and return the updated pet

    if (!updatedPet) {
      return NextResponse.json({ error: "Pet not found" }, { status: 404 });
    }

    return NextResponse.json({ pet: updatedPet }, { status: 200 });
  } catch (error) {
    console.error("Failed to update pet:", error);
    return NextResponse.json({ error: "Failed to update pet" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url, "http://localhost:3000/");
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await connectToDatabase();

    const deletedPet = await Pet.findByIdAndDelete(id);
    if (!deletedPet) {
      return NextResponse.json({ error: "Pet not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Pet deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete pet:", error);
    return NextResponse.json({ error: "Failed to delete pet" }, { status: 500 });
  }
}
