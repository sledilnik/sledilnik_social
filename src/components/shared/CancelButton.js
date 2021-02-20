import React, { useCallback, useEffect } from 'react';

import './CancelButton.css';

function CancelButton({ handleClick }) {
  const handleClickMemo = useCallback(() => handleClick(), [handleClick]);

  useEffect(() => {
    const close = e => {
      if (e.keyCode === 27) {
        handleClickMemo();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [handleClickMemo]);

  return (
    <div className="CancelButton top-right" onClick={handleClickMemo}>
      <div className="line line-1"></div>
      <div className="line line-2"></div>
    </div>
  );
}

export default CancelButton;
