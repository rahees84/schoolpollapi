const PendingVote = require("../models/pendingVoteModel");
const Vote = require("../models/voteModel");

exports.setPendingVoter = async (req, res) => {
  try {
    const { voter_id } = req.body;
    if (!voter_id) return res.status(400).json({ error: "voter_id required" });

    // Check if the voter has already voted
    const hasVoted = await Vote.findOne({ voter_id });
    if (hasVoted) {
      return res.status(400).json({ error: "This voter has already voted" });
    }

    // Only one active pending vote at a time (overwrite previous)
    await PendingVote.deleteMany({});
    await PendingVote.create({ voter_id });

    return res.json({ success: true, message: "Voting access granted." });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


exports.deletePendingVote = async (req, res) => {
  try {
    await PendingVote.deleteMany({});
    return res.json({ success: true, message: "Pending vote canceled." });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
