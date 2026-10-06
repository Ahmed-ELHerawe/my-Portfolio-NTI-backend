const multer = require('multer');
const path = require('path');

const allowed = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'application/pdf': '.pdf',
};

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads'),
  filename: (req, file, cb) => {
   
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1e6) + allowed[file.mimetype]);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (allowed[file.mimetype]) return cb(null, true);
    cb(new Error('Only jpg, png, webp images or pdf files are allowed'));
  },
});

module.exports = upload;