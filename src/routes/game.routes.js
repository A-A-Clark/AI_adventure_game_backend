const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game.controller');
const authenticateToken = require('../middlewares/auth.middleware');

// Save and load game endpoints require authentication.
router.post('/save', authenticateToken, gameController.saveGame);
router.get('/load', authenticateToken, gameController.loadGame);
router.post('/generate', authenticateToken, gameController.generateContent);

module.exports = router;
