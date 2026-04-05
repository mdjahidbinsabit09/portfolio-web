import mongoose from 'mongoose';

const StatSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: Number, default: 0 },
  suffix: { type: String, default: '+' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Stat || mongoose.model('Stat', StatSchema);
