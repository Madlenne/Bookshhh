import React from 'react'
import * as PropTypes from 'prop-types';
import Header from '../../components/Header/Header.jsx';
import Suggestions from '../../components/Suggestions/Suggestions.jsx';

import css from './WorkspaceScreen.module.scss';


const WorkspaceScreen = () => {
    return(
        <div className={css.container}>
            <Header mode='dark'/>
            <span className={css.content}>
                <Suggestions/>
                <span className={css.workspaces}>
                    <span className={css.title}>
                        Workspaces
                    </span>
                </span>
            </span>

        </div>

    );
}

export default WorkspaceScreen;