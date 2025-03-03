const axios = require('axios');
const { openaiApiKey } = require('../config');

// Helper function to truncate text to 600 characters without cutting off mid-sentence.
const truncateChar = (text) => {
  if (text.length <= 600) return text;
  const truncated = text.slice(0, 600);
  // Find the last sentence-ending punctuation (., !, ?)
  const lastPeriod = truncated.lastIndexOf('.');
  const lastExclamation = truncated.lastIndexOf('!');
  const lastQuestion = truncated.lastIndexOf('?');
  const lastPunctuation = Math.max(lastPeriod, lastExclamation, lastQuestion);
  
  // If punctuation is found, return up to that point; otherwise, return the truncated text.
  if (lastPunctuation > 0) {
    return truncated.slice(0, lastPunctuation + 1);
  }
  return truncated;
};

exports.generateAdventureContent = async (prompt) => {
  try {
    // Define the payload object to be sent to the API
    const payload = {
      model: 'gpt-4o-mini',
      messages: [
        { role: "system", content: "You are a creative and engaging adventure game generator." },
        { role: "user", content: prompt }
      ],
      max_tokens: 150,
      temperature: 0.7
    };

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiApiKey}`
        }
      }
    );
    // Return the truncated generated content from the response
    const generatedText =  response.data.choices[0].message.content.trim();
    return truncateChar(generatedText);
  } catch (error) {
    console.error(
      'OpenAI API error:',
      error.response ? error.response.data : error.message
    );
    throw new Error('Failed to generate adventure content');
  }
};
