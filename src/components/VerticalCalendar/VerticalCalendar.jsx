import React, { useState } from 'react'
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

    const [clickedDay, setClickedDay] = useState(currentDay);

    for(let i=0; i<5; ++i){
        days.push(currentDay+i);
    }
    
    const onDayClick = (day) => {
        setClickedDay(day);
    }

    const monthName = monthNames[currentDate.getMonth()];

    return(
         <div className={css.container}>
             <span className={css.days}>
                {days.map((day) => 
                    <div className={cln('day', {'currentDay': clickedDay === day})} onClick={() => onDayClick(day)}>
                        {clickedDay === day ? monthName : ''} {day}
                    </div>
                )}
             </span>
         </div>

    );
}

export default VerticalCalendar;