import connectDB from '../lib/db.js';
import Skill from '../models/Skill.js';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  // GET single skill
  if (req.method === 'GET') {
    try {
      const skill = await Skill.findById(id);
      if (!skill) {
        return res.status(404).json({ 
          success: false, 
          error: 'Skill not found' 
        });
      }
      res.status(200).json({ 
        success: true, 
        data: skill 
      });
    } catch (error) {
      console.error('Error fetching skill:', error.message);
      res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  }
  
  // PUT update skill
  else if (req.method === 'PUT') {
    try {
      const skill = await Skill.findByIdAndUpdate(
        id, 
        req.body, 
        { new: true, runValidators: true }
      );
      if (!skill) {
        return res.status(404).json({ 
          success: false, 
          error: 'Skill not found' 
        });
      }
      res.status(200).json({ 
        success: true, 
        data: skill 
      });
    } catch (error) {
      console.error('Error updating skill:', error.message);
      res.status(400).json({ 
        success: false, 
        error: error.message 
      });
    }
  }
  
  // DELETE skill
  else if (req.method === 'DELETE') {
    try {
      const skill = await Skill.findByIdAndDelete(id);
      if (!skill) {
        return res.status(404).json({ 
          success: false, 
          error: 'Skill not found' 
        });
      }
      res.status(200).json({ 
        success: true, 
        data: {} 
      });
    } catch (error) {
      console.error('Error deleting skill:', error.message);
      res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  }
  
  // Method not allowed
  else {
    res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }
}