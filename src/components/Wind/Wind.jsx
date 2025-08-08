import styles from './Wind.module.css'
import compassDirection from '../../assets/compass_direction.svg'


export default function Wind({ speed, direction}) {

    const compassRotation = {
        transform: `rotate(${direction}deg)`,
    }

    return (
        <div className={styles.compass}>
            <div className={styles.speed}>Wind<br /><span>{speed} Km/h</span></div>
            <img className={styles.direction} src={compassDirection} style={compassRotation}/>
        </div>
    )
}