import mongoose from 'mongoose';

const AdoptionFormSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  petName: { type: String, required: true },
  petSpecies: { type: String, required: true },
  petBreed: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  adultsInHousehold: { type: String, required: true },
  childrenInHousehold: { type: String },
  allergies: { type: String },
  homeType: { type: String, required: true },
  petExperience: { type: String, required: true },
  reasonForAdopting: { type: String, required: true },
  message: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.AdoptionForm || mongoose.model('AdoptionForm', AdoptionFormSchema);