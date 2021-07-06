import { useState } from 'react';
import styles from './Tab.module.css';

export const Tabs = props => {
    const [ activeTab, setActiveTab ] = useState(0);
    const onChange = (index) => {
        const activeSlug = props.children[index].props.slug || index;
        if(props.onChange){
            props.onChange(activeSlug);
        }
        setActiveTab(index);
    }
    return(
        <div>
            <div className={`${styles.tabs_list} ${props.className}`}>
                {props.children.map((tab, index) => {
                    return(
                        <button 
                            className={`${styles.tab} ${index == activeTab ? styles.active : ''}`} 
                            onClick={()=>onChange(index)} 
                            key={index}
                        >
                            {tab.props.name}
                        </button>
                    );
                })}
            </div>
            {props.children[activeTab]}
        </div>
    );
}

export const Tab = props => {
    return(
        <div {...props} className={`${styles.tab_content} ${props.className}`}>
            {props.children}
        </div>
    );
}