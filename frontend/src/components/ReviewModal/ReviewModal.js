import { useState,useEffect } from "react"
import { useModal } from "../../context/Modal"
import { useDispatch} from "react-redux"
import { createReview } from "../../store/reviews"
import "./CreateReviewModal.css"

const ReviewModal = ({user,spotId}) =>{

    const [writeReview,setWriteReview] = useState('')
    const [stars, setStars] = useState(0)
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()
    const { closeModal } = useModal()


let starArr = [1,2,3,4,5]


useEffect(()=>{

    const errors = {}
        if(writeReview.length <5)
        errors.writeReview = 'Please write more....'


    setErrors(errors)

},[writeReview])

const reviewSubmit = (e) => {
    e.preventDefault()
    const review = {
        review: writeReview,
        stars,

    }
    console.log('---insidebutton-----',review)
    return dispatch(createReview(spotId,review).then(closeModal))

    //set errors?
//     if (writeReview.length === 0 ){
//     errors.writeReview = 'Not enough charecters'
//    }


}


console.log('------------------------------------------------------------------')
console.log('DOES THIS reviews USER ID #??>', user.id)
console.log('DOES THIS TYPE  spotId?>', typeof spotId,  'string???')
console.log('------------------------------------------------------------------')

return(
    <div>

    <form onSubmit={(e)=>{reviewSubmit(e)}}>

    <h2>
    How was your stay?
    </h2>

    <textarea
    className = 'descriptionReview'
    placeholder = 'Leave your review here...'
    value={writeReview}
    rows={8}
    cols={40}
    onChange={e => setWriteReview(e.target.value)}
    />



    <div className="ratingDiv">
    { starArr.map((index)=>{
        return(
        <div
        className={index > stars ? "filled" : "empty"}
            onMouseEnter={() => setStars(index)}
            onClick={() => setStars(stars)}
        >
            <i className="fa-solid fa-star medium-big-star clickable" ></i>
        </div>)
    })}

    </div>

    <div>
    <span>Stars</span>
    </div>


    <div className= 'submitButtonReviewDiv'>
    <button className = "submitButtonReview ">Submit your review</button>
    </div>

    </form>
   </div>
)

}

export default ReviewModal;
