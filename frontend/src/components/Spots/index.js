import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllSpots } from "../../store/spots";

import SpotItem from './SpotItem'
import './spots.css'

const Spots = () => {

    const dispatch = useDispatch();
    const spots = useSelector (state =>Object.values(state.spots.allspots))
    useEffect(() => {
        dispatch(getAllSpots())
    },[dispatch])

    return (
        <div className = 'allContainer'>
        {spots.map(spot => <SpotItem spot = {spot}></SpotItem>)}
        </div>
    )

}

export default Spots;
