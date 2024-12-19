import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String, default: "Thanks for your question! We will get back to you soon." },
  status: { type: String, enum: ['pending', 'answered'], default: 'pending' },
}, { timestamps: true });

export default mongoose.models.Question || mongoose.model('Question', QuestionSchema);

