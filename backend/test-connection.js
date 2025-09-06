import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

console.log('Testing MongoDB connection...');
console.log('Connection string:', process.env.MONGO_URI ? 'Found' : 'Not found');

const testConnection = async () => {
  try {
    console.log('Attempting to connect...');
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000, // Increase timeout
      connectTimeoutMS: 30000,
    });
    console.log('✅ Successfully connected to MongoDB Atlas');
    
    // Test a simple operation
    console.log('Testing database operations...');
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
  } catch (error) {
    console.log('❌ Connection failed:');
    console.log('Error name:', error.name);
    console.log('Error message:', error.message);
    
    if (error.reason) {
      console.log('Reason:', error.reason);
    }
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

testConnection();
