import { observer } from 'mobx-react-lite';
import { MenuLink, Hr, Button, IconPlus } from '../../UiKit/UiKit';
import MenuItem from './Item/Item';
import styles from './Menu.module.css';

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
        content: 'Партнёрская программа',
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
    // {
    //     component: MenuLink,
    //     props: {
    //         to: '/fields'
    //     },
    //     content: 'Свойства товаров',
    //     bage: false
    // },
    {
        component: MenuLink,
        props: {
            to: '/pages'
        },
        content: 'Внутренние страницы',
        bage: false
    },
    // {
    //     component: Button,
    //     props: {
    //         outline: true
    //     },
    //     content: <><IconPlus />Добавить товар</>,
    //     bage: false
    // },
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
    }
];

const Menu = props => {
    return(
        <ul className={styles.menu}>
            {
                menuItems.map(
                    (item, key) => <MenuItem item={item} key={key} />
                )
            }
        </ul>
    );
}

export default observer(Menu);