import React from 'react';


function Login(props) {

    return (
        <div className="authorization">
            <form className="authorization__form" id="login">
                <h2 className="authorization__title">Вход</h2>
                <input


                    type="email"
                    className="authorization__input"
                    id="email"
                    name="email"
                    required
                    placeholder="Email"
                />
                <input

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
                </div>
            </form>
        </div>
    );
}

export default Login;