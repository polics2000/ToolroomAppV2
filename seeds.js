var mongoose = require("mongoose");
var Comment   = require("./models/comment");
var Campground = require("./models/campground");
 
var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "description"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "description"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "description"
    }
]
 
function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");  ////////////////// REMOVED all models
             //add a few campgrounds
            // data.forEach(function(seed){
            //     Campground.create(seed, function(err, campground){ // name, image, desc included campground creation 
            //         if(err){
            //             console.log(err);
            //         } else {
            //             console.log("added a campground : " + campground.name);
            //             //create a comment
            //             Comment.create(
            //                 {
            //                     text: "This place is great, but I wish there was internet",
            //                     author: "Homer"
            //                 }, function(err, comment){
            //                     if(err){
            //                         console.log(err);
            //                     } else { // if creation successful
            //                         campground.comments.push(comment);
            //                         campground.save();
            //                         console.log("Created new comment: " + comment);
            //                     }
            //                 });
            //         }
            //     });
            // });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;