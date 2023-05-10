import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllSpots } from "../../store/spots";
import { useHistory } from "react-router-dom";
import SpotItem from "./SpotItem";

function SpotsCurrentUser () {
    const dispatch = useDispatch();
    let history = useHistory();
    const Allspots = useSelector (state => Object.values(state.spots))
    const current = useSelector( state => state.session.user)
    let currentUserSpots = [];
    // console.log(current)
    // console.log(Allspots)

    const newSpotButton = () =>{
        return history.push('/spots/new')
    }

    Allspots.forEach((spot)=>{
        if(spot.ownerId === current.id)
        currentUserSpots.push(spot)
    })

    // console.log('currentUserSpots', currentUserSpots)

    useEffect(() => {
        dispatch(getAllSpots())
    },[dispatch])

    return (
        <div>
        <h1>Manage Your Spots</h1>
        <button onClick = {newSpotButton}> Create a New Spot</button>
            <div className = 'allContainer'>
            {currentUserSpots.map(spot=> <SpotItem spot={spot}/>)}
            </div>
        </div>)
}


export default SpotsCurrentUser;
