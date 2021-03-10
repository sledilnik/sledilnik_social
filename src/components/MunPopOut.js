import React from 'react';
import './MunPopOut.css';
import PopOut from './PopOut';

function MunPopOut({ open, output, onCancel = () => {} }) {
  return (
    <PopOut className="MunPopOut" open={open} onClose={onCancel}>
      <ul>{output}</ul>
    </PopOut>
  );
}

function withMunPopOutHOC(Component) {
  const WithMunPopOut = ({ ...props }) => {
    return <Component {...props} />;
  };
  return WithMunPopOut;
}
export default withMunPopOutHOC(MunPopOut);
