import {  IconPlus, SectionTitle, Button } from "../../components/UiKit/UiKit";
import Image from '../../components/Image/Image';
import { useStore } from "../../store/store";
import styles from './Home.module.css';
import Tiny from "../../components/Editor/Editor";
import Complations from "../../components/Complations/Complations";


export const Homepage = props => {
    const { changesStore } = useStore();
    
    const savePage = async () => {
        // console.log(counter);
    }
    return(
        <>
            <section className={styles.compilations}>
                <SectionTitle>
                    Подборки на главной
                </SectionTitle>
                <p className={styles.desc}>
                    Выберите подборки, которые будут показаны на Главной странице. Максимум 5 подборок.
                </p>
                <div className={styles.grid}>
                    <Complations />
                </div>
                <Button color="blue">
                    <IconPlus />
                    Добавить подборку
                </Button>
            </section>
            <section className={styles.products}>
                <SectionTitle>
                    Товары на главной
                </SectionTitle>
                <p className={styles.desc}>
                    Выберите товары, которые будут показаны на Главной странице. Максимум 4 товара.
                </p>
            </section>
            <section className={styles.advertising}>
                <SectionTitle>
                    Рекламный блок
                </SectionTitle>
                <div className={styles.advertisingContent}>
                    <div className={styles.advertisingImage}>
                        <Image src="/h.jpg" title="Фотография (592х592 рх.)" heigth="232px" width="232px" />
                    </div>
                    <div>
                        <Tiny />
                    </div>
                </div>
            </section>

        </>
    );
}