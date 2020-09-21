import React from 'react';
import {NavLink, useHistory} from 'react-router-dom';

const BASE_URL = 'https://auth.nomoreparties.co';

function Login(props) {
    const {handleLogin, tokenCheck} = props;
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

        const authorize = (email, password) => {
            return fetch(`${BASE_URL}/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    return res.json().then((data) => Promise.reject(`${res.status} - ${data.error || 'пользователь с email не найден'}`));
                })
                .catch((err) => console.log(err));
        };


        if (!email || !password) {
            return;
        }

        authorize(email, password)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    setEmail('');
                    setPassword('');
                    handleLogin();
                    tokenCheck();
                    history.push('/cards');
                }
            })
            .catch((err) => console.log(err));
    }


    return (
        <div className="authorization">
            <form onSubmit={handleSubmit} className="authorization__form" id="login">
                <h2 className="authorization__title">Вход</h2>
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
                <button type="submit" className="authorization__submit">Войти</button>
                <div className="authorization__nav">
                    <span>Ещё не зарегистрированы?&nbsp;</span>
                    <NavLink className="authorization__link" to="/sign-up">Регистрация</NavLink>
                </div>
            </form>
        </div>
    );
}

export default Login;