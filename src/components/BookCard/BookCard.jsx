/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import * as PropTypes from 'prop-types';
import Stars from '../ui/Stars/Stars.jsx';
import { get } from 'lodash';
import DefaultThumbnail from '../../icons/cover_placeholder.png';
import css from './BookCard.module.scss';
import { NavLink, useLocation, generatePath } from 'react-router-dom';


const BookCard = ({ hasStartedReading, itemFromAPI }) => {

    const { pathname } = useLocation();
    const [item, setItem] = useState(itemFromAPI);
    const [description, setDescription] = useState();
    const [thumbnail, setThumbnail] = useState();
    const [author, setAuthor] = useState();
    const [title, setTtile] = useState(' ');
    const [id, setId] = useState('1');

    useEffect(() => {
        setItem(itemFromAPI);
    }, [itemFromAPI]);

    
    useEffect(() => {
        if (item){
            const shortDescription = get(item, 'volumeInfo.description', 'No description');
            setDescription(shortDescription.substring(0, 300));

            const smallThumbnail = get(item, 'volumeInfo.imageLinks.smallThumbnail', DefaultThumbnail);
            setThumbnail(smallThumbnail);

            const { title } = item.volumeInfo;
            setTtile(title);

            const authors = get(item, 'volumeInfo.authors[0]', 'Unknown author');
            setAuthor(authors);

            setId(item.id);

        }
    }, [item]);

    const path = generatePath('/book/:id', {
        id
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
    'hasStartedReading': PropTypes.string,
    'itemFromAPI': PropTypes.object.isRequired
};

BookCard.defaultProps = {
    'hasStartedReading': false
};

export default BookCard;