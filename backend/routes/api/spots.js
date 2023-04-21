const express = require("express");
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require("../../db/models");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth} = require("../../utils/auth");
const { check } = require("express-validator");
const { Op, json } = require('sequelize');
const router = express.Router();

const validateBooking = [
  check("endDate")
    .exists({checkFalsy:true})
    .withMessage("endDate required"),
  check('startDate')
    .exists({checkFalsy:true})
    .withMessage('Start date required'),
  handleValidationErrors
];
const validateBookingEndDate = [
  check("endDate")
    .custom((value, { req }) => new Date(req.body.startDate) < new Date(value))
    .withMessage("endDate cannot be on or before startDate"),
  handleValidationErrors,
];

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

router.get('/:spotId/bookings',[requireAuth],async (req,res)=>{
  const spot = await Spot.findByPk(req.params.spotId);
  if(!spot) return res.status(404).json({message:"Spot couldn't be found"})
  let arr =[];

  //case 1 if u are not owner do this
  const {user} = req;
  if(user.id != spot.ownerId){
    const bookings = await Booking.findAll({
      where:{spotId:req.params.spotId},
      attributes:['spotId','startDate','endDate']
    })
    return res.status(200).json({Booking:bookings})
  }
    const bookings = await Booking.findAll({
      where:{spotId:req.params.spotId},
      include:{model : User,attributes:['id','firstName','lastName']}
    })
    for(let i = 0; i<bookings.length;i++){
      let booking = bookings[i]
      booking.toJSON();
      arr.push(booking);
    }
    res.status(200).json({Bookings:arr})
})

router.post('/:spotId/bookings',[requireAuth,validateBooking,validateBookingEndDate],async (req,res)=>{
  const {user} = req;
  const spot = await Spot.findByPk(req.params.spotId);
  let e= {};


  //spot DNE?
  if(!spot) return res.status(404).json({message:"Spot couldn't be found"})
  //spot is owned by user?
  if(spot.ownerId === user.id)res.status(403).json({message:"Owners cannot Book their own spots"});
  //checking the end date

    if(req.body.startDate === req.body.endDate)return res.status(400).json({})

  //contradicting dates:
  const starts = await Booking.findAll({
    where:{
      spotId:req.params.spotId,
      startDate:{[Op.lte]: req.body.startDate},
      endDate:{[Op.gte]:req.body.startDate}
    },
  })
  if(starts.length>0)e.startDate = 'Start date conflicts with an existing booking';

  let ends = await Booking.findAll({
    where:{
      spotId:req.params.spotId,
      startDate:{[Op.lte]: req.body.endDate},
      endDate:{[Op.gte]:req.body.endDate}
    },
  })
  if(ends.length>0)e.endDate = 'End date conflicts with an existing booking'

  if(e.startDate || e.endDate)
  return res.status(403).json({message:'Sorry this spot is already booked for the specifed dates',errors:e})

      const newBooking = await Booking.create({
        spotId:spot.id,
        userId:user.id,
        ...req.body
      })
      return res.status(200).json({newBooking})

})

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

  spot.avgStarRating = await Review.sum('stars',{where:{spotId:spot.id}})/spot.numReviews;

  spot.SpotImages = await SpotImage.findAll({
    where:{spotId:spot.id},
    attributes:['id','url','preview']
  });

  spot.Owner = await User.findOne({
    where:{id:spot.ownerId},
    attributes:['id','firstName','lastName']
  })
 return res.json({spot})
})

//creating a new spot
router.post('/',[validateSpot,requireAuth],async(req,res) =>{
  const {user} = req
  //is there a user in the request?
  if(user){
  const newSpot = await Spot.create({ownerId:user.id,...req.body})
  return res.status(201).json(newSpot);
  }
})


//get reviews by spotID
router.get('/:spotId/reviews',async (req,res)=>{
  const spot = await Spot.findOne({raw:true,where:{id:req.params.spotId}})
  if(!spot)return res.status(404).json({message:"Spot couldn't be found"});

  const reviews = await Review.findAll({
    where: {spotId: req.params.spotId},
    include:[
      {
        model: User,
        attributes:['id','firstName','lastName']
      },
      {
        model: ReviewImage,
        attributes:['id','url']
      }
    ]
  });
  res.status(200).json({reviews})

});

router.post('/:spotId/reviews',[requireAuth,validateReview], async(req,res)=>{
  const spot = await Spot.findOne({raw:true,where:{id:req.params.spotId}});

  const {user} = req
  //does spot exist?
  if(!spot)
  return res.status(404).json({message: "Spot couldn't be found"}); // throw error

  if(await Review.findOne({where:{spotId:req.params.spotId, userId:user.id}}))//does review exist?
  return res.status(500).json({message:"User already has a review for this spot"})// throw error

  //valid things go down here
  if(user){
    console.log('reach here')
    const newReview = await Review.create({userId: user.id, spotId: req.params.spotId,...req.body})
    return res.status(201).json(newReview)// send response!
  }
})

//Create an Image for Spot ID
router.post("/:spotId/images", requireAuth, async (req, res) => {
  const spot = await Spot.findOne({raw:true,where:{id:req.params.spotId}})
  if(!spot)return res.status(404).json({message: "Spot couldn't be found"});

  const {user} = req;
        if(user.id === spot.ownerId){
          const newSpotImage = await SpotImage.create({spotId:req.params.spotId,...req.body})
          return res.status(201).json({id: newSpotImage.id,...req.body})
          }
    return res.status(404).json({message: "not correct Owner ID"})
});

// update spot
router.put('/:spotId',[requireAuth,validateSpot], async (req,res)=>{
  let spot = await Spot.findByPk(req.params.spotId)
  const {user} = req;
  if(!spot)return res.status(404).json({message:"Spot couldn't be found"});
  if(spot.ownerId === user.id){
   await spot.update({...req.body});
    return res.status(200).json(await Spot.findByPk(req.params.spotId))
  }
  // catch user if not tied to ownerId of SPOT!
  return res.status(403).json({"message": "Forbidden"})
});

router.delete('/:spotId',[requireAuth], async (req,res)=>{

  const {user} = req;

  const spot = await Spot.findByPk(req.params.spotId)
  if(!spot) return res.status(404).json({message:"Spot Couldn't be found"});

  if(spot.ownerId === user.id){
    await spot.destroy();
    return res.status(200).json({message:"Successfully deleted"})
  }

  return res.status(404).json({message:"forbidden"})
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
