const reqBodyMiddleware = async (req, res, next) => {
    if(!req.body || typeof req.body !== 'object'){
        return res.status(401).json({error: "Request body is missing or invalid"});
    }
    else{
        next();
    }
}

module.exports = reqBodyMiddleware;