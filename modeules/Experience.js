const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    startDate: { type: String, required: true, trim: true },
    endDate: { type: String, default: 'Present', trim: true }, 
    desc: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Experience', experienceSchema);