import React, { useState, useEffect } from 'react'
import * as PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import moment from 'moment';
import Dropdown from '../ui/Dropdown/Dropdown.jsx';


import css from './Calendar.module.scss';

const cln = classnames.bind(css);

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


const Calendar = ({ className }) => {
  
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const monthName = monthNames[currentMonth];
  
  const [ pickedMonth, setPickedMonth ] = useState(currentMonth);

  const monthRenderer = (onClick, ref) => <span  className={css.month} onClick={onClick} ref={ref}>{monthName}  </span>

    let monthDate = moment().set('month', pickedMonth).startOf('month');

    const days = [...Array(monthDate.daysInMonth())].map((_, i) => {
        return monthDate.clone().add(i, 'day')
      })

      const column = (index) => {
        if (index == 0) {
          return days[0].day() + 1
        }
      }


      const pickMonth = (index) => {
        setPickedMonth(index);
        }
     
      
      const pickDate = () => {
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
                days.map((day, index) => <div onClick={pickDate} className={css.day} style={{ gridColumn: column(index) }}> {day.format('D')} </div>)
            }
            </div>
            
        </div>

    );
}



export default Calendar;