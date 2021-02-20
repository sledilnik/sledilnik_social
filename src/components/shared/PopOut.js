import React, { useState, useEffect } from 'react';

import './PopOut.css';

import Modal from './Modal';
import Backdrop from './Backdrop';
import CancelButton from './CancelButton';

function PopOut({ children, className = '', buttons, onClose = () => {} }) {
  return (
    <Modal>
      <Backdrop className={`PopOut ${className}`}>
        <div className="popout-container">
          {children}
          <div className="button-container">{buttons}</div>
        </div>
        <CancelButton topRight handleClick={() => onClose()} />
      </Backdrop>
    </Modal>
  );
}

function withPopOutHOC(Component) {
  return ({ open, ...props }) => {
    const [show, setShow] = useState(open);
    useEffect(() => setShow(open), [open]);

    if (show) {
      document.body.style.overflow = 'hidden';
      const newProps = { ...props, setShow };
      return <Component {...newProps} />;
    }
    document.body.style.overflow = 'visible';
    return null;
  };
}
export default withPopOutHOC(PopOut);
