import connectDB from './_lib/db.js';
import Hero from './_models/Hero.js';

export default async function handler(req, res) {
  await connectDB();

  // GET hero data
  if (req.method === 'GET') {
    try {
      let hero = await Hero.findOne({});
      
      if (!hero) {
        return res.status(200).json({
          success: true,
          data: null,
          message: 'No hero data yet. Please add one.'
        });
      }
      
      return res.status(200).json({
        success: true,
        data: hero
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  // POST create hero (first time only)
  if (req.method === 'POST') {
    try {
      const existing = await Hero.findOne({});
      if (existing) {
        return res.status(400).json({ 
          success: false, 
          error: 'Hero already exists. Use PUT to update.' 
        });
      }
      
      const hero = await Hero.create(req.body);
      return res.status(201).json({ success: true, data: hero });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  // PUT update hero (creates if not exists)
  if (req.method === 'PUT') {
  // Strip _id and __v — MongoDB rejects updates to _id
  const { _id, __v, ...safeBody } = req.body;

  const hero = await Hero.findOneAndUpdate(
    {},
    { ...safeBody, updatedAt: new Date() },
    { new: true, upsert: true, runValidators: true }
  );

  return res.status(200).json({ success: true, data: hero });
}

  // DELETE hero
  if (req.method === 'DELETE') {
    try {
      await Hero.deleteMany({});
      return res.status(200).json({ success: true, data: {} });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
}