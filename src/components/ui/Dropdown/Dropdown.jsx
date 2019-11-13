import React, { useState, useEffect } from 'react'
import * as PropTypes from 'prop-types';

import classnames from 'classnames/bind';
import css from './Dropdown.module.scss';

const cln = classnames.bind(css);

const Dropdown = ({ buttonRenderer, children }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const onClick = () => {
        console.log('expanded');
        // useEffect(() => {

            setIsExpanded(isExpanded => !isExpanded);
        // })
    }
    
    return( 
        <>
        {buttonRenderer(onClick)}
            <div className={cln('container', { 'container--expanded': isExpanded })} >
                {children}
            </div>
        </>
    );
}

const Item = ({ children, onClick, itemKey, className }) => (
    <div type="button" className={cln('menuItem', className)} onClick={() => onClick(itemKey)}>
        {children}
    </div>
);


Dropdown.Item = Item;

export default Dropdown;