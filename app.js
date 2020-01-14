var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seeds");
var User = require("./models/user");

mongoose.connect("mongodb://localhost/toolroom");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
seedDB();

// Campground.create({
// 	name:"Test",
// 	image:"https://jjmcguire.com/wp-content/uploads/2017/03/MagnaInternationalMarkham-300x200.jpg",
// 	description:"This is an amazing place to work!"
// },function(err, data){
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log(data);
// 	}
// });

app.get("/", function(req,res){
	res.redirect("campgrounds");
});

app.get("/campgrounds", function(req,res){
	Campground.find({},function(err, data){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/campgrounds",{campgrounds:data});
		}
	});
	// res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req,res){
	// Get data from new.ejs form and add to array
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newCampgroud = {name: name, image: image, description:description};
	Campground.create(newCampgroud, function(err, data){
		if(err) {
			console.log(err);
		} else {
			// Redirect back to main page
			res.redirect("campgrounds");
		}
	});
});

app.get("/campgrounds/new", function(req,res){
	res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function(req,res){
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

app.get("/campgrounds/:id/comments/new", function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground:campground});
		}
	});
});

app.post("/campgrounds/:id/comments", function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err) {
			console.log(err);
			res.redirect("/campgrounds")
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else {
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

app.listen(3000, function(){
	console.log("server is listening");
});