import styles from './Widget.module.css'

export default function Widget({ children }) {
    return (
        <div className={styles.widget}>{children}</div>
    )
}