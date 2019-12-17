/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import * as PropTypes from 'prop-types';
import * as firebase from 'firebase/app';

import Star from '../../../icons/star.png';
import StarEmpty from '../../../icons/star_empty.png';
import css from './Stars.module.scss';

const Stars = ({ bookId, userId }) => {

    const [hoveredStarIndex, setHoveredStarsIndex] = useState();
    const [chosenStarIndex, setChosenStarsIndex] = useState();
    const [myLibraryId, setMyLibraryId] = useState();
    const starsIndexes = [0, 1, 2, 3, 4];

    const highlightStar = el => {
        setHoveredStarsIndex(el);
    };

    useEffect(() => {
        firebase.firestore().collection('myLibrary')
        .where('bookId', '==', bookId)
        .onSnapshot(book => {
            const bookInMyLibraryId = book.docs.map(doc => doc.id);
            const bookInMyLibraryData = book.docs.map(doc => doc.data());
            if (bookInMyLibraryData.length){

                setHoveredStarsIndex(bookInMyLibraryData[0].grade);
            }
            setMyLibraryId(bookInMyLibraryId[0]);
        });
       
    }, [chosenStarIndex, bookId]);

    const rate = index => {
        setChosenStarsIndex(index);

         firebase.firestore().collection('myLibrary')
        .doc(myLibraryId)
        .update({
            bookId,
            'grade': index + 1,
            userId
            })
        .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className={css.container} onMouseLeave={() => highlightStar(chosenStarIndex)} >
           { starsIndexes.map(el => (el <= hoveredStarIndex
               ? <img src={Star} className={css.star} onMouseEnter={() => highlightStar(el)} onClick={() => rate(el)} alt="star"/>
               : <img src={StarEmpty} className={css.star} onMouseEnter={() => highlightStar(el)} onClick={() => rate(el)} alt="star"/>)
            )}

        </div>
      

    );
};

export default Stars;