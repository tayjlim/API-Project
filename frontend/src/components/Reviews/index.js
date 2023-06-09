import OpenModalButton from '../OpenModalButton'
import DeleteReview from '../DeleteReview'
import './reviews.css'
const ReviewsForSpot = ({review,user}) =>{
    const months = {
        '01': 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'May',
        '06' :'June',
        '07':'July',
        '08': 'August',
        '09': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December'
    }

    if(!review.id)return null

    console.log(review)
    const dateArr = review.createdAt.split('-')
    const date = dateArr[1]
    const year = dateArr[0]
    console.log(review)
    // console.log(' review user; ' ,spotId)
    // console.log('review in side review model',review.id)

    const deleteButtonshow = (userId, reviewOwnerId) => {
        if(userId === reviewOwnerId)
            return true
    }

    const deleteClick = async (e) =>{
        e.preventDefault();

        console.log('click works')
    }


    return(
        <div className = 'reviewDiv'>

            <h3 className='reviewFirstName'>
           {
             review.User.firstName
            }, {review.User.lastName}
             </h3>




            <h3 className = 'month'>
            {
                months[date]
            }, {year}
            </h3>

                {
                    (review.review) ? (<p className = 'reviewDescription'>{review.review}</p>) : null
                }

                {
                (deleteButtonshow(user?.id,review.userId)) ?
                    (<OpenModalButton
                    className = 'writeReviewButton'
                    modalComponent={<DeleteReview review={review} />}
                    buttonText = 'Delete Review'
                    />) : null
                }


        </div>

    )
}

export default ReviewsForSpot
