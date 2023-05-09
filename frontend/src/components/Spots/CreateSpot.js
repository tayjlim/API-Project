import {useState} from 'react';
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'

function CreateSpot  (){
    const [lng] = useState('null')
    const [lat] = useState('null')
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state,setState] = useState('')
    const [description, setDescription] = useState('');
    const [name,setName] = useState('')
    const [price,setPrice] = useState('')
    const [previewImage, setPreviewImage] = useState('')

    const [errors, setErrors] = useState({})

    const [img1, setImg1] = useState({
        url:'',
        preview:true
    })
    const [img2, setImg2] = useState({
        url:'',
        preview:true
    })
    const [img3, setImg3] = useState({
        url:'',
        preview:true
    })
    const [img4, setImg4] = useState({
        url:'',
        preview:true
    })

    const dispatch = useDispatch();
    const history = useHistory();


    return(
        <div id = 'createSpot'>
        <form>
        <h1>Create a new Spot</h1>

        <div className = 'countryDiv'>
            <label>Country</label>
                <input
                name='country'
                type = 'text'
                value = {country}
                placeholder='Please Enter Country'
                onChange = {(e) => setCountry(e.target.value)}
                />
        </div>

        <div className ='addressDiv'>
            <h2>Where is your place located?</h2>
            <label>Address</label>
                <input
                name='address'
                type = 'text'
                value = {address}
                placeholder='Enter Valid Address'
                onChange = {(e)=> setAddress(e.target.value)}
                />
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

    </div>

    <div className = 'imageInputDiv'>
        
    </div>
    </form>
</div>
        )
}

export default CreateSpot
