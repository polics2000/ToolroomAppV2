var express = require("express");
var router = express.Router({mergeParams: true});
var Todo = require("../models/todo");

// Todo.create({
// 	text:"Hihihihi"
// }, function(err, data){
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log(data);
// 	}
// });

router.get("/todo", function(req, res){
	Todo.find({}, function(err, data){
		if(err){
			console.log(err);
		} else {
			res.render("todo", {data:data, page:'todo'});
		}
	})
});

// Add Todolist Route
router.post("/todo", function(req, res){
	Todo.create(req.body.todo, function(err, todo){
		if(err) {
			console.log(err);
		} else {
			res.redirect("todo");
		}
	});
});




module.exports = router;