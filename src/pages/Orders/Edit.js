import { useStore } from "../../store/store";
import { Link, useParams } from "react-router-dom";
import { SectionTitle, ComeBack, Button, IconSend, OrderStatus, IconLoad } from '../../components/UiKit/UiKit';
import styles from './Orders.module.css'
import { useState } from "react";
import { useEffect } from "react";
import ProdCard from "./ProdCard";
import api from "../../api/api";

export const OrderEdit = props => {
    const { id } = useParams();
    const [ state, setState ] = useState({
        order: null,
        user: null,
        load: true
    });
    const uploadInvoice = async e => {
        const invoice = e.target.files[0];
        setState(prev => ({
            ...prev,
            order: {
                ...state.order,
                has_invoice: true
            }
        }));
        await api.put(`/orders/${id}/invoice`, invoice);
    }
    const downloadInvoice = async e => {
        const res = await api.get(`/orders/${id}/invoice`);
        const invoice = await res.blob();
        var urlCreator = window.URL || window.webkitURL;
        var link = document.createElement('a');
        link.setAttribute('href', urlCreator.createObjectURL(invoice));
        link.setAttribute('download','download');
        link.click();
    }
    const downloadOrder = async e => {
        const res = await api.get(`/orders/${id}/pdf`);
        if(res.ok){
            const invoice = await res.blob();
            var urlCreator = window.URL || window.webkitURL;
            var link = document.createElement('a');
            link.setAttribute('href', urlCreator.createObjectURL(invoice));
            link.setAttribute('download','download');
            link.click();
        }
        else{
            alert(`Произошла ошибка! Статус - ${res.status}`);
        }

    }
    const { orders, accounts } = useStore();
    useEffect(async ()=>{
        const ord = await orders.getOrder(id);
        const usr = await accounts.getUser(ord.account_id);
        setState({
            order: ord,
            user: usr,
            load: false
        });
    }, [id]);
    if(state.load) return(
        <>
            <ComeBack />
            Загрузка...
        </>
    );
    if(!state.load && !state.order) return (
        <>
            <ComeBack />
            Заказ с таким номером не найден
        </>
    );
    return(
        <div className={styles.wrapper}>
            <ComeBack />
            <div className={styles.order_header}>
                <SectionTitle>
                    Заказ №{id}
                </SectionTitle>
                <OrderStatus status={state.order.status}/>
                {
                    state.order.account_id ?
                    <Link to={`/accounts/${state.order.account_id}`} className={styles.name}>
                        {state.user.name}
                    </Link> : <div className={styles.guest}>Заказ от гостя</div>
                }
            </div>
            <div className={styles.list_name}>
                {state.order.name}
            </div>
            <section>
                <h3 className={styles.label}>
                    <Button 
                        color="blue"
                        style={{
                            width: "100%"
                        }}
                        onClick={downloadOrder}
                    >
                        Скачать заказ в pdf
                    </Button>
                </h3>
            </section>
            <section>
                <h3 className={styles.label}>
                    Товары:
                    {state.order.items.map(item => {
                        return(
                            <div style={{marginBottom: 10}}>
                                <ProdCard {...item.good} amount={item.amount} options={item.props}/>
                            </div>
                            
                        );
                    })}
                    <hr />
                </h3>
            </section>
            <section>
                <h3 className={styles.label}>
                    Данные плательщика:
                    <ul className={styles.payer_list}>
                        {Object.keys(state.order.payer).map(key => {
                            if(!state.order.payer[key]) return;
                            return (
                                <li className={styles.item}>
                                    {state.order.payer[key]}
                                </li>
                            );
                        })}
                    </ul>
                    <hr />
                </h3>
            </section>
            <section>
                <h3 className={styles.label}>
                    Накладная:
                    <div className={styles.invoice_wrapper}>
                        {
                            state.order.has_invoice ?
                            <>
                                <Button 
                                    color="blue"
                                    style={{
                                        width: "100%"
                                    }}
                                    onClick={downloadInvoice}
                                >
                                    Скачать накладную
                                </Button>
                                <br />
                            </> :
                            ''
                        }
                        <input type="file" className={styles.invoice_input} id={id} onChange={uploadInvoice}/>
                        <label htmlFor={id} className={styles.invoice_label}>
                            <IconLoad />
                            Загрузить накладную
                        </label>
                    </div>
                    <hr />
                </h3>
            </section>
            <section>
                <p className={styles.item}>
                    <span>Товары:</span>
                    <span>{state.order.costs.goods} ₽</span>
                </p>
                <p className={styles.item}>
                    <span>Доставка:</span>
                    <span>{state.order.costs.delivery} ₽</span>
                </p>
                <p className={styles.item}>
                    <span>Скидка:</span>
                    <span>{state.order.costs.discount} ₽</span>
                </p>
                <p className={styles.item}>
                    <span>Итого:</span>
                    <span>{state.order.costs.total} ₽</span>
                </p>
            </section>
        </div>
    );
}