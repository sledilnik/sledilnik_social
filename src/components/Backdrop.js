import React from 'react';
import './Backdrop.css';

function Backdrop({ children, className }) {
  return <div className={className}>{children}</div>;
}

export default Backdrop;
