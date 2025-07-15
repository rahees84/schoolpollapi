const User = require("../models/usersModel");
const bcrypt = require("bcrypt");

// Create User
exports.createUser = async (req, res) => {
    try{
        if(!req.body || typeof req.body !== 'object'){
            return res.status(400).json({error: 'Request body is missing or invalid'});
        }

        const {name, email, password} = req.body;

        // Validation
        if(!email || !name || !password){
            return res.status(400).json({error: "Name, Email and Password are required"});
        }

        // Find if user already existing
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(409).json({error: "Email already in use."});
        }

        //Hashing password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            email_verified: 0
        })

        //Hiding password before giving response.
        const {password: _, ...userData} = user.toObject();

        return res.status(201).json(userData);
    }
    catch (err){
        return res.status(500).json({ error: 'Server error.' + err.message});
    }
};