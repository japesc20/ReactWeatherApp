import React, { useState, useEffect } from 'react'
import axios from "axios";

import WindGust from './images/wind_speed.png'
import RealFeel from './images/realfeel.png'



function CurrentWeather() {

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [weather, setWeather] = useState("");
    const [temperature, setTemperature] = useState(0);
    const [iconID, setIconID] = useState("");
    const [realFeel, setRealFeel] = useState("");
    const [forecastDescription, setforecastDescription] = useState("");
    const [windSpeed, setWindSpeed] = useState("");
  
   
    // Getting users location
    const savePositionToState = (position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    };
  
    // Fetching Weather Data
    const fetchWeather = async () => {
      try {
        await window.navigator.geolocation.getCurrentPosition(
          savePositionToState
        );
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`
        );

          // Setting data states
        setTemperature(Math.round(res.data.main.temp));
        setWeather(res.data.weather[0].main);
        setIconID(res.data.weather[0].icon);
        setRealFeel(res.data.main.feels_like);
        setforecastDescription(res.data.weather[0].description);
        setWindSpeed(res.data.wind.speed);

      } catch (err) {
        console.error(err);
      }
    };
  
    useEffect(() => {
      fetchWeather();
    }, [latitude, longitude]);


    return (
        <div>
            <div className="card_body">
              <div className="temp_body">
                <h2 className="temperature">{temperature}ºF</h2>
                <h2 className="description">{weather}</h2>
              </div>
              <div className="misc_body">
                <div className="forecast spacing">
                  <span className="misc_title">Forecast:</span> 
                  <img 
                  alt=""
                  src={`${process.env.REACT_APP_ICON_URL}/${iconID}.png`} 
                  style={{width: '80px'}}
                  />
                  <span className="desc_output">{forecastDescription}</span>
                </div>
                <div className="wind spacing">
                  <span className="misc_title">Wind Speed:</span> 
                    <img 
                    alt=""
                    src={WindGust} />
                    <span className="desc_output">{windSpeed} mph</span>
                </div>
                <div className="real_feel spacing">
                  <span className="misc_title">Real Feel:</span> 
                    <img 
                    alt=""
                    src={RealFeel} 
                    style={{width: '80px'}}
                    />
                    <span className="desc_output">{realFeel} ºF</span>
                </div>
              </div>
            </div>
        </div>
    )
}

export default CurrentWeather
