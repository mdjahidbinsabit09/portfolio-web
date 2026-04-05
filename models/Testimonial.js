import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, default: '' },
  text: { type: String, default: '' },
  rating: { type: Number, default: 5, min: 1, max: 5 },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
