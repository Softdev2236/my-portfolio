import connectDB from './lib/db.js';
import Experience from './models/Experience.js';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  // ============ LIST OPERATIONS (no ID) ============
  if (!id) {
    // GET all experience
    if (req.method === 'GET') {
      try {
        const experiences = await Experience.find({}).sort({ order: 1, createdAt: -1 });
        return res.status(200).json({
          success: true,
          count: experiences.length,
          data: experiences
        });
      } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
      }
    }

    // POST create new experience
    if (req.method === 'POST') {
      try {
        const experience = await Experience.create(req.body);
        return res.status(201).json({ success: true, data: experience });
      } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
      }
    }
  }

  // ============ SINGLE ITEM OPERATIONS (with ID) ============
  if (id) {
    // GET single experience
    if (req.method === 'GET') {
      try {
        const experience = await Experience.findById(id);
        if (!experience) {
          return res.status(404).json({ success: false, error: 'Experience not found' });
        }
        return res.status(200).json({ success: true, data: experience });
      } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
      }
    }

    // PUT update experience
    if (req.method === 'PUT') {
      try {
        const experience = await Experience.findByIdAndUpdate(
          id,
          req.body,
          { new: true, runValidators: true }
        );
        if (!experience) {
          return res.status(404).json({ success: false, error: 'Experience not found' });
        }
        return res.status(200).json({ success: true, data: experience });
      } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
      }
    }

    // DELETE experience
    if (req.method === 'DELETE') {
      try {
        const experience = await Experience.findByIdAndDelete(id);
        if (!experience) {
          return res.status(404).json({ success: false, error: 'Experience not found' });
        }
        return res.status(200).json({ success: true, data: {} });
      } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
      }
    }
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
}