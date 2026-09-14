import connectDB from '../lib/db.js';
import Service from '../models/Service.js';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  // GET single service
  if (req.method === 'GET') {
    try {
      const service = await Service.findById(id);
      if (!service) {
        return res.status(404).json({ 
          success: false, 
          error: 'Service not found' 
        });
      }
      res.status(200).json({ 
        success: true, 
        data: service 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  }
  
  // PUT update service
  else if (req.method === 'PUT') {
    try {
      const service = await Service.findByIdAndUpdate(
        id, 
        req.body, 
        { new: true, runValidators: true }
      );
      if (!service) {
        return res.status(404).json({ 
          success: false, 
          error: 'Service not found' 
        });
      }
      res.status(200).json({ 
        success: true, 
        data: service 
      });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        error: error.message 
      });
    }
  }
  
  // DELETE service
  else if (req.method === 'DELETE') {
    try {
      const service = await Service.findByIdAndDelete(id);
      if (!service) {
        return res.status(404).json({ 
          success: false, 
          error: 'Service not found' 
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