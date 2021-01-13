import React from 'react';
const Intro = props => {
  return (
    <h2 className="text">
      <span className="bold">
        Status #COVID19{' '}
        <span role="img" aria-label="s">
          🇸🇮
        </span>{' '}
        {props.post}/3 {props.introTodayDate}
      </span>
    </h2>
  );
};
export default Intro;
