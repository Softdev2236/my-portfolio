import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log('🔗 Testing MongoDB insert...');
console.log('📡 URI:', MONGODB_URI ? '✅ Found' : '❌ Not found');

async function testDirectInsert() {
  try {
    // Connect with minimal options
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
    
    console.log('✅ Connected to MongoDB!');
    
    // Test connection with ping
    await mongoose.connection.db.admin().ping();
    console.log('✅ Ping successful!');
    
    // Create a simple test collection
    const TestModel = mongoose.model('Test', new mongoose.Schema({
      name: String,
      createdAt: { type: Date, default: Date.now }
    }));
    
    console.log('📝 Inserting test document...');
    const result = await TestModel.create({ name: 'Test Document' });
    console.log('✅ Inserted! ID:', result._id);
    
    // Read it back
    const docs = await TestModel.find({});
    console.log('📊 Found', docs.length, 'test documents');
    
    // Clean up
    await TestModel.deleteMany({});
    console.log('✅ Cleaned up test documents');
    
    await mongoose.disconnect();
    console.log('✅ Test complete!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Error details:', error);
    process.exit(1);
  }
}

testDirectInsert();