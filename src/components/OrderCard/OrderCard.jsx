import styles from './OrderCard.module.css';
import {  OrderStatus } from "../../components/UiKit/UiKit";
import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';
function dateFormat(date, options, delimeter = ".", locale = "en") {
    date = new Date(date);
    function format(m) {
       let f = new Intl.DateTimeFormat(locale, m);
       return f.format(date);
    }
    return options.map(format).join(delimeter);
}
const OrderCard = ({ order }) => {
    const dateOptions = [{day: '2-digit'}, {month: '2-digit'}, {year: 'numeric'}];
    return(
        <Card className={styles.order}>
            <div className={styles.date}>{dateFormat(order.created_at, dateOptions, ".")}</div>
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