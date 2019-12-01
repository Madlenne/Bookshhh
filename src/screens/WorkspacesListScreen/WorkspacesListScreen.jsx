import React from 'react'
import * as PropTypes from 'prop-types';
import Header from '../../components/Header/Header.jsx';
import Suggestions from '../../components/Suggestions/Suggestions.jsx';
import WorkspaceCard from '../../components/WorkspaceCard/WorkspaceCard.jsx';
import { NavLink, useLocation } from 'react-router-dom';

import css from './WorkspacesListScreen.module.scss';


const WorkspacesListScreen = () => {

    const workspaces = [1];
    const name = 'IIIC';

    const {pathname} = useLocation();
    console.log(pathname);

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
                            ? <WorkspaceCard name='III C'/>
                            : <WorkspaceCard name='III C' className={css.workspaceCardClassName} className={css.linkItem}/>
                        )}
                        
                    </span>
                    
                </span>
            </span>

        </div>

    );
}

export default WorkspacesListScreen;