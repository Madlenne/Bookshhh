import React from 'react'
import * as  PropTypes from 'prop-types';
import Cover from '../../icons/the_shining_cover.jpg';
import Stars from '../ui/Stars/Stars.jsx';
import css from './BookCard.module.scss';
import { NavLink } from 'react-router-dom';


const BookCard = ({ hasStartedReading, title }) => {
    return(
        <NavLink to={`book/${title}`} className={css.linkItem} >
            <div className={css.container}>
                <img src={Cover} className={css.cover} alt='bookCover'/>
                <span className={css.info}>
                    <div className={css.basicInfo}>
                        <div className={css.title}>
                            { title }
                        </div>
                        <div className={css.author}>
                            Agathe Christie
                        </div>
                    </div>

                    <div className={css.rate}>
                        Grade!
                        <Stars/>
                    </div>                
                    {hasStartedReading 
                    ?   <div className={css.progress}>
                            Read in: <b> 100% </b>
                        </div>
                    : <div className={css.bookGenre}>
                        CRIME NOVEL
                    </div>
                }

                </span>
                <span className={css.bookDescription}>
                Framed in the doorway of Poirot’s bedroom stood an uninvited guest, coated from head to foot in dust. The man’s gaunt face stared for a moment, then he swayed and fell.  
                </span>
                
            </div>
        </NavLink>
    );
}

BookCard.propTypes = {
    hasStartedReading: PropTypes.string,
}

BookCard.defaultProps = {
    hasStartedReading: false,
}

export default BookCard;