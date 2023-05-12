
import {csrfFetch} from './csrf'

export const GET_REVIEWS = 'reviews/GET_REVIEWS'

// action creators --------------------------------------------------

//get reviews (ALL)
export const getReviewAction = (reviews) => {
    return{
    type: GET_REVIEWS,
    reviews
    }
}

// Thunks
// dont need to be a user to get all reviews
export const getReviews = (spotId) => async (dispatch) =>{
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if(response.ok){
        const reviews = await response.json();
        dispatch(getReviewAction(reviews))
        return reviews;
    }
}

// REDUCERRR
const initialtstate = {spot:{},user:{}}

const reviewsReducer = (state=initialtstate,action) => {
switch(action.type){

    case GET_REVIEWS:{
        const newState = {...state,spot:{},user:{...state.user}}
        console.log('WHAT IS ACTION',action.reviews)
        action.reviews.reviews.forEach((review)=>{
        newState.spot[review.id] = review
        })
        return newState
    }

    default:
        return state

 }
}

export default reviewsReducer;
