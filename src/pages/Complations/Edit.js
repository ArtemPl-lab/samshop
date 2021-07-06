import styles from './Complations.module.css';
import { ComeBack } from '../../components/UiKit/UiKit';
import { useParams } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import { useStore } from '../../store/store';

export const ComplationEdit = props => {
    const { path } = useParams();
    const [ complation, setComplation ] = useState(null);
    const [ load, setLoad ] = useState(true);
    const { compilations } = useStore();
    useEffect(async ()=>{
        setComplation(await compilations.getComplation(path));
        setLoad(false);
    }, [path]);
    if(load) return <>Загрузка...</>
    if(!load && !complation) return <>Неверный id</>
    return(
        <div className={styles.wrapper}>
            <ComeBack />
            {JSON.stringify(complation)}
        </div>
    );
}