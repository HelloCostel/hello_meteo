import { useState, useEffect, useRef } from 'react'

export default function Widget({ children }) {
    const ref = useRef(null)
    const [height, setHeight] = useState(0)

    useEffect(() => {
        const handleHeight = () => {
            if (ref.current) {
                setHeight(ref.current.offsetWidth)
            }
        }
        handleHeight()

        window.addEventListener('resize', handleHeight)
        return () => window.removeEventListener('resize', handleHeight)
    })

    return (
        <div ref={ref} className='relative w-full p-2 flex justify-center items-center glass rounded-4xl' style={{ height: `${height}px` }}>{children}</div>
    )
}
