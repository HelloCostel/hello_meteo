import { useState } from 'react'

export default function Search({ getCoordinates }) {
    const [city, setCity] = useState('')
    const [visible, setVisible] = useState(false)

    const callGetCoordinates = (e) => {
        e.preventDefault()
        if (city) {
            getCoordinates(city)
        }
    }

    const handleFocus = () => {
        setVisible(true)
    }

    const handleBlur = () => {
        setTimeout(() => {
            setVisible(false)
        }, 200)
    }

    return (
        <>
            <form className='w-full p-4 flex justify-center'>
                <input className='m-1 p-1 box-border max-w-[80%] text-3xl text-center font-bold text-gray-600 border-none shadow rounded-full focus:outline-none focus:shadow-sky-300' type="text" placeholder='Search city' onChange={(e) => setCity(e.target.value)} onFocus={handleFocus} onBlur={handleBlur}/>
                {visible &&
                    <input className='m-1 p-1 box-border text-l text-center font-bold text-white bg-sky-300 rounded-full' type="submit" value="Search" onClick={callGetCoordinates}/>
                }
            </form>
        </>
    )
}