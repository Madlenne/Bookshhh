/* eslint-disable no-shadow */
/* eslint-disable id-length */
/* eslint-disable multiline-ternary */
/* eslint-disable no-ternary */
/* eslint-disable no-plusplus */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
import React, { useState, useEffect } from 'react';
import { CalendarEvent } from '../../components/Calendar/Calendar.jsx';
import * as firebase from 'firebase/app';

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

const VerticalCalendar = () => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const days = [];

    const [displayName, setDisplayName] = useState('');
    const [calendarEvents, setCalendarEvents] = useState();
    const [calendarEventsDates, setCalendarEventsDates] = useState([]);
    const [eventTitle, setEventTitle] = useState('');
    const [eventDescription, setEventDescription] = useState('');

    const exampleDates = [new Date('Nov 3, 2019'), new Date('Nov 15, 2019'), new Date('Dec 15, 2019')];
  
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            setDisplayName(firebase.auth().currentUser.displayName);
        } else {
            setDisplayName('');
        }
      });

      useEffect(() => {
        firebase.firestore().collection('calendar')
        .where('userId', '==', displayName)
        .onSnapshot(calendar => {
            const calendarEvents = calendar.docs.map(doc => doc.data());
            if (calendarEvents.length){
  
              setCalendarEvents(calendarEvents);
            }
          });
          
        }, [displayName]);
  
        useEffect(() => {
          const calendarEventsAccumulator = [];
  
          if (calendarEvents){
            calendarEvents.forEach(calendarEvent => {
              calendarEventsAccumulator.push(new Date(calendarEvent.date.seconds * 1000));
            });
            
            if (calendarEventsAccumulator.length) {
              setCalendarEventsDates(calendarEventsAccumulator);
            }
          }
        }, [calendarEvents]);

    const [clickedDay, setClickedDay] = useState(currentDay);
    const [isEventExpanded, setIsEventExpanded] = useState(false);

    for (let i = 0; i < 5; ++i){
        days.push(currentDay + i);
    }
    
    const onDayClick = day => {
        setClickedDay(day);
        if (areDaysEqual(day, calendarEventsDates, currentDate.getMonth())){
          
          const calendarEventItem = calendarEvents.find(calendarEvent => calendarEvent.date.seconds === Math.floor(new Date(2020, currentDate.getMonth(), day).getTime() / 1000));
          setEventTitle(calendarEventItem.title);
          setEventDescription(calendarEventItem.description);
          setIsEventExpanded(true);

        } else {
            setIsEventExpanded(false);

        }
    };

    const monthName = monthNames[currentDate.getMonth()];
    
    const date = { 'day': clickedDay,
                        'month': currentDate.getMonth(),
                        'year': 2020 };

return (
         <div className={css.container}>
             <CalendarEvent key={isEventExpanded} date={date} title={eventTitle} description={eventDescription} isEventExpanded={isEventExpanded} className={css.calendarEvent}/>
             <span className={css.days}>
                {days.map(day => <div key={day} className={cln('day',
                    {
                        'currentDay': clickedDay === day,
                        'eventDay': areDaysEqual(day, calendarEventsDates, currentDate.getMonth())
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