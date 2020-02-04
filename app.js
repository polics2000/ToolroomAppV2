var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
// var Board = require("./models/board");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds");
var port = process.env.PORT || 3000;app.listen(port, function () {  console.log("Server Has Started!");});

// Requiring routes
var boardRoutes = require("./routes/boards");
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

// mongoose.connect("mongodb://localhost/toolroom");
mongoose.connect('mongodb+srv://toolroom:toolroom@toolroom-gbofc.mongodb.net/test?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log("Connected to DB!");
}).catch(err => {
	console.log("Error", err.message);
});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require('moment');
// seedDB(); Seeds initial DB

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret : "Secret comment!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

// REQUIRING ROUTES
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use(boardRoutes);
app.engine('html', require('ejs').renderFile);


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

app.get("/about", function(req,res){
	res.send("about page will be updated shortly");
});

app.get("/status", function(req,res){
	res.render("ToolReadiness");
});

// app.listen(3000, function(){
// 	console.log("server is listening");
// });