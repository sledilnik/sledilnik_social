import React from 'react';

import './Intro.css';
import { Bold, Text, Emoji } from './New';

const Intro = ({ post, introTodayDate }) => {
  return (
    <h2 className="Intro text">
      <Bold>
        <Text>Status #COVID19 </Text>
        <Emoji emoji={'🇸🇮'} ariaLabel={'flag'} />
        <Text>
          {' '}
          {post}/3 {introTodayDate}
        </Text>
      </Bold>
    </h2>
  );
};
export default Intro;
