const Voter = require("../models/voterModel");
const { default: mongoose } = require("mongoose");

//createVoter
exports.createVoter = async (req, res) => {
    try{
        let {roll_number, name, class_division, gender} = req.body;

        if(!name || !roll_number || !class_division){
            return res.status(401).json({error:"Name, Roll number and Class Division are mandatory"});
        }

        class_division = class_division.toUpperCase();

        const existingVoter = await Voter.findOne({roll_number, class_division});
        if(existingVoter){
            return res.status(409).json({error:"This roll number is used"});
        }

        

        const newVoter = await Voter.create({
            roll_number,
            name,
            class_division,
            gender
        });

        return res.status(201).json(newVoter);
    }
    catch(err){
        return res.status(500).json({error: "Server Error." + err})
    }
}

//update voter
exports.updateVoter = async (req, res) => {
    try{
        const {id} = req.params;
        let {roll_number, name, class_division, gender} = req.body;

        if(!name || !roll_number || !class_division){
            return res.status(401).json({error:"Name, Roll number and Class Division are mandatory"});
        }

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({error: "Invalid Voter Id"});
        }
        if (!id){
            return res.status(400).json({error: "Id required in url"})
        }

        class_division = class_division.toUpperCase();

        const existingRollNumber = await Voter.findOne({roll_number, class_division, _id:{$ne:id}});
        if(existingRollNumber){
            return res.status(409).json({error:"This Roll number is used in given Class Division"});
        }
        
        const updatedVoter = await Voter.findOneAndUpdate(
            {_id:id},
            {
                roll_number,
                name,
                class_division,
                gender
            },
            {new: true}
        );

        if(!updatedVoter){
            return res.status(404).json({error: "Voter didn't find"});
        }
        return res.status(201).json(updatedVoter);
    }
    catch(err){
        return res.status(500).json("Server Error." + err);
    }
}

exports.getVoters = async (req, res) => {
    try{
        const voters = await Voter.find();

        return res.status(200).json(voters);
    }
    catch(err){
        return res.status(500).json({error: "Server error"});
    }
}

exports.getVoterFromId = async (req, res) => {
    try{
        const {id} = req.params;
    
        if(!id){
            return res.status(404).json({error: "No id provided"});
        }

        const voter = await Voter.findOne({_id: id});

        if(!voter){
            return res.status(404).json({error: "This voter didn't find"})
        }

        return res.status(200).json(voter);
    }
    catch(err){
        return res.status(500).json({error: "Server error." + err});
    }
}