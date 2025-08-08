import styles from './SunPosition.module.css'

export default function SunPosition({ activeTime, sunrise, sunset }) {
    activeTime = Number(activeTime);
    sunrise = sunrise.getHours();
    sunset = sunset.getHours();

    const calcOffset = () => {
        //Calc offset for sun
        if (activeTime >= sunrise && activeTime <= sunset) {
            if (sunrise < sunset) {
                const dayHours = sunset - sunrise
                const offset = (activeTime - sunrise) / dayHours * 100
                return offset;
            }
        }
        //Calc offset for moon
        else if (activeTime < sunrise || activeTime > sunset) {
            const nightHours = 24 - (sunset - sunrise);
            if (activeTime > sunset) {
                return((activeTime - sunset) / nightHours * 100)
            }
            else if (activeTime < sunrise) {
                return((24 - sunset) + activeTime) / nightHours * 100
            }
        }
    }
    const offset = {
        left: `${calcOffset()}%`
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.bar}></div>
                <div className={`${styles.sun} ${activeTime >= sunrise && activeTime <= sunset ? "" : styles.moon}`} style={offset}></div>
            </div>
        </>
    )
}