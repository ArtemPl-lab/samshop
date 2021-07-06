import styles from './Accounts.module.css';
import { Load } from '../Load';
import { useInView } from 'react-intersection-observer';
import { useStore } from '../../store/store';
import { observer } from 'mobx-react-lite';
import OrderCard from '../../components/OrderCard/OrderCard';

const Orders = observer(({ userId }) => {
    const { ref, inView} = useInView({ threshold: 0 });
    const { accounts } = useStore();
    const user = accounts.list.find(u => u.id == userId);
    if(inView && !user.load){
        accounts.loadUserOrders(userId);
    }
    return (
        <div className={styles.orders_grid}>
            {
                user.ordersLoaded && !user.orders ? 
                'Нет заказов' : (user.orders ? user.orders.map((order, index) => <OrderCard order={order} key={index}/>) : 'Загрузка...')
            }
            {
                !user.ordersLoaded ? 
                <div ref={ref}>
                    <Load /> 
                </div> : ''
            }
        </div>
    )
});

export default Orders;