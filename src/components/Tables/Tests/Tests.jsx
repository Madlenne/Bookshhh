import React from 'react'
import css from './Tests.module.scss';


const Tests = () => {

    const tests = [1,2,3];

    return (
        <div className={css.table}>

            {
                tests.map(thread => 
                <div className={css.tableRow}>
                    <span className={css.result}>
                        <b>96%</b>
                    </span>
                    <span className={css.workspace}>
                        III C
                    </span>
                    <span className={css.bookData}>
                        <div>The Big Four</div>
                        <div className={css.author}>Agathe Christie</div>
                    </span>
                </div>
                )
            }
            
        </div>
    )
}

export default Tests;