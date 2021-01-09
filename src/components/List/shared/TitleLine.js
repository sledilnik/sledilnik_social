import React from 'react';
import Arrow from './Arrow';

function TitleLine({ children, title, noColon }) {
  return (
    <p className="text">
      <Arrow /> {title}
      {noColon ? '' : ':'} {children}
    </p>
  );
}

export default TitleLine;
