import mongoose from 'mongoose';

let isConnected = false;

export async function connectToDB() {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URI) {
    console.log('Please specify mongoDB URI');
    return;
  }

  if (isConnected) {
    console.log('Using existing Database');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(`Could not connect to MongoDB ${error}`);
  }
}
