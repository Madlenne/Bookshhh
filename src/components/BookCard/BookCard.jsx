/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import * as PropTypes from 'prop-types';
import Stars from '../ui/Stars/Stars.jsx';
import { get } from 'lodash';
import css from './BookCard.module.scss';
import { NavLink, useLocation, generatePath } from 'react-router-dom';

const generateSlug = phrase => phrase.split(' ').join('+');

const BookCard = ({ hasStartedReading, itemFromAPI }) => {

    const { pathname } = useLocation();
    const [item, setItem] = useState(itemFromAPI);
    const [description, setDescription] = useState();
    const [thumbnail, setThumbnail] = useState();
    const [author, setAuthor] = useState();
    const [title, setTtile] = useState(' ');

    useEffect(() => {
        setItem(itemFromAPI);
    }, [itemFromAPI]);
    // const API = 'https://www.googleapis.com/books/v1/volumes?q=intitle:&key=AIzaSyA3izPXs8UVa0mopS54Cyym0v21IOGIVjk';
    // const query = API + generateSlug(title) + '+inauthor:'+ generateSlug(author);
    // useEffect( () => {
    //    async function fetchData() {
    //        await fetch(query)
    //             .then(response => response.json())
    //             .then((data) => {
    //                 console.log('DATA ', data);
    //                 setItems(data.items[0]);
    //                 // const shortDescription = data.items[0].volumeInfo.description.substring(0, 300);
    //                 // const smallThumbnail = data.items[0].volumeInfo.imageLinks.smallThumbnail;
    //                 // setDescription(shortDescription);
    //                 // setThumbnail(smallThumbnail);

    //         }).catch(error => {
    //             console.error(error);
    //         });
    //    } 
    //    fetchData();
    // }, [])
    // console.log(items);
    
    useEffect(() => {
        if (item){
            const shortDescription = get(item, 'volumeInfo.description', 'No description');
            // substring(0, 300);
            setDescription(shortDescription.substring(0, 300));

            const {smallThumbnail} = item.volumeInfo.imageLinks;
            setThumbnail(smallThumbnail);

            const {title} = item.volumeInfo;
            setTtile(title);

            const author = item.volumeInfo.authors[0];
            setAuthor(author);

        }
    }, [item]);


    // setDescription(() => {
    //     if(items){
    //         setIsFetching(false);
    //         return items.volumeInfo.description.substring(0, 300);
    //     }
    //     else{
    //         setIsFetching(true);
    //     }
    // }, [])

    // setThumbnail(() => {
    //     if(items){
    //         setIsFetching(false);
    //         return items.volumeInfo.imageLinks.smallThumbnail
    //     }
    //     else{
    //         setIsFetching(true);
    //     }
    // }, [])
    
    const path = generatePath('/book/:id', {
        "id": title
    });
    
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
                        Grade!
                        <Stars/>
                    </div>
                    {hasStartedReading
                    ? <div className={css.progress}>
                            Read in: <b> 100% </b>
                        </div>
                    : <div className={css.bookGenre}>
                        CRIME NOVEL
                    </div>
                }

                </span>
                <span className={css.bookDescription}>
                    {description}
                </span>
                
            </div>
        </NavLink>
    );
};

BookCard.propTypes = {
    "hasStartedReading": PropTypes.string
};

BookCard.defaultProps = {
    "hasStartedReading": false
};

export default BookCard;