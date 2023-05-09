import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getSpot } from "../../store/spots";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";

const DetailSpot = () =>{

const {spotId} = useParams();
const dispatch = useDispatch();
// state.spots.single.spot
const spot = useSelector((state) => state.spots.single.spot)
console.log('this is spot', spot)

useEffect(()=>{
    dispatch(getSpot(spotId))
},[dispatch,spotId])

return(
    <div className = ''>
        <div className ='topHeaders'>
            <h1>{spot.name}</h1>
            <h2>{spot.city}, {spot?.state}, {spot.country}</h2>
        </div>

        <div className ='imageBox'>
            <img src = {spot?.previewImage}/>
            Image Div
        </div>

        <div className = 'host'></div>
        <h3>Hosted by {spot.Owner.firstName} , {spot.Owner.lastName}</h3>



    </div>
    )
}
export default DetailSpot;
