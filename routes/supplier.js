var express = require("express");
var router = express.Router({mergeParams: true});

router.get("/supplier", function(req, res){
	res.render("./suppliers", {page:"supplier"});
});

module.exports = router;