import React from 'react';
import * as PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Cover from '../../icons/the_shining_cover.jpg';
import css from './SuggestionCard.module.scss';


const SuggestionCard = ({ cover, id, title, description }) => (
        <div className={css.container}>
            <img src={cover} className={css.cover} alt="bookCover"/>
            <NavLink to={`/book/${id}`} className={css.bookTitle}>{title} </NavLink>
            <span className={css.bookDescription}>{description}</span>
        </div>

    );

export default SuggestionCard;