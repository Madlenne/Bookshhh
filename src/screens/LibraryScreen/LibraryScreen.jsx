import React from 'react'
import * as PropTypes from 'prop-types';
import Header from '../../components/Header/Header.jsx';
import css from './LibraryScreen.module.scss';
import Suggestions from '../../components/Suggestions/Suggestions.jsx';


const LibraryScreen = () => {
    return(
        <div className={css.container}>
            <Header mode='dark'/>
            <span className={css.content}>
                <Suggestions/>
                <span className={css.myLibrary}>
                    <span className={css.title2}>
                        My Library
                    </span>
                </span>
            </span>

        </div>

    );
}

export default LibraryScreen;