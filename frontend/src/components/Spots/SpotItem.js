import { useHistory } from "react-router-dom";


const SpotItem = ({spot}) => {

  const history = useHistory();

  const handleClick = () =>{
    history.push(`/spots/${spot.id}`)
  }

    return(
     <div id = {spot.id} className = 'spotContainer'>
       <img onClick ={handleClick}className = 'spotImage'src = {spot.previewImage} alt = {spot.name}/>
        <div className = 'citystatestars'>
          <p>{spot.city} , {spot.state}</p>
          <div className="rating">
              <i className="fa-solid fa-star" />
              {" · "} {spot.avgRating ? Number(spot.avgRating).toFixed(2) : "New!"}
            </div>
        </div>
        <p className="price">${spot.price}</p>


     </div>
    )

}

export default SpotItem;
