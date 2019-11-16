import React from 'react'
import * as PropTypes from 'prop-types';

import classnames from 'classnames/bind';
import css from './VerticalCalendar.module.scss';

const cln = classnames.bind(css);

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


const VerticalCalendar = ({ className }) => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    let days = [];

    for(let i=0; i<5; ++i){
        days.push(currentDay+i);
    }
    
    const monthName = monthNames[currentDate.getMonth()];

    return(
         <div className={css.container}>
             <span className={css.days}>
                {days.map((day,index) => 
                    index === 0 ? <div className={cln('day', 'currentDay')}>   {monthName} {day}</div> : <div className={css.day}>{day}</div>
                )}
             </span>
         </div>

    );
}

export default VerticalCalendar;