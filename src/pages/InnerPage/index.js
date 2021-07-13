import { useEffect, useState } from "react";
import Tiny from "../../components/Editor/Editor"
import { IconLoad, SectionTitle } from "../../components/UiKit/UiKit";
import { useStore } from "../../store/store";
import Image from '../../components/Image/Image';
import File from "../../components/File/File";
import styles from './InnerPage.module.css';
export const InnerPage = ({ title, pageId }) => {
    const { changesStore, pages } = useStore();
    const [ state, setState ] = useState({
        image: '',
        content: ''
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
    useEffect(async ()=>{
        const pageContent = await pages.getPage(pageId);
        if(pageContent){
            setState(pageContent);
        }
    }, []);
    return(
        <div className={styles.wrapper}>
            <SectionTitle>
                {title}
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
            <Tiny onEditorChange={(val)=>handleChange('content', val)} value={state.content}/>
        </div>
    );
}


