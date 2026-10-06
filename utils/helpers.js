const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, '..', 'uploads');

const removeFile = (fileName) => {
  if (!fileName) return;
  fs.unlink(path.join(uploadsDir, path.basename(fileName)), () => {});
};

const parseList = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value !== 'string' || !value.trim()) return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.map((v) => String(v).trim()).filter(Boolean);
  } catch (err) {}
  return value.split(',').map((v) => v.trim()).filter(Boolean);
};

const pick = (obj, fields) => {
  const result = {};
  fields.forEach((f) => {
    if (obj[f] !== undefined) result[f] = obj[f];
  });
  return result;
};

module.exports = { removeFile, parseList, pick };