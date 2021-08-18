import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useState } from 'react';
import api from '../../../api/api';
import { useStore } from '../../../store/store';
import { MenuLink, Hr, Button, IconPlus } from '../../UiKit/UiKit';
import MenuItem from './Item/Item';
import styles from './Menu.module.css';


const Menu = props => {
    const { has_new } = useStore();
    const menuItems = [
        {
            component: MenuLink,
            props: {
                to: '/home'
            },
            content: 'Главная страница',
            bage: false
        },
        {
            component: MenuLink,
            props: {
                to: '/complations'
            },
            content: 'Подборки',
            bage: false
        },
        {
            component: MenuLink,
            props: {
                to: '/parthners'
            },
            content: 'Дизайнерам',
            bage: false
        },
        {
            component: MenuLink,
            props: {
                to: '/about'
            },
            content: 'Об авторе',
            bage: false
        },
        {
            component: MenuLink,
            props: {
                to: '/designers'
            },
            content: 'Дизайнеры товаров',
            bage: false
        },
        {
            component: MenuLink,
            props: {
                to: '/pages'
            },
            content: 'Внутренние страницы',
            bage: false
        },
        {
            component: Hr,
            props: {},
            content: null,
            bage: false
        },
        {
            component: MenuLink,
            props: {
                to: '/orders'
            },
            content: 'Заказы',
            bage: has_new.data.orders
        },
        {
            component: MenuLink,
            props: {
                to: '/requests'
            },
            content: 'Заявки',
        },
        {
            component: MenuLink,
            props: {
                to: '/accounts'
            },
            content: 'Аккаунты', 
            bage: has_new.data.accounts
        }
    ];
    
    return(
        <ul className={styles.menu}>
            {
                menuItems.map((item, index) => <MenuItem item={item} key={index}/>)
            }
        </ul>
    );
};

export default observer(Menu);