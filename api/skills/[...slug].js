import connectDB from '../lib/db.js';
import Skill from '../models/Skill.js';

export default async function handler(req, res) {
  await connectDB();
  const { slug } = req.query;
  const id = slug && slug[0];

  if (!id) {
    if (req.method === 'GET') {
      try {
        const skills = await Skill.find({}).sort({ order: 1, createdAt: 1 });
        return res.status(200).json({ success: true, count: skills.length, data: skills });
      } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
      }
    }
    if (req.method === 'POST') {
      try {
        const skill = await Skill.create(req.body);
        return res.status(201).json({ success: true, data: skill });
      } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
      }
    }
  }

  if (id) {
    if (req.method === 'GET') {
      try {
        const skill = await Skill.findById(id);
        if (!skill) return res.status(404).json({ success: false, error: 'Skill not found' });
        return res.status(200).json({ success: true, data: skill });
      } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
      }
    }
    if (req.method === 'PUT') {
      try {
        const skill = await Skill.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!skill) return res.status(404).json({ success: false, error: 'Skill not found' });
        return res.status(200).json({ success: true, data: skill });
      } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
      }
    }
    if (req.method === 'DELETE') {
      try {
        const skill = await Skill.findByIdAndDelete(id);
        if (!skill) return res.status(404).json({ success: false, error: 'Skill not found' });
        return res.status(200).json({ success: true, data: {} });
      } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
      }
    }
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
}