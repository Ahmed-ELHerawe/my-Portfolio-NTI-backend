const express = require('express');
const Project = require('../modeules/Project');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { removeFile, parseList, pick } = require('../utils/helpers');

const router = express.Router();

const fields = ['title', 'desc', 'category', 'liveURL', 'githubURL'];

// GET /api/projects?category=frontend  (للكل)
router.get('/', async (req, res, next) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

// GET /api/projects/:id  (للكل)
router.get('/:id', async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    next(err);
  }
});

// POST /api/projects  (أدمن) - FormData
router.post('/', auth, upload.single('img'), async (req, res, next) => {
  try {
    const data = pick(req.body, fields);
    data.techs = parseList(req.body.techs);
    if (req.file) data.imgURL = req.file.filename;

    const project = await Project.create(data);
    res.status(201).json(project);
  } catch (err) {
    if (req.file) removeFile(req.file.filename);
    next(err);
  }
});

router.put('/:id', auth, upload.single('img'), async (req, res, next) => {
  try {
    const old = await Project.findById(req.params.id);
    if (!old) {
      if (req.file) removeFile(req.file.filename);
      return res.status(404).json({ message: 'Project not found' });
    }

    const data = pick(req.body, fields);
    if (req.body.techs !== undefined) data.techs = parseList(req.body.techs);
    if (req.file) data.imgURL = req.file.filename;

    const project = await Project.findByIdAndUpdate(req.params.id, data, {
      returnDocument: 'after',
      runValidators: true,
    });
    if (req.file) removeFile(old.imgURL);
    res.json(project);
  } catch (err) {
    if (req.file) removeFile(req.file.filename);
    next(err);
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    removeFile(project.imgURL);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;