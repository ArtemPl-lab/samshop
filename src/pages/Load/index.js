import styles from './Load.module.css';

export const Load  = props => {
    return(
        <section className={styles.wrapper}>
            <div class={styles.ring}><div></div><div></div><div></div><div></div></div>
        </section>
    );
}