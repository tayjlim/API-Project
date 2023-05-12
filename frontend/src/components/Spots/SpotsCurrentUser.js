import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllSpots } from "../../store/spots";
import { useHistory } from "react-router-dom";
import SpotItem from "./SpotItem";
import OpenModalButton from "../OpenModalButton/index";
import DeleteSpot from '../DeleteModal/DeleteSpot.js'

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
        <button onClick = {newSpotButton}> Create a New Spot</button>
            <div className = 'allContainer'>
            {currentUserSpots.map(spot=>
                <div className = 'currentUserBox'>
                    <SpotItem spot={spot}/>

                    <div className = 'buttonDiv'>
                        <button className = 'updateButton' onClick ={()=>history.push(`/spots/${spot.id}/edit`)}>
                            Update
                        </button>
                        <OpenModalButton
                            className = 'deleteButton'
                            buttonText ='DELETE'
                            onButtonClick = {closeMenu}
                            modalComponent={<DeleteSpot spotId = {spot.id}/>}
                        />


                    </div>
                </div>

            )}

            </div>
        </div>)
}


export default SpotsCurrentUser;
