import {useEffect, useState} from 'react';
import {useModal} from '../../context/Modal'
import { useDispatch } from 'react-redux';
import {postReviewThunk,getReviewsThunk} from '../../store/reviews'
import MultiStars from '../MultiStars/MultiStars'

const ReviewModal = () =>{
 return (
<div>
    <form>
        <h2>How was your stay?</h2>
        <textarea
        className = 'descriptionReview'
        placeholder = 'Leave your review here...'
        />
        <></>
        <button>Submit your review</button>

    </form>
</div>

 )
}

export default ReviewModal;
