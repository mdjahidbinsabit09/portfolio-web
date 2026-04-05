import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
  // Personal Info
  name: { type: String, default: '' },
  profile: { type: String, default: '/profile.jpg' },
  designation: { type: String, default: '' },
  description: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  address: { type: String, default: '' },
  github: { type: String, default: '' },
  facebook: { type: String, default: '' },
  linkedIn: { type: String, default: '' },
  twitter: { type: String, default: '' },
  stackOverflow: { type: String, default: '' },
  leetcode: { type: String, default: '' },
  devUsername: { type: String, default: '' },
  resume: { type: String, default: '' },
  available: { type: Boolean, default: true },

  // SEO
  siteTitle: { type: String, default: '' },
  siteDescription: { type: String, default: '' },
  ogImage: { type: String, default: '' },

  // Design
  accentBlue: { type: String, default: '#00d4ff' },
  accentOrange: { type: String, default: '#ff6b35' },
  accentGold: { type: String, default: '#ffd700' },

  // Feature Toggles
  enableParticles: { type: Boolean, default: true },
  enableCursor: { type: Boolean, default: true },
  enableMouseTrail: { type: Boolean, default: true },
  enableFloatingOrbs: { type: Boolean, default: true },
  enableScrollProgress: { type: Boolean, default: true },
  enableAnnouncement: { type: Boolean, default: true },
  enableSectionDots: { type: Boolean, default: true },
  enableCommandPalette: { type: Boolean, default: true },
  enableKonami: { type: Boolean, default: true },
  announcementText: { type: String, default: 'Available for new projects — Let\'s build something amazing!' },
}, { timestamps: true });

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
