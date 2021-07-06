import styles from './OrderCard.module.css';
import {  OrderStatus } from "../../components/UiKit/UiKit";
import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';
const OrderCard = ({ order }) => {
    const date = new Date(order.created_at);
    return(
        <Card className={styles.order}>
            <div className={styles.date}>{`${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`}</div>
            <div className={styles.count}>{order.items.length} товаров</div>
            <OrderStatus status={order.status} />
            <div className={styles.number}>№{order.id}</div>
            <Link to={`/orders/${order.id}`} className={styles.details}>
                Открыть детали
            </Link>
        </Card>
    );
}

export default OrderCard;