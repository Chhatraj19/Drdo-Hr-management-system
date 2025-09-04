import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  address: String,
  salary: Number,
  image: String,
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }
});

export default mongoose.model("Employee", EmployeeSchema);
