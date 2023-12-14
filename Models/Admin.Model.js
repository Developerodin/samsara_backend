// adminModel.js
import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  // Add other fields as needed
});

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
