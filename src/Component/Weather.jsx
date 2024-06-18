import React, { useEffect, useState, useRef } from 'react'
import '../index.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
let data;
const Weather = () => {
  const inputRef=useRef()
  const [weatherData,setWeatherData]=useState({
    
  });

  const weather_icon={
    "01d":clear_icon,
    "01n":clear_icon,
    "02d":cloud_icon,
    "02n":cloud_icon,
    "03d":cloud_icon,
    "03n":cloud_icon,
    "04d":drizzle_icon,
    "04n":drizzle_icon,
    "09d":rain_icon,
    "09n":rain_icon,
    "10d":rain_icon,
    "10n":rain_icon,
    "13d":snow_icon,
    "13n":snow_icon

  }
  
  const weatherCast= async(city)=>{
    try{
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`
      const response= await fetch(url);
      data=await response.json();
      console.log(data);
      const icon=weather_icon[data.weather[0].icon] || clear_icon
      setWeatherData({
        humidity:data.main.humidity,
        temp:Math.round(data.main.temp),
        wind:data.wind.speed,
        name:data.name,
        icon:icon
      })
      const prev=document.getElementById('searchBar')
      prev.value=''
    }
    catch (err){
      // console.log(err.message)
    }
  }


    useEffect(()=>{
      weatherCast("london")
    },[])


  return (
    <div className='card'>
      <div className="search">
          <input type="text" className="searchBar" id="searchBar"placeholder=' Enter city' ref={inputRef}/>
          <img src={search_icon} alt="" id='searchicon' className='search-icon' onClick={()=>weatherCast(inputRef.current.value)}/>
      </div>
      <div className="temperature">
        <img src={weatherData.icon} alt="" />
        <p>{weatherData.temp}°C</p>
        <p>
          {weatherData.name}
        </p>
      </div>

      <div className="columns">
        <div className="wind ">
          <div className="wind-flex">
            <img src={wind_icon} alt="" className='col-img'/>
            <p className='col-p'>{weatherData.wind}km/h</p>
          </div>
          <p>Wind</p>
        </div>

        <div className="humidity ">
          <div className="humidity-flex">

            <img src={humidity_icon} alt="" className='col-img'/>
            <p className='col-p'>{weatherData.humidity}%</p>
          </div>
          <p>Humidity</p>
        </div>
      </div>
    </div>

  )
}

export default Weather