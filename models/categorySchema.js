const mongoose =  require('mongoose');

const categorySchema = mongoose.Schema({
    title:{
        type:"String",
        require:true
    },
    imageUrl:{
        type:"String",
        default:"https://pics.freeicons.io/uploads/icons/png/14291991451579780443-512.png"
    },
},{timestamps:true});

const Category = mongoose.model('Category',categorySchema);
module.exports = Category ;