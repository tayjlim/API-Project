
const ReviewsForSpot = ({review}) =>{
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
const date = review.createdAt.split('-')[1]
    return(
        <div className = 'firstandlastname'>

            <h3 className='reviewFirstName'>
                {review.User.firstName}
            </h3>

            <h3 className = 'month'>
            {months[date]}
            </h3>

            <p className = 'reviewDescription'>
                {review.review}
            </p>



        </div>

    )
}

export default ReviewsForSpot
