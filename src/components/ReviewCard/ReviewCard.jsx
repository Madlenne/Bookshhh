import React from 'react'
import * as PropTypes from 'prop-types';
import User from '../../icons/user.png';
import Grade from '../../icons/triangle.png';
import classnames from 'classnames/bind';

import css from './ReviewCard.module.scss';

const cln = classnames.bind(css);

const ReviewCard = ({ title, comment, className }) => {

    const workspaces = [1];
    const name = 'III C';
    const userName = 'Madlenne';
    const currentDate = new Date().getTime();

    return(
        <div className={cln('container', className)}>
            <div className={css.userInfo}>
                <img src={User} className={css.avatar} alt="user" />
                    { userName }
            </div>
            <div className={css.reviews}>
                <div className={css.title} >
                    {title}
                </div>
                <div className={css.comment} >
                    { comment }
                </div>
            </div>
            
            <span className={css.grade}>
                <img src={Grade} className={css.up} alt="user" />
                20
                <img src={Grade} className={css.down} alt="user" />
            </span>
        </div>

    );
}

export default ReviewCard;