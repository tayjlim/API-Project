const express = require("express");
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require("../../db/models");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth, restoreUser } = require("../../utils/auth");
const { check } = require("express-validator");
const router = express.Router();

const validateReview =[
  check('review')
  .exists({checkFalsy:true})
  .withMessage("Review text is required"),
  check('stars')
    .exists({checkFalsy:true})
    .isFloat({min:1,max:5})
    .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
  ];

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

router.get('/current',[requireAuth], async(req,res)=>{
  const {user} = req;
  const spots = await Spot.findAll({raw:true,where:{ownerId:user.id}})
  for(let spot of spots){
    //find average
    const reviewCount = await Review.count({where:{spotId:spot.id}});
    const score = await Review.sum('stars',{where:{spotId:spot.id}});
    spot.avgRating = score/reviewCount; // set average
    //find a previewImage
    const previewImage = await SpotImage.findOne({where:{spotId:spot.id}})
    if(previewImage) spot.previewImage = `${previewImage.url}`
    else spot.previewImage = 'NO IMAGE URL';
  }
  return res.status(200).json({Spots:spots})
})

// get details of a spot by ID
router.get('/:spotId', async(req,res)=>{
  const spot = await Spot.findOne({raw:true,where:{id:req.params.spotId}})
  if(!spot)return res.status(404).json({message:"Spot couldn't be found"});
  spot.numReviews = await Review.count({where:{spotId:spot.id}});
  spot.avgStarRating = await Review.sum('stars',{where:{spotId:spot.id}})/spot.numReviews
  spot.SpotImages = await SpotImage;
  spot.Owner = await User.findOne({where:{id:spot.ownerId},
    attributes:['id','firstName','lastName']
  })
 return res.json({spot})
})


//////work on this next this is getting reviews by spot ID
// router.get('/:spotId/reviews',async (req,res)=>{
//   const spot = await Spot.findOne({raw:true,where:{id:req.params.spotId}})
//   if(!spot)return res.status(404).json({message:"Spot couldn't be found"});

//   const reviews = await Review.findAll({where: {spotId: req.params.spotId}});

//   let allReviews = [];
//   reviews.forEach(review => {
//     allReviews.push()
//   });
//   res.status(200).json({['Reviews']: reviews});
// });

router.post('/:spotId/reviews',[requireAuth,validateReview], async(req,res)=>{
  const spot = await Spot.findOne({raw:true,where:{id:req.params.spotId}});

  const {user} = req
  //does spot exist?
  if(!spot)return res.status(404).json({message: "Spot couldn't be found"}); // throw error

  if(await Review.findOne({where:{spotId:req.params.spotId, userId:user.id}}))//does review exist?

  return res.status(500).json({message:"User already has a review for this spot"})// throw error

  //valid things go down here
  if(user){
    console.log('reach here')
    const {review, stars} = req.body; // get info from body
    const newReview = await Review.create({userId: user.id, spotId: req.params.spotId,review,stars,})
    return res.status(201).json(newReview)// send response!
  }
})

//Create an Image for Spot ID
router.post("/:spotId/images", requireAuth, async (req, res) => {
const spot = await Spot.findOne({raw:true,where:{id:req.params.spotId}})
if(!spot)return res.status(404).json({message:"Spot does not exist"});

const {user} = req;
        if(user.id === spot.ownerId){
          const {url,preview} = req.body
          const newSpotImage = await SpotImage.create({
            spotId:req.params.spotId,
            url,
            preview
          })

          return res.status(201).json({
            id: newSpotImage.id,
            url,
            preview
          })
        }
  return res.status(404).json({message: "not correct Owner ID"})
});

// update spot
router.put('/:spotId',[requireAuth,validateSpot], async (req,res)=>{
  let spot = await Spot.findByPk(req.params.spotId)
  const {user} = req;
  if(!spot)return res.status(404).json({message:"Spot couldn't be found"});
  if(spot.ownerId === user.id){
    const {address, city, state, country, lat, lng, name, description,price} = req.body
   await spot.update({address,city,state,country,lat,lng,name,description,price,});
    return res.status(200).json(await Spot.findByPk(req.params.spotId))
  }
  // catch user if not tied to ownerId of SPOT!
  return res.status(403).json({"message": "Forbidden"})
})

//creating a new spot
router.post('/',[validateSpot,requireAuth],async(req,res) =>{
  const {user} = req
  //is there a user in the request?
  if(user){
  const {address,city,state,country,lat,lng,name,description,price} = req.body
  const newSpot = await Spot.create({ownerId:user.id,address,city,state,country,lat,lng,name,description,price})
  return res.status(201).json(newSpot);
  }
})

// get all spots
router.get("/", async (req,res) =>{
  // all spots in arr
  const spots = await Spot.findAll({raw:true})
  for(let spot of spots){ // iterate through all spots
       // gets the total stars and average
      const stars = await Review.sum('stars',{where:{spotId:spot.id}}); // get all stars tied to this spot
      const totalReviews = await Review.count({where:{spotId:spot.id}});
      spot.avgRating = stars/totalReviews; // set it!
      // check to see if previewimage is true if true put the url there
      const previewImage = await SpotImage.findOne({where:{spotId:spot.id}})
      if(previewImage) spot.previewImage = previewImage.url
      else spot.previewImage = 'NO IMAGE URL';
  }
  return res.status(200).json({Spots:spots});
})


module.exports = router;
