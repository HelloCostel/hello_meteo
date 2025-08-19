import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

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

    useGSAP(() => {
        gsap.fromTo(ref.current,
        {
            opacity: 0,
            scale: 0.5,
            y: 150
        },
        {
            opacity: 1,
            scale: 1,
            y: 0,
            delay: 0.6,
            duration: 0.8,
            ease: 'power2.out'
        })
    })

    return (
        <div ref={ref} className='relative w-full p-2 flex justify-center items-center glass rounded-4xl' style={{ height: `${height}px` }}>{children}</div>
    )
}
