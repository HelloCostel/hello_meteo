import { useRef, useEffect } from 'react'
import styles from './TimeCarousel.module.css'
import TimeButton from '../TimeButton/TimeButton.jsx'

const HOURS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']

export default function TimeCarousel({ activeTime, setActiveTime }) {
    const carouselRef = useRef(null)
    const buttonRefs = useRef({})

    //Default time is current hour
    useEffect(() => {
        const carousel = carouselRef.current
        const activeButton = buttonRefs.current[activeTime]
        //Automatic scroll to default time
        if (carousel && activeButton) {
            const scrollLeft = activeButton.offsetLeft - (carousel.clientWidth / 2) + (activeButton.offsetWidth / 2)
            carousel.scrollTo({ left: scrollLeft, behavior: 'auto' })
        }
    }, [])

    // Update active time based on carousel scroll
    useEffect(() => {
        const carousel = carouselRef.current
        if (!carousel) return

        let scrollTimeout
        const handleScroll = () => {
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
            if (closestTime && closestTime !== activeTime) {
                setActiveTime(closestTime)
            }
        }

        const debouncedScrollHandler = () => {
            clearTimeout(scrollTimeout)
            // Slower scroll event listener to enhance performance
            scrollTimeout = setTimeout(handleScroll, 10)
        }

        carousel.addEventListener('scroll', debouncedScrollHandler)

        return () => {
            clearTimeout(scrollTimeout)
            carousel.removeEventListener('scroll', debouncedScrollHandler)
        }
    }, [activeTime])

    return (
        <div className={styles.carousel} ref={carouselRef}>
            <div className={styles.space}></div>
            <div className={styles.space}></div>
            {HOURS.map(hour => (
                <TimeButton
                    key={hour}
                    time={hour}
                    active={hour === activeTime}
                    ref={element => (buttonRefs.current[hour] = element)}
                />
            ))}
            <div className={styles.space}></div>
            <div className={styles.space}></div>
        </div>
    )
}