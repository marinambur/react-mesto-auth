import React from 'react';
import success from '../images/success.svg';
import error from '../images/error.svg';
import cross from "../images/crest.svg";

function InfoTooltip(props) {
    const { isOpen, onClose, rightStyle } = props;

    return (
        <div id="infoTooltip" className={(isOpen ? "popup popup_opened" : "popup")}>
            <div className="popup__container popup__container_size_tooltip">
                <img className="popup__tooltip-image" src={(rightStyle ? success : error)} alt="картинка" />
                <span className="popup__tooltip-message">{rightStyle ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</span>
                <button
                    onClick={onClose}
                    className="popup__button-close"
                    type="button"
                >
                    <img className="popup__cross" src={cross} alt="Закрыть"/>
                </button>
            </div>
        </div>
    );
}

export default InfoTooltip;
