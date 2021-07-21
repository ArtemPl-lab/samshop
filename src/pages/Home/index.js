import {  IconPlus, SectionTitle, Button } from "../../components/UiKit/UiKit";
import Image from '../../components/Image/Image';
import { useStore } from "../../store/store";
import styles from './Home.module.css';
import Tiny from "../../components/Editor/Editor";
import CompilationCard from "../../components/CompilationCard/CompilationCard";
import api from "../../api/api";
import { useState } from "react";
import File from "../../components/File/File";
import { IconLoad } from "../../components/UiKit/UiKit";
import DragDropItem from '../../components/DragDropList/DragDropItem';
import update from 'immutability-helper';
import { observer } from "mobx-react-lite";

export const  Homepage = observer(props => {
    const { changesStore, compilations } = useStore();
    const [state, setState] = useState({
        desc: ''
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
                compilations: compilations.list.map(cmp => cmp.id),
                compilations_hidden: compilations.list.map(cmp => false),
                goods: []
            });
        });
    }
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
                        compilations.list.map((card, index) => 
                            <div key={card.id}>
                                <DragDropItem
                                    index={index}
                                    moveCard={moveCard}
                                >
                                    <CompilationCard {...card}/>
                                </DragDropItem>
                            </div>
                        )
                    }
                </div>
                <Button color="blue">
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
            </section>
            <section className={styles.advertising}>
                <SectionTitle>
                    Рекламный блок
                </SectionTitle>
                <div className={styles.advertisingContent}>
                    <div className={styles.advertisingImage}>
                        <Image id={state.photo} title="Фотография (592х592 рх.)" heigth="232px" width="232px" />
                        <File 
                            onChange={(fileId) => handleChange('photo', `/resources/${fileId}`)} 
                            className={styles.fileInput}
                        >
                            <IconLoad />
                            Загрузить другую
                        </File>
                    </div>
                    <div>
                        <Tiny 
                            onEditorChange={(val)=>handleChange('desc', val)}
                            value={state.desc}
                        />
                    </div>
                </div>
            </section>

        </>
    );
});