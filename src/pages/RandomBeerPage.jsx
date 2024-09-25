import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import beersJSON from "./../assets/beers.json";
import axios from "axios";
import defaultBeerImage from '../assets/DefaultBeer.jpg'



function RandomBeersPage() {
  
  // Mock initial state, to be replaced by data from the Beers API. Store the beer info retrieved from the Beers API in this state variable.
  const [randomBeer, setRandomBeer] = useState(beersJSON[0]);
  const url = "https://ih-beers-api2.herokuapp.com/beers/random"
  // React Router hook for navigation. We use it for the back button. You can leave this as it is.
  const navigate = useNavigate();
  const [isImageLoading, setIsImageLoading] = useState(true);


  const getRandom = async ()=>{
    const response = await axios.get(url)
    setRandomBeer(response.data)
  }

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = () => {
    let clone = structuredClone(randomBeer);
    clone.image_url = defaultBeerImage;
    setRandomBeer(clone)
    setIsImageLoading(false);
  };
  useEffect(()=>{
    getRandom()
    return()=>{}
  }, [])
  
  // TASKS:
  // 1. Set up an effect hook to make a request for a random beer from the Beers API.
  // 2. Use axios to make a HTTP request.
  // 3. Use the response data from the Beers API to update the state variable.



  // The logic and the structure for the page showing the random beer. You can leave this as it is.
  return (
    <div className="d-inline-flex flex-column justify-content-center align-items-center w-100 p-4">
      <h2>Random Beer</h2>

      {randomBeer && (
        <>
          <img
            src={randomBeer.image_url}
            alt="beer"
            height="300px"
            width="auto"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          <h3>{randomBeer.name}</h3>
          <p>{randomBeer.tagline}</p>
          <p>Attenuation level: {randomBeer.attenuation_level}</p>
          <p>Description: {randomBeer.description}</p>
          <p>Created by: {randomBeer.contributed_by}</p>

          <button
            className="btn btn-primary"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button>
        </>
      )}
    </div>
  );
}

export default RandomBeersPage;
