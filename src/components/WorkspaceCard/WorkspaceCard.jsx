/* eslint-disable max-lines-per-function */
import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import Group from '../../icons/group.png';
import Thumbnail from '../../icons/graduation-hat.png';
import classnames from 'classnames/bind';
import { NavLink, useLocation } from 'react-router-dom';
import Add from '../../icons/add.png';
import * as firebase from 'firebase/app';

import css from './WorkspaceCard.module.scss';

const cln = classnames.bind(css);

const WorkspaceCard = ({ variant, name, members, description, className }) => {
    const { pathname } = useLocation();

    const [newWorkspaceName, setNewWorkspaceName] = useState('');
    const [newWorkspaceDescription, setNewWorkspaceDescription] = useState('');

    if (variant === 'extended'){
        return (
            <div className={cln('container', 'container--extended', className)} >
                <span className={cln('info', 'info--extended')}>
                    <img src={Thumbnail} className={css['thumbnail--extended']} alt="thumbnail" />
                        <span className={css.name}>
                            {name}
                        </span>
                </span>
                    <div className={css['description--extended']}>
                        {description}
                    </div>
                <span className={cln('members', 'members--extended')}>
                <img src={Group} className={css.group} alt="group" />
                    
                        <div className={css.text}>
                            {members} members
                        </div>
                </span>
            </div>
        );
    }

    const workspaceState = { description,
                            members,
                            name };

    const createWorkspace = () => {

        const addDoc = firebase.firestore().collection('workspaces')
        .add({
            'description': newWorkspaceDescription,
            'members': 0,
            'name': newWorkspaceName
            })
        .then(ref => {
                console.log('Added document with ID: ', ref.id);
            });

    };

    if (variant === 'creating'){
        return (
                <div className={cln('container', className)}>
                    <img src={Thumbnail} className={css.thumbnail} alt="thumbnail" />
                <span className={css.info}>
                        <input type="text" value={newWorkspaceName} className={css.newWorkspace} onChange={event => setNewWorkspaceName(event.target.value)} placeholder="Type a title"/>

                        <div className={css.description}>
                        <input type="text" value={newWorkspaceDescription} className={css.newWorkspace} onChange={event => setNewWorkspaceDescription(event.target.value)} placeholder="Type a description"/>
                        </div>
                </span>
                <span className={css.members}>
                    <img src={Add} onClick={createWorkspace} className={css.addButton} alt="png"/>

                        
                </span>

            </div>
        );
    }

    return (
        <NavLink to={`${pathname}/${name}`} workspace={workspaceState} className={css.linkItem}>
            <div className={cln('container', className)}>
                <img src={Thumbnail} className={css.thumbnail} alt="thumbnail" />
            <span className={css.info}>
                    {name}
                    <div className={css.description}>
                        {description}
                    </div>
            </span>
            <span className={css.members}>
                    <b>{members}</b>
                    <div className={css.text}>
                        members
                    </div>
            </span>

        </div>
        </NavLink>
    );

};

export default WorkspaceCard;