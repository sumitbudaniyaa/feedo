const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if(!token) {
        return res.status(401).json({message: "Please Login"});
    }

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.restaurant = decoded;
        next();
    }
    catch(err){
        res.status(401).json({message: "Please Login"});
    }
};

module.exports = { verifyToken };