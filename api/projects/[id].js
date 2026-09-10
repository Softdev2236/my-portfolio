import connectDB from '../lib/db.js';
import Project from '../models/Project.js';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const project = await Project.findById(id);
      if (!project) {
        return res.status(404).json({ 
          success: false, 
          error: 'Project not found' 
        });
      }
      res.status(200).json({ 
        success: true, 
        data: project 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  } else if (req.method === 'PUT') {
    try {
      const project = await Project.findByIdAndUpdate(
        id, 
        req.body, 
        { new: true, runValidators: true }
      );
      if (!project) {
        return res.status(404).json({ 
          success: false, 
          error: 'Project not found' 
        });
      }
      res.status(200).json({ 
        success: true, 
        data: project 
      });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        error: error.message 
      });
    }
  } else if (req.method === 'DELETE') {
    try {
      const project = await Project.findByIdAndDelete(id);
      if (!project) {
        return res.status(404).json({ 
          success: false, 
          error: 'Project not found' 
        });
      }
      res.status(200).json({ 
        success: true, 
        data: {} 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  } else {
    res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }
}
