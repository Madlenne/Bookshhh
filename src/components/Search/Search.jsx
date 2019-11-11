import React from 'react'
import * as PropTypes from 'prop-types';
import css from './Search.module.scss';
import MagnifyingGlass from '../../icons/magnifying-glass.png';

const Search = () => {
    return(
        <span className={css.search}>
            <input type='text' className={css.message} placeholder='Search...'/>
           <img src={MagnifyingGlass} className={css.magnifyingGlass}/>
        </span>

    );
}

export default Search;