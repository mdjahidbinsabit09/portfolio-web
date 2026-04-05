import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, default: '' },
  duration: { type: String, default: '' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema);
