import connectDB from './lib/db.js';

export default async function handler(req, res) {
  try {
    await connectDB();
    res.status(200).json({
      success: true,
      message: '✅ API is working!',
      database: '✅ Connected to MongoDB',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}