import connectDB from '../lib/db.js';
import Experience from '../models/Experience.js';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const experience = await Experience.findById(id);
      if (!experience) {
        return res.status(404).json({ 
          success: false, 
          error: 'Experience not found' 
        });
      }
      res.status(200).json({ 
        success: true, 
        data: experience 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  }
  
  else if (req.method === 'PUT') {
    try {
      const experience = await Experience.findByIdAndUpdate(
        id, 
        req.body, 
        { new: true, runValidators: true }
      );
      if (!experience) {
        return res.status(404).json({ 
          success: false, 
          error: 'Experience not found' 
        });
      }
      res.status(200).json({ 
        success: true, 
        data: experience 
      });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        error: error.message 
      });
    }
  }
  
  else if (req.method === 'DELETE') {
    try {
      const experience = await Experience.findByIdAndDelete(id);
      if (!experience) {
        return res.status(404).json({ 
          success: false, 
          error: 'Experience not found' 
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
  }
  
  else {
    res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }
}