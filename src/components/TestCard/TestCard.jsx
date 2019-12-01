import React from 'react'
import * as PropTypes from 'prop-types';
import Exam from '../../icons/exam.png';
import classnames from 'classnames/bind';

import css from './TestCard.module.scss';

const cln = classnames.bind(css);

const TestCard = ({testDate, className}) => {

    const workspaces = [1];
    const name = 'III C';
    
    const currentDate = new Date().getTime();

    return(
        <div className={cln('container', className)}>
                <span className={css.data}>
                    <div className={css.title}>
                        The doll
                    </div>
                    <div className={css.author}>
                        Stanislaw Wokulski
                    </div>
                </span>
                    <span className={css.read}>
                        Read in 100%
                    </span>
                        {testDate > currentDate 
                            ? <img src={Exam} className={css.exam} alt='exam' />
                            : <span className={css.result}>77%</span>
                    }
             
        </div>

    );
}

export default TestCard;