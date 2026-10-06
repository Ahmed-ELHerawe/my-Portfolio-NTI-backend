const express = require('express');
const Experience = require('../modeules/Experience');
const auth = require('../middleware/auth');
const { pick } = require('../utils/helpers');

const router = express.Router();

const fields = ['role', 'company', 'startDate', 'endDate', 'desc'];

// GET /api/experience  (للكل) - الأحدث الأول
router.get('/', async (req, res, next) => {
  try {
    const items = await Experience.find().sort({ startDate: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
});

router.post('/', auth, async (req, res, next) => {
  try {
    const item = await Experience.create(pick(req.body, fields));
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', auth, async (req, res, next) => {
  try {
    const item = await Experience.findByIdAndUpdate(req.params.id, pick(req.body, fields), {
      returnDocument: 'after',
      runValidators: true,
    });
    if (!item) return res.status(404).json({ message: 'Experience not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const item = await Experience.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Experience not found' });
    res.json({ message: 'Experience deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;