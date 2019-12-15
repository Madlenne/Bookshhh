/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import User from '../../icons/user.png';
import Grade from '../../icons/triangle.png';
import Add from '../../icons/add.png';
import classnames from 'classnames/bind';
import * as firebase from 'firebase/app';

import css from './ReviewCard.module.scss';

const cln = classnames.bind(css);

const ReviewCard = ({ reviewId, userId, title, comment, grade, className, creatingMode }) => {
    const { pathname } = useLocation();
    const lastSlash = pathname.lastIndexOf('/');
    const id = pathname.substring(lastSlash + 1);

    const [newTitle, setNewTitle] = useState('');
    const [newComment, setNewComment] = useState('');
    // const currentDate = new Date().getTime();

    let displayName;
    if (firebase.auth().currentUser) ({ displayName } = firebase.auth().currentUser);

    const voteUp = () => {
        firebase.firestore().collection('comments')
        .doc(reviewId)
        .update({
            'grade': grade + 1
            })
        .catch(error => {
                console.error(error);
            });

    };

    const voteDown = () => {

        firebase.firestore().collection('comments')
        .doc(reviewId)
        .update({
            'grade': grade - 1
            })
        .catch(error => {
            console.error(error);
        });
    };
    
const addReview = () => {

    firebase.firestore().collection('comments')
    .add({
        'bookId': id,
        'content': newComment,
        'grade': 0,
        'title': newTitle,
        'userId': displayName
        })
    .then(ref => {
            console.log('Added document with ID: ', ref.id);
        });
};


    if (creatingMode) return (
        <div className={cln('container', className)}>
            <div className={css.userInfo}>
                <img src={User} className={css.avatar} alt="user" />
                    { displayName }
            </div>
            <div className={css.reviews}>
                <input type="text" value={newTitle} className={css.newTitle} onChange={event => setNewTitle(event.target.value)} placeholder="Title"/>

                    <div className={css.comment}>

                        <input type="text" value={newComment} className={css.newComment} onChange={event => setNewComment(event.target.value)} placeholder="Type a comment"/>
                    </div>

            </div>
            <span className={css.grade}>
            <img src={Add} onClick={addReview} className={css.addButton} alt="png"/>

            </span>
        </div>

    );

    return (
        <div className={cln('container', className)}>
            <div className={css.userInfo}>
                <img src={User} className={css.avatar} alt="user" />
                    { userId }
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
                <img src={Grade} className={css.up} onClick={voteUp} alt="user" />
                {grade}
                <img src={Grade} className={css.down} onClick={voteDown} alt="user" />
            </span>
        </div>

    );
};

export default ReviewCard;