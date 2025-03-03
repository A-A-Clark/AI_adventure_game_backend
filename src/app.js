const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');

const authRoutes = require('./routes/auth.routes');
const gameRoutes = require('./routes/game.routes');

const app = express();

// CORS configuration - replace with your frontend's URL
// const corsOptions = {
//   origin: 'http://192.168.0.20:3000', // Example: change to your actual frontend URL
//   optionsSuccessStatus: 200, // For legacy browser support
// };

// Middleware
// app.use(cors(corsOptions));
app.use(cors());
app.options('*', cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Choose Your Own Adventure Game Backend');
});

// Connect to MongoDB and start the server.
mongoose
  .connect(config.dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
