import mongoose from 'mongoose';

// Simple schema without any fancy options
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

// Force create the model
const Project = mongoose.model('Project', ProjectSchema);

export default Project;