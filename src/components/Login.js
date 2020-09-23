import React from 'react';
import {NavLink} from 'react-router-dom';


function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }


    const handleSigninSubmit = (e) => {
        e.preventDefault();
        props.onSignin(email, password);
    }

    return (
        <div className="authorization">
            <form onSubmit={handleSigninSubmit} className="authorization__form" id="login">
                <h2 className="authorization__title">Вход</h2>
                <input
                    onChange={handleChangeEmail}
                    type="email"
                    value={email}
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