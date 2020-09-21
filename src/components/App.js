import React from 'react';
import './App.css';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import AllCards from "./AllCards";
const BASE_URL = 'https://auth.nomoreparties.co';



function App() {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [loggedInEmail, setLoggedInEmail] = React.useState('');
    const history = useHistory();
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);//следим за tooltip окном
    const [rightInfoToolTip, setRightInfoToolTip] = React.useState(false);//если удалось зарегистрироваться успешно



    function handleLogin() {
        setLoggedIn(true);
    }
    function handleRightInfoToolTip() {
        setRightInfoToolTip(true);
    }
    function handleInfoTooltipOpen() {
        setIsInfoTooltipOpen(true);
    }
    function closeAllPopups() {
        setIsInfoTooltipOpen(false);
    }
    function signOut () {
        setLoggedInEmail('');
        localStorage.removeItem('token');
        setLoggedIn(false);
        history.push('/sign-in');
    }

    const getToken = (token) => {
        return fetch(`${BASE_URL}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                return res.json().then((data) => Promise.reject(`${res.status} - ${data.error || 'токен не передан или передан не в том формате'}`));
            })
            .catch((err) => console.log(err));
    };

    function tokenCheck() {
        const token = localStorage.getItem('token');
        if (token) {
            getToken(token)
                .then((res) => {
                    if (res.data) {
                        handleLogin();
                        setLoggedInEmail(res.data.email);
                        history.push('/cards');
                    } else {
                        localStorage.removeItem('token');
                    }
                });
        }
    }

    React.useEffect(() => {
        tokenCheck();
        // eslint-disable-next-line
    }, [loggedIn]);


    return (

        <div className="page">
            <Header loggedInEmail={loggedInEmail} signOut={signOut} loggedIn={loggedIn} />
            <Switch>
                <ProtectedRoute path="/cards" loggedIn={loggedIn} component={AllCards} />
                <Route path="/sign-up">
                    <Register
                        openInfoToolTip={handleInfoTooltipOpen}
                        rightInfoToolTip={handleRightInfoToolTip}
                    />
                </Route>
                <Route path="/sign-in">
                    <Login
                        openInfoToolTip={handleInfoTooltipOpen}
                        rightInfoToolTip={handleRightInfoToolTip}
                        handleLogin={handleLogin}
                        tokenCheck={tokenCheck}
                    />
                </Route>
                <Route path="/">
                    <Redirect to="/sign-in" />
                </Route>
            </Switch>
            <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} rightStyle={rightInfoToolTip} />
        </div>
    );
}

export default App;
