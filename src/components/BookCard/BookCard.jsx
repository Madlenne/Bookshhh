/* eslint-disable no-nested-ternary */
/* eslint-disable no-ternary */
/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import * as PropTypes from 'prop-types';
import Stars from '../ui/Stars/Stars.jsx';
import { get } from 'lodash';
import DefaultThumbnail from '../../icons/cover_placeholder.png';
import Remove from '../../icons/remove.png';
import css from './BookCard.module.scss';
import { NavLink, useLocation, generatePath } from 'react-router-dom';
import * as firebase from 'firebase/app';


const BookCard = ({ itemFromAPI }) => {
    
    const { pathname } = useLocation();
    const [item, setItem] = useState(itemFromAPI);
    const [description, setDescription] = useState();
    const [thumbnail, setThumbnail] = useState();
    const [author, setAuthor] = useState();
    const [title, setTtile] = useState(' ');
    const [id, setId] = useState('1');

    const [isAddedToMyLibrary, setIsAddedToMyLibrary] = useState();
    const [myLibraryId, setMyLibraryId] = useState();

    const currentDate = new Date().getTime();

    let displayName = '';
    if (firebase.auth().currentUser) ({ displayName } = firebase.auth().currentUser);

    useEffect(() => {
        firebase.firestore().collection('myLibrary')
        .where('userId', '==', displayName)
        .where('bookId', '==', id)
        .onSnapshot(book => {
            
            //  console.log(myLibraryId);
            const bookInMyLibraryId = book.docs.map(doc => doc.id);
            if (bookInMyLibraryId.length){

                setMyLibraryId(bookInMyLibraryId[0]);
            }
            const myBook = book.docs.map(doc => doc.data());

            if (myBook.length){
                setIsAddedToMyLibrary(true);
            }
        });
       
    }, [id, isAddedToMyLibrary]);

    useEffect(() => {
        setItem(itemFromAPI);
    }, [itemFromAPI]);

    
    useEffect(() => {
        if (item){
            const shortDescription = get(item, 'volumeInfo.description', 'No description');
            setDescription(shortDescription.substring(0, 300));

            const smallThumbnail = get(item, 'volumeInfo.imageLinks.smallThumbnail', DefaultThumbnail);
            setThumbnail(smallThumbnail);

            const title = get(item, 'volumeInfo.title', 'Unknown title');
            setTtile(title);

            const authors = get(item, 'volumeInfo.authors[0]', 'Unknown author');
            setAuthor(authors);
            setId(item.id);

        }
    }, [item]);

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
    const path = generatePath('/book/:id', {
        id
    });

    const removeFromLibrary = () => {

            firebase.firestore().collection('myLibrary')
            .doc(myLibraryId)
            .delete();

        setIsAddedToMyLibrary(false);
    };
    
    return (
        <NavLink to={path} className={css.linkItem} >
            <div className={css.container}>
                <img src={thumbnail} className={css.cover} alt="bookCover"/>
                <span className={css.info}>
                    <div className={css.basicInfo}>
                        <div className={css.title}>
                            { title }
                        </div>
                        <div className={css.author}>
                            {author}
                        </div>
                    </div>

                    <div className={css.rate}>
                       {isAddedToMyLibrary
                       ? <span className={css.isAdded}>
                       Grade!
                        <NavLink to={pathname}>
                            <Stars bookId={id} userId={displayName}/>
                        </NavLink>
                        
                        </span>
                        : displayName && <span className={css.cantGrade} > Add to your library to grade this book! </span>}
                    </div>
                    {isAddedToMyLibrary && myLibraryId &&
                    <NavLink to={pathname} className={css.remove} onClick={removeFromLibrary}>
                        <img src={Remove} className={css.remove} alt="remove"/>
                     </NavLink>
                    // <div className={css.remove} >
                    //         REMOVE FROM MY LIBRARY
                    //     </div>
                    }
                    {/* {hasStartedReading
                    ? <div className={css.progress}>
                            Read in: <b> 100% </b>
                        </div>
                    : <div className={css.bookGenre}>
                        CRIME NOVEL
                    </div>
                } */}
                { isAddedToMyLibrary
                ? <div className={css.added} >
                    ADDED TO MY LIBRARY
                </div>
                : displayName
                    ? <NavLink to={pathname} className={css.toAdd} onClick={addToMyLibrary} >
                        ADD TO MY LIBRARY
                    </NavLink>
                    : <span className={css.toAdd}>
                        LOG IN TO COMPOSE YOUR OWN LIBRARY
                     </span>

                }

                </span>
                <span className={css.bookDescription}>
                    <div dangerouslySetInnerHTML={{ '__html': description }} />
                </span>
                
            </div>
        </NavLink>
    );
};

BookCard.propTypes = {
    'hasStartedReading': PropTypes.string
    // 'itemFromAPI': PropTypes.object.isRequired
};

BookCard.defaultProps = {
    'hasStartedReading': false
};

export default BookCard;