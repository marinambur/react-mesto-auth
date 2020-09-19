import React from 'react';
import './App.css';
import Header from "./Header.js";
import {Redirect, Route, Switch, useHistory, BrowserRouter} from 'react-router-dom';
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import api from "../utils/Api";
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import * as auth from '../utils/auth';

function App() {

    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([user, cards]) => {
                setCurrentUser(user);
                setCards(cards);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [dataImage, setDataImage] = React.useState({
        link: '',
        name: ''
    });
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(false);


    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(false);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleCardClick(props) {
        setSelectedCard(true);
        setDataImage({link: props.link, name: props.name});
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        if (isLiked) {
            api.deleteLike(card._id, isLiked).then((newCard) => {
                // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
                const newCards = cards.map((c) => c._id === card._id ? newCard : c);
                // Обновляем стейт
                setCards(newCards)

            })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            api.putLike(card._id, !isLiked).then((newCard) => {
                // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
                const newCards = cards.map((c) => c._id === card._id ? newCard : c);
                // Обновляем стейт
                setCards(newCards)

            })
                .catch((err) => {
                    console.log(err);
                });
        }
        // Отправляем запрос в API и получаем обновлённые данные карточки
    }


    function handleCardDelete(card) {
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.deleteCard(card._id).then(() => {
            // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
            const newCards = cards.filter((c) => c._id !== card._id);
            // Обновляем стейт
            setCards(newCards)

        }).catch((err) => {
            console.log(err);
        });
    }

    function handleUpdateUser(data) {
        api.updateUserInfo(data.name, data.about).then((updatedUserData) => {
            setCurrentUser(updatedUserData);
            closeAllPopups()
        })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }

    function handleUpdatePlace(data) {
        api.addNewCard(data.name, data.link).then((newCardData) => {
            setCards([...cards, newCardData]);
            closeAllPopups()
        })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }


    function handleUpdateAvatar(data) {
        api.setUserAvatar(data).then((updatedUserData) => {
            setCurrentUser(updatedUserData);
            closeAllPopups()
        })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }


    return (

        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <Header/>

                <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
                      onEditAvatar={handleEditAvatarClick} cards={cards}
                      onCardLike={handleCardLike} onCardDelete={handleCardDelete} onCardClick={handleCardClick}
                />

                <Route path="/sign-up">
                    <Register

                    />
                </Route>

                <Route path="/sign-in">
                    <Login/>
                </Route>


                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                                 onUpdateAvatar={handleUpdateAvatar}/>
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                                  onUpdateUser={handleUpdateUser}/>
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
                               onUpdatePlace={handleUpdatePlace}/>

                <PopupWithForm name={'sure'} title={'Вы уверены?'} buttonText={'Да'}/>
                <ImagePopup isOpen={selectedCard} onClose={closeAllPopups} image={dataImage}/>

                <Footer/>
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
