/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames/bind';
import { NavLink, useLocation } from 'react-router-dom';

import css from './GenreCard.module.scss';

const cln = classnames.bind(css);

const GenreCard = ({ type, thumbnail, className }) => {
    const { pathname } = useLocation();
  
    return (
        <NavLink to={`${pathname}/${type}`} className={css.linkItem}>
            <div className={cln('container', className)}>
                <img src={thumbnail} className={css.thumbnail} alt="thumbnail" />
            <span className={css.info}>
                { type }
            </span>
            <span className={css.booksAmount}>
                <b className={css.number}>40</b>
            </span>

            </div>
        </NavLink>
    );
};

export default GenreCard;