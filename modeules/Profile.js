const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, default: '', trim: true },
    title: { type: String, default: '', trim: true },
    badgeText: { type: String, default: '', trim: true },
    heroText: { type: String, default: '', trim: true },
    typingTexts: { type: [String], default: [] },
    about: { type: String, default: '' },
    projectsCompleted: { type: Number, default: 0, min: 0 },
    yearsExperience: { type: Number, default: 0, min: 0 },
    clientSatisfaction: { type: Number, default: 0, min: 0, max: 100 },
    imgURL: { type: String, default: '' },
    cvURL: { type: String, default: '' },
    email: { type: String, default: '', trim: true },
    phone: { type: String, default: '', trim: true },
    location: { type: String, default: '', trim: true },
    github: { type: String, default: '', trim: true },
    linkedIn: { type: String, default: '', trim: true },
    twitter: { type: String, default: '', trim: true },
    codepen: { type: String, default: '', trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);