const express = require('express');
const passport = require('passport');
const router = express.Router();
const { register_controller, logout_controller, update_controller, verify, addtocart} = require('../controllers/authcontroller');
const {isLoggedIn} = require('../middleware/isAuthenticated');

router.get('/verify', verify);

router.post("/users/:userId/addFood/:foodId",addtocart);

router.get('/registeruser', (req, res) => {
  res.render("../views/user/Signup.ejs");
});
router.get('/loginuser', (req,res)=>{
  res.render("../views/user/login.ejs");
});

router.post('/register', register_controller);

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/');
  console.log("Login successfull");
});

router.get("/logout", isLoggedIn ,logout_controller);

router.put("/user/:id", update_controller);

module.exports = router;
