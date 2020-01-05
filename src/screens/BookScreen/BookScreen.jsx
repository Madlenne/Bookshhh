/* eslint-disable newline-before-return */
/* eslint-disable no-nested-ternary */
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
import Stars from '../../components/ui/Stars/Stars.jsx';
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
    const [isAddedToMyLibrary, setIsAddedToMyLibrary] = useState(false);
    const [itemFromAPI, setItemFromAPI] = useState();
    const [displayName, setDisplayName] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [myLibraryId, setMyLibraryId] = useState();
    const [isFavourite, setIsFavourite] = useState();
    const [isInProgress, setIsInProgress] = useState();
    const [isWantToRead, setIsWantToRead] = useState();
    const [isFinished, setIsFinished] = useState();
    const [starsNumber, setStarsNumber] = useState(0);
    const [statisticsId, setStatisticsId] = useState();
    const [statistics, setStatistics] = useState();

    const currentDate = new Date().getTime();

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            setDisplayName(firebase.auth().currentUser.displayName);
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
            setDisplayName('');
        }
      });

    const API = 'https://www.googleapis.com/books/v1/volumes/';
    const query = `${API}${id}?key=AIzaSyA3izPXs8UVa0mopS54Cyym0v21IOGIVjk`;

    useEffect(() => {

       setIsFetching(true);

       async function fetchData() {
           await fetch(query)
                .then(response => response.json())
                .then(data => {

                    setItemFromAPI(data);

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
        }, [firebase.auth().currentUser, id]);

        useEffect(() => {

            firebase.firestore().collection('comments')
            .where('bookId', '==', id)
            .onSnapshot(comment => {
                const reviews = comment.docs.map(doc => [doc.id, doc.data()]);
                console.log('reviews', reviews);
                setReviews(reviews);
            });
           
    }, []);

    useEffect(() => {
        firebase.firestore().collection('myLibrary')
        .where('userId', '==', displayName)
        .where('bookId', '==', id)
        .onSnapshot(book => {

            const bookInMyLibraryId = book.docs.map(doc => doc.id);

            if (bookInMyLibraryId.length){

                setMyLibraryId(bookInMyLibraryId[0]);
            }
            const myBook = book.docs.map(doc => doc.data());


            if (myBook.length){
                setIsAddedToMyLibrary(true);
                setIsFavourite(myBook[0].favourite);
                setIsInProgress(myBook[0].inProgress.isInProgress);
                setIsWantToRead(myBook[0].wantToRead);
                setStarsNumber(myBook[0].grade);
                setIsFinished(myBook[0].finished);
            }
        });
       
    }, [id, isAddedToMyLibrary, displayName]);

    useEffect(() => {

        firebase.firestore().collection('statistics')
        .where('userName', '==', displayName)
            .onSnapshot(statisticsAPI => {
                const statisticsId = statisticsAPI.docs.map(doc => doc.id);
                    

                const statistics = statisticsAPI.docs.map(doc => doc.data());

                if (displayName) {
                    setStatistics(statistics[0]);
                    setStatisticsId(statisticsId[0]);
                }
                
            });
        }, [displayName]);

    const addToMyLibrary = () => {

        firebase.firestore().collection('myLibrary')
        .add({
            'bookId': id,
            'grade': 0,
            'item': itemFromAPI,
            'userId': displayName,
            'favourites': 0,
            'inProgress': 0,
            'finished': 0,
            'wantToRead': 0,
            'reviews': 0
            })
        .then(ref => {
                // setMyLibraryId(ref.id);
                console.log('Added document with ID: ', ref.id);
            });
    };
    
    const createReview = () => {
        setIsReviewCreating(creating => !creating);
    };

    // useEffect(() => {

 
    //     async function fetchData() {
    //         await fetch('https://www.googleapis.com/books/v1/users/107730858058582200299/bookshelves/3?key=AIzaSyA3izPXs8UVa0mopS54Cyym0v21IOGIVjk')
    //              .then(response => response.json())
    //              .then(data => {
    //                 console.log(data);
    //          })
    //  .catch(error => {
    //                  console.error(error);
    //              });
    //      }
    //      fetchData();
    //      }, [firebase.auth().currentUser]);
 
         const toggleFavourites = () => {
            // console.log(statistics);
            let favouritesNumber = 0;

            if (isFavourite){
                favouritesNumber = statistics.favourite - 1;
            } else {
                favouritesNumber = statistics.favourite + 1;
            }

             firebase.firestore().collection('myLibrary')
             .doc(myLibraryId)
             .update({
                 'favourite': !isFavourite
                 })
             .catch(error => {
                     console.error(error);
                 });

            firebase.firestore().collection('statistics')
            .doc(statisticsId)
            .update({
                'favourite': favouritesNumber
                })
            .catch(error => {
                    console.error(error);
                });
         };

         const toggleReading = () => {

            let inProgressNumber = 0;
            let inProgressDate = 0;
            let { inProgressDates } = statistics;

            if (isInProgress){
                inProgressNumber = statistics.inProgress - 1;
                inProgressDates = statistics.inProgressDates.filter(element => element.bookId !== id);

            } else {
                inProgressNumber = statistics.inProgress + 1;
                inProgressDates.push(currentDate);
                inProgressDate = currentDate;
            }

            firebase.firestore().collection('myLibrary')
            .doc(myLibraryId)
            .update({
                'inProgress': {
                    'isInProgress': !isInProgress,
                    'date': inProgressDate
                },
                'finished': !isFinished
                })
            .catch(error => {
                    console.error(error);
                });

            firebase.firestore().collection('statistics')
            .doc(statisticsId)
            .update({
                'inProgress': inProgressNumber,
                inProgressDates
                
                })
            .catch(error => {
                    console.error(error);
                });
         };
         console.log('finished', isFinished);
         const wantToRead = () => {

            let wantToReadNumber = 0;
            
            if (isWantToRead){
                wantToReadNumber = statistics.wantToRead - 1;
            } else {
                wantToReadNumber = statistics.wantToRead + 1;
            }

            firebase.firestore().collection('myLibrary')
            .doc(myLibraryId)
            .update({
                'wantToRead': true
                })
            .catch(error => {
                    console.error(error);
                });

            firebase.firestore().collection('statistics')
            .doc(statisticsId)
            .update({
                'wantToRead': wantToReadNumber
                })
            .catch(error => {
                    console.error(error);
                });
         };

    // 107730858058582200299
    // https://www.googleapis.com/books/v1/mylibrary/bookshelves/shelf/addVolume
// console.log(isAddedToMyLibrary, displayName);
return (
        <div className={css.container} >
            <Header mode="dark"/>
            <span className={css.content} >
                <Suggestions/>
                <span className={css.details}>
                    {isAddedToMyLibrary && displayName
                    ? <span className={css.options}>
                        <span className={css.option} onClick={toggleFavourites}>
                            {isFavourite ? 'Remove from favourites' : 'Add to favourites'}
                            </span>
                        <span className={css.option} onClick={toggleReading}>
                            {isInProgress ? 'Stop reading' : 'Start reading'}
                            </span>
                        { !isWantToRead && <span className={css.option} onClick={wantToRead}>Want to read</span> }
                        <span className={css.stars}>
                            <Stars bookId={id} userId={displayName} />
                        </span>
                    </span>
                    : isLoggedIn
                        ? <span className={css.toAdd} onClick={addToMyLibrary} >
                                ADD TO MY LIBRARY
                            </span>
                        : <span className={css.logIn} >
                                LOG IN TO COMPOSE YOUR OWN LIBRARY
                            </span>
                    }
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
                        {firebase.auth().currentUser && <img src={Add} onClick={createReview} className={css.addButton} alt="png"/> }
                        {isReviewCreating && <ReviewCard creatingMode={true} setIsReviewCreating={setIsReviewCreating}></ReviewCard>}

                        {reviews
                        ? reviews.length
                            ? reviews.map(review => <ReviewCard key={review[0]}
                                reviewId={review[0]}
                                title={review[1].title}
                                comment={review[1].content}
                                grade={review[1].grade}
                                stars={starsNumber}
                                userId={review[1].userId}/>
                            )
                            : <div className={css.noReviews}>
                                No reviews so far
                        </div>
                        : <Loader/>}
                       
                   </div>
                </span>
            </span>

        </div>

    );
};

export default BookScreen;