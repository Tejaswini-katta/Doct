const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://myAtlasDBUser:Annayya293@myatlasclusteredu.gfmopu4.mongodb.net/doctspot?retryWrites=true&w=majority&appName=myAtlasClusterEDU'
    );
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
  }
};

module.exports = connectDB;
