
import {csrfFetch} from './csrf'

export const GET_REVIEWS = 'reviews/GET_REVIEWS'
export const CREATE_REVIEW = 'reviews/CREATE_REVIEW'

// action creators --------------------------------------------------

//get reviews (ALL)
export const getReviewAction = (reviews) => {
    return{
    type: GET_REVIEWS,
    reviews
    }
}

export const createReviewAct = (spotId)=>{
    return {
        type: CREATE_REVIEW,
        spotId
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

export const createReview = (spotId, review)=> async (dispatch) =>{

    const response = await csrfFetch(`/api/spots/${spotId}/reviews`,{
        method:'POST',
        headers:{
            'Content-Type' :'application/json'
        },
        body:JSON.stringify(review)
    })
    console.log(response.body)
    if(response.ok)
    {   const data = await response.json()
        dispatch(createReview(data))
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
    case CREATE_REVIEW:
        {
       const newState = { ...state, [action.review.id]: action.review };
        return newState;
    }
    default:
        return state

 }
}

export default reviewsReducer
