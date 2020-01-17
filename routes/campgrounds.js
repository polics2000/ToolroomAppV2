var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// SHOW CAMPGROUND PAGE ROUTE
router.get("/", function(req, res){
	Campground.find({},function(err, data){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/campgrounds",{campgrounds:data});
		}
	});
	// res.render("campgrounds", {campgrounds:campgrounds});
});

// CREATE CAMPGROUND TO PAGE ROUTE
router.post("/", isLoggedIn, function(req,res){
	// Get data from new.ejs form and add to array
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampgroud = {name: name, image: image, description:description, author:author};
	Campground.create(newCampgroud, function(err, data){
		if(err) {
			console.log(err);
		} else {
			// Redirect back to main page
			res.redirect("campgrounds");
		}
	});
});

// SHOW FORM TO CREATE NEW CAMPGROUND
router.get("/new", isLoggedIn,function(req,res){
	res.render("campgrounds/new");
});

// SHOW MORE INFO ABOUT ONE ITEM
router.get("/:id", function(req,res){
	// Find the campground with provided Id
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			console.log(foundCampground);
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

// MIDDLEWARE
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;