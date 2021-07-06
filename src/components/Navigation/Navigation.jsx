import { useStore } from '../../store/store';
import Menu from './Menu/Menu';
import styles from './Navigation.module.css';
import { Link } from 'react-router-dom';

const Navigation = props => {
    const { user } = useStore();
    return(
        <nav className={styles.wrapper}>
            <Link to={`/accounts/${user.data.id}`} className={styles.userlink}>
                <div className={styles.username}>
                    {user.data.name}
                </div>
            </Link>
            <Menu />
        </nav>
    );
}

export default Navigation;