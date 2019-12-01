import React from 'react'
import * as PropTypes from 'prop-types';
import Header from '../../components/Header/Header.jsx';
import Suggestions from '../../components/Suggestions/Suggestions.jsx';
import WorkspaceCard from '../../components/WorkspaceCard/WorkspaceCard.jsx';
import TestCard from '../../components/TestCard/TestCard.jsx';
import Calendar from '../../components/Calendar/Calendar.jsx';

import css from './WorkspaceScreen.module.scss';

const WorkspaceScreen = () => {

    const workspaces = [1];
    const name = 'III C';

    return(
        <div className={css.container}>
            <Header mode='dark'/>
            <span className={css.content}>
                <Suggestions/>
                <span className={css.workspaces}>
                   
                    <span className={css.info}>
                        <WorkspaceCard variant={'extended'} name='III C'/>
                        <div className={css.testsList}>
                            <TestCard testDate={new Date('Dec 10, 2019').getTime()}/>
                            <TestCard testDate={new Date('Nov 10, 2019').getTime()}/>
                            <TestCard testDate={new Date('Nov 5, 2019').getTime()}/>
                        </div>
                    </span>
                    <span className={css.events}>
                        <Calendar/>
                    </span>

                </span>
            </span>

        </div>

    );
}

export default WorkspaceScreen;