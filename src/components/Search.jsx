import { useState } from 'react'

export default function Search({ getCoordinates }) {
    const [city, setCity] = useState('')

    const callGetCoordinates = (e) => {
        e.preventDefault()
        if (city) {
            getCoordinates(city)
        }
    }

    return (
        <>
            <form>
                <input type="text" placeholder='Search for a city' onChange={(e) => setCity(e.target.value)}/>
                <input type="submit" value="Search" onClick={callGetCoordinates}/>
            </form>
        </>
    )
}