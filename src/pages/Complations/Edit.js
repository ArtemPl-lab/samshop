import styles from './Complations.module.css';
import { ComeBack } from '../../components/UiKit/UiKit';
import { useParams, useHistory } from "react-router-dom";
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useStore } from '../../store/store';
import { SectionTitle, IconLoad } from '../../components/UiKit/UiKit';
import Toggle from '../../components/Toggle/Toggle';
import Input from '../../components/Input/Input';
import Tiny from "../../components/Editor/Editor"
import Image from '../../components/Image/Image';
import File from '../../components/File/File';
import api from '../../api/api';
import { observer } from 'mobx-react-lite';
import GoodCard from '../../components/GoodCard';
export const ComplationEdit = observer(props => {
    const { path } = useParams();
    const [editProduct, setEditProduct] = useState(null);
    const [ padding, setPadding ] = useState("146%");
    const [ imageLoaded, setImageLoaded ] = useState(false);
    const photoRef = useRef(null);
    const { compilations, changesStore } = useStore();
    const [complation, setComplation] = useState();
    const history = useHistory();
    const cmp = compilations.list.find(comp => comp.path === path);
    useEffect(()=>{
        setComplation(cmp);
    }, [cmp]);
    const handleChange = (key, value) => {
        changesStore.addChange(`cmp_${cmp.id}`, async () => {
            compilations.save({
                ...complation,
                [key]: value
            });
        });
        setComplation(state => ({
            ...state,
            [key]: value
        }));
    }
    const handleImage = (key, value) => {
        changesStore.addChange(`cmp_${cmp.id}`, async () => {
            compilations.save({
                ...complation,
                [key]: value
            });
        });
        setComplation(state => ({
            ...state,
            [key]: value
        }));
        compilations.dropGoods(cmp.id);
    }
    const handleClick = (e) => {
        const { height, width, x: blockX, y: blockY } = photoRef.current.getBoundingClientRect();
        const { clientX: clickX, clientY: clickY  } = e;
        const pointX = (clickX - blockX) / (width / 100);
        const pointY = (clickY - blockY) / (height / 100);
        setEditProduct({
            cords: {
                x: pointX,
                y: pointY
            }
        });
    }
    const handleClickProduct = async good => {
        setEditProduct({
            good: good.good,
            cords: {
                x: good.coordinates[0],
                y: good.coordinates[1]
            }
        });
    }
    const handleRef = r => {
        photoRef.current = r;
    }
    useEffect(async ()=>{
        setTimeout(()=>{
            if(photoRef.current && imageLoaded){
                console.log(photoRef.current.offsetHeight);
                if(photoRef.current.offsetHeight < photoRef.current.offsetWidth){
                    setPadding("55%");
                }
            }
        }, 400);
    }, [photoRef.current, imageLoaded]);
    const handleDelete = (prod) => {
        compilations.removeProduct(cmp.id, prod.good.id)
        setEditProduct(null);
    }
    if(compilations.load) return <>Загрузка...</>
    if(!complation) return <>Неверный id</>
    return(
        <div className={styles.wrapper}>
            <ComeBack />
            <div className={styles.comp_header}>
                <SectionTitle>
                    {complation.title}
                </SectionTitle>
                <Toggle />
                <div className={styles.bulk} onClick={()=>{
                    compilations.delete(complation.id);
                    history.goBack();
                }}>Удалить</div>
            </div>
            <Input label="Название подборки" onChange={(e)=>handleChange('title', e.target.value)} value={complation.title} className={styles.input}/>
            <div className={styles.row}>
                <div className={styles.label}>
                    Описание
                </div>
                <Tiny onEditorChange={(val)=>handleChange('description', val)} value={complation.description}/>
            </div>
            <div className={styles.row}>
                <div className={styles.label}>
                    Фото
                </div>
                <div className={styles.wrapper_wrapper} style={{paddingBottom: padding}}>
                    <div className={styles.photo_wrapper}>
                        <Image 
                            id={complation.photo}
                            onClick={handleClick}
                            ref={handleRef}
                            onLoad={()=>setImageLoaded(true)}
                        />
                        {
                            complation && 
                            complation.goods.map(good => {
                                return(
                                    <div 
                                        style={{
                                            top: `${good.coordinates[1]}%`,
                                            left: `${good.coordinates[0]}%` 
                                        }}
                                        className={styles.good_point}
                                        onClick={()=>handleClickProduct(good)}
                                    />
                                );
                            })
                        }
                        {
                            editProduct && 
                            <EditProduct 
                                cords={editProduct.cords} 
                                setCords={setEditProduct}  
                                product={editProduct}
                            />
                        }
                    </div>
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.file_wrapper}>
                    <File 
                        onChange={(fileId, sizes) => handleImage('photo', `/resources/${fileId}`, sizes)} 
                        className={styles.fileInput}
                    >
                        <IconLoad />
                        Загрузить другую фотографию
                    </File>
                    <span className={styles.file_text}>
                        Внимание! При замене фотографии всё <br />
                        товары будут удалены из подборки!
                    </span>
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.label}>
                    Товары в этой подборке:
                </div>
                <div className={styles.goods_grid}>
                    {
                        complation.goods.map((item, index) => {
                            return(
                                <GoodCard {...item.good} index={index} key={index} bulk={()=>handleDelete(item)}/>
                            );
                        })
                    }
                </div>
            </div>
            {/* {JSON.stringify(complation)} */}
        </div>
    );
});

const EditProduct = observer(({ cords, setCords, product }) => {
    const { compilations } = useStore();
    const { path } = useParams();
    const cmp = compilations.list.find(comp => comp.path === path);
    const handleAdd = (prod) => {
        compilations.addProduct(cmp.id, {
            good: prod,
            coordinates: [
                cords.x, cords.y
            ]
        });
        setCords(null);
    }
    const handleDelete = () => {
        compilations.removeProduct(cmp.id, product.good.id)
        setCords(null);
    }
    return(
        <div 
        style={{
            top: `${cords.y}%`, 
            left: `${cords.x}%`
        }}
        className={styles.add_product}
    >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>setCords(null)}>
            <rect x="9.53564" y="1.05029" width="2" height="12" rx="1" transform="rotate(45 9.53564 1.05029)" fill="white"/>
            <rect x="2.46436" y="1.05029" width="12" height="2" rx="1" transform="rotate(45 2.46436 1.05029)" fill="white"/>
        </svg>
        <div className={styles.add_wrapper}>
            <SearchProduct handler={handleAdd} value={product.good && product.good.title || ''}/>
            {
                product.good && <span className={styles.drop} onClick={handleDelete}>Удалить</span>
            }
        </div>
    </div>
    );
});

const SearchProduct = props => {
    console.log(props.value);
    const [val, setVal] = useState(props.value);
    const [products, setProducts] = useState([]);
    const handleChange = async e => {
        setVal(e.target.value);
        const res = await api.get('/catalog/search', {
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