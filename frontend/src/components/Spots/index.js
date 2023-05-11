import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllSpots } from "../../store/spots";

import SpotItem from './SpotItem'
import './spots.css'

const Spots = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSpots())
    },[dispatch])

    const spots = useSelector ((state) =>Object.values(state.spots.allspots))


    return (
        <div className = 'allContainer'>
        {spots.map(spot => <SpotItem spot = {spot}></SpotItem>)}
        </div>
    )

}

export default Spots;
