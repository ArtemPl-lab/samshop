import { useEffect } from 'react';
import { useState, forwardRef } from 'react';
import api from '../../api/api';
import styles from './Image.module.css';
import { Load } from '../../pages';
const Image = forwardRef(({src, title, width, height, id, onClick, onLoad}, ref) => {
    const [image, setSrc] = useState(src);
    useEffect(async ()=>{
        console.log("lool");
        if(id){
            var urlCreator = window.URL || window.webkitURL;
            const resImg = await api.downloadMedia(id);
            setSrc(urlCreator.createObjectURL(resImg));
            onLoad && onLoad();
        }
    }, [id]);
    if(!image) return <Load />
    return(
        <>
            <img src={image} alt={title} className={styles.image} height={height} width={width} onClick={onClick} ref={ref}/>
        </>
    );
});

export default Image;