import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import BannerImage from './images/weather_logo.png'
import CurrentWeather from "./CurrentWeather";
import FiveDayForecast from "./FiveDayForecast";

const App = () => {

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("")

  // Creating date time
  const date = new Date().toLocaleString().split(',')[0];

 
  // Getting users location
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

      setCityName(res.data.name);
      setCountry(res.data.sys.country);


    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [latitude, longitude]);


    return (
      <Router>
        <div className='App'>
          <div className='container'>
            <div className="banner">
              <img 
              alt="Banner Logo"
              src={BannerImage}
              style={{width: '80px'}}
              />
              <span className="location">
                <h1>React Weather Report</h1>
                <h4>{date} {cityName}, {country}</h4>
              </span>
              <span className="buttons">
                <a href="/">
                  <button className="custom-btn btn-1">
                  <Link to="/">Current Weather</Link>
                  </button>
                </a>
                <a href="/">
                  <button className="custom-btn btn-1">
                  <Link to="/FiveDayForecast">5-Day Forecast</Link>
                  </button>
                </a>
              </span>
            </div>

            <Switch>
              <Route path="/" exact>
                <CurrentWeather />
              </Route>
              <Route path="/FiveDayForecast">
              <FiveDayForecast />
              </Route>
            </Switch>

          </div>
        </div>
      </Router>
    );
  }

export default App;

