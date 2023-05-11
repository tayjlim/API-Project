import {useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useParams} from 'react-router-dom'

import {updateSpot,getSpot} from '../../store/spots';


function EditSpot () {


    const {spotId} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();




    const spots = useSelector((state) => (state.spots.allspots))
    const spot = spots.spotId



    useEffect(()=>{
        dispatch(getSpot(spotId))
   },[dispatch,spotId])

    const [country, setCountry] = useState(spot?.country)
    const [address, setAddress] = useState(spot?.address)
    const [city, setCity] = useState(spot?.city)
    const [state,setState] = useState(spot?.state)
    const [description, setDescription] = useState(spot?.description);
    const [name,setName] = useState(spot?.name)
    const [price,setPrice] = useState(spot?.price)
    const [errors, setErrors] = useState({})



    const handleSubmit = async (e) =>{
    e.preventDefault()
    const er = {};
        const updatedSpot ={
            country,
            address,
            city,
            state,
            description,
            name,
            price,
            lat : spot.lat,
            lng : spot.lng
        }

        if(!country || country === null || country === '')
        er.country = 'Country is required'
        //address
        if(!address || address === null || address === '')
        er.address = 'Address is required'

        if(!city || city === null || city === '')
        er.city = 'City is required'

        if(!state || state === null || state === '')
        er.state = 'State is required'

        if(description.length <30)
        er.description = 'Description needs to be minimum of 30 characters'

        if(!name || name === null || name === '')
        er.name = 'Name is Required'

        if(!price)
        er.price = 'Price is required'

        if(Object.values(er).length >0)
        setErrors(er)
        else{

            await dispatch(updateSpot(spotId,updatedSpot))
            history.push(`/spots/${spotId}`)
        }


    }

    if(!spot)return null // need guard to avoid chaining

    return(
        <div className ='editSpotDiv'>
        <form onSubmit = {handleSubmit}>
            <div className ='topForm'>
                <h1>Update your Spot</h1>
                <h2>Where's your place located?</h2>
            </div>

            <div className = 'countryDiv'>
            <label>Country</label>
                <input
                name='country'
                type = 'text'
                value = {country}
                placeholder='Please Enter Country'
                onChange = {(e) => setCountry(e.target.value)}
                />
                <p className='pErrors'>{errors.country}</p>
        </div>

        <div className ='addressDiv'>
            <label>Address</label>
                <input
                name='address'
                type = 'text'
                value = {address}
                placeholder='Enter Valid Address'
                onChange = {(e)=> setAddress(e.target.value)}
                />
                <p className='pErrors'>{errors.address}</p>
        </div>

<div className = 'citystateDiv'>

        <div className='cityDiv'>
            <label>City</label>
                <input
                name = 'city'
                type = 'text'
                value ={city}
                placeholder = 'City'
                onChange = {(e)=>setCity(e.target.value)}
                />
                <p className='pErrors'>{errors.city}</p>
        </div>

        <div className = 'stateDiv'>
            <label>State</label>
            <input
            name = 'State'
            type = 'text'
            value = {state}
            placeholder='Please Enter State'
            onChange = {(e) => setState(e.target.value)}
            />
            <p className='pErrors'>{errors.state}</p>

        </div>
</div>

<div className = 'descriptionDiv'>
    <h2>Describe your place to guests</h2>
    <p>Mention the best features of your space, any special amenities
    like fast wifi or parking, and what you love about the neighborhood.
    </p>

    <textarea
    name= 'description'
    value = {description}
    placeholder='Please write atleast 30 characters'
    onChange = {(e) => setDescription(e.target.value)}
    />
    <p className='pErrors'>{errors.description}</p>

</div>
<div className = 'titleDiv'>

        <h2>
        Create a title for your Spot
        </h2>

        <p>
        Catch guest's attention with a spot title that
        highlights what makes your place special
        </p>

        <input
        name = 'name'
        value ={name}
        placeholder='Name of your spot'
        onChange = {(e) => setName(e.target.value)}
        />
        <p className='pErrors'>{errors.name}</p>

</div>

    <div className ='priceDiv'>

        <h2>Set a base price for your spot</h2>

        <p>
        Competitive pricing help your listing stand outt and rank
        higher in search results
        </p>

        <label>$</label>

        <input
        name = 'price'
        type = 'text'
        value ={price}
        placeholder = 'Price per night (USD)'
        onChange = {(e)=>setPrice(e.target.value)}
        />
        <p className='pErrors'>{errors.price}</p>


    </div>
    <div className = 'submitDiv'>

    <button className = 'submitButton'>
    SUBMIT
    </button>

    </div>

        </form>
        </div>)

}

export default EditSpot
