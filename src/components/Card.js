import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";


function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner._id === currentUser._id;

    function handleClick() {
        props.onCardCick(props.card)
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleCardDelete() {
        props.onCardDelete(props.card)
    }

    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    return (
        <div className="card" key={props.card._id} id={props.card._id}>
            <button type="button" className={`card__delete ${!isOwn && 'card__delete card__delete_invisible'}`}
                    onClick={handleCardDelete}></button>
            <img onClick={handleClick} data-name="" className="card__item" src={props.card.link}
                 alt={props.card.name}/>
            <div className="card__text">
                <h3 className="card__header">{props.card.name}</h3>
                <div className="card__likes">
                    <button type="button" className={`card__heart ${isLiked && 'card__heart card__heart_active'}`}
                            onClick={handleLikeClick}></button>
                    <span className="card__span-like">{props.card.likes.length}</span>
                </div>
            </div>
        </div>
    );
}

export default Card;