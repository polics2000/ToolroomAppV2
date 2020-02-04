var express = require("express");
var router = express.Router({mergeParams: true});

router.get("/board", function(req,res){
	res.render("board", {page: 'board'});
});

module.exports = router;