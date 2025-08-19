import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import compassDirection from '../assets/compass_direction.svg'
import compass from '../assets/compass.svg'


export default function Wind({ speed, direction }) {
    const directionRef = useRef(null)

    useGSAP(() => {
        gsap.to(directionRef.current, {
            rotation: direction + 180,
            duration: 0.8,
            ease: 'power2.out'
        })
    }, [direction])

    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>
            <img className='absolute h-11/12 w-11/12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' src={compass} alt="Bussola" />
            <div className='text-sm font-bold'>Wind<br /><span>{speed} Km/h</span></div>
            <img ref={directionRef} className='absolute' src={compassDirection} alt="Direzione del vento" />
        </div>
    )
}