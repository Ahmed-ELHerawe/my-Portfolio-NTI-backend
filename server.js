require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

if (!process.env.MONGO_URI) {
  console.error('Missing MONGO_URI in .env');
  process.exit(1);
}

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:4200' }));
app.use(express.json());

app.use('/files', express.static(path.join(__dirname, 'uploads')));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/experience', require('./routes/experience'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/stats', require('./routes/stats'));
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));
app.use(errorHandler);

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  });
}
module.exports = app;
