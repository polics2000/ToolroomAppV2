var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/toolroom");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

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
			res.render("campgrounds",{campgrounds:data});
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
	res.render("new");
});

app.get("/campgrounds/:id", function(req,res){
	// Find the campground with provided Id
	Campground.findById(req.params.id, function(err, data){
		if(err) {
			console.log(err);
		} else {
			res.render("show", {campground:data});
		}
	});
});

app.listen(3000, function(){
	console.log("server is listening");
});