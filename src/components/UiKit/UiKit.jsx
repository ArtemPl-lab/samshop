import { Link, useHistory } from 'react-router-dom';
import styles from './UiKit.module.css';

export const MenuLink = props => {
    return (
        <Link {...props} className={styles.link}/>
    );
}

export const Hr = props => {
    return <hr {...props} className={styles.hr}/>
}
export const Button = props => {
    const outline = (props.outline ? styles.outline : '');
    const color = (props.color ? styles[props.color] : '');
    return (
        <button {...props} className={`${styles.button} ${color} ${outline} ${props.className}`}/>
    );
}

export const IconPlus = props => {
    return(
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" width="2" height="12" rx="1" fill="white"/>
            <rect y="5" width="12" height="2" rx="1" fill="white"/>
        </svg>
    );
}
export const IconLoad = props => {
    return(
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.99976 12C5.44747 12 4.99976 11.5523 4.99976 11L4.99976 5.69068L1.86592 7.5C1.38763 7.77614 0.776035 7.61227 0.499893 7.13397C0.223751 6.65568 0.387625 6.04409 0.865919 5.76795L5.19605 3.26795C5.27767 3.22082 5.36317 3.18651 5.45022 3.16439C5.60792 3.06048 5.79678 3 5.99976 3C6.19015 3 6.36812 3.05321 6.5196 3.14557C6.63832 3.16399 6.7557 3.20427 6.866 3.26795L11.1961 5.76795C11.6744 6.04409 11.8383 6.65568 11.5621 7.13397C11.286 7.61227 10.6744 7.77614 10.1961 7.5L6.99976 5.65457L6.99975 11C6.99975 11.5523 6.55204 12 5.99976 12Z" fill="white"/>
            <rect width="12" height="2" rx="1" fill="white"/>
        </svg>
    );
}
export const IconSend = props => {
    return(
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.7403 5.93249L10.2402 1.18296C9.75878 0.767182 9 1.10471 9 1.75059V4.25224C3.98034 4.30971 0 5.31574 0 10.0728C0 11.9928 1.23691 13.895 2.60416 14.8894C3.03081 15.1998 3.63888 14.8103 3.48156 14.3072C2.06456 9.77556 4.15366 8.57249 9 8.50278V11.2501C9 11.897 9.75938 12.233 10.2402 11.8177L15.7403 7.06774C16.0863 6.76893 16.0868 6.23171 15.7403 5.93249Z" fill="#2E5BFF"/>
        </svg>
    );
}
export const IconDropdown = props => {
    return(
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
            <path d="M4.13397 7.5C4.51887 8.16667 5.48113 8.16667 5.86603 7.5L9.33013 1.5C9.71503 0.833333 9.2339 -8.94676e-07 8.4641 -8.27378e-07L1.5359 -2.21695e-07C0.766097 -1.54397e-07 0.284972 0.833333 0.669873 1.5L4.13397 7.5Z" fill="#2E384D"/>
        </svg>
    );
}
export const SectionTitle = props => {
    return <h2 {...props} className={`${styles.section_title} ${props.className}`} />
}

export const Card = props => {
    return <div {...props} className={`${styles.card} ${props.className}`}/>
}

export const OrderStatus = (props) => {
    let colorClass = styles.default;
    switch(props.status){
        case "Оплачен":
            colorClass = styles.success;
            break;
        case "В доставке":
            colorClass = styles.warning;
            break;
        case "Отменён":
            colorClass = styles.error;
            break;
    }
    return <div {...props} className={`${colorClass} ${props.className}`} children={props.status}/>

}
export const DiscountText = props => {
    let colorClass;
    if(props.discount_percent == 0){
        colorClass = styles.default;
    } else if(props.discount_percent < 20){
        colorClass = styles.success;
    } else if(props.discount_percent < 60){
        colorClass = styles.warning;
    } else {
        colorClass = styles.error;
    }
    return(
        <div {...props} className={`${colorClass} ${props.className}`}>Скидка {props.discount_percent}%</div>
    );
}
export const Search = props => {
    return(
        <input {...props} className={`${styles.search} ${props.className}`} />
    );
}

export const ComeBack = props => {
    const history = useHistory();
    return <div className={styles.comeback} onClick={history.goBack}>{props.text || 'Назад'}</div>
}