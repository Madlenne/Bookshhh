import React from 'react'
import * as PropTypes from 'prop-types';
import Header from '../../components/Header/Header.jsx';
import Suggestions from '../../components/Suggestions/Suggestions.jsx';
import NewsCard from '../../components/NewsCard/NewsCard.jsx';

import css from './NewsScreen.module.scss';


const NewsScreen = () => {

    const news = [1,2,3,4,5,6,7,8,9,10];

    return(
        <div className={css.container}>
            <Header mode='dark'/>
            <span className={css.content}>
                <Suggestions/>
                <span className={css.news}>
                    <span className={css.title}>
                        What's new?
                    </span>
                    <span className={css.newsCards}>
                        <span className={css.mainNews}>
                            <NewsCard version='extended'/>
                        </span>
                        <span className={css.otherNews}>
                        {news.map((newsCard, index) => 
                            ((index+1) % 4 && index % 4)
                            ? <NewsCard />
                            : <NewsCard className={css.newsCardClassName}/>
                        )}
                    
                        </span>
                        
                    </span>
                </span>
            </span>

        </div>

    );
}

export default NewsScreen;