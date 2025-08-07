import styles from './UvIndex.module.css'


export default function UvIndex({ level }) {
    return (
        <div className={styles.uvIndex}>
            {/* <img className={styles.uvImg} src={uvImg}/> */}
            <div>{level}</div>
        </div>
    )
}