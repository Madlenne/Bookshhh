/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import css from './StatisticsTable.module.scss';
import * as firebase from 'firebase/app';


const StatisticsTable = ({ displayName }) => {

    const [items, setItems] = useState([]);
    const [favouritesNumber, setFavouritesNumber] = useState(0);
    const [inProgressNumber, setInProgressNumber] = useState(0);
    const [finished, setFinishedNumber] = useState(0);
    const [wantToRead, setWantToRead] = useState(0);
    const [reviewsNumber, setReviewsNumber] = useState(0);
    const [statisticsId, setStatisticsId] = useState();

    let statistics = {
        'favourites': 0,
        'inProgress': 0,
        'inProgressDates': [],
        'finished': 0,
        'wantToRead': 0,
        'reviews': 0
    };

    useEffect(() => {
        if (displayName){

        firebase.firestore().collection('myLibrary')
        .where('userId', '==', displayName)
        .onSnapshot(book => {

            const myBooks = book.docs.map(doc => doc.data());

            setItems(myBooks);
        });
    }
       
    }, [displayName]);

    if (items.length){
        statistics = items.reduce((allBooks, currentBook) => {
            
            console.log(currentBook);
            if (currentBook.favourite){

                allBooks.favourites += 1;
            }
            if (currentBook.inProgress.isInProgress){

                const progressObject = {
                    'bookId': currentBook.bookId,
                    'date': currentBook.inProgress.date
                };

                allBooks.inProgress += 1;
                allBooks.inProgressDates.push(progressObject);
            }
            if (currentBook.finished){

                allBooks.finished += 1;
            }
            if (currentBook.wantToRead){

                allBooks.wantToRead += 1;
            }

            return allBooks;
        }, statistics);
    }

    useEffect(() => {

        firebase.firestore().collection('statistics')
        .where('userName', '==', displayName)
            .onSnapshot(statisticsAPI => {
                const statisticsId = statisticsAPI.docs.map(doc => doc.id);
                setStatisticsId(statisticsId[0]);
                
            });

            if (statisticsId){
                // console.log(statisticsId, statistics);

                firebase.firestore().collection('statistics')
                .doc(statisticsId)
                .update({
                    'favourites': statistics.favourites,
                    'inProgress': statistics.inProgress,
                    'inProgressDates': statistics.inProgressDates,
                    'finished': statistics.finished,
                    'wantToRead': statistics.wantToRead,
                    'reviews': statistics.reviews
                    })
                .catch(error => {
                        console.error(error);
                    });
            }
    }, [statistics]);

    useEffect(() => {
        if (displayName){

            firebase.firestore().collection('comments')
            .where('userId', '==', displayName)
            .onSnapshot(review => {
                
                const reviews = review.docs.map(doc => doc.data());
                setReviewsNumber(reviews.length);
            });
        }
    });

    statistics.reviews = reviewsNumber;
    
return (
        <div className={css.table}>
            <div className={css.tableRow}>
                <NavLink to={'/library/inProgress'} className={css.link}> In progress </NavLink>
                <span className={css.number}>
                {statistics.inProgress}
                </span>
            </div>
            <div className={css.tableRow}>
            <NavLink to={'/library/finished'} className={css.link}> Finished </NavLink>
                <span className={css.number}>
                {statistics.finished}
                </span>
            </div>
            <div className={css.tableRow}>
            <NavLink to={'/library/wantToRead'} className={css.link}>  Want to read </NavLink>
                <span className={css.number}>
                {statistics.wantToRead}
                </span>
            </div>
            <div className={css.tableRow}>
            <NavLink to={'/library/favourites'} className={css.link}> Favourites </NavLink>
                <span className={css.number}>
                {statistics.favourites}
                </span>
            </div>
            <div className={css.tableRow}>
                Reviews
                <span className={css.number}>
                    {statistics.reviews}
                </span>
            </div>
        </div>
    );
};

export default StatisticsTable;