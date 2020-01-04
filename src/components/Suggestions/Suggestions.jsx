/* eslint-disable no-nested-ternary */
/* eslint-disable max-statements */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-ternary */
import React, { useState, useEffect } from 'react';
import * as PropTypes from 'prop-types';

import SuggestionCard from '../SuggestionCard/SuggestionCard.jsx';
import Cover from '../../icons/the_shining_cover.jpg';
import Watcher from '../../icons/the_watcher.jpg';
import MemoryMan from '../../icons/memory_man.jpg';
import css from './Suggestions.module.scss';
import * as firebase from 'firebase/app';


const Suggestions = () => {
    const [displayName, setDisplayName] = useState('');
    const [categoriesAndAuthors, setCategoriesAndAuthors] = useState({});
    const [suggestions, setSuggestions] = useState([]);
    const suggestionsTemp = [];

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            setDisplayName(firebase.auth().currentUser.displayName);
        } else {
            setDisplayName('');
        }
      });

    useEffect(() => {
        firebase.firestore().collection('myLibrary')
        .where('userId', '==', displayName)
        .onSnapshot(books => {

            // const bookInMyLibraryId = book.docs.map(doc => doc.id);

            // if (bookInMyLibraryId.length){

            //     setMyLibraryId(bookInMyLibraryId[0]);
            // }
            const myBooks = books.docs.map(doc => doc.data());

             console.log(myBooks);
             const favouriteBooks = myBooks.filter(book => Boolean(book.favourite));
             if (displayName){
                const categoriesAndAuthors = favouriteBooks.map(book => {
                    const categoryItem = book.item.volumeInfo.categories[0].split(' ')[0];
                    const authorItem = book.item.volumeInfo.authors[0];
                    const idItem = book.bookId;
                    
                    return { 'category': categoryItem,
                            'author': authorItem,
                            'id': idItem };
                });

                // const authors = favouriteBooks.map(book => book.item.volumeInfo.authors[0]);
                //  console.log(favouriteBooks, categoriesAndAuthors);
                 setCategoriesAndAuthors(categoriesAndAuthors);
             }
            
        });
       
    }, [displayName]);


    useEffect(() => {
         
        if (categoriesAndAuthors.length){

            const API = 'https://www.googleapis.com/books/v1/volumes?q=subject:';
            
            categoriesAndAuthors.forEach(element => {
                // setIsFetching(true);
                // console.log(element.category, element.author);
                const query = `${API}${element.category}+inauthor:${encodeURI(element.author)}&maxResults=2`;
                 fetchData(query);
              
               
            });
        }

        async function fetchData(query) {
           const myLibraryItem = await fetch(query)
                 .then(response => response.json())
                 .then(data => {
                     if (data){
                        if (!categoriesAndAuthors.find(element => element.id === data.items[0].id)){
                        
                        suggestionsTemp.push({
                        'id': data.items[0].id,
                        'title': data.items[0].volumeInfo.title,
                        'description': data.items[0].volumeInfo.description.substr(0, 50),
                        'cover': data.items[0].volumeInfo.imageLinks.smallThumbnail
                    });
                }

                    if (data.items.length > 1 && !categoriesAndAuthors.find(element => element.id === data.items[1].id)){
                        let description = 'No description provided';

                        if (data.items[1].volumeInfo.description){
                            description = data.items[1].volumeInfo.description.substr(0, 50);
                        }
                        suggestionsTemp.push({
                            'id': data.items[1].id,
                            'title': data.items[1].volumeInfo.title,
                            description,
                            'cover': data.items[1].volumeInfo.imageLinks.smallThumbnail
                        });
                    }
                        setSuggestions(previousSuggestions => previousSuggestions = suggestionsTemp.map(newSuggestion => newSuggestion));
                        
                    }
                    
return data;
                     
             })
             .catch(error => {
                     console.error(error);
                 });

            //  setIsFetching(false);
            
    return myLibraryItem;
         }

         }, [categoriesAndAuthors]);
    
    
return (
        <div className={css.container}>
            
             <span className={css.title}>
                Suggestions
            </span>
            <span className={css.recommendation}>
                {
                    firebase.auth().currentUser
                    
                    ? suggestions.length ? suggestions.map(suggestion => <SuggestionCard cover={suggestion.cover} id={suggestion.id} title={suggestion.title} description={suggestion.description}/>
                        )
                        : 'Mark some books as favourite to have suggestions.'
                    
                    : <span className={css.notLoggedIn}>
                        You have to be logged in to see recommendations
                    </span>
                }
            </span>
        </div>

    );
};

export default Suggestions;