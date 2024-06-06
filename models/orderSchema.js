const mongoose = require('mongoose');
const Food = require('./foodSchema');
const User = require('./userSchema');

const orderSchema= mongoose.Schema({
    food:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:Food
    }],
    payment:{
        
    },
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    status:{
        type:"String",
        enum:["Preparing","Prepared","On the way","Delivered"],
        default:"Preparing"
    }
},{timestamps:true});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;