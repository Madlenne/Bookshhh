/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import * as PropTypes from 'prop-types';
import Header from '../../components/Header/Header.jsx';
import css from './LibraryScreen.module.scss';
import Suggestions from '../../components/Suggestions/Suggestions.jsx';
import BookCard from '../../components/BookCard/BookCard.jsx';
import * as firebase from 'firebase/app';


const LibraryScreen = () => {

    
    const [myLibraryBooksId, setMyLibraryBooksId] = useState();
    const [isFetching, setIsFetching] = useState(false);
    const [displayName, setDisplayName] = useState('testUser');
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (firebase.auth().currentUser) setDisplayName(firebase.auth().currentUser.displayName);

    }, [firebase.auth().currentUser]);


    useEffect(() => {
        firebase.firestore().collection('myLibrary')
        .where('userId', '==', displayName)
        .onSnapshot(book => {

            let myLibraryBooks = book.docs.map(doc => doc.data());
            if (myLibraryBooks.length){

                myLibraryBooks = myLibraryBooks.map(myLibraryBook => myLibraryBook.bookId);
                setMyLibraryBooksId(myLibraryBooks);
                console.log(myLibraryBooks);
            }
        });
       
    }, [displayName]);


    useEffect(() => {

        setIsFetching(true);
        if (myLibraryBooksId){

            const API = 'https://www.googleapis.com/books/v1/volumes/';
            
            myLibraryBooksId.forEach(id => {
                const query = `${API}${id}?key=AIzaSyA3izPXs8UVa0mopS54Cyym0v21IOGIVjk`;
                fetchData(query);
                
            });
        }

        async function fetchData(query) {
            console.log('aaa');
            await fetch(query)
                 .then(response => response.json())
                 .then(data => {
                        // console.log(data);
                        setItems(itemsData => {
                            itemsData.push(data);

                            return itemsData;
                        });
                    //  const { title } = data.volumeInfo;
                    //  setTtile(data.volumeInfo.title);
 
                    //  const author = get(data, 'volumeInfo.authors[0]', 'Unknown author');
                    //  setAuthor(author);
 
                    //  const shortDescription = get(data, 'volumeInfo.description', 'No description');
                    //  setDescription(shortDescription);
 
                    //  const smallThumbnail = get(data, 'volumeInfo.imageLinks.smallThumbnail', DefaultThumbnail);
                    //  setThumbnail(smallThumbnail);
 
                     setIsFetching(false);
 
             })
     .catch(error => {
                     console.error(error);
                 });
         }
         }, [myLibraryBooksId]);

         console.log(items);
    
return (
        <div className={css.container}>
            <Header mode="dark"/>
            <span className={css.content}>
                <Suggestions/>
                <span className={css.myLibrary}>
                    <span className={css.title2}>
                        My Library
                        {items.map(item => <BookCard key={item.id} itemFromAPI={item}/>)}
                        {items.map(item => console.log(item))}
                    </span>
                </span>
            </span>

        </div>

    );
};

export default LibraryScreen;