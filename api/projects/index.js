import connectDB from '../lib/db.js';
import Project from '../models/Project.js';

export default async function handler(req, res) {
  try {
    await connectDB();

    if (req.method === 'GET') {
      const projects = await Project.find({}).sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        count: projects.length,
        data: projects
      });
    } else if (req.method === 'POST') {
      const project = await Project.create(req.body);
      res.status(201).json({
        success: true,
        data: project
      });
    } else {
      res.status(405).json({ 
        success: false, 
        error: 'Method not allowed' 
      });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}