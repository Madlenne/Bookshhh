/* eslint-disable max-statements-per-line */
/* eslint-disable max-statements */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-ternary */
/* eslint-disable max-lines-per-function */
import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import Search from '../Search/Search.jsx';
import Ring from '../../icons/ring.png';
import User from '../../icons/user.png';
import Exam from '../../icons/exam.png';
import LogIn from '../../icons/log-in.png';
import BookStack from '../../icons/books-stack-of-three.png';
import Dropdown from '../ui/Dropdown/Dropdown.jsx';
import classnames from 'classnames/bind';
import * as firebase from 'firebase/app';

import css from './Header.module.scss';
const cln = classnames.bind(css);

const SESSION_DURATION = 1000 * 60 * 60;

const userButtonRenderer = (onClick, ref) => <img src={User} className={css.user} onClick={onClick} ref={ref} alt="userIcon"/>;

const ringButtonRenderer = (onClick, ref) => <img src={Ring} className={css.ring} onClick={onClick} ref={ref} alt="ringIcon"/>;

const Header = ({ mode }) => {

    const location = useLocation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginFailed, setIsLoginFailed] = useState(false);
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [shouldShowRegisterModal, setShouldShowRegisterModal] = useState(false);

    const highlightCurrentTab = tabName => {
        const { pathname } = location;
        
        return pathname.substring(1) === tabName;
    };

    const showRegisterModal = () => {
        setShouldShowRegisterModal(true);
    };

    const logInButtonRenderer = (onClick, ref) => <img src={LogIn}
    className={css.loginIcon}
    onClick={ () => {
    onClick(); setShouldShowRegisterModal(false);
    }}
    ref={ref} alt="logInIcon"/>;

    const logIn = () => {
        firebase.auth().signInWithEmailAndPassword(username, password)
        .catch(error => {
            setIsLoginFailed(true);
             console.error( error.code, error.message);
     
          });
          
    };

    const signUp = () => {
        firebase.auth().createUserWithEmailAndPassword(username, password)
        .catch(error => {
            
            console.error(error);
          });
          
    };

    const logOut = () => {
        firebase.auth().signOut()
        .catch((error) => {
            console.error(error);

        });
    }

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
          setIsLoggedIn(true);

          user.getIdTokenResult().then((idTokenResult) => {

            const authTime = idTokenResult.claims.auth_time * 1000;
            const sessionDuration = SESSION_DURATION;
            const millisecondsUntilExpiration = sessionDuration - (Date.now() - authTime);
            const sessionTimeout = setTimeout(() => firebase.auth().signOut(), millisecondsUntilExpiration);
          });


        } else {
            setIsLoggedIn(false);

        }
      });
    const renderLoginModal = () => <Dropdown key={isLoggedIn} buttonRenderer={logInButtonRenderer} arrowPosition={72} className={css.loginDropdown}>
        <Dropdown.Item itemKey="Login" className={css.loginItem}>
            <input type="text" className={cln('loginInput', { 'loginFailureInput': isLoginFailed })} value={username} onChange={event => setUsername(event.target.value)} placeholder="Login"/>
        </Dropdown.Item>

        <Dropdown.Item itemKey="Password" className={css.loginItem}>
            <input type="password" className={cln('loginInput', { 'loginFailureInput': isLoginFailed })} value={password} onChange={event => setPassword(event.target.value)} placeholder="Password"/>
        </Dropdown.Item>
        { isLoginFailed && <Dropdown.Item>
          <span className={css.wrongCredentials}> Wrong credentials! </span>
         </Dropdown.Item>}
        <Dropdown.Item itemKey="Submit" className={css.loginItem}>
        <button type="submit" className={cln('loginButton', { 'loginFailureButton': isLoginFailed })} onClick={logIn}> {isLoginFailed ? 'Try again' : 'Log in'} </button>
        </Dropdown.Item>
        <Dropdown.Item itemKey="Register" className={css.register}>
            <span onClick={showRegisterModal} > No account yet? Click here to sign up! </span>
            
        </Dropdown.Item>
         
    </Dropdown>;


    const renderRegisterModal = () => <Dropdown buttonRenderer={logInButtonRenderer} arrowPosition={75}>
             <Dropdown.Item itemKey="Login" className={css.loginItem}>
                 <input type="text" className={css.loginInput} onChange={event => setUsername(event.target.value)} placeholder="Login"/>
             </Dropdown.Item>

             <Dropdown.Item itemKey="Password" className={css.loginItem}>
                 <input type="password" className={css.loginInput} onChange={event => setPassword(event.target.value)} placeholder="Password"/>
             </Dropdown.Item>

             <Dropdown.Item itemKey="Submit" className={css.loginItem}>
                <button type="submit" className={css.loginButton} onClick={signUp}> Sign up </button>
            </Dropdown.Item>
         </Dropdown>;

    return (
        <div className={css.container}>
            <NavLink to="/" className={css.logo} >
                Bookshhh
            </NavLink>
                <span className={css.menu}>
                    <NavLink to="/top"
                        className={cln('menuItem', { 'menuItem--dark': mode === 'dark' })}
                        activeClassName={css.activeClassName}
                        isActive={() => highlightCurrentTab('top')}
                    >
                        Top 10
                    </NavLink>
                    <NavLink to="/genres"
                        className={cln('menuItem', { 'menuItem--dark': mode === 'dark' })}
                        activeClassName={css.activeClassName}
                        isActive={() => highlightCurrentTab('genres')}
                    >
                        Genres
                    </NavLink>
                    <NavLink to="/workspaces"
                        className={cln('menuItem', { 'menuItem--dark': mode === 'dark' })}
                        activeClassName={css.activeClassName}
                        isActive={() => highlightCurrentTab('workspaces')}
                    >
                        Workspaces
                    </NavLink>
                    <NavLink to="/news"
                        className={cln('menuItem', { 'menuItem--dark': mode === 'dark' })}
                        activeClassName={css.activeClassName}
                        isActive={() => highlightCurrentTab('news')}
                        >
                        What<span className={css.special}>'s new?</span>
                    </NavLink>
                </span>
            <span className={css.search}>
                <Search />

            </span>
             <span className={css.userIcon}>
             { isLoggedIn
                ? <>
                <Dropdown buttonRenderer={ringButtonRenderer} arrowPosition={27}>
                        <Dropdown.Item itemKey="Test" className={css.info}>
                            <img src={Exam} className={css.testIcon} alt="testIcon"/>
                            <span>
                                You have one test to take until tomorrow
                            </span>
                            </Dropdown.Item>
                        <Dropdown.Item itemKey="ContinueRead" className={css.info}>
                            <img src={BookStack} className={css.testIcon} alt="testIcon"/>
                            <span>
                                You haven't read
                                <span className={css.bookTitle}> Misery </span>
                                for 5 days. Maybe it's time to continue?
                            </span>
                            </Dropdown.Item>
                    </Dropdown>

                <Dropdown buttonRenderer={userButtonRenderer} arrowPosition={75}>
                    <Dropdown.Item itemKey="MyLibrary">
                        <NavLink to="/library" className={css.library}>
                            My library
                        </NavLink>
                    </Dropdown.Item>
                    <Dropdown.Item itemKey="Calendar">Calendar</Dropdown.Item>
                    <Dropdown.Item itemKey="Profile">
                        <NavLink to="/profile" className={css.library}>
                            Profile
                        </NavLink>
                    </Dropdown.Item>
                    <Dropdown.Item itemKey="LogOut" onClick={logOut}>Log out</Dropdown.Item>
                </Dropdown>
                </>
        
            : (shouldShowRegisterModal ? renderRegisterModal() : renderLoginModal())}
            </span>
        </div>
    );
};

Header.propTypes = {
    'mode': PropTypes.string
};

Header.defaultProps = {
    'mode': 'light'
};

export default Header;