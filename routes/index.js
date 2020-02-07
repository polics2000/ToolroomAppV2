var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// ROOT ROUTE
router.get("/", function(req,res){
	res.render("landing");
});

// SHOW REGISTER FORM
router.get("/register", function(req, res){
	res.render("register", {page: 'register'}); 
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
           res.redirect("/toolroom"); 
        });
    });
});

// SHOW LOGIN FORM
router.get("/login", function(req, res){
	res.render("login", {page: 'login'}); 
});

// HANDLE LOGIN LOGIC
router.post("/login", passport.authenticate("local",
	{
		successRedirect: "/toolroom",
		failureRedirect: "/login"
}), function(req, res){
	res.send("login !");
});

// LOGOUT ROUTE
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged you out!");
	res.redirect("/toolroom");
});

// MIDDLEWARE
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;