const express = require("express");
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require("../../db/models");
const { Op } = require("sequelize");
const router = express.Router();

// get all spots
router.get("/", async (req,res) =>{
    // all spots in arr
    const spots = await Spot.findAll({raw: true})
    for(let spot of spots){ // iterate through all spots
         // gets the total stars and average
        const stars = await Review.sum('stars',{where:{spotId:spot.id}}); // get all stars tied to this spot
        const totalReviews = await Review.count({where:{spotId:spot.id}});
        spot.avgRating = stars/totalReviews; // set it!
        // check to see if previewimage is true if true put the url there
        const previewImage = await SpotImage.findOne({where:{spotId:spot.id}})
        if(previewImage) spot.previewImage = previewImage.url
        else spot.previewImage = 'invalid';
    }
    res.status(200).json(spots);
})




module.exports = router;
