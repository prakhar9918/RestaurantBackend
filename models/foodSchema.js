const mongoose =  require('mongoose');

const foodSchema = mongoose.Schema({
    title:{
        type:"String",
        required:[true,"Food title is required"]
    },
    description:{
        type:"String",
        required:[true,"DEscription title is required"]
    },
    imageUrl:{
        type:"String",
        default:"https://pngtree.com/freepng/vector-valid-user-icon_3989973.html"
    },
    price:{
        type:"number",
        required:[true,"Price is required"]
    },
    foodtag:{
        type:"String"
    },
    code:{
       type:"String"
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    isAvailable:{
        type:"boolean",
        default:"true"
    },
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restaurant"
    },
    rating:{
        type:"number",
        default:5,
        min:1,
        max:5
    },
    ratingCount:{
        type:"String"
    },   
},{timestamps:true});


const Food = mongoose.model('Food',foodSchema);
module.exports = Food ;