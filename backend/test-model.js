const mongoose = require('mongoose');
require('dotenv').config();

console.log('🔗 Connecting to test MongoDB...');
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('✅ Connected!');
  
  // Try to import the model
  const Project = require('../api/models/Project');
  console.log('✅ Project type:', typeof Project);
  console.log('✅ Project.find type:', typeof Project.find);
  
  if (typeof Project.find === 'function') {
    console.log('✅✅✅ MODEL IS WORKING CORRECTLY!');
  } else {
    console.log('❌❌❌ MODEL IS STILL BROKEN!');
  }
  
  mongoose.disconnect();
})
.catch(err => console.log('Error:', err.message));