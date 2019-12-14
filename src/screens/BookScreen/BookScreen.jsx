/* eslint-disable no-ternary */
/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import * as PropTypes from 'prop-types';
import Header from '../../components/Header/Header.jsx';
import Suggestions from '../../components/Suggestions/Suggestions.jsx';
import Cover from '../../icons/the_shining_cover.jpg';
import ReviewCard from '../../components/ReviewCard/ReviewCard.jsx';
import { useLocation } from 'react-router-dom';
import Loader from '../../components/ui/Loader/Loader.jsx';
import { get } from 'lodash';

import css from './BookScreen.module.scss';


const BookScreen = () => {

    const { pathname } = useLocation();
    const lastSlash = pathname.lastIndexOf('/');
    const id = pathname.substring(lastSlash + 1);
    const [title, setTtile] = useState(' ');
    const [author, setAuthor] = useState();
    const [description, setDescription] = useState();
    const [isFetching, setIsFetching] = useState(false);


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
                    setIsFetching(false);

            })
    .catch(error => {
                    console.error(error);
                });
        }
        fetchData();
        }, []);


    return (
        <div className={css.container}>
            <Header mode="dark"/>
            <span className={css.content}>
                <Suggestions/>
                <span className={css.details}>
                { isFetching
                    ? <Loader/>
                    : <span className={css.bookCard}>
                        <img src={Cover} className={css.cover} alt="cover" />
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
                        <ReviewCard
                            title="Best of the best"
                            comment="Generally speaking, I’m not fan of fantasy books but this one makes me impressed!
                            I recommend it to every person who wants to dive in a fantasy world."/>
                        <ReviewCard
                                title="Better than a film based on this"
                                comment="This is holy truth that films never replaces books! I imagined ‘The Hobbit’ world in a completely
                                different way."/>
                        <ReviewCard
                            title="Better than a film based on this"
                            comment="This is holy truth that films never replaces books! I imagined ‘The Hobbit’ world in a completely
                            different way."/>
                   </div>
                </span>
            </span>

        </div>

    );
};

export default BookScreen;