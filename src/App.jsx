import { useState, useEffect } from 'react'
import './App.css'

//Open-meteo API
import { fetchWeatherApi } from 'openmeteo'
const meteoUrl = "https://api.open-meteo.com/v1/forecast"

//Child components
import Search from './components/Search.jsx'
import Weather from './components/Weather.jsx'
import TimeCarousel from './components/TimeCarousel.jsx'

export default function App() {
  //TO DO --> Update to use current device location as default coordinates
  const currentHour = new Date().getHours().toString()
  const [lat, setLat] = useState(41.89)
  const [lon, setLon] = useState(12.48)
  const [activeTime, setActiveTime] = useState(currentHour)
  const [weather, setWeather] = useState();

  //Get coordinates from nominatim.org
  const getCoordinates = async (cityName) => {
    const cityUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityName)}&format=json&addressdetails=1`
    try {
      const response = await fetch(cityUrl)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      if (data.length > 0) {
        setLat(parseFloat(data[0].lat).toFixed(2))
        setLon(parseFloat(data[0].lon).toFixed(2))
        console.log(`Coordinate di ${cityName}: Latitudine: ${lat}, Longitudine: ${lon}`)
      }
    } catch (error) {
      console.error('Error while fetching coordinates:', error)
    }
  }

  //Get weather data from open-meteo.com
  const params = {
    "latitude": lat,
    "longitude": lon,
    "daily": ["sunrise", "sunset"],
    "hourly": ["temperature_2m", "weather_code", "wind_speed_10m", "wind_direction_10m", "uv_index", "is_day"],
    "timezone": "auto",
    "forecast_days": 1,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await fetchWeatherApi(meteoUrl, params)
        //Process first location. Add a for-loop for multiple locations or weather models
        const response = responses[0]
        
        // Attributes for timezone and location
        const latitude = response.latitude();
        const longitude = response.longitude();
        const elevation = response.elevation();
        const utcOffsetSeconds = response.utcOffsetSeconds();
        console.log(
          `\nCoordinates: ${latitude}°N ${longitude}°E`,
          `\nElevation: ${elevation}m asl`,
          `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
        );

        const hourly = response.hourly();
        const daily = response.daily();

        // Define Int64 variables so they can be processed accordingly
        const sunrise = daily.variables(0);
        const sunset = daily.variables(1);

        // Note: The order of weather variables in the URL query and the indices below need to match!
        const weatherData = {
          hourly: {
            time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
              (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
            ),
            temperature_2m: hourly.variables(0).valuesArray(),
            weather_code: hourly.variables(1).valuesArray(),
            wind_speed_10m: hourly.variables(2).valuesArray(),
            wind_direction_10m: hourly.variables(3).valuesArray(),
            uv_index: hourly.variables(4).valuesArray(),
            is_day: hourly.variables(5).valuesArray(),
          },
          daily: {
            time: [...Array((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval())].map(
              (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
            ),
            // Map Int64 values to according structure
            sunrise: [...Array(sunrise.valuesInt64Length())].map(
              (_, i) => new Date((Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000)
            ),
            // Map Int64 values to according structure
            sunset: [...Array(sunset.valuesInt64Length())].map(
              (_, i) => new Date((Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000)
            ),
          },
        }
        // 'weatherData' now contains a simple structure with arrays with datetime and weather data
        setWeather(weatherData)
      }
      catch (error) {
        console.error('Error while fetching weather data:', error)
      }
    }
    fetchData()
  }, [lat, lon])

  return (
    <>
      <Search getCoordinates={getCoordinates}/>
      {weather && <Weather weather={weather} activeTime={activeTime}/>}
      <TimeCarousel activeTime={activeTime} setActiveTime={setActiveTime}/>
    </>
  )
}
