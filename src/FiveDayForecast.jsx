import React, { useState, useEffect } from 'react'
import axios from 'axios'



function FiveDayForecast() {

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [weather, setWeather] = useState("");
    const [temperature, setTemperature] = useState(0);

    

  
   
  
    const savePositionToState = (position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    };
  
    const fetchWeather = async () => {
      try {
        await window.navigator.geolocation.getCurrentPosition(
          savePositionToState
        );
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`
        );
        const res2 = await axios.get(
          `${process.env.REACT_APP_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`
        );
  
        setTemperature(Math.round(res.data.main.temp));
        setWeather(res.data.weather[0].main);

  
  
        console.log(res.data, res2.data);
      } catch (err) {
        console.error(err);
      }
    };
  
    useEffect(() => {
      fetchWeather();
    }, [latitude, longitude]);


    return (
        <div>
        <div className="five_day_forecast">
            <div className="temp_body">
                <h2 className="temperature">{temperature}ºF</h2>
                <h2 className="description">{weather}</h2>
              </div>
              <div className="temp_body">
                <h2 className="temperature">{temperature}ºF</h2>
                <h2 className="description">{weather}</h2>
              </div>
              <div className="temp_body">
                <h2 className="temperature">{temperature}ºF</h2>
                <h2 className="description">{weather}</h2>
              </div>
              <div className="temp_body">
                <h2 className="temperature">{temperature}ºF</h2>
                <h2 className="description">{weather}</h2>
              </div>
              <div className="temp_body">
                <h2 className="temperature">{temperature}ºF</h2>
                <h2 className="description">{weather}</h2>
              </div>
            </div>
        </div>
    )
}

export default FiveDayForecast
