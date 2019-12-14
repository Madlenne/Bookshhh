/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import * as PropTypes from 'prop-types';
import Header from '../../components/Header/Header.jsx';
import Suggestions from '../../components/Suggestions/Suggestions.jsx';
import BookCard from '../../components/BookCard/BookCard.jsx';
import { useLocation } from 'react-router-dom';
import Loader from '../../components/ui/Loader/Loader.jsx';

import css from './GenreScreen.module.scss';


const GenreScreen = () => {

    const { pathname } = useLocation();
    const lastSlash = pathname.lastIndexOf('/');
    const genre = pathname.substring(lastSlash + 1);
    const [items, setItems] = useState();
    const [isFetching, setIsFetching] = useState(false);

     const API = 'https://www.googleapis.com/books/v1/volumes?q=subject:';
    const query = `${API }Fiction&key=AIzaSyA3izPXs8UVa0mopS54Cyym0v21IOGIVjk`;
    useEffect(() => {

       setIsFetching(true);

       async function fetchData() {
           await fetch(query)
                .then(response => response.json())
                .then(data => {
                    console.log('DATA ', data);
                    setItems(data.items);
                    setIsFetching(false);

            })
.catch(error => {
                console.error(error);
            });
       }
       fetchData();
    }, []);
    console.log(items);
    
return (
        <div className={css.container} >
        <Header mode="dark"/>
        <span className={css.content}>
            <Suggestions/>
            <span className={css.myLibrary}>
                <span className={css.title}>
                    { genre }
                    { isFetching || !items
                    ? <Loader/>
                    : items.map(item => <BookCard itemFromAPI={item}/>)}
                        {/* <BookCard itemsFromAPI={items} hasStartedReading/>
                        <BookCard itemsFromAPI={items}/>
                        <BookCard itemsFromAPI={items}/> */}
                    {/* // </>  */}
                {/* } */}
                </span>

            </span>
        </span>

    </div>

    );
};

export default GenreScreen;