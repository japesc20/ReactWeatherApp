import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Route, Switch, Link } from 'react-router-dom';

import BannerImage from './images/weather_logo.png'
import CurrentWeather from "./CurrentWeather";
import FiveDayForecast from "./FiveDayForecast";

const App = () => {


  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("")


  const date = new Date().toLocaleString().split(',')[0];

 

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


      setCityName(res.data.name);
      setCountry(res.data.sys.country);



      console.log(res.data, res2.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [latitude, longitude]);


    return (
      <div className='App'>
        <div className='container'>
          <div className="banner">
            <img 
            src={BannerImage}
            style={{width: '80px'}}
            />
            <span className="location">
              <h1>React Weather Report</h1>
              <h4>{date} {cityName}, {country}</h4>
            </span>
            <a href="/">
              <button className="custom-btn btn-1">
              <Link to="/FiveDayForecast">5-Day Forecast</Link>
              </button></a>
          </div>

          
          <CurrentWeather />
          <FiveDayForecast />


        </div>
      </div>
    );
  }

export default App;

