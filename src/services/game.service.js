const openaiService = require('./openai.service');

// This service can include additional game-specific business logic.
exports.processUserChoice = async (choice, currentState) => {
  // Example: Build a prompt using the user's choice and current game state.
  const prompt = `User choice: ${choice}. Current state: ${JSON.stringify(
    currentState
  )}. Continue the adventure story.`;
  const newContent = await openaiService.generateAdventureContent(prompt);
  return newContent;
};
