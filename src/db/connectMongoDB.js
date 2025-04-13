import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("mongo connected successfully...");
  } catch (error) {
    console.log("error occur during connection", error);
    process.exit(1);
  }
};

export default connectMongoDB;
