import React from 'react'
import * as PropTypes from 'prop-types';

import SuggestionCard from '../SuggestionCard/SuggestionCard.jsx';
import css from './Suggestions.module.scss';


const Suggestions = () => {
    return(
        <div className={css.container}>
            
             <span className={css.title}>
                Suggestions
            </span>
            <span className={css.recommendation}>
                <SuggestionCard/>
                <SuggestionCard/>
                <SuggestionCard/>
            </span>
        </div>

    );
}

export default Suggestions;