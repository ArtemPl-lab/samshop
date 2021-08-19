import styles from './Orders.module.css';
import {  OrderStatus, Search, SectionTitle } from "../../components/UiKit/UiKit";
import { useStore } from "../../store/store";
import { observer } from 'mobx-react-lite';
import { Load } from '../Load';
import { useInView } from 'react-intersection-observer';
import OrderCard from '../../components/OrderCard/OrderCard';
import { useEffect, useState } from 'react';
import api from '../../api/api';

export const Orders = observer(props => {
    const { orders, has_new } = useStore();
    const { ref, inView} = useInView({ threshold: 0 });
    const [search, setSearch] = useState([]);
    const handleSearch = async  e => {
        if(e.target.value === ''){
            setSearch([]);
            return;
        }
        const res = await api.get('/orders', {
            id_filter: e.target.value
        });
        const json = await res.json();
        setSearch([...json.orders]);
    }

    if(inView && !orders.load && !orders.ordersLoaded){
        orders.loadOrders();
    }
    useEffect(() => {
        has_new.view({
            orders: false
        })
    }, []);
    return(
        <>
            <SectionTitle>
                Заказы
            </SectionTitle>
            <br />
            <Search placeholder="Поиск по номеру" onChange={handleSearch}/>
            {
                search.length ?
                <div className={styles.wrapper}>
                    {search.map(order => <OrderCard order={order} />)}
                </div> :
                <div className={styles.wrapper}>
                    {orders.orders.map(order => <OrderCard order={order} />)}
                    {
                        !orders.ordersLoaded ? 
                        <div ref={ref}>
                            <Load /> 
                        </div> : ''
                    }
                </div>
            }
        </>
    );
});


