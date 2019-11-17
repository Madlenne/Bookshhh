import React from 'react'
import * as PropTypes from 'prop-types';
import Cover from '../../icons/the_shining_cover.jpg';
import css from './SuggestionCard.module.scss';


const SuggestionCard = () => {
    return(
        <div className={css.container}>
            <img src={Cover} className={css.cover} alt='bookCover'/>
            <span className={css.bookTitle}>The Shining </span>
            <span className={css.bookDescription}>Lorem ipsum dolor sit amet blablabla  </span>
        </div>

    );
}

export default SuggestionCard;