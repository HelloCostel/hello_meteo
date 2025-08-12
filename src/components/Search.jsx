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
        setVisible(false)
    }

    return (
        <>
            <form className='mb-8 flex items-center justify-center'>
                <input className='w-[300px] h-[50px] border border-sky-100 text-3xl text-center font-bold rounded-4xl focus:border focus:border-sky-200 text-gray-700' type="text" placeholder='Search city' onChange={(e) => setCity(e.target.value)} onFocus={handleFocus} onBlur={handleBlur}/>
                {visible &&
                    <input className='w-[100px] h-[50px] bg-sky-200 rounded-4xl m-0 flex-none' type="submit" value="Search" onClick={callGetCoordinates}/>
                }
            </form>
        </>
    )
}