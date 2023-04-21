const express = require("express");
const {requireAuth} = require("../../utils/auth");
const { Spot, SpotImage } = require("../../db/models");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

router.delete('/:imageId',requireAuth,async (req,res)=>{
    const {user} = req;

    const image = await SpotImage.findAll({where:{id: req.params.imageId},include:{model : Spot}})

    if(!image.length) return res.status(404).json({message:"Spot Image couldn't be found"})

    if(user.id === image[0].Spot.ownerId){
        await image[0].destroy();
        return res.status(200).json({message:"Successfully deleted"})
    }

    return res.status(403).json({message:"Forbidden"})
})

module.exports = router;
