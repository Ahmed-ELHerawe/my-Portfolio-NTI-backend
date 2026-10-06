const multer = require('multer');

module.exports = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(', ') });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid id' });
  }
  if (err.message && err.message.startsWith('Only jpg')) {
    return res.status(400).json({ message: err.message });
  }

  console.error(err);
  res.status(500).json({ message: 'Server error' });
};