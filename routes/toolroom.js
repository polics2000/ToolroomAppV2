// module.exports = router;
var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// SHOW CAMPGROUND PAGE ROUTE
router.get("/", function(req, res){
	Campground.find({},function(err, data){
		if(err){
			console.log(err);
		} else {
			res.render("toolroom/toolroom",{campgrounds:data, page: 'campgrounds'});
		}
	});
	// res.render("campgrounds", {campgrounds:campgrounds});
});

// CREATE CAMPGROUND TO PAGE ROUTE
router.post("/", middleware.isLoggedIn, function(req,res){
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
			res.redirect("toolroom");
		}
	});
});

// SHOW FORM TO CREATE NEW CAMPGROUND
router.get("/new", middleware.isLoggedIn, function(req,res){
	res.render("toolroom/new");
});

// SHOW MORE INFO ABOUT ONE ITEM
router.get("/:id", function(req,res){
	// Find the campground with provided Id
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			console.log(foundCampground);
			res.render("toolroom/show", {campground: foundCampground});
		}
	});
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", function(req,res){
	Campground.findById(req.params.id, function(err, foundCampground){
		res.render("toolroom/edit", {campground: foundCampground});
	});
});

router.put("/:id", function(req, res){
	// find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/toolroom");
		} else {
			res.redirect("/toolroom/" + req.params.id);
		}
	});
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", function(req,res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/toolroom");
		} else {
			res.redirect("/toolroom");
		}
	});
});

module.exports = router;