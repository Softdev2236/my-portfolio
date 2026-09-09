import connectDB from './lib/db.js';

export default async function handler(req, res) {
  try {
    await connectDB();
    res.status(200).json({
      success: true,
      message: '✅ Vercel Serverless API is working!',
      database: '✅ Connected to MongoDB',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '❌ API Error',
      error: error.message
    });
  }
}