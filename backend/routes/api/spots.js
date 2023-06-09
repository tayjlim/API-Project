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
    .custom((x, { req }) => new Date(req.body.startDate) < new Date(x))
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
  let {page,
    size,
    minLat,
    minLng,
    maxLat,
    maxLng,
    minPrice,
    maxPrice} = req.query;

  if(!page) page = 1;
  if(!size) size = 20;



  const where = {};
  let error= {};
  page = parseInt(page);//
  size = parseInt(size);//
  minLat = parseFloat(minLat);//
  minLng = parseFloat(minLng);
  maxLat = parseFloat(maxLat);//
  maxLng = parseFloat(maxLng);//
  minPrice = parseFloat(minPrice);//
  maxPrice = parseFloat(maxPrice);//
    console.log(minLng)
// errors
if(page)
{if(page < 1 || isNaN(page)) error.page = "Page must be greater than or equal to 1";}

if(size)
{if(size < 1 || isNaN(size)) error.size = "Size must be greater than or equal to 1";}

if(maxLat)
{if(maxLat >90 || maxLat <-90 || isNaN(maxLat)) error.maxLat ='Maximum latitude is invalid';}

if(maxLng)
{if(maxLng >180 || maxLng<-180 || isNaN(maxLng)) error.maxLng = 'Maximum longitude is invalid';}

if(maxPrice)
{if(maxPrice < 0 || isNaN(maxPrice)) error.maxPrice = 'Maximum price must be greater than or equal to 0';}

if(minPrice)
{if(minPrice < 0 || isNaN(minPrice)) error.minPrice = 'Minimum price must be greater than or equal to 0';}

if(minLat)
{if(minLat >90 || minLat <-90 || isNaN(minLat)) error.minLat = 'Minimum latitude is invalid';}

if(minLng)
{if(minLng > 180 || minLng <-180 || isNaN(minLng)) error.minLng = 'Minimum longitude is invalid';
}
//
 if(minPrice)
  where.price = {[Op.gte]: minPrice}
 if(maxPrice)
  where.price = {[Op.lte]: maxPrice}

//
 if(minLng)
  where.lng ={[Op.gte]: minLng}

 if(maxLng)
  where.lng = {[Op.lte]: maxLng}

//lat
if(minLat)
where.lat = {[Op.gte]: minLat}
if(maxLat)
where.lat = {[Op.lte]: maxLat}


//*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////*

let pagination = {};
pagination.limit = size;
pagination.offset = size * (page - 1);

 if(Object.keys(error).length>0)
 return res.status(400).json({message:"Bad Request",errors:error})

  const spots = await Spot.findAll({raw:true,where,...pagination})
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
  return res.status(200).json({Spots:spots,page:page,size:size});

})


module.exports = router;
