import { forwardRef } from 'react'
import styles from './TimeButton.module.css'

const TimeButton = forwardRef(({ time, active }, ref) => {

    return (
        <button className={`${styles.button} ${active ? styles.active : ''}`} ref={ref}>
            {time}
        </button>
    )
})

export default TimeButton