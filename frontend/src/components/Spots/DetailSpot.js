import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getSpot } from "../../store/spots";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";

const DetailSpot = () =>{

const {spotId} = useParams();

const dispatch = useDispatch();
const spot = useSelector((state) => state.spots.single.spot)

if(!spot.SpotImages || (Object.values(spot).length === 0)) {
    return null;
  }

useEffect(()=>{
    dispatch(getSpot(spotId))
},[dispatch,spotId])

return(

    <div>
        <div className ='topHeaders'>
            <h1>{spot.name}</h1>
            <h2>{spot.city}, {spot.state}, {spot.country}</h2>
        </div>

        <div className ='imageBox'>
            <img src = {spot.SpotImages[0].url}/>

            <div className = 'hostReserveContainer'>

        <div className = 'host'>
            <h3>Hosted By: {spot.Owner.firstName} , {spot.Owner.lastName}</h3>
            <p>
            {spot?.description}
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
                    : spot?.numReviews < 1
                    ? null
                    : ` · ${spot.numReviews} reviews`}
            </p>
        </div>

        </div>

     </div>


    </div>
    )

}
export default DetailSpot;
