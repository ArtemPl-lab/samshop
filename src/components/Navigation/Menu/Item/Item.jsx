import { useLocation } from 'react-router-dom';
import styles from './Item.module.css';


const MenuItem = ({ item }) => {
    const location = useLocation();
    const isActive = location.pathname.includes(item.props.to);
    return(
        <li className={`${styles.item} ${isActive ? styles.active : ''} ${item.bage ? styles.bage : ''}`}>
            <item.component {...item.props}>
                {item.content}
            </item.component>
        </li>
    );
}

export default MenuItem;