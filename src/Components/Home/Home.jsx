import "./Home.css"
import axios from "axios"
import Image from "../../Images/location-pin.png"
import Cloudy from "../../Images/cloudy.png"
import Sunny from "../../Images/sunny.png"
import { useEffect } from "react"
import { useState } from "react"
import Chart from "react-apexcharts";
import { Second } from "../Secondbox/Second"
export const Home = ()=>{


  let [track, setTrack] = useState(false)
  let [currenttemp, setCurrent] = useState("");
  let [pressure, setPressure] = useState("")
  let [humid, setHumid] = useState("")
let [city, SetCity] = useState("pune")
let [hourlyFor, SetHourly] = useState([])
let [data, SetData] = useState([])
let [sunset, SetSunset] = useState("")
let [sunrise, SetSunrise] = useState("");
let [lat, setLat] = useState("");
let [lon, setLon] = useState("");
let [count, setCount] = useState(0) ;
let [clouds, setClouds] = useState(0);
useEffect(()=>{
   setTimeout(()=>{
    setTrack(true)
   }, 3000)
    newData();
},[])

const chartData = {
  options: {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: hourlyFor,
    },
  },

  series: [
    {
      name: "series-1",
      data: [0, 10, 20, 30, 40, 50],
    },
  ],
};

const newData = async ()=>{
  let link
  if (count == 0){
 link =
   "https://api.openweathermap.org/data/2.5/weather?q=" +
   "delhi" +
   "&units=metric&appid=e4c70ce6a6821649a416cb9521d5f4f8";
  setCount(count + 1)
  }else {
     link =
       "https://api.openweathermap.org/data/2.5/weather?q=" +
       city +
       "&units=metric&appid=e4c70ce6a6821649a416cb9521d5f4f8";

  }

 axios.get(link).then((response) => {
  console.log(response, " respooooooonse")
  console.log(response.data.coord.lat, " altttt ", response.data.coord.lon);
  setLat(response.data.coord.lat)
  setLon(response.data.coord.lon)
  
 });
 getData()
}

const getData =async ()=>{
  let link

  console.log(lat, " lat ", lon, " lon")
      if (count == 0){
   link =
     "https://api.openweathermap.org/data/2.5/onecall?lat=" +
     "28.6667" +
     "&lon=" +
     "77.2167" +
     "&exclude=minutely,alerts&units=metric&appid=e4c70ce6a6821649a416cb9521d5f4f8";
     setCount(count+1)
      }else {
  link =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=minutely,alerts&units=metric&appid=e4c70ce6a6821649a416cb9521d5f4f8";
   
      }
         axios.get(link).then((response) => {
        let DailyForecast = response.data.daily;
        let HourlyForecast = response.data.hourly;

        //Data Formatting- Changing the temp and date as required by UI

        DailyForecast.forEach((el, i) => {
          let date = new Date(el.dt * 1000).toDateString();

          DailyForecast[i].day = date.substring(0, 3);
          DailyForecast[i].temp.max = el.temp.max.toPrecision(2);
          DailyForecast[i].temp.min = el.temp.min.toPrecision(2);

          let rise = new Date(
            DailyForecast[i].sunrise * 1000
          ).toLocaleTimeString();
          let set = new Date(
            DailyForecast[i].sunset * 1000
          ).toLocaleTimeString();

          DailyForecast[i].sunrise = rise.substring(0, 4);
          DailyForecast[i].sunset = set.substring(0, 4);
        });

        SetData( DailyForecast);
        
              setCurrent(DailyForecast[0].temp.max);
        console.log(DailyForecast[0], "DFdfdfd");
        setPressure(DailyForecast[0].pressure)
        setHumid(DailyForecast[0].humidity)

        SetSunrise(DailyForecast[0].sunrise);
        SetSunset(DailyForecast[0].sunset)

        let k = []

        for (let i = 0; i < HourlyForecast.length; i++){
          k.push(HourlyForecast[i].temp)
        }
        console.log(k, " k")
SetHourly(k)

      });
  
}
console.log(hourlyFor, "dfdfd")
console.log(data, " data")
console.log(currenttemp, " cureent temp")
const handleClick = ()=>{
    newData();
 
}
  return (
    <div id="mainhome">
      {track == false ? (
        <div>.....loading</div>
      ) : (
        <div>
          <div id="box">
            <img src={Image} alt="" id="locsign" />
            <input
              onChange={(e) => {
                SetCity(e.target.value);
                console.log(city, " cityyyyy");
              }}
              id="searchbox"
              type="text"
              placeholder="Delhi"
            />
            <button id="searchbtn" onClick={handleClick}>
              Search
            </button>
          </div>
          <div id="secondbox">
            <Second
              data={data}
              Cloudy={Cloudy}
              Sunny={Sunny}
              setCurrent={setCurrent}
              setClouds={setClouds}
            />
          </div>
          <div id="thirdbox">
            <div className="graphbox">
              <b>{currenttemp}° C</b>
              <img
                className="newimgsetting"
                src={clouds >= 50 ? Cloudy : Sunny}
                alt=""
              />
            </div>

            <Chart
              options={chartData.options}
              series={chartData.series}
              type="line"
              width="100%"
            />
          </div>
          <div className="fourthbox">
            <div className="pressure">
              <b>Pressure</b>
              <br />
              <p>{pressure} hpa</p>
            </div>
            <div className="pressure">
              <b>Humidity</b>
              <br />
              <p>{humid}%</p>
            </div>
          </div>
          <div id="fifthbox">
            <div id="firbox">
              <b>Sunrise</b>
              <br />
              <p>{sunrise} am</p>
            </div>
            <div id="secbox">
              <b>Sunset</b>
              <br />
              <p>{sunset} pm</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}