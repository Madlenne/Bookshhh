/* eslint-disable no-ternary */
/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import * as PropTypes from 'prop-types';
import Header from '../../components/Header/Header.jsx';
import Suggestions from '../../components/Suggestions/Suggestions.jsx';
import Add from '../../icons/add.png';
import ReviewCard from '../../components/ReviewCard/ReviewCard.jsx';
import { useLocation } from 'react-router-dom';
import DefaultThumbnail from '../../icons/cover_placeholder.png';
import Loader from '../../components/ui/Loader/Loader.jsx';
import { get } from 'lodash';
import * as firebase from 'firebase/app';

import css from './BookScreen.module.scss';


const BookScreen = () => {

    const { pathname } = useLocation();
    const lastSlash = pathname.lastIndexOf('/');
    const id = pathname.substring(lastSlash + 1);
    const [title, setTtile] = useState(' ');
    const [author, setAuthor] = useState();
    const [thumbnail, setThumbnail] = useState();
    const [description, setDescription] = useState();
    const [reviews, setReviews] = useState();
    const [isFetching, setIsFetching] = useState(false);
    const [isReviewCreating, setIsReviewCreating] = useState(false);


    const API = 'https://www.googleapis.com/books/v1/volumes/';
    const query = `${API}${id}?key=AIzaSyA3izPXs8UVa0mopS54Cyym0v21IOGIVjk`;

    useEffect(() => {

       setIsFetching(true);

       async function fetchData() {
           await fetch(query)
                .then(response => response.json())
                .then(data => {
                    
                    const { title } = data.volumeInfo;
                    setTtile(data.volumeInfo.title);

                    const author = get(data, 'volumeInfo.authors[0]', 'Unknown author');
                    setAuthor(author);

                    const shortDescription = get(data, 'volumeInfo.description', 'No description');
                    setDescription(shortDescription);

                    const smallThumbnail = get(data, 'volumeInfo.imageLinks.smallThumbnail', DefaultThumbnail);
                    setThumbnail(smallThumbnail);

                    setIsFetching(false);

            })
    .catch(error => {
                    console.error(error);
                });
        }
        fetchData();
        }, []);

        useEffect(() => {

            firebase.firestore().collection('comments')
            .where('bookId', '==', id)
            .onSnapshot(comment => {
                const reviews = comment.docs.map(doc => [doc.id, doc.data()]);
                setReviews(reviews);
            });
           
    }, []);
    
    const createReview = () => {
        setIsReviewCreating(creating => !creating);
    };

return (
        <div className={css.container}>
            <Header mode="dark"/>
            <span className={css.content}>
                <Suggestions/>
                <span className={css.details}>
                { isFetching
                    ? <Loader/>
                    : <span className={css.bookCard}>
                        <img src={thumbnail} className={css.cover} alt="cover" />
                        <span className={css.title}>
                            {title}
                            <div className={css.author}>
                                {author}
                            </div>
                        </span>
                        <span className={css.description}>
                        <div dangerouslySetInnerHTML={{ '__html': description }} />
                        </span>
                    </span>
}
                    <div className={css.reviews}>
                        Reviews
                        <img src={Add} onClick={createReview} className={css.addButton} alt="png"/>
                        {isReviewCreating && <ReviewCard creatingMode={true}></ReviewCard>}

                        {reviews
                        ? reviews.map(review => <ReviewCard key={review[0]}
                            reviewId={review[0]}
                            title={review[1].title}
                            comment={review[1].content}
                            grade={review[1].grade}
                            userId={review[1].userId}/>
                        )
                        : <Loader/>}
                        
                       
                   </div>
                </span>
            </span>

        </div>

    );
};

export default BookScreen;