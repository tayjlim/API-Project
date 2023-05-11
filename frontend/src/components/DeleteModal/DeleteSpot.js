import {useModal} from '../../context/Modal'
import { useDispatch } from 'react-redux';
import { deleteSpot } from '../../store/spots';
import { useEffect } from 'react';

function DeleteSpot ({spotId}) {

    const {closeModal} = useModal();
    const dispatch = useDispatch();

    const yesDelete = (e) =>{

        dispatch(deleteSpot(spotId))
        return closeModal();

    }

    const no = (e) =>{
        e.preventDefault();
        return closeModal();

    }

    useEffect(()=>{

    })

    return (
        <div className = 'deleteFormforSpot'>

            <h1>
            Confirm Delete
            </h1>

            <h3>
            Are you Sure You Want To Remove?
            </h3>

            <button className = 'yesButton' onClick={yesDelete}>
            YES (REMOVE)
            </button>

            <button className = 'noButton' onClick={no}>
                NO (DONT REMOVE)
            </button>

        </div>
    )

}

export default DeleteSpot
