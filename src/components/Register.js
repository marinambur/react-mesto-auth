import React from 'react';
import {NavLink, useHistory} from 'react-router-dom';
export const BASE_URL = 'https://auth.nomoreparties.co';

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

    const register = (email, password) => {
        return fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                return res.json().then((data) => Promise.reject(`${res.status} - ${data.error || 'Ошибка'}`));
            })
            .catch((err) => console.log(err));
    };

    function handleSubmit(e) {
        e.preventDefault();
        register(email, password)
            .then((res) => {
                if (res) {
                    rightInfoToolTip();
                    setTimeout(openInfoToolTip, 1000);
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
                    required
                    placeholder="Email"
                />
                <input
                    onChange={handleChangePassword}
                    type="password"
                    className="authorization__input"
                    id="password"
                    name="password"
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