import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import Toggle from '../Toggle/Toggle';
import styles from './CompilationCard.module.css';

const CompilationCard = ({ id, title }) => {
    return(
        <Card className={styles.card}>
            <Link className={styles.title} to={`/compilation/${id}`}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="1" width="12" height="2" rx="1" fill="#BBBFDB"/>
                    <rect y="5" width="12" height="2" rx="1" fill="#BBBFDB"/>
                    <rect y="9" width="12" height="2" rx="1" fill="#BBBFDB"/>
                </svg>
                {title}
            </Link>
            <Toggle onChange={()=>console.log("sdfd")}/>
        </Card>
    )
}

export default CompilationCard;