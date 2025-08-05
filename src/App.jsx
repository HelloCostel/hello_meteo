import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Search from './components/Search.jsx'

function App() {

    //TO DO --> Update to use current device location as default coordinates

  const [lat, setLat] = useState(41.89)
  const [lon, setLon] = useState(12.48)

  //Get coordinates form nominatim.org
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

  return (
    <>
      <Search getCoordinates={getCoordinates}/>
      <p>Latitudine: {lat}</p>
      <p>Longitudine: {lon}</p>
    </>
  )
}

export default App
