/* eslint-disable max-statements */
/* eslint-disable no-ternary */
/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import * as PropTypes from 'prop-types';
import Header from '../../components/Header/Header.jsx';
import Suggestions from '../../components/Suggestions/Suggestions.jsx';
import WorkspaceCard from '../../components/WorkspaceCard/WorkspaceCard.jsx';
import TestCard from '../../components/TestCard/TestCard.jsx';
import EventCard from '../../components/EventCard/EventCard.jsx';
import { Calendar } from '../../components/Calendar/Calendar.jsx';
import { useLocation } from 'react-router-dom';
import Loader from '../../components/ui/Loader/Loader.jsx';
import * as firebase from 'firebase/app';

import css from './WorkspaceScreen.module.scss';

const WorkspaceScreen = () => {


    const { pathname } = useLocation();
    const lastSlash = pathname.lastIndexOf('/');
    const id = pathname.substring(lastSlash + 1);
    const [workspaces, setWorkspaces] = useState([]);

    const [displayName, setDisplayName] = useState('testUser');
    const [events, setEvents] = useState([]);

    const currentDate = Math.round(new Date().getTime() / 1000);
    
    useEffect(() => {
        if (firebase.auth().currentUser) setDisplayName(firebase.auth().currentUser.displayName);
  
    }, [firebase.auth().currentUser]);


    useEffect(() => {
        firebase.firestore().collection('workspaces')
        .where('name', '==', id)
        .onSnapshot(workspace => {
            const newWorkspaces = workspace.docs.map(doc => doc.data());
            setWorkspaces(newWorkspaces[0]);
        });
       
}, []);

useEffect(() => {
    firebase.firestore().collection('calendar')
    .where('workspace', '==', id)
    .where('userId', '==', displayName)
    .onSnapshot(eventsAPI => {
        const event = eventsAPI.docs.filter(doc => doc.data().date.seconds > currentDate).map(doc => doc.data());
        setEvents(event);
    });
   
}, [id, displayName]);

    const { name, members, description } = { ...workspaces };

return (
        <div className={css.container} key={workspaces}>
            <Header mode="dark"/>
            <span className={css.content}>
                <Suggestions/>
                <span className={css.workspaces}>
                   
                    <span className={css.info}>
                    { workspaces.length === 0
                        ? <Loader/>
                        : <WorkspaceCard variant={'extended'} name={name} members={members} description={description}/>
                    }
                    <div className={css.testsList}>
                            <TestCard testDate={new Date('Dec 10, 2019').getTime()}/>
                            <TestCard testDate={new Date('Nov 10, 2019').getTime()}/>
                            <TestCard testDate={new Date('Nov 5, 2019').getTime()}/>
                        </div>
                    </span>
                    <span className={css.events}>
                        <Calendar workspace={name}/>
                        <div className={css.upcomingEvents}>
                            Upcoming events
                        </div>
                        {events.map((event, index) => (index % 2
                        ? <EventCard date={event.date.seconds} title={event.title} className={css.grayBackground}/>
                        : <EventCard date={event.date.seconds} title={event.title }/>))}
                            
                    </span>

                </span>
            </span>

        </div>

    );
};

export default WorkspaceScreen;