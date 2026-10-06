const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
    subject: { type: String, required: true, trim: true, maxlength: 200 },
    body: { type: String, required: true, maxlength: 5000 },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);