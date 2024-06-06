const User = require('./models/userSchema');
const express = require('express');
const dotenv =  require('dotenv');
const mongoose = require('mongoose');
const connectDb = require('./init/db');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const ejsMate = require('ejs-mate');
const path =  require('path');
const methodOverride = require("method-override");



const app = express();
app.use(session({
  secret: 'dbfsjdb',
  resave: false,
  saveUninitialized: true,
}));
//middlewares
dotenv.config();
connectDb();
app.use(express.json());
app.engine("ejs", ejsMate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"view"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize()); 
app.use(passport.session()); 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser());
app.use(methodOverride("_method"));
app.use(methodOverride('X-HTTP-Method-Override'));


//User-APIs
const userApi = require("./routes/register");
app.use(userApi);

//Restarunt-APIs
const restaurantApi = require("./routes/restaurant");
app.use(restaurantApi);

//category-APIs
const categoryApi = require("./routes/category");
app.use(categoryApi);

//food-APIs
const foodApi = require("./routes/food");
app.use(foodApi);

app.get('/', (req, res) => {
  res.send('Hello World 1');
});

const PORT=process.env.PORT;    

app.listen(PORT,(req,res)=>{
 console.log(`App is listening at port ${PORT}`);
});
