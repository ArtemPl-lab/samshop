import styles from './Parthners.module.css';
import { useEffect, useState } from "react";
import Tiny from "../../components/Editor/Editor"
import { IconLoad, SectionTitle, Button } from "../../components/UiKit/UiKit";
import { useStore } from "../../store/store";
import Image from '../../components/Image/Image';
import File from "../../components/File/File";
import Input from '../../components/Input/Input';
export const Parthners = props => {
    const pageId = "partnersPage";
    const { changesStore, pages } = useStore();
    const [ state, setState ] = useState({
        image: '',
        title: '',
        content: '',
        advantages: []
    });
    const handleChange = (key, value) => {
        if(state[key] === value) return;
        const change = {
            ...state,
            [key]: value
        };
        changesStore.addChange(pageId, () => pages.save(pageId, change));
        setState(change);
    }
    const bullitChange = (index, value) => {
        let newAdv = [...state.advantages];
        newAdv[index] = {
            content: value
        }
        handleChange("advantages", newAdv);
    }
    const addAdvantage = () => {
        let newAdv = [
            ...state.advantages,
            {
                content: '...'
            }
        ];
        handleChange("advantages", newAdv);
    }
    const deleteAdvantage = (index) => {
        let newAdv = state.advantages.filter((_, i) => index !== i);
        handleChange("advantages", newAdv);
    }
    useEffect(async ()=>{
        const pageContent = await pages.getPage(pageId);
        if(pageContent){
            setState({
                ...state,
                ...pageContent
            });
        }
    }, []);
    return(
        <div className={styles.wrapper}>
            <SectionTitle>
                Партнёраская программа
            </SectionTitle>
            <Image 
                id={state.image}
                width="100%"
                heigth={300}
                title="Фотография №1 (1366х460 рх.)"
            />
            <File onChange={(file) => handleChange('image', `/resources/${file}`)} className={styles.fileInput}>
                <IconLoad />
                Загрузить другую
            </File>
            <Input label="Заголовок" onChange={(e)=>handleChange('title', e.target.value)} value={state.title}/>
            <br />
            <Tiny onEditorChange={(val)=>handleChange('content', val)} value={state.content}/>
            <br />
            {state.advantages.map((advantage, index) => {
                return(
                    <>
                        <br />
                        <SectionTitle>{index+1} буллит <span className={styles.delete} onClick={()=>deleteAdvantage(index)}>Удалить</span></SectionTitle>
                        <br />
                        <Tiny onEditorChange={(val)=>bullitChange(index, val)} value={advantage.content}/>
                    </>
                )
            })}
            <br />
            <Button color="blue" onClick={addAdvantage}>Добавить буллит</Button>
        </div>
    );
}