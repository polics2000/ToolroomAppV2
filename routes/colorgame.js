var express = require("express");
var router = express.Router({mergeParams: true});

router.get("/colorgame", function(req, res){
	res.render("./colorgame/colorGame.html", {page:"colorgame"});
});

module.exports = router;