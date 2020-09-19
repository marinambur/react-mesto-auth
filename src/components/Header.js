import React from 'react';
import logo from '../images/logo.svg';

function Header() {
    return (
        <header className="header">
            <a className="header__container" href="#"
            ><img
                className="header__logo"
                src={logo}
                alt="Логотип Россия"
            />
            </a>
        </header>
    );
}

export default Header;