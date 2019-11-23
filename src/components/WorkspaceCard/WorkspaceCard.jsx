import React from 'react'
import * as PropTypes from 'prop-types';
import Header from '../Header/Header.jsx';
import Suggestions from '../Suggestions/Suggestions.jsx';
import Thumbnail from '../../icons/graduation-hat.png';
import classnames from 'classnames/bind';

import css from './WorkspaceCard.module.scss';

const cln = classnames.bind(css);

const WorkspaceCard = ({nr, className}) => {
    return(
        <div className={cln('container', className)}>
            <img src={Thumbnail} className={css.thumbnail} alt='thumbnail' />
           <span className={css.info}>
                III C
                <div className={css.description}>
                    Don’t fall behind with our school books!
                </div>
           </span>
           <span className={css.members}>
               <b>25</b>
                <div className={css.text}>
                    members
                </div>
           </span>

        </div>

    );
}

export default WorkspaceCard;