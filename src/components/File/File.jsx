import styles from './File.module.css';
import api from '../../api/api';
const File = props => {
    const id = Math.random();
    const handleChange = async e => {
        const resp = await api.uploadMedia(e.target.files[0]);
        if(resp.status === 200){
            const { id } = await resp.json();
            if(props.onChange){
                props.onChange(id, e.target.files[0]);
            }
        }
    }
    return(
        <>
            <input type="file" className={styles.input} id={id} onChange={props.onChange} onChange={handleChange}/>
            <label htmlFor={id} {...props} className={`${styles.label} ${props.className}`} />
        </>
    );
}

export default File;