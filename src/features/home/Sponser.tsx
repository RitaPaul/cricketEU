import React from 'react';
import { Image } from 'semantic-ui-react';
import css from './HomePage.module.css';
import ColaWhite from '../../assets/images/cocacolawhite.png'

export const Sponser = () => {
    return (
        <div className={css.sponcers}>
            <Image src={ColaWhite} alt='Nike' />
            <Image src={ColaWhite} alt='Bilka' />
            <Image src={ColaWhite} alt='Circle' />
            <Image src={ColaWhite} alt='Circle' />
        </div>
    )
}
