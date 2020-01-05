/* eslint-disable sort-keys */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable max-statements */
/* eslint-disable newline-before-return */
/* eslint-disable react/jsx-key */
/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import css from './Threads.module.scss';
import * as firebase from 'firebase/app';


const Threads = ({ displayName }) => {

    const [comments, setComments] = useState([]);
    const [threads, setThreads] = useState([]);

    const threadsTemp = [];

    useEffect(() => {
        if (displayName){

            firebase.firestore().collection('comments')
            .where('userId', '==', displayName)
            .onSnapshot(review => {

                const reviews = review.docs.map(doc => doc.data());
                setComments(reviews.slice(0, 4));
            });
        }
    }, [displayName]);
    
     useEffect(() => {
        if (comments.length){

            const API = 'https://www.googleapis.com/books/v1/volumes/';
            comments.forEach(comment => {

                const query = `${API}${comment.bookId}?key=AIzaSyA3izPXs8UVa0mopS54Cyym0v21IOGIVjk`;
                fetchData(query, comment);
              
               
            });
        }

        async function fetchData(query, comment) {
           const books = await fetch(query)
                 .then(response => response.json())
                 .then(data => {
                     const threadTemp = {
                         comment,
                         'title': data.volumeInfo.title,
                         'author': data.volumeInfo.authors[0]
                        };
                        
                        threadsTemp.push(threadTemp);

                         setThreads(previousThreads => previousThreads = threadsTemp.map(newThread => newThread));
                        
                     
                    return data;
                     
             })
             .catch(error => {
                     console.error(error);
                 });

            
            return books;
         }

         }, [comments]);


    return (
        <div className={css.table} key={threads.length}>

            {
                threads.map(thread => <div className={css.tableRow}>
                    <span className={css.opinion}>
                       {`${thread.comment.content.substr(0, 40)}...`}
                    </span>
                    <span className={css.bookData}>
                        <NavLink to={`/book/${thread.comment.bookId}`} className={css.link}>{thread.title}</NavLink>
                        <div className={css.author}>{thread.author}</div>
                    </span>
                </div>
                )
            }
            
        </div>
    );
};

export default Threads;