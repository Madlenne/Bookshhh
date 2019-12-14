import React from 'react';
import * as PropTypes from 'prop-types';
import Header from '../../components/Header/Header.jsx';
import Suggestions from '../../components/Suggestions/Suggestions.jsx';
import GenreCard from '../../components/GenreCard/GenreCard.jsx';
import EducationThumbnail from '../../icons/graduation-hat.png';
import BiographyThumbnail from '../../icons/biography.png';
import TravelThumbnail from '../../icons/around.png';
import RomanceThumbnail from '../../icons/wedding-ring.png';
import CrimeThumbnail from '../../icons/detective.png';
import HistoryThumbnail from '../../icons/history.png';
import PoetryThumbnail from '../../icons/parchment.png';
import ComicThumbnail from '../../icons/superman.png';
import CookingThumbnail from '../../icons/chef.png';
import EconomicsThumbnail from '../../icons/euro.png';
import FictionThumbnail from '../../icons/ufo.png';
import HorrorThumbnail from '../../icons/ghost.png';


import css from './GenresListScreen.module.scss';

const genreTypes = { 'Biography': BiographyThumbnail,
                    'Comic': ComicThumbnail,
                    'Cooking': CookingThumbnail,
                    'Crime': CrimeThumbnail,
                    'Economics': EconomicsThumbnail,
                    'Education': EducationThumbnail,
                    'Fiction': FictionThumbnail,
                    'History': HistoryThumbnail,
                    'Horror': HorrorThumbnail,
                    'Poetry': PoetryThumbnail,
                    'Romance': RomanceThumbnail,
                    'Travel': TravelThumbnail };


const GenreScreen = () =>

    // const genres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

     (
        <div className={css.container}>
            <Header mode="dark"/>
            <span className={css.content}>
                <Suggestions/>
                <span className={css.genres}>
                    <span className={css.title}>
                        Genres
                    </span>
                    <span className={css.genreCards}>
                        {Object.entries(genreTypes).map(([genreType, genreThumbnail], index) => ((index % 2)
                            ? <GenreCard type={genreType} thumbnail={genreThumbnail}/>
                            : <GenreCard type={genreType} thumbnail={genreThumbnail} className={css.genreCardClassName}/>)
                        )}
                        
                    </span>
                </span>
            </span>

        </div>

    );
export default GenreScreen;