import { useEffect } from 'react';
import { useState } from 'react';
import api from '../../api/api';
import styles from './Image.module.css';
import { Load } from '../../pages';
const Image = ({src, title, width, heigth, id}) => {
    const [image, setSrc] = useState(src);
    useEffect(async ()=>{
        console.log("lool");
        if(id){
            var urlCreator = window.URL || window.webkitURL;
            const resImg = await api.downloadMedia(id);
            console.log(resImg);
            setSrc(urlCreator.createObjectURL(resImg));
        }
    }, [id]);
    if(!image) return <Load />
    return(
        <>
            <div className={styles.title}>
                {title}
            </div>
            <img src={image} alt={title} className={styles.image} height={heigth} width={width}/>
        </>
    );
}

export default Image;