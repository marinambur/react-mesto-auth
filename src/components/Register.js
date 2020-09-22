import React from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {register} from "../utils/auth";


function Register(props) {
    const {rightInfoToolTip, openInfoToolTip} = props;
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useHistory();

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }


    function handleSubmit(e) {
        e.preventDefault();
        register(email, password)
            .then((res) => {
                if (res) {
                    rightInfoToolTip();
                    history.push('/sign-in');
                } else {
                    openInfoToolTip();
                }
            });
    }


    return (
        <div className="authorization">
            <form onSubmit={handleSubmit} className="authorization__form" id="register">
                <h2 className="authorization__title">Регистрация</h2>
                <input

                    onChange={handleChangeEmail}
                    type="email"
                    className="authorization__input"
                    id="email"
                    name="email"
                    value={email}
                    required
                    placeholder="Email"
                />
                <input
                    onChange={handleChangePassword}
                    type="password"
                    className="authorization__input"
                    id="password"
                    name="password"
                    value={password}
                    required
                    placeholder="Пароль"
                    pattern="[A-Za-zА-Яа-яЁё0-9 -]{2,40}"
                />
                <button type="submit" className="authorization__submit">Зарегистрироваться</button>
                <div className="authorization__nav">
                    <span>Уже зарегистрированы?&nbsp;</span>
                    <NavLink className="authorization__link" to="/sign-in">Войти</NavLink>
                </div>
            </form>
        </div>
    );
}

export default Register;