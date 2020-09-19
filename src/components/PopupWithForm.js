import React from 'react';
import cross from '../images/crest.svg';

function PopupWithForm(props) {

    return (
        <section id={props.name} className={`popup ${props.isOpen && 'popup popup_opened'}`}>
            <div className="popup__container">
                <button className="popup__button-close" type="button">
                    <img className="popup__cross" src={cross} alt="Закрыть" onClick={props.close}/>
                </button>
                <h2 className="form__heading">{props.title}</h2>
                {props.children}
                <button type="submit" className="form__save" onClick={props.onSubmit}>Сохранить</button>

            </div>
        </section>
    );
}

export default PopupWithForm;