import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;

  await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 30000,
    family: 4,
  });
};

export default connectDB;