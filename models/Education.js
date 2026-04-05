import mongoose from 'mongoose';

const EducationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String, default: '' },
  institution: { type: String, default: '' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Education || mongoose.model('Education', EducationSchema);
