import { useParams } from "react-router-dom";
import { getSpot } from "../../store/spots";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllReviewsBySpotIdThunk } from "../../store/reviews";
import ReviewsForSpot from "../Reviews";
import OpenModalButton from '../OpenModalButton'
import ReviewModal from "../ReviewModal/ReviewModal";
import { useModal } from "../../context/Modal";
import './DetailSpot.css'

const DetailSpot = () =>
{


const {spotId} = useParams();
const dispatch = useDispatch();

const {closeModal} = useModal();




const reviewsObj = useSelector((state)=> (state.reviews.spot))
const spot = useSelector((state) => (state.spots.single))
const user = useSelector((state) => state.session.user)
const reviews = Object.values(reviewsObj).reverse()

useEffect(()=>{
    dispatch(getSpot(spotId))
    dispatch(getAllReviewsBySpotIdThunk(spotId))
    closeModal();
    },[dispatch,spotId,reviews.length])


    console.log('copy this user obj',user)
    //make a proxy demo
    let test = {
        id: 999999,
        email: 'coo.gmail.com',
        lastName:'testtesttest',

    }

//  if(!test.id){

//  }

function canwriteReview (user ,reviews){
    if(user && reviews){
    const truths = reviews.find(review => review.userId === user.id)
    return !truths}
}
const bookingClick = () =>{
    return alert('Feature coming soon!')
}
// console.log('DOES THIS SPOT WORK?>' , spot)
// console.log('DOES THIS reviews WORK?>' , reviews)
// console.log('DOES THIS reviews USER?>', user)


if(!spot.SpotImages) return null

return(
<div className = 'detailSpotdiv'>

        <div className ='topHeaders'>
            <h2>{spot.name}</h2>
            <h2>{spot.city}, {spot.state}, {spot.country}</h2>
        </div>

    <div className ='detailSpotContainer'>


        <div className = 'detailImageDiv'>

            <div className = 'leftpic'>
            <img  className = 'mainImage'src = {spot.SpotImages[0].url}  id = 'firstImage'/>
            </div>

            <div className = 'rightPictures'>

                <div className = 'topPortion'>
                  {spot.SpotImages[1]?( <img className = 'small'src = {spot.SpotImages[1].url}>
                    </img>) : null}

                    {spot.SpotImages[2]?( <img className = 'small'src = {spot.SpotImages[2].url}>
                    </img>) : null}
                </div>

                <div className = 'bottomPortion'>
                {spot.SpotImages[3]?( <img className = 'small'src = {spot.SpotImages[3].url}>
                    </img>) : null}
                    {spot.SpotImages[4]?( <img className = 'small'src = {spot.SpotImages[4].url}>
                    </img>) : null}
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
            <div className = 'nightReviewDiv'>
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
            <button className = 'reserveNowButton' onClick={bookingClick}>Reserve Now</button>
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

        <div className = 'createReviewTernary'>
         {
        (!user ? null : (user && user.id !== spot.Owner.id) && canwriteReview (user ,reviews)) ? (
            <OpenModalButton
            className = 'writeReviewButton'
            modalComponent={<ReviewModal spotId = {spotId} user={user}/>}
            buttonText = 'Post Your Review'
            />

          ) : null

        }

        </div>

        <div className = 'reviewTurnary'>

        {(!!reviews.length ) ?
        (
            <div className = 'reviewLoopdiv'>
            {reviews.map(review=><ReviewsForSpot review={review} user = {user}/>)}
            </div>
        ) : (!user ? null : (user.id !== spot.Owner.id) ?

        (<div>
        <h2>Be the First to Review!</h2>
        </div>) : null)

        }



        </div>





        </div>

    </div>

    </div>
    )
}

export default DetailSpot;
