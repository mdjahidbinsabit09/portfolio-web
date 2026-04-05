import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  tools: [{ type: String }],
  role: { type: String, default: '' },
  code: { type: String, default: '' },
  demo: { type: String, default: '' },
  image: { type: String, default: '' },
  category: { type: String, default: 'WordPress' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
