import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Input from '../../components/Input/Input';
import { SectionTitle, Button } from "../../components/UiKit/UiKit";
import styles from './Login.module.css';
import { useStore } from "../../store/store";

export const Login  = props => {
    const reRef = useRef();
    const { user } = useStore();
    const [formState, setFormState] = useState({
        phone: '',
        password: ''
    });
    const onSubmit = async (e) => {
        e.preventDefault();
        const token = await reRef.current.executeAsync();
        reRef.current.reset();
        user.authentication({
            ...formState,
            captcha_token: token
        });
    }
    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    }
    return(
        <section className={styles.wrapper}>
            <div className={styles.title}>
                <SectionTitle>
                    Вход в панель управления
                </SectionTitle>
            </div>
            <form onSubmit={onSubmit}>
                <Input label="Логин" className={styles.input} name="phone" onChange={handleChange} value={formState.phone}/>
                <Input label="Пароль" className={styles.input} name="password" onChange={handleChange} value={formState.password}/>
                <ReCAPTCHA
                    sitekey="6LeR1ZcaAAAAAGk-tChHuNpxljuL37fI32xTOdck"
                    size='invisible'
                    ref={reRef}
                />
                <Button color="blue" className={styles.btn}>
                    Войти
                </Button>
            </form>
        </section>
    );
}