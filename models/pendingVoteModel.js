const mongoose = require("mongoose");

const pendingVoteSchema = new mongoose.Schema({
  voter_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Voter" },
  granted_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("PendingVote", pendingVoteSchema);
