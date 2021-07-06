import styles from './Input.module.css';

const Input = props => {
    const id = Math.random();
    return(
        <div className={props.className}>
            {
                props.label ?
                <label htmlFor={id} className={styles.label}>{props.label}</label> :
                ''
            }
            <input  {...props} className={styles.input} id={id}/>
        </div>
    );
}

export default Input;