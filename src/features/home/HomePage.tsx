import React from 'react';
import css from './HomePage.module.css';
import { LatestResult } from './latestResult/LatestResult';
import { Sponser } from './Sponser';
import { Feature } from './Feature';
import HomePicture from './HomePicture';

const HomePage = () => {

  return (
    <div>
      <HomePicture />
      <div className={css.match_result_container}>
        <div className={css.vertical_line}></div>
        <span className={css.vertical_text}>LATEST RESULT</span>
        <LatestResult />
      </div>
      <Sponser />
      <Feature />
    </div>
  );
};

export default HomePage;
