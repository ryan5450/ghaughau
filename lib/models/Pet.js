// PetSchema with Adoption Status and versionKey disabled
import mongoose from "mongoose";

const PetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: String, // Example: "1 month", "2 years"
      required: true,
    },
    species: {
      type: String, // Example: "dog", "cat"
      required: true,
    },
    gender: {
      type: String, // Example: "male", "female"
      required: true,
    },
    breed: {
      type: String, // Optional breed details about the pet
    },
    imageUrl: {
      type: String, // URL of the pet's image
      required: true,
    },
    description: {
      type: String, // Optional additional details about the pet
    },
    vaccinationStatus: {
      type: String,
    },
    adoptionStatus: {
      type: String, // "adopted" or "available"
      enum: ["adopted", "available"],
      required: true,
      default: "available",
    },
  },
  {
    versionKey: false, // Disable the "__v" field
  }
);

export default mongoose.models.Pet || mongoose.model("Pet", PetSchema);
