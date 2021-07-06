import styles from './Image.module.css';

const Image = ({src, title, width, heigth}) => {
    return(
        <>
            <div className={styles.title}>
                {title}
            </div>
            <img src={src} alt={title} className={styles.image} height={heigth} width={width}/>
        </>
    );
}

export default Image;