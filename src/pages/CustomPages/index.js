import { useState, useEffect } from 'react';
import { useStore } from "../../store/store";
import Tiny from "../../components/Editor/Editor";
import { SectionTitle, IconDropdown } from '../../components/UiKit/UiKit';
import styles from './CustomPages.module.css';
import Input from '../../components/Input/Input';

export const CustomPages = props => {
    return(
        <div className={styles.list}>
            <Contacts />
            <Page 
                title="Как оформить заказ" 
                id="howto"
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
                id="warranty"
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

const Contacts =  props => {
    const pageId = "contacts";
    const { changesStore, pages } = useStore();
    const [active, setActive] = useState(false);
    const [content, setContent] = useState();
    const handleChange = (key, val) => {
        const newVal = {
            ...content,
            [key]: val
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
                Контакты
                <IconDropdown className={(active ? styles.open : styles.close)}/>
            </SectionTitle>
            {
                active ? 
                <div className={styles.contacts}>
                    <Input
                        label="Email"
                        value={content.email}
                        onChange={(e)=>handleChange('email', e.target.value)}
                    />
                    <Input
                        label="Houzz"
                        value={content.houzz}
                        onChange={(e)=>handleChange('houzz', e.target.value)}
                    />
                    <Input
                        label="Instagram"
                        value={content.instagram}
                        onChange={(e)=>handleChange('instagram', e.target.value)}
                    />
                    <Input
                        label="Телефон"
                        value={content.phone}
                        onChange={(e)=>handleChange('phone', e.target.value)}
                    />
                    <Input
                        label="Pinterest"
                        value={content.pinterest}
                        onChange={(e)=>handleChange('pinterest', e.target.value)}
                    />
                    <Input
                        label="Youtube"
                        value={content.youtube}
                        onChange={(e)=>handleChange('youtube', e.target.value)}
                    />
                </div> : ''
            }
        </>
    );
}