/* eslint-disable react/jsx-key */
/* eslint-disable no-ternary */
import React, { useState } from 'react';
import css from './Search.module.scss';
import MagnifyingGlass from '../../icons/magnifying-glass.png';
import { NavLink } from 'react-router-dom';

const Search = () => {

    const [searchedValue, setSearchedValue] = useState('');
    const [items, setItems] = useState([]);
    
    async function fetchData(query) {
        await fetch(query)
             .then(response => response.json())
             .then(data => {
                 console.log('DATA ', data);
                 setItems(data.items);

         })
.catch(error => {
             console.error(error);
         });
    }

    const search = () => {
        const API = 'https://www.googleapis.com/books/v1/volumes?q=';
        const query = `${API}${searchedValue}&maxResults=3&key=AIzaSyDc1R1jLJAKSJpU3jy30RrKPyrBg5i2yF0`;
        if (searchedValue){

            fetchData(query);
        } else {
            setItems([]);
        }
    };


    return (
        <div className={css.container}>
            <span className={css.search}>
                <input type="text" value={searchedValue} onKeyUp={search} onChange={event => setSearchedValue(event.target.value)} className={css.message} placeholder="Search..."/>
                <img src={MagnifyingGlass} className={css.magnifyingGlass} onClick={search} alt="magnifyingGlass"/>
            </span>
            {items.length
            ? <span className={css.menu}>
                {items.length &&
                    items.map(item => <NavLink to={`/book/${item.id}`} className={css.menuOption} >{item.volumeInfo.title}</NavLink>)
                }
                </span>
            : null}
             
        </div>
    );
};

export default Search;