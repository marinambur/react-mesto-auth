import React from 'react';
import success from '../images/success.svg';
import error from '../images/error.svg';

function InfoTooltip(props) {


    return (
        <div id="infoTooltip" className="popup popup_opened">
            <div className="popup__container popup__container_size_tooltip">
                <button className="popup__button-close" type="button"></button>
                <img className="popup__tooltip-image" alt="картинка" />
                <span className="popup__tooltip-message">'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'</span>
            </div>
        </div>
    );
}

export default InfoTooltip;