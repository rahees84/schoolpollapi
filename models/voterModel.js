const mongoose = require("mongoose");

const voterModel = new mongoose.Schema({
    roll_number: {type: Number, required: true},
    name: {type: String, required: true},
    class_division: {type: String},
    gender: {type: String}
},
{timestamps:true}
)


module.exports = mongoose.model("Voter", voterModel);