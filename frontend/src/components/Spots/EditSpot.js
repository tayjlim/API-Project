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

    return(
        <div id = 'createSpot'>
        <form onSubmit={handleSubmit}>

        <div className = 'topForm'>
        <h1>Create a new Spot</h1>
        <h2>Where is your place located?</h2>
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

    <div className = 'imageInputDiv'>
        <h2>Liven up with your spot with Photos</h2>
        <input
        name = 'previewImage'
        type = 'text'
        value = {previewImage.url}
        placeholder='Preview Image URL'
        onChange = {(e)=>setPreviewImage({url:e.target.value,preview:true})}
        />
        <p className='pErrors'>{errors.previewImage}</p>
        <p className='pErrors'>{errors.previewImage1}</p>




        <input
        name = 'img1'
        type = 'text'
        value = {img1.url}
        placeholder='Preview Image URL'
        onChange = {(e)=>setImg1({url:e.target.value,preview:true})}
        />
        <p className='pErrors'>{errors.img1}</p>


        <input
        name = 'img2'
        type = 'text'
        value = {img2.url}
        placeholder='Preview Image URL'
        onChange = {(e)=>setImg2({url:e.target.value,preview:true})}
        />
        <p className='pErrors'>{errors.img2}</p>


        <input
        name = 'img3'
        type = 'text'
        value = {img3.url}
        placeholder='Preview Image URL'
        onChange = {(e)=>setImg3({url:e.target.value,preview:true})}
        />
        <p className='pErrors'>{errors.img3}</p>


        <input
        name = 'img4'
        type = 'text'
        value = {img4.url}
        placeholder='Preview Image URL'
        onChange = {(e)=>setImg4({url:e.target.value,preview:true})}
        />
        <p className='pErrors'>{errors.img4}</p>

    </div>
    <div className = 'submitDiv'>

    <button className = 'submitButton'>
    SUBMIT
    </button>

    </div>


    </form>
        </div>
    )

}

export default EditSpot
