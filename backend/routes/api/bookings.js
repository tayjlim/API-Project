const express = require("express");
const {requireAuth} = require("../../utils/auth");
const { Booking, Spot, SpotImage } = require("../../db/models");
const router = express.Router();
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");
const { Op } = require('sequelize');

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
      .custom((x, {req}) => new Date(req.body.startDate) < new Date(x))
      .withMessage("endDate cannot be on or before startDate"),
    handleValidationErrors,
  ];

router.get('/current',[requireAuth], async (req,res)=>{
    const {user} = req;
    const bookings =  await Booking.findAll({
        where:{
            userId:user.id
        },
        attributes:['id','spotId','userId','startDate','endDate','createdAt','updatedAt'],
        include:{
            model:Spot,
            attributes:['id','ownerId','address','city','state','country','lat','lng','name','price'],
            include:{
                model:SpotImage
            }
        },

    })

    if(bookings.length ===0)return res.status(404).json({message: "Booking couldn't be found"})

    //previewImage property add:
      // push contents into the array.
      // for each booking add a preview image key

    const responseBooking = [];
    for(let booking of bookings){
      responseBooking.push(booking.toJSON())
    }

    //find the image of the spot with preview === true
    for(let booking of responseBooking){
      if(booking.Spot.SpotImages.length===0) booking.Spot.previewImage = 'no preview'
     for(let image of booking.Spot.SpotImages){
      if(image.preview === true) booking.Spot.previewImage = image.url
      else booking.Spot.previewImage = 'no preview'

      if(!image.url) booking.Spot.previewImage ='no image';
      // delete key

     }
     delete booking.Spot.SpotImages
    }

    return res.status(200).json({Bookings:responseBooking})
})

router.put('/:bookingId',[validateBooking,validateBookingEndDate,requireAuth],async (req,res)=>{
const {user} = req;
const e = {};
const booking = await Booking.findByPk(req.params.bookingId)
    if( !booking )
    return res.status(404).json({message:"Booking could not be found"})

    if(user.id != booking.userId)
    return res.status(403).json({message:"Forbidden"})

    //contradicting dates:
  const starts = await Booking.findAll({
    where:{
      id:req.params.bookingId,
      startDate:{[Op.lte]: req.body.startDate},
      endDate:{[Op.gte]:req.body.startDate}
    },
  })
  if(starts.length>0)e.startDate = 'Start date conflicts with an existing booking';

  let ends = await Booking.findAll({
    where:{
      id:req.params.bookingId,
      startDate:{[Op.lte]: req.body.endDate},
      endDate:{[Op.gte]:req.body.endDate}
    },
  })
  if(ends.length>0)e.endDate = 'End date conflicts with an existing booking'

  if(e.startDate || e.endDate)
  return res.status(403).json({message:'Sorry this spot is already booked for the specifed dates',errors:e})

   await booking.update({...req.body});
   return res.status(200).json({booking})
})

//delete this shit
router.delete('/:bookingId',requireAuth, async(req,res)=>{
  const {user} = req;
  const booking = await Booking.findByPk(req.params.bookingId)
  if(!booking)return res.status(404).json({message:"Booking couldn't be found"})

  if(booking.startDate <= Date.now() && booking.endDate>= Date.now())
  return res.status(403).json({message:"Bookings that have started can't be deleted"})

  if(booking.userId !== user.id) return res.status(403).json({message:"Forbidden"})

 await booking.destroy();
 return res.status(200).json({message:"Successfully deleted"});
})


module.exports = router;
