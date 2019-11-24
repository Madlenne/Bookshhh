import React from 'react'
import * as PropTypes from 'prop-types';
import Header from '../Header/Header.jsx';
import Suggestions from '../Suggestions/Suggestions.jsx';
import mainThumbnail from './olga_tokarczuk.jpg';
import classnames from 'classnames/bind';

import css from './NewsCard.module.scss';

const cln = classnames.bind(css);

const NewsCard = ({ className, version }) => {
    return(
        <div className={cln(version === 'small' ? 'container' : 'container--extended', className)}>
            {version === 'extended' && 
                <img src={mainThumbnail} className={css.thumbnail} alt='thumbnail' />    
            }
            <span className={css.title}>
                Olga Tokarczuk was awarded 
                the Nobel Prize for Literature!
            </span>
           <span className={css.info}>
                Novelist, poet and essayist Olga Tokarczuk has won the 2018 Nobel Prize for Literature, the Swedish Academy announced on Thursday. Announcing the winners, judges commended Tokarczuk “for her narrative imagination, that with encyclopaedic passion, represents the crossing of boundaries as a form of life." 
           </span>


        </div>

    );
}

NewsCard.propTypes = {
    className: PropTypes.string,
    version: PropTypes.string,
}

NewsCard.defaultProps = {
    className: undefined,
    version: 'small',
}

export default NewsCard;