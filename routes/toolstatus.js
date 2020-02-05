var express = require("express");
var router = express.Router({mergeParams: true});

router.get("/status", function(req,res){
	res.render("ToolReadiness", {page: 'status'});
});

module.exports = router;