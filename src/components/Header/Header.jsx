import React from 'react'
import * as PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Search from '../Search/Search.jsx';
import Ring from '../../icons/ring.png';
import User from '../../icons/user.png';

import css from './Header.module.scss';


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
                    <img src={Ring} className={css.ring} alt='ringIcon'/>
                    <img src={User} className={css.user} alt='userIcon'/>
                </span>

            </div>
        );
}

export default Header;