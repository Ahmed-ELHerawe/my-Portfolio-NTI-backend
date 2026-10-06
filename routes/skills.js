const express = require('express');
const Skill = require('../modeules/Skill');
const auth = require('../middleware/auth');
const { pick } = require('../utils/helpers');

const router = express.Router();

const fields = ['name', 'level', 'category', 'icon'];

router.get('/', async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({ category: 1, createdAt: 1 });
    res.json(skills);
  } catch (err) {
    next(err);
  }
});

// POST /api/skills  (أدمن)
router.post('/', auth, async (req, res, next) => {
  try {
    const skill = await Skill.create(pick(req.body, fields));
    res.status(201).json(skill);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', auth, async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, pick(req.body, fields), {
      returnDocument: 'after',
      runValidators: true,
    });
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.json(skill);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.json({ message: 'Skill deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;