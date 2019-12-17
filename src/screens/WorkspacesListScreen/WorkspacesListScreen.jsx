/* eslint-disable max-lines-per-function */
/* eslint-disable no-ternary */
import React, { useState, useEffect } from 'react';
import * as PropTypes from 'prop-types';
import Header from '../../components/Header/Header.jsx';
import Suggestions from '../../components/Suggestions/Suggestions.jsx';
import WorkspaceCard from '../../components/WorkspaceCard/WorkspaceCard.jsx';
import Loader from '../../components/ui/Loader/Loader.jsx';
import Add from '../../icons/add.png';

import css from './WorkspacesListScreen.module.scss';
import * as firebase from 'firebase/app';


const WorkspacesListScreen = () => {

    const [workspaces, setWorkspaces] = useState([]);
    const [workspaceCreatingMode, setWorkspaceCreatingMode] = useState(false);
    const name = 'IIIC';

    useEffect(() => {
        firebase.firestore().collection('workspaces')
        .onSnapshot(workspace => {
            const newWorkspaces = workspace.docs.map(doc => doc.data());
            setWorkspaces(newWorkspaces);
        });
       
}, []);

const createWorkspace = () => {
    setWorkspaceCreatingMode(mode => !mode);
};

return (
        <div className={css.container}>
            <Header mode="dark"/>
            <span className={css.content}>
                <Suggestions/>
                <span className={css.workspaces}>
                    <span className={css.title}>
                        Workspaces
                        <img src={Add} onClick={createWorkspace} className={css.addButton} alt="png"/>

                    </span>
                    <span className={css.workspaceCards}>
                   {workspaceCreatingMode && <WorkspaceCard variant="creating"/>}
                        { workspaces.length === 0
                        ? <Loader/>
                        : workspaces.map(({ name, members, description }, index) => (((index + 1) % 4 && index % 4)
                            ? <WorkspaceCard key={name} name={name} members={members} description={description}/>
                            : <WorkspaceCard key={name} name={name} members={members} description={description} className={css.workspaceCardClassName} />)
                        )}
                        
                    </span>
                    
                </span>
            </span>

        </div>

    );
};

export default WorkspacesListScreen;