import connectDB from './_lib/db.js';
import Project from './_models/Project.js';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  // ============ LIST OPERATIONS (no ID) ============
  if (!id) {
    // GET all projects
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

    // POST create new project
    if (req.method === 'POST') {
      try {
        const project = await Project.create(req.body);
        return res.status(201).json({ success: true, data: project });
      } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
      }
    }
  }

  // ============ SINGLE ITEM OPERATIONS (with ID) ============
  if (id) {
    // GET single project
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

    // PUT update project
    if (req.method === 'PUT') {
  const { _id, __v, ...safeBody } = req.body;
  const project = await Project.findByIdAndUpdate(
    req.query.id,
    safeBody,
    { new: true, runValidators: true }
  );
  return res.status(200).json({ success: true, data: project });
}

    // DELETE project
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

  return res.status(405).json({ success: false, error: 'Method not allowed' });
}