import mongoose from "mongoose";

const PetSchema = new mongoose.Schema({
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
});

// Export the model, or use an existing one if already created
export default mongoose.models.pets || mongoose.model("pets", PetSchema);
