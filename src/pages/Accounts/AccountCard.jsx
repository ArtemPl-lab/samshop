import styles from './Accounts.module.css';
import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';
import { DiscountText } from '../../components/UiKit/UiKit';

const AccountCard = props => {
    return(
        <Card className={styles.card}>
            {props.name}
            <div className={styles.discount}>
                <DiscountText discount_percent={props.discount_percent}/>
            </div>
            <Link to={`/accounts/${props.id}`}>
                Открыть детали
            </Link>
        </Card>
    );
}

export default AccountCard;