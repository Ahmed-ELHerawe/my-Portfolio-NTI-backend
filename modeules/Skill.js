const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    level: { type: Number, required: true, min: 0, max: 100 },
    // الأقسام التلاتة ثابتة زي التصميم
    category: { type: String, enum: ['frontend', 'backend', 'tools'], required: true },
    icon: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', skillSchema);