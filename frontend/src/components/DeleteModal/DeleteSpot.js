import {useModal} from '../../context/Modal'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function DeleteSpot ({spotId}) {

    const {closeModal} = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    const yesDelete = (e) =>{

        dispatch(deleteThunk(spotId))
    }

    const no = (e) =>{
        e.preventDefault();
        return closeModal();

    }

    return (
        <div>
            <h1>
            Confirm Delete
            </h1>

            <h3>
            Are you Sure....
            </h3>

            <button>
            YES
            </button>

            <button>
                NO
            </button>
        </div>
    )

}

export default DeleteSpot
