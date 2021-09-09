

import styles from './Accounts.module.css';
import { Load } from '../Load';
import { useInView } from 'react-intersection-observer';
import { useStore } from '../../store/store';
import { observer } from 'mobx-react-lite';
import listStyle from './Lists.module.css';
import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
const Lists = observer(({ userId }) => {
    const { ref, inView} = useInView({ threshold: 0 });
    const { accounts } = useStore();
    const user = accounts.list.find(u => u.id == userId);
    if(inView && !user.load){
        console.log("lists");
        accounts.loadUserLists(userId);
    }
    if(!user) return <></>;
    return (
        <div className={styles.orders_grid}>
            {
                user.listsLoaded && !user.lists ? 
                'Нет списков' : (user.lists ? user.lists.map((list, index) => {
                    return (
                        <Card className={listStyle.wrapper}>
                            <div className={listStyle.title}>
                                {capitalizeFirstLetter(list.name)}
                            </div>
                            <div className={listStyle.counter}>
                                {list.items_count} товаров
                            </div>
                            <Link to={`/lists/${list.id}`} className={listStyle.more}>
                                Открыть детали
                            </Link>
                        </Card>
                    );
                })
                : 'Загрузка...')
            }
            {
                !user.listsLoaded ? 
                <div ref={ref}>
                    <Load /> 
                </div> : ''
            }
        </div>
    )
});

export default Lists;