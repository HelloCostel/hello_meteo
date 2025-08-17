import { useState, useEffect } from 'react'
import sun from '../assets/sun.svg'

export default function SunPosition({ currentHour, sunrise, sunset }) {
    const [eOffset, setEOffset] = useState(0)
    const [message, setMessage] = useState('')

    const sunriseHour = sunrise.getHours() - 2;
    const sunsetHour = sunset.getHours() - 2;

    useEffect(() => {
        //Sun position at current hour
        if (currentHour < sunriseHour) {
            setEOffset(0)
        }
        else if (currentHour > sunsetHour) {
            setEOffset(100)
        }
        else if (currentHour >= sunriseHour && currentHour <= sunsetHour) {
            if (sunriseHour < sunsetHour) {
                const dayHours = sunsetHour - sunriseHour
                const offset = (currentHour - sunriseHour) / dayHours * 100
                setEOffset(offset)
            }
        }

        //Hours left to sunrise or sunset
        if (currentHour >= sunriseHour && currentHour <= sunsetHour) {
            setMessage(`${sunsetHour - currentHour} hours to sunset`)
        }
        //Sunrise of next day is aproximately the same as sunrise of current day. Until we don't count minutes, we can use data from current day avoiding more complex API request.
        else if (currentHour < sunriseHour) {
            setMessage(`${sunriseHour - currentHour} hours to sunrise`)
        }
        else if (currentHour > sunsetHour) {
            setMessage(`${(24 - currentHour) + sunriseHour} hours to sunrise`)
        }
    }, [])

    return (
        <>
            <div className='relative w-11/12 max-w-[600px] flex justify-center items-center mt-12 transform -translate-x-1/2 left-1/2'>
                <div className='w-full h-0.5 bg-gray-400'></div>
                <img className='absolute w-16 h-16 rounded-full transform -translate-x-1/2' style={{left: `${eOffset}%`}} src={sun}/>
            </div>
            <div className='relative w-11/12 max-w-[600px] flex justify-between items-center left-1/2 mt-4 transform -translate-x-1/2'>
                    <div className='text-gray-400 font-bold'>{sunriseHour}.{sunrise.getMinutes()}</div>
                    <div className='text-gray-400 font-bold'>{message}</div>
                    <div className='text-gray-400 font-bold'>{sunsetHour}.{sunset.getMinutes()}</div>
            </div>
        </>
    )
}