import React from 'react'
import * as PropTypes from 'prop-types';
import Header from '../Header/Header.jsx';
import Suggestions from '../Suggestions/Suggestions.jsx';
import Thumbnail from '../../icons/graduation-hat.png';
import classnames from 'classnames/bind';

import css from './GenreCard.module.scss';

const cln = classnames.bind(css);

const GenreCard = ({ className }) => {
    return(
        <div className={cln('container', className)}>
            <img src={Thumbnail} className={css.thumbnail} alt='thumbnail' />
           <span className={css.info}>
                Travel
           </span>
           <span className={css.booksAmount}>
               <b className={css.number}>255</b>
           </span>

        </div>

    );
}

export default GenreCard;