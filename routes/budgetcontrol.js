var express = require("express");
var router = express.Router({mergeParams: true});

router.get("/budgetControl", function(req, res){
	res.render("./budgetcontroller", {page: 'budget'});	
});

module.exports = router;