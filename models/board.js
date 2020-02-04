var mongoose = require("mongoose");

// Schema Setup
var boardSchema = new mongoose.Schema({
	order: Number,
	title: String,
	createdAt: { type: Date, default: Date.now },
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

module.exports = mongoose.model("Board", boardSchema);