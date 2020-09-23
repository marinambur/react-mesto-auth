import React from 'react';
import {NavLink} from 'react-router-dom';



function Register(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');


    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }


    const handleSignupSubmit = (e) => {
        e.preventDefault();
        props.onSignup(email, password);
    }


    return (
        <div className="authorization">
            <form onSubmit={handleSignupSubmit} className="authorization__form" id="register">
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