import React from "react";
import cross from '../images/crest.svg';

function ImagePopup(props) {
    return (
        <section className={`popup ${props.isOpen && 'popup popup_opened'}`} id="picture-big">
            <div className="popup__enlargement">
                <button
                    onClick={props.onClose}
                    className="popup__button-close popup__button-close_big"
                    type="button"
                >
                    <img className="popup__cross" src={cross} alt="Закрыть"/>
                </button>

                <img className="popup__item" src={props.image.link} alt={props.image.name}/>
                <h3 className="popup__name">{props.image.name}</h3>
            </div>
        </section>
    );
}
export default ImagePopup;