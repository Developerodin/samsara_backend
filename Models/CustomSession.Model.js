// Assuming you're using ES6 syntax and have already imported mongoose
import mongoose from 'mongoose';

// New model for time slots
const timeSlotSchema = new mongoose.Schema({
  timeRange: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: true, // Slots are available by default
  },
});

const TimeSlot = mongoose.model('TimeSlot', timeSlotSchema);

// Modified CustomSession model
const customSessionSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teachers',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  timeSlot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TimeSlot',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date:{
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'done'],
    default: 'pending', // Sessions are pending by default
  },
});

const CustomSession = mongoose.model('CustomSession', customSessionSchema);

export { CustomSession, TimeSlot };
