const express = require('express');
const Project = require('../modeules/Project');
const Skill = require('../modeules/Skill');
const Experience = require('../modeules/Experience');
const Message = require('../modeules/Message');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res, next) => {
  try {
    const [projects, skills, experience, messages, unreadMessages] = await Promise.all([
      Project.countDocuments(),
      Skill.countDocuments(),
      Experience.countDocuments(),
      Message.countDocuments(),
      Message.countDocuments({ isRead: false }),
    ]);
    res.json({ projects, skills, experience, messages, unreadMessages });
  } catch (err) {
    next(err);
  }
});

module.exports = router;