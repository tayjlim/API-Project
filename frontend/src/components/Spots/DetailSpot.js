import { useParams } from "react-router-dom";
import { getSpot } from "../../store/spots";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { getReviews } from "../../store/reviews";
import ReviewsForSpot from "../Reviews";
import OpenModalButton from '../OpenModalButton'
import ReviewModal from "../ReviewModal/ReviewModal";

const DetailSpot = () =>
{


const {spotId} = useParams();
const dispatch = useDispatch();



useEffect(()=>{
dispatch(getSpot(spotId))
dispatch(getReviews(spotId))
},[dispatch,spotId])

// console.log('-------redirect-----------')

const spot = useSelector((state) => (state.spots.single))
const reviews = useSelector((state)=> (Object.values(state.reviews.spot)))
const user = useSelector((state) => state.session.user)

function canwriteReview (user ,reviews){

    if(user && reviews){
    const truths = reviews.find(review => review.userId === user.id)
    return !truths
    }
}

// console.log('DOES THIS SPOT WORK?>' , spot)
// console.log('DOES THIS reviews WORK?>' , reviews)
// console.log('DOES THIS reviews USER?>', user)
// console.log('DOES THIS WORK' ,canwriteReview(user,reviews))





if(!spot.SpotImages) return null

return(
<div className = 'detailSpotdiv'>

        <div className ='topHeaders'>
            <h1>{spot.name}</h1>
            <h2>{spot.city}, {spot.state}, {spot.country}</h2>
        </div>

    <div className ='detailSpotContainer'>


        <div className = 'detailImageDiv'>

            <div clasName = 'leftpic'>
            <img  className = 'mainImage'src = {spot.SpotImages[0].url}  id = 'firstImage'/>
            </div>

            <div className = 'rightPictures'>

                <div className = 'topPortion'>
                    <img className = 'small'src = {spot.SpotImages[1].url}>
                    </img>
                    <img className = 'small' src = {spot.SpotImages[2].url}>
                    </img>
                </div>

                <div className = 'bottomPortion'>
                    <img  className = 'small' src = {spot.SpotImages[3].url}>
                    </img>
                    <img  className = 'small' src = {spot.SpotImages[4].url}>
                    </img>
                </div>

            </div>

        </div>

        <div className = 'hostAndReviews'>

            <div className = 'host'>
            <h3>Hosted By: {spot.Owner.firstName} , {spot.Owner.lastName}</h3>
            <p>
            {spot.description}
            </p>
            </div>

        <div className = 'reserveContainer'>
            <p className = 'priceP'>
                ${spot.price} Night
            </p>

            <p className = 'starNumreviews'>
                <i className="fa-solid fa-star" />
                {Number(spot.avgStarRating)? " " + Number(spot.avgStarRating).toFixed(2): 'New'}
                {Number(spot.numReviews) === 1
                    ? ` · ${spot.numReviews} review`
                    : spot.numReviews < 1
                    ? null
                    : ` · ${spot.numReviews} reviews`}
            </p>
            </div>
        </div>

        <div className = 'reviewsDivDetailBottom'>

        <div className = 'starnumreviewsDiv'>
            <p className = 'starNumreviewsbottom'>
        <i className="fa-solid fa-star" />
        {Number(spot.avgStarRating)? " " + Number(spot.avgStarRating).toFixed(2): 'New'}
        {Number(spot.numReviews) === 1
            ? ` · ${spot.numReviews} review`
            : spot.numReviews < 1
            ? null
            : ` · ${spot.numReviews} reviews`}
            </p>
        </div>

        <div className = 'createReviewTurnary'>
         {
        (user && user.id !== spot.Owner.id && canwriteReview(user,reviews)) ? (

            <OpenModalButton
            className = 'writeReviewButton'
            modalComponent={ReviewModal}
            buttonText = 'Write a Review'
            />
          ) :
          (null)
        }

        </div>

        <div className = 'reviewTurnary'>

        {!reviews.length && user.id !== spot.Owner.id ?
        (<div>
                <h2>Be the First to Review!</h2>
         </div>
        ) :
        (
            <div className = 'reviewLoopdiv'>
            {reviews.map(review=><ReviewsForSpot review = {review}/>)}
        </div>
        )}
        </div>



        </div>

        </div>

    </div>
    )
        }

export default DetailSpot;
