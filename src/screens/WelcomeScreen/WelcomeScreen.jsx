import React from 'react'
import * as PropTypes from 'prop-types';
import Header from '../../components/Header/Header.jsx';
import backgroundBook from './book_transparent.png';
import RateBox from '../../components/RateBox/RateBox.jsx';
import VerticalCalendar from '../../components/VerticalCalendar/VerticalCalendar.jsx';
import css from './WelcomeScreen.module.scss';


const WelcomeScreen = () => {
    return(
        <div className={css.container}>
            <Header/>
            <div className={css.middlePart}>
                    <span className={css.welcomeMessage}>
                        Open <span className={css.whiteFont}> a </span> book 
                        <div className={css.welcomeMessageBottom}>
                            to <span className={css.whiteFont}> open </span> your <span className={css.whiteFont}> mind </span>
                        </div>
                    </span>
                    <img src={backgroundBook} className={css.backgroundBook} alt='backgroundBook'/>
                <VerticalCalendar/>
            </div>
            <div className={css.bottomPart}>
                <span className={css.quote}>
                    "Words are power, <div className={css.quoteBottom} > words can be your power" </div>
                </span>
                    <RateBox className={css.rateBox}/>
            </div>
        </div>

    );
}

export default WelcomeScreen;