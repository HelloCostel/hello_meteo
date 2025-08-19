import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import sun from '../assets/sun.svg'

export default function SunPosition({ currentHour, sunrise, sunset }) {
    const sunRef = useRef(null);
    const scope = useRef(null);

    const sunriseHour = sunrise.getHours();
    const sunsetHour = sunset.getHours();

    let eOffset = 0;
    if (currentHour > sunsetHour) {
        eOffset = 100;
    } else if (currentHour >= sunriseHour) {
        const dayHours = sunsetHour - sunriseHour;
        if (dayHours > 0) {
            eOffset = ((currentHour - sunriseHour) / dayHours) * 100;
        }
    }

    let message = '';
    if (currentHour >= sunriseHour && currentHour <= sunsetHour) {
        message = `${sunsetHour - currentHour} hours to sunset`;
    } else if (currentHour < sunriseHour) {
        message = `${sunriseHour - currentHour} hours to sunrise`;
    } else {
        message = `${(24 - currentHour) + sunriseHour} hours to sunrise`;
    }

    useGSAP(() => {
        const tl = gsap.timeline();

        //Full component animation
        tl.from(scope.current, {
            opacity: 0,
            scale: 0.5,
            duration: 0.8,
            delay: 0.5,
            ease: 'power2.out'
        });

        //Sun animation
        tl.fromTo(sunRef.current, {
            left: '0%'
        }, {
            left: eOffset + '%',
            duration: 1.5,
            ease: 'power2.out'
        }, '<');
    }, []);

    return (
        <div ref={scope}>
            <div className='relative w-11/12 max-w-[600px] flex justify-center items-center mt-12 transform -translate-x-1/2 left-1/2'>
                <div className='w-full h-0.5 bg-gray-400'></div>
                <img ref={sunRef} className='absolute w-16 h-16 rounded-full transform -translate-x-1/2' src={sun} alt="Posizione del sole"/>
            </div>
            <div className='relative w-11/12 max-w-[600px] flex justify-between items-center left-1/2 mt-4 transform -translate-x-1/2'>
                    <div className='text-gray-400 font-bold'>{sunriseHour}.{sunrise.getMinutes()}</div>
                    <div className='text-gray-400 font-bold'>{message}</div>
                    <div className='text-gray-400 font-bold'>{sunsetHour}.{sunset.getMinutes()}</div>
            </div>
        </div>
    )
}