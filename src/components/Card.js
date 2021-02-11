import React from 'react';

function Card({ summary, children, open = false }) {
  return (
    <details open={open}>
      <summary>
        <h2>{summary}</h2>
      </summary>
      {children}
    </details>
  );
}

export default Card;
