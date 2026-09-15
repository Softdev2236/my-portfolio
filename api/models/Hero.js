import mongoose from 'mongoose';

const SocialSchema = new mongoose.Schema({
  platform: {
     type: String, required: true, trim: true },
  url: { type: String, required: true, trim: true }
}, { _id: false });

const HeroSchema = new mongoose.Schema({
  greeting: { type: String, default: "Hello, I'm", trim: true },
  name: { type: String, required: true, trim: true },
  roles: [{ type: String, trim: true }],
  bio: { type: String, required: true },
  profileImageUrl: { type: String, required: true },
  cvUrl: { type: String, default: '' },
  hireMeLink: { type: String, default: '#contact' },
  socials: [SocialSchema],
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Hero || mongoose.model('Hero', HeroSchema);