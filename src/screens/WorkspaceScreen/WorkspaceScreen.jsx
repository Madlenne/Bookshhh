import React from 'react'
import * as PropTypes from 'prop-types';
import Header from '../../components/Header/Header.jsx';
import Suggestions from '../../components/Suggestions/Suggestions.jsx';
import WorkspaceCard from '../../components/WorkspaceCard/WorkspaceCard.jsx';

import css from './WorkspaceScreen.module.scss';


const WorkspaceScreen = () => {

    const workspaces = [1];

    return(
        <div className={css.container}>
            <Header mode='dark'/>
            <span className={css.content}>
                <Suggestions/>
                <span className={css.workspaces}>
                    <span className={css.title}>
                        Workspaces
                    </span>
                    <span className={css.workspaceCards}>
                        {workspaces.map((workspaceCard, index) => 
                            ((index+1) % 4 && index % 4)
                            ? <WorkspaceCard />
                            : <WorkspaceCard className={css.workspaceCardClassName}/>
                        )}
                        
                    </span>
                </span>
            </span>

        </div>

    );
}

export default WorkspaceScreen;