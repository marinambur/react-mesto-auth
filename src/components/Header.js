import React from 'react';
import { NavLink, Link, Route } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header(props) {
    const { loggedIn, loggedInEmail, signOut } = props;
    const headerElement = React.createRef();


    const nav = (
        <nav className={loggedIn ? "header__menu header__menu_mobile" : "header__menu"}>
            <Route path="/sign-up">
                <NavLink className="header__link" to="/sign-in">Войти</NavLink>
            </Route>
            <Route path="/sign-in">
                <Link className="header__link" to="/sign-up">Регистрация</Link>
            </Route>
            <Route path="/cards">
                <p className="header__email">{loggedInEmail}</p>
                <button onClick={signOut} type="button" className="header__exit">Выйти</button>
            </Route>
        </nav>
    );
//здесь будет адаптив


    return (
        <>
            <header ref={headerElement} className="header">
                <img className="header__logo" src={logo} alt="Логотип" />
                { nav }
            </header>
        </>
    );
}


export default Header;