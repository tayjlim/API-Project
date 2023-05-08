import { csrfFetch } from "./csrf";

//store as variable
const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS'


//action creators
export const getallspots = (spots) => ({
    type: GET_ALL_SPOTS,
    spots // spots
  });


//Thunk Action creators
export const getAllSpots = () => async(dispatch) => {
    const res = await csrfFetch('/api/spots');

    if(res.ok) {
      const spots = await res.json();
      dispatch(getallspots(spots));
      return spots;
    } else {
      const errors = await res.json();
      return errors;
    }
  }



//reducer
const spotsReducer = (state = {}, action)=> {
switch(action.type){
    case GET_ALL_SPOTS:{
        let spots = {};
        console.log('finding what to key', action.spots.Spots)
        action.spots.Spots.forEach(spot => spots[spot.id]=spot)
        return spots;
    }
    default:
        return state

}

}


export default spotsReducer;
