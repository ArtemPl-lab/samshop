import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import Toggle from '../Toggle/Toggle';
import styles from './CompilationCard.module.css';
import { useStore } from '../../store/store';
const CompilationCard = ({ id, handleChange, deleteCmp, toggleCmp, isActive, disabled = false }) => {
    const { compilations } = useStore();
    const cmp = compilations.list.find(el => el.id === id);
    return(
        <div style={{ display: "flex", width: "100%" }}>
            <Card className={styles.card}>
                <div className={styles.title}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="1" width="12" height="2" rx="1" fill="#BBBFDB"/>
                        <rect y="5" width="12" height="2" rx="1" fill="#BBBFDB"/>
                        <rect y="9" width="12" height="2" rx="1" fill="#BBBFDB"/>
                    </svg>
                    <select className={styles.select} onChange={(e)=> handleChange(e.target.value)}>
                        {
                            compilations.list.map(cmp => <option value={cmp.id} selected={cmp.id === id}>{cmp.title}</option>)
                        }
                    </select>
                </div>
                <Toggle 
                    onChange={(e)=>toggleCmp(cmp.id, e.target.checked)}
                    active={isActive}
                />
                {
                   disabled && <div className={styles.disabled}></div>
                }
            </Card>
        </div>
    )
}

export default CompilationCard;