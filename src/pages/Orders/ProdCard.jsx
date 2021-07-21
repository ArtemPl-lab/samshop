import { useState } from 'react';
import Image from '../../components/Image/Image';
import { IconDropdown } from '../../components/UiKit/UiKit';
import styles from './Orders.module.css';

const ProdCard = props => {
    const [active, setActive] = useState(false);
    if(!props.title) return <></>;
    return(
        <div className={styles.card}>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Image 
                    id={props.photos[0].thumb}
                    height={80}
                />
                <div className={styles.prod_info}>
                    <div className={styles.prod_title}>
                        {props.title}
                    </div>
                    <div className={styles.prod_amount}>
                        {props.amount}
                    </div>
                    <div className={styles.prod_dropdown} onClick={()=>setActive(!active)}>
                        {active ? 'Свернуть' : 'Развернуть'} &nbsp;
                        <IconDropdown style={{
                            transform: `rotate(${active ? '180' : '0'}deg)`
                        }}/>
                    </div>
                </div>
            </div>
            {
                active && props.options.length ? 
                <div className={styles.options}>
                    {
                    props.options.map(opt => 
                        <div>
                            <div className={styles.opt_label}>
                                {opt.id}
                            </div>
                            <div className={styles.opt_value}>
                                {opt.value}
                            </div>
                        </div>
                        ) 
                    }
                </div> :
                ''
            }
        </div>
    );
}

export default ProdCard;