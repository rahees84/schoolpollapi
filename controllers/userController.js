const User = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

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


exports.userLogin = async (req, res) => {
    try{
        if(!req.body || typeof req.body !== 'object'){
            return res.status(400).json({error: 'Request body is missing or invalid'});
        }

        const { email, password} = req.body;

        //Validation
        if(!email || !password){
            return res.status(400).json({error: 'Email and Password are required'});
        }

        // Find the user
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({error: 'Invalid email or password.'})
        }

        // Match password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({error: 'Invalid email or password'});
        }

        //Generate JWT token
        const token = jwt.sign(
            {userId: user._id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: "24h"}
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch(err){
        res.status(500).json({error: "Server error: " + err.message});
    }
};


exports.changePassword = async (req, res) => {
    try{
        if(!req.body || typeof req.body !== 'object'){
            return res.status(400).json({error: "Request body is missing or invalid"})
        }

        const user = req.user;
        if(!user){
            return res.status(400).json({error: "No User given"});
        }

        const {oldPassword, newPassword} = req.body;

        if(!newPassword || newPassword.length <= 5){
            return res.status(400).json({error: "Password must be greater than 5 charectors"});
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch){
            return res.status(401).json({error: "Incorrect old password"})
        }

        const hashed = await bcrypt.hash(newPassword, 10);
        user.password = hashed;
        await user.save();

        return res.status(200).json({message: "Password changed successfully"});
    }
    catch(err){
        return res.status(500).json({error: "Server error" + err});
    }
}