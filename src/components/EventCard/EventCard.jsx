import React from 'react'
import * as PropTypes from 'prop-types';
import Exam from '../../icons/exam.png';
import classnames from 'classnames/bind';

import css from './EventCard.module.scss';

const cln = classnames.bind(css);

const EventCard = ({ title, className }) => {

    const workspaces = [1];
    const name = 'III C';
    
    const currentDate = new Date().getTime();

    return(
        <div className={cln('container', className)}>
            <div className={css.title}>
                {title}
            </div>
            
            <span className={css.date}>
                15.12.2019
            </span>
        </div>

    );
}

export default EventCard;