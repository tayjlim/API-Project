
import {csrfFetch} from './csrf'

export const GET_REVIEWS = 'reviews/GET_REVIEWS'

// action creators --------------------------------------------------

//get reviews (ALL)
export const getReviewAction = (reviews) =>{
    type: GET_REVIEWS,
    reviews
}

// Thunks
// dont need to be a user to get all reviews
export const getReviews = (reviews) => async (dispatch) =>{
    const response = await fetch(`/api/spots/${spotId}`)

    if(response.ok){
        const reviews = await response.json();
        dispatch(getReviewAction(reviews))
        return reviews;
    }
}

// REDUCERRR
const initialtstate = {spot:{},user:{}}
const reviewsReducer = (state=initialtstate,action) => {
    
let newState;

switch(action.type){

    case GET_REVIEWS:{
        newState = {...state,spot:{},user:{...state.user}}
        action.reviews.Reviews.forEach((review)=>{
            newState[review.id] = review
        })
        return newState
    }



 }
}

export default reviewsReducer;
