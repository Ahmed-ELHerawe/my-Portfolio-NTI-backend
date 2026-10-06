const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    desc: { type: String, required: true },
    techs: { type: [String], default: [] },
    category: { type: String, enum: ['fullstack', 'frontend', 'ui'], required: true },
    imgURL: { type: String, default: '' },
    liveURL: { type: String, default: '', trim: true },
    githubURL: { type: String, default: '', trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);