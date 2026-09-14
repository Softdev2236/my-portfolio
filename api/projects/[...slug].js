import connectDB from '../lib/db.js';
import Project from '../models/Project.js';

export default async function handler(req, res) {
  await connectDB();
  const { slug } = req.query;  // slug is an array: [] or ['123']

  // Determine if this is a list request or single item request
  const id = slug && slug[0];  // undefined for /api/projects, '123' for /api/projects/123

  // ============ LIST OPERATIONS ============
  if (!id) {
    if (req.method === 'GET') {
      try {
        const projects = await Project.find({}).sort({ createdAt: -1 });
        return res.status(200).json({
          success: true,
          count: projects.length,
          data: projects
        });
      } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
      }
    }
    
    if (req.method === 'POST') {
      try {
        const project = await Project.create(req.body);
        return res.status(201).json({ success: true, data: project });
      } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
      }
    }
  }

  // ============ SINGLE ITEM OPERATIONS ============
  if (id) {
    if (req.method === 'GET') {
      try {
        const project = await Project.findById(id);
        if (!project) {
          return res.status(404).json({ success: false, error: 'Project not found' });
        }
        return res.status(200).json({ success: true, data: project });
      } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
      }
    }
    
    if (req.method === 'PUT') {
      try {
        const project = await Project.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!project) {
          return res.status(404).json({ success: false, error: 'Project not found' });
        }
        return res.status(200).json({ success: true, data: project });
      } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
      }
    }
    
    if (req.method === 'DELETE') {
      try {
        const project = await Project.findByIdAndDelete(id);
        if (!project) {
          return res.status(404).json({ success: false, error: 'Project not found' });
        }
        return res.status(200).json({ success: true, data: {} });
      } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
      }
    }
  }

  // If nothing matched
  return res.status(405).json({ success: false, error: 'Method not allowed' });
}