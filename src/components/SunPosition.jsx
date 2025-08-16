import { useState, useEffect } from 'react'

export default function SunPosition({ activeTime, sunrise, sunset }) {
    const [eOffset, setEOffset] = useState(0)
    const [message, setMessage] = useState('')

    const sunriseHour = sunrise.getHours();
    const sunsetHour = sunset.getHours();

    useEffect(() => {
        //Sun position at current hour
        if (activeTime < sunriseHour) {
            setEOffset(0)
        }
        else if (activeTime > sunsetHour) {
            setEOffset(100)
        }
        else if (activeTime >= sunriseHour && activeTime <= sunsetHour) {
            if (sunriseHour < sunsetHour) {
                const dayHours = sunsetHour - sunriseHour
                const offset = (activeTime - sunriseHour) / dayHours * 100
                setEOffset(offset)
            }
        }

        //Hours left to sunrise or sunset
        if (activeTime >= sunriseHour && activeTime <= sunsetHour) {
            setMessage(`${sunsetHour - activeTime} hours to sunset`)
        }
        //Sunrise of next day is aproximately the same as sunrise of current day. Until we don't count minutes, we can use data from current day avoiding more complex API request.
        else if (activeTime < sunriseHour) {
            setMessage(`${sunriseHour - activeTime} hours to sunrise`)
        }
        else if (activeTime > sunsetHour) {
            setMessage(`${(24 - activeTime) + sunriseHour} hours to sunrise`)
        }
    }, [])

    return (
        <>
            <div className='relative w-11/12 max-w-[600px] flex justify-center items-center mt-12 transform -translate-x-1/2 left-1/2'>
                <div className='w-full h-0.5 bg-gray-400'></div>
                <div className='absolute w-8 h-8 rounded-full sun-gradient transform -translate-x-1/2' style={{left: `${eOffset}%`}}></div>
            </div>
            <div className='relative w-11/12 max-w-[600px] flex justify-between items-center left-1/2 mt-4 transform -translate-x-1/2'>
                    <div className='text-gray-400 font-bold'>{sunriseHour}.{sunrise.getMinutes()}</div>
                    <div className='text-gray-400 font-bold'>{message}</div>
                    <div className='text-gray-400 font-bold'>{sunsetHour}.{sunset.getMinutes()}</div>
            </div>
        </>
    )
}