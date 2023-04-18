const express = require("express");
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require("../../db/models");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");

const router = express.Router();

const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),

  check("city")
  .exists({ checkFalsy: true })
  .withMessage("City is required"),

  check("state")
  .exists({ checkFalsy: true })
  .withMessage("State is required"),

  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),

  check("lat")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude is not valid"),

  check("lng")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude is not valid"),

  check("name")
  .exists({ checkFalsy: true })
  .withMessage("Name is required"),

  check("name")
    .isLength({ max: 49 })
    .withMessage("Name must be less than 50 characters"),

  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),

  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),

  handleValidationErrors
];



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

//creating a new spot

router.post('/',[validateSpot,requireAuth],async(req,res) =>{
const {user} = req
if(user){
const {address,city,state,country,lat,lng,name,description,price} = req.body
const newSpot = await Spot.create({address,city,state,country,lat,lng,name,description,price})
res.status(201).json(newSpot);
}

})




module.exports = router;
