var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/test");


var data =
	{
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "111"
    }
 
var commentSchema = new mongoose.Schema({
    text: String,
    author: String
});
var Comment = mongoose.model("Comment", commentSchema);

var campgroundSchema = new mongoose.Schema({
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
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.remove({}, function(err){
//         if(err){
//             console.log(err);
//         }
//         console.log("removed campgrounds!");
//         Comment.remove({}, function(err) {
//             if(err){
//                 console.log(err);
//             }
//             console.log("removed comments!");  ////////////////// REMOVED all models
//              //add a few campgrounds
//             data.forEach(function(seed){
//                 Campground.create(seed, function(err, campground){ // name, image, desc included campground creation 
//                     if(err){
//                         console.log(err)
//                     } else {
//                         console.log("added a campground");
//                         //create a comment
//                         Comment.create(
//                             {
//                                 text: "This place is great, but I wish there was internet",
//                                 author: "Homer"
//                             }, function(err, comment){
//                                 if(err){
//                                     console.log(err);
//                                 } else { // if creation successful
//                                     campground.comments.push(comment);
//                                     campground.save();
//                                     console.log("Created new comment");
//                                 }
//                             });
//                     }
//                 });
//             });
//         });
//     }); 

Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
});

Comment.remove({}, function(err) {
	if(err){
		console.log(err);
	}
	console.log("removed comments!");
});

//add a few campgrounds
Campground.create(data, function(err, campground){ // name, image, desc included campground creation 
	if(err){
		console.log(err)
	} else {
		console.log("added a campground");
		//create a comment
		Comment.create(
			{
				text: "This place is great, but I wish there was internet",
				author: "Homer"
			}, function(err, comment){
				Campground.findOne({name: "Cloud's Rest"},function(err, foundCampground){
					if(err){
						console.log(err);
					} else { // if creation successful
						foundCampground.comments.push(comment);
						foundCampground.save();
						console.log("Created new comment");
					}
				});
			});
	}
});

Campground.findOne({name:"Cloud's Rest"}).populate("comments").exec(function(err,user){
	console.log(user);
});