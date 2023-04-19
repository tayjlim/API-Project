const express = require("express");
const { restoreUser, requireAuth, isAuthorized } = require("../../utils/auth");
const { ReviewImage, Review, User, Spot } = require("../../db/models");
const router = express.Router();

const validateReviewImage =[

]

router.post('/:reviewId/images',[restoreUser,requireAuth], async(req,res)=>{
    const review = await Review.findOne({where:{id: req.params.reviewId}}) // find the review
    if(!review) return res.status(404).json({message:"Review couldn't be found"})//if DNA throw error

    const {user} = req;
    if(review.userId !== user.id)// is current user same as userID for review?
    return res.status(403).json({message:"Forbidden"})// throw error

    // console.log(await ReviewImage.count({where:{reviewId: req.params.reviewId}})) // tracker of how many images per review
    if(await ReviewImage.count({where:{reviewId: req.params.reviewId}})>=10)
    return res.status(403).json({message:"Maximum number of images for this resource was reached"});// if no

    const newReviewImage = await ReviewImage.create({reviewId: req.params.reviewId,...req.body});
    return res.status(200).json({id:newReviewImage.id,url:newReviewImage.url})
})

module.exports = router;
