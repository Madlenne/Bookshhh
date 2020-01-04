/* eslint-disable max-statements-per-line */
/* eslint-disable max-statements */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-ternary */
/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
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
    const currentDate = new Date().getTime();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginFailed, setIsLoginFailed] = useState(false);
    const [isRegisterFailed, setIsRegisterFailed] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [shouldShowRegisterModal, setShouldShowRegisterModal] = useState(false);
    const [shouldDisplayNotification, setShouldDisplayNotification] = useState(false);
    
    const highlightCurrentTab = tabName => {
        const { pathname } = location;
        
        return pathname.substring(1) === tabName;
    };

    let displayName = 'testUser';
    if (firebase.auth().currentUser) ({ displayName } = firebase.auth().currentUser);

    const showRegisterModal = () => {
        setShouldShowRegisterModal(true);
    };

    const logInButtonRenderer = (onClick, ref) => <img src={LogIn}
    className={css.loginIcon}
    onClick={ () => {
    onClick();
    setShouldShowRegisterModal(false);
    }}
    ref={ref} alt="logInIcon"/>;

    const logIn = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
        setUsername('');
                setEmail('');
                setPassword('');
        })
        .catch(error => {
            setIsLoginFailed(true);
             console.error(error.code, error.message);
     
          });
          
    };

    const signUp = () => {

        if (username !== '' && email !== '' && password !== '') {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(result => {
            setUsername('');
            setEmail('');
            setPassword('');

            firebase.firestore().collection('statistics')
            .add({
                'userName': username,
                'favourites': 0,
                'inProgress': 0,
                'inProgressDates': [],
                'finished': 0,
                'wantToRead': 0,
                'reviews': 0
                })
                .catch(error => {
                    console.error(error);
                });

        
        return result.user.updateProfile({ 'displayName': username });
        })
        .catch(error => {
            console.error(error);
            setIsRegisterFailed(true);
            setErrorMessage(error.message);
          });
          
        } else {
            setErrorMessage('Any field cannot be empty');
            setIsRegisterFailed(true);
        }
    };

    const logOut = () => {
        firebase.auth().signOut()
        .catch(error => {
            console.error(error);

        });
    };
    // console.log(username, email, password);
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
          setIsLoggedIn(true);

          user.getIdTokenResult().then(idTokenResult => {

            const authTime = idTokenResult.claims.auth_time * 1000;
            const sessionDuration = SESSION_DURATION;
            const millisecondsUntilExpiration = sessionDuration - (Date.now() - authTime);
            const sessionTimeout = setTimeout(() => firebase.auth().signOut(), millisecondsUntilExpiration);
          });

        } else {
            setIsLoggedIn(false);

        }
      });


      useEffect(() => {

        if (displayName){

            firebase.firestore().collection('statistics')
            .where('userName', '==', displayName)
                .onSnapshot(statisticsAPI => {
                    
                    const statistics = statisticsAPI.docs.map(doc => doc.data());
                    // setStatistics(statistics);
                    if (statistics){

                        const { inProgressDates } = statistics[0];
                        const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
                        const tooLondReadingBooks = inProgressDates.find(date => currentDate - date >= THIRTY_DAYS);
                        if (tooLondReadingBooks){
                            setShouldDisplayNotification(true);
                        }
                    }

                });
        }
        
    }, [displayName]);

    // const countReadingRate = () => {
    //     const { favourites, wantToRead, finished, reviews, inProgress, inProgressDates } = statistics[0];
    //     let value = favourites + wantToRead * 3 + finished * 8 + reviews * 2;
    //     let readingFactor;

    //         const currentDate = new Date().getTime();

    //         const THREE_DAYS = 3 * 24 * 60 * 60 * 60 * 1000;
    //         const FIVE_DAYS = 5 * 24 * 60 * 60 * 60 * 1000;
    //         const WEEK = 7 * 24 * 60 * 60 * 60 * 1000;
    //         const TWO_WEEKS = 14 * 24 * 60 * 60 * 60 * 1000;

    //         const datesDifference = inProgressDates.map(inProgressDate => currentDate - inProgressDate);

    //         if (max(datesDifference) < THREE_DAYS){
    //             readingFactor = 10;
    //         } else if (datesDifference > THREE_DAYS && datesDifference < FIVE_DAYS){
    //             readingFactor = 7;

    //         } else if (datesDifference > FIVE_DAYS && datesDifference < WEEK){
    //             readingFactor = 4;

    //         } else if (datesDifference > WEEK && datesDifference < TWO_WEEKS){
    //             readingFactor = 1;

    //         }

    //         value += inProgress * readingFactor;
    //         const threshold = 10 + 15 * 3 + 10 * 8 + 7 * 2 + 10 + 4 + 1;
            
    //         return Math.round(value / threshold * 100);
    // };

    // if (statistics) countReadingRate();


    const renderLoginModal = () => <Dropdown buttonRenderer={logInButtonRenderer} arrowPosition={72} className={css.loginDropdown}>

        <Dropdown.Item itemKey="Login" className={css.loginItem}>
            <input type="text" className={cln('loginInput', { 'loginFailureInput': isLoginFailed })} value={email} onChange={event => {
                setEmail(event.target.value); setIsLoginFailed(false);
                }} placeholder="Email"/>
        </Dropdown.Item>

        <Dropdown.Item itemKey="Password" className={css.loginItem}>
            <input type="password" className={cln('loginInput', { 'loginFailureInput': isLoginFailed })} value={password} onChange={event => {
                setPassword(event.target.value); setIsLoginFailed(false);
                }} placeholder="Password"/>
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
                 <input type="text" className={cln('loginInput', { 'loginFailureInput': isRegisterFailed })} onChange={event => {
                    setUsername(event.target.value); setIsRegisterFailed(false);
                    }} placeholder="Login"/>
             </Dropdown.Item>

             <Dropdown.Item itemKey="Email" className={css.loginItem}>
                <input type="text" className={cln('loginInput', { 'loginFailureInput': isRegisterFailed })} value={email} onChange={event => {
                    setEmail(event.target.value); setIsRegisterFailed(false);
                    }} placeholder="Email"/>
            </Dropdown.Item>

             <Dropdown.Item itemKey="Password" className={css.loginItem}>
                 <input type="password" className={cln('loginInput', { 'loginFailureInput': isRegisterFailed })} onChange={event => {
                    setPassword(event.target.value); setIsRegisterFailed(false);
                    }} placeholder="Password"/>
             </Dropdown.Item>
            { isRegisterFailed && <Dropdown.Item>
                <span className={css.wrongCredentials}> {errorMessage} </span>
            </Dropdown.Item>}
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
                    {firebase.auth().currentUser &&
                     <NavLink to="/library"
                        className={cln('menuItem', { 'menuItem--dark': mode === 'dark' })}
                        activeClassName={css.activeClassName}
                        isActive={() => highlightCurrentTab('library')}
                    >
                        My library
                    </NavLink>
                    }
                    {/* <NavLink to="/top"
                        className={cln('menuItem', { 'menuItem--dark': mode === 'dark' })}
                        activeClassName={css.activeClassName}
                        isActive={() => highlightCurrentTab('top')}
                    >
                        Top 10
                    </NavLink> */}
                    {/* <NavLink to="/library"
                        className={cln('menuItem', { 'menuItem--dark': mode === 'dark' })}
                        activeClassName={css.activeClassName}
                        isActive={() => highlightCurrentTab('library')}
                    >
                        My library
                    </NavLink> */}
                    <NavLink to="/genres"
                        className={cln('menuItem', { 'menuItem--dark': mode === 'dark' })}
                        activeClassName={css.activeClassName}
                        isActive={() => highlightCurrentTab('genres')}
                    >
                        Genres
                    </NavLink>
                    {/* <NavLink to="/workspaces"
                        className={cln('menuItem', { 'menuItem--dark': mode === 'dark' })}
                        activeClassName={css.activeClassName}
                        isActive={() => highlightCurrentTab('workspaces')}
                    >
                        Workspaces
                    </NavLink> */}
                    {/* <NavLink to="/news"
                        className={cln('menuItem', { 'menuItem--dark': mode === 'dark' })}
                        activeClassName={css.activeClassName}
                        isActive={() => highlightCurrentTab('news')}
                        >
                        What<span className={css.special}>'s new?</span>
                    </NavLink> */}
                </span>
            <span className={css.search}>
                <Search />

            </span>
             <span className={css.userIcon}>
             { isLoggedIn
                ? <>
                <Dropdown buttonRenderer={ringButtonRenderer} arrowPosition={27}>
                        {/* <Dropdown.Item itemKey="Test" className={css.info}>
                            <img src={Exam} className={css.testIcon} alt="testIcon"/>
                            <span>
                                You have one test to take until tomorrow
                            </span>
                            </Dropdown.Item> */}
                        <Dropdown.Item itemKey="ContinueRead" className={css.info}>
                            <img src={BookStack} className={css.testIcon} alt="testIcon"/>
                            {shouldDisplayNotification
                            ? <span>
                                You have some books marked as reading for more than 30 days.
                                Maybe it's time to continue?
                            </span>
                            : 'No notifications'}
                            </Dropdown.Item>
                    </Dropdown>

                <Dropdown buttonRenderer={userButtonRenderer} arrowPosition={75}>
                    <Dropdown.Item itemKey="MyLibrary">
                        <NavLink to="/library" className={css.library}>
                            My library
                        </NavLink>
                    </Dropdown.Item>
                    {/* <Dropdown.Item itemKey="Calendar">Calendar</Dropdown.Item> */}
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