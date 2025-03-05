const openaiService = require('./openai.service');

exports.processUserChoice = async (choice, currentState) => {
  
  const prompt = `User choice: ${choice}. Current state: ${JSON.stringify(
    currentState
  )}. Continue the adventure story.`;
  const newContent = await openaiService.generateAdventureContent(prompt);
  return newContent;
};
