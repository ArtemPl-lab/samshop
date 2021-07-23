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
import Input from "../../components/Input/Input";
import GoodCard from "../../components/GoodCard";
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
    let cmpCounter = 0;
    const [goods, setGoods] = useState([]);
    const moveCard = (dragIndex, hoverIndex) => {
        const dragCard = state.compilations[dragIndex];
        const dragCardHidden = state.compilations_hidden[dragIndex];
        const newSt = {
            ...state,
            compilations: update(state.compilations, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            }),
            compilations_hidden: update(state.compilations_hidden, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCardHidden],
                ],
            })
        }
        console.log(newSt);
        changesStore.addChange('main_page', async () => api.patch('/admin/main', newSt));
        setState(newSt);

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
    const deleteCmp = id => {
        const index = state.compilations.findIndex(el => el === id);
        const newSt = {
            ...state,
            compilations: state.compilations.filter((el, ind) => ind !== index),
            compilations_hidden: state.compilations_hidden.filter((el, ind) => ind !== index)
        }
        changesStore.addChange('main_page', async () => api.patch('/admin/main', newSt));
        setState(newSt);
    }
    const toggleCmp = (id, val) => {
        const index = state.compilations.findIndex(el => el === id);
        const newSt = {
            ...state,
            compilations_hidden: state.compilations_hidden.map((el, ind) => ind === index ? !val : el)
        }
        console.log(newSt);
        changesStore.addChange('main_page', async () => api.patch('/admin/main', newSt));
        setState(newSt);
    }
    const init = async () => {
        const res = await api.get('/admin/main');
        const json = await res.json();
        if(res.ok && json){
            setState(json);
            json.goods.forEach(async el => {
                const { good } = await (await api.get(`/admin/catalog/goods/${el}`)).json();
                console.log(good);
                console.log();
                setGoods(prev => [
                    ...prev,
                    good
                ]);
            });
        }
    }
    const addGood = prod => {
        if(new Set(state.goods).has(prod.id)) return;
        const newSt = {
            ...state,
            goods: [
                ...state.goods,
                prod.id
            ]
        }
        changesStore.addChange('main_page', async () => api.patch('/admin/main', newSt));
        setState(newSt);
        setGoods(prev => [
            ...prev,
            prod
        ]);
    }
    const removeGood = id => {
        const newSt = {
            ...state,
            goods: state.goods.filter(g => g !== id)
        }
        changesStore.addChange('main_page', async () => api.patch('/admin/main', newSt));
        setState(newSt);
        setGoods(prev => {
            return prev.filter(el => el.id !== id);
        });
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
                            cmpCounter++;
                            return(
                                <div key={id} className={styles.cmp_item}>
                                    <DragDropItem
                                        index={index}
                                        moveCard={moveCard}
                                        style={{ width: "100%" }}
                                    >
                                        <CompilationCard 
                                            {...cmp}
                                            handleChange={(id)=>cmpId(index, id)}
                                            deleteCmp={deleteCmp}
                                            toggleCmp={toggleCmp}
                                            isActive={!(state.compilations_hidden[index] || cmp.hidden)}
                                            disabled={cmp.hidden}
                                        />
                                    </DragDropItem>
                                    <div className={styles.bulk} onClick={()=>deleteCmp(id)}>
                                        Удалить с главной
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                {
                    cmpCounter < 5 && cmpCounter < compilations.list.length ?
                    <Button color="blue" onClick={addCmp}>
                        <IconPlus />
                        Добавить подборку
                    </Button> :
                    ''
                }
            </section>
            <section className={styles.products}>
                <SectionTitle>
                    Товары на главной
                </SectionTitle>
                <p className={styles.desc}>
                    Выберите товары, которые будут показаны на Главной странице. Максимум 4 товара.
                    <br />
                    <br />
                    {
                        goods.length < 4 ?
                        <SearchProduct handler={addGood}/> :
                        ''
                    }
                </p>
                <div className={styles.goods_grid}>
                    {
                        goods.map((g, index) => <GoodCard {...g} index={index} bulk={()=>removeGood(g.id)}/>)
                    }
                </div>
            </section>
            <section className={styles.advertising}>
                <SectionTitle>
                    Рекламный блок
                </SectionTitle>
                <br />
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
                    <div className={styles.editor}>
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

const SearchProduct = props => {
    console.log(props.value);
    const [val, setVal] = useState(props.value);
    const [products, setProducts] = useState([]);
    const handleChange = async e => {
        setVal(e.target.value);
        const res = await api.get('/admin/catalog/search', {
            query: e.target.value,
            count: 10
        });
        if(!res.ok) return;
        const { goods } = await res.json();
        setProducts(goods);
    }
    useEffect(()=>{
        setVal(props.value);
    }, [props.value]);
    return(
        <div className={styles.search_wrapper}>
            <Input 
                placeholder="Начните вводить наименование"
                className={styles.prodname_input} value={val}
                onChange={handleChange}
            />
            {
                products.length ? 
                <ul className={styles.search_list}>
                    {
                        products.map(prod => {
                            return(
                                <li onClick={()=>props.handler(prod)}>{prod.title}</li>
                            );
                        })
                    }
                </ul> :
                ''
            }
        </div>
    );
}


