const express = require("express");
const { Spot, SpotImage, Review, User, ReviewImage } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

router.get('/current', requireAuth, async(req, res) => {
    const {user} = req;
    if(user) {
      const reviews = await Review.findAll({where: {userId: user.id},
        include:[
          {
            model: User,
          },
          {
            model: Spot,
            include:{model: SpotImage}
          },
          {
            model: ReviewImage
          }
        ]}
    );
    
    let list = [];
    reviews.forEach(review => {
      list.push(review.toJSON());
    })
    list.forEach(review => {
      delete review.User.username;
      delete review.Spot.description;
      delete review.Spot.createdAt;
      delete review.Spot.updatedAt;
      review.Spot.SpotImages.forEach(spotImage => {
        if(spotImage.preview) review.Spot.previewImage = spotImage.url;
      })
      delete review.Spot.SpotImages;
      review.ReviewImages.forEach(image => {
        delete image.reviewId;
        delete image.createdAt;
        delete image.updatedAt;
      })
    })
      res.status(200).json({["Reviews"]: list});
    }
  });


router.post('/:reviewId/images',[requireAuth], async(req,res)=>{
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
