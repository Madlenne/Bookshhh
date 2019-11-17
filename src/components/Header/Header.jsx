import React from 'react'
import * as PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Search from '../Search/Search.jsx';
import Ring from '../../icons/ring.png';
import User from '../../icons/user.png';
import Exam from '../../icons/exam.png';
import BookStack from '../../icons/books-stack-of-three.png';
import Dropdown from '../ui/Dropdown/Dropdown.jsx'
import classnames from 'classnames/bind';

import css from './Header.module.scss';
const cln = classnames.bind(css);

const userButtonRenderer = (onClick, ref) => <img src={User} className={css.user} onClick={onClick} ref={ref} alt='userIcon'/>

const ringButtonRenderer = (onClick, ref) => <img src={Ring} className={css.ring} onClick={onClick} ref={ref} alt='ringIcon'/>

const Header = ({ mode }) => {

        return(
            <div className={css.container}>
                <NavLink to='/' className={css.logo} >
                    Bookshhh
                </NavLink>
                    <span className={css.menu}>
                        <NavLink to='/top' className={cln('menuItem', {'menuItem--dark': mode === 'dark'})} >
                            Top 10
                        </NavLink>
                        <NavLink to='/genres' className={cln('menuItem', {'menuItem--dark': mode === 'dark'})}>
                            Genres
                        </NavLink>
                        <NavLink to='/workspaces' className={cln('menuItem', {'menuItem--dark': mode === 'dark'})}>
                            Workspaces
                        </NavLink>
                        <NavLink to='/news' className={cln('menuItem', {'menuItem--dark': mode === 'dark'})}>
                            What<span className={css.special}>'s new?</span>
                        </NavLink>
                    </span>
                <span className={css.search}>
                    <Search />

                </span>
                <span className={css.userIcon}>
                        <Dropdown buttonRenderer={ringButtonRenderer} arrowPosition={27}>
                            <Dropdown.Item itemKey='Test' className={css.info}>
                                <img src={Exam} className={css.testIcon} alt='testIcon'/>
                                <span>
                                    You have one test to take until tomorrow
                                </span>
                                </Dropdown.Item>
                            <Dropdown.Item itemKey='ContinueRead' className={css.info}>
                                <img src={BookStack} className={css.testIcon} alt='testIcon'/>
                                <span>
                                    You haven't read 
                                    <span className={css.bookTitle}> Misery </span> 
                                    for 5 days. Maybe it's time to continue?
                                </span>
                                </Dropdown.Item>
                        </Dropdown>

                    <Dropdown buttonRenderer={userButtonRenderer} arrowPosition={75}>
                        <Dropdown.Item itemKey='MyLibrary'>
                            <NavLink to='/library' className={css.library}>
                                My library
                            </NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item itemKey='Calendar'>Calendar</Dropdown.Item>
                        <Dropdown.Item itemKey='Profile'>Profile</Dropdown.Item>
                        <Dropdown.Item itemKey='LogOut'>Log out</Dropdown.Item>
                    </Dropdown>
                </span>
            </div>
        );
}

Header.propTypes = {
    mode: PropTypes.string,
}

Header.defaultProps = {
    mode: 'light',
}

export default Header;