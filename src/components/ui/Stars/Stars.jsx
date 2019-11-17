import React, { useState}  from 'react'
import * as PropTypes from 'prop-types';

import Star from '../../../icons/star.png';
import StarEmpty from '../../../icons/star_empty.png';
import css from './Stars.module.scss';

const Stars = () => {

    const [hoveredStarIndex, setHoveredStarsIndex] = useState();
    const [chosenStarIndex, setChosenStarsIndex] = useState();
    const starsIndexes = [0,1,2,3,4];

    const highlightStar = (el) => {
        setHoveredStarsIndex(el);
    }

    const rate = (index) => {
        setChosenStarsIndex(index);
    }

    return(
        <div className={css.container} onMouseLeave={() => highlightStar(chosenStarIndex)} >
           { starsIndexes.map((el) => 
                el <= hoveredStarIndex 
               ? <img src={Star} className={css.star} onMouseEnter={() => highlightStar(el)} onClick={() => rate(el)} alt='star'/>
               : <img src={StarEmpty} className={css.star} onMouseEnter={() => highlightStar(el)} onClick={() => rate(el)} alt='star'/>
            )} 

        </div>
      

    )
}

export default Stars;