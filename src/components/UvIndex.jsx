import { useState, useEffect } from 'react'
import uvAlert from '../assets/uv_alert.svg'
import uvOk from '../assets/uv_ok.svg'


export default function UvIndex({ level }) {
    const [uvIndex, setUvIndex] = useState()

    useEffect(() => {
        if (level < 3) {
            setUvIndex("Low")
        }
        else if (level < 6) {
            setUvIndex("Moderate")
        }
        else if (level < 8) {
            setUvIndex("High")
        }
        else if (level < 10) {
            setUvIndex("Very high")
        }
        else {
            setUvIndex("Extreme")
        }
    })

    return (
        <div className='flex flex-col items-center justify-center'>
            <img className='h-1/2 w-1/2 ' src={level >= 3 ? uvAlert : uvOk} />
            <div className='text-sm text-center font-bold'>{level >= 3 ? 'Use sun protection' : 'Low risk of sun exposure'}</div>
        </div>
    )
}