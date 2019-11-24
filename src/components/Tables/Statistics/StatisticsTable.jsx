import React from 'react'
import css from './StatisticsTable.module.scss';


const StatisticsTable = () => {
    return (
        <div className={css.table}>
            <div className={css.tableRow}>
                In progress 
                <span className={css.number}>
                    10
                </span>
            </div>
            <div className={css.tableRow}>
                Finished 
                <span className={css.number}>
                    8
                </span>
            </div>
            <div className={css.tableRow}>
                Want to read
                <span className={css.number}>
                    17
                </span>
            </div>
            <div className={css.tableRow}>
                Favourites
                <span className={css.number}>
                    4
                </span>
            </div>
            <div className={css.tableRow}>
                Reviews
                <span className={css.number}>
                    11
                </span>
            </div>
        </div>
    )
}

export default StatisticsTable;