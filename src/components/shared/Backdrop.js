import React from 'react';
import './Backdrop.css';

function Backdrop({ children, className = '' }) {
  return <div className={`Backdrop ${className}`}>{children}</div>;
}

export default Backdrop;
