import React  from 'react'
import css from './Loader.module.scss';

const Loader = () => <div className={css.spinner}>
    <div className={css.dot1}></div>
    <div className={css.dot2}></div>
</div>

export default Loader;