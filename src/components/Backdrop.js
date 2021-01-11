import React from 'react';
import './Backdrop.css';

function Backdrop({ children }) {
  return <div className="backdrop">{children}</div>;
}

export default Backdrop;
