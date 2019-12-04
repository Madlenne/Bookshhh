import React from 'react'
import * as PropTypes from 'prop-types';
import Header from '../../components/Header/Header.jsx';
import Suggestions from '../../components/Suggestions/Suggestions.jsx';
import BookCard from '../../components/BookCard/BookCard.jsx';
import { useLocation } from 'react-router-dom';

import css from './GenreScreen.module.scss';


const GenreScreen = () => {

    const genres = [1,2,3,4,5,6,7,8,9,10];
    const { pathname } = useLocation();
    const lastSlash = pathname.lastIndexOf('/');
    const genre = pathname.substring(lastSlash+1);
    
    return(
        <div className={css.container} >
        <Header mode='dark'/>
        <span className={css.content}>
            <Suggestions/>
            <span className={css.myLibrary}>
                <span className={css.title2}>
                    { genre }
                    <BookCard title="The Big Four" hasStartedReading/>
                    <BookCard title="The Big Four" />
                    <BookCard title="The Big Four" />
                    <BookCard title="The Big Four" />
                    <BookCard title="The Big Four" />
                    <BookCard title="The Big Four" />
                    <BookCard title="The Big Four" />
                </span>
            </span>
        </span>

    </div>

    );
}

export default GenreScreen;