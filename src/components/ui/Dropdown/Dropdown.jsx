import React, { useState, useRef } from 'react'
import * as PropTypes from 'prop-types';

import { useEventListener } from '../../../hooks/useEventListener.js';

import classnames from 'classnames/bind';
import css from './Dropdown.module.scss';

const cln = classnames.bind(css);

const Dropdown = ({ buttonRenderer, children }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const container = useRef();
    const initials = useRef();

    const onClick = () => {

        setIsExpanded(isExpanded => !isExpanded);
    }

    const handleOutsideAndOptionClick = (event) => {

        if(initials.current.contains(event.target)){
            return;
        }

        setIsExpanded(false);
    }

    useEventListener('mousedown', handleOutsideAndOptionClick);
    
    return( 
        <>
        {buttonRenderer(onClick, initials)}
            <div className={cln('container', { 'container--expanded': isExpanded })} ref={container}>
                {children}
            </div>
        </>
    );
}

Dropdown.propTypes = {
    buttonRenderer: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}

const Item = ({ children, onClick, itemKey, className }) => (
    <div type="button" className={cln('menuItem', className)} onClick={() => onClick(itemKey)}>
        {children}
    </div>
);

Item.propTypes = {
    itemKey: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

Item.defaultProps = {
    onClick: () => {},
    className: undefined,
};

Dropdown.Item = Item;

export default Dropdown;