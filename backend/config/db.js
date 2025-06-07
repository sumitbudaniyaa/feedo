const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();


const connectDB = async() =>{
    
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('DB connected')
    }
    catch(err){
        console.log(err)
    }
};

module.exports = connectDB;