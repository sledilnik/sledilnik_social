import React, { useCallback, useEffect } from 'react';

import './CancelButton.css';

function CancelButton({ handleClick, position = 'top-right', black }) {
  return (
    <div className={`CancelButton ${position}`} onClick={handleClick}>
      <div className={`line line-1 ${black ? 'black' : ''}`}></div>
      <div className={`line line-2 ${black ? 'black' : ''}`}></div>
    </div>
  );
}

function withCancelButtonHOC(Component) {
  const WithCancelButton = ({ handleClick, ...props }) => {
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

    return <Component handleClick={handleClick} {...props} />;
  };
  return WithCancelButton;
}

export default withCancelButtonHOC(CancelButton);
