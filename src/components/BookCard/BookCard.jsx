import React from 'react'
import * as  PropTypes from 'prop-types';
import Cover from '../../icons/the_shining_cover.jpg';
import Stars from '../ui/Stars/Stars.jsx';
import css from './BookCard.module.scss';


const BookCard = () => {
    return(
        <div className={css.container}>
            <img src={Cover} className={css.cover} alt='bookCover'/>
            <span className={css.info}>
                <div className={css.basicInfo}>
                    <div className={css.title}>
                        The Big Four
                    </div>
                    <div className={css.author}>
                        Agathe Christie
                    </div>
                </div>

                <div className={css.rate}>
                    {/* <Stars/> */}
                </div>                
                <div className={css.progress}>
                    Read in: <b> 100% </b>
                </div>
            </span>
            <span className={css.bookDescription}>
                Lorem ipsum dolor sit amet blablabla  
            </span>
            
        </div>

    );
}

export default BookCard;