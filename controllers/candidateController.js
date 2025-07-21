const { default: mongoose } = require("mongoose");
const Candidate = require("../models/candidateModel");

//CreteCadidate
exports.createCandidate = async (req, res) => {
    try{
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

exports.getOneCandidateFromCode = async (req, res) => {
    try{
        const {code} = req.params;

        if (!code){
            return res.status(401).json({error: "No code given"});
        }

        const candidate = await Candidate.findOne({code});

        if(!candidate){
            return res.status(404).json({error: "Candidate not found"});
        }
        return res.status(200).json(candidate);
    }
    catch(err){
        res.status(500).json({error: "Server error. " + err});
    }
};

exports.getOneCandidateFromId = async (req, res) => {
    try{
        const {id} = req.params;

        if (!id){
            return res.status(401).json({error: "No id given"});
        }

        const candidate = await Candidate.findOne({_id: id});

        if(!candidate){
            return res.status(404).json({error: "Candidate not found"});
        }
        return res.status(200).json(candidate);
    }
    catch(err){
        res.status(500).json({error: "Server error. " + err});
    }
};

exports.getCandidates = async (req, res) => {
    try{
        const candidates = await Candidate.find();

        return res.status(200).json(candidates);
    }
    catch(err){
        return res.status(500).json({error: "Server error."})
    }
};

exports.updateCandidate = async (req, res) => {
    try{
        const { id } = req.params;
        const {code, name, class_division, position, symbol_name, symbol_pic} = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({error: "Invalid Candidate Id"})
        }
        if (!id){
            return res.status(400).json({error: "Id required in url"})
        }

        if(code){
            const existingCode = await Candidate.findOne({code, _id:{$ne:id}});
            if(existingCode){
                return res.status(409).json({error: "Candidate code already in use"});
            }
        }

        const updatedCandidate = await Candidate.findOneAndUpdate(
            { _id: id },
            {
                code,
                name,
                class_division,
                position,
                symbol_name,
                symbol_pic
            },
            { new: true}
        );

        if(!updatedCandidate){
            return res.status(404).json({error: "Candidate not found"});
        }

        return res.status(200).json(updatedCandidate);
    }
    catch (err){
        if(err.code === 11000){
            return res.status(409).json({error: "Duplicate Code not allowed."})
        }
        return res.status(500).json({error: "Server error."})
    }
};