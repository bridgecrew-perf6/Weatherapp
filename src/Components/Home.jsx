import "./Home.css"
import axios from "axios"
import Image from "../Images/location-pin.png"
import Cloudy from "../Images/cloudy.png"
import Sunny from "../Images/sunny.png"
import { useEffect } from "react"
import { useState } from "react"
import Chart from "react-apexcharts";
export const Home = ()=>{

  let [currenttemp, setCurrent] = useState("");
  let [pressure, setPressure] = useState("")
  let [humid, setHumid] = useState("")
let [city, SetCity] = useState("")
let [hourlyFor, SetHourly] = useState([])
let [data, SetData] = useState([])
let [sunset, SetSunset] = useState("")
let [sunrise, SetSunrise] = useState("")
useEffect(()=>{
    getData()
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

const getData =async ()=>{
    
           let link =
             "https://api.openweathermap.org/data/2.5/onecall?lat=" +
             "28.6667" +
             "&lon=" +
             "77.2167" +
             "&exclude=minutely,alerts&units=metric&appid=e4c70ce6a6821649a416cb9521d5f4f8";
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
        
              setCurrent(DailyForecast[0].temp.day);
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
    
}
  return (
    <div id="mainhome">
      <div id="box">
        <img src={Image} alt="" id="locsign" />
        <input
          onChange={(e) => {
            SetCity(e.target.value);
            console.log(city);
          }}
          id="searchbox"
          type="text"
          placeholder="City Name"
        />
        <button onClick={handleClick}>Search</button>
      </div>
      <div id="secondbox">
        {data.map((item) => (
          <div className="databox">
            <b>{item.day}</b>
            <br />
            <b>
              {item.temp.max}° {item.temp.min}°{" "}
            </b>
            <br />
            <img
              className="imgsetting"
              src={item.clouds >= 50 ? Cloudy : Sunny}
              alt=""
            />
            <br />
            {item.clouds >= 50 ? <b>Cloudy </b> : <b>Sunny</b>}
          </div>
        ))}
      </div>
      <div id="thirdbox">
        <div className="graphbox">
          <b>{currenttemp}° C</b>
          <img
            className="imgsetting"
            src={currenttemp >= 50 ? Cloudy : Sunny}
            alt=""
          />
        </div>

        <Chart
          options={chartData.options}
          series={chartData.series}
          type="line"
          width="700"
        />
      </div>
      <div className="fourthbox">
        <div className="pressure">
          <b>Pressure</b>
          <br />
          <p>{pressure} hpa</p>

        </div>
         <div className="pressure">
         <b>
          Humidity
         </b>
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
  );
}