const express = require('express');
const Message = require('../modeules/Message');
const auth = require('../middleware/auth');

const router = express.Router();

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

router.post('/', async (req, res, next) => {
  try {
    const { name, email, subject, body } = req.body;

    if (!name || !email || !subject || !body) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (!emailRegex.test(String(email).trim())) {
      return res.status(400).json({ message: 'Wrong email format' });
    }

    await Message.create({ name, email, subject, body });
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    next(err);
  }
});

router.get('/', auth, async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    next(err);
  }
});

router.patch('/:id/read', auth, async (req, res, next) => {
  try {
    const isRead = req.body.isRead === undefined ? true : Boolean(req.body.isRead);
    const message = await Message.findByIdAndUpdate(req.params.id, { isRead }, { returnDocument: 'after' });
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.json(message);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Message deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;