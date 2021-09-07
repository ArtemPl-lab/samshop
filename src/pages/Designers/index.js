import { useState, useEffect } from 'react';
import styles from './Designers.module.css';
import { IconLoad, SectionTitle, Button } from "../../components/UiKit/UiKit";
import { useStore } from "../../store/store";
import Image from '../../components/Image/Image';
import File from "../../components/File/File";
import Input from '../../components/Input/Input';
import Tiny from "../../components/Editor/Editor";
import { observer } from 'mobx-react-lite';

export const Designers = observer(props => {
    const { designers } = useStore();
    const addDesigner = () => {
        designers.list.push({
            photo: 'cf92cb1f-54d1-46af-904b-a210663a7197',
            name: '',
            description: ''
        });
    }
    useEffect(async ()=>{
        if(!designers.list.length) await designers.load();
    }, []);
    return(
        <>
            <SectionTitle>
                Бренды
            </SectionTitle>
            <div className={styles.wrapper}>
                {designers.list.map((des, index) => <Designer data={des} key={index}/>)}
                <Button onClick={addDesigner} color="blue" style={{float: "right"}}>Добавить дизайнера</Button>
            </div>
        </>
    );
});

const Designer = observer(({ data }) => {
    const { changesStore, designers } = useStore();
    const [state, setState] = useState(data);
    const handleChange = (key, value) => {
        if(state[key] === value) return;
        const change = {
            ...state,
            [key]: value
        }
        const saver = state.id ? 
                      () => designers.update(state.id, change) :
                      () => designers.create(change);
        const changeSlug = state.id ? 
                           `designer${state.id}` :
                           `designer${Math.round(Math.random())}`;
        changesStore.addChange(changeSlug, saver);
        setState(change);
    }
    const dropDesigner = ()=>{
        if(!state.id) return;
        designers.localRemove(state.id);
        const changeSlug = `drop_designer${state.id}`;
        changesStore.addChange(changeSlug, ()=>designers.delete(state.id));
    }
    return(
        <div className={styles.designer}>
            <div className={styles.designer_col}>
                <Image 
                    id={state.photo}
                    width="100%"
                    title="Фотография №1 (544х480 рх.)"
                />
                <File 
                    onChange={(fileId) => handleChange('photo', `/resources/${fileId}`)} 
                    className={styles.fileInput}
                >
                    <IconLoad />
                    Загрузить другую
                </File>
            </div>
            <div className={styles.designer_col}>
                <Input 
                    label={
                        <>
                            Имя (название бренда)
                            <span className={styles.drop} onClick={dropDesigner}>Удалить</span>
                        </>
                    }
                    onChange={e => handleChange("name", e.target.value)}
                    value={state.name}
                />
                <div className={styles.designer_content}>
                    <Tiny 
                        onEditorChange={(val)=>handleChange('description', val)} 
                        value={state.description}
                        height="100%"
                    />
                </div>
            </div>
        </div>
    );
});