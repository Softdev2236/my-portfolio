import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection - Global variables
let db = null;
let isConnected = false;

// Connection function
async function connectDB() {
  try {
    console.log('🔗 Connecting to MongoDB with native driver...');
    
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI not found in .env');
    }
    
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 30000,
      connectTimeoutMS: 30000,
    });
    
    await client.connect();
    console.log('✅ Connected to MongoDB!');
    
    db = client.db('portfolio');
    isConnected = true;
    
    // Test connection
    const collections = await db.listCollections().toArray();
    console.log('📁 Collections:', collections.map(c => c.name));
    
    return db;
  } catch (error) {
    console.error('❌ Connection error:', error.message);
    isConnected = false;
    throw error;
  }
}

// Connect on startup with retry
(async function init() {
  try {
    await connectDB();
  } catch (error) {
    console.log('💡 Retrying connection in 5 seconds...');
    setTimeout(async () => {
      try {
        await connectDB();
      } catch (err) {
        console.log('❌ Failed to connect after retry:', err.message);
      }
    }, 5000);
  }
})();

// ============ ROUTES ============

// Test route
app.get('/api/test', (req, res) => {
  res.json({
    message: '✅ Backend is working!',
    database: isConnected ? '✅ Connected' : '❌ Disconnected',
    timestamp: new Date().toISOString()
  });
});

// Debug route - direct insert test
app.get('/api/direct-test', async (req, res) => {
  try {
    console.log('🔍 Direct insert test...');
    console.log('📡 Database connected:', isConnected);
    console.log('📡 Database object:', db ? '✅ Exists' : '❌ Null');
    
    if (!isConnected || !db) {
      return res.status(500).json({
        success: false,
        error: 'Not connected to MongoDB. Please wait for connection.'
      });
    }
    
    const collection = db.collection('projects');
    
    // Insert a test document
    const testDoc = {
      title: 'Direct Test',
      description: 'Testing direct insert',
      createdAt: new Date()
    };
    
    const result = await collection.insertOne(testDoc);
    console.log('✅ Inserted:', result.insertedId);
    
    // Clean up
    await collection.deleteOne({ _id: result.insertedId });
    console.log('✅ Cleaned up');
    
    res.json({
      success: true,
      message: 'Direct insert works!',
      testId: result.insertedId
    });
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET all projects
app.get('/api/projects', async (req, res) => {
  try {
    console.log('📊 Fetching projects...');
    
    if (!isConnected || !db) {
      return res.status(500).json({
        success: false,
        error: 'Not connected to MongoDB. Please wait for connection.'
      });
    }
    
    const collection = db.collection('projects');
    const projects = await collection.find({}).sort({ createdAt: -1 }).toArray();
    
    console.log(`✅ Found ${projects.length} projects`);
    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error('❌ Error fetching projects:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST create new project
app.post('/api/projects', async (req, res) => {
  try {
    console.log('📝 Creating project...');
    console.log('📝 Data:', JSON.stringify(req.body, null, 2));
    
    if (!isConnected || !db) {
      return res.status(500).json({
        success: false,
        error: 'Not connected to MongoDB. Please wait for connection.'
      });
    }
    
    const collection = db.collection('projects');
    
    // Add createdAt timestamp
    const projectData = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await collection.insertOne(projectData);
    console.log('✅ Project created:', result.insertedId);
    
    // Fetch the created project
    const created = await collection.findOne({ _id: result.insertedId });
    
    res.status(201).json({
      success: true,
      data: created
    });
  } catch (error) {
    console.error('❌ Error creating project:', error.message);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// GET single project
app.get('/api/projects/:id', async (req, res) => {
  try {
    if (!isConnected || !db) {
      return res.status(500).json({
        success: false,
        error: 'Not connected to MongoDB'
      });
    }
    
    const { ObjectId } = await import('mongodb');
    const collection = db.collection('projects');
    const project = await collection.findOne({ _id: new ObjectId(req.params.id) });
    
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }
    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// PUT update project
app.put('/api/projects/:id', async (req, res) => {
  try {
    if (!isConnected || !db) {
      return res.status(500).json({
        success: false,
        error: 'Not connected to MongoDB'
      });
    }
    
    const { ObjectId } = await import('mongodb');
    const collection = db.collection('projects');
    
    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { ...req.body, updatedAt: new Date() } }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }
    
    const updated = await collection.findOne({ _id: new ObjectId(req.params.id) });
    res.json({
      success: true,
      data: updated
    });
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// DELETE project
app.delete('/api/projects/:id', async (req, res) => {
  try {
    if (!isConnected || !db) {
      return res.status(500).json({
        success: false,
        error: 'Not connected to MongoDB'
      });
    }
    
    const { ObjectId } = await import('mongodb');
    const collection = db.collection('projects');
    
    const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }
    
    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ============ START SERVER ============
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Test: http://localhost:${PORT}/api/test`);
  console.log(`📡 Direct Test: http://localhost:${PORT}/api/direct-test`);
  console.log(`📡 Projects: http://localhost:${PORT}/api/projects`);
});