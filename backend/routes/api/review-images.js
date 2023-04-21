const express = require("express");
const {requireAuth} = require("../../utils/auth");
const { Review, ReviewImage } = require("../../db/models");

const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

router.delete('/:imageId',requireAuth,async (req,res)=>{

    const {user} = req;
    const image = await ReviewImage.findAll({
        where:{id:req.params.imageId},
        include:{model:Review}
    })

    if(image.length ===0) return res.status(404).json({message:"Review Image couldn't be found"})

    if(user.id === image[0].Review.userId){
        await image[0].destroy();
        return res.status(200).json({message:"Successfully deleted"})
    }

    return res.status(403).json({message:"Forbidden"})
})



module.exports = router;
