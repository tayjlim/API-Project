import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllSpots } from "../../store/spots";
import { useHistory } from "react-router-dom";
import SpotItem from "./SpotItem";
import OpenModalButton from "../OpenModalButton/index";
import DeleteSpot from '../DeleteModal/DeleteSpot.js'
import './SpotsCurrentUser.css'

function SpotsCurrentUser () {

    const dispatch = useDispatch();
    let history = useHistory();
    const Allspots = useSelector (state => Object.values(state.spots.allspots))
    const current = useSelector( state => state.session.user)

    let currentUserSpots = [];

    const newSpotButton = () =>{
        return history.push('/spots/new')
    }

    let closeMenu;

    Allspots.forEach((spot)=>{
        if(spot.ownerId === current.id)
        currentUserSpots.push(spot)
    })

    // console.log('currentUserSpots', currentUserSpots)

    useEffect(() => {
        dispatch(getAllSpots())
    },[dispatch])
//()=>history.push(`/spots/${spot.id}/edit`)
    return (
        <div>
        <h1>Manage Your Spots</h1>
        <div>
        {currentUserSpots.length ===0 ? (<button id = "createSpotCurrent" onClick = {newSpotButton}> Create a New Spot</button>) : (null)

        }

        </div>
            <div className = 'allContainer'>
            {currentUserSpots.map(spot=>
                <SpotItem spot={spot} current={true}/>
            )}

            </div>
        </div>)
}


export default SpotsCurrentUser;
