import { useState } from "react";
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import styles from './Requests.module.css';
import { useStore } from "../../store/store";

const ParthnersCard = ({ parthner }) => {
    const { requests } = useStore();
    const bulk = (id) => {
        const conf = window.confirm(`Вы уверены, что хотите удалить заявку?`);
        if(conf) requests.removeRequest(id);
    }
    const handleChange = (e) => {
        requests.changeRequest({
            ...parthner,
            [e.target.name]: e.target.value
        });
    }
    const date = new Date(parthner.created_at);
    return(
        <Card className={styles.parthners_card}>
            <div className={styles.parthnerInfo}>
                <Input value={parthner.studio_name} onChange={handleChange} name="studio_name"/>
                <a href={`tel: ${parthner.phone}`} className={styles.order_phone}>
                    {parthner.phone}
                </a>
                <a href={parthner.portfolio_url} className={styles.portfolio}>
                    {parthner.portfolio_url.slice(0, 20)}
                    {parthner.portfolio_url.length > 20 ? '...' : ''}
                </a>
            </div>
            <div className={styles.order_date}>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</div>
            <div className={styles.bulk} onClick={()=>bulk(parthner.id)}>Удалить</div>
        </Card>
    );
}

export default ParthnersCard;