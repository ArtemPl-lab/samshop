import { useEffect, useState } from "react";
import Tiny from "../../components/Editor/Editor"
import { IconLoad, SectionTitle } from "../../components/UiKit/UiKit";
import { useStore } from "../../store/store";
import Image from '../../components/Image/Image';
import File from "../../components/File/File";
import styles from './About.module.css';
export const About = props => {
    const { changesStore } = useStore();
    const [ state, setState ] = useState();
    const changeSaver = async () => {
        // const fetch = 
    }
    const handleChange = (key, value) => {
        console.log(value);
        setState({
            ...state,
            [key]: value
        });
    }
    useEffect(()=>{
        if(!state) return;
        changesStore.addChange('about', changeSaver);
    }, [state]);
    return(
        <div className={styles.wrapper}>
            <SectionTitle>
                Блок об авторе
            </SectionTitle>
            <Image 
                src="/author.png"
                width="100%"
                heigth={300}
                title="Фотография №1 (1366х460 рх.)"
            />
            <File onChange={(e) => handleChange('image', e.target.files)} className={styles.fileInput}>
                <IconLoad />
                Загрузить другую
            </File>
            <Tiny onEditorChange={(val)=>handleChange('content', val)} value="df"/>
        </div>
    );
}


