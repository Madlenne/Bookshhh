/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import * as PropTypes from 'prop-types';
import Header from '../../components/Header/Header.jsx';
import RateBox from '../../components/RateBox/RateBox.jsx';
import { Calendar } from '../../components/Calendar/Calendar.jsx';
import { NavLink, useLocation } from 'react-router-dom';
import Avatar from './woman-avatar.png';
import css from './ProfileScreen.module.scss';
import StatisticsTable from '../../components/Tables/Statistics/StatisticsTable.jsx';
import Threads from '../../components/Tables/Threads/Threads.jsx';
import Tests from '../../components/Tables/Tests/Tests.jsx';
import * as firebase from 'firebase/app';


const ProfileScreen = () => {

    const location = useLocation();
    const { pathname } = location;


    const highlightCurrentTab = tabName => pathname === `/profile${tabName}`;

    const [displayName, setDisplayName] = useState('');

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            setDisplayName(firebase.auth().currentUser.displayName);
        } else {
            setDisplayName('');
        }
      });
    
return (
        <div className={css.container}>
            <Header/>
            <div className={css.content}>
                <span className={css.leftPart}>
                    <span className={css.userInfo}>
                        <img src={Avatar} className={css.userAvatar} />
                        <span className={css.userName}>
                            {displayName}
                            {/* <div className={css.userStatus}>Advanced bookworm</div> */}
                        </span>
                        {/* <button className={css.button}>Become a writer</button> */}
                    </span>
                    <span className={css.userActivity}>
                        <span className={css.tabs}>
                            <NavLink
                            to="/profile/statistics"
                            className={css.tab}
                            activeClassName={css.activeClassName}
                            isActive={() => highlightCurrentTab('/statistics') || highlightCurrentTab('')}
                            >
                                Statistics
                            </NavLink>
                            <NavLink
                            to="/profile/threads"
                            className={css.tab}
                            activeClassName={css.activeClassName}
                            isActive={() => highlightCurrentTab('/threads')}
                            >
                                Latest threads
                            </NavLink>
                            {/* <NavLink
                            to="/profile/tests"
                            className={css.tab}
                            activeClassName={css.activeClassName}
                            isActive={() => highlightCurrentTab('/tests')}
                            >
                                Test
                            </NavLink> */}
                        </span>
                        {
                            (highlightCurrentTab('/statistics') || highlightCurrentTab('')) && <StatisticsTable displayName={displayName}/>
                        }
                        {
                            highlightCurrentTab('/threads') && <Threads displayName={displayName}/>
                        }
                        {
                            highlightCurrentTab('/tests') && <Tests/>
                        }
                    
                    </span>
                </span>
                <span className={css.rightPart}>
                    <Calendar className={css.calendar}/>
                <RateBox className={css.rateBox}/>
                </span>
                
            </div>
      
        </div>

    );
};

export default ProfileScreen;