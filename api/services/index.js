import connectDB from '../lib/db.js';
import Service from '../models/Service.js';

export default async function handler(req, res) {
  await connectDB();

  // GET all services
  if (req.method === 'GET') {
    try {
      const services = await Service.find({}).sort({ order: 1, createdAt: 1 });
      res.status(200).json({
        success: true,
        count: services.length,
        data: services
      });
    } catch (error) {
      console.error('Error fetching services:', error.message);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
  
  // POST create new service
  else if (req.method === 'POST') {
    try {
      const service = await Service.create(req.body);
      res.status(201).json({
        success: true,
        data: service
      });
    } catch (error) {
      console.error('Error creating service:', error.message);
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