const express = require('express');
const Profile = require('../modeules/Profile');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { removeFile, parseList, pick } = require('../utils/helpers');

const router = express.Router();

const fields = [
  'name', 'title', 'badgeText', 'heroText', 'about',
  'projectsCompleted', 'yearsExperience', 'clientSatisfaction',
  'email', 'phone', 'location', 'github', 'linkedIn', 'twitter', 'codepen',
];

router.get('/', async (req, res, next) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile || {});
  } catch (err) {
    next(err);
  }
});

router.put(
  '/',
  auth,
  upload.fields([{ name: 'img', maxCount: 1 }, { name: 'cv', maxCount: 1 }]),
  async (req, res, next) => {
    try {
      const data = pick(req.body, fields);
      if (req.body.typingTexts !== undefined) data.typingTexts = parseList(req.body.typingTexts);

      const old = await Profile.findOne();

      if (req.files && req.files.img) {
        data.imgURL = req.files.img[0].filename;
        if (old) removeFile(old.imgURL);
      }
      if (req.files && req.files.cv) {
        data.cvURL = req.files.cv[0].filename;
        if (old) removeFile(old.cvURL);
      }

      const profile = await Profile.findOneAndUpdate({}, data, {
        upsert: true,
        returnDocument: 'after',
        runValidators: true,
        setDefaultsOnInsert: true,
      });
      res.json(profile);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;