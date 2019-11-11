import React from 'react'
import * as PropTypes from 'prop-types';
import Header from '../../components/Header/Header.jsx';
import css from './WelcomeScreen.module.scss';


const WelcomeScreen = () => {
    return(
        <div className={css.container}>
            <Header/>
        </div>

    );
}

export default WelcomeScreen;