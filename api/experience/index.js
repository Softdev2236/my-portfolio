import connectDB from '../lib/db.js';
import Experience from '../models/Experience.js';

export default async function handler(req, res) {
  await connectDB();

  // GET all experience
  if (req.method === 'GET') {
    try {
      const experiences = await Experience.find({}).sort({ order: 1, createdAt: -1 });
      res.status(200).json({
        success: true,
        count: experiences.length,
        data: experiences
      });
    } catch (error) {
      console.error('Error fetching experience:', error.message);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
  
  // POST create new experience
  else if (req.method === 'POST') {
    try {
      const experience = await Experience.create(req.body);
      res.status(201).json({
        success: true,
        data: experience
      });
    } catch (error) {
      console.error('Error creating experience:', error.message);
      res.status(400).json({
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