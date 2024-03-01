const mongoose = require('mongoose');
const dotenv = require('dotenv'); // Make sure to install dotenv if you haven't already
dotenv.config(); // Load environment variables from a .env file

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${connection.connection.host}`);

    // Include your models here
    // For example:
    require('./models/userModel');
    require('./models/goalModel');

  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;