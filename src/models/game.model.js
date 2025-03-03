const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    state: { type: Object, default: {} } // Store the game state as a JSON object.
  },
  { timestamps: true }
);

module.exports = mongoose.model('Game', GameSchema);
