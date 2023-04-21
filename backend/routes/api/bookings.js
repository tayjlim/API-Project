const express = require("express");
const {requireAuth} = require("../../utils/auth");
const { Booking, Spot, SpotImage } = require("../../db/models");
const router = express.Router();



router.get('/current',[requireAuth], async (req,res)=>{
    const {user} = req;
    const booking =  await Booking.findAll({
        where:{
            userId:user.id
        },
        include:{
            model:Spot,
            attributes:['id','ownerId','address','city','state','country','lat','lng','name','price'],
                include:{
                    model: SpotImage
                }
        },

    })

    if(booking.length ===0)return res.status(404).json({message: "Review couldn't be found"})

    return res.status(200).json(booking)

})

module.exports = router;
