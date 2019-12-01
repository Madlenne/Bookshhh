import React, { useState, useRef } from 'react'
import * as PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import moment from 'moment';
import Dropdown from '../ui/Dropdown/Dropdown.jsx';
import { useEventListener } from '../../hooks/useEventListener.js';


import css from './Calendar.module.scss';

const cln = classnames.bind(css);

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const areDaysEqual = (dayInMs, daysInMs) => {
  const onlyDay = Math.round(dayInMs / 1000000);
  const onlyDays = daysInMs.map(day => Math.round(day / 1000000));

  return onlyDays.includes(onlyDay);
}

const Calendar = ({ className }) => {
  
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const exampleDates = [new Date('Nov 3, 2019').getTime(), new Date('Nov 15, 2019').getTime(), new Date('Dec 10, 2019').getTime()];

  const [ pickedMonth, setPickedMonth ] = useState(currentMonth);
  const [ pickedDay, setPickedDay ] = useState();
  const monthName = monthNames[pickedMonth];

  const monthRenderer = (onClick, ref) => <span  className={css.month} onClick={onClick} ref={ref}>{monthName}  </span>

    let monthDate = moment().set('month', pickedMonth).startOf('month');

    const days = [...Array(monthDate.daysInMonth())].map((_, i) => {
        return monthDate.clone().add(i, 'day')
      })

      const column = (index) => {
        if (index == 0) {

          return days[0].day() === 0 ? 7 : days[0].day();
        }
      }

      const pickMonth = (index) => {
        setPickedMonth(index);
        }
     
      
      const pickDate = (index) => {
        setPickedDay(index);
      }

    return(
        <div className={cln('container', className)}>
            <div className={css.monthAndYear}>
                
                <Dropdown key={pickedMonth} buttonRenderer={monthRenderer} className={css.monthList}>
                    {
                      monthNames.map((monthName, index) =>  <Dropdown.Item className={css.monthItem} onClick={() => pickMonth(index)}>{ monthName } </Dropdown.Item>
                    )}
                  </Dropdown> 
                <span className={css.year}> { currentYear } </span>
            </div>
            <div className={css.days}>
            {

                days.map((day, index) => {
                  const date = {'day': day.format('D'),
                                'month': pickedMonth,
                                'year': 2019};
                  return(
                  <>
                        <div 
                        className={cln('day', { 'day--highlighted': areDaysEqual(day.valueOf(), exampleDates) })} 
                        style={{ gridColumn: column(index) }} 
                        onClick={() => pickDate(index)}> 

                            { day.format('D') } 

                          { pickedDay === index && areDaysEqual(day.valueOf(), exampleDates) 
                          && <CalendarEvent date={date} isEventExpanded={pickedDay === index}/>}
                          { pickedDay === index && !areDaysEqual(day.valueOf(), exampleDates) 
                          && <CalendarEventCreator date={date} isEventExpanded={pickedDay === index}/>}
                        </div>
                        </>
                  )
                  })
            }
            </div>
             
        </div>

    );
}

const CalendarEvent = ({date, isEventExpanded}) => {

  const {day, month, year} = date;
  const containerRef = useRef();
  const [isExpanded, setIsExpanded] = useState(isEventExpanded);
  const handleOutsideAndOptionClick = (event) => {
    
    if(containerRef.current.contains(event.target) ){
      return;
    }
    
    setIsExpanded(false);
  }
  
  useEventListener('mousedown', handleOutsideAndOptionClick);

  return <div className={cln('eventContainer', {'eventContainer--expanded': isExpanded})} ref={containerRef}>
    <div className={css.title}>
      The doll test
      <div className={css.workspace}>
        III C
      </div>
    </div>
    <span className={css.date}>
      {`${day}.${month}.${year}`}
    </span>
    <div className={css.description}>
      Short test about knowledge of ‘The Doll”. 
      Please expect open-ended questions. 
      Every of them is marked by its amount 
      of points to reach.
    </div>
  </div>
}

const CalendarEventCreator = ({date, isEventExpanded}) => {

  const {day, month, year} = date;

  const containerRef = useRef();
  const [isExpanded, setIsExpanded] = useState(isEventExpanded);
  const handleOutsideAndOptionClick = (event) => {
    
    if(containerRef.current.contains(event.target) ){
      return;
    }
    
    setIsExpanded(false);
  }
  useEventListener('mousedown', handleOutsideAndOptionClick);

  return <div className={cln('eventContainer', {'eventContainer--expanded': isExpanded})} ref={containerRef}>
    <div className={css.title2}>
      Type a title...
      <div className={css.workspace2}>
        Any workspace?
      </div>
    </div>
    <span className={css.date}>
      {`${day}.${month}.${year}`}
    </span>
    <div className={css.description2}>
      Type a description...
    </div>
  </div>
}



export default Calendar;