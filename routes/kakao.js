var express = require("express");
var router = express.Router({mergeParams: true});

router.get("/index", function(req, res){
	res.render("./kakao_clone/index.html");
});

// router.get("/kakao_clone/chat", function(req, res){
// 	res.render("./kakao_clone/chat.html");
// });

// router.get("/kakao_clone/find", function(req, res){
// 	res.render("./kakao_clone/find.html");
// });

// router.get("/kakao_clone/friends", function(req, res){
// 	res.render("./kakao_clone/friends.html");
// });

// router.get("/kakao_clone/more", function(req, res){
// 	res.render("./kakao_clone/more.html");
// });

// router.get("/kakao_clone/settings", function(req, res){
// 	res.render("./kakao_clone/settings.html");
// });

// router.get("/test", function(req,res){
// 	res.send("test");
// });

module.exports = router;