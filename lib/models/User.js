import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true, // Automatically generate ObjectId
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Removes unnecessary whitespace
    },
    firstName: {
      type: String,
      default: null, // Matches the nullable behavior in Prisma
      trim: true,
    },
    lastName: {
      type: String,
      default: null,
      trim: true,
    },
    password: {
      type: String,
      default: null, // Password is optional
    },
    imageUrl: {
      type: String,
      default: null, // Nullable image URL
    },
    clerkUserId: {
      type: String,
      required: true,
      unique: true, // Ensures no duplicate clerk user IDs
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set creation date
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Automatically update on modifications
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
