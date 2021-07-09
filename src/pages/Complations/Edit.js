import styles from './Complations.module.css';
import { ComeBack } from '../../components/UiKit/UiKit';
import { useParams } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import { useStore } from '../../store/store';
import { SectionTitle } from '../../components/UiKit/UiKit';
import Toggle from '../../components/Toggle/Toggle';
import Input from '../../components/Input/Input';
import Tiny from "../../components/Editor/Editor"

export const ComplationEdit = props => {
    const { path } = useParams();
    const [ complation, setComplation ] = useState(null);
    const [ load, setLoad ] = useState(true);
    const { compilations } = useStore();
    useEffect(async ()=>{
        setComplation(await compilations.getComplation(path));
        setLoad(false);
    }, [path]);
    const handleChange = (key, value) => {
        console.log(value);
        setComplation(state => ({
            ...state,
            [key]: value
        }));
    }
    if(load) return <>Загрузка...</>
    if(!load && !complation) return <>Неверный id</>
    return(
        <div className={styles.wrapper}>
            <ComeBack />
            <div className={styles.comp_header}>
                <SectionTitle>
                    {complation.title}
                </SectionTitle>
                <Toggle />
                <div className={styles.bulk}>Удалить</div>
            </div>
            {/* <div className={styles.compilation_info}> */}
                <Input label="Название подборки" onChange={(e)=>handleChange('title', e.target.value)} value={complation.title} className={styles.input}/>
                <Tiny onEditorChange={(val)=>handleChange('description', val)} value={complation.description}/>
            {/* </div> */}
            {JSON.stringify(complation)}
        </div>
    );
}