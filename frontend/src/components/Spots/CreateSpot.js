import {useState} from 'react';
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { createSpot,addImage } from '../../store/spots';
import './CreateSpot.css'

function CreateSpot  (){
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

    const [previewImage, setPreviewImage] = useState({
        url:'',
        preview:true
    })

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


    //handle submit function

    const handleSubmit = async (e) =>
    {   //make spot
        e.preventDefault();

        const spot ={
            country,
            lng,
            lat,
            address,
            city,
            state,
            description,
            name,
            price,
        }
        const validFiles = ['png','jpg','jpeg']
        const validImages =[];
        const er = {};
        // createing the error object
        //Country
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

        if(!previewImage || previewImage===null || previewImage.url === '') er.previewImage = 'Preview Image is required!'

        //image error handling

        if(previewImage){
            let split = previewImage.url.split('.')
            !validFiles.includes(split[split.length-1]) ? er.previewImage1 = 'Image URL must end in .png, .jpg, or .jpeg' : validImages.push(previewImage)
        }

        if(img1.url){
            let split = img1.url.split('.')
            !validFiles.includes(split[split.length-1]) ? er.img1 = 'Image URL must end in .png, .jpg, or .jpeg' : validImages.push(img1)
        }

        if(img2.url){
            let split = img2.url.split('.')
            !validFiles.includes(split[split.length-1]) ? er.img2 = 'Image URL must end in .png. .jpg, or .jpeg' : validImages.push(img2)
        }

        if(img3.url){
            let split = img3.url.split('.')
            !validFiles.includes(split[split.length-1]) ? er.img3 = 'Image URL must end in .png. .jpg, or .jpeg' : validImages.push(img1)
        }

        if(img4.url){
            let split = img4.url.split('.')
            !validFiles.includes(split[split.length-1]) ? er.img4 = 'Image URL must end in .png. .jpg, or .jpeg' : validImages.push(img4)
        }

        //error setter
        if(Object.values(er).length >0)
        setErrors(er)

        else{
            //dispatch spot and dispatch the images (through for loops)
           const newSpot =  await dispatch(createSpot(spot))
           // add images to corresponding spot!
            for(let image of validImages){
            await dispatch(addImage(newSpot.id,image))
            }
            history.push(`/spots/${newSpot.id}`)
        }
    }

    return(
        <div id = 'createSpot'>
            <img className = 'oak' src='https://cdn.discordapp.com/attachments/1090663657639268482/1107105703287603251/latest.png'></img>
            <form onSubmit={handleSubmit}className='createForm'>

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
        Create Spot
        </button>

        </div>


            </form>
        </div>
        )
}

export default CreateSpot
