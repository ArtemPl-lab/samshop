import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { SectionTitle, ComeBack, Button, IconSend } from '../../components/UiKit/UiKit';
import { useStore } from "../../store/store";
import styles from './Accounts.module.css';
import Input from "../../components/Input/Input";
import { generate } from 'generate-password';
import { Tabs, Tab } from '../../components/Tabs';
import { observer } from "mobx-react-lite";
import Orders from "./Orders";

export const AccountsEdit = observer(props => {
    const { id } = useParams();
    const { accounts, changesStore } = useStore();
    const [error, setError] = useState();
    const [load, setLoad] = useState(true);
    const history = useHistory();
    const [ userData, setUserDate ] = useState({
        phone: '',
        name: '',
        discount_percent: 0,
        email: '',
        password: generate({
            length: 10,
            numbers: true
        })
    });
    const handleChange = (e) => {
        let newData = {
            ...userData,
            [e.target.name]: e.target.value
        };
        newData = {
            ...newData,
            discount_percent: parseInt(newData.discount_percent) || newData.discount_percent
        }
        if(Object.keys(newData).every(key => (newData[key] !== ''))) {
            changesStore.addChange((id === 'new' ? 'newUser' : `changeUser${id}`), ()=>{
                accounts.saveUser(newData)
            });
        }
        else {
            changesStore.removeChange((id === 'new' ? 'newUser' : `changeUser${id}`));
        }
        setUserDate(newData);
    }
    const bulkUser = async (e) => {
        let conf = window.confirm("Вы уверены, что хотите удалить пользователя?");
        if(conf){
            const status = await accounts.deleteUser(id);
            if(status === 200) {
                history.goBack();
                changesStore.removeChange((id === 'new' ? 'newUser' : `changeUser${id}`));
            }
            else console.log(status);
        }
    }
    const generatePassword = () => {
        handleChange({
            target:{
                name: "password",
                value: generate({
                    length: 10,
                    numbers: true
                })
            }
        });
    }
    const sendPassword = () => {
        accounts.sendUserPassword(id, userData.password);
        setUserDate({
            ...userData,
            password: ''
        });
        changesStore.removeChange((id === 'new' ? 'newUser' : `changeUser${id}`));

    }
    useEffect(async () => {
        if(id !== 'new'){
            const user = await accounts.getUser(id);
            if(user){
                setUserDate(user);
            }
            else{
                setError("Кривой id-шник пользователя");
            }
        }
        setLoad(false);
    }, [id]);
    if(error) return <SectionTitle>{error}</SectionTitle>
    if(load) return "Загрузка...";
    return(
        <div className={styles.wrapper}>
            <ComeBack />
            <SectionTitle>
                {id !== 'new' ? userData.name : 'Новый пользователь'}
            </SectionTitle>
            <div>
                <div className={styles.row}>
                    <Input 
                        label="ФИО пользоватля" 
                        className={`${styles.input} ${styles.col3}`} 
                        onChange={handleChange}
                        name="name"
                        value={userData.name}
                    />
                    <Input 
                        label="Скидка(%)" 
                        className={`${styles.input} ${styles.col1}`} 
                        onChange={handleChange}
                        name="discount_percent"
                        value={userData.discount_percent}
                    />
                </div>
                <div className={styles.row}>
                    <Input 
                        label="Номер телефона" 
                        className={styles.input} 
                        onChange={handleChange}
                        name="phone"
                        value={userData.phone}
                    />
                    <Input 
                        label="E-mail" 
                        className={styles.input} 
                        onChange={handleChange}
                        name="email"
                        value={userData.email}
                    />
                </div>
                <div className={styles.row}>
                    <Input 
                        label="Пароль" 
                        className={styles.input} 
                        onChange={handleChange}
                        name="password"
                        value={userData.password}
                    />
                    {
                        id !== 'new' ?
                        <Button onClick={sendPassword} outline disabled={!userData.password}>
                            <IconSend />
                            Отправить пароль
                        </Button> :
                        ''
                    }
                </div>
                <div className={styles.generatePass} onClick={generatePassword}>
                    Сгенерировать новый пароль
                </div>
            </div>
            {
                id !== 'new' && userData.name ?
                <>
                    <div className={styles.bulk_account} onClick={bulkUser}>
                        Удалить аккаунт
                    </div>
                    <Tabs className={styles.tabs}>
                        <Tab name="Списки">
                            Нет списков
                        </Tab>
                        <Tab name="Заказы">
                            <Orders userId={id}/>
                        </Tab>
                    </Tabs>
                </> : ''
            }
        </div>
    );
});