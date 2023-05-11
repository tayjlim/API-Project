import { csrfFetch } from "./csrf";

//store as variable
const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS'
const GET_SINGLE_SPOT = 'spots/GET_SINGLE_SPOT'
const UPDATE_SPOT = 'spots/UPDATE_SPOT'
const DELETE_SPOT = 'spots/DELETE_SPOT'

//action creators
export const getAllSpotsAction = (spot) =>{
  return{
    type: GET_ALL_SPOTS,
    spot // spots
  }
};

export const getspot = (spotId) =>({
  type: GET_SINGLE_SPOT,
payload:spotId
})

export const updatespot = (spot) => ({
type: UPDATE_SPOT,
spot
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
      const data = await response.json();
      dispatch(getAllSpotsAction(data));


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

export const updateSpot = (spotId,updatedSpot) => async (dispatch) =>{
const response = await csrfFetch(`/api/spots/${spotId}`,{
  method:'PUT',
  headers:{
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(updatedSpot)
})
if(response.ok){
  const data = await response.json()
  await dispatch(updatespot(data))
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



const initialstate = {allspots:{},single:{}}

const spotsReducer = (state = initialstate, action)=> {
switch(action.type){

    case GET_ALL_SPOTS:{

      const newState = {...state,allspots:{}}
        action.spot.Spots.forEach(spot => newState.allspots[spot.id]=spot)
        return newState;
    }

    case GET_SINGLE_SPOT:{
      const newState = {...state,single:{}};

      // console.log('-------action what is it ? -------', action.payload.spot)
      newState.single = action.payload.spot
      return newState;
    }

    case UPDATE_SPOT:{
      const newState = {...state, allspots:{...state.allspots}}

      // console.log('ACTION------before set' ,action)

      newState[action.spot.id] = action.spot

      // console.log('-----what is newState--------------', newState)
      newState.allspots[action.spot.id] = action.spot
      // console.log('-----what is new State.all spots -----', newState.allspots[action.spot.id])
      
      return newState
    }

    default:
        return state

}

}


export default spotsReducer;
