import { useRef, useEffect } from 'react'
import TimeButton from './TimeButton.jsx'
import arrow from '../assets/arrow.svg'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'


const HOURS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

export default function TimeCarousel({ activeTime, setActiveTime }) {
    const carouselRef = useRef(null)
    const scope = useRef(null)
    const buttonRefs = useRef({})

    //Scroll to proper button when activetime changes
    useEffect(() => {
        const carousel = carouselRef.current
        const activeButton = buttonRefs.current[activeTime]
        if (carousel && activeButton) {
            carousel.scrollTo({
                left: activeButton.offsetLeft - carousel.offsetWidth / 2 + activeButton.offsetWidth / 2,
                behavior: 'smooth'
            })
        }
    }, [activeTime])

    //Logic at scroll-end
    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        const handleScrollEnd = () => {
            const carousel = carouselRef.current
            const carouselCenter = carousel.scrollLeft + carousel.clientWidth / 2
            let minDistance = Infinity
            let closestTime = null
            HOURS.forEach(hour => {
                const button = buttonRefs.current[hour]
                if (button) {
                    const buttonCenter = button.offsetLeft + button.offsetWidth / 2
                    const distance = Math.abs(carouselCenter - buttonCenter)

                    if (distance < minDistance) {
                        minDistance = distance
                        closestTime = hour
                    }
                }
            })
            //Control !== null because 0 is a falsy value
            if (closestTime !== null && closestTime !== activeTime) {
                setActiveTime(closestTime)
            }
        };

        carousel.addEventListener('scrollend', handleScrollEnd);    // 'scrollend' is better than onScrollEnd because it trigger only one time (while onScrollEnd trigger multiple times)
        return () => {
            if (carousel) {
                carousel.removeEventListener('scrollend', handleScrollEnd);
            }
        };
    }, [activeTime, setActiveTime]);

    const handleArrows = (direction) => {
        if (direction === 'back') {
            if (activeTime === 0) {
                return
            }
            setActiveTime(activeTime - 1)
        }
        else if (direction === 'next') {
            if (activeTime === 23) {
                return
            }
            setActiveTime(activeTime + 1)
        }
    }

    useGSAP(() => {
        gsap.fromTo(scope.current,
            {
                opacity: 0,
                scale: 0.5,
            },
            {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: 'power2.out'
            }
    )}, [])

    return (
        <div ref={scope} className='relative h-12'>
            <img onClick={() => handleArrows('back')} className='absolute rotate-180 top-1/2 left-2 w-4 h-4 transform -translate-y-1/2 cursor-pointer' src={arrow} />
            <div className='absolute w-10/12 max-w-[400px] h-full flex left-1/2 transform -translate-x-1/2 overflow-x-scroll scrollbar-hidden snap-x snap-mandatory' ref={carouselRef}>
                <TimeButton/>
                <TimeButton/>
                {HOURS.map(hour => (
                    <TimeButton
                        key={hour}
                        time={hour}
                        active={hour === activeTime}
                        ref={element => (buttonRefs.current[hour] = element)}
                        setActiveTime={setActiveTime}
                    />
                ))}
                <TimeButton/>
                <TimeButton/>
            </div>
            <img onClick={() => handleArrows('next')} className='absolute top-1/2 right-2 w-4 h-4 transform -translate-y-1/2 cursor-pointer' src={arrow} />
        </div>
    )
}