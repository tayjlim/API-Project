import {useState} from 'react';
import {useDispatch} from 'react-redux'

import {useHistory} from 'react-router-dom'
import {useParams} from 'react-router-dom'

import {updateSpot,getSpot} from '../../store/spots';


function EditSpot () {
    const [lng] = useState()
    const [lat] = useState()
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state,setState] = useState('')
    const [description, setDescription] = useState('');
    const [name,setName] = useState('')
    const [price,setPrice] = useState('')
    const [errors, setErrors] = useState({})

    const {spotId} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    return(<div>
        </div>)

}

export default EditSpot
