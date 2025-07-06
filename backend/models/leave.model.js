// models/leaveApplication.model.js
import mongoose from 'mongoose';

const leavesSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  leaveType: {
    type: String,
    enum: ["sick", "casual", "paid" , "unpaid"],
    required: true,
  },
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  collection : "Leaves",
  timestamps : true
});


export const Leaves =  mongoose.model('Leaves', leavesSchema);
