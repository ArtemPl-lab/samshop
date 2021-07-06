import styles from './Orders.module.css';
import {  OrderStatus, SectionTitle } from "../../components/UiKit/UiKit";
import { useStore } from "../../store/store";
import { observer } from 'mobx-react-lite';
import { Load } from '../Load';
import { useInView } from 'react-intersection-observer';
import OrderCard from '../../components/OrderCard/OrderCard';

export const Orders = observer(props => {
    const { orders } = useStore();
    const { ref, inView} = useInView({ threshold: 0 });
    if(inView && !orders.load && !orders.ordersLoaded){
        orders.loadOrders();
    }
    return(
        <>
            <SectionTitle>
                Заказы
            </SectionTitle>
            <div className={styles.wrapper}>
                {orders.orders.map(order => <OrderCard order={order} />)}
                {
                    !orders.ordersLoaded ? 
                    <div ref={ref}>
                        <Load /> 
                    </div> : ''
                }
            </div>
        </>
    );
});


