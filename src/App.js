import Search from "./Components/Search/Search";
import CurrentWeather from "./Components/Search/current-weather/CurrentWeather";
import "./App.css";
import { WeatherApiKey} from "./Components/Search/Api"
import { WeatherApiUrl } from "./Components/Search/Api";
import { useState } from "react";
function App() {
  const [currentWeather,setCurrentweather] = useState(null);
  const [forecast,setForecast] = useState(null);
 const onSearchChange = (data) =>{
    const [lat,lon] = data.value.split(" ");
    console.log(lat);
    const currentweatherfetch = fetch(`${WeatherApiUrl}/weather?lat=${lat}&lon=${lon}&appid=${WeatherApiKey}&units=metric`)
    const forecastfetch = fetch(`${WeatherApiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${WeatherApiKey}&units=metric`)
    Promise.all([currentweatherfetch,forecastfetch])
    .then(async(Response)=>{
       const weatherResponse = await Response[0].json();
       const forecastResponse = await Response[1].json();
       setCurrentweather({city:data.label, ...weatherResponse});
       setForecast({city:data.label, ...forecastResponse});
    })
    .catch((e)=> {
      console.log(e);
    })
  }
  console.log(currentWeather)
  console.log(forecast)

  return (
    <div className="container">
      <Search onSearchChange ={onSearchChange}/>
      {currentWeather && <CurrentWeather data = {currentWeather}/>}
    </div>
  );
}

export default App;
