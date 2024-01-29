import React, { useState } from 'react'
import axios from 'axios';
import './WeatherApp.css'

import search_icon from "../Assets/search.png"
import clear_icon from "../Assets/clear.png"
import cloud_icon from "../Assets/cloud.png"
import drizzle_icon from "../Assets/drizzle.png"
import rain_icon from "../Assets/rain.png"
import snow_icon from "../Assets/snow.png"
import wind_icon from "../Assets/wind.png"
import humidity_icon from "../Assets/humidity.png"

export const WeatherTwo = () => {

    const [searchInput, setSearchInput] = useState("");
    const [data, setData] = useState({});
    const [wicon,setWicon] = useState(cloud_icon);
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const api_key = "4d8b5f2f3b9c310549a8e2f5e4173cba";

    const search = async () => {
        try{
            setError(false);
            setIsLoading(true);
        await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=Metric&appid=${api_key}`)
        .then((res)=>{
            console.log(res.data);
            setData(res.data);
            if(res.data.weather[0].icon === "01d" || res.data.weather[0].icon === "01n") {
                setWicon(clear_icon);
              }
              else if(res.data.weather[0].icon === "02d" || res.data.weather[0].icon === "02n") {
                setWicon(cloud_icon);
              }
              else if(res.data.weather[0].icon === "03d" || res.data.weather[0].icon === "03n") {
                setWicon(drizzle_icon);
              }
              else if(res.data.weather[0].icon === "04d" || res.data.weather[0].icon === "04n") {
                setWicon(drizzle_icon);
              }
              else if(res.data.weather[0].icon === "09d" || res.data.weather[0].icon === "09n") {
                setWicon(rain_icon);
              }
              else if(res.data.weather[0].icon === "10d" || res.data.weather[0].icon === "10n") {
                setWicon(rain_icon);
              }
              else if(res.data.weather[0].icon === "13d" || res.data.weather[0].icon === "13n") {
                setWicon(snow_icon);
              }
              else {
                setWicon(clear_icon);
              }
        })
        }catch(err) {
            console.log(err);
            setError(true);
        }
        finally{
            setIsLoading(false);
        }
    }

  return (
    <div className='container'>
      <div className='top-bar'>
        <input type="text" className="cityInput" placeholder='Search' value={searchInput} 
        onChange={(e)=>setSearchInput(e.target.value)}
        />
        <div className="search-icon" onClick={()=>{search()}}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      {isloading? <div>Loading</div>:
      <div>
      {error? <div>Not Found</div>:
      <div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">{data?.main?.temp && Math.floor(data.main.temp)+" °C"}</div>
      <div className="weather-location">{data?.name}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percentage">{data?.main?.humidity && data.main.humidity+" %"}</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">{data?.wind?.speed && Math.floor(data.wind.speed)+" km/h"}</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
      </div>
    }
      </div>
}
    </div>
  )
}
