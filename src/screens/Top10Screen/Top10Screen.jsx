import React from 'react'
import * as PropTypes from 'prop-types';
import Header from '../../components/Header/Header.jsx';
import Suggestions from '../../components/Suggestions/Suggestions.jsx';
import BookCard from '../../components/BookCard/BookCard.jsx';

import css from './Top10Screen.module.scss';


const Top10Screen = () => {

    const genres = [1,2,3,4,5,6,7,8,9,10];

    return(
        <div className={css.container}>
        <Header mode='dark'/>
        <span className={css.content}>
            <Suggestions/>
            <span className={css.myLibrary}>
                <span className={css.title2}>
                    Top 10
                    <BookCard isStartedReading/>
                    <BookCard />
                    <BookCard />
                </span>
            </span>
        </span>

    </div>

    );
}

export default Top10Screen;