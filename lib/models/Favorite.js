import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // User's ID
  petId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Pet" }, // Pet ID
  createdAt: { type: Date, default: Date.now },
});

// Check if the model already exists, or create it
export default mongoose.models.Favorite || mongoose.model("Favorite", favoriteSchema);
