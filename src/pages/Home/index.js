import {  IconPlus, SectionTitle, Button } from "../../components/UiKit/UiKit";
import Image from '../../components/Image/Image';
import { useStore } from "../../store/store";
import styles from './Home.module.css';
import Tiny from "../../components/Editor/Editor";
import CompilationCard from "../../components/CompilationCard/CompilationCard";
import api from "../../api/api";
import { useEffect, useState } from "react";
import File from "../../components/File/File";
import { IconLoad } from "../../components/UiKit/UiKit";
import DragDropItem from '../../components/DragDropList/DragDropItem';
import update from 'immutability-helper';
import { observer } from "mobx-react-lite";

export const  Homepage = observer(props => {
    const { changesStore, compilations } = useStore();
    const [state, setState] = useState({
        ad: {
            photo: '',
            desc: ''
        },
        compilations: [],
        compilations_hidden: [],
        goods: []
    });
    const moveCard = (dragIndex, hoverIndex) => {
        const dragCard = compilations.list[dragIndex];
        compilations.setComplations(update(compilations.list, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard],
            ],
        }));
    }
    const handleAdsChange = (key, value) => {
        setState(prev => {
            const st = {
                ...prev,
                ad: {
                    ...prev.ad,
                    [key]: value
                }
            }
            changesStore.addChange('main_page', async () => api.patch('/admin/main', st));
            return st;
        });
    }
    const handleChange = (key, value) => {
        setState(prev => ({
            ...prev,
            [key]: value
        }));
        changesStore.addChange('main_page', async ()=>{
            const res = await api.patch('/admin/main', {
                ad: {
                    ...state,
                    [key]: value
                },
                compilations: state.compilations,
                compilations_hidden: state.compilations.map(cmp => false),
                goods: []
            });
        });
    }
    const cmpId = (index, newID) => {
        setState(prev => {
            const st = {
                ...prev,
                compilations: prev.compilations.map((c, ind) => {
                    if(index === ind) return newID;
                    return c;
                }),
                compilations_hidden: [...state.compilations].map(cmp => false),
            }
            changesStore.addChange('main_page', async () => api.patch('/admin/main', st));
            return st;
        });
    }
    const addCmp = () => {
        const crCmp = new Set(state.compilations);
        compilations.list.every(el => {
            if(!crCmp.has(el.id)){
                setState(prev => {
                    const st = {
                        ...prev,
                        compilations: [
                            ...prev.compilations,
                            el.id
                        ],
                        compilations_hidden: [...state.compilations, el.id].map(cmp => false),
                    }
                    changesStore.addChange('main_page', async () => api.patch('/admin/main', st));
                    return st;
                });
                return false;
            }
            return true;
        });
    }
    const init = async () => {
        const res = await api.get('/admin/main');
        const json = await res.json();
        if(res.ok && json){
            console.log(json);
            setState(json);
        }
    }
    useEffect(init, []);
    return(
        <>
            <section className={styles.compilations}>
                <SectionTitle>
                    Подборки на главной
                </SectionTitle>
                <p className={styles.desc}>
                    Выберите подборки, которые будут показаны на Главной странице. Максимум 5 подборок.
                </p>
                <div className={styles.grid}>
                    {
                        state.compilations.map((id, index) => {
                            const cmp = compilations.list.find(el => el.id === id);
                            if(!cmp) return <></>;
                            return(
                                <div key={cmp.id}>
                                    <DragDropItem
                                        index={index}
                                        moveCard={moveCard}
                                    >
                                        <CompilationCard {...cmp} handleChange={(id)=>cmpId(index, id)}/>
                                    </DragDropItem>
                                </div>
                            );
                        })
                    }
                </div>
                <Button color="blue" onClick={addCmp}>
                    <IconPlus />
                    Добавить подборку
                </Button>
            </section>
            <section className={styles.products}>
                <SectionTitle>
                    Товары на главной
                </SectionTitle>
                <p className={styles.desc}>
                    Выберите товары, которые будут показаны на Главной странице. Максимум 4 товара.
                </p>
                <Button color="blue">
                    <IconPlus />
                    Добавить товар
                </Button>
            </section>
            <section className={styles.advertising}>
                <SectionTitle>
                    Рекламный блок
                </SectionTitle>
                <div className={styles.advertisingContent}>
                    <div className={styles.advertisingImage}>
                        <Image id={state.ad.photo} title="Фотография (592х592 рх.)" heigth="232px" width="232px" />
                        <File 
                            onChange={(fileId) => handleAdsChange('photo', `/resources/${fileId}`)} 
                            className={styles.fileInput}
                        >
                            <IconLoad />
                            Загрузить другую
                        </File>
                    </div>
                    <div>
                        <Tiny 
                            onEditorChange={(val)=>handleAdsChange('desc', val)}
                            value={state.ad.desc}
                        />
                    </div>
                </div>
            </section>

        </>
    );
});

