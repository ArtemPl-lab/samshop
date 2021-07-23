import styles from './GoodCard.module.css';
import Image from '../Image/Image';
const GoodCard = props => {
    return(
        <div className={styles.wrapper}>
            <div className={styles.number}>
                №{props.index+1}
            </div>
            <div className={styles.card}>
                <Image 
                    id={props.photos[0]}
                    height={104}
                    width={104}
                />
                <div className={styles.category}>
                    {props.category_path}
                </div>
                <div className={styles.title}>
                    {props.title}
                </div>
            </div>
            <div className={styles.bulk} onClick={props.bulk}>
                Удалить
            </div>
        </div>
    );
}

export default GoodCard;