import DragDropItem from '../../components/DragDropList/DragDropItem';
import styles from './Complations.module.css';
import update from 'immutability-helper';
import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/store';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, IconPlus } from '../../components/UiKit/UiKit';

export const ComplationsList = observer(() => {
    const { compilations } = useStore();
    const moveCard = (dragIndex, hoverIndex) => {
        const dragCard = compilations.list[dragIndex];
        compilations.setComplations(update(compilations.list, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard],
            ],
        }));
    }
    return(
        <>
            <ul className={styles.list}>
                {compilations.list.map((card, index)=> {
                    return(
                        <li key={card.id}>
                            <div className={styles.number}>№{index+1}</div>
                            <DragDropItem
                                index={index}
                                moveCard={moveCard}
                            >
                                <Card className={styles.card}>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect y="1" width="12" height="2" rx="1" fill="#BBBFDB"/>
                                        <rect y="5" width="12" height="2" rx="1" fill="#BBBFDB"/>
                                        <rect y="9" width="12" height="2" rx="1" fill="#BBBFDB"/>
                                    </svg>
                                    <div className={styles.info}>
                                        <div className={styles.title}>
                                            {card.title}
                                        </div>
                                        <div className={styles.counted}>
                                            {card.goods.length} товаров в этой подборке
                                        </div>
                                    </div>
                                </Card>
                            </DragDropItem>
                            <Link to={`/complations/${card.path}`} className={styles.edit}>
                                Редактировать
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <Button outline onClick={()=>compilations.add()}>
               <IconPlus /> Добавить подборку
            </Button>
        </>
    );
});