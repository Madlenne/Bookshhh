/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable multiline-ternary */
/* eslint-disable no-ternary */
/* eslint-disable no-shadow */
/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames/bind';
import Add from '../../icons/add.png';
import moment from 'moment';
import Dropdown from '../ui/Dropdown/Dropdown.jsx';
import { useEventListener } from '../../hooks/useEventListener.js';
import * as firebase from 'firebase/app';

import css from './Calendar.module.scss';

const cln = classnames.bind(css);

const monthNames = [
'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const areDaysEqual = (dayInMs, daysInMs) => {
  const onlyDay = Math.floor(dayInMs / 100000000);
  const onlyDays = daysInMs.map(day => Math.floor(day / 100000));

return onlyDays.includes(onlyDay);
};

const returnEqualTimestamp = (dayInMs, daysInMs) => {
  const onlyDay = Math.floor(dayInMs / 100000000);
  
  return daysInMs.filter(day => Math.floor(day / 100000) === onlyDay);


};

export const Calendar = ({ className }) => {
  
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  
  const [pickedMonth, setPickedMonth] = useState(currentMonth);
  const [pickedDay, setPickedDay] = useState();
  const [displayName, setDisplayName] = useState('testUser');
  const [calendarEvents, setCalendarEvents] = useState();
  const [calendarEventsDates, setCalendarEventsDates] = useState([]);
  const monthName = monthNames[pickedMonth];

  const monthRenderer = (onClick, ref) => <span className={css.month} onClick={onClick} ref={ref}>{monthName}  </span>;

    const monthDate = moment().set('month', pickedMonth)
    .startOf('month');

    useEffect(() => {
      if (firebase.auth().currentUser) setDisplayName(firebase.auth().currentUser.displayName);

  }, [firebase.auth().currentUser]);


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
            calendarEventsAccumulator.push(calendarEvent.date.seconds);
          });
          
          if (calendarEventsAccumulator.length) {
            setCalendarEventsDates(calendarEventsAccumulator);
          }
        }
      }, [calendarEvents]);

      
    const days = [...Array(monthDate.daysInMonth())].map((_, i) => monthDate.clone().add(i, 'day'));

      const column = index => {
        if (index == 0) {

          return days[0].day() === 0 ? 7 : days[0].day();
        }
      };

      const pickMonth = index => {
        setPickedMonth(index);
        };
     
      
      const pickDate = index => {
        setPickedDay(index);
      };

    return (
        <div className={cln('container', className)}>
            <div className={css.monthAndYear}>
                
                <Dropdown key={pickedMonth} buttonRenderer={monthRenderer} className={css.monthList}>
                    {
                      monthNames.map((monthName, index) => <Dropdown.Item className={css.monthItem} onClick={() => pickMonth(index)}>{ monthName } </Dropdown.Item>
                    )}
                  </Dropdown>
                <span className={css.year}> { currentYear } </span>
            </div>
            <div className={css.days}>
            {

                  calendarEvents && days.map((day, index) => {
                  const date = { 'day': day.format('D'),
                                'month': pickedMonth,
                                'year': 2020 };

                    const equalTimestamp = returnEqualTimestamp(day.valueOf(), calendarEventsDates);
                  const calendarEventItem = calendarEvents.filter(calendarEvent => calendarEvent.date.seconds === equalTimestamp[0]);
                
return (
                        <>
                          <div
                          className={cln('day', { 'day--highlighted': areDaysEqual(day.valueOf(), calendarEventsDates) })}
                          style={{ 'gridColumn': column(index) }}
                          onClick={() => pickDate(index)}>

                              { day.format('D') }

                            { pickedDay === index && areDaysEqual(day.valueOf(), calendarEventsDates) &&
                            <CalendarEvent key={calendarEvents} date={date} title={calendarEventItem[0].title} description={calendarEventItem[0].description} isEventExpanded={pickedDay === index}/>}
                            { pickedDay === index && !areDaysEqual(day.valueOf(), calendarEventsDates) &&
                            <CalendarEventCreator date={date} displayName={displayName} isEventExpanded={pickedDay === index}/>}
                          </div>
                        </>
                  );
                  })
            }
            </div>
             
        </div>

    );
};

export const CalendarEvent = ({ date, title, description, isEventExpanded, className }) => {

  const { day, month, year } = date;

  const containerRef = useRef();
  const [isExpanded, setIsExpanded] = useState(isEventExpanded);
  const handleOutsideAndOptionClick = event => {
    
    if (containerRef.current.contains(event.target)){
      return;
    }
    
    setIsExpanded(false);
  };
  
  useEventListener('mousedown', handleOutsideAndOptionClick);

  return <div className={cln('eventContainer', className, { 'eventContainer--expanded': isExpanded })} ref={containerRef}>
    <div className={css.title}>
      {title}
 
    </div>
    <span className={css.date}>
      {`${day}.${month}.${year}`}
    </span>
    <div className={css.description}>
      {description}
    </div>
  </div>;
};

const CalendarEventCreator = ({ date, isEventExpanded, displayName }) => {

  const { day, month, year } = date;
  const timestamp = new Date(year, month, day);

  const containerRef = useRef();
  const [isExpanded, setIsExpanded] = useState(isEventExpanded);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const handleOutsideAndOptionClick = event => {
    
    if (containerRef.current.contains(event.target)){
      return;
    }
    
    setIsExpanded(false);
  };
  useEventListener('mousedown', handleOutsideAndOptionClick);
  
  const addNewEvent = () => {

    firebase.firestore().collection('calendar')
    .add({
        'date': timestamp,
        'description': newDescription,
        'title': newTitle,
        'userId': displayName
        })
    .then(ref => {
            console.log('Added document with ID: ', ref.id);
        });
  };


  return <div className={cln('eventContainer', { 'eventContainer--expanded': isExpanded })} ref={containerRef}>
    <div className={css.titles}>
     <input type="text" value={newTitle} onChange={event => setNewTitle(event.target.value)} className={css.title2} placeholder="Type a title..." />
    </div>
    <span className={css.date}>
      {`${day}.${month}.${year}`}
    </span>
    <input type="text" value={newDescription} onChange={event => setNewDescription(event.target.value)} className={css.description2} placeholder="Type a description..." />
    <img onClick={addNewEvent} src={Add} className={css.addButton} alt="png"/>
  </div>;
};

