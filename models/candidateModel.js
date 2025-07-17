const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
    code: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    class_division: {type: String},
    position: {type: String},
    symbol_name: {type: String},
    symbol_pic: {type: String}
},
{timestamps:true}
)

module.exports = mongoose.model('Candidate', candidateSchema);