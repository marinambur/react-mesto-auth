import React from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from '../contexts/CurrentUserContext';


function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name: name,
            about: description
        });
    }


    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);

    }

    return (
        <PopupWithForm name={'information'} title={'Редактировать профиль'} buttonText={'Сохранить'}
                       onSubmit={handleSubmit}
                       isOpen={props.isOpen} close={props.onClose} children={<form
            className="form"
            id="formname"
            name="form"
            method="post"
            action="#"
            noValidate
        >
            <fieldset className="form__name">
                <input
                    className="text-form text-form_name"
                    type="text"
                    value={name || ''}
                    name="name"
                    id="name-input"
                    required
                    pattern="^[A-Za-zА-Яа-я\s-]+$"
                    minLength="2"
                    maxLength="40"
                    onChange={handleNameChange}
                />
            </fieldset>
            <span id="name-input-error" className="form__error"></span>
            <fieldset className="form__subject">
                <input
                    className="text-form text-form_subject"
                    type="text"
                    name="link"
                    value={description || ''}
                    id="profession"
                    required
                    pattern="^[A-Za-zА-Яа-я\s-]+$"
                    minLength="2"
                    maxLength="200"
                    onChange={handleDescriptionChange}
                />
            </fieldset>
            <span id="profession-error" className="form__error"></span>
        </form>}
        />

    );
}

export default EditProfilePopup;