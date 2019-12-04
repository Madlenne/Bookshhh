import React from 'react'
import * as PropTypes from 'prop-types';
import Header from '../../components/Header/Header.jsx';
import Suggestions from '../../components/Suggestions/Suggestions.jsx';
import Cover from '../../icons/the_shining_cover.jpg';
import ReviewCard from '../../components/ReviewCard/ReviewCard.jsx';

import css from './BookScreen.module.scss';


const BookScreen = () => {

    const news = [1,2,3,4,5,6,7,8,9,10];

    return(
        <div className={css.container}>
            <Header mode='dark'/>
            <span className={css.content}>
                <Suggestions/>
                <span className={css.details}>
                    <span className={css.bookCard}>
                        <img src={Cover} className={css.cover} alt="cover" />
                        <span className={css.title}>
                            The Hobbit
                            <div className={css.author}>
                                J.R.R. Tolkien
                            </div>
                        </span>
                        <span className={css.description}>
                            In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, 
                            filled with the ends of worms and an oozy smell, nor yet a dry, bare, 
                            sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, 
                            and that means comfort.
                        </span>
                    </span>
                    <div className={css.reviews}>
                        Reviews
                        <ReviewCard 
                            title='Best of the best' 
                            comment="Generally speaking, I’m not fan of fantasy books but this one makes me impressed! 
                            I recommend it to every person who wants to dive in a fantasy world."/>
                        <ReviewCard 
                                title='Better than a film based on this' 
                                comment="This is holy truth that films never replaces books! I imagined ‘The Hobbit’ world in a completely 
                                different way."/>
                        <ReviewCard 
                            title='Better than a film based on this' 
                            comment="This is holy truth that films never replaces books! I imagined ‘The Hobbit’ world in a completely 
                            different way."/>
                   </div>
                </span>
            </span>

        </div>

    );
}

export default BookScreen;