import "./Home.css"

import Image from "../Images/location-pin.png"
import { useEffect } from "react"
export const Home = ()=>{


useEffect(()=>{
    getData()
},[])

const getData =async ()=>{
    
           let link =
             "https://api.openweathermap.org/data/2.5/onecall?lat=" +
             "28.6667" +
             "&lon=" +
             "77.2167" +
             "&exclude=minutely,alerts&units=metric&appid=e4c70ce6a6821649a416cb9521d5f4f8";
      await fetch(link)
        .then((resp) => resp.json())
        .then((dataa) => {
          console.log(dataa, "dfdkfdk")
        });
  
}

  return <div id="mainhome">
    <div id="box">
        <img src={Image} alt="" id="locsign"/>
        <input id="searchbox" type="text" placeholder="City Name" />
        <button>Search</button>
    </div>
  </div>
}