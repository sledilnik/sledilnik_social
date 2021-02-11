import React from 'react';

function Card({ summary, children, open = false }) {
  return (
    <details open={open}>
      <summary>{summary}</summary>
      {children}
    </details>
  );
}

export default Card;
