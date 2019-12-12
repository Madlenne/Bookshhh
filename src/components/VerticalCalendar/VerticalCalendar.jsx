/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { CalendarEvent } from '../../components/Calendar/Calendar.jsx';

import classnames from 'classnames/bind';
import css from './VerticalCalendar.module.scss';

const cln = classnames.bind(css);

const monthNames = [
'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const areDaysEqual = (day, eventDays, month) => {
    const onlyDays = eventDays.filter(eventDay => month === eventDay.getMonth()).map(eventDay => eventDay.getDate());
  
    return onlyDays.includes(day);
  };

const VerticalCalendar = ({ className }) => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const days = [];

    const exampleDates = [new Date('Nov 3, 2019'), new Date('Nov 15, 2019'), new Date('Dec 15, 2019')];


    const [clickedDay, setClickedDay] = useState(currentDay);
    const [isEventExpanded, setIsEventExpanded] = useState(false);

    for (let i = 0; i < 5; ++i){
        days.push(currentDay + i);
    }
    
    const onDayClick = day => {
        setClickedDay(day);
        if (areDaysEqual(day, exampleDates, currentDate.getMonth())){
            setIsEventExpanded(true);
        } else {
            setIsEventExpanded(false);

        }
    };

    const monthName = monthNames[currentDate.getMonth()];

    const date = { 'day': 22,
                'month': 12,
                'year': 2019 };
    
return (
         <div className={css.container}>
             <CalendarEvent key={isEventExpanded} date={date} isEventExpanded={isEventExpanded} className={css.calendarEvent}/>
             <span className={css.days}>
                {days.map(day => <div key={day} className={cln('day',
                    {
                        'currentDay': clickedDay === day,
                        'eventDay': areDaysEqual(day, exampleDates, currentDate.getMonth())
                    })}
                    onClick={() => onDayClick(day)}>
                        {clickedDay === day ? monthName : ''} {day}
                    </div>
                )}
             </span>
         </div>

    );
};

export default VerticalCalendar;