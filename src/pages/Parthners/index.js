import { useEffect, useState } from "react";
import Tiny from "../../components/Editor/Editor"
import { IconLoad, SectionTitle } from "../../components/UiKit/UiKit";
import { useStore } from "../../store/store";
import Image from '../../components/Image/Image';
import File from "../../components/File/File";
import styles from './Parthners.module.css';
export const Parthners = props => {
    const pageId = 'parthners';
    const { changesStore, pages } = useStore();
    const [ state, setState ] = useState({
        image: '',
        content: ''
    });
    const changeSaver = () => {
        pages.save(pageId, state);
    }
    const handleChange = (key, value) => {
        console.log(value);
        setState({
            ...state,
            [key]: value
        });
        changesStore.addChange(pageId, changeSaver);
    }
    useEffect(async ()=>{
        const pageContent = await pages.load(pageId);
        console.log(pageContent);
        setState({
            ...state,
            pageContent
        });
    }, []);
    return(
        <div className={styles.wrapper}>
            <SectionTitle>
                Партнёраская программа
            </SectionTitle>
            <Image 
                src={state.image}
                width="100%"
                heigth={300}
                title="Фотография №1 (1366х460 рх.)"
            />
            <File onChange={(file) => handleChange('image', file)} className={styles.fileInput}>
                <IconLoad />
                Загрузить другую
            </File>
            <Tiny onEditorChange={(val)=>handleChange('content', val)} value="df"/>
        </div>
    );
}


