const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log("User Logged in you can login");
        return next();
    } else {
        res.redirect('/loginuser');
    }
};

// const saveRedirectUrl = (req,res,next) =>{
//     if( req.session.redirectUrl){
//     res.locals.redirectUrl = req.session.redirectUrl;
//     }
//     next();
//   }

module.exports = {isLoggedIn};