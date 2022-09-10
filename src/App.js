import Search from "./components/search/search";
import "./App.css";
import CurrentWeather from "./current-weather/current-weather";
import { WEATHER_API_KEY, WEATHER_API_URL, FORECAST_API_URL } from "./api";
import { useState } from "react";

function App() {
  const [currentWeather, setCurrentweather] = useState(null);
  const [forecastweather, setForecastweather] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const CurrentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );
    const forecastFetch = fetch(
      `${FORECAST_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );
    Promise.all([CurrentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastresponse = await response[1].json();

        setCurrentweather({ city: searchData.label, ...weatherResponse });
        setForecastweather({ city: searchData.label, ...forecastresponse });
      })
      .catch((err) => console.log(err));
  };
  console.log(currentWeather);
  console.log(forecastweather);
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
    </div>
  );
}

export default App;
