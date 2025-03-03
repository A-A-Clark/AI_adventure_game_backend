const Game = require('../models/game.model');
const openaiService = require('../services/openai.service');
const gameService = require('../services/game.service');

exports.saveGame = async (req, res) => {
  const userId = req.user.id;
  const { state } = req.body;

  try {
    let game = await Game.findOne({ user: userId });
    if (game) {
      game.state = state;
    } else {
      game = new Game({ user: userId, state });
    }
    await game.save();
    res.json({ message: 'Game saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving game' });
  }
};

exports.loadGame = async (req, res) => {
  const userId = req.user.id;
  try {
    const game = await Game.findOne({ user: userId });
    if (!game) {
      return res.status(404).json({ message: 'No saved game found' });
    }
    res.json({ state: game.state });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error loading game' });
  }
};

exports.generateContent = async (req, res) => {
  const { prompt } = req.body;
  try {
    // Optionally, you can integrate more complex game logic here.
    const content = await openaiService.generateAdventureContent(prompt);
    res.json({ content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error generating content' });
  }
};
