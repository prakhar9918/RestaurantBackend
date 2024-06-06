const mongoose = require('mongoose');
const connectDb = async() =>{
    try{
     await mongoose.connect(process.env.MONGO_URL);
     console.log("Connectes to Database successfully");
    }catch(error){
        console.log("Can't connect to Databast",error);
    }
}

module.exports = connectDb;
