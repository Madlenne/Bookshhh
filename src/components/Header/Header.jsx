import React from 'react'
import * as PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Search from '../Search/Search.jsx';
import Ring from '../../icons/ring.png';
import User from '../../icons/user.png';
import Dropdown from '../ui/Dropdown/Dropdown.jsx'

import css from './Header.module.scss';

const userButtonRenderer = (onClick, ref) => <img src={User} className={css.user} onClick={onClick} ref={ref} alt='userIcon'/>

const ringButtonRenderer = (onClick, ref) => <img src={Ring} className={css.ring} onClick={onClick} ref={ref} alt='ringIcon'/>

const Header = () => {

        return(
            <div className={css.container}>
                <NavLink to='/' className={css.logo} >
                    Bookshhh
                </NavLink>
                    <span className={css.menu}>
                        <NavLink to='/top' className={css.menuItem} >
                            Top 10
                        </NavLink>
                        <NavLink to='/genres' className={css.menuItem}>
                            Genres
                        </NavLink>
                        <NavLink to='/workspaces' className={css.menuItem}>
                            Workspaces
                        </NavLink>
                        <NavLink to='/news' className={css.menuItem}>
                            What<span className={css.special}>'s new?</span>
                        </NavLink>
                    </span>
                <span className={css.search}>
                    <Search />

                </span>
                <span className={css.userIcon}>
                        <Dropdown buttonRenderer={ringButtonRenderer} arrowPosition={27}>
                            <Dropdown.Item itemKey='Test'>You have one test to take until tomorrow</Dropdown.Item>
                            <Dropdown.Item itemKey='ContinueRead'>You haven't read Misery for 5 days. Maybe it's time to continue?</Dropdown.Item>
                        </Dropdown>

                    <Dropdown buttonRenderer={userButtonRenderer} arrowPosition={75}>
                        <Dropdown.Item itemKey='MyLibrary'>My library</Dropdown.Item>
                        <Dropdown.Item itemKey='Calendar'>Calendar</Dropdown.Item>
                        <Dropdown.Item itemKey='Profile'>Profile</Dropdown.Item>
                        <Dropdown.Item itemKey='LogOut'>Log out</Dropdown.Item>
                    </Dropdown>
                </span>
            </div>
        );
}

export default Header;