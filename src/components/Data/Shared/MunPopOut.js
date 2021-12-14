import React from 'react';
import './MunPopOut.css';
import PopOut from '../../Shared/PopOut';

function MunPopOut({ open, output, onCancel = () => {} }) {
  return (
    <PopOut className="MunPopOut" open={open} onClose={onCancel}>
      <ul>{output}</ul>
    </PopOut>
  );
}

export default MunPopOut;
