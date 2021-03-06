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
var port = process.env.PORT || 3000;

// Requiring routes
var boardRoutes = require("./routes/boards");
var commentRoutes = require("./routes/comments");
var toolroomRoutes = require("./routes/toolroom");
var indexRoutes = require("./routes/index");
var toolstatusRoutes = require("./routes/toolstatus");
var budgetcontrolRoutes = require("./routes/budgetcontrol");
var todoRoutes = require("./routes/todo");
var colorgameRoutes = require("./routes/colorgame");
var supplierRoutes = require("./routes/supplier");
// var kakaotalkRoutes = require("./routes/kakao");
var piggameRoutes = require("./routes/piggame");

// Local Mongoose for Test
// mongoose.connect("mongodb://localhost/toolroom");

// MongoDB Atlas Server
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
app.engine('html', require('ejs').renderFile);
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
app.use("/toolroom", toolroomRoutes);
app.use("/toolroom/:id/comments", commentRoutes);
app.use(indexRoutes);
app.use(boardRoutes);
app.use(toolstatusRoutes);
app.use(budgetcontrolRoutes);
app.use(todoRoutes);
app.use(colorgameRoutes);
app.use(supplierRoutes);
// app.use(kakaotalkRoutes);
app.use(piggameRoutes);

app.listen(port, function () {
	console.log("Server Has Started!");
});