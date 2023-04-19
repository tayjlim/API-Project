const express = require("express");
const { restoreUser, requireAuth, isAuthorized } = require("../../utils/auth");
const { ReviewImage, Review, User, Spot } = require("../../db/models");
const router = express.Router();

const validateReviewImage =[
    
]

router.post('/:reviewId/images',[requireAuth], async(req,res)=>{
    const review = await Review.findOne({where:{id: req.params.reviewId}})
    if(!review) return res.status(404).json({message:"Review couldn't be found"})



    if(review.userId !== user.id)
    return res.status(403).json({message:"Forbidden"})

    if(await ReviewImage.findAll({where:{reviewId: req.params.reviewId}}).length>=10)
    return res.status(403).json({message:"Maximum number of images for this resource was reached"});


    const {user} = req
    const {url} = req.body
    const newReviewImage = await ReviewImage.create({
        reviewId: req.params.reviewId,
        url,
    });




})

module.exports = router;
