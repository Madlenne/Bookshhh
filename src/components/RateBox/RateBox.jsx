/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-mixed-operators */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';

import { max } from 'lodash';
import classnames from 'classnames/bind';
import css from './RateBox.module.scss';
import openBook from '../../icons/open-book.png';
import * as firebase from 'firebase/app';

const cln = classnames.bind(css);

const RateBox = ({ className }) => {

    const [displayName, setDisplayName] = useState('');
    const [statistics, setStatistics] = useState();

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            setDisplayName(firebase.auth().currentUser.displayName);
        } else {
            setDisplayName('');
        }
      });
      
    useEffect(() => {

        if (displayName){

            firebase.firestore().collection('statistics')
            .where('userName', '==', displayName)
                .onSnapshot(statisticsAPI => {
                    const statistics = statisticsAPI.docs.map(doc => doc.data());
                    setStatistics(statistics);
                    
                });
        }
        
    }, [displayName]);

    const countReadingRate = () => {
        const { favourites, wantToRead, finished, reviews, inProgress, inProgressDates } = statistics[0];

        let value = favourites + wantToRead * 3 + finished * 8 + reviews * 2;
        let readingFactor = 1;

            const currentDate = new Date().getTime();

            const THREE_DAYS = 3 * 24 * 60 * 60 * 60 * 1000;
            const FIVE_DAYS = 5 * 24 * 60 * 60 * 60 * 1000;
            const WEEK = 7 * 24 * 60 * 60 * 60 * 1000;
            const TWO_WEEKS = 14 * 24 * 60 * 60 * 60 * 1000;

            const datesDifference = inProgressDates.map(inProgressDate => currentDate - inProgressDate);

            if (max(datesDifference) < THREE_DAYS){
                readingFactor = 10;
            } else if (datesDifference > THREE_DAYS && datesDifference < FIVE_DAYS){
                readingFactor = 7;

            } else if (datesDifference > FIVE_DAYS && datesDifference < WEEK){
                readingFactor = 4;

            } else if (datesDifference > WEEK && datesDifference < TWO_WEEKS){
                readingFactor = 1;

            }

            value += inProgress * readingFactor;
            const threshold = 10 + 15 * 3 + 10 * 8 + 7 * 2 + 10 + 4 + 1;
            
return Math.round(value / threshold * 100);
    };

    if (statistics) countReadingRate();
    
return (
         <div className={cln('container', className)}>
            <span className={css.message}>
                 Your reading rate
                <img src={openBook} className={css.openBook} alt="openBook"/>
                 <div className={css.messageBottom}>
                     Let's improve it
                 </div>
             </span>
             <span className={css.rate}>
                {statistics && displayName && `${countReadingRate()}%`}
             </span>
         </div>

    );
};

export default RateBox;