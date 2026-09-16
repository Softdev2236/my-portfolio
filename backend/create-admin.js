import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

// ============================================================
// CHANGE THESE TWO VALUES
// ============================================================
const USERNAME = 'aliraxa';                    // Your admin username
const PASSWORD = 'aa2236';     // Your admin password
// ============================================================

async function createAdmin() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db('portfolio');
    const collection = db.collection('admins');

    // Check if admin already exists
    const existing = await collection.findOne({ username: USERNAME });

    if (existing) {
      console.log('⚠️ Admin already exists:', USERNAME);
      console.log('   Delete the existing one first if you want to recreate');
      return;
    }

    // Hash the password (never store plain text!)
    const passwordHash = await bcrypt.hash(PASSWORD, 10);

    // Insert into database
    await collection.insertOne({
      username: USERNAME,
      passwordHash,
      createdAt: new Date()
    });

    console.log('✅ Admin created successfully!');
    console.log('   Username:', USERNAME);
    console.log('   (password is hashed in the database)');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
    process.exit(0);
  }
}

createAdmin();