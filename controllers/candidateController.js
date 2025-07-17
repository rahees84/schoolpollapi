const Candidate = require("../models/candidateModel");

//CreteCadidate
exports.createCandidate = async (req, res) => {
    try{
        if(!req.body || typeof req.body !== 'object'){
            return res.status(401).json({error: "Request body is missing or invalid"});
        }

        const {code, name, class_division, position, symbol_name, symbol_pic} = req.body;

        //Validation
        if(!code || !name){
            return res.status(401).json({error: "Code and Name are mandatory"});
        }

        //Check if code used
        const existingCode = await Candidate.findOne({code});
        if(existingCode){
            return res.status(409).json({error: "Candidate code already in use"});
        }

        //Creating candidate
        const candidate = await Candidate.create({
            code,
            name,
            class_division,
            position,
            symbol_name,
            symbol_pic
        });

        return res.status(201).json(candidate);
    }
    catch(err){
        return res.status(500).json({error: "Server error"});
    }
};