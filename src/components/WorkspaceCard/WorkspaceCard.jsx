import React from 'react'
import * as PropTypes from 'prop-types';
import Header from '../Header/Header.jsx';
import Suggestions from '../Suggestions/Suggestions.jsx';
import Group from '../../icons/group.png';
import Thumbnail from '../../icons/graduation-hat.png';
import classnames from 'classnames/bind';
import { NavLink, useLocation } from 'react-router-dom';

import css from './WorkspaceCard.module.scss';

const cln = classnames.bind(css);

const WorkspaceCard = ({variant, name, className}) => {
    const { pathname } = useLocation();

    if(variant === 'extended'){
        return(
            <div className={cln('container', 'container--extended', className)}>
                <span className={cln('info', 'info--extended')}>
                    <img src={Thumbnail} className={css['thumbnail--extended']} alt='thumbnail' />
                        <span className={css.name}>
                            {name}
                        </span>
                </span>
                    <div className={css['description--extended']}>
                        Don’t fall behind with our school books!
                    </div>
                <span className={cln('members', 'members--extended')}>
                <img src={Group} className={css.group} alt='group' />
                    
                        <div className={css.text}>
                            25 members
                        </div>
                </span>
            </div>
        )
    }

    return(
        <NavLink to={`${pathname}/${name}`} className={css.linkItem}>
            <div className={cln('container', className)}>
                <img src={Thumbnail} className={css.thumbnail} alt='thumbnail' />
            <span className={css.info}>
                    {name}
                    <div className={css.description}>
                        Don’t fall behind with our school books!
                    </div>
            </span>
            <span className={css.members}>
                <b>25</b>
                    <div className={css.text}>
                        members
                    </div>
            </span>

        </div>
        </NavLink>
    );
}

export default WorkspaceCard;