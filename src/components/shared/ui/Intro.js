import React from 'react';

import './Intro.css';
import { Emoji } from './New';

const Intro = ({ post, introTodayDate }) => {
  return (
    <h2 className="Intro text">
      <span className="bold">
        Status #COVID19 <Emoji emoji={'🇸🇮'} ariaLabel={'flag'} /> {post}/3{' '}
        {introTodayDate}
      </span>
    </h2>
  );
};
export default Intro;
