var express = require("express");
var router = express.Router({mergeParams: true});

router.get("/piggame", function(req, res){
	res.render("./piggame/pigGame.html", {page:"piggame"});	
});
module.exports = router;