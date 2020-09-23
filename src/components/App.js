import React from 'react';
import './App.css';
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';
import Header from './Header';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import AllCards from "./AllCards";
import {getToken, register} from "../utils/auth";
import {authorize} from "../utils/auth";


function App() {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [loggedInEmail, setLoggedInEmail] = React.useState('');
    const history = useHistory();
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);//следим за tooltip окном
    const [rightInfoToolTip, setRightInfoToolTip] = React.useState(false);//если удалось зарегистрироваться успешно
    // eslint-disable-next-line
    const [email, setEmail] = React.useState('');
    // eslint-disable-next-line
    const [password, setPassword] = React.useState('');

    function handleLogin() {
        setLoggedIn(true);
    }

    function handleInfoTooltipOpen() {
        setIsInfoTooltipOpen(true);
    }

    function handleRightInfoToolTip() {
        setRightInfoToolTip(true);
    }

    function closeAllPopups() {
        setIsInfoTooltipOpen(false);
    }

    function signOut() {
        setLoggedInEmail('');
        localStorage.removeItem('token');
        setLoggedIn(false);
        history.push('/sign-in');
    }

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

    const handleSigninSubmit = (email, password) => {
        authorize(email, password)
            .then(data => {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    setEmail('');
                    setPassword('');
                    handleLogin();
                    tokenCheck();
                    history.push('/cards');
                } else {
                    throw new Error('Ошибка сервера: не удалось получить токен');
                }
            })
            .catch(err => {
                console.log(alert(`Ошибка авторизации: ${err}. Проверьте корректность данных в полях Email и Пароль`))
            })
    }

    const handleSignupSubmit = (email, password) => {
        register(email, password)
            .then((res) => {
                if (res) {

                    handleRightInfoToolTip();
                    setTimeout(handleInfoTooltipOpen, 700);//без settimeout попап с успешной регистрацией не успевает открываться
                    history.push('/sign-in');
                } else {

                    handleInfoTooltipOpen();
                }
            });
    }

    return (

        <div className="page">
            <Header loggedInEmail={loggedInEmail} signOut={signOut} loggedIn={loggedIn}/>
            <Switch>
                <ProtectedRoute path="/cards" loggedIn={loggedIn} component={AllCards}/>
                <Route path="/sign-up">
                    <Register
                        handleInfoTooltipOpen={handleInfoTooltipOpen}
                        handleRightInfoToolTip={handleRightInfoToolTip}
                        onSignup={handleSignupSubmit}
                    />
                </Route>
                <Route path="/sign-in">
                    <Login
                        handleLogin={handleLogin}
                        tokenCheck={tokenCheck}
                        onSignin={handleSigninSubmit}

                    />
                </Route>
                <Route path="/">
                    <Redirect to="/sign-in"/>
                </Route>
            </Switch>
            <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} rightStyle={rightInfoToolTip}/>
        </div>
    );
}

export default App;
