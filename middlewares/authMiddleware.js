const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({error: "No token provided"});
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if(!user){
            return res.status(401).json({error: "User not found"});
        }

        req.user = user;
        next();
    }
    catch(err){
        return res.status(401).json({error: "Invalid of expired token"});
    }
};

module.exports = authMiddleware;