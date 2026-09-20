import connectDB from './_lib/db.js';
import Service from './_models/Service.js';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  // ============ LIST OPERATIONS (no ID) ============
  if (!id) {
    // GET all services
    if (req.method === 'GET') {
      try {
        const services = await Service.find({}).sort({ order: 1, createdAt: 1 });
        return res.status(200).json({
          success: true,
          count: services.length,
          data: services
        });
      } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
      }
    }

    // POST create new service
    if (req.method === 'POST') {
      try {
        const service = await Service.create(req.body);
        return res.status(201).json({ success: true, data: service });
      } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
      }
    }
  }

  // ============ SINGLE ITEM OPERATIONS (with ID) ============
  if (id) {
    // GET single service
    if (req.method === 'GET') {
      try {
        const service = await Service.findById(id);
        if (!service) {
          return res.status(404).json({ success: false, error: 'Service not found' });
        }
        return res.status(200).json({ success: true, data: service });
      } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
      }
    }

    // PUT update service
    if (req.method === 'PUT') {
      try {
        const service = await Service.findByIdAndUpdate(
          id,
          safeBody,
          { new: true, runValidators: true }
        );
        if (!service) {
          return res.status(404).json({ success: false, error: 'Service not found' });
        }
        return res.status(200).json({ success: true, data: service });
      } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
      }
    }

    // DELETE service
    if (req.method === 'DELETE') {
      try {
        const service = await Service.findByIdAndDelete(id);
        if (!service) {
          return res.status(404).json({ success: false, error: 'Service not found' });
        }
        return res.status(200).json({ success: true, data: {} });
      } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
      }
    }
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
}