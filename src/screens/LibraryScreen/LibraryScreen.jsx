/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable init-declarations */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-negated-condition */
/* eslint-disable newline-before-return */
/* eslint-disable no-ternary */
/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import css from './LibraryScreen.module.scss';
import Suggestions from '../../components/Suggestions/Suggestions.jsx';
import Loader from '../../components/ui/Loader/Loader.jsx';
import BookCard from '../../components/BookCard/BookCard.jsx';
import * as firebase from 'firebase/app';


const LibraryScreen = () => {

    const history = useHistory();
    const { pathname } = useLocation();
    
    const [myLibraryBooks, setMyLibraryBooks] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [items, setItems] = useState([]);
    const [isFilterApplied, setIsFilterApplied] = useState(false);
    const [filterType, setFilterType] = useState('');
    const myLibraryItems = [];

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    let displayName = '';
    if (firebase.auth().currentUser) ({ displayName } = firebase.auth().currentUser);


    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);

        }
      });

    useEffect(() => {
        if (firebase.auth().currentUser && displayName !== ''){

            firebase.firestore().collection('myLibrary')
            .where('userId', '==', displayName)
            .onSnapshot(book => {
    
                let myLibraryBooks = book.docs.map(doc => doc.data());
                if (myLibraryBooks.length){
    
                    myLibraryBooks = myLibraryBooks.map(myLibraryBook => myLibraryBook);
                    setMyLibraryBooks(myLibraryBooks);
                }
            });
        }
       
    }, [displayName]);


     useEffect(() => {
         
        if (myLibraryBooks.length){

            const API = 'https://www.googleapis.com/books/v1/volumes/';

            myLibraryBooks.forEach(id => {
                setIsFetching(true);

                const query = `${API}${id}?key=AIzaSyA3izPXs8UVa0mopS54Cyym0v21IOGIVjk`;
                fetchData(query);
              
               
            });
        }

        async function fetchData(query) {
           const myLibraryItem = await fetch(query)
                 .then(response => response.json())
                 .then(data => {
                    myLibraryItems.push(data);
                    
                     
                    return data;
                     
             })
             .catch(error => {
                     console.error(error);
                 });

             setIsFetching(false);
            return myLibraryItem;
         }

         }, [myLibraryBooks, myLibraryItems.length]);

         const filterBooks = () => {
             let filteredBooks;

             if (filterType === 'inProgress'){
                filteredBooks = myLibraryBooks.filter(book => Boolean(book.inProgress.isInProgress));
             } else {

                 filteredBooks = myLibraryBooks.filter(book => Boolean(book[filterType]));
             }

            return filteredBooks;
         };


         const setFilterPath = filter => {
            history.push(`/library/${filter}`);
         };

         useEffect(() => {

             const indefOfLastSlash = pathname.lastIndexOf('/');
            const filter = pathname.substr(indefOfLastSlash + 1);
            if (filter !== 'library'){

                setFilterType(filter);
                setIsFilterApplied(true);
            }
         });


            return (
                    <div className={css.container} key={items}>
                        <Header mode="dark"/>
                        <span className={css.content}>
                            {
                                displayName
                            ? <>
                            <Suggestions/>
                            <span className={css.myLibrary}>
                                <span className={css.title2} >
                                    My Library
                                    <div className={css.filters}>
                                        <button className={css.filterButton} onClick={() => setFilterPath('favourite')}>Favourites</button>
                                        <button className={css.filterButton} onClick={() => setFilterPath('inProgress')}>In Progress</button>
                                        <button className={css.filterButton} onClick={() => setFilterPath('finished')}>Finished</button>
                                        <button className={css.filterButton} onClick={() => setFilterPath('wantToRead')}>Want to read</button>
                                        <button className={css.filterButton} onClick={() => {
                                        setIsFilterApplied(false);
                                        history.push('/library');
                                        }}>Clear filters</button>
                                    </div>
                                    {isFilterApplied
                                        ? filterBooks().map(myLibraryBook => <BookCard key={myLibraryBook.item.id} itemFromAPI={myLibraryBook.item}/>)
                                        : !isFetching
                                        ? myLibraryBooks.map(myLibraryBook => <BookCard key={myLibraryBook.item.id} itemFromAPI={myLibraryBook.item}/>)
                                        : <Loader/>
                                    }
                                </span>
                            </span>
                            </>
                            : <Redirect
                            to="/"
                      />
                            }
                        </span>

                    </div>

                );


};

export default LibraryScreen;