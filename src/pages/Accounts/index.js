import styles from './Accounts.module.css';
import { Button, IconPlus, SectionTitle, Search } from "../../components/UiKit/UiKit";
import { Link } from 'react-router-dom';
import { useStore } from '../../store/store';
import { observer } from 'mobx-react-lite';
import { Load } from '../Load';
import AccountCard from './AccountCard';
import { useInView } from 'react-intersection-observer';
export const Accounts = observer(props => {
    const { accounts } = useStore();
    const { ref, inView} = useInView({ threshold: 0 });
    if(inView) accounts.loadAccounts();
    const searchHandler = (e) => {
        accounts.setFilters("name_filter", e.target.value);
    }
    return(
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <SectionTitle>
                    Аккаунты
                </SectionTitle>
                <Link to="/accounts/new/">
                    <Button color="blue" className={styles.add}>
                        <IconPlus />
                        Новый аккаунт
                    </Button>
                </Link>
            </div>
            <div className={styles.filters}>
                <Search 
                    placeholder="Поиск по имени"
                    onChange={searchHandler} 
                    value={accounts.options.name_filter ? accounts.options.name_filter : ''}/>
            </div>
            <div className={styles.cards}>
                {accounts.list.map(account => <AccountCard {...account}/>)}
            </div>
            {
                accounts.havePosts ?
                <div ref={ref}>
                    <Load /> 
                </div> : ''
            }
        </div>
    );
});


