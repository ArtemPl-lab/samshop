import { useState } from 'react';
import { ComplationsList } from './ComplationsList';
import styles from './Complations.module.css';
import { SectionTitle } from '../../components/UiKit/UiKit';

export const ComplationsPage = props => {
    return(
        <>
            <SectionTitle>
                Подборки
            </SectionTitle>
            <p className={styles.desc}>
                Все подборки, в порядке отображения на странице.
            </p>
            <ComplationsList />
        </>
    );
}
 