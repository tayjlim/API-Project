import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/index";
import DeleteSpot from '../DeleteModal/DeleteSpot.js'

const SpotItem = ({spot,current}) => {

  const history = useHistory();
  let closeMenu;
  const handleClick = () =>{
    history.push(`/spots/${spot.id}`)
  }
    if(!spot)return null

    else
    return(
     <div id = {spot.id} className = 'spotContainer'>
       <img onClick ={handleClick} className = 'spotImage'src = {spot.previewImage} alt = {spot.name} title ={spot.name}/>

       <div className = 'citystatestars'>
          <p>{spot.city} , {spot.state}</p>

            <div className="rating">
              <i className="fa-solid fa-star" />
              {" · "} {spot.avgRating ? Number(spot.avgRating).toFixed(2) : "New!"}
            </div>

        </div>
        <p className="price">${spot.price}, Night</p>

        {current === true ? (<div className = 'buttonDiv'>
        <button className = 'updateButton' onClick ={()=>history.push(`/spots/${spot.id}/edit`)}>
            Update
        </button>
        <OpenModalButton
            className = 'deleteButton'
            buttonText ='delete'
            onButtonClick = {closeMenu}
            modalComponent={<DeleteSpot spotId = {spot.id}/>}
        />
    </div>):null}


     </div>
    )

}

export default SpotItem;
