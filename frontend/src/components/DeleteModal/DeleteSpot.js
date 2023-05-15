import {useModal} from '../../context/Modal'
import { useDispatch } from 'react-redux';
import { deleteSpot } from '../../store/spots';
import { useEffect } from 'react';
import './deleteSpot.css'

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
            Are you sure you want yo remove this spot from the listings?
            </h3>


                <button className = 'yesButtonDeleteSpot' onClick={yesDelete}>
                YES (Delete Spot)
                </button>

                <button className = 'noButtonDeleteSpot' onClick={no}>
                    NO (Keep Spot)
                </button>


        </div>
    )

}

export default DeleteSpot
