import React from 'react';

import './Intro.css';
import { Emoji } from './New';

const mainComponentsNames = [
  'TESTS_ACTIVE',
  'HOSPITALIZED_DECEASED',
  'Combined',
];

const Intro = ({ post, introTodayDate }) => {
  const postsCount = mainComponentsNames.length;
  return (
    <h2 className="Intro text">
      <span className="bold">
        Status #COVID19 <Emoji emoji={'🇸🇮'} ariaLabel={'flag'} /> {post}/
        {postsCount} {introTodayDate}
      </span>
    </h2>
  );
};
export default Intro;
