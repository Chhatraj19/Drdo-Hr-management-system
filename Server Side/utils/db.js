import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://dhruvdawar11022006:dd110206@cluster0.isvmwi6.mongodb.net/hrmanagement", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
  // try {
  //   await mongoose.connect("mongodb://127.0.0.1:27017/hrmanagement", {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   });
  //   console.log("✅ MongoDB Connected");
  // } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;
