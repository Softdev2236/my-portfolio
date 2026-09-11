
import connectDB from '../lib/db.js';
import Skill from '../models/Skill.js';

export default async function handler(req, res) {
  await connectDB();

  // GET all skills
  if (req.method === 'GET') {
    try {
      const skills = await Skill.find({}).sort({ order: 1, createdAt: 1 });
      res.status(200).json({
        success: true,
        count: skills.length,
        data: skills
      });
    } catch (error) {
      console.error('Error fetching skills:', error.message);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
  
  // POST create new skill
  else if (req.method === 'POST') {
    try {
      const skill = await Skill.create(req.body);
      res.status(201).json({
        success: true,
        data: skill
      });
    } catch (error) {
      console.error('Error creating skill:', error.message);
      res.status(400).json({
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