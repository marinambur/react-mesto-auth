import React from 'react';
import plus from "../images/plus.svg";
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Card from "./Card";


function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);
    return (
        <>
            <section className="profile">
                <img
                    className="profile__avatar"
                    alt="Аватарка"
                    src={currentUser.avatar}

                />
                <div onClick={props.onEditAvatar} className="profile__avatar_hover"></div>
                <div className="profile__container">
                    <div className="profile__info">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button onClick={props.onEditProfile} className="profile__button-small" type="button"></button>
                    </div>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button className="profile__button-large" type="button">
                    <img onClick={props.onAddPlace} src={plus} alt="Плюс"/>
                </button>
            </section>
            <section className="grid">
                {props.cards.map((card) => (
                    <Card key={card._id} card={card} onCardCick={props.onCardClick} onCardLike={props.onCardLike}
                          onCardDelete={props.onCardDelete}/>
                ))}
            </section>

        </>
    );
}

export default Main;