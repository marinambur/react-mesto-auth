import React from 'react';

import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from '../contexts/CurrentUserContext';


function EditAvatarPopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const avatarRef = React.useRef();

    React.useEffect(() => {
        avatarRef.current.value = currentUser.avatar;
    }, [currentUser]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
                avatar: avatarRef.current.value
            }
        );
    }



    return (

        <PopupWithForm name={'avatar'} title={'Обновить аватар'} buttonText={'Сохранить'} onSubmit={handleSubmit}
                       children={<form className="form form-add" name="form" method="post" action="#">
                           <fieldset className="form__subject">
                               <input
                                   ref={avatarRef}
                                   className="text-form text-form_subject place-form_link text-form__avatar"
                                   type="url"
                                   name="link"
                                   id="link-avatar"
                                   required
                                   placeholder="Ссылка на картинку"
                               />
                           </fieldset>
                           <span id="link-avatar-error" className="form__error"></span>
                       </form>}
                       isOpen={props.isOpen} close={props.onClose}/>
    );
}

export default EditAvatarPopup;