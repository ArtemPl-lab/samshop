import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../api/api";
import GoodCard from "../../components/GoodCard";
import { ComeBack } from "../../components/UiKit/UiKit"
import { useStore } from "../../store/store";
import ProdCard from "../Orders/ProdCard";
import styles from './List.module.css';
export const List = () => {
    const { id } = useParams();
    const history = useHistory();
    const { accounts } = useStore();
    const [ data, setData ] = useState({});
    const bulk = () => {
        accounts.deleteList(data.id);
        history.goBack();
    }
    useEffect(async () => {
        const res = await api.get(`/lists/${id}`);
        const { list } = await res.json();
        setData(list)
    }, [id]);
    return(
        <>
            <ComeBack />
            {
                data ?
                <>
                    <div className={styles.title}>
                        {data.name}
                    </div>
                    <br />
                    {
                        data.items && data.items.length ? 
                        <>
                        {data.items.map(({ good }) => {
                            return (<ProdCard {...good}/>);
                        })}
                        </> :
                        'Нет товаров'
                    }
                    <br />
                    <br />
                    <div className={styles.bulk} onClick={bulk}>
                        Удалить список
                    </div>
                </> :
                'Загрузка...'
            }
        </>
    );
}