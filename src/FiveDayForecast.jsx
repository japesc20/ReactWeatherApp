import React, { useState, useEffect} from 'react'
import axios from 'axios'
import './FiveDayForecast.css'


function FiveDayForecast() {

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [forecast, setForecast] = useState([]);

  
    const savePositionToState = (position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    };
  
    const fetchWeather = async () => {
      try {
        await window.navigator.geolocation.getCurrentPosition(
          savePositionToState
        );
        const res2 = await axios.get(
          `${process.env.REACT_APP_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`
        );


        setForecast(res2.data.list.map(item => [
          <div className="each_data_point">
            <li className="date_time" key={item.dt_txt}>{`Date & Time: ${item.dt_txt}`}</li>,
            <img className="icon" key={item.weather[0].icon} src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`} />,
            <li className="main_temp" key={item.main.temp}>{`Temp: ${item.main.temp}`}</li>
          </div>
        ]
        ))


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
                <p>{forecast}</p>

            </div>
            </div>
        </div>
    )
}

export default FiveDayForecast
