import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  liveUrl: String,
  githubUrl: String,
  technologies: [String],
  featured: Boolean,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);