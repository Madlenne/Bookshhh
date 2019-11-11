import React from 'react'
import * as PropTypes from 'prop-types';

import classnames from 'classnames/bind';
import css from './RateBox.module.scss';
import openBook from '../../icons/open-book.png'; 

const cln = classnames.bind(css);

const RateBox = ({className}) => {
    return(
         <div className={cln('container', className)}>
            <span className={css.message}>
                 Your reading rate
                <img src={openBook} className={css.openBook} alt='openBook'/> 
                 <div className={css.messageBottom}>
                     Let's improve it
                 </div>
             </span>
             <span className={css.rate}>
                     57%
             </span>
         </div>

    );
}

export default RateBox;