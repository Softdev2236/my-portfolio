import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

console.log('🔗 Testing connection...');
console.log('📡 URI:', uri ? uri.substring(0, 30) + '...' : '❌ Not found');

if (!uri) {
  console.error('❌ MONGODB_URI not found in .env');
  process.exit(1);
}

mongoose.connect(uri, {
  serverSelectionTimeoutMS: 5000,
})
.then(() => {
  console.log('✅ Connected!');
  return mongoose.connection.db.listCollections().toArray();
})
.then((collections) => {
  console.log('📁 Collections:', collections.map(c => c.name));
  return mongoose.disconnect();
})
.then(() => {
  console.log('✅ Test complete!');
  process.exit(0);
})
.catch((err) => {
  console.error('❌ Error:', err.message);
  console.log('\n💡 Common fixes:');
  console.log('   1. Add your IP in MongoDB Atlas → Network Access');
  console.log('   2. Check your username/password');
  console.log('   3. Make sure your cluster is running');
  process.exit(1);
});