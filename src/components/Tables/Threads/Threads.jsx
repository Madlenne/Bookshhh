import React from 'react'
import css from './Threads.module.scss';


const Threads = () => {

    const threads = [1,2,3];

    return (
        <div className={css.table}>

            {
                threads.map(thread => 
                <div className={css.tableRow}>
                    <span className={css.opinion}>
                        “Awesome piece of art, it tooks…”
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

export default Threads;