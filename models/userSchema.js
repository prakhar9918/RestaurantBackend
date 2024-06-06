const mongoose =  require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
const Food = require('./foodSchema');
const userSchema = mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    profile:{
        type:String,
        default:'https://pngtree.com/freepng/vector-valid-user-icon_3989973.html'
    },
    userType:{
        type:String,
        require:true,
        default:'clint',
        enum:['clint','admin','vendor','driver']
    },
    order:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:Food
    }],
    isVerified:{
        type:Number,
        default:0
    }
},{timestamps:true});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User',userSchema);
module.exports = User;