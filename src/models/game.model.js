const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    state: { type: Object, default: { narrative: "" } }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Game', GameSchema);
