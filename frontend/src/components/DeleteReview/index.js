import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { useSelector } from "react-redux"
import { deleteReview } from "../../store/reviews"
import { getSpot } from "../../store/spots"
const DeleteReview = ({review}) =>{
    // console.log('insdie delete' ,user)
    const {closeModal} = useModal();
    const dispatch = useDispatch();

    const yesDelete =  async (e) => {
        console.log('inside')
        e.preventDefault()

      const deletedReview = await dispatch(deleteReview(review.id))
      if(deletedReview)
        return getSpot(Number(review.spotId)).then(closeModal())
        // dispatch(getSpot(review.)).then(()=> closeModal())
        if(deleteReview){

        }
    }
    


 return (<div className = 'deleteForm'>
    <form>
    <h3>Are you sure you want to delete this review? </h3>

    <div className = 'yesNobuttonDiv'>
      <button className = 'yesDeleteReview' onClick={yesDelete}> Yes(Delete Review)</button>
      <button className = 'noDonotDelete'> No(Keep Review) </button>
    </div>
    </form>



    </div>)

}

export default DeleteReview
