import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/store';
import { Button } from '../UiKit/UiKit';
import styles from './SavePanel.module.css';

const SavePanel = props => {
    const { changesStore } = useStore();
    return(
        <div className={`${styles.panel} ${changesStore.hasChanges ? styles.active : ''}`}>
            <Button color="green" className={styles.btn} onClick={()=>changesStore.saveChanges()}>
                Сохранить
            </Button>
        </div>
    );
}

export default observer(SavePanel);