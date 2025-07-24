const Vote = require("../models/voteModel");
const Voter = require("../models/voterModel");
const Candidate = require("../models/candidateModel");
const PendingVote = require("../models/pendingVoteModel");

exports.createVote = async (req, res) => {
  try {
    const { voter_id, candidate_id } = req.body;

    if (!voter_id || !candidate_id) {
      return res.status(400).json({ error: "Voter id and Candidate id are mandatory" });
    }

    const voter = await Voter.findById(voter_id);
    if (!voter) {
      return res.status(404).json({ error: "Voter not found" });
    }

    const pending = await PendingVote.findOne({ voter_id });
    if (!pending) {
      return res.status(403).json({ error: "Voter has not been granted permission to vote" });
    }

    const candidate = await Candidate.findById(candidate_id);
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    const existingVote = await Vote.findOne({ voter_id });
    if (existingVote) {
      return res.status(400).json({ error: "This voter has already voted" });
    }

    const newVote = new Vote({
      voter_id,
      candidate_id
    });

    await newVote.save();

    // Delete the pending vote permission
    await PendingVote.deleteOne({ voter_id });

    return res.status(201).json({ message: "Vote cast successfully." });
  } catch (err) {
    return res.status(500).json({ error: "Server error. " + err.message });
  }
};

exports.getVoteCount = async (req, res) => {
  try {
    const results = await Vote.aggregate([
      {
        $group: {
          _id: "$candidate_id",
          vote_count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "candidates",
          localField: "_id",
          foreignField: "_id",
          as: "candidate"
        }
      },
      {
        $unwind: "$candidate"
      },
      {
        $project: {
          _id: 0,
          candidate_id: "$candidate._id",
          name: "$candidate.name",
          class_division: "$candidate.class_division",
          symbol_name: "$candidate.symbol_name",
          vote_count: 1
        }
      },
      {
        $sort: { vote_count: -1 }
      }
    ]);

    return res.status(200).json(results);

  } catch (err) {
    return res.status(500).json({ error: "Server error: " + err.message });
  }
};

exports.clearAllVotes = async (req, res) => {
  try {
    await Vote.deleteMany({});

   

    return res.status(200).json({ message: "All votes cleared successfully." });
  } catch (err) {
    return res.status(500).json({ error: "Failed to clear votes: " + err.message });
  }
};
