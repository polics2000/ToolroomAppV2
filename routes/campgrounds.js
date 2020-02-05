var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'magna', 
  api_key: 598488238546369, 
  api_secret: 'YukTFd2KG9qNb7hExfe-zimbLvU'
});

// SHOW CAMPGROUND PAGE ROUTE
router.get("/", function(req, res){
	Campground.find({},function(err, data){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/campgrounds",{campgrounds:data, page: 'campgrounds'});
		}
	});
});

// CREATE CAMPGROUND TO PAGE ROUTE
router.post("/", middleware.isLoggedIn, upload.single('image'), function(req,res){
	cloudinary.uploader.upload(req.file.path, function(result) {
	  // add cloudinary url for the image to the campground object under image property
	  req.body.campground.image = result.secure_url;
	  // add author to campground
	  req.body.campground.author = {
		id: req.user._id,
		username: req.user.username
	  }
	  Campground.create(req.body.campground, function(err, campground) {
		if (err) {
		  req.flash('error', err.message);
		  return res.redirect('back');
		}
		res.redirect('/campgrounds/' + campground.id);
	  });
	});
});

// SHOW FORM TO CREATE NEW CAMPGROUND
router.get("/new", middleware.isLoggedIn, function(req,res){
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

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", function(req,res){
	Campground.findById(req.params.id, function(err, foundCampground){
		res.render("campgrounds/edit", {campground: foundCampground});
	});
});

router.put("/:id", function(req, res){
	// find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", function(req,res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds");
		}
	});
});

module.exports = router;