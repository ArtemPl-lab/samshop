import React from 'react';
import styles from './Card.module.css';

const Card = React.forwardRef((props, ref) => {
    const dropClass = props.isDragging ? styles.dropClass : '';
    return <div {...props} className={`${styles.card}  ${props.className} ${dropClass}`} ref={ref}/>
});

export default Card;