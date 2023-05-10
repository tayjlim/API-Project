import { csrfFetch } from "./csrf";

//store as variable
const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS'
const GET_SINGLE_SPOT = 'spots/GET_SINGLE_SPOT'

//action creators
export const getallspots = (spots) => ({
    type: GET_ALL_SPOTS,
    payload: spots // spots
  });

export const getspot = (spot) =>({
  type: GET_SINGLE_SPOT,
  payload: spot
})


//Thunk Action creators
export const getSpot = (spotId) => async (dispatch)=>{
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if(response.ok){
    const spot = await response.json();
    await dispatch(getspot(spot))
    return spot
  }else{}
}

export const getAllSpots = () => async(dispatch) => {
    const response = await csrfFetch('/api/spots');

    if(response.ok) {
      const spots = await response.json();
      await dispatch(getallspots(spots));
      return spots;
    } else{}
  }

export const createSpot = (spot) => async (dispatch) =>{
  const response = await csrfFetch('/api/spots',{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(spot),
  })
  if(response.ok){
  const data = await response.json()
  return data
  }
}

export const addImage = (spotId,imgs) => async (dispatch) =>{

  const response = await csrfFetch (`/api/spots/${spotId}/images`,{
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(imgs)
    })
    if(response.ok){
      const img = await response.json()
      return img;

    }


}




//reducer
const initialstate = {allspot:{},single:{}}

const spotsReducer = (state = initialstate, action)=> {

switch(action.type){

    case GET_ALL_SPOTS:{
        let spots = {...state,allspot:{...state.allspot}};
        action.payload.Spots.forEach(spot => spots[spot.id]=spot)
        return spots;
    }

    case GET_SINGLE_SPOT:{
      const spot = {...state,single:{}};
      spot.single = action.payload
      return spot;
    }


    default:
        return state

}

}


export default spotsReducer;
