import { useStore } from "../../store/store";
import { Tabs, Tab } from "../../components/Tabs";
import styles from './Requests.module.css';
import { useInView } from 'react-intersection-observer';
import { useState } from "react";
import { Load } from '../Load';
import Card from "../../components/Card/Card";
import { observer } from "mobx-react-lite";
import ParthnersCard from "./ParthnersCard";
export const Requests = observer(props => {
    const { requests } = useStore();
    const { ref, inView} = useInView({ threshold: 0 });
    const [currentTab, setCurrentTab] = useState("orders");
    const bulk = (id) => {
        const conf = window.confirm(`Вы уверены, что хотите удалить заявку?`);
        if(conf) requests.removeRequest(id);
    }
    if(inView) requests.loadRequests(currentTab);
    return(
        <div className={styles.wrapper}>
            <Tabs className={styles.tabs} onChange={setCurrentTab}>
                <Tab name="В один клик" slug="orders" className={styles.orders}> 
                    {
                        requests.list.filter(req => req.type === "orders").map(order => {
                            const date = new Date(order.created_at);
                            return(
                                <Card className={styles.orderCard}>
                                    <div>
                                        <div className={styles.good_name}>
                                            {order.good_name}
                                        </div>
                                        <a href={`tel: ${order.phone}`} className={styles.order_phone}>
                                            {order.phone}
                                        </a>
                                    </div>
                                    <div className={styles.order_date}>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</div>
                                    <div className={styles.bulk} onClick={()=>bulk(order.id)}>Удалить</div>
                                </Card>
                            );
                        })
                    }
                </Tab>
                <Tab name="От дизайнеров" slug="partnerships" className={styles.parthnerships}>
                    {
                        requests.list.filter(req => req.type === "partnerships")
                        .map(partner => <ParthnersCard parthner={partner}/>)
                    }
                </Tab>
            </Tabs>
            {
                requests.hasRequests[currentTab] ?
                <div ref={ref}>
                    <Load />
                </div> : ''
            }
        </div>
    );
});

