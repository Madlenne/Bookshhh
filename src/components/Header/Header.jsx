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

import css from './Header.module.scss';
const cln = classnames.bind(css);

const userButtonRenderer = (onClick, ref) => <img src={User} className={css.user} onClick={onClick} ref={ref} alt="userIcon"/>;

const ringButtonRenderer = (onClick, ref) => <img src={Ring} className={css.ring} onClick={onClick} ref={ref} alt="ringIcon"/>;


const registerTextRenderer = (onClick, ref) => <span onClick={onClick} ref={ref}> No account yet? Click here to sign up! </span>;

const Header = ({ mode }) => {

    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [shouldShowRegisterModal, setShouldShowRegisterModal] = useState(false);

    const highlightCurrentTab = tabName => {
        const { pathname } = location;
        
        return pathname.substring(1) === tabName;
    };

    const showRegisterModal = () => {
        setShouldShowRegisterModal(true);
    };

    const logInButtonRenderer = (onClick, ref) => <img src={LogIn} className={css.loginIcon} onClick={ () => {
    onClick(); setShouldShowRegisterModal(false);
}} ref={ref} alt="logInIcon"/>;


    const renderLoginModal = () => <Dropdown buttonRenderer={logInButtonRenderer} arrowPosition={72} className={css.loginDropdown}>
        <Dropdown.Item itemKey="Login" className={css.loginItem}>
            <input type="text" className={css.loginInput} placeholder="Login"/>
        </Dropdown.Item>

        <Dropdown.Item itemKey="Password" className={css.loginItem}>
            <input type="text" className={css.loginInput} placeholder="Password"/>
        </Dropdown.Item>

        <Dropdown.Item itemKey="Submit" className={css.loginItem}>
            <button type="submit" className={css.loginButton} > Log in </button>
        </Dropdown.Item>
        <Dropdown.Item itemKey="Register" className={css.register}>
            <span onClick={showRegisterModal} > No account yet? Click here to sign up! </span>
            
        </Dropdown.Item>
         
    </Dropdown>;


const renderRegisterModal = () => <Dropdown buttonRenderer={logInButtonRenderer} arrowPosition={75}>
             <Dropdown.Item itemKey="Login" className={css.loginItem}>
                 <input type="text" className={css.loginInput} placeholder="Login"/>
             </Dropdown.Item>

             <Dropdown.Item itemKey="Password" className={css.loginItem}>
                 <input type="text" className={css.loginInput} placeholder="Password"/>
             </Dropdown.Item>

             <Dropdown.Item itemKey="Submit" className={css.loginItem}>
                <button type="submit" className={css.loginButton} > Sign up </button>
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
                    <Dropdown.Item itemKey="LogOut">Log out</Dropdown.Item>
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