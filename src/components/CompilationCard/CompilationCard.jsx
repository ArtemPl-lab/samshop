import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import Toggle from '../Toggle/Toggle';
import styles from './CompilationCard.module.css';

const CompilationCard = ({ id, title }) => {
    return(
        <Card className={styles.card}>
            <Link className={styles.title} to={`/compilation/${id}`}>
                <img src="/burger.svg" alt="Бургер-иконка" />
                {title}
            </Link>
            <Toggle onChange={()=>console.log("sdfd")}/>
        </Card>
    )
}

export default CompilationCard;