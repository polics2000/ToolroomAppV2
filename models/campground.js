var mongoose   = require("mongoose");
// SCHEMA SETUP
var campSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
     comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});
module.exports = mongoose.model("Campground", campSchema);