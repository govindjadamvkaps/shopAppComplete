import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  bio: {type:String }
});

const AdminModel = new mongoose.model("admin", adminSchema)

export default AdminModel;
