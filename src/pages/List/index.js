import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../api/api";
import GoodCard from "../../components/GoodCard";
import { Button, ComeBack } from "../../components/UiKit/UiKit"
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
    const downloadList = async e => {
        const res = await api.get(`/lists/${id}/pdf`);
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
                    <footer
                    style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                    >
                        <Button
                            color="blue"
                            onClick={downloadList}
                            style={{
                                marginRight: 30
                            }}
                        >
                            Скачать список в pdf
                        </Button>
                        <div className={styles.bulk} onClick={bulk}>
                            Удалить список
                        </div>
                    </footer>
                </> :
                'Загрузка...'
            }
        </>
    );
}