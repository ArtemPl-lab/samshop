import { useState } from 'react';
import styles from './Toggle.module.css';

const Toggle = props => {
    const id = Math.random();
    const handler = props.onChange || console.log;
    return(
        <div className={styles.toggleWrapper}>
            <input type="checkbox" name={id} className={styles.mobileToggle} id={id} defaultChecked={props.active} onChange={handler}/>
            <label htmlFor={id}></label>
        </div>
    )
}

export default Toggle;