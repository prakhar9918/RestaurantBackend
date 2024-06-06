const mongoose =  require('mongoose');

const restaurantSchema = mongoose.Schema({
    title:{
        type:"String",
    },
    imageUrl:{
        type:"String"
    },
    food:{
        type: "Array"
    },
    time:{
        type:"String"
    },
    pickup:{
        type:"boolean",
        default:"true"
    },
    delivery:{
        type:"boolean",
        default:"true"
    },
    isopen:{
        type:"boolean",
        default:"true"
    },
    logoUrl:{
        type:"String"
    },
    rating:{
        type:"number",
        default:1,
        min:1,
        max:5
    },
    ratingCount:{
        type:"String"
    },
    code:{
        type:"String"
    },
    coords:{
        id:{type:"String"},
        lattitude:{type:"number"},
        lattitudeDelta:{type:"number"},
        longitude:{type:"number"},
        longitudeDelta:{type:"number"},
        address:{type:"String"},
        title:{type:"String"}
    }
},{timestamps:true});


const  Restaurant = mongoose.model('Restaurant',restaurantSchema);
module.exports = Restaurant ;