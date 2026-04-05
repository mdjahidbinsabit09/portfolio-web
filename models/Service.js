import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  icon: { type: String, default: 'FaCode' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);
