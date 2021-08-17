import { useStore } from "../../store/store";
import { Tabs, Tab } from "../../components/Tabs";
import styles from './Requests.module.css';
import { useInView } from 'react-intersection-observer';
import { useState } from "react";
import { Load } from '../Load';
import Card from "../../components/Card/Card";
import { observer } from "mobx-react-lite";
import ParthnersCard from "./ParthnersCard";
import { SectionTitle } from "../../components/UiKit/UiKit";
import OrderCard from "../../components/OrderCard/OrderCard";
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
            <SectionTitle>
                Заявки от дизайнеров
            </SectionTitle>
            <br />
            <br />
            <Tabs className={styles.tabs} onChange={setCurrentTab}>
                <Tab name="В один клик" slug="orders" className={styles.orders}> 
                    {
                        requests.list.filter(req => req.type === "orders").map(order => <OrderCard order={order}/>)
                    }
                </Tab>
                <Tab name="От дизайнеров" slug="partnerships" className={styles.parthnerships}>
                    <div style={{ paddingBottom: 30 }}/>
                    
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

