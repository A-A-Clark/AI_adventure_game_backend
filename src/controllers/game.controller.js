const Game = require('../models/game.model');
const openaiService = require('../services/openai.service');
// const gameService = require('../services/game.service'); // (unused in this version)

// Save game and load game functions remain the same.
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
  const userId = req.user.id;
  const { prompt } = req.body;
  
  try {
    // Load existing game state or create a new one with an empty narrative
    let game = await Game.findOne({ user: userId });
    if (!game) {
      game = new Game({ user: userId, state: { narrative: "" } });
    }
    
    // Build a dynamic prompt by including the existing game state and new user input
    const dynamicPrompt = `Current Game State: ${game.state.narrative}
User Input: ${prompt}
Continue the adventure story coherently and creatively.`;
    
    // Generate new content using the OpenAI service
    const content = await openaiService.generateAdventureContent(dynamicPrompt);
    
    // Update the persistent game state by appending the new content to the narrative
    game.state.narrative += "\n" + content;
    await game.save();
    
    // Return the generated content along with the updated state
    res.json({ content, state: game.state });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error generating content' });
  }
};
