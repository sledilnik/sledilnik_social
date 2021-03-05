import React from 'react';
import './Backdrop.css';

function Backdrop({ children, className = '' }) {
  const clickHandler = event => event.stopPropagation();
  return (
    <div className={`Backdrop ${className}`} onClick={clickHandler}>
      {children}
    </div>
  );
}

export default Backdrop;
