import React from 'react'
import * as PropTypes from 'prop-types';
import Header from '../../components/Header/Header.jsx';
import Suggestions from '../../components/Suggestions/Suggestions.jsx';
import GenreCard from '../../components/GenreCard/GenreCard.jsx';

import css from './GenresListScreen.module.scss';


const GenreScreen = () => {

    const genres = [1,2,3,4,5,6,7,8,9,10];

    return(
        <div className={css.container}>
            <Header mode='dark'/>
            <span className={css.content}>
                <Suggestions/>
                <span className={css.genres}>
                    <span className={css.title}>
                        Genres
                    </span>
                    <span className={css.genreCards}>
                        {genres.map((genreCard, index) => 
                            (index % 2)
                            ? <GenreCard type='Travel'/>
                            : <GenreCard type='History' className={css.genreCardClassName}/>
                        )}
                        
                    </span>
                </span>
            </span>

        </div>

    );
}

export default GenreScreen;