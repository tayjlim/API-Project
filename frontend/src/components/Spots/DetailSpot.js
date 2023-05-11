import { useParams } from "react-router-dom";
import { getSpot } from "../../store/spots";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { getReviews } from "../../store/reviews";

const DetailSpot = () =>{

const {spotId} = useParams();
const dispatch = useDispatch();


useEffect(()=>{
dispatch(getSpot(spotId))
dispatch(getReviews(spotId))
},[dispatch,spotId])

// console.log('-------redirect-----------')
const spot = useSelector((state) => (state.spots.single))
const reviews = useSelector((state)=> (Object.values(state.reviews.spot)))

// console.log('DOES THIS SPOT WORK?>' , spot)
console.log('DOES THIS reviews WORK?>' , reviews)





if(!spot.SpotImages)return null // need guard

else
return(

<div>
        <div className ='topHeaders'>
            <h1>{spot.name}</h1>
            <h2>{spot.city}, {spot.state}, {spot.country}</h2>
        </div>

    <div className ='detailSpotContainer'>
        <div className = 'detailImageDiv'>
            <img src = {spot.SpotImages[0].url}/>
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

        <div className = 'reviewsList'>
                <ul>
                    {}
                </ul>
        </div>
    </div>
</div>
    )
}
export default DetailSpot;
