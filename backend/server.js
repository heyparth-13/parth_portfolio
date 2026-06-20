require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const messageRoutes = require('./routes/messages');
const projectRoutes = require('./routes/projects');

app.use('/api/messages', messageRoutes);
app.use('/api/projects', projectRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Portfolio API is running' });
});

const PORT = process.env.PORT || 5000;

async function start() {
  const server = await app.listen(PORT);
  console.log(`Server running on port ${PORT}`);
  
  // Keep the process alive
  process.on('SIGINT', () => {
    server.close();
    process.exit(0);
  });
}

start().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
