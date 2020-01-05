/* eslint-disable react/prop-types */
/* eslint-disable max-statements */
import React from 'react';
import classnames from 'classnames/bind';

import css from './EventCard.module.scss';

const cln = classnames.bind(css);

const EventCard = ({ date, title, className }) => {

    const timestamp = new Date(date * 1000);

    const month = timestamp.getMonth() + 1;
    const day = timestamp.getDate();
    const year = timestamp.getFullYear();


    return (
        <div className={cln('container', className)}>
            <div className={css.title}>
                {title}
            </div>
            
            <span className={css.date}>
                {`${day}.${month}.${year}`}
            </span>
        </div>

    );
};

export default EventCard;