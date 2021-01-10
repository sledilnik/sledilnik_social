import React from 'react';
import Arrow from './Arrow';

function TitleLine({ children, title, noColon }) {
  let colon = !title || noColon ? '' : ': ';

  return (
    <p className="text">
      <Arrow /> {title}
      {colon}
      {children}
    </p>
  );
}

export default TitleLine;
