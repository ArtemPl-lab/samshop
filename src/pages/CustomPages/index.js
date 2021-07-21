import { useState, useEffect } from 'react';
import { useStore } from "../../store/store";
import Tiny from "../../components/Editor/Editor";
import { SectionTitle, IconDropdown } from '../../components/UiKit/UiKit';
import styles from './CustomPages.module.css';

export const CustomPages = props => {
    return(
        <div className={styles.list}>
            <Page 
                title="Контакты" 
                id="contacts"
            />
            <Page 
                title="Как оформить заказ" 
                id="how_order"
            />
            <Page 
                title="Оплата" 
                id="payment"
            />
            <Page 
                title="Доставка" 
                id="delivery"
            />
            <Page 
                title="Гарантия" 
                id="garant"
            />
            <Page 
                title="Возврат" 
                id="returns"
            />
            <Page 
                title="Политика конфиденциальности" 
                id="privacy_policy"
            />
        </div>
    );
}

const Page = props => {
    const pageId = props.id;
    const { changesStore, pages } = useStore();
    const [active, setActive] = useState(false);
    const [content, setContent] = useState({
        desc: ''
    });
    const handleChange = val => {
        const newVal = {
            ...content,
            desc: val
        }
        changesStore.addChange(pageId, ()=>{
            pages.save(pageId, newVal)
        });
        setContent(newVal);
    }
    useEffect(async ()=>{
        const pageContent = await pages.getPage(pageId);
        if(pageContent) setContent(pageContent);
    }, []);
    return(
        <>
            <SectionTitle onClick={()=>setActive(!active)} className={styles.title}>
                {props.title}
                <IconDropdown className={(active ? styles.open : styles.close)}/>
            </SectionTitle>
            {
                active ? <Tiny onEditorChange={handleChange} value={content.desc} /> : ''
            }
        </>
    );
}