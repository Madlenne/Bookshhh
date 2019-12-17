/* eslint-disable max-lines-per-function */
import React from 'react';
import * as PropTypes from 'prop-types';
import Group from '../../icons/group.png';
import Thumbnail from '../../icons/graduation-hat.png';
import classnames from 'classnames/bind';
import { NavLink, useLocation } from 'react-router-dom';

import css from './WorkspaceCard.module.scss';

const cln = classnames.bind(css);

const WorkspaceCard = ({ variant, name, members, description, className }) => {
    const { pathname } = useLocation();

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