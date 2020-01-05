/* eslint-disable no-undefined */
/* eslint-disable sort-keys */
/* eslint-disable quote-props */
/* eslint-disable arrow-parens */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import * as PropTypes from 'prop-types';

import { useEventListener } from '../../../hooks/useEventListener.js';

import classnames from 'classnames/bind';
import css from './Dropdown.module.scss';

const cln = classnames.bind(css);

const Dropdown = ({ buttonRenderer, className, arrowPosition, children }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const container = useRef();
    const buttonRendererIcon = useRef();
    const onClick = () => {
        setIsExpanded(isExpanded => !isExpanded);
    };
    
    const handleOutsideAndOptionClick = (event) => {

        if (container.current.contains(event.target) || buttonRendererIcon.current.contains(event.target)){
            return;
        }

         setIsExpanded(false);
    };

    useEventListener('mousedown', handleOutsideAndOptionClick);
    
    return (
        <>
        {buttonRenderer(onClick, buttonRendererIcon)}
            <div className={cln('container', className, { 'container--expanded': isExpanded })} ref={container}>
               <span className={css.arrow} style={{ left: `${arrowPosition}%` }}>
               </span>
                    {children}
            </div>
        </>
    );
};

Dropdown.propTypes = {
    buttonRenderer: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    arrowPosition: PropTypes.number
};

Dropdown.defaultProps = {
    arrowPosition: 0
};

const Item = ({ children, onClick, itemKey, className }) => (
    <div type="button" className={cln('menuItem', className)} onClick={() => onClick(itemKey)}>
        {children}
    </div>
);

Item.propTypes = {
    itemKey: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

Item.defaultProps = {
    onClick: () => {},
    className: undefined
};

Dropdown.Item = Item;

export default Dropdown;