
const ReviewsForSpot = ({review}) =>{
    const months = {
        '01': 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'May'
    }
const date = review.createdAt.split('-')[1]

console.log('what is date' ,typeof date)
    return(
        <div className = 'firstandlastname'>
            <h3 className='reviewFirstName'>
                {review.User.firstName}
            </h3>
            <h3>
            {months[date]}
            </h3>
            <p className = 'reviewDescription'>
                {review.review}
            </p>

        </div>

    )
}

export default ReviewsForSpot
